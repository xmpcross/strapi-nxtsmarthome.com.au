/**
 * scripts/fetch-product-reviews.mjs
 *
 * Imports genuine customer reviews from the Google Shopping review catalogue
 * into public/data/products.json.
 *
 *   node scripts/fetch-product-reviews.mjs [--limit N] [--dry-run] [--resume]
 *
 * These are real reviews written by real people and syndicated from Australian
 * retailers (harveynorman.com.au, jbhifi.com.au and so on). Every one is stored
 * with its author and source so the site can attribute it. Nothing here is
 * generated — if a product has no reviews, it gets none.
 *
 * The endpoint keys on `gid`, which comes from the shopping results already
 * paid for by fetch-retailer-prices.mjs, so phase 1 is free.
 *
 * The real aggregate is written to `ratingReal` / `reviewCountReal` rather than
 * over the existing `rating` / `reviewCount`. Those existing values are
 * synthetic, and swapping them site-wide reorders every "top rated" listing —
 * that is an editorial decision, not a side effect of an import. Run with
 * --apply-rating to make the swap deliberately.
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
const REVIEWS_POST = 'https://api.dataforseo.com/v3/merchant/google/reviews/task_post';
const REVIEWS_GET = 'https://api.dataforseo.com/v3/merchant/google/reviews/task_get/advanced';
const PRODUCTS_JSON = path.join(process.cwd(), 'public/data/products.json');
const SHOPPING_STATE = path.join(process.cwd(), 'scratch/retailer-price-tasks.json');
const REVIEWS_STATE = path.join(process.cwd(), 'scratch/product-review-tasks.json');
const LOCATION_CODE = 2036;
const LANGUAGE_CODE = 'en';
const BATCH_SIZE = 100;
const REVIEW_DEPTH = 30;
const POLL_INTERVAL_MS = 10000;
const POLL_MAX_MINUTES = 25;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const resume = args.includes('--resume');
const applyRating = args.includes('--apply-rating');
const limitIdx = args.indexOf('--limit');
const limit = limitIdx !== -1 ? Number(args[limitIdx + 1]) : null;

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
        /* transient */
      }
    }
    if (pending.size) {
      console.log(`   … ${label}: ${Object.keys(results).length} ready, ${pending.size} pending`);
      await sleep(POLL_INTERVAL_MS);
    }
  }
  return results;
}

/**
 * Every review in the sample response carried an identical timestamp, which
 * means it is a crawl time rather than a real publication date. Showing it as
 * "Posted 4 August 2022" would be inventing provenance, so a date is only kept
 * when the set actually varies.
 */
function datesAreMeaningful(items) {
  const dates = items.map((i) => i.publication_date).filter(Boolean);
  return new Set(dates).size > 1;
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
    console.error('❌ DATAFORSEO credentials missing from .env.local');
    process.exit(1);
  }
  const auth = Buffer.from(`${login}:${password}`).toString('base64');
  const headers = { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' };

  // ---- Phase 1: recover gids (free) ----
  if (!fs.existsSync(SHOPPING_STATE)) {
    console.error(`❌ ${SHOPPING_STATE} missing — run fetch-retailer-prices.mjs first.`);
    process.exit(1);
  }
  const shoppingTasks = JSON.parse(fs.readFileSync(SHOPPING_STATE, 'utf8'));
  console.log(`♻️  Re-collecting ${Object.keys(shoppingTasks).length} shopping tasks (free)…`);
  const shoppingResults = await collect(SHOPPING_GET, shoppingTasks, headers, 'shopping');

  const gids = {};
  for (const [key, result] of Object.entries(shoppingResults)) {
    const reference = groups.get(key)?.[0];
    if (!reference) continue;
    const best = (result?.items || [])
      .map((i) => ({ i, s: scoreTitle(i, reference) }))
      .filter((x) => x.s > 0 && x.i.gid)
      .sort((a, b) => b.s - a.s)[0];
    if (best) gids[key] = best.i.gid;
  }

  let entries = Object.entries(gids);
  if (limit) entries = entries.slice(0, limit);
  console.log(`🔑 ${entries.length} gids recovered`);
  console.log(`💰 estimated cost: $${(entries.length * 0.00075).toFixed(3)}`);
  if (dryRun) return;

  // ---- Phase 2: reviews ----
  let tasks;
  if (resume && fs.existsSync(REVIEWS_STATE)) {
    tasks = JSON.parse(fs.readFileSync(REVIEWS_STATE, 'utf8'));
    console.log(`♻️  Resuming ${Object.keys(tasks).length} review tasks`);
  } else {
    tasks = {};
    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
      const batch = entries.slice(i, i + BATCH_SIZE);
      const body = batch.map(([key, gid]) => ({
        gid,
        location_code: LOCATION_CODE,
        language_code: LANGUAGE_CODE,
        depth: REVIEW_DEPTH,
        tag: key,
      }));
      const res = await fetch(REVIEWS_POST, { method: 'POST', headers, body: JSON.stringify(body) });
      const json = await res.json();
      for (const t of json.tasks || []) if (t.id && t.data?.tag) tasks[t.data.tag] = t.id;
      console.log(`📮 posted ${Object.keys(tasks).length} review tasks`);
    }
    fs.mkdirSync(path.dirname(REVIEWS_STATE), { recursive: true });
    fs.writeFileSync(REVIEWS_STATE, JSON.stringify(tasks, null, 2));
  }

  const results = await collect(REVIEWS_GET, tasks, headers, 'reviews');

  // ---- Phase 3: write back ----
  let withReviews = 0;
  let totalReviews = 0;

  for (const [key, result] of Object.entries(results)) {
    if (!result) continue;
    const items = (result.items || []).filter((i) => i.review_text);
    const group = groups.get(key) || [];
    const keepDates = datesAreMeaningful(items);

    const reviews = items.map((item, i) => {
      const review = {
        id: `${key}-${i}`,
        body: item.review_text,
        rating: item.rating?.value ?? 0,
      };
      if (item.title) review.title = item.title;
      if (item.author) review.author = item.author;
      if (item.provided_by) review.sourceLabel = item.provided_by;
      if (item.url) review.sourceUrl = item.url;
      if (Array.isArray(item.images) && item.images.length) review.images = item.images;
      if (keepDates && item.publication_date) {
        review.postedAt = new Date(item.publication_date).toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
      }
      return review;
    });

    // Star histogram, when Google supplies one.
    /*
     * rating_groups was null in every sample, so the exact field names are
     * unverified. `rating_max` is 5 on every group and must not be used as the
     * key — that would collapse all five bars into one. Probe the plausible
     * star fields instead, and drop the histogram entirely if none of them
     * yields five distinct buckets rather than rendering a wrong chart.
     */
    let breakdown;
    if (Array.isArray(result.rating_groups) && result.rating_groups.length) {
      const candidate = {};
      for (const g of result.rating_groups) {
        const star = g.rating ?? g.value ?? g.rating_value ?? g.group ?? g.stars;
        const votes = g.votes_count ?? g.count ?? g.reviews_count;
        if (star != null && votes != null) candidate[String(star)] = votes;
      }
      if (Object.keys(candidate).length > 1) breakdown = candidate;
      else console.log(`   ⚠️  ${key}: unrecognised rating_groups shape, histogram skipped`);
    }

    const topics = Array.isArray(result.top_keywords)
      ? result.top_keywords
          .filter((k) => k.keyword)
          .map((k) => ({ label: k.keyword, count: k.count ?? 0 }))
      : null;

    for (const product of group) {
      if (reviews.length) {
        product.reviews = reviews;
        withReviews++;
        totalReviews += reviews.length;
      }
      if (result.rating?.value) {
        product.ratingReal = result.rating.value;
        product.reviewCountReal = result.reviews_count ?? result.rating.votes_count ?? reviews.length;
        if (applyRating) {
          product.ratingOriginal = product.ratingOriginal ?? product.rating;
          product.reviewCountOriginal = product.reviewCountOriginal ?? product.reviewCount;
          product.rating = product.ratingReal;
          product.reviewCount = product.reviewCountReal;
        }
      }
      if (breakdown) product.ratingBreakdown = breakdown;
      if (topics?.length) product.reviewTopics = topics;
      if (result.url) product.reviewsUrl = result.url;
    }
  }

  fs.writeFileSync(PRODUCTS_JSON, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
  console.log(`\n✅ ${totalReviews} genuine reviews across ${withReviews} product records`);
  if (!applyRating) {
    console.log('ℹ️  Real aggregates stored as ratingReal / reviewCountReal.');
    console.log('   Re-run with --apply-rating to replace the synthetic rating fields.');
  }
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
