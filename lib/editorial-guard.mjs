/**
 * Unfinished-content guard, shared by the site (lib/content.ts), the prebuild
 * search index (scripts/build-search-index.mjs) and the audit
 * (scripts/audit-content.mjs), so all three agree on what counts as unfinished.
 *
 * Plain JS on purpose: the prebuild scripts run before Next compiles anything.
 *
 * A post that trips any marker is held back everywhere: not listed, not in
 * search, related posts or the sitemap, and its page 404s (unless
 * EDITORIAL_GUARD=warn, see guardMode). `[VERIFY` is the
 * fact-check tag CLAUDE.md rules 6-7 require on legal claims and unverifiable
 * figures, so a post carrying one has not been through that check yet. The
 * rest are template placeholders that were never replaced.
 */

/** @type {{ label: string, re: RegExp }[]} */
export const EDITORIAL_MARKERS = [
  { label: '[VERIFY', re: /\[VERIFY/gi },
  // Case-insensitive throughout (AdSense Task 5): a stray "todo" or "tbd" in a
  // published post is as much a leak as the upper-case form.
  { label: 'TODO', re: /\bTODO\b/gi },
  { label: 'TBD', re: /\bTBD\b/gi },
  { label: 'lorem ipsum', re: /\blorem\b/gi },
  { label: 'What they cover, e.g.', re: /What they cover, e\.g\./gi },
  { label: 'Tag one', re: /\bTag one\b/gi },
  { label: 'Tag two', re: /\bTag two\b/gi },
  { label: 'One or two sentences that would', re: /One or two sentences that would/gi },
  { label: 'A direct answer in two to four sentences', re: /A direct answer in two to four sentences/gi },
];

/**
 * What the guard does with a post that trips a marker:
 *   'block' (default): held back everywhere and its page 404s;
 *   'warn': stays live, but every hit is still logged.
 * Set with EDITORIAL_GUARD=warn (server env; read at build and on revalidate).
 */
export function guardMode() {
  return String(process.env.EDITORIAL_GUARD ?? '').trim().toLowerCase() === 'warn' ? 'warn' : 'block';
}

/**
 * Marker hits across a post's text fields.
 * @param {Array<string | null | undefined>} texts
 * @returns {{ label: string, count: number }[]}
 */
export function editorialHits(texts) {
  const joined = texts.filter(Boolean).join('\n');
  const hits = [];
  for (const { label, re } of EDITORIAL_MARKERS) {
    const count = (joined.match(re) || []).length;
    if (count) hits.push({ label, count });
  }
  return hits;
}

/**
 * The text fields a Strapi nxtsmarthome-post is checked on: body, excerpt,
 * keyTakeaways and every FAQ question and answer.
 * @param {Record<string, any>} post
 * @returns {string[]}
 */
export function postTexts(post) {
  const faq = Array.isArray(post?.faq) ? post.faq : [];
  return [
    post?.content,
    post?.excerpt,
    post?.keyTakeaways,
    ...faq.flatMap((f) => [f?.q, f?.question, f?.a, f?.answer]),
  ].map((v) => String(v ?? ''));
}
