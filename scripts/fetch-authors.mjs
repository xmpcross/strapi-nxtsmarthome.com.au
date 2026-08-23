/**
 * Fetch author profiles from Strapi into content/authors/.
 *
 * Runs as part of `prebuild`, alongside the nav and the search index, for the
 * same reason those do: `output: 'export'` refuses a fetch that is not
 * statically cacheable, so CMS data has to be pulled before the build rather
 * than inside the React tree.
 *
 * The CMS is the source of truth for a contributor's name, role, avatar and
 * bio. Editing the bio in Content Manager was previously invisible to the site,
 * which read only these markdown files — so a bio written in Strapi never
 * appeared, and the file's placeholder text showed instead.
 *
 * The editorial default (nxt-smart-home-editorial.md) is NOT in the CMS and is
 * deliberately left alone: it is the byline for anything with no named author.
 *
 * Never fails the build. If Strapi is unreachable the existing files are left
 * as they are and the build carries on with them.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIR = path.join(ROOT, 'content', 'authors');
const KEEP = new Set(['nxt-smart-home-editorial']);

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

/** YAML-safe single-quoted scalar. */
const q = (v) => `'${String(v ?? '').replace(/'/g, "''")}'`;

async function main() {
  if (!BASE) {
    console.log('[authors] STRAPI_URL not set — leaving content/authors/ as it is.');
    return;
  }

  const url =
    `${BASE}/api/nxtsmarthome-authors?status=published` +
    `&pagination%5BpageSize%5D=100&populate%5Bavatar%5D=true&_build=${Date.now()}`;

  const res = await fetch(url, { headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {} });
  if (!res.ok) {
    console.log(`[authors] Strapi returned ${res.status} — leaving content/authors/ as it is.`);
    return;
  }

  const rows = (await res.json())?.data ?? [];
  fs.mkdirSync(DIR, { recursive: true });

  let written = 0;
  for (const row of rows) {
    const a = row.attributes ?? row;
    if (!a.slug || !a.name) continue;
    if (KEEP.has(a.slug)) continue;

    const avatar = a.avatar?.url
      ? (/^https?:\/\//.test(a.avatar.url) ? a.avatar.url : `${BASE}${a.avatar.url}`)
      : '';

    const links = Array.isArray(a.sameAs) && a.sameAs.length
      ? a.sameAs
          .filter((l) => l && (l.href || l.url))
          .map((l) => `  - label: ${q(l.label ?? l.name ?? 'Profile')}\n    href: ${q(l.href ?? l.url)}`)
      : ['  - label: How we test\n    href: /how-we-test/', '  - label: About this site\n    href: /about/'];

    // Body deliberately empty: the CMS has no long-profile field, and anything
    // left here shows verbatim on /authors/<slug>/ — an HTML comment in this
    // position rendered as visible text on the page.
    const md =
      '---\n' +
      `name: ${q(a.name)}\n` +
      `slug: ${q(a.slug)}\n` +
      `role: ${q(a.role ?? '')}\n` +
      `initials: ''\n` +
      `avatar: ${q(avatar)}\n` +
      `bio: ${q((a.bio ?? '').replace(/\s+/g, ' ').trim())}\n` +
      'links:\n' +
      links.join('\n') +
      '\n---\n';

    fs.writeFileSync(path.join(DIR, `${a.slug}.md`), md);
    written += 1;
  }

  console.log(`[authors] wrote ${written} profile(s) from Strapi.`);
}

main().catch((err) => {
  console.log(`[authors] ${err.message} — leaving content/authors/ as it is.`);
});
