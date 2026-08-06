/**
 * scripts/fetch-retailer-prices.mjs
 *
 * Backfills per-retailer prices in public/data/products.json from the
 * DataForSEO Google Shopping catalogue.
 *
 *   node scripts/fetch-retailer-prices.mjs [--limit N] [--dry-run] [--resume]
 *
 * Cost control: queries are deduplicated by base product. The "-pro"/"-ultra"/
 * "-gen-N" suffixes in this catalogue are not real SKUs — Google Shopping
 * returns nothing for them — so all variants of a product share one query and
 * one set of retailer prices. That turns 350 lookups into ~108.
 *
 * Tasks are posted in batches (the API accepts up to 100 per request) and then
 * collected, rather than one round trip per product.
 *
 * Only `retailers[].priceAud` and `pricesCheckedAt` are written. Ratings,
 * review counts and RRP are left untouched.
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

const POST_URL = 'https://api.dataforseo.com/v3/merchant/google/products/task_post';
const GET_URL = 'https://api.dataforseo.com/v3/merchant/google/products/task_get/advanced';
const PRODUCTS_JSON = path.join(process.cwd(), 'public/data/products.json');
const STATE_PATH = path.join(process.cwd(), 'scratch/retailer-price-tasks.json');
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

function baseSlug(slug) {
  return slug.replace(/-(pro|ultra|gen-\d+)$/, '');
}

/** AU and US spellings both appear in Google Shopping titles. */
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

/**
 * A shopping query for "Philips Hue … Starter Kit" also returns single bulbs,
 * light strips and spare parts from the same sellers. Taking the cheapest price
 * per seller therefore prices a $300 starter kit at $34 — a wrong price beside
 * a buy button, which is exactly what the ACCC treats as misleading.
 *
 * So an item only contributes a price if its title genuinely matches: the brand
 * must be present, and every distinguishing word in the product name must
 * appear. Anything else is discarded rather than ranked lower.
 */
const DISTINGUISHING_WORDS = [
  'starter', 'kit', 'bundle', 'pack', 'bridge', 'strip', 'lightstrip', 'outdoor',
  'doorbell', 'camera', 'cam', 'lock', 'plug', 'bulb', 'speaker', 'display',
  'thermostat', 'purifier', 'vacuum', 'mop', 'hub', 'sensor', 'switch',
];

function isTitleMatch(item, product) {
  const title = normalise(item.title);
  if (!title) return false;
  const name = normalise(product.name);

  if (product.brand && !title.includes(normalise(product.brand))) return false;

  for (const w of DISTINGUISHING_WORDS) {
    if (name.includes(w) && !title.includes(w)) return false;
  }

  // Require a majority of the product's own words to appear.
  const words = name.split(' ').filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  if (!words.length) return false;
  const hits = words.filter((w) => title.includes(w)).length;
  return hits / words.length >= 0.6;
}

function buildKeyword(product) {
  const base = product.name
    .replace(/\s*\((Gen\s*\d+)\)\s*/gi, ' ')
    .replace(/\s+(Pro|Ultra|Gen\s*\d+)$/i, '')
    .trim();
  return [product.brand, base].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON, 'utf8'));

  // Group products by base slug — one query serves every variant.
  const groups = new Map();
  for (const p of products) {
    const key = baseSlug(p.slug);
    if (!groups.has(key)) groups.set(key, { keyword: buildKeyword(p), products: [] });
    groups.get(key).products.push(p);
  }

  let entries = [...groups.entries()];
  if (limit) entries = entries.slice(0, limit);

  console.log(`📦 ${products.length} products → ${groups.size} unique queries`);
  if (limit) console.log(`   limited to ${entries.length} this run`);
  console.log(`💰 estimated cost: $${(entries.length * 0.00133).toFixed(3)}`);

  if (dryRun) {
    console.log('\n🧪 --dry-run: sample queries');
    for (const [key, g] of entries.slice(0, 10)) {
      console.log(`   ${key} → "${g.keyword}" (${g.products.length} variants)`);
    }
    return;
  }

  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    console.error('❌ DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD missing from .env.local');
    process.exit(1);
  }
  const auth = Buffer.from(`${login}:${password}`).toString('base64');
  const headers = { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' };

  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });

  // ---- 1. Post tasks (or reuse a previous run's ids) ----
  let taskMap;
  if (resume && fs.existsSync(STATE_PATH)) {
    taskMap = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    console.log(`\n♻️  Resuming ${Object.keys(taskMap).length} tasks from previous run`);
  } else {
    taskMap = {};
    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
      const batch = entries.slice(i, i + BATCH_SIZE);
      const body = batch.map(([key, g]) => ({
        keyword: g.keyword,
        location_code: LOCATION_CODE,
        language_code: LANGUAGE_CODE,
        depth: 20,
        tag: key,
      }));
      const res = await fetch(POST_URL, { method: 'POST', headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`task_post HTTP ${res.status}`);
      const json = await res.json();
      for (const t of json.tasks || []) {
        if (t.id && t.data?.tag) taskMap[t.data.tag] = t.id;
      }
      console.log(`📮 posted batch ${i / BATCH_SIZE + 1}: ${Object.keys(taskMap).length} tasks queued`);
    }
    fs.writeFileSync(STATE_PATH, JSON.stringify(taskMap, null, 2));
  }

  // ---- 2. Collect results ----
  const pending = new Set(Object.keys(taskMap));
  const results = {};
  const deadline = Date.now() + POLL_MAX_MINUTES * 60 * 1000;

  while (pending.size && Date.now() < deadline) {
    await sleep(POLL_INTERVAL_MS);
    const keys = [...pending];
    for (const key of keys) {
      try {
        const res = await fetch(`${GET_URL}/${taskMap[key]}`, { headers });
        const json = await res.json();
        const task = json.tasks?.[0];
        if (task?.status_code === 20000) {
          results[key] = task.result?.[0]?.items || [];
          pending.delete(key);
        } else if (task?.status_code !== 40602 && task?.status_code !== 40601) {
          console.log(`   ⚠️  ${key}: ${task?.status_code} ${task?.status_message}`);
          pending.delete(key);
        }
      } catch {
        /* transient — retry on the next sweep */
      }
    }
    console.log(`   … ${Object.keys(results).length} ready, ${pending.size} pending`);
  }

  if (pending.size) {
    console.log(`⚠️  ${pending.size} tasks never completed — rerun with --resume to collect them.`);
  }

  // ---- 3. Map seller prices onto retailers ----
  const checkedAt = new Date().toISOString();
  let productsUpdated = 0;
  let pricesSet = 0;

  let rejected = 0;
  for (const [key, items] of Object.entries(results)) {
    const group = groups.get(key);
    // Score against the group's own base product — variants share its identity.
    const reference = group.products[0];

    const byRetailer = new Map();
    for (const item of items) {
      const retailer = matchRetailer(item.seller);
      const price = typeof item.price === 'number' ? item.price : null;
      if (!retailer || !price || price <= 0) continue;
      if (!isTitleMatch(item, reference)) {
        rejected++;
        continue;
      }
      // Second guard: a title can match while the listing is a single unit, a
      // multipack or an accessory bundle. Anything far outside the product's
      // own RRP is discarded rather than published. This only ever removes a
      // price — the retailer row falls back to "Check price".
      if (reference.priceAud) {
        const ratio = price / reference.priceAud;
        if (ratio < 0.35 || ratio > 2) {
          rejected++;
          continue;
        }
      }
      if (!byRetailer.has(retailer) || price < byRetailer.get(retailer)) {
        byRetailer.set(retailer, price);
      }
    }

    for (const product of group.products) {
      let touched = false;
      for (const r of product.retailers || []) {
        const price = byRetailer.get(r.name);
        // Always clear first, so a price rejected on this pass cannot survive
        // from an earlier, looser run.
        delete r.priceAud;
        if (price) {
          r.priceAud = Math.round(price * 100) / 100;
          pricesSet++;
          touched = true;
        }
      }
      if (touched) {
        product.pricesCheckedAt = checkedAt;
        productsUpdated++;
      } else {
        delete product.pricesCheckedAt;
      }
    }
  }
  console.log(`   ${rejected} priced items rejected as non-matching titles`);

  fs.writeFileSync(PRODUCTS_JSON, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
  console.log(`\n✅ ${pricesSet} retailer prices written across ${productsUpdated} products`);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
