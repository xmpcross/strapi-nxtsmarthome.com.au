/**
 * scripts/fetch-product-image.mjs
 *
 * Fetches a single product from the DataForSEO Google Shopping API and stores
 * its featured image locally.
 *
 *   node scripts/fetch-product-image.mjs <slug> [--keyword "override search"] [--dry-run]
 *
 * The image is downloaded into public/images/products/ rather than hotlinked:
 * Google Shopping thumbnail URLs expire and block hotlinking, so a remote src
 * would silently turn into a broken image on the live site weeks later.
 *
 * Only the `image` field of the matched product is written back to
 * public/data/products.json. Price, rating and review counts are deliberately
 * left alone — see CLAUDE.md on editorial claims.
 */

import fs from 'node:fs';
import path from 'node:path';

// Parse .env.local if present
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

// This account has no access to the /live endpoints — every one of them returns
// task status 40402 "Invalid Path". Only the async task_post → task_get flow
// works, which is what scripts/fetch-top-products.mjs uses.
const POST_URL = 'https://api.dataforseo.com/v3/merchant/google/products/task_post';
const GET_URL = 'https://api.dataforseo.com/v3/merchant/google/products/task_get/advanced';
const READY_URL = 'https://api.dataforseo.com/v3/merchant/google/products/tasks_ready';
const POLL_INTERVAL_MS = 5000;
const POLL_MAX_ATTEMPTS = 72; // ~6 minutes — the queue regularly takes 2+
const LOCATION_CODE = 2036; // Australia
const LANGUAGE_CODE = 'en';
const PRODUCTS_JSON = path.join(process.cwd(), 'public/data/products.json');
const IMAGE_DIR = path.join(process.cwd(), 'public/images/products');

const args = process.argv.slice(2);
// Flags that take a value, so their value is not mistaken for the slug.
const VALUE_FLAGS = new Set(['--keyword', '--task-id']);
const slug = args.find(
  (a, i) => !a.startsWith('--') && !(i > 0 && VALUE_FLAGS.has(args[i - 1])),
);
const dryRun = args.includes('--dry-run');
const keywordFlagIdx = args.indexOf('--keyword');
const keywordOverride = keywordFlagIdx !== -1 ? args[keywordFlagIdx + 1] : null;
const taskIdFlagIdx = args.indexOf('--task-id');
const taskIdOverride = taskIdFlagIdx !== -1 ? args[taskIdFlagIdx + 1] : null;
const fromCache = args.includes('--from-cache');

const cachePath = (s) => path.join(process.cwd(), 'scratch', `fetch-${s}.json`);

if (!slug) {
  console.error('Usage: node scripts/fetch-product-image.mjs <slug> [--keyword "..."] [--dry-run]');
  process.exit(1);
}

/**
 * Variant suffixes are marketing scaffolding in this catalogue, not real SKUs.
 * Searching Google Shopping for "... E27 Pro" returns nothing, so the query is
 * built from the base product and brand instead.
 */
function buildKeyword(product) {
  const base = product.name
    .replace(/\s*\((Gen\s*\d+)\)\s*/gi, ' ')
    .replace(/\s+(Pro|Ultra|Gen\s*\d+)$/i, '')
    .trim();
  return [product.brand, base].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}

function pickImageUrl(item) {
  if (Array.isArray(item?.product_images) && item.product_images.length) {
    return item.product_images[0];
  }
  return item?.profile_image_url || item?.image_url || null;
}

/** AU and US spellings both appear in Google Shopping titles. */
function normalise(text) {
  return text
    .toLowerCase()
    .replace(/colour/g, 'color')
    .replace(/ambience/g, 'ambiance')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOP_WORDS = new Set(['pro', 'ultra', 'gen', 'the', 'and', 'with', 'for']);

/**
 * Google Shopping happily returns near-miss SKUs — the Hue *White* starter kit
 * when the product is *White & Colour Ambiance*. Those differ by one word and
 * look identical on a plain token count, so distinguishing words are required
 * rather than merely rewarded: a title missing one is disqualified, not just
 * ranked lower. Without this the wrong box art ends up on the page.
 */
const DISTINGUISHING_WORDS = ['color', 'ambiance', 'starter', 'bridge', 'strip', 'outdoor'];

function scoreItem(item, product) {
  const title = normalise(item.title || '');
  if (!title) return -1;
  const name = normalise(product.name);

  let score = 0;
  if (product.brand && title.includes(normalise(product.brand))) score += 3;

  const words = name.split(' ').filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  for (const w of words) if (title.includes(w)) score += 1;
  if (item.is_best_match) score += 2;

  // Any distinguishing word the product has but the title lacks is a hard miss.
  for (const w of DISTINGUISHING_WORDS) {
    if (name.includes(w) && !title.includes(w)) score -= 6;
  }
  return score;
}

async function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON, 'utf8'));
  const product = products.find((p) => p.slug === slug || p.id === slug);
  if (!product) {
    console.error(`❌ No product in products.json with slug "${slug}"`);
    process.exit(1);
  }

  const keyword = keywordOverride || buildKeyword(product);
  console.log(`🔍 Product : ${product.name}`);
  console.log(`🔍 Keyword : "${keyword}"`);

  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    console.error('❌ DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD missing from .env.local');
    process.exit(1);
  }

  const auth = Buffer.from(`${login}:${password}`).toString('base64');
  const headers = { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' };

  // 0. Re-score a cached response rather than re-running the query.
  let items = [];
  if (fromCache) {
    if (!fs.existsSync(cachePath(slug))) {
      console.error(`❌ No cached response at ${cachePath(slug)} — run without --from-cache first.`);
      process.exit(1);
    }
    items = JSON.parse(fs.readFileSync(cachePath(slug), 'utf8')).items || [];
    console.log(`♻️  Re-scoring ${items.length} cached items — no API call`);
    return finish(items, product, products);
  }

  // 1. Queue the task — or reuse one already paid for.
  let taskId = taskIdOverride;
  if (taskId) {
    console.log(`♻️  Reusing existing task ${taskId} — not posting a new one`);
  } else {
    const postRes = await fetch(POST_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify([
        { keyword, location_code: LOCATION_CODE, language_code: LANGUAGE_CODE, depth: 20 },
      ]),
    });
    if (!postRes.ok) throw new Error(`task_post HTTP ${postRes.status} ${postRes.statusText}`);

    const postJson = await postRes.json();
    const postTask = postJson.tasks?.[0];
    if (!postTask?.id) {
      throw new Error(`task_post failed: ${postTask?.status_message || JSON.stringify(postJson)}`);
    }
    taskId = postTask.id;
    console.log(`📮 Task queued: ${taskId} (${postTask.status_message})`);
    console.log(`   Resume with: --task-id ${taskId}`);
  }

  // 2. Poll for the result
  for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    const getRes = await fetch(`${GET_URL}/${taskId}`, { headers });
    const getJson = await getRes.json();
    const task = getJson.tasks?.[0];
    const code = task?.status_code;

    if (code === 20000) {
      items = task?.result?.[0]?.items || [];
      console.log(`✅ Result ready after ${attempt} poll(s): ${items.length} items`);
      break;
    }
    // 40602 = "Task In Queue", 40601 = "Task Handed"
    if (code === 40602 || code === 40601) {
      console.log(`   … attempt ${attempt}/${POLL_MAX_ATTEMPTS}: ${task.status_message}`);
      continue;
    }
    throw new Error(`task_get failed: ${code} ${task?.status_message}`);
  }

  // Cache every item, not just the winner — re-scoring a bad match should never
  // require paying for the same query twice.
  if (items.length) {
    fs.mkdirSync(path.join(process.cwd(), 'scratch'), { recursive: true });
    fs.writeFileSync(cachePath(slug), JSON.stringify({ keyword, items }, null, 2));
  }

  return finish(items, product, products);
}

async function finish(items, product, allProducts) {
  if (!items.length) {
    console.error('❌ No shopping items returned — nothing to pull an image from.');
    process.exit(1);
  }

  const candidates = items
    .filter((i) => pickImageUrl(i))
    .map((i) => ({ item: i, score: scoreItem(i, product) }))
    .sort((a, b) => b.score - a.score);

  if (!candidates.length) {
    console.error('❌ Items returned but none carried an image URL.');
    process.exit(1);
  }

  console.log('\n🏅 Top candidates by title match:');
  for (const { item, score } of candidates.slice(0, 5)) {
    console.log(`   [${score}] ${item.title} — ${item.seller}`);
  }

  const withImage = candidates[0].item;
  const imageUrl = pickImageUrl(withImage);
  console.log(`\n📦 Matched : ${withImage.title}`);
  console.log(`   Seller  : ${withImage.seller}`);
  console.log(`   Price   : ${withImage.price} ${withImage.currency || 'AUD'}`);
  console.log(`   Image   : ${imageUrl.slice(0, 100)}...`);

  if (dryRun) {
    console.log('\n🧪 --dry-run: not downloading or writing products.json');
    return;
  }

  // Download the image
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Image download failed: HTTP ${imgRes.status}`);
  const buffer = Buffer.from(await imgRes.arrayBuffer());

  const contentType = imgRes.headers.get('content-type') || '';
  const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  const filename = `${product.slug}.${ext}`;
  fs.writeFileSync(path.join(IMAGE_DIR, filename), buffer);
  console.log(`\n💾 Saved image (${(buffer.length / 1024).toFixed(1)} KB) → public/images/products/${filename}`);

  // Write only the image field back
  const publicPath = `/images/products/${filename}`;
  product.image = publicPath;
  product.imageSource = withImage.seller || 'Google Shopping via DataForSEO';
  fs.writeFileSync(PRODUCTS_JSON, `${JSON.stringify(allProducts, null, 2)}\n`, 'utf8');
  console.log(`✅ products.json updated: ${product.slug}.image = ${publicPath}`);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
