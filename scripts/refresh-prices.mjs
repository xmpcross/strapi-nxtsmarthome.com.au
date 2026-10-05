#!/usr/bin/env node
// Refresh retailer prices in public/data/products.json from DataForSEO product_info,
// looking each product up by its Google product id (not by keyword).
//
//   node scripts/refresh-prices.mjs --dry-run     # report only
//   node scripts/refresh-prices.mjs               # write products.json when anything changed
//
// Env: DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD (plain login/password).
// Cost: about $0.0013 per product (~$0.30 for the whole catalogue).
//
// Why not fetch-retailer-prices.mjs: that matches by keyword and deletes the price of every
// retailer it cannot match, which strips prices from products added by
// add-products-min-offers.mjs (they carry direct links, found via product_info).
//
// Rules:
//   - Only AU retailers (same list as the importers); grey-market sellers are ignored.
//   - A retailer already on the product gets its price (and direct URL) updated.
//   - A retailer not seen this time keeps its old price and is never deleted: one missing
//     result must not blank a price. Prices older than STALE_DAYS are dropped instead.
//   - A newly found AU retailer with a direct URL and price is appended.
//   - A change of more than HOLD_RATIO either way is NOT applied and is listed in the report.
//   - Nothing is written when no product changed.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PRODUCTS_JSON = join(ROOT, 'public/data/products.json');
const REPORT_DIR = join(ROOT, 'scratch');
const POST = 'https://api.dataforseo.com/v3/merchant/google/product_info/task_post';
const GET = 'https://api.dataforseo.com/v3/merchant/google/product_info/task_get/advanced';
const POLL_INTERVAL_MS = 10000;
const POLL_MAX_MINUTES = 25;
const HOLD_RATIO = 1.5; // hold changes above x1.5 or below x1/1.5
const STALE_DAYS = 14;

const dryRun = process.argv.includes('--dry-run');

const AU_RETAILERS = [
  ['JB Hi-Fi', ['jb hi-fi', 'jbhifi']], ['The Good Guys', ['good guys']], ['Harvey Norman', ['harvey norman']],
  ['Officeworks', ['officeworks']], ['Bunnings', ['bunnings']], ['Bing Lee', ['bing lee', 'binglee']],
  ['Kogan AU', ['kogan']], ['Scorptec', ['scorptec']], ['Mwave', ['mwave']], ['Woolworths', ['woolworths']],
  ['BIG W', ['big w']], ['Kmart', ['kmart']], ['Costco AU', ['costco']], ['Appliances Online', ['appliances online']],
  ['Amazon AU', ['amazon']], ['eBay AU', ['ebay']],
];
const EXCLUDED_SELLERS = ['desertcart', 'u-buy', 'ubuy', 'big apple buddy', 'snapklik', 'techinn', 'microless', 'playthek',
  'mcgrocer', 'crowdshop', 'good buyz', 'etsy', 'cex', 'cash converters', 'shopee', 'walmart', 'aliexpress'];
function matchRetailer(seller) {
  const s = (seller || '').toLowerCase();
  if (!s || EXCLUDED_SELLERS.some((x) => s.includes(x))) return null;
  return AU_RETAILERS.find(([, pats]) => pats.some((p) => s.includes(p)))?.[0] ?? null;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const round2 = (n) => Math.round(n * 100) / 100;

async function main() {
  const login = process.env.DATAFORSEO_LOGIN, password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) { console.error('DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD not set'); process.exit(1); }
  const headers = { Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`, 'Content-Type': 'application/json' };

  const products = JSON.parse(readFileSync(PRODUCTS_JSON, 'utf8'));
  const targets = products.filter((p) => p.googleProductId);
  console.log(`${targets.length} of ${products.length} products have a Google product id ≈ $${(targets.length * 0.00133).toFixed(2)}`);
  if (dryRun) { console.log('--dry-run: nothing posted'); return; }

  const pids = [...new Set(targets.map((p) => String(p.googleProductId)))];
  const tasks = {};
  for (let i = 0; i < pids.length; i += 100) {
    const body = pids.slice(i, i + 100).map((product_id) => ({ product_id, location_code: 2036, language_code: 'en', tag: product_id }));
    const res = await fetch(POST, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!res.ok) { console.error(`task_post HTTP ${res.status}`); process.exit(1); }
    for (const t of (await res.json()).tasks || []) if (t.id && t.data?.tag) tasks[t.data.tag] = t.id;
  }
  console.log(`posted ${Object.keys(tasks).length} tasks`);

  const results = {};
  const pending = new Set(Object.keys(tasks));
  const deadline = Date.now() + POLL_MAX_MINUTES * 60 * 1000;
  while (pending.size && Date.now() < deadline) {
    for (const pid of [...pending]) {
      try {
        const r = await fetch(`${GET}/${tasks[pid]}`, { headers });
        const t = (await r.json()).tasks?.[0];
        if (t?.status_code === 20000) { results[pid] = t.result?.[0]?.items?.[0] || null; pending.delete(pid); }
        else if (t?.status_code !== 40602 && t?.status_code !== 40601) pending.delete(pid);
      } catch { /* transient */ }
    }
    if (pending.size) await sleep(POLL_INTERVAL_MS);
  }
  console.log(`${Object.keys(results).length} results, ${pids.length - Object.keys(results).length} missing`);

  const now = new Date();
  const nowIso = now.toISOString();
  const held = [];
  let updated = 0, added = 0, dropped = 0, changedProducts = 0;

  for (const p of targets) {
    const item = results[String(p.googleProductId)];
    if (!item) continue; // no result: leave the product exactly as it is
    const found = new Map();
    for (const s of item.sellers || []) {
      const retailer = matchRetailer(s.title);
      const price = s.price?.current;
      if (!retailer || !s.url || typeof price !== 'number' || price <= 0) continue;
      const cur = found.get(retailer);
      if (!cur || price < cur.price) found.set(retailer, { price: round2(price), url: s.url });
    }
    if (!found.size) continue; // nothing usable: do not touch

    let changed = false;
    for (const r of p.retailers || []) {
      const f = found.get(r.name);
      if (f) {
        const old = r.priceAud;
        if (typeof old === 'number' && old > 0 && (f.price / old > HOLD_RATIO || f.price / old < 1 / HOLD_RATIO)) {
          held.push({ slug: p.slug, retailer: r.name, old, new: f.price });
        } else if (old !== f.price) {
          r.priceAud = f.price; changed = true; updated++;
        }
        if (!r.deepLink) { r.url = f.url; r.deepLink = true; changed = true; }
        found.delete(r.name);
      } else if (r.priceAud && p.pricesCheckedAt && (now - new Date(p.pricesCheckedAt)) / 86400000 > STALE_DAYS) {
        delete r.priceAud; changed = true; dropped++;
      }
    }
    for (const [name, f] of found) {
      (p.retailers ||= []).push({ name, url: f.url, primary: false, priceAud: f.price, deepLink: true });
      changed = true; added++;
    }
    if (changed) {
      const prices = (p.retailers || []).map((r) => r.priceAud).filter((n) => typeof n === 'number' && n > 0);
      if (prices.length) p.priceAud = Math.min(...prices);
      p.pricesCheckedAt = nowIso;
      changedProducts++;
    } else p.pricesCheckedAt = nowIso;
  }

  mkdirSync(REPORT_DIR, { recursive: true });
  const report = join(REPORT_DIR, `price-refresh-${nowIso.slice(0, 10)}.json`);
  writeFileSync(report, JSON.stringify({ at: nowIso, updated, added, dropped, changedProducts, held }, null, 2));
  console.log(`prices updated ${updated}, retailers added ${added}, stale prices dropped ${dropped}, products changed ${changedProducts}, held for review ${held.length}`);
  for (const h of held) console.log(`  HELD ${h.slug} | ${h.retailer} | ${h.old} -> ${h.new}`);

  if (changedProducts) {
    writeFileSync(PRODUCTS_JSON, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
    console.log('products.json written');
    process.exitCode = 0;
  } else console.log('no changes; products.json left alone');
}

main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
