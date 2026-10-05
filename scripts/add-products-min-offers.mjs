#!/usr/bin/env node
// Add new catalogue products that have at least N real AU retailer offers.
//
//   node scripts/add-products-min-offers.mjs --category robot-vacuums            # preview, nothing written
//   node scripts/add-products-min-offers.mjs --category robot-vacuums --write    # write products.json + images
//   node scripts/add-products-min-offers.mjs --min-offers 3 --max 20 --resume
//
// Env: DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD (plain login/password, not the pre-encoded token).
//
// Phase 1: Google Shopping queries find candidate products (by Google product id).
// Phase 2: the product_info endpoint is called per candidate for its sellers, specs, images
// and description (~$0.001 each). Only products sold by at least --min-offers distinct
// Australian retailers, each with a direct product URL, are kept.
// Every field comes from the API response; nothing is invented or synthesised, and the
// parallel importers excluded by the other importers are excluded here too. Raw API
// results are cached in scratch/ so a preview and a --write cost one set of queries.
// The short description is not written here: it is an editorial rewrite (see
// fetch-product-descriptions.mjs / the CMS flow), so new products are added without one.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { offTopicReason } from '../lib/catalogue-guard.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
for (const line of (existsSync(join(ROOT, '.env.local')) ? readFileSync(join(ROOT, '.env.local'), 'utf8') : '').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const POST = 'https://api.dataforseo.com/v3/merchant/google/products/task_post';
const GET = 'https://api.dataforseo.com/v3/merchant/google/products/task_get/advanced';
const PRODUCTS_JSON = join(ROOT, 'public/data/products.json');
const cacheFile = (slug) => join(ROOT, `scratch/add-products-raw-${slug}.json`);
const infoCacheFile = (slug) => join(ROOT, `scratch/add-products-info-${slug}.json`);
const INFO_POST = 'https://api.dataforseo.com/v3/merchant/google/product_info/task_post';
const INFO_GET = 'https://api.dataforseo.com/v3/merchant/google/product_info/task_get/advanced';
const IMAGE_DIR = join(ROOT, 'public/images/products');
const POLL_INTERVAL_MS = 10000;
const POLL_MAX_MINUTES = 25;

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(`--${n}`); return i === -1 ? d : args[i + 1]; };
const write = args.includes('--write');
const resume = args.includes('--resume');
const category = flag('category', 'robot-vacuums');
const MIN_OFFERS = Number(flag('min-offers', 3));
const MAX_ADD = Number(flag('max', 20));
const CANDIDATES = Number(flag('candidates', 60)); // product_info lookups to spend

const CATEGORIES = {
  'robot-vacuums': {
    key: 'robot-vacuums', slug: 'robot-vacuums', name: 'Robot Vacuums',
    queries: [
      ['robot vacuum cleaner Australia', 'Robot Vacuums & Mops'],
      ['robot vacuum and mop self-emptying Australia', 'Self-Emptying Docks'],
      ['Roborock robot vacuum', 'Robot Vacuums & Mops'],
      ['Ecovacs Deebot robot vacuum', 'Robot Vacuums & Mops'],
      ['Dreame robot vacuum', 'Robot Vacuums & Mops'],
      ['iRobot Roomba robot vacuum', 'Robot Vacuums & Mops'],
      ['eufy robot vacuum', 'Robot Vacuums & Mops'],
    ],
  },
};

const CATEGORY_LIST = [
  ['security', 'security-and-cameras', 'Security & Cameras', [
    ['smart security camera Australia 2026', 'Security Cameras'], ['video doorbell Australia', 'Video Doorbells'],
    ['smart lock Australia', 'Smart Locks'], ['outdoor security camera solar Australia', 'Security Cameras'],
    ['alarm system sensor kit Australia', 'Alarm Systems & Sensors']]],
  ['lighting', 'lighting', 'Lighting', [
    ['smart light bulb E27 B22 Australia 2026', 'Smart Bulbs'], ['smart LED light strip Australia', 'Smart Lightstrips'],
    ['smart light switch Australia', 'Smart Wall Switches'], ['smart outdoor garden lighting Australia', 'Outdoor Lighting'],
    ['smart downlight Australia', 'Smart Bulbs']]],
  ['energy', 'energy-and-solar', 'Energy & Solar', [
    ['smart plug energy monitoring Australia 2026', 'Smart Plugs'], ['portable power station Australia', 'Portable Power Stations'],
    ['smart power board surge Australia', 'Power Boards'], ['home energy monitor solar Australia', 'Energy Relays & Meters'],
    ['smart circuit breaker relay Australia', 'Energy Relays & Meters']]],
  ['entertainment', 'entertainment-and-audio', 'Entertainment & Audio', [
    ['smart speaker Australia 2026', 'Smart Speakers'], ['soundbar Australia', 'Smart Soundbars'],
    ['smart display screen Australia', 'Smart Displays & TV Boxes'], ['streaming media player Australia', 'Smart Displays & TV Boxes'],
    ['multiroom wireless speaker Australia', 'Smart Speakers']]],
  ['climate', 'climate-and-comfort', 'Climate & Comfort', [
    ['smart air conditioner controller Australia 2026', 'Smart AC Controllers & Thermostats'], ['air purifier smart Australia', 'Air Purifiers & Monitors'],
    ['smart thermostat Australia', 'Smart AC Controllers & Thermostats'], ['temperature humidity sensor smart Australia', 'Climate Sensors'],
    ['smart ceiling fan controller Australia', 'Smart AC Controllers & Thermostats']]],
  ['hubs-and-platforms', 'hubs-and-platforms', 'Hubs & Platforms', [
    ['Matter smart home hub Australia 2026', 'Matter & Thread Hubs'], ['Zigbee Z-Wave hub coordinator Australia', 'Zigbee & Z-Wave Coordinators'],
    ['smart home controller panel Australia', 'Automation Controllers'], ['Thread border router Australia', 'Matter & Thread Hubs'],
    ['home automation bridge Australia', 'Automation Controllers']]],
];
for (const [key, slug, name, queries] of CATEGORY_LIST) CATEGORIES[slug] = { key, slug, name, queries };

const AU_RETAILERS = [
  ['JB Hi-Fi', ['jb hi-fi', 'jbhifi']], ['The Good Guys', ['good guys']], ['Harvey Norman', ['harvey norman']],
  ['Officeworks', ['officeworks']], ['Bunnings', ['bunnings']], ['Bing Lee', ['bing lee', 'binglee']],
  ['Kogan AU', ['kogan']], ['Scorptec', ['scorptec']], ['Mwave', ['mwave']], ['Woolworths', ['woolworths']],
  ['BIG W', ['big w']], ['Kmart', ['kmart']], ['Costco AU', ['costco']], ['Appliances Online', ['appliances online']],
  ['Amazon AU', ['amazon']], ['eBay AU', ['ebay']],
];
// Grey-market importers and second-hand resellers: no Australian warranty.
const EXCLUDED_SELLERS = ['desertcart', 'u-buy', 'ubuy', 'big apple buddy', 'snapklik', 'techinn', 'microless', 'playthek',
  'mcgrocer', 'crowdshop', 'good buyz', 'etsy', 'cex', 'cash converters', 'shopee', 'walmart', 'aliexpress'];

const normalise = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function matchRetailer(seller) {
  const s = (seller || '').toLowerCase();
  if (!s || EXCLUDED_SELLERS.some((x) => s.includes(x))) return null;
  return AU_RETAILERS.find(([, pats]) => pats.some((p) => s.includes(p)))?.[0] ?? null;
}
function splitBrand(title) {
  const words = title.trim().split(/\s+/);
  return { brand: words[0], name: words.slice(1).join(' ') || title };
}

async function fetchRaw(cat) {
  const CACHE = cacheFile(cat.slug);
  if (existsSync(CACHE)) {
    const c = JSON.parse(readFileSync(CACHE, 'utf8'));
    console.log(`Using cached search results (${CACHE.replace(ROOT + '/', '')})`);
    return c.results;
  }
  const login = process.env.DATAFORSEO_LOGIN, password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) { console.error('DATAFORSEO credentials missing'); process.exit(1); }
  const headers = { Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`, 'Content-Type': 'application/json' };
  const body = cat.queries.map(([kw, sub]) => ({ keyword: kw, location_code: 2036, language_code: 'en', depth: 100, tag: `${sub}|${kw}` }));
  console.log(`Posting ${body.length} queries ≈ $${(body.length * 0.00133).toFixed(3)}`);
  const res = await fetch(POST, { method: 'POST', headers, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) { console.error(`task_post HTTP ${res.status}`); process.exit(1); }
  const tasks = {};
  for (const t of json.tasks || []) if (t.id && t.data?.tag) tasks[t.data.tag] = t.id;
  const pending = new Set(Object.keys(tasks));
  const results = {};
  const deadline = Date.now() + POLL_MAX_MINUTES * 60 * 1000;
  while (pending.size && Date.now() < deadline) {
    for (const tag of [...pending]) {
      try {
        const r = await fetch(`${GET}/${tasks[tag]}`, { headers });
        const t = (await r.json()).tasks?.[0];
        if (t?.status_code === 20000) { results[tag] = t.result?.[0]?.items || []; pending.delete(tag); }
        else if (t?.status_code !== 40602 && t?.status_code !== 40601) pending.delete(tag);
      } catch { /* transient */ }
    }
    if (pending.size) { console.log(`   … ${Object.keys(results).length} ready, ${pending.size} pending`); await sleep(POLL_INTERVAL_MS); }
  }
  mkdirSync(dirname(CACHE), { recursive: true });
  writeFileSync(CACHE, JSON.stringify({ category: cat.slug, results }));
  return results;
}

async function fetchInfo(slug, pids, headers) {
  const INFO_CACHE = infoCacheFile(slug);
  const cache = existsSync(INFO_CACHE) ? JSON.parse(readFileSync(INFO_CACHE, 'utf8')) : {};
  const need = pids.filter((p) => !cache[p]);
  if (need.length) {
    console.log(`product_info for ${need.length} candidates ≈ $${(need.length * 0.00133).toFixed(3)}`);
    const tasks = {};
    for (let i = 0; i < need.length; i += 100) {
      const body = need.slice(i, i + 100).map((product_id) => ({ product_id, location_code: 2036, language_code: 'en', tag: product_id }));
      const res = await fetch(INFO_POST, { method: 'POST', headers, body: JSON.stringify(body) });
      if (!res.ok) { console.error(`product_info task_post HTTP ${res.status}`); process.exit(1); }
      for (const t of (await res.json()).tasks || []) if (t.id && t.data?.tag) tasks[t.data.tag] = t.id;
    }
    const pending = new Set(Object.keys(tasks));
    const deadline = Date.now() + POLL_MAX_MINUTES * 60 * 1000;
    while (pending.size && Date.now() < deadline) {
      for (const pid of [...pending]) {
        try {
          const r = await fetch(`${INFO_GET}/${tasks[pid]}`, { headers });
          const t = (await r.json()).tasks?.[0];
          if (t?.status_code === 20000) { cache[pid] = t.result?.[0]?.items?.[0] || { empty: true }; pending.delete(pid); }
          else if (t?.status_code !== 40602 && t?.status_code !== 40601) pending.delete(pid);
        } catch { /* transient */ }
      }
      if (pending.size) { console.log(`   … ${Object.keys(tasks).length - pending.size} ready, ${pending.size} pending`); await sleep(POLL_INTERVAL_MS); }
    }
    writeFileSync(INFO_CACHE, JSON.stringify(cache));
  } else console.log('Using cached product_info results');
  return cache;
}

const cleanDescription = (d) => (d || '')
  .replace(/([.!?])([A-Z])/g, '$1 $2').replace(/([a-z0-9])([A-Z][a-z])/g, '$1. $2').replace(/\s+/g, ' ').trim();

async function runCategory(cat) {
  console.log(`\n=================== ${cat.name} ===================`);
  const products = JSON.parse(readFileSync(PRODUCTS_JSON, 'utf8'));
  const seenNames = new Set(products.map((p) => normalise(`${p.brand} ${p.name}`)));
  const seenSlugs = new Set(products.map((p) => p.slug));
  const seenGpids = new Set(products.map((p) => p.googleProductId).filter(Boolean));

  const results = await fetchRaw(cat);

  // Candidates: one per Google product id, most prominent first, not already stocked.
  const byPid = new Map();
  for (const [tag, items] of Object.entries(results)) {
    const sub = tag.split('|')[0];
    for (const item of items) {
      const title = (item.title || '').trim();
      if (!title || !item.product_id || offTopicReason(title, cat.slug)) continue;
      const pid = String(item.product_id);
      const cur = byPid.get(pid);
      const rank = item.rank_absolute ?? 999;
      if (!cur || rank < cur.rank) byPid.set(pid, { pid, title, sub, rank });
    }
  }
  const candidates = [...byPid.values()]
    .filter((c) => !seenGpids.has(c.pid) && !seenNames.has(normalise(c.title)))
    .sort((a, b) => a.rank - b.rank).slice(0, CANDIDATES);
  console.log(`${byPid.size} distinct products found; checking the top ${candidates.length} for retailer offers`);

  const login = process.env.DATAFORSEO_LOGIN, password = process.env.DATAFORSEO_PASSWORD;
  const headers = { Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`, 'Content-Type': 'application/json' };
  const info = await fetchInfo(cat.slug, candidates.map((c) => c.pid), headers);

  const kept = [];
  for (const c of candidates) {
    const item = info[c.pid];
    if (!item || item.empty) continue;
    const byRetailer = new Map();
    for (const s of item.sellers || []) {
      const retailer = matchRetailer(s.title);
      const price = s.price?.current;
      if (!retailer || !s.url || typeof price !== 'number' || price <= 0) continue;
      const cur = byRetailer.get(retailer);
      if (!cur || price < cur.price) byRetailer.set(retailer, { price, url: s.url });
    }
    if (byRetailer.size < MIN_OFFERS) continue;
    const title = (item.title || c.title).trim();
    const { brand, name } = splitBrand(title);
    const slug = slugify(`${brand}-${name}`);
    if (!slug || seenSlugs.has(slug) || seenNames.has(normalise(title))) continue;
    kept.push({ c, item, title, brand, name, slug, offers: [...byRetailer].map(([retailer, o]) => ({ retailer, ...o })).sort((a, b) => a.price - b.price) });
  }
  kept.sort((a, b) => b.offers.length - a.offers.length || a.c.rank - b.c.rank);
  const picked = kept.slice(0, MAX_ADD);

  console.log(`\n${kept.length} of ${candidates.length} have ≥${MIN_OFFERS} AU retailers with direct links. Taking ${picked.length}.\n`);
  for (const k of picked) {
    const specs = (k.item.specifications || []).length;
    console.log(`• ${k.title}  [${k.offers.length} offers, ${specs} specs, ${(k.item.images || []).length} images, gtin ${k.item.gtin || '-'}, mpn ${k.item.mpn || '-'}]`);
    for (const o of k.offers) console.log(`    ${o.retailer.padEnd(18)} $${o.price}  ${o.url.slice(0, 80)}`);
  }
  if (!write) { console.log('\nPreview only — re-run with --write to add these to products.json.'); return; }

  mkdirSync(IMAGE_DIR, { recursive: true });
  const now = new Date().toISOString();
  let added = 0;
  for (const k of picked) {
    const gallery = [];
    for (const [i, url] of (k.item.images || []).slice(0, 4).entries()) {
      try {
        const r = await fetch(url);
        if (!r.ok) continue;
        const ct = r.headers.get('content-type') || '';
        const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : 'jpg';
        const file = `${k.slug}${i ? `-${i + 1}` : ''}.${ext}`;
        writeFileSync(join(IMAGE_DIR, file), Buffer.from(await r.arrayBuffer()));
        gallery.push(`/images/products/${file}`);
      } catch { /* skip this image */ }
    }
    if (!gallery.length) { console.log(`   ✗ no usable image, skipped: ${k.title}`); continue; }

    const specs = (k.item.specifications || []).filter((s) => s.specification_name && s.specification_value)
      .map((s) => ({ name: s.specification_name, value: s.specification_value }));
    // A model/part number from the specifications, when the listing states one.
    const modelSpec = specs.find((s) => /^(model|model number|model name|mpn|part number|manufacturer part number|item model number)$/i.test(s.name));
    const description = cleanDescription(k.item.description);

    const record = {
      id: k.slug, slug: k.slug, name: k.name, brand: k.brand,
      categoryKey: cat.key, categorySlug: cat.slug, categoryName: cat.name, subCategory: k.c.sub,
      priceAud: Math.round(k.offers[0].price * 100) / 100, currency: 'AUD',
      image: gallery[0],
      retailers: k.offers.map((o, i) => ({ name: o.retailer, url: o.url, primary: i === 0, priceAud: Math.round(o.price * 100) / 100, deepLink: true })),
      googleProductId: k.c.pid,
      pricesCheckedAt: now, updatedAt: now,
    };
    if (gallery.length > 1) record.images = gallery;
    if (k.item.gtin) record.gtin = String(k.item.gtin);
    if (k.item.mpn) record.mpn = String(k.item.mpn);
    else if (modelSpec) record.mpn = String(modelSpec.value);
    if (description) record.description = description;
    if (specs.length) record.specifications = specs;
    if (typeof k.item.rating?.value === 'number') {
      record.ratingReal = k.item.rating.value;
      if (k.item.rating.votes_count) record.reviewCountReal = k.item.rating.votes_count;
    }
    products.push(record);
    added++;
  }
  writeFileSync(PRODUCTS_JSON, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
  console.log(`\n✅ ${added} products added — catalogue now ${products.length}`);
}

async function main() {
  const wanted = category === 'all' ? Object.keys(CATEGORIES) : category.split(',').map((x) => x.trim());
  for (const slug of wanted) {
    if (!CATEGORIES[slug]) { console.error(`Unknown category ${slug}. Known: ${Object.keys(CATEGORIES).join(', ')}, all`); process.exit(1); }
  }
  for (const slug of wanted) await runCategory(CATEGORIES[slug]);
}

main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
