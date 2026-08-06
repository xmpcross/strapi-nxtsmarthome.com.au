/**
 * scripts/fetch-product-details.mjs
 *
 * Enriches public/data/products.json with real catalogue data from the
 * DataForSEO Google Shopping product_info endpoint:
 *
 *   • specifications  — drives the Highlights strip and the Specifications tab
 *   • images          — replaces the /og-default.png placeholders
 *   • sellers         — deep product URLs, replacing search-result links
 *
 *   node scripts/fetch-product-details.mjs [--limit N] [--dry-run] [--resume]
 *
 * Phase 1 re-collects the shopping tasks already paid for by
 * fetch-retailer-prices.mjs (task_get costs nothing) to recover each product's
 * Google catalogue id. Phase 2 spends ~$0.001 per base product on product_info.
 *
 * Ratings and review counts from this endpoint are deliberately NOT written —
 * see the note in phase 3.
 */

import fs from 'node:fs';
import path from 'node:path';

const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  for (const line of fs.readFileSync(envLocalPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valParts] = trimmed.split('=');
      const val = valParts.join('=').trim();
      if (key && val && !process.env[key.trim()]) process.env[key.trim()] = val;
    }
  }
}

const SHOPPING_GET = 'https://api.dataforseo.com/v3/merchant/google/products/task_get/advanced';
const INFO_POST = 'https://api.dataforseo.com/v3/merchant/google/product_info/task_post';
const INFO_GET = 'https://api.dataforseo.com/v3/merchant/google/product_info/task_get/advanced';
const PRODUCTS_JSON = path.join(process.cwd(), 'public/data/products.json');
const SHOPPING_STATE = path.join(process.cwd(), 'scratch/retailer-price-tasks.json');
const INFO_STATE = path.join(process.cwd(), 'scratch/product-info-tasks.json');
const IMAGE_DIR = path.join(process.cwd(), 'public/images/products');
const LOCATION_CODE = 2036;
const LANGUAGE_CODE = 'en';
const BATCH_SIZE = 100;
const POLL_INTERVAL_MS = 10000;
const POLL_MAX_MINUTES = 25;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const resume = args.includes('--resume');
const limitIdx = args.indexOf('--limit');
const limit = limitIdx !== -1 ? Number(args[limitIdx + 1]) : null;

/**
 * Australian retailers and Australian brand-direct stores that DataForSEO
 * returns as sellers. Order matters: the first match wins, so specific names
 * precede generic ones and the marketplaces sit last.
 *
 * Deliberately excluded are the parallel importers and dropshippers that show
 * up heavily in the same results — desertcart, u-buy, Big Apple Buddy,
 * Snapklik, Techinn, Microless, Playthek, McGrocer, Crowdshop, Good Buyz. They
 * ship grey-market stock with no Australian warranty and no Australian
 * Consumer Law cover, which is the opposite of what this site tells readers to
 * buy. Second-hand resellers (CeX, Cash Converters) are excluded for the same
 * reason.
 */
const RETAILER_PATTERNS = [
  { retailer: 'JB Hi-Fi', patterns: ['jb hi-fi', 'jbhifi', 'jb hifi'] },
  { retailer: 'The Good Guys', patterns: ['good guys', 'thegoodguys'] },
  { retailer: 'Harvey Norman', patterns: ['harvey norman'] },
  { retailer: 'Officeworks', patterns: ['officeworks'] },
  { retailer: 'Bunnings', patterns: ['bunnings'] },
  { retailer: 'Bing Lee', patterns: ['bing lee', 'binglee'] },
  { retailer: 'Kogan AU', patterns: ['kogan'] },
  { retailer: 'Scorptec', patterns: ['scorptec'] },
  { retailer: 'Mwave', patterns: ['mwave'] },
  { retailer: 'Woolworths', patterns: ['woolworths'] },
  { retailer: 'BIG W', patterns: ['big w'] },
  { retailer: 'Kmart', patterns: ['kmart'] },
  { retailer: 'Target AU', patterns: ['target australia'] },
  { retailer: 'Costco AU', patterns: ['costco'] },
  { retailer: 'Dick Smith', patterns: ['dick smith'] },
  { retailer: 'Videopro', patterns: ['videopro'] },
  { retailer: 'Jaycar', patterns: ['jaycar'] },
  { retailer: 'Beacon Lighting', patterns: ['beacon lighting'] },
  { retailer: 'Domayne', patterns: ['domayne'] },
  { retailer: 'Joyce Mayne', patterns: ['joyce mayne'] },
  { retailer: 'Appliances Online', patterns: ['appliances online'] },
  { retailer: 'Mobileciti', patterns: ['mobileciti'] },
  { retailer: 'Oz Smart Things', patterns: ['oz smart things'] },
  { retailer: 'Audio Junction', patterns: ['audio junction'] },
  { retailer: 'Reebelo AU', patterns: ['reebelo'] },
  { retailer: 'EB Games AU', patterns: ['eb games'] },
  { retailer: 'Telstra', patterns: ['telstra'] },
  { retailer: 'Umart', patterns: ['umart'] },
  { retailer: 'Centre Com', patterns: ['centre com', 'centrecom'] },
  { retailer: 'PLE Computers', patterns: ['ple computers'] },
  { retailer: 'Wireless 1', patterns: ['wireless 1', 'wireless1'] },
  { retailer: 'Apple AU', patterns: ['apple'] },
  { retailer: 'Sonos AU', patterns: ['sonos'] },
  { retailer: 'Ring AU', patterns: ['ring'] },
  { retailer: 'eufy AU', patterns: ['eufy'] },
  { retailer: 'Aqara AU', patterns: ['aqara'] },
  { retailer: 'LIFX AU', patterns: ['lifx'] },
  { retailer: 'Nanoleaf AU', patterns: ['nanoleaf'] },
  { retailer: 'Reolink AU', patterns: ['reolink'] },
  { retailer: 'Dreame AU', patterns: ['dreame'] },
  { retailer: 'Anker AU', patterns: ['ankersolix', 'anker'] },
  { retailer: 'eBay AU', patterns: ['ebay'] },
  { retailer: 'Amazon AU', patterns: ['amazon'] },
];

function matchRetailer(seller) {
  const s = (seller || '').toLowerCase();
  if (!s) return null;
  for (const { retailer, patterns } of RETAILER_PATTERNS) {
    if (patterns.some((p) => s.includes(p))) return retailer;
  }
  return null;
}

const baseSlug = (slug) => slug.replace(/-(pro|ultra|gen-\d+)$/, '');

function normalise(text) {
  return (text || '')
    .toLowerCase()
    .replace(/colour/g, 'color')
    .replace(/ambience/g, 'ambiance')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOP_WORDS = new Set(['pro', 'ultra', 'gen', 'the', 'and', 'with', 'for']);
const DISTINGUISHING_WORDS = [
  'starter', 'kit', 'bundle', 'pack', 'bridge', 'strip', 'lightstrip', 'outdoor',
  'doorbell', 'camera', 'cam', 'lock', 'plug', 'bulb', 'speaker', 'display',
  'thermostat', 'purifier', 'vacuum', 'mop', 'hub', 'sensor', 'switch',
];

function scoreTitle(item, product) {
  const title = normalise(item.title);
  if (!title) return -1;
  const name = normalise(product.name);
  if (product.brand && !title.includes(normalise(product.brand))) return -1;
  for (const w of DISTINGUISHING_WORDS) {
    if (name.includes(w) && !title.includes(w)) return -1;
  }
  const words = name.split(' ').filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  if (!words.length) return -1;
  const hits = words.filter((w) => title.includes(w)).length;
  if (hits / words.length < 0.6) return -1;
  return hits + (item.is_best_match ? 2 : 0);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function collect(getUrl, taskMap, headers, label) {
  const pending = new Set(Object.keys(taskMap));
  const results = {};
  const deadline = Date.now() + POLL_MAX_MINUTES * 60 * 1000;
  while (pending.size && Date.now() < deadline) {
    for (const key of [...pending]) {
      try {
        const res = await fetch(`${getUrl}/${taskMap[key]}`, { headers });
        const json = await res.json();
        const task = json.tasks?.[0];
        if (task?.status_code === 20000) {
          results[key] = task.result?.[0] || null;
          pending.delete(key);
        } else if (task?.status_code !== 40602 && task?.status_code !== 40601) {
          pending.delete(key);
        }
      } catch {
        /* transient — retry next sweep */
      }
    }
    if (pending.size) {
      console.log(`   … ${label}: ${Object.keys(results).length} ready, ${pending.size} pending`);
      await sleep(POLL_INTERVAL_MS);
    }
  }
  return results;
}

async function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON, 'utf8'));
  const groups = new Map();
  for (const p of products) {
    const key = baseSlug(p.slug);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }

  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    console.error('❌ DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD missing from .env.local');
    process.exit(1);
  }
  const auth = Buffer.from(`${login}:${password}`).toString('base64');
  const headers = { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' };

  // ---- Phase 1: recover Google catalogue ids (free) ----
  if (!fs.existsSync(SHOPPING_STATE)) {
    console.error(`❌ ${SHOPPING_STATE} missing — run fetch-retailer-prices.mjs first.`);
    process.exit(1);
  }
  const shoppingTasks = JSON.parse(fs.readFileSync(SHOPPING_STATE, 'utf8'));
  console.log(`♻️  Re-collecting ${Object.keys(shoppingTasks).length} shopping tasks (free)…`);
  const shoppingResults = await collect(SHOPPING_GET, shoppingTasks, headers, 'shopping');

  const productIds = {};
  for (const [key, result] of Object.entries(shoppingResults)) {
    const items = result?.items || [];
    const reference = groups.get(key)?.[0];
    if (!reference) continue;
    const best = items
      .map((i) => ({ i, s: scoreTitle(i, reference) }))
      .filter((x) => x.s > 0 && x.i.product_id)
      .sort((a, b) => b.s - a.s)[0];
    if (best) productIds[key] = best.i.product_id;
  }

  let entries = Object.entries(productIds);
  if (limit) entries = entries.slice(0, limit);
  console.log(`🔑 ${entries.length} catalogue ids recovered of ${groups.size} products`);
  console.log(`💰 estimated cost: $${(entries.length * 0.001).toFixed(3)}`);

  if (dryRun) {
    for (const [k, id] of entries.slice(0, 10)) console.log(`   ${k} → ${id}`);
    return;
  }

  // ---- Phase 2: product_info ----
  let infoTasks;
  if (resume && fs.existsSync(INFO_STATE)) {
    infoTasks = JSON.parse(fs.readFileSync(INFO_STATE, 'utf8'));
    console.log(`♻️  Resuming ${Object.keys(infoTasks).length} product_info tasks`);
  } else {
    infoTasks = {};
    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
      const batch = entries.slice(i, i + BATCH_SIZE);
      const body = batch.map(([key, product_id]) => ({
        product_id,
        location_code: LOCATION_CODE,
        language_code: LANGUAGE_CODE,
        tag: key,
      }));
      const res = await fetch(INFO_POST, { method: 'POST', headers, body: JSON.stringify(body) });
      const json = await res.json();
      for (const t of json.tasks || []) if (t.id && t.data?.tag) infoTasks[t.data.tag] = t.id;
      console.log(`📮 posted ${Object.keys(infoTasks).length} product_info tasks`);
    }
    fs.mkdirSync(path.dirname(INFO_STATE), { recursive: true });
    fs.writeFileSync(INFO_STATE, JSON.stringify(infoTasks, null, 2));
  }

  const infoResults = await collect(INFO_GET, infoTasks, headers, 'product_info');
  console.log(`✅ ${Object.keys(infoResults).length} product_info results`);

  // ---- Phase 3: write back ----
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  let specCount = 0;
  let descCount = 0;
  let priceCount = 0;
  let addedCount = 0;
  let imageCount = 0;
  let deepLinkCount = 0;

  for (const [key, result] of Object.entries(infoResults)) {
    const item = result?.items?.[0];
    if (!item) continue;
    const group = groups.get(key) || [];

    /*
     * The catalogue description arrives with sentences run together where the
     * source page had block markup ("…wirelessly.Key FeaturesPhilips Hue…"),
     * so punctuation and camel-case joins get a space put back.
     */
    const description = (item.description || '')
      .replace(/([.!?])([A-Z])/g, '$1 $2')
      .replace(/([a-z0-9])([A-Z][a-z])/g, '$1. $2')
      .replace(/\s+/g, ' ')
      .trim();

    const specs = (item.specifications || [])
      .filter((s) => s.specification_name && s.specification_value)
      .map((s) => ({ name: s.specification_name, value: s.specification_value }));

    /*
     * Deep product URLs and prices, keyed by retailer.
     *
     * These sellers are listed against this exact catalogue id, so unlike the
     * keyword-search prices they cannot be an accessory or a single unit of a
     * multipack. They are therefore preferred over anything the shopping
     * search produced.
     */
    const sellerUrls = new Map();
    const sellerPrices = new Map();
    for (const seller of item.sellers || []) {
      const retailer = matchRetailer(seller.title);
      if (!retailer) continue;
      if (seller.url && !sellerUrls.has(retailer)) sellerUrls.set(retailer, seller.url);
      const price = seller.price?.current;
      if (typeof price === 'number' && price > 0 && !sellerPrices.has(retailer)) {
        sellerPrices.set(retailer, Math.round(price * 100) / 100);
      }
    }

    // One image download per base product, shared by its variants.
    let imagePath = null;
    const imageUrl = (item.images || [])[0];
    if (imageUrl) {
      try {
        const res = await fetch(imageUrl);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          const ct = res.headers.get('content-type') || '';
          const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : 'jpg';
          const filename = `${key}.${ext}`;
          fs.writeFileSync(path.join(IMAGE_DIR, filename), buf);
          imagePath = `/images/products/${filename}`;
        }
      } catch {
        /* image is optional — the placeholder stays */
      }
    }

    for (const product of group) {
      /*
       * Google's catalogue id is the only external identifier these endpoints
       * expose — `gtin` and `mpn` come back null on every item, so the
       * Additional Info panel shows no GTIN rather than a made-up barcode.
       */
      if (item.product_id) product.googleProductId = String(item.product_id);
      if (item.gtin) product.gtin = String(item.gtin);
      if (item.mpn) product.mpn = String(item.mpn);
      if (description) {
        product.description = description;
        descCount++;
      }
      if (specs.length) {
        product.specifications = specs;
        specCount++;
      }
      if (imagePath && product.image === '/og-default.png') {
        product.image = imagePath;
        imageCount++;
      }
      for (const r of product.retailers || []) {
        const url = sellerUrls.get(r.name);
        if (url) {
          r.url = url;
          r.deepLink = true;
          deepLinkCount++;
        }
        const price = sellerPrices.get(r.name);
        if (price) {
          r.priceAud = price;
          product.pricesCheckedAt = new Date().toISOString();
          priceCount++;
        }
      }

      /*
       * The seeded retailer lists were generated, not derived from who
       * actually stocks the product — which is why a real Harvey Norman
       * listing had nowhere to attach. Any genuine seller missing from the
       * list is appended, so a real price and a real deep link are never
       * discarded. Existing entries are left alone.
       */
      const existing = new Set((product.retailers || []).map((r) => r.name));
      for (const [retailer, price] of sellerPrices) {
        if (existing.has(retailer)) continue;
        const url = sellerUrls.get(retailer);
        if (!url) continue;
        product.retailers = product.retailers || [];
        product.retailers.push({ name: retailer, url, priceAud: price, deepLink: true });
        product.pricesCheckedAt = new Date().toISOString();
        addedCount++;
        priceCount++;
      }
      /* item.rating / item.seller_reviews_count are NOT copied. Those are
         seller ratings for the storefront, not product reviews, and the
         existing rating field is already an unearned editorial claim. */
    }
  }

  fs.writeFileSync(PRODUCTS_JSON, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
  console.log(`\n✅ specs on ${specCount} products, ${descCount} descriptions, ${imageCount} images set, ${deepLinkCount} deep links, ${priceCount} seller prices, ${addedCount} stockists added`);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
