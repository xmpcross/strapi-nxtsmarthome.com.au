/**
 * URL shapes for the site, kept free of any Node dependency.
 *
 * lib/content.ts imports fs and path, so client components cannot import from it.
 * These helpers live here instead, and content.ts re-exports articleHref so server
 * code has one obvious place to reach for.
 */

/**
 * Canonical path for an article: /<category-slug>/<article-slug>/.
 *
 * Single source of truth — links, sitemap and JSON-LD all read from here, so the
 * shape cannot drift between them. An article whose category is unknown falls back
 * to /articles/ so bad front matter yields a valid URL rather than /undefined/.
 */
export function articleHref(article: {
  slug: string;
  categoryMeta?: { slug: string } | undefined;
}): string {
  return `/${article.categoryMeta?.slug ?? 'articles'}/${article.slug}/`;
}
