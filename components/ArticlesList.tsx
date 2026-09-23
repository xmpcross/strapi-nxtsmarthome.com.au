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
            {/* Counts describe the whole library, not this page of it. */}
            <TopicChips categories={categories} total={total} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3">
              {shown.map((article) => (
                <Card11 key={article.slug} post={toTPost(article)} />
              ))}
            </div>
            <Pagination base="/articles/" page={page} total={total} />
          </>
        )}
      </div>
    </div>
  );
}
