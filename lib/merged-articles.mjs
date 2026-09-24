/**
 * Merged (near-duplicate) articles, from data/merged-articles.json.
 *
 * Shared by the site (lib/content.ts, the article route), the prebuild scripts
 * (build-search-index.mjs, gen-redirects.mjs) and the audit, so all of them
 * agree on which slugs are gone and where they point. Plain JS for the same
 * reason as editorial-guard.mjs: the prebuild scripts run before Next compiles.
 *
 * Read with fs rather than imported, so a script and the Next server both load
 * it the same way; server-side only.
 */
import fs from 'node:fs';
import path from 'node:path';

/**
 * @typedef {{ from: string, to: string, fromSlug: string, toSlug: string }} Merge
 */

/** Last path segment: '/lighting/some-slug/' -> 'some-slug'. */
function slugOf(p) {
  return String(p).replace(/\/+$/, '').split('/').pop() ?? '';
}

/** @returns {Merge[]} */
export function loadMerges(root = process.cwd()) {
  const file = path.join(root, 'data', 'merged-articles.json');
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  return (raw.merges ?? []).map((m) => ({
    from: m.from,
    to: m.to,
    fromSlug: slugOf(m.from),
    toSlug: slugOf(m.to),
  }));
}

/** Merged-away slug -> survivor path. @returns {Map<string, string>} */
export function mergedSlugTargets(root = process.cwd()) {
  return new Map(loadMerges(root).map((m) => [m.fromSlug, m.to]));
}
