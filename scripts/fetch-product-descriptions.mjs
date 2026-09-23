/**
 * Pull rewritten product blurbs from Strapi into public/data/products.json.
 *
 * Runs in `prebuild`, next to the nav, the search index and the author sync,
 * for the same reason those do: `output: 'export'` refuses a fetch that is not
 * statically cacheable, so CMS data has to be pulled before the build.
 *
 * Why this exists: commerce-product.shortDescription is edited in the CMS, but
 * the site reads public/data/products.json, and nothing carried the field
 * across. A description rewritten in Content Manager therefore changed nothing
 * on the site — the page kept showing the manufacturer copy from the catalogue.
 * The sync runs one way, CMS to catalogue, because the CMS is where the editing
 * happens.
 *
 * The manufacturer's `description` is left in place rather than overwritten:
 * it is the fallback for products nobody has rewritten, and losing it would
 * mean re-fetching it from the merchant feed.
 *
 * Never fails the build. An unreachable Strapi leaves the catalogue as it is.
 */
import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

/*
 * commerce-product.description is markdown in the CMS. It is converted here
 * rather than in the component, because the component that renders it is a
 * 'use client' one and the remark stack is server-only — importing it there
 * would pull node built-ins into the browser bundle, which has already broken
 * this build once.
 */
async function toHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

const ROOT = process.cwd();
const CATALOGUE = path.join(ROOT, 'public', 'data', 'products.json');

function env(name) {
  if (process.env[name]) return process.env[name].trim();
  for (const f of ['.env.local', '.env']) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(new RegExp(`^\\s*${name}\\s*=\\s*(.*)\\s*$`));
      if (m) return m[1].replace(/^["']|["']$/g, '').trim();
    }
  }
  return '';
}

const BASE = env('STRAPI_URL');
const TOKEN = env('STRAPI_TOKEN');
const SITE = 'nxtsmarthome.com.au';

async function main() {
  if (!BASE || !fs.existsSync(CATALOGUE)) {
    console.log('[products] STRAPI_URL or catalogue missing — leaving descriptions as they are.');
    return;
  }

  const blurbs = new Map();
  for (let page = 1; page <= 10; page += 1) {
    const url =
      `${BASE}/api/commerce-products?status=published` +
      `&filters%5Bsite%5D%5Bdomain%5D%5B%24eq%5D=${encodeURIComponent(SITE)}` +
      `&fields%5B0%5D=slug&fields%5B1%5D=shortDescription&fields%5B2%5D=description` +
      `&pagination%5BpageSize%5D=100&pagination%5Bpage%5D=${page}&_build=${Date.now()}`;

    const res = await fetch(url, { headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {} });
    if (!res.ok) {
      console.log(`[products] Strapi returned ${res.status} — leaving descriptions as they are.`);
      return;
    }
    const json = await res.json();
    const rows = json?.data ?? [];
    for (const row of rows) {
      const a = row.attributes ?? row;
      if (!a.slug) continue;
      const entry = blurbs.get(a.slug) ?? {};
      if ((a.shortDescription || '').trim()) entry.shortDescription = a.shortDescription.trim();
      if ((a.description || '').trim()) entry.description = a.description.trim();
      if (Object.keys(entry).length) blurbs.set(a.slug, entry);
    }
    const { page: cur, pageCount } = json?.meta?.pagination ?? {};
    if (!pageCount || cur >= pageCount) break;
  }

  const raw = JSON.parse(fs.readFileSync(CATALOGUE, 'utf8'));
  const rows = Array.isArray(raw) ? raw : raw.products;
  let applied = 0;
  let described = 0;
  for (const p of rows) {
    const entry = blurbs.get(p.slug);
    if (!entry) continue;
    if (entry.shortDescription && p.shortDescription !== entry.shortDescription) {
      p.shortDescription = entry.shortDescription;
      applied += 1;
    }
    if (entry.description) {
      const html = await toHtml(entry.description);
      if (p.cmsDescriptionHtml !== html) { p.cmsDescriptionHtml = html; described += 1; }
    }
  }

  fs.writeFileSync(CATALOGUE, JSON.stringify(raw, null, 2));
  console.log(
    `[products] ${blurbs.size} product(s) from the CMS — ${applied} blurb(s) and ` +
    `${described} description(s) written into the catalogue.`,
  );
}

main().catch((err) => {
  console.log(`[products] ${err.message} — leaving descriptions as they are.`);
});
