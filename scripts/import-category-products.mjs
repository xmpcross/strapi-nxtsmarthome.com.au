#!/usr/bin/env node
// Top up each category from the Google Shopping catalogue until it holds a
// target number of products.
//
//   node scripts/import-category-products.mjs --dry-run
//   node scripts/import-category-products.mjs --only lighting
//   node scripts/import-category-products.mjs --resume
//
// Env (.env.local): DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD
//
// WHAT THIS DOES NOT DO
//
// The original catalogue was generated: invented "-pro"/"-ultra" variants,
// identical pros/cons on every record, and ratings that never fell below 4.5.
// All of that has since been pruned, and this importer will not recreate it.
// Every field written here comes from the API response:
//
//   • no variants are synthesised
//   • no pros/cons are written
//   • rating is copied only when the listing actually carries one
//   • priceAud is the seller's real price, never an invented RRP
//   • a product with no usable title, price or image is skipped, not padded
//
// ON "NEWEST": the API exposes no release date and no recency sort. Ordering is
// Google's own `rank_absolute`, which is a popularity/relevance proxy — that
// part of the brief is genuinely satisfiable. Recency is only approximated by
// year-qualified keywords, so treat "newest" as "currently prominent".

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
for (const line of (existsSync(join(ROOT, '.env.local')) ? readFileSync(join(ROOT, '.env.local'), 'utf8') : '').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const POST = 'https://api.dataforseo.com/v3/merchant/google/products/task_post';
const GET = 'https://api.dataforseo.com/v3/merchant/google/products/task_get/advanced';
const PRODUCTS_JSON = join(ROOT, 'public/data/products.json');
const STATE = join(ROOT, 'scratch/import-tasks.json');
const IMAGE_DIR = join(ROOT, 'public/images/products');
const LOCATION_CODE = 2036;
const LANGUAGE_CODE = 'en';
const POLL_INTERVAL_MS = 10000;
const POLL_MAX_MINUTES = 25;

const MIN_PER_CATEGORY = 30;
const MAX_PER_CATEGORY = 42; // upper bound for the "random number" in the brief

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const resume = args.includes('--resume');
// --only accepts a comma-separated list, so several categories can be topped
// up in one batch of tasks rather than one run each.
const onlyIdx = args.indexOf('--only');
const only = onlyIdx !== -1 ? String(args[onlyIdx + 1]).split(',').map((x) => x.trim()) : null;
// Exact number to add, overriding the randomised target. Used when topping up
// one category by a specific amount rather than filling to a floor.
const countIdx = args.indexOf('--count');
const exactCount = countIdx !== -1 ? Number(args[countIdx + 1]) : null;

/**
 * Robot Vacuums is deliberately absent — the brief excludes it.
 * Each keyword doubles as the subcategory for whatever it finds, so the
 * subCategory field stays honest rather than being guessed from the title.
 */
const CATEGORIES = [
  {
    key: 'security', slug: 'security-and-cameras', name: 'Security & Cameras',
    queries: [
      ['smart security camera Australia 2026', 'Security Cameras'],
      ['video doorbell Australia', 'Video Doorbells'],
      ['smart lock Australia', 'Smart Locks'],
      ['outdoor security camera solar Australia', 'Security Cameras'],
      ['alarm system sensor kit Australia', 'Alarm Systems & Sensors'],
    ],
  },
  {
    key: 'lighting', slug: 'lighting', name: 'Lighting',
    queries: [
      ['smart light bulb E27 B22 Australia 2026', 'Smart Bulbs'],
      ['smart LED light strip Australia', 'Smart Lightstrips'],
      ['smart light switch Australia', 'Smart Wall Switches'],
      ['smart outdoor garden lighting Australia', 'Outdoor Lighting'],
      ['smart downlight Australia', 'Smart Bulbs'],
    ],
  },
  {
    key: 'energy', slug: 'energy-and-solar', name: 'Energy & Solar',
    queries: [
      ['smart plug energy monitoring Australia 2026', 'Smart Plugs'],
      ['portable power station Australia', 'Portable Power Stations'],
      ['smart power board surge Australia', 'Power Boards'],
      ['home energy monitor solar Australia', 'Energy Relays & Meters'],
      ['smart circuit breaker relay Australia', 'Energy Relays & Meters'],
    ],
  },
  {
    key: 'entertainment', slug: 'entertainment-and-audio', name: 'Entertainment & Audio',
    queries: [
      ['smart speaker Australia 2026', 'Smart Speakers'],
      ['soundbar Australia', 'Smart Soundbars'],
      ['smart display screen Australia', 'Smart Displays & TV Boxes'],
      ['streaming media player Australia', 'Smart Displays & TV Boxes'],
      ['multiroom wireless speaker Australia', 'Smart Speakers'],
    ],
  },
  {
    key: 'climate', slug: 'climate-and-comfort', name: 'Climate & Comfort',
    queries: [
      ['smart air conditioner controller Australia 2026', 'Smart AC Controllers & Thermostats'],
      ['air purifier smart Australia', 'Air Purifiers & Monitors'],
      ['smart thermostat Australia', 'Smart AC Controllers & Thermostats'],
      ['temperature humidity sensor smart Australia', 'Climate Sensors'],
      ['smart ceiling fan controller Australia', 'Smart AC Controllers & Thermostats'],
    ],
  },
  {
    key: 'hubs-and-platforms', slug: 'hubs-and-platforms', name: 'Hubs & Platforms',
    queries: [
      ['Matter smart home hub Australia 2026', 'Matter & Thread Hubs'],
      ['Zigbee Z-Wave hub coordinator Australia', 'Zigbee & Z-Wave Coordinators'],
      ['smart home controller panel Australia', 'Automation Controllers'],
      ['Thread border router Australia', 'Matter & Thread Hubs'],
      ['home automation bridge Australia', 'Automation Controllers'],
    ],
  },
];

const AU_RETAILERS = [
  { name: 'JB Hi-Fi', patterns: ['jb hi-fi', 'jbhifi'] },
  { name: 'The Good Guys', patterns: ['good guys'] },
  { name: 'Harvey Norman', patterns: ['harvey norman'] },
  { name: 'Officeworks', patterns: ['officeworks'] },
  { name: 'Bunnings', patterns: ['bunnings'] },
  { name: 'Bing Lee', patterns: ['bing lee', 'binglee'] },
  { name: 'Kogan AU', patterns: ['kogan'] },
  { name: 'Scorptec', patterns: ['scorptec'] },
  { name: 'Mwave', patterns: ['mwave'] },
  { name: 'Woolworths', patterns: ['woolworths'] },
  { name: 'BIG W', patterns: ['big w'] },
  { name: 'Kmart', patterns: ['kmart'] },
  { name: 'Bunnings', patterns: ['bunnings'] },
  { name: 'eBay AU', patterns: ['ebay'] },
  { name: 'Amazon AU', patterns: ['amazon'] },
];

/**
 * Parallel importers and second-hand resellers. Their listings are grey-market
 * stock with no Australian warranty, which contradicts what the site tells
 * readers to buy, so a product sold only by these is not imported at all.
 */
const EXCLUDED_SELLERS = [
  'desertcart', 'u-buy', 'ubuy', 'big apple buddy', 'snapklik', 'techinn',
  'microless', 'playthek', 'mcgrocer', 'crowdshop', 'good buyz', 'etsy',
  'cex', 'cash converters', 'shopee', 'walmart', 'aliexpress',
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const normalise = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function matchRetailer(seller) {
  const s = (seller || '').toLowerCase();
  if (!s) return null;
  if (EXCLUDED_SELLERS.some((x) => s.includes(x))) return null;
  return AU_RETAILERS.find((r) => r.patterns.some((p) => s.includes(p)))?.name ?? null;
}

/** Brand is the first word or two of the title, which is how Google formats these. */
function splitBrand(title) {
  const words = title.trim().split(/\s+/);
  const twoWord = ['philips hue', 'harvey norman', 'google nest', 'amazon basics', 'tp link', 'home assistant'];
  const firstTwo = words.slice(0, 2).join(' ').toLowerCase();
  if (twoWord.includes(firstTwo)) return { brand: words.slice(0, 2).join(' '), name: words.slice(2).join(' ') || title };
  return { brand: words[0], name: words.slice(1).join(' ') || title };
}

async function collect(taskMap, headers) {
  const pending = new Set(Object.keys(taskMap));
  const results = {};
  const deadline = Date.now() + POLL_MAX_MINUTES * 60 * 1000;
  while (pending.size && Date.now() < deadline) {
    for (const key of [...pending]) {
      try {
        const res = await fetch(`${GET}/${taskMap[key]}`, { headers });
        const json = await res.json();
        const task = json.tasks?.[0];
        if (task?.status_code === 20000) {
          results[key] = task.result?.[0]?.items || [];
          pending.delete(key);
        } else if (task?.status_code !== 40602 && task?.status_code !== 40601) {
          pending.delete(key);
        }
      } catch { /* transient */ }
    }
    if (pending.size) {
      console.log(`   … ${Object.keys(results).length} ready, ${pending.size} pending`);
      await sleep(POLL_INTERVAL_MS);
    }
  }
  return results;
}

async function main() {
  const products = JSON.parse(readFileSync(PRODUCTS_JSON, 'utf8'));
  const seenNames = new Set(products.map((p) => normalise(`${p.brand} ${p.name}`)));
  const seenSlugs = new Set(products.map((p) => p.slug));

  const counts = {};
  for (const p of products) counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;

  let cats = CATEGORIES.filter((c) => !only || only.includes(c.key) || only.includes(c.slug));

  // A random target per category, never below the floor in the brief.
  const targets = {};
  for (const c of cats) {
    const have = counts[c.slug] || 0;
    if (exactCount) {
      targets[c.slug] = { have, target: have + exactCount, need: exactCount };
      continue;
    }
    const target = MIN_PER_CATEGORY + Math.floor(Math.random() * (MAX_PER_CATEGORY - MIN_PER_CATEGORY + 1));
    targets[c.slug] = { have, target, need: Math.max(0, target - have) };
  }

  console.log('PLAN');
  for (const c of cats) {
    const t = targets[c.slug];
    console.log(`  ${c.name.padEnd(24)} have ${String(t.have).padStart(3)} → target ${t.target}  (import ${t.need})`);
  }
  const queries = cats.filter((c) => targets[c.slug].need > 0).flatMap((c) => c.queries.map((q) => [c, q]));
  console.log(`\n${queries.length} shopping queries ≈ $${(queries.length * 0.00133).toFixed(3)}`);
  console.log('Robot Vacuums excluded by design.');
  if (dryRun) {
    console.log('\n--dry-run: nothing posted');
    return;
  }

  const login = process.env.DATAFORSEO_LOGIN, password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) { console.error('DATAFORSEO credentials missing'); process.exit(1); }
  const auth = Buffer.from(`${login}:${password}`).toString('base64');
  const headers = { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' };

  mkdirSync(dirname(STATE), { recursive: true });
  let taskMap;
  if (resume && existsSync(STATE)) {
    taskMap = JSON.parse(readFileSync(STATE, 'utf8'));
    console.log(`\n♻️  Resuming ${Object.keys(taskMap).length} tasks`);
  } else {
    const body = queries.map(([c, [kw, sub]]) => ({
      keyword: kw, location_code: LOCATION_CODE, language_code: LANGUAGE_CODE,
      depth: 40, tag: `${c.slug}|${sub}|${kw}`,
    }));
    const res = await fetch(POST, { method: 'POST', headers, body: JSON.stringify(body) });
    const json = await res.json();
    taskMap = {};
    for (const t of json.tasks || []) if (t.id && t.data?.tag) taskMap[t.data.tag] = t.id;
    writeFileSync(STATE, JSON.stringify(taskMap, null, 2));
    console.log(`\n📮 ${Object.keys(taskMap).length} tasks queued`);
  }

  const results = await collect(taskMap, headers);

  // Group candidates per category, preserving Google's ranking.
  const byCategory = {};
  for (const [tag, items] of Object.entries(results)) {
    const [slug, sub] = tag.split('|');
    (byCategory[slug] ||= []).push(...items.map((i) => ({ item: i, sub })));
  }

  mkdirSync(IMAGE_DIR, { recursive: true });
  let added = 0;
  const report = {};

  for (const c of cats) {
    const need = targets[c.slug].need;
    if (!need) continue;
    const pool = (byCategory[c.slug] || []).sort(
      (a, b) => (a.item.rank_absolute ?? 999) - (b.item.rank_absolute ?? 999),
    );

    let taken = 0;
    for (const { item, sub } of pool) {
      if (taken >= need) break;

      const title = (item.title || '').trim();
      const price = typeof item.price === 'number' ? item.price : null;
      const image = (item.product_images || [])[0];
      const retailer = matchRetailer(item.seller);

      // Everything below must be real. A listing missing any of it is skipped
      // rather than padded out with placeholders.
      if (!title || !price || price <= 0 || !image || !retailer) continue;

      const { brand, name } = splitBrand(title);
      const key = normalise(title);
      if (seenNames.has(key)) continue;

      let slug = slugify(`${brand}-${name}`);
      if (!slug || seenSlugs.has(slug)) continue;

      // Download the listing image; skip the product if it will not load.
      let imagePath = null;
      try {
        const r = await fetch(image);
        if (r.ok) {
          const buf = Buffer.from(await r.arrayBuffer());
          const ct = r.headers.get('content-type') || '';
          const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : 'jpg';
          writeFileSync(join(IMAGE_DIR, `${slug}.${ext}`), buf);
          imagePath = `/images/products/${slug}.${ext}`;
        }
      } catch { /* fall through */ }
      if (!imagePath) continue;

      const record = {
        id: slug,
        slug,
        name: name || title,
        brand,
        categoryKey: c.key,
        categorySlug: c.slug,
        categoryName: c.name,
        subCategory: sub,
        priceAud: Math.round(price * 100) / 100,
        currency: item.currency || 'AUD',
        image: imagePath,
        retailers: [{ name: retailer, url: item.url || item.shopping_url, primary: true, priceAud: Math.round(price * 100) / 100, deepLink: Boolean(item.url) }],
        pricesCheckedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // Only carried when the listing genuinely has them.
      if (item.description) record.description = String(item.description).slice(0, 2000);
      if (typeof item.product_rating?.value === 'number') {
        record.ratingReal = item.product_rating.value;
        if (item.product_rating.votes_count) record.reviewCountReal = item.product_rating.votes_count;
      }
      if (item.product_id) record.googleProductId = String(item.product_id);

      products.push(record);
      seenNames.add(key);
      seenSlugs.add(slug);
      taken++;
      added++;
    }
    report[c.name] = { before: targets[c.slug].have, added: taken, after: targets[c.slug].have + taken, target: targets[c.slug].target };
  }

  writeFileSync(PRODUCTS_JSON, `${JSON.stringify(products, null, 2)}\n`, 'utf8');

  console.log('\nRESULT');
  for (const [name, r] of Object.entries(report)) {
    const flag = r.after < MIN_PER_CATEGORY ? `  ⚠️ below ${MIN_PER_CATEGORY}` : '';
    console.log(`  ${name.padEnd(24)} ${r.before} → ${r.after}  (target ${r.target}, added ${r.added})${flag}`);
  }
  console.log(`\n✅ ${added} products imported — catalogue now ${products.length}`);
}

main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
