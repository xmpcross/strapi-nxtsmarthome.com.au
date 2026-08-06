/**
 * Find the real product photographs in this repo that belong on an article's
 * featured image.
 *
 * The site already ships 320 product photographs in public/images/products/,
 * one per catalogue entry in public/data/products.json. A generated picture of
 * an invented device is strictly worse than a photograph of a product the
 * article is actually about: it is accurate, it is free, it cannot hallucinate
 * a US power socket onto an Australian page, and it matches what the reader
 * sees further down the page in the buy boxes.
 *
 * So covers now search this catalogue first and only fall back to fal.ai when
 * nothing in it is a genuine match.
 *
 * Used by scripts/generate-cover.mjs. Selection is deterministic — the same
 * article always resolves to the same products, so re-running a cover does not
 * quietly swap the artwork underneath a published page.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const CATALOGUE = path.join(ROOT, 'public', 'data', 'products.json');
const PRODUCTS_DIR = path.join(ROOT, 'content', 'products');
/*
  Originals before pre-cut PNGs, deliberately.

  scripts/remove-product-bg.py writes a transparent .png beside each product
  photograph, and for anything white it has eaten the subject: the Tapo L530E's
  bulb body and half its box come back as holes, because a flood fill that
  treats "light" as "background" cannot tell a white bulb from the white it
  stands on. The .webp original is clean, and compose-cover.py now mattes it
  with a tolerance measured from the actual backdrop, which keeps white
  products intact.

  Every catalogue entry has a non-PNG original (115 have both, 80 have only the
  original, none are PNG-only), so nothing is lost by preferring them.
*/
const IMG_EXTS = ['.webp', '.jpg', '.jpeg', '.png'];

/**
 * Words that carry no signal about which product an article is about.
 *
 * 'australia' and 'australian' are in here despite being the site's whole
 * differentiator: they appear in most titles and in a good deal of product
 * copy, so leaving them in scores every product against every article equally.
 * Same for 'best', 'guide' and 'smart' — 'smart' appears in 300 of the 320
 * product names.
 */
const STOPWORDS = new Set([
  'the', 'and', 'for', 'are', 'you', 'your', 'with', 'what', 'why', 'how', 'that',
  'this', 'from', 'not', 'but', 'can', 'does', 'get', 'has', 'have', 'into', 'its',
  'out', 'than', 'them', 'they', 'was', 'were', 'when', 'which', 'who', 'will',
  'australia', 'australian', 'aussie', 'best', 'top', 'guide', 'guides', 'buying',
  'review', 'reviews', 'smart', 'home', 'homes', 'house', 'need', 'know', 'worth',
  'actually', 'really', 'every', 'about', 'without', 'work', 'works', 'use', 'used',
  'using', 'make', 'makes', 'much', 'more', 'most', 'one', 'two', 'all', 'any',
]);

const tokens = (text) =>
  [...new Set(
    String(text ?? '')
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length >= 3 && !STOPWORDS.has(t)),
  )];

/** 'Video Doorbells' -> ['video doorbells', 'video doorbell'] */
function subCategoryPhrases(sub) {
  const base = String(sub ?? '').toLowerCase().trim();
  if (!base) return [];
  // Subcategories are written as lists — 'Robot Vacuums & Mops', 'Smart AC
  // Controllers & Thermostats'. Each half is worth matching on its own, or a
  // vacuum article never matches 'Robot Vacuums & Mops' in full.
  const parts = base.split(/\s*[&,]\s*/).filter(Boolean);
  const out = new Set();
  for (const part of [base, ...parts]) {
    out.add(part);
    if (part.endsWith('s')) out.add(part.slice(0, -1));
  }
  return [...out];
}

/**
 * Absolute path to a product's photograph, or null.
 *
 * Only files under public/images/products/ count. Ten catalogue entries carry
 * `image: /og-default.png` — the site's social card, standing in for a photo
 * that was never fetched. Treating that as product artwork puts the NXT Smart
 * Home logo on the cover as if it were a device.
 */
function resolveImage(image) {
  if (!image || !image.startsWith('/images/products/')) return null;
  // The extension in the catalogue is not authoritative — 80 entries name a
  // .png that was later replaced, and where both exist the .png is the damaged
  // pre-cut one. The stem identifies the file; IMG_EXTS decides which wins.
  const stem = path.join(ROOT, 'public', image.replace(/^\//, '')).replace(/\.[a-z0-9]+$/i, '');
  for (const ext of IMG_EXTS) {
    if (fs.existsSync(stem + ext)) return stem + ext;
  }
  return null;
}

/**
 * Power tools that were imported into the catalogue by mistake.
 *
 * The importer searched retailers for 'router' and came back with six
 * woodworking routers — a Ryobi plunge router, an Ozito trim router, a Bosch
 * POF 1200 — all filed under 'Matter & Thread Hubs'. They score well on any
 * networking article, and a plunge router on a Wi-Fi guide is the kind of
 * mistake a reader never comes back from.
 *
 * The 'router' rule is conditional rather than absolute so a real mesh router,
 * if one is ever imported, still qualifies. This filters the cover search only;
 * fixing the catalogue itself is a separate job for the importer.
 */
function isNotSmartHome(product) {
  const name = String(product.name ?? '').toLowerCase();
  if (/\b(trimmer|drill|jigsaw|circular saw|angle grinder|sander|planer|nailer)\b/.test(name)) {
    return true;
  }
  return /\brouter\b/.test(name) && !/\b(mesh|wi-?fi|modem|nbn|ethernet|gateway)\b/.test(name);
}

export function loadCatalogue() {
  if (!fs.existsSync(CATALOGUE)) return [];
  const raw = JSON.parse(fs.readFileSync(CATALOGUE, 'utf8'));
  const list = Array.isArray(raw) ? raw : (raw.products ?? []);
  return list
    .map((p) => ({ ...p, imagePath: resolveImage(p.image) }))
    .filter((p) => p.imagePath && !isNotSmartHome(p));
}

/**
 * Product slugs an article names outright via ::product:<slug>:: markers.
 *
 * These are the strongest signal there is — an editor put them there — so a
 * marker whose slug is in the catalogue wins before any scoring runs. The
 * hand-written files in content/products/ carry no photograph of their own, so
 * one that is not in the catalogue contributes its name to the search terms
 * instead of an image.
 */
function explicitRefs(body) {
  return [...String(body ?? '').matchAll(/^::product:([a-z0-9-]+)::/gm)].map((m) => m[1]);
}

function localProductNames(slugs) {
  const names = [];
  for (const slug of slugs) {
    const file = path.join(PRODUCTS_DIR, `${slug}.md`);
    if (!fs.existsSync(file)) continue;
    const { data } = matter(fs.readFileSync(file, 'utf8'));
    if (data?.name) names.push(`${data.brand ?? ''} ${data.name}`);
  }
  return names;
}

/**
 * Score one product against one article.
 *
 * The weights are ordered by how much each signal actually pins down a product:
 * a subcategory phrase in the title ('video doorbell') is close to decisive, a
 * brand name is strong, and an overlap in the marketing blurb is weak enough
 * that it only ever breaks ties.
 */
function score(product, terms, title, category) {
  const name = `${product.brand ?? ''} ${product.name ?? ''}`.toLowerCase();
  const blurb = `${product.bestFor ?? ''} ${product.description ?? ''}`.toLowerCase();

  let total = 0;
  let sub = 0;

  if (category && product.categoryKey === category) total += 6;

  for (const phrase of subCategoryPhrases(product.subCategory)) {
    if (phrase.length >= 4 && title.includes(phrase)) {
      sub = 8;
      break;
    }
  }
  total += sub;

  if (product.brand && title.includes(String(product.brand).toLowerCase())) total += 5;

  let nameHits = 0;
  for (const term of terms) {
    if (name.includes(term)) nameHits += 1;
  }
  total += Math.min(nameHits, 2) * 4;

  let blurbHits = 0;
  for (const term of terms) {
    if (blurb.includes(term)) blurbHits += 1;
  }
  total += Math.min(blurbHits, 3);

  // Tie-break only, deliberately tiny. A four-star product does not become more
  // relevant than a three-star one; it is just the better picture to show when
  // relevance is otherwise identical.
  total += Math.min(product.rating ?? 0, 5) / 100;
  total += Math.min(product.reviewCount ?? 0, 5000) / 1e6;

  return { total, sub };
}

/**
 * Products whose photographs should appear on this article's cover.
 *
 * Returns [] when nothing is a real match, which is the caller's signal to fall
 * back to fal.ai. That happens for articles that are about a concept rather
 * than a device — a tenancy explainer has no product, and pasting three random
 * cameras onto it would be worse than a generated still life.
 *
 * @param {object} article  { slug, data (front matter), content (body) }
 * @param {object} opts     { limit = 3, only = [] explicit slugs }
 */
export function resolveCoverProducts(article, { limit = 3, only = [] } = {}) {
  const catalogue = loadCatalogue();
  if (!catalogue.length) return [];

  const bySlug = new Map(catalogue.map((p) => [p.slug, p]));

  // 1. Explicit choice — CLI flag or `coverProducts:` in front matter — wins
  //    outright, including the order it was written in.
  const forced = [...only, ...(article.data?.coverProducts ?? [])];
  if (forced.length) {
    const picked = forced.map((s) => bySlug.get(s)).filter(Boolean);
    const missing = forced.filter((s) => !bySlug.get(s));
    if (missing.length) {
      console.warn(`  ! no catalogue photo for: ${missing.join(', ')}`);
    }
    if (picked.length) return picked.slice(0, limit).map((p) => ({ ...p, why: 'named explicitly' }));
  }

  // 2. ::product:: markers the article already carries.
  const refs = explicitRefs(article.content);
  const fromRefs = refs.map((s) => bySlug.get(s)).filter(Boolean);
  if (fromRefs.length) {
    return fromRefs.slice(0, limit).map((p) => ({ ...p, why: 'linked in the article body' }));
  }

  // 3. Score the catalogue against the article.
  const title = String(article.data?.title ?? article.slug).toLowerCase();
  const terms = tokens(
    [
      article.data?.title,
      (article.data?.tags ?? []).join(' '),
      article.data?.description,
      localProductNames(refs).join(' '),
    ].join(' '),
  );
  const category = article.data?.category;

  /*
    Stay inside the article's own category when that category stocks products.

    Without this, a platform comparison picks up a Wi-Fi power board because the
    words 'Alexa' and 'Google Home' appear in the product's name — true, and
    entirely beside the point of the article. The two guide categories stock
    nothing, so those articles search the whole catalogue.
  */
  const inCategory = category ? catalogue.filter((p) => p.categoryKey === category) : [];
  const pool0 = inCategory.length >= 3 ? inCategory : catalogue;

  const ranked = pool0
    .map((p) => ({ product: p, ...score(p, terms, title, category) }))
    // Two ways in: the product is from this article's category and clears the
    // base score, or it matched the words strongly enough to stand on that
    // alone. The second bar is deliberately high — a single shared word is how
    // a smart plug ends up illustrating an article about Wi-Fi dropouts.
    .filter((r) => (category && r.product.categoryKey === category ? r.total >= 6 : r.total >= 12))
    .sort((a, b) => b.total - a.total || a.product.slug.localeCompare(b.product.slug));

  if (!ranked.length) return [];

  /*
    Coherence vs variety.

    When the top match came from a subcategory phrase in the title, the article
    is about that one kind of device and the cover should show three of them —
    a doorbell guide illustrated with a doorbell, a camera and a light strip
    looks like a stock-photo grab bag. Otherwise the article is about the
    category as a whole, so spread the picks across subcategories instead.

    Either way brands are unique. Three photographs of near-identical white
    cameras from one brand read as a rendering error.
  */
  const focus = ranked[0].sub > 0 ? ranked[0].product.subCategory : null;
  const pool = focus ? ranked.filter((r) => r.product.subCategory === focus) : ranked;

  const picked = [];
  const brands = new Set();
  const subs = new Set();
  for (const { product, total } of pool) {
    const brand = String(product.brand ?? '').toLowerCase();
    if (brands.has(brand)) continue;
    if (!focus && subs.has(product.subCategory)) continue;
    brands.add(brand);
    subs.add(product.subCategory);
    picked.push({
      ...product,
      why: `${focus ? focus : product.subCategory} · score ${total.toFixed(1)}`,
    });
    if (picked.length >= limit) break;
  }

  // A brand-unique pass can come up short on a thin subcategory. Top up from the
  // same pool rather than returning one lonely product on a wide cover.
  if (picked.length < Math.min(limit, 2)) {
    for (const { product, total } of pool) {
      if (picked.some((p) => p.slug === product.slug)) continue;
      picked.push({ ...product, why: `top-up · score ${total.toFixed(1)}` });
      if (picked.length >= limit) break;
    }
  }

  return picked;
}
