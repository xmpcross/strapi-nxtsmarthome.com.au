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
      type: data.type ?? '',
      date: data.date ?? '',
      tags: data.tags ?? [],
      body: toPlainText(content).slice(0, 1200),
    };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(docs));
console.log(`[search-index] wrote ${docs.length} documents to public/search-index.json`);
