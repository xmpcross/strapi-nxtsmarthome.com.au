/**
 * Search Google Shopping (via DataForSEO) for a real product photograph that
 * suits an article, and save it locally.
 *
 *   node scripts/search-cover-image.mjs "smart plug australia"
 *   node scripts/search-cover-image.mjs "video doorbell" --count=2 --dry-run
 *
 * The fallback for covers whose subject is not in public/data/products.json.
 * The catalogue holds 205 products; the site publishes about anything, so an
 * article on a device the catalogue has never stocked previously had nothing to
 * show and fell back to generated artwork.
 *
 * Modelled on scripts/fetch-product-image.mjs, which does the same thing for a
 * catalogue entry. The differences are deliberate:
 *
 *   - it searches a free-text keyword, not a known product name
 *   - it never writes to products.json, because there is no product to update
 *   - images land in assets/cover-search/, kept out of public/images/products/
 *     so a search result is never mistaken for a catalogue photograph
 *
 * Results are cached in scratch/ by keyword. A cover regenerated after a
 * retitle re-uses the cached response rather than paying for the query twice.
 *
 * On licensing: these are retailer product shots pulled from Google Shopping,
 * the same source and the same footing as the images already in
 * public/images/products/. That is a normal practice for affiliate retail
 * content and it is the site owner's call, not this script's — but it is worth
 * knowing that is what the flag does.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();

/**
 * Shortest side a search result must have to be usable.
 *
 * The product occupies roughly half of a 1240x700 cover, so anything under this
 * is being upscaled on the page. 400 is the point at which the cut-out edge
 * stops looking like a traced outline.
 */
const MIN_SIDE = 400;

/**
 * Pixel dimensions, via Pillow.
 *
 * Python is already required by this pipeline — compose-cover.py does the
 * compositing — so this borrows the image library that is definitely installed
 * rather than adding a Node dependency or hand-parsing three container formats.
 */
function imageSize(file) {
  try {
    const out = execFileSync(
      'python3',
      ['-c', 'import sys;from PIL import Image;i=Image.open(sys.argv[1]);print(i.width,i.height)', file],
      { encoding: 'utf8' },
    );
    const [w, h] = out.trim().split(/\s+/).map(Number);
    return Number.isFinite(w) && Number.isFinite(h) ? { w, h } : null;
  } catch {
    return null;
  }
}
const OUT_DIR = path.join(ROOT, 'assets', 'cover-search');
const CACHE_DIR = path.join(ROOT, 'scratch');

// Same endpoints and account constraints as fetch-product-image.mjs: this login
// has no access to the /live endpoints, so it is task_post then poll task_get.
const POST_URL = 'https://api.dataforseo.com/v3/merchant/google/products/task_post';
const GET_URL = 'https://api.dataforseo.com/v3/merchant/google/products/task_get/advanced';
const POLL_INTERVAL_MS = 5000;
const POLL_MAX_ATTEMPTS = 72;
const LOCATION_CODE = 2036; // Australia
const LANGUAGE_CODE = 'en';

export function loadEnv() {
  const file = path.join(ROOT, '.env.local');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [key, ...rest] = trimmed.split('=');
    const val = rest.join('=').trim();
    if (key && val && !process.env[key.trim()]) process.env[key.trim()] = val;
  }
}

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

function pickImageUrl(item) {
  if (Array.isArray(item?.product_images) && item.product_images.length) return item.product_images[0];
  return item?.profile_image_url || item?.image_url || null;
}

/**
 * Rank a shopping result for use as cover artwork.
 *
 * Not the same job as fetch-product-image.mjs's scorer. That one is matching a
 * known SKU and must reject near-misses; this one has no SKU to match, so it
 * ranks on how well the title carries the article's own words, and prefers
 * sellers whose photography is a product on a plain background — which is what
 * the cut-out in compose-cover.py needs. A lifestyle shot of a lounge room
 * mattes into a mess.
 */
function scoreItem(item, terms) {
  const title = String(item.title ?? '').toLowerCase();
  if (!title) return -1;

  let score = 0;
  for (const t of terms) if (title.includes(t)) score += 2;
  if (item.is_best_match) score += 2;

  // Bundles and multi-packs photograph as a pile of boxes. One device reads
  // better at cover size.
  if (/\b(\d+\s*[-\s]?pack|bundle|twin pack|multipack)\b/.test(title)) score -= 3;
  // Accessories keep out-ranking the device itself on a plain word count.
  if (/\b(mount|bracket|case|cover|stand|cable|adapter plate|screen protector)\b/.test(title)) score -= 4;
  return score;
}

/**
 * Find and download product photographs for a keyword.
 * Returns absolute paths to the saved images.
 */
export async function searchCoverImages(keyword, { count = 1, dryRun = false, log = console.log } = {}) {
  loadEnv();
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    throw new Error('DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD missing from .env.local');
  }

  const terms = keyword.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length >= 3);
  const cacheFile = path.join(CACHE_DIR, `cover-search-${slugify(keyword)}.json`);

  let items = [];
  if (fs.existsSync(cacheFile)) {
    items = JSON.parse(fs.readFileSync(cacheFile, 'utf8')).items ?? [];
    log(`  cache  : ${items.length} items for "${keyword}" — no API call`);
  } else {
    const auth = Buffer.from(`${login}:${password}`).toString('base64');
    const headers = { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' };

    const postRes = await fetch(POST_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify([
        { keyword, location_code: LOCATION_CODE, language_code: LANGUAGE_CODE, depth: 20 },
      ]),
    });
    if (!postRes.ok) throw new Error(`task_post HTTP ${postRes.status} ${postRes.statusText}`);
    const postTask = (await postRes.json()).tasks?.[0];
    if (!postTask?.id) throw new Error(`task_post failed: ${postTask?.status_message ?? 'unknown'}`);
    log(`  queued : task ${postTask.id} — the queue regularly takes a couple of minutes`);

    for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      const task = (await (await fetch(`${GET_URL}/${postTask.id}`, { headers })).json()).tasks?.[0];
      const code = task?.status_code;
      if (code === 20000) {
        items = task?.result?.[0]?.items ?? [];
        log(`  ready  : ${items.length} items after ${attempt} poll(s)`);
        break;
      }
      // 40602 "Task In Queue", 40601 "Task Handed" — both mean keep waiting.
      if (code === 40602 || code === 40601) continue;
      throw new Error(`task_get failed: ${code} ${task?.status_message}`);
    }

    if (items.length) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(cacheFile, JSON.stringify({ keyword, items }, null, 2));
    }
  }

  const ranked = items
    .filter((i) => pickImageUrl(i))
    .map((i) => ({ item: i, score: scoreItem(i, terms) }))
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) return [];

  for (const { item, score } of ranked.slice(0, 5)) {
    log(`    [${score}] ${String(item.title).slice(0, 68)} — ${item.seller ?? '?'}`);
  }
  if (dryRun) return [];

  const saved = [];
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Walk the whole ranked list, not just the top `count`. Sellers vary wildly in
  // what they hand back — some give a 1500px pack shot, some a 2 KB sprite — and
  // a thumbnail blown up to fill half a 1240px cover is a blurred smear with a
  // visible cut-out outline. Rejecting them here means the next candidate gets a
  // turn instead of the cover being ruined by the best-titled result.
  for (const { item } of ranked) {
    if (saved.length >= count) break;
    const url = pickImageUrl(item);

    let res;
    try {
      res = await fetch(url);
    } catch {
      continue;
    }
    if (!res.ok) {
      log(`    ! HTTP ${res.status} — skipping`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const type = res.headers.get('content-type') ?? '';
    const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
    const file = path.join(OUT_DIR, `${slugify(item.title ?? keyword)}.${ext}`);
    fs.writeFileSync(file, buf);

    const dims = imageSize(file);
    if (!dims) {
      log(`    ! unreadable image — skipping`);
      fs.unlinkSync(file);
      continue;
    }
    if (Math.min(dims.w, dims.h) < MIN_SIDE) {
      log(`    ! ${dims.w}x${dims.h} is too small (need ${MIN_SIDE}px) — skipping`);
      fs.unlinkSync(file);
      continue;
    }

    log(`    saved ${dims.w}x${dims.h}, ${(buf.length / 1024).toFixed(0)} KB -> ${path.relative(ROOT, file)}`);
    saved.push(file);
  }
  return saved;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const keyword = args.find((a) => !a.startsWith('--'));
  if (!keyword) {
    console.error('Usage: node scripts/search-cover-image.mjs "<keyword>" [--count=N] [--dry-run]');
    process.exit(1);
  }
  const count = Number((args.find((a) => a.startsWith('--count=')) ?? '').split('=')[1]) || 1;
  const files = await searchCoverImages(keyword, { count, dryRun: args.includes('--dry-run') });
  console.log(files.length ? `\n${files.length} image(s) saved.` : '\nNothing saved.');
}
