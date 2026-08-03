/**
 * Find products mentioned in an article and place them inline at the right section.
 *
 *   node scripts/link-products.mjs <article-slug>      # preview only (default)
 *   node scripts/link-products.mjs <article-slug> --write
 *   node scripts/link-products.mjs --all --write
 *
 * How it works
 * ------------
 * Every file in content/products/ carries a `match:` list — the ways an article
 * might name that product. This scans the article body for those strings, then
 * inserts a marker
 *
 *     ::product:aqara-hub-m3::
 *
 * at the END of the section where the product is first mentioned (just before the
 * next heading). The article page turns that marker into a rendered ProductBox, so
 * the buy box sits next to the prose that discusses it rather than in a dump at the
 * bottom of the page.
 *
 * It is safe to re-run: existing markers are detected and left alone, and nothing is
 * written without --write. Because the source is in git, `git diff` shows exactly
 * what it changed before you deploy.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.join(process.cwd());
const ARTICLES_DIR = path.join(ROOT, 'content', 'articles');
const PRODUCTS_DIR = path.join(ROOT, 'content', 'products');

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const ALL = args.includes('--all');
const target = args.find((a) => !a.startsWith('--'));

if (!ALL && !target) {
  console.error('Usage: node scripts/link-products.mjs <article-slug> [--write]');
  console.error('       node scripts/link-products.mjs --all [--write]');
  process.exit(1);
}

/* ---------- load the product library ------------------------------------- */
function loadProducts() {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];
  return fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(PRODUCTS_DIR, f), 'utf8'));
      if (!data?.name) return null;
      const slug = f.replace(/\.mdx?$/, '');
      // A product with no verdict is thin affiliate content — never link it into
      // an article. Fill bestFor/pros in the product file first.
      const hasVerdict =
        (typeof data.bestFor === 'string' && data.bestFor.trim()) ||
        (Array.isArray(data.pros) && data.pros.length);
      if (!hasVerdict) {
        console.log(`  skipped ${slug} — no verdict written yet`);
        return null;
      }
      const match = Array.from(
        new Set(
          [
            ...(Array.isArray(data.match) ? data.match : []),
            data.brand ? `${data.brand} ${data.name}` : '',
            data.name,
          ].filter(Boolean),
        ),
      // longest first, so "Aqara Hub M3" wins over "Aqara hub"
      ).sort((a, b) => b.length - a.length);
      return { slug, name: data.name, brand: data.brand, match };
    })
    .filter(Boolean);
}

const products = loadProducts();
if (!products.length) {
  console.error(`No products found in ${PRODUCTS_DIR}`);
  process.exit(1);
}

/* ---------- helpers ------------------------------------------------------- */
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Lines that are inside a fenced code block should never be matched or split on. */
function codeFenceMask(lines) {
  const mask = new Array(lines.length).fill(false);
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      mask[i] = true;
      return;
    }
    mask[i] = inFence;
  });
  return mask;
}

const isHeading = (line) => /^#{2,6}\s+\S/.test(line);
const MARKER_RE = /^::product:([a-z0-9-]+)::\s*$/;

/* ---------- process one article ------------------------------------------- */
function processArticle(slug) {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) {
    console.error(`  ! no such article: ${slug}`);
    return { changed: false };
  }

  const raw = fs.readFileSync(file, 'utf8');

  // Keep the front matter byte-for-byte; only the body is rewritten.
  const fmMatch = raw.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
  if (!fmMatch) {
    console.error(`  ! ${slug}: could not parse front matter`);
    return { changed: false };
  }
  const [, frontMatter, body] = fmMatch;

  const lines = body.split('\n');
  const inCode = codeFenceMask(lines);

  const already = new Set();
  lines.forEach((l) => {
    const m = l.match(MARKER_RE);
    if (m) already.add(m[1]);
  });

  // Find the first mention of each product, outside code blocks and markers.
  const hits = [];
  for (const p of products) {
    if (already.has(p.slug)) {
      hits.push({ product: p, line: -1, status: 'already placed' });
      continue;
    }
    let found = -1;
    let via = '';
    outer: for (let i = 0; i < lines.length; i++) {
      if (inCode[i] || MARKER_RE.test(lines[i])) continue;
      for (const alias of p.match) {
        const re = new RegExp(`\\b${escapeRe(alias)}\\b`, 'i');
        if (re.test(lines[i])) {
          found = i;
          via = alias;
          break outer;
        }
      }
    }
    if (found >= 0) hits.push({ product: p, line: found, via, status: 'new' });
  }

  const toInsert = hits.filter((h) => h.status === 'new');

  // Report
  console.log(`\n${slug}`);
  if (!hits.length) {
    console.log('  no products mentioned');
    return { changed: false };
  }
  for (const h of hits) {
    if (h.status === 'already placed') {
      console.log(`  = ${h.product.slug.padEnd(24)} already placed`);
    } else {
      const heading = findEnclosingHeading(lines, h.line);
      console.log(
        `  + ${h.product.slug.padEnd(24)} matched "${h.via}" on line ${h.line + 1}` +
          (heading ? `  → section "${heading}"` : '  → intro'),
      );
    }
  }

  if (!toInsert.length) return { changed: false };

  // Group products that land at the same point so they share one blank-line gap,
  // then insert bottom-up so earlier indices stay valid.
  const byPosition = new Map();
  for (const h of toInsert) {
    const at = sectionEnd(lines, h.line, inCode);
    if (!byPosition.has(at)) byPosition.set(at, []);
    byPosition.get(at).push(h.product.slug);
  }

  const out = [...lines];
  for (const [at, slugs] of [...byPosition.entries()].sort((a, b) => b[0] - a[0])) {
    // Blank line between each marker — adjacent lines would parse as one
    // paragraph and the renderer matches one marker per <p>.
    const block = slugs.flatMap((s, i) => (i === 0 ? [`::product:${s}::`] : ['', `::product:${s}::`]));
    out.splice(at, 0, '', ...block, '');
  }

  const next = frontMatter + out.join('\n');

  if (WRITE) {
    fs.writeFileSync(file, next, 'utf8');
    console.log(`  → wrote ${toInsert.length} marker(s)`);
  } else {
    console.log(`  → would write ${toInsert.length} marker(s)  (re-run with --write)`);
  }
  return { changed: true };
}

/** Heading text for the section a line sits in — for the report only. */
function findEnclosingHeading(lines, index) {
  for (let i = index; i >= 0; i--) {
    if (isHeading(lines[i])) return lines[i].replace(/^#+\s*/, '').trim();
  }
  return null;
}

/**
 * Where the product box should go: the end of the section containing the mention,
 * i.e. just before the next heading (or end of body). Trailing blank lines are
 * skipped so the marker sits tight against the prose.
 */
function sectionEnd(lines, fromLine, inCode) {
  let i = fromLine + 1;
  for (; i < lines.length; i++) {
    if (!inCode[i] && isHeading(lines[i])) break;
  }
  let end = i;
  while (end > fromLine + 1 && lines[end - 1].trim() === '') end--;
  return end;
}

/* ---------- run ----------------------------------------------------------- */
const slugs = ALL
  ? fs.readdirSync(ARTICLES_DIR).filter((f) => /\.mdx?$/.test(f)).map((f) => f.replace(/\.mdx?$/, ''))
  : [target];

console.log(`Product library: ${products.length} product(s) — ${products.map((p) => p.slug).join(', ')}`);
console.log(WRITE ? 'Mode: WRITE' : 'Mode: preview (no files changed)');

let changed = 0;
for (const s of slugs) {
  if (processArticle(s).changed) changed++;
}
console.log(`\n${changed} article(s) ${WRITE ? 'updated' : 'would change'}.`);
if (!WRITE && changed) console.log('Run again with --write to apply, then `git diff` to review.');
