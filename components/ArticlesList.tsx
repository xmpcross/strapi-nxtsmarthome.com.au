import ArchiveHeader from '@/components/ArchiveHeader';
import Card11 from '@/components/PostCards/Card11';
import TopicChips from '@/components/TopicChips';
import { toTPost } from '@/data/posts';
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
    <div className="page-articles">
      <ArchiveHeader
        eyebrow="Archive"
        title="All articles"
        // h1 at 2.5rem, matching the category pages (user request, 24 Sep 2026).
        titleClassName="text-[2.5rem] leading-tight"
        intro={
          <p>
            {total} {total === 1 ? 'article' : 'articles'} on smart home gear, setup and buying decisions — newest
            first.
          </p>
        }
        meta={totalPages > 1 ? `Page ${page} of ${totalPages}` : undefined}
      />

      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        {total === 0 ? (
          <p className="text-neutral-500">No articles published yet.</p>
        ) : (
          <>
            {/* Counts describe the whole library, not this page of it.
                Phones and tablets keep the chip row; from lg the topics move
                to a left sidebar, the same layout as the category pages
                (components/CategoryView.tsx). */}
            <div className="lg:hidden">
              <TopicChips categories={categories} total={total} />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              <aside className="hidden lg:block lg:w-72 lg:shrink-0">
                <div className="sticky top-20 rounded-[8px] border border-neutral-200 bg-white p-5 shadow-2xs dark:border-neutral-700/80 dark:bg-neutral-800/80">
                  <h2 className="mb-3 border-b border-neutral-100 pb-3 text-sm font-bold tracking-wider text-neutral-900 uppercase dark:border-neutral-700 dark:text-white">
                    Filter by topic
                  </h2>
                  <TopicChips categories={categories} total={total} layout="sidebar" />
                </div>
              </aside>

              <div className="min-w-0 flex-1">
                <div className="mt-8 grid gap-[15px] sm:grid-cols-2 lg:mt-0 xl:grid-cols-3">
                  {shown.map((article) => (
                    <Card11 key={article.slug} post={toTPost(article)} />
                  ))}
                </div>
                <Pagination base="/articles/" page={page} total={total} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
