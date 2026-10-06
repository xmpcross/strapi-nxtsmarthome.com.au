import type { Article } from './content';

const MARKER = /<p>::product:([a-z0-9-]+)::<\/p>/g;

/**
 * Which guides embed which product, from the `::product:<slug>::` markers in
 * each article body (see components/ArticleBody.tsx). Returns product slug →
 * the articles that feature it, newest first.
 *
 * This is what "discussed in our guides" means on the product pages: a product
 * a guide actually talks about, not a ranking or a test result.
 */
export function guideMentions(articles: Article[]): Map<string, Article[]> {
  const sorted = [...articles].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  const map = new Map<string, Article[]>();
  for (const article of sorted) {
    const seen = new Set<string>();
    for (const match of article.html.matchAll(MARKER)) {
      const slug = match[1];
      if (seen.has(slug)) continue;
      seen.add(slug);
      const list = map.get(slug) ?? [];
      list.push(article);
      map.set(slug, list);
    }
  }
  return map;
}
