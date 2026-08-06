#!/usr/bin/env node
// Enrich freshly imported products using the Google catalogue id already stored
// on each record, replacing their Google Shopping links with real retailer URLs
// and adding descriptions and specifications.
//
//   node scripts/enrich-imported-products.mjs --category lighting
//   node scripts/enrich-imported-products.mjs --category lighting --resume
//
// Why this exists: the shopping search returns `shopping_url` (a Google
// results page) far more often than a direct `url`. A buy button labelled
// "JB Hi-Fi" that lands on google.com.au is broken affiliate flow and reads as
// a bait-and-switch, so imported products are not publishable until their
// links point where the label says.
//
// Only products that still lack a deep link are queried, so re-running is cheap.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
for (const line of (existsSync(join(ROOT, '.env.local')) ? readFileSync(join(ROOT, '.env.local'), 'utf8') : '').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const POST = 'https://api.dataforseo.com/v3/merchant/google/product_info/task_post';
const GET = 'https://api.dataforseo.com/v3/merchant/google/product_info/task_get/advanced';
const PRODUCTS_JSON = join(ROOT, 'public/data/products.json');
const STATE = join(ROOT, 'scratch/enrich-tasks.json');
const LOCATION_CODE = 2036;
const LANGUAGE_CODE = 'en';
const POLL_INTERVAL_MS = 10000;
const POLL_MAX_MINUTES = 25;

const args = process.argv.slice(2);
const resume = args.includes('--resume');
const catIdx = args.indexOf('--category');
const category = catIdx !== -1 ? args[catIdx + 1] : null;

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
  { name: 'eBay AU', patterns: ['ebay'] },
  { name: 'Amazon AU', patterns: ['amazon'] },
];
const EXCLUDED = ['desertcart', 'u-buy', 'ubuy', 'big apple buddy', 'snapklik', 'techinn', 'microless', 'playthek', 'shopee', 'walmart', 'aliexpress', 'cex', 'cash converters'];

function matchRetailer(seller) {
  const s = (seller || '').toLowerCase();
  if (!s || EXCLUDED.some((x) => s.includes(x))) return null;
  return AU_RETAILERS.find((r) => r.patterns.some((p) => s.includes(p)))?.name ?? null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function collect(taskMap, headers) {
  const pending = new Set(Object.keys(taskMap));
  const results = {};
  const deadline = Date.now() + POLL_MAX_MINUTES * 60 * 1000;
  while (pending.size && Date.now() < deadline) {
    for (const key of [...pending]) {
      try {
        const res = await fetch(`${GET}/${taskMap[key]}`, { headers });
        const json = await res.json();
        const t = json.tasks?.[0];
        if (t?.status_code === 20000) { results[key] = t.result?.[0] || null; pending.delete(key); }
        else if (t?.status_code !== 40602 && t?.status_code !== 40601) pending.delete(key);
      } catch { /* transient */ }
    }
    if (pending.size) { console.log(`   … ${Object.keys(results).length} ready, ${pending.size} pending`); await sleep(POLL_INTERVAL_MS); }
  }
  return results;
}

async function main() {
  const products = JSON.parse(readFileSync(PRODUCTS_JSON, 'utf8'));

  const targets = products.filter(
    (p) =>
      p.googleProductId &&
      (!category || p.categorySlug === category) &&
      !(p.retailers || []).some((r) => r.deepLink),
  );

  console.log(`${targets.length} products need a real retailer link`);
  console.log(`estimated cost: $${(targets.length * 0.001).toFixed(3)}`);
  if (!targets.length) return;

  const login = process.env.DATAFORSEO_LOGIN, password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) { console.error('DATAFORSEO credentials missing'); process.exit(1); }
  const headers = {
    Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`,
    'Content-Type': 'application/json',
  };

  mkdirSync(dirname(STATE), { recursive: true });
  let taskMap;
  if (resume && existsSync(STATE)) {
    taskMap = JSON.parse(readFileSync(STATE, 'utf8'));
    console.log(`♻️  Resuming ${Object.keys(taskMap).length} tasks`);
  } else {
    const body = targets.map((p) => ({
      product_id: p.googleProductId, location_code: LOCATION_CODE, language_code: LANGUAGE_CODE, tag: p.slug,
    }));
    const res = await fetch(POST, { method: 'POST', headers, body: JSON.stringify(body) });
    const json = await res.json();
    taskMap = {};
    for (const t of json.tasks || []) if (t.id && t.data?.tag) taskMap[t.data.tag] = t.id;
    writeFileSync(STATE, JSON.stringify(taskMap, null, 2));
    console.log(`📮 ${Object.keys(taskMap).length} tasks queued`);
  }

  const results = await collect(taskMap, headers);

  let linked = 0, described = 0, specced = 0;
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  for (const [slug, result] of Object.entries(results)) {
    const item = result?.items?.[0];
    const product = bySlug.get(slug);
    if (!item || !product) continue;

    // Real seller URLs, keyed by retailer.
    const sellers = new Map();
    for (const s of item.sellers || []) {
      const retailer = matchRetailer(s.title);
      if (retailer && s.url && !sellers.has(retailer)) {
        sellers.set(retailer, { url: s.url, price: s.price?.current });
      }
    }

    for (const r of product.retailers || []) {
      const hit = sellers.get(r.name);
      if (hit) {
        r.url = hit.url;
        r.deepLink = true;
        if (typeof hit.price === 'number' && hit.price > 0) r.priceAud = Math.round(hit.price * 100) / 100;
        linked++;
      }
    }
    // A seller we do not already list is still a genuine place to buy it.
    const existing = new Set((product.retailers || []).map((r) => r.name));
    for (const [retailer, hit] of sellers) {
      if (existing.has(retailer)) continue;
      product.retailers.push({
        name: retailer, url: hit.url, deepLink: true,
        ...(typeof hit.price === 'number' && hit.price > 0 ? { priceAud: Math.round(hit.price * 100) / 100 } : {}),
      });
      linked++;
    }

    if (item.description) {
      product.description = String(item.description)
        .replace(/([.!?])([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 2000);
      described++;
    }
    const specs = (item.specifications || [])
      .filter((s) => s.specification_name && s.specification_value)
      .map((s) => ({ name: s.specification_name, value: s.specification_value }));
    if (specs.length) { product.specifications = specs; specced++; }
    product.pricesCheckedAt = new Date().toISOString();
  }

  writeFileSync(PRODUCTS_JSON, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
  console.log(`\n✅ ${linked} retailer links, ${described} descriptions, ${specced} spec sets`);
}

main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
