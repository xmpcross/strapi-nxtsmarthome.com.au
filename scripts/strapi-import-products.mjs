/**
 * Import the product catalogue into the shared Strapi commerce types.
 *
 *   node --env-file=.env.local scripts/strapi-import-products.mjs --dry-run
 *   node --env-file=.env.local scripts/strapi-import-products.mjs
 *
 * One-way, like scripts/strapi-import.mjs: public/data/products.json is the
 * source of truth and this pushes it to Strapi. The site itself builds from that
 * JSON, not from the CMS, so nothing here changes how nxtsmarthome.com.au
 * renders. Re-running is safe — everything is matched and updated in place.
 *
 * The commerce-* types are shared with other catalogues (skincare, consumer
 * electronics) and held 479 unrelated products with nothing to tell them apart.
 * A `site` relation was added to commerce-product for that reason, and every
 * product written here is linked to the nxtsmarthome.com.au commerce-site.
 * Categories, brands and merchants stay shared — a brand is a brand — but
 * products and their offers are scoped.
 *
 * Slug collisions are the real hazard: commerce-product.slug is unique across
 * the whole shared pool, so upserting purely on slug could silently overwrite
 * another catalogue's product. Matching is therefore slug + site, and a slug
 * already owned by a different site gets suffixed rather than hijacked.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const CATALOGUE = path.join(ROOT, 'public', 'data', 'products.json');

const URL_BASE = (process.env.STRAPI_URL ?? 'https://strapi.fxnstudio.com').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_TOKEN;
const DRY = process.argv.includes('--dry-run');
const limitArg = process.argv.find((a) => a.startsWith('--limit='));
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : Infinity;

const SITE = {
  name: 'NXT Smart Home',
  slug: 'nxtsmarthome-com-au',
  domain: 'nxtsmarthome.com.au',
  niche: 'Smart Home',
  country: 'AU',
  currency: 'AUD',
};

if (!TOKEN && !DRY) {
  console.error('STRAPI_TOKEN is not set. Add it to .env.local, or pass --dry-run.');
  process.exit(1);
}

/* ------------------------------------------------------------------ api -- */

async function api(pathname, { method = 'GET', body } = {}) {
  const res = await fetch(`${URL_BASE}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text.slice(0, 300) };
  }
  if (!res.ok) {
    throw new Error(`${method} ${pathname} -> ${res.status}: ${json?.error?.message ?? json?.raw ?? res.statusText}`);
  }
  return json;
}

const qs = (o) => new URLSearchParams(o).toString();

/** Find one entry by an exact field match. Checks both draft and published,
 *  because a draft is invisible to a published query and a re-run would then
 *  create a duplicate of anything left unpublished. */
async function findOne(plural, filters, draftAndPublish = true) {
  const base = { ...filters, 'pagination[pageSize]': '1' };
  for (const status of draftAndPublish ? ['published', 'draft'] : [null]) {
    const r = await api(`/api/${plural}?${qs(status ? { ...base, status } : base)}`);
    if (r?.data?.length) return r.data[0];
  }
  return null;
}

const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90);

/* -------------------------------------------------------------- taxonomy -- */

const cache = { categories: new Map(), brands: new Map(), merchants: new Map() };
const created = { categories: 0, brands: 0, merchants: 0, products: 0, offers: 0 };
const updated = { products: 0, offers: 0 };

async function ensureSite() {
  const found = await findOne('commerce-sites', { 'filters[domain][$eq]': SITE.domain });
  if (found) return found.documentId;
  if (DRY) return '<dry-run-site>';
  const r = await api('/api/commerce-sites', { method: 'POST', body: { data: { ...SITE, siteStatus: 'active' } } });
  return r.data.documentId;
}

/**
 * Find-or-create a taxonomy row, matching on slug.
 *
 * `explicitSlug` exists because the display name and the identity of a row can
 * diverge. The commerce-* types are shared, so these categories carry an " AU"
 * suffix to tell them apart from the other catalogues' — but their slugs stay
 * on the unsuffixed form. Slugifying the display name would look for
 * "energy-solar-au", miss the existing "energy-solar", and create a duplicate
 * category on the next import.
 */
async function ensureTaxonomy(kind, plural, name, extra = {}, explicitSlug = null) {
  if (!name) return null;
  const slug = explicitSlug ?? slugify(name);
  if (cache[kind].has(slug)) return cache[kind].get(slug);

  const found = await findOne(plural, { 'filters[slug][$eq]': slug });
  if (found) {
    cache[kind].set(slug, found.documentId);
    return found.documentId;
  }
  if (DRY) {
    created[kind]++;
    cache[kind].set(slug, `<new:${slug}>`);
    return cache[kind].get(slug);
  }
  const r = await api(`/api/${plural}`, { method: 'POST', body: { data: { name, slug, ...extra } } });
  created[kind]++;
  cache[kind].set(slug, r.data.documentId);
  return r.data.documentId;
}

/* -------------------------------------------------------------- products -- */

/** Parse the fields the catalogue stores as stringified Python-ish literals. */
function parseLoose(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string' || !value.trim()) return [];
  try {
    return JSON.parse(value);
  } catch {
    try {
      return JSON.parse(value.replace(/'/g, '"'));
    } catch {
      return [];
    }
  }
}

const num = (v) => {
  const n = Number(String(v ?? '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : null;
};

const collisions = [];

async function upsertProduct(item, siteId) {
  const baseSlug = item.slug || slugify(item.name);

  // Scoped match first: our own product, if we already imported it.
  let existing = await findOne('commerce-products', {
    'filters[slug][$eq]': baseSlug,
    'filters[site][domain][$eq]': SITE.domain,
  });

  let slug = baseSlug;
  if (!existing) {
    // Slug is unique pool-wide. If another catalogue already owns it, take a
    // suffixed slug rather than overwriting somebody else's product.
    const foreign = await findOne('commerce-products', { 'filters[slug][$eq]': baseSlug });
    if (foreign) {
      slug = `${baseSlug}-nxtsmarthome`.slice(0, 90);
      collisions.push({ slug: baseSlug, usedInstead: slug, name: item.name });
    }
  }

  // Named "<Category> AU" so the shared Commerce · Category list distinguishes
  // this site's categories from the skincare and consumer-electronics ones;
  // matched on the unsuffixed slug so the rename does not orphan them.
  const categoryId = item.categoryName
    ? await ensureTaxonomy(
        'categories',
        'commerce-categories',
        `${item.categoryName} AU`,
        { categoryStatus: 'active' },
        slugify(item.categoryName),
      )
    : null;
  const brandId = item.brand
    ? await ensureTaxonomy('brands', 'commerce-brands', item.brand, { country: 'AU', brandStatus: 'active' })
    : null;

  const specs = parseLoose(item.specifications);
  const data = {
    name: item.name,
    slug,
    brand: item.brand ?? null,
    shortDescription: item.bestFor ? String(item.bestFor).slice(0, 255) : null,
    description: item.description ?? null,
    // primaryImage is a media field; the catalogue serves its own images, so the
    // URL goes in imageUrl rather than uploading 205 files into Strapi.
    imageUrl: item.image ? `https://${SITE.domain}${item.image}` : null,
    // Carried across because it is an exact identifier for Google Shopping —
    // 182 of 205 products have one, and without it they would have to be matched
    // by fuzzy name search against the very API that issued the id.
    googleProductId: item.googleProductId ? String(item.googleProductId) : null,
    category: item.categoryName ?? null,
    tags: [item.categorySlug, item.subCategory].filter(Boolean),
    specs: specs.length ? specs : null,
    rating: num(item.ratingReal ?? item.rating),
    ratingCount: num(item.reviewCountReal ?? item.reviewCount),
    productStatus: 'active',
    site: siteId,
    ...(categoryId ? { categories: [categoryId] } : {}),
    ...(brandId ? { brandRef: brandId } : {}),
  };

  if (DRY) {
    created.products++;
    return { documentId: `<dry:${slug}>`, slug };
  }
  if (existing) {
    await api(`/api/commerce-products/${existing.documentId}?status=published`, { method: 'PUT', body: { data } });
    updated.products++;
    return { documentId: existing.documentId, slug };
  }
  const r = await api('/api/commerce-products?status=published', { method: 'POST', body: { data } });
  created.products++;
  return { documentId: r.data.documentId, slug };
}

async function upsertOffers(item, productId) {
  const retailers = parseLoose(item.retailers);
  for (const r of retailers) {
    if (!r?.name) continue;
    const merchantId = await ensureTaxonomy('merchants', 'commerce-merchants', r.name, {
      country: 'AU',
      merchantStatus: 'active',
    });
    const price = num(r.priceAud ?? item.priceAud);
    const data = {
      title: `${item.name} at ${r.name}`.slice(0, 255),
      price,
      currency: 'AUD',
      productUrl: r.url ?? null,
      // `deepLink` is a boolean flag, not a URL: it marks the retailer link as
      // already carrying affiliate tracking. So the affiliate URL is the same
      // url, recorded separately only when it is genuinely a tracked link.
      affiliateUrl: r.deepLink === true && typeof r.url === 'string' ? r.url : null,
      availability: 'in_stock',
      condition: 'new',
      source: 'nxtsmarthome-catalogue',
      lastCheckedAt: item.pricesCheckedAt ?? null,
      status: 'active',
      displayOrder: r.primary ? 0 : 10,
      product: productId,
      merchant: merchantId,
    };

    if (DRY) {
      created.offers++;
      continue;
    }
    // Offers have draftAndPublish off, so one row per (product, merchant).
    const existing = await findOne(
      'commerce-offers',
      { 'filters[product][documentId][$eq]': productId, 'filters[merchant][documentId][$eq]': merchantId },
      false,
    );
    if (existing) {
      await api(`/api/commerce-offers/${existing.documentId}`, { method: 'PUT', body: { data } });
      updated.offers++;
    } else {
      await api('/api/commerce-offers', { method: 'POST', body: { data } });
      created.offers++;
    }
  }
}

/* ------------------------------------------------------------------ main -- */

const items = JSON.parse(fs.readFileSync(CATALOGUE, 'utf8')).slice(0, LIMIT);

console.log(`source : ${path.relative(ROOT, CATALOGUE)} (${items.length} products)`);
console.log(`target : ${URL_BASE} (commerce-*, scoped to ${SITE.domain})`);
console.log(`mode   : ${DRY ? 'DRY RUN — nothing is written' : 'WRITE'}\n`);

const siteId = await ensureSite();
console.log(`site   : ${siteId}\n`);

const failures = [];
let n = 0;
for (const item of items) {
  try {
    const { documentId, slug } = await upsertProduct(item, siteId);
    await upsertOffers(item, documentId);
    n++;
    if (n % 20 === 0 || n === items.length) process.stdout.write(`  ${n}/${items.length} ${slug}\r`);
  } catch (err) {
    failures.push({ name: item.name, message: err.message });
    console.log(`\n  FAILED ${item.name}: ${err.message}`);
  }
}
process.stdout.write('\n');

console.log(`\ncategories : ${created.categories} created`);
console.log(`brands     : ${created.brands} created`);
console.log(`merchants  : ${created.merchants} created`);
console.log(`products   : ${created.products} created, ${updated.products} updated`);
console.log(`offers     : ${created.offers} created, ${updated.offers} updated`);

if (collisions.length) {
  console.log(`\n${collisions.length} slug collision(s) with another catalogue — suffixed rather than overwritten:`);
  for (const c of collisions.slice(0, 10)) console.log(`  ${c.slug} -> ${c.usedInstead}  (${c.name})`);
}
if (failures.length) {
  console.log(`\n${failures.length} failure(s):`);
  for (const f of failures.slice(0, 10)) console.log(`  ${f.name}: ${f.message}`);
  process.exit(1);
}
