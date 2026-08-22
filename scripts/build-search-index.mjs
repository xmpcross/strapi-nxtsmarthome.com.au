/**
 * Generates public/search-index.json for the client-side search page.
 * Runs automatically before every build via the `prebuild` npm script.
 *
 * Deliberately standalone (no TypeScript imports) so it can run before Next compiles.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outFile = path.join(root, 'public', 'search-index.json');

// Mirrors the category list in lib/site.ts — key to display name.
const categorySlugs = {
  security: 'security-and-cameras',
  lighting: 'lighting',
  energy: 'energy-and-solar',
  entertainment: 'entertainment-and-audio',
  climate: 'climate-and-comfort',
  'hubs-and-platforms': 'hubs-and-platforms',
  'robot-vacuums': 'robot-vacuums',
  'setup-guides': 'setup-guides',
  'buying-guides': 'buying-guides',
};

const categoryNames = {
  security: 'Security & Cameras',
  lighting: 'Lighting',
  energy: 'Energy & Solar',
  entertainment: 'Entertainment & Audio',
  climate: 'Climate & Comfort',
  'hubs-and-platforms': 'Hubs & Platforms',
  'robot-vacuums': 'Robot Vacuums',
  'setup-guides': 'Setup Guides',
  'buying-guides': 'Buying Guides',
};

function toPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Cover URL with the same content-hash cache-buster coverFor() applies in
 * lib/content.ts. Without it the modal's thumbnails keep serving a stale image
 * from the 30-day cache after a cover is regenerated.
 */
function coverUrl(slug) {
  for (const ext of ['webp', 'png']) {
    try {
      const file = path.join(root, 'public', 'covers', `${slug}.${ext}`);
      const { size, mtimeMs } = fs.statSync(file);
      const v = (size ^ Math.round(mtimeMs)).toString(36).slice(-6);
      return `/covers/${slug}.${ext}?v=${v}`;
    } catch {
      /* try the next extension */
    }
  }
  return `/covers/${slug}.png`;
}

/*
 * Built from the CMS, not from content/articles/.
 *
 * The site started reading posts from Strapi; this kept reading the markdown,
 * so the index silently described a different set of articles than the site
 * served. The first thing published only in the CMS was live on the site and
 * absent from search, with nothing failing to say so.
 */
const STRAPI = (process.env.STRAPI_URL || 'https://cms.fxnstudio.com').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_TOKEN || process.env.STRAPI_API_TOKEN || '';

const params = new URLSearchParams({
  status: 'published',
  'pagination[pageSize]': '200',
  'sort[0]': 'publishDate:desc',
  'populate[categories]': 'true',
});

const res = await fetch(`${STRAPI}/api/nxtsmarthome-posts?${params}`, {
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
});

if (!res.ok) {
  // Never write an empty index over a good one: search would go quiet with a
  // successful build and nothing in the log worth noticing.
  console.error(`[search-index] Strapi returned ${res.status} — refusing to overwrite the index`);
  process.exit(1);
}

const rows = (await res.json())?.data ?? [];

/* The CMS relates a post to a category by URL slug; this file keys off the
   category KEY, the same split lib/content.ts bridges. */
const keyBySlug = Object.fromEntries(
  Object.entries(categorySlugs).map(([key, slug]) => [slug, key]),
);

const docs = rows
  .map((row) => {
    const a = row.attributes ?? row;
    if (!a.slug || !a.title) return null;
    const catSlug = a.categories?.[0]?.slug ?? '';
    const key = keyBySlug[catSlug] ?? catSlug;
    const body = toPlainText(String(a.content ?? ''));
    return {
      slug: a.slug,
      title: a.title,
      description: a.excerpt ?? '',
      category: key,
      categoryName: categoryNames[key] ?? a.categories?.[0]?.name ?? '',
      // Shaped like Article.categoryMeta so articleHref() works on a search doc
      // unchanged — otherwise every result would fall back to /articles/<slug>/.
      categoryMeta: { slug: categorySlugs[key] ?? catSlug ?? 'articles' },
      type: a.postType ?? '',
      date: a.publishDate ?? a.publishedAt ?? '',
      tags: Array.isArray(a.tags) ? a.tags : [],
      readingMinutes:
        a.readingTimeMinutes || Math.max(1, Math.round(body.split(/\s+/).length / 225)),
      cover: a.coverImageUrl || coverUrl(a.slug),
      body: body.slice(0, 1200),
    };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(docs));
console.log(`[search-index] wrote ${docs.length} documents from Strapi to public/search-index.json`);
