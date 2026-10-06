import GuidePillar from '@/components/category/GuidePillar';
import TopicHub from '@/components/category/TopicHub';
import type { Article } from '@/lib/content';
import { isGuideCategory, type Category } from '@/lib/site';

/**
 * The category page at /categories/[slug]/.
 *
 * Setup Guides and Buying Guides are pillar pages (GuidePillar): one long
 * guide, in sections, listing only that category's posts. Every other
 * category is a topic page (TopicHub): the guides to start with, what is new,
 * and every guide in a filterable list. Neither paginates; /page/N/ redirects
 * to the category's own URL.
 */
export default function CategoryView({
  category,
  articles,
  allArticles,
}: {
  category: Category;
  articles: Article[];
  /** Every published article, for the topic page's cross-topic fallback. */
  allArticles: Article[];
}) {
  return isGuideCategory(category.slug) ? (
    <GuidePillar category={category} articles={articles} />
  ) : (
    <TopicHub category={category} articles={articles} allArticles={allArticles} />
  );
}
