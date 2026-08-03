/**
 * Find products your articles already talk about that have no product file yet.
 *
 *   node scripts/product-gaps.mjs                 # ranked report
 *   node scripts/product-gaps.mjs --scaffold      # also write starter files
 *   node scripts/product-gaps.mjs <article-slug>  # one article only
 *
 * This is the "search" step that needs no API keys: the corpus being searched is
 * your own writing. It surfaces the gap between what you have already recommended
 * in prose and what exists in content/products/, ranked by how often you mention it
 * — which is a decent proxy for what is worth monetising first.
 *
 * Network search (eBay/Amazon) is a separate, later step: it fills in facts —
 * model numbers, ASINs, images — for a product you have already decided to cover.
 * It cannot tell you what to write about.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { retailerYaml } from './retailers.mjs';

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, 'content', 'articles');
const PRODUCTS_DIR = path.join(ROOT, 'content', 'products');

const args = process.argv.slice(2);
const SCAFFOLD = args.includes('--scaffold');
const only = args.find((a) => !a.startsWith('--'));

/**
 * Brands this site covers. A mention only counts as a product candidate when it
 * starts with one of these, which keeps ordinary prose out of the results.
 */
const BRANDS = [
  'Aqara', 'Amazon', 'Apple', 'Arlo', 'Bosch', 'Brilliant', 'Clipsal', 'Daikin', 'Deta',
  'Dreame', 'Ecovacs', 'Eufy', 'Google', 'Hue', 'IKEA', 'Kasa', 'Kogan', 'LG', 'LIFX',
  'Meross', 'Mitsubishi', 'Nanoleaf', 'Nest', 'Netatmo', 'Philips', 'Reolink', 'Ring',
  'Roborock', 'Samsung', 'Sensibo', 'Shelly', 'SmartThings', 'Sonoff', 'Sonos', 'Swann',
  'SwitchBot', 'Tapo', 'Tuya', 'TP-Link', 'Ubiquiti', 'Wyze', 'Xiaomi', 'Yale', 'Zemismart',
];

/** Words that follow a brand but never form part of a product name. */
const STOP = new Set([
  'and', 'or', 'the', 'a', 'an', 'is', 'are', 'was', 'were', 'to', 'for', 'with', 'without',
  'if', 'in', 'on', 'at', 'by', 'from', 'as', 'that', 'this', 'these', 'those', 'but', 'so',
  'you', 'your', 'it', 'its', 'they', 'their', 'we', 'our', 'has', 'have', 'had', 'will',
  'can', 'may', 'does', 'do', 'did', 'not', 'all', 'any', 'both', 'each', 'more', 'most',
  'other', 'some', 'such', 'than', 'then', 'there', 'when', 'where', 'which', 'who', 'why',
  'ecosystem', 'ecosystems', 'devices', 'device', 'app', 'apps', 'home', 'homes', 'users',
  'user', 'support', 'supports', 'account', 'accounts', 'gear', 'kit', 'products', 'product',
]);

function loadKnownAliases() {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];
  return fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .flatMap((f) => {
      const { data } = matter(fs.readFileSync(path.join(PRODUCTS_DIR, f), 'utf8'));
      const aliases = [
        ...(Array.isArray(data.match) ? data.match : []),
        data.brand ? `${data.brand} ${data.name}` : '',
        data.name,
      ].filter(Boolean);
      return aliases.map((a) => a.toLowerCase());
    });
}

const known = loadKnownAliases();
const brandRe = new RegExp(
  `\\b(${BRANDS.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b([\\w\\s+-]{0,28})`,
  'g',
);

/** Trim a captured tail down to the plausible model-name part. */
function cleanTail(tail) {
  const words = tail.trim().split(/\s+/).filter(Boolean);
  const kept = [];
  for (const w of words) {
    const bare = w.replace(/[^\w+-]/g, '');
    if (!bare) break;
    // Keep capitalised words, model numbers, or alphanumeric codes. Stop otherwise.
    const isModelish = /^[A-Z0-9][\w+-]*$/.test(bare) || /\d/.test(bare);
    if (!isModelish || STOP.has(bare.toLowerCase())) break;
    kept.push(bare);
    if (kept.length === 3) break;
  }
  return kept.join(' ');
}

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

const files = fs
  .readdirSync(ARTICLES_DIR)
  .filter((f) => /\.mdx?$/.test(f))
  .filter((f) => !only || f.replace(/\.mdx?$/, '') === only);

if (!files.length) {
  console.error(only ? `No such article: ${only}` : 'No articles found');
  process.exit(1);
}

/** candidate -> { count, articles:Set } */
const found = new Map();

for (const file of files) {
  const slug = file.replace(/\.mdx?$/, '');
  const { content } = matter(fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8'));
  // ignore fenced code and existing markers
  const body = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^::product:[a-z0-9-]+::$/gm, '');

  let m;
  brandRe.lastIndex = 0;
  while ((m = brandRe.exec(body)) !== null) {
    const brand = m[1];
    const tail = cleanTail(m[2] ?? '');
    if (!tail) continue;                       // bare brand mention, not a product
    const label = `${brand} ${tail}`;
    if (known.some((k) => k === label.toLowerCase() || label.toLowerCase().includes(k))) continue;

    const entry = found.get(label) ?? { count: 0, articles: new Set() };
    entry.count += 1;
    entry.articles.add(slug);
    found.set(label, entry);
  }
}

const ranked = [...found.entries()]
  .map(([label, v]) => ({ label, ...v, articles: [...v.articles] }))
  .sort((a, b) => b.count - a.count || b.articles.length - a.articles.length);

console.log(`Product library: ${new Set(known).size} alias(es) across existing files`);
console.log(`Scanned ${files.length} article(s)\n`);

if (!ranked.length) {
  console.log('No uncovered product mentions found.');
  process.exit(0);
}

console.log('Mentioned in your writing but not in content/products/:\n');
console.log('  mentions  articles  candidate');
for (const r of ranked.slice(0, 30)) {
  console.log(
    `  ${String(r.count).padStart(8)}  ${String(r.articles.length).padStart(8)}  ${r.label}` +
      `\n${' '.repeat(20)}${r.articles.join(', ')}`,
  );
}

if (!SCAFFOLD) {
  console.log(`\n${ranked.length} candidate(s). Re-run with --scaffold to create starter files.`);
  process.exit(0);
}

fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
let written = 0;
for (const r of ranked) {
  const slug = slugify(r.label);
  const dest = path.join(PRODUCTS_DIR, `${slug}.md`);
  if (fs.existsSync(dest)) continue;

  const [brand, ...rest] = r.label.split(' ');
  const name = rest.join(' ');
  const q = encodeURIComponent(r.label);

  fs.writeFileSync(
    dest,
    `---
name: ${name}
brand: ${brand}
# TODO: your verdict. Nothing below this line should come from a vendor feed —
# it is the only part of this file a competitor cannot also publish.
bestFor: ''
rating:
match:
  - ${r.label}
identifiers:
  model: ''
  asin: ''
  ebayEpid: ''
pros: []
cons: []
retailers:
${retailerYaml(r.label)}
---

Mentioned in: ${r.articles.join(', ')}
`,
    'utf8',
  );
  written++;
}
console.log(`\nScaffolded ${written} starter file(s) in content/products/.`);
console.log('Fill in bestFor / rating / pros / cons, then run scripts/link-products.mjs --all --write');
