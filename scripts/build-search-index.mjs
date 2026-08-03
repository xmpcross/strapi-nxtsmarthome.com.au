/**
 * Generates public/search-index.json for the client-side search page.
 * Runs automatically before every build via the `prebuild` npm script.
 *
 * Deliberately standalone (no TypeScript imports) so it can run before Next compiles.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const articlesDir = path.join(root, 'content', 'articles');
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
  const file = path.join(root, 'public', 'covers', `${slug}.png`);
  try {
    const { size, mtimeMs } = fs.statSync(file);
    const v = (size ^ Math.round(mtimeMs)).toString(36).slice(-6);
    return `/covers/${slug}.png?v=${v}`;
  } catch {
    return `/covers/${slug}.png`;
  }
}

if (!fs.existsSync(articlesDir)) {
  console.warn('[search-index] no content/articles directory — writing empty index');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, '[]');
  process.exit(0);
}

const docs = fs
  .readdirSync(articlesDir)
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(articlesDir, file), 'utf8'));
    if (data.draft) return null;
    return {
      slug: file.replace(/\.mdx?$/, ''),
      title: data.title ?? '',
      description: data.description ?? '',
      category: data.category ?? '',
      categoryName: categoryNames[data.category] ?? data.category ?? '',
      // Shaped like Article.categoryMeta so articleHref() works on a search doc
      // unchanged — otherwise every result would fall back to /articles/<slug>/.
      categoryMeta: { slug: categorySlugs[data.category] ?? 'articles' },
      type: data.type ?? '',
      date: data.date ?? '',
      tags: data.tags ?? [],
      // Same 225 wpm figure lib/content.ts uses, so the modal and the article
      // page never disagree about how long a piece takes to read.
      readingMinutes: Math.max(1, Math.round(toPlainText(content).split(/\s+/).length / 225)),
      cover: coverUrl(file.replace(/\.mdx?$/, '')),
      body: toPlainText(content).slice(0, 1200),
    };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(docs));
console.log(`[search-index] wrote ${docs.length} documents to public/search-index.json`);
