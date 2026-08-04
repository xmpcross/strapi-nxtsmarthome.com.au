import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryView from '@/components/CategoryView';
import { pageCount } from '@/components/Pagination';
import { categoriesWithCounts, getAllArticles, getArticlesByCategory } from '@/lib/content';
import { categories, getCategory } from '@/lib/site';

/**
 * Pages 2..N of a category listing.
 *
 * Page 1 stays at the category's own URL, so nothing that already links there
 * breaks. These later pages are generated as real static files rather than being
 * sliced client-side — a static export has no server to paginate on, and pages
 * behind JavaScript would be invisible to crawlers.
 */
export async function generateStaticParams() {
  const all = await getAllArticles();
  const params: { slug: string; page: string }[] = [];

  for (const category of categories) {
    const count = all.filter((a) => a.category === category.key).length;
    for (let n = 2; n <= pageCount(count); n += 1) {
      params.push({ slug: category.slug, page: String(n) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}): Promise<Metadata> {
  const { slug, page } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name} — page ${page}`,
    description: category.intro.slice(0, 160),
    alternates: { canonical: `/categories/${category.slug}/page/${page}/` },
    // Later pages are thin by nature: same intro, same sidebar, a different six
    // cards. Indexing them competes with page one for the same terms.
    robots: { index: false, follow: true },
  };
}

export default async function CategoryPagedPage({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) {
  const { slug, page } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const n = Number(page);
  const articles = await getArticlesByCategory(category.key);
  if (!Number.isInteger(n) || n < 2 || n > pageCount(articles.length)) notFound();

  const all = await getAllArticles();

  return (
    <CategoryView
      category={category}
      articles={articles}
      page={n}
      categoryCounts={categoriesWithCounts(all)}
      totalArticles={all.length}
    />
  );
}
