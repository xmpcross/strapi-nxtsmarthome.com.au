#!/usr/bin/env node
/**
 * Create Geniuslink short links (geni.us/xxxx) for retailer URLs that
 * Geniuslink's Quick Build proxy refuses.
 *
 * Proxy.ashx, which lib/affiliate.ts builds for Amazon and eBay, only accepts
 * the merchants Geniuslink supports directly; JB Hi-Fi, The Good Guys,
 * Officeworks and the rest get a 403 "unsupported hostname" page. A short link
 * made through the API has no such limit: Geniuslink affiliates it through the
 * Sovrn/Commerce account connected in its dashboard (the click goes via
 * redirect.viglink.com).
 *
 * Reads every retailers[].url in public/data/products.json and
 * content/products/*.md, skips Amazon, eBay and existing geni.us links, and
 * creates one short link per URL not already in data/geniuslink-links.json.
 * lib/geniuslink-links.ts swaps the URLs for the short links at render time.
 *
 *   node scripts/geniuslink-shortlinks.mjs              dry run: list what would be created
 *   node scripts/geniuslink-shortlinks.mjs --write      create them and update the map
 *   node scripts/geniuslink-shortlinks.mjs --write --limit 20
 *
 * Needs GENIUSLINK_API_KEY, GENIUSLINK_API_SECRET and GENIUSLINK_GROUP_ID
 * (.env.local). Without them it lists the work and exits.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const MAP_PATH = path.join(ROOT, 'data', 'geniuslink-links.json');
const API = 'https://api.geni.us';
/** Between creates. Geniuslink answers bursts with 429. */
const DELAY_MS = 1500;

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const limitArg = args.indexOf('--limit');
const LIMIT = limitArg >= 0 ? Number(args[limitArg + 1]) : Infinity;

/** Same hosts lib/affiliate.ts routes through Proxy.ashx, plus Geniuslink's own. */
const SKIP_HOST = /(^|\.)(amazon\.[a-z.]+|ebay\.[a-z.]+|geni\.us|georiot\.com)$/i;

function eligible(url) {
  try {
    const u = new URL(url);
    return (u.protocol === 'https:' || u.protocol === 'http:') && !SKIP_HOST.test(u.hostname);
  } catch {
    return false;
  }
}

function collectUrls() {
  const urls = new Set();
  const add = (retailers) => {
    if (!Array.isArray(retailers)) return;
    for (const r of retailers) if (typeof r?.url === 'string' && eligible(r.url)) urls.add(r.url);
  };
  const catalogue = path.join(ROOT, 'public', 'data', 'products.json');
  if (fs.existsSync(catalogue)) {
    for (const p of JSON.parse(fs.readFileSync(catalogue, 'utf8'))) add(p.retailers);
  }
  const dir = path.join(ROOT, 'content', 'products');
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
      add(matter(fs.readFileSync(path.join(dir, f), 'utf8')).data?.retailers);
    }
  }
  return [...urls].sort();
}

function readMap() {
  try {
    return JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function saveMap(map) {
  const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(MAP_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function createShortLink(url, { key, secret, groupId }) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`${API}/v3/shorturls`, {
      method: 'POST',
      headers: {
        'X-Api-Key': key,
        'X-Api-Secret': secret,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, groupId: Number(groupId), domain: 'geni.us', linkCreatorSetting: 'Simple' }),
    });
    if (res.status === 429 || res.status >= 500) {
      await sleep(DELAY_MS * 2 ** (attempt + 1));
      continue;
    }
    const body = await res.json().catch(() => null);
    const short = body?.shortUrl;
    if (!res.ok || !short?.code) throw new Error(`HTTP ${res.status}: ${JSON.stringify(body).slice(0, 200)}`);
    return `https://${short.domain || 'geni.us'}/${short.code}`;
  }
  throw new Error('gave up after repeated 429/5xx');
}

const map = readMap();
const todo = collectUrls().filter((u) => !map[u]);
const batch = todo.slice(0, LIMIT);

const byHost = {};
for (const u of todo) byHost[new URL(u).hostname] = (byHost[new URL(u).hostname] || 0) + 1;
console.log(`${Object.keys(map).length} already mapped, ${todo.length} without a short link:`);
for (const [h, n] of Object.entries(byHost).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${h}`);

const creds = {
  key: process.env.GENIUSLINK_API_KEY,
  secret: process.env.GENIUSLINK_API_SECRET,
  groupId: process.env.GENIUSLINK_GROUP_ID,
};
if (!WRITE) {
  console.log(`\ndry run: --write would create ${batch.length}.`);
  process.exit(0);
}
if (!creds.key || !creds.secret || !/^\d+$/.test(creds.groupId || '')) {
  console.log('\nGENIUSLINK_API_KEY / _SECRET / _GROUP_ID not set: nothing created.');
  process.exit(0);
}

let made = 0;
let failed = 0;
for (const url of batch) {
  try {
    map[url] = await createShortLink(url, creds);
    made++;
    console.log(`${map[url]}  ${url}`);
    // Save as we go, so an interrupted run never re-creates links it already made.
    saveMap(map);
  } catch (err) {
    failed++;
    console.error(`FAILED  ${url}  ${err.message}`);
  }
  await sleep(DELAY_MS);
}
console.log(`\ncreated ${made}, failed ${failed}, ${todo.length - made} still unmapped.`);
