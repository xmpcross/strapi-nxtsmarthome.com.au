/**
 * Seed the header navigation into the shared Strapi CMS.
 *
 *   npm run seed:menu -- --dry-run
 *   npm run seed:menu
 *
 * `lib/site.ts` stays the single source of truth for what the nav *should* be:
 * this script imports it directly (Node strips the types) and pushes the result
 * to Strapi, so seeding can never drift from the code that derives the links.
 * After the first seed, Strapi is what the build reads — edit the nav there, not
 * here. Re-running is safe; rows are matched on slug and updated in place.
 *
 * The nxtsmart-* content types are shared with nxtsmart.homes, so every row
 * carries an explicit `site` and every query filters on it.
 */
import {
  guideNavLinks,
  latestNavLink,
  productCategoryNavLinks,
  productsNavLink,
  searchLink,
  topicNavLinks,
} from '../lib/site.ts';

const URL_BASE = (process.env.STRAPI_URL ?? 'https://strapi.fxnstudio.com').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_TOKEN;
const DRY = process.argv.includes('--dry-run');
const SITE = 'nxtsmarthome.com.au';

if (!TOKEN && !DRY) {
  console.error('STRAPI_TOKEN is not set. Add it to .env.local, or pass --dry-run.');
  process.exit(1);
}

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
    json = { raw: text.slice(0, 400) };
  }
  if (!res.ok) {
    throw new Error(`${method} ${pathname} -> ${res.status}: ${json?.error?.message ?? json?.raw ?? res.statusText}`);
  }
  return json;
}

/* Slugs are unique across the whole collection and the collection is shared, so
   the site and group are folded into the slug rather than trusting the title to
   be unique — 'Lighting' exists in two groups already. */
const slugify = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const rowsFor = (group, links) =>
  links.map((link, i) => ({
    title: link.label,
    slug: `nxtsmarthome-${group}-${slugify(link.label)}`,
    url: link.href,
    site: SITE,
    group,
    emoji: link.emoji ?? null,
    order: i * 10,
    isActive: true,
    target: 'self',
  }));

const rows = [
  ...rowsFor('products-root', [productsNavLink]),
  ...rowsFor('product-categories', productCategoryNavLinks),
  ...rowsFor('topics', topicNavLinks),
  ...rowsFor('guides', guideNavLinks),
  ...rowsFor('latest', [latestNavLink]),
  ...rowsFor('search', [searchLink]),
];

console.log(`source : lib/site.ts (${rows.length} links)`);
console.log(`target : ${URL_BASE} (nxtsmart-menus, site=${SITE})`);
console.log(`mode   : ${DRY ? 'DRY RUN — nothing is written' : 'WRITE'}\n`);

let created = 0;
let updated = 0;
const failures = [];

for (const row of rows) {
  if (DRY) {
    console.log(`  would upsert ${row.group.padEnd(18)} ${row.order.toString().padStart(3)}  ${row.title} -> ${row.url}`);
    continue;
  }
  try {
    const q = `filters[slug][$eq]=${encodeURIComponent(row.slug)}&filters[site][$eq]=${encodeURIComponent(SITE)}&pagination[pageSize]=1`;
    const found = await api(`/api/nxtsmart-menus?${q}`);
    const existing = found?.data?.[0];
    if (existing) {
      await api(`/api/nxtsmart-menus/${existing.documentId}`, { method: 'PUT', body: { data: row } });
      updated++;
      console.log(`  updated ${row.group.padEnd(18)} ${row.title}`);
    } else {
      await api('/api/nxtsmart-menus', { method: 'POST', body: { data: row } });
      created++;
      console.log(`  created ${row.group.padEnd(18)} ${row.title}`);
    }
  } catch (err) {
    failures.push({ slug: row.slug, message: err.message });
    console.log(`  FAILED  ${row.slug}: ${err.message}`);
  }
}

if (!DRY) {
  console.log(`\ncreated ${created} | updated ${updated} | failed ${failures.length}`);
  if (failures.length) process.exit(1);
}
