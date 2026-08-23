import ArticleCard from '@/components/ArticleCard';
import CategorySidebar from '@/components/CategorySidebar';
import Pagination, { PER_PAGE, pageCount } from '@/components/Pagination';
import { categoriesWithCounts, type Article } from '@/lib/content';

/**
 * The /articles/ list, one page of it.
 *
 * Shared by /articles/ and /articles/page/[page]/ so the two cannot drift —
 * they are the same screen, and the only difference is which slice is shown.
 */

/* PER_PAGE and pageCount come from Pagination, which the category listings
   already use. Redefining them here would let the two lists drift apart. */

export default function ArticlesList({
  articles,
  page,
}: {
  articles: Article[];
  page: number;
}) {
  const categories = categoriesWithCounts(articles);
  const total = articles.length;
  const totalPages = pageCount(total);
  const start = (page - 1) * PER_PAGE;
  const shown = articles.slice(start, start + PER_PAGE);

  return (
    <div className="mx-auto max-w-site px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          All articles
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          {total} {total === 1 ? 'article' : 'articles'} on smart home gear, setup and buying
          decisions — newest first.
          {totalPages > 1 && (
            <span className="text-slate-500 dark:text-slate-400">
              {' '}Page {page} of {totalPages}.
            </span>
          )}
        </p>
      </header>

      {total === 0 ? (
        <p className="text-slate-500">No articles published yet.</p>
      ) : (
        // Sidebar sits left on desktop and collapses above the grid on mobile.
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          {/* Counts describe the whole library, not this page of it. */}
          <CategorySidebar categories={categories} total={total} />

          <div>
            <div className="articles-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            <Pagination base="/articles/" page={page} total={total} />
          </div>
        </div>
      )}
    </div>
  );
}
