/**
 * Import content/articles/*.md into the shared Strapi CMS.
 *
 *   node --env-file=.env.local scripts/strapi-import.mjs --dry-run
 *   node --env-file=.env.local scripts/strapi-import.mjs
 *
 * One-way: markdown is the source of truth and this pushes it to Strapi. The site
 * itself still builds from the markdown files — nothing here changes how
 * nxtsmarthome.com.au renders. Re-running is safe; posts and categories are
 * matched on slug and updated in place rather than duplicated.
 *
 * The target is a MULTI-TENANT instance also serving fxnstudio, NXT Bargains and
 * others. This site has its own nxtsmarthome-* content types, so the import
 * cannot touch another property's content: there is nothing else in them. They
 * replaced the shared nxtsmart-* types, which held both this site and
 * nxtsmart.homes in one undifferentiated list.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const ARTICLES = path.join(ROOT, 'content', 'articles');

const URL_BASE = (process.env.STRAPI_URL ?? 'https://strapi.fxnstudio.com').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_TOKEN;
const DRY = process.argv.includes('--dry-run');
const limitArg = process.argv.find((a) => a.startsWith('--limit='));
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : Infinity;

if (!TOKEN && !DRY) {
  console.error('STRAPI_TOKEN is not set. Add it to .env.local, or pass --dry-run.');
  process.exit(1);
}

/*
  The site's own `type` vocabulary does not match the CMS enum one-for-one. Two
  values were added to the enum because they carry real meaning here and had no
  equivalent — 'buying-guide' is 20 of the 48 articles. The rest map onto terms
  the CMS already had rather than inflating the enum further.
*/
const POST_TYPE = {
  'buying-guide': 'buying-guide',
  pillar: 'pillar',
  explainer: 'informative',
  comparison: 'product-comparison',
  'how-to': 'how-to-guide',
  roundup: 'product-roundup',
};

// Category slug -> display name. The CMS already holds 13 WordPress-era categories
// on different slugs; these nine are the site's own taxonomy and are created
// alongside them rather than force-fitted onto near-matches.
const CATEGORY_NAMES = {
  'buying-guides': 'Buying Guides',
  security: 'Security & Cameras',
  'hubs-and-platforms': 'Hubs & Platforms',
  energy: 'Energy',
  'setup-guides': 'Setup Guides',
  climate: 'Climate',
  lighting: 'Lighting',
  'robot-vacuums': 'Robot Vacuums',
  entertainment: 'Entertainment',
};

const SITE = 'https://nxtsmarthome.com.au';

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
    const detail = json?.error?.message ?? json?.raw ?? res.statusText;
    throw new Error(`${method} ${pathname} -> ${res.status}: ${detail}`);
  }
  return json;
}

/** Existing document for a slug, draft or published. Returns null when absent. */
async function findBySlug(plural, slug) {
  const q = `filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`;
  // A published document is not returned by a draft query and vice versa, so both
  // are checked — otherwise a re-run creates a duplicate of anything unpublished.
  for (const status of ['published', 'draft']) {
    const r = await api(`/api/${plural}?${q}&status=${status}`);
    if (r?.data?.length) return r.data[0];
  }
  return null;
}

async function upsert(plural, slug, data, { publish }) {
  const existing = await findBySlug(plural, slug);
  // `status` decides which version the write lands on. Without it every write
  // targets the draft and the public API keeps serving stale content.
  const suffix = publish === undefined ? '' : `?status=${publish ? 'published' : 'draft'}`;
  if (existing) {
    await api(`/api/${plural}/${existing.documentId}${suffix}`, { method: 'PUT', body: { data } });
    return { action: 'updated', documentId: existing.documentId };
  }
  const created = await api(`/api/${plural}${suffix}`, { method: 'POST', body: { data } });
  return { action: 'created', documentId: created.data.documentId };
}

/**
 * Trim to a hard field limit without cutting a word in half.
 *
 * Only the SEO fields need this: seoTitle caps at 70 and seoDescription at 160,
 * and 3 titles and 9 descriptions exceed those. Nothing is lost by clamping them,
 * because the untruncated text is already stored in `title` (255) and `excerpt`
 * (500) — these two are derived metadata, not the content itself.
 */
function clamp(text, max) {
  if (!text) return null;
  const s = String(text).trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, '');
}

function readingMinutes(markdown) {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const files = fs.readdirSync(ARTICLES).filter((f) => f.endsWith('.md')).sort();
const articles = files.map((f) => {
  const slug = f.replace(/\.md$/, '');
  const { data, content } = matter(fs.readFileSync(path.join(ARTICLES, f), 'utf8'));
  return { slug, fm: data, body: content.trim() };
});

console.log(`source   : ${articles.length} markdown articles`);
console.log(`target   : ${URL_BASE} (nxtsmarthome-* content types)`);
console.log(`mode     : ${DRY ? 'DRY RUN — nothing is written' : 'WRITE'}`);

// ---- categories ------------------------------------------------------------
const usedCategories = [...new Set(articles.map((a) => a.fm.category).filter(Boolean))].sort();
const categoryIds = {};
console.log(`\ncategories (${usedCategories.length}):`);
for (const slug of usedCategories) {
  const name = CATEGORY_NAMES[slug] ?? slug;
  if (DRY) {
    console.log(`  would upsert ${slug} (${name})`);
    continue;
  }
  // Categories have draftAndPublish disabled, so no status is passed.
  const r = await upsert('nxtsmarthome-categories', slug, { name, slug }, { publish: undefined });
  categoryIds[slug] = r.documentId;
  console.log(`  ${r.action.padEnd(7)} ${slug} (${name})`);
}

// ---- articles --------------------------------------------------------------
console.log(`\narticles:`);
let created = 0;
let updated = 0;
const failures = [];

for (const { slug, fm, body } of articles.slice(0, LIMIT)) {
  const isDraft = fm.draft === true;
  const data = {
    title: fm.title,
    slug,
    excerpt: (fm.description ?? '').slice(0, 500),
    content: body,
    keyTakeaways: fm.keyTakeaway ?? null,
    postType: POST_TYPE[fm.type] ?? 'other',
    publishDate: fm.date ? new Date(fm.date).toISOString() : null,
    dateModified: new Date(fm.updated ?? fm.date ?? Date.now()).toISOString(),
    featured: fm.featured === true,
    tags: fm.tags ?? [],
    faq: (fm.faq ?? []).map((item, i) => ({
      question: item.q,
      answer: item.a,
      order: i,
    })),
    readingTimeMinutes: readingMinutes(body),
    seoTitle: clamp(fm.title, 70),
    seoDescription: clamp(fm.description, 160),
    // The cover artwork stays on the site's own CDN path rather than being
    // uploaded into Strapi's media library, so regenerating a cover does not
    // require re-importing anything.
    coverImageUrl: `${SITE}/covers/${slug}.webp`,
    coverImageAlt: clamp(fm.imageAlt ?? fm.title, 255),
    sourceUrl: clamp(`${SITE}/${fm.category ?? 'articles'}/${slug}/`, 500),
    source: 'manual',
    ...(categoryIds[fm.category] ? { categories: [categoryIds[fm.category]] } : {}),
  };

  if (DRY) {
    console.log(
      `  would ${String(isDraft ? 'draft' : 'publish').padEnd(7)} ${slug}  ` +
        `type=${data.postType} faq=${data.faq.length} tags=${data.tags.length}`,
    );
    continue;
  }

  try {
    const r = await upsert('nxtsmarthome-posts', slug, data, { publish: !isDraft });
    r.action === 'created' ? created++ : updated++;
    console.log(`  ${r.action.padEnd(7)} ${isDraft ? 'draft    ' : 'published'} ${slug}`);
  } catch (err) {
    failures.push({ slug, message: err.message });
    console.log(`  FAILED  ${slug}: ${err.message}`);
  }
}

if (!DRY) {
  console.log(`\ncreated ${created} | updated ${updated} | failed ${failures.length}`);
  if (failures.length) {
    console.log('\nfailures:');
    for (const f of failures) console.log(`  ${f.slug}: ${f.message}`);
    process.exit(1);
  }
}
