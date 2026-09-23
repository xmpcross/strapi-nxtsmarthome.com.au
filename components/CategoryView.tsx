import ArchiveHeader from '@/components/ArchiveHeader';
import Card11 from '@/components/PostCards/Card11';
import JsonLd from '@/components/JsonLd';
import Pagination, { PER_PAGE } from '@/components/Pagination';
import TopicChips from '@/components/TopicChips';
import { categoryColor } from '@/data/categories';
import { toTPost } from '@/data/posts';
import { breadcrumbJsonLd } from '@/lib/seo';
import { categoryHeroFor, coverFor } from '@/lib/content';
import type { Article } from '@/lib/content';
import type { Category } from '@/lib/site';

/**
 * The category listing, shared by /categories/[slug]/ and its /page/N/ routes so
 * the two cannot drift. Page 1 is the base URL; later pages are real static
 * files, which is what lets a crawler reach articles beyond the first six.
 */
export default function CategoryView({
  category,
  articles,
  page,
  categoryCounts,
  totalArticles,
}: {
  category: Category;
  articles: Article[];
  page: number;
  categoryCounts: (Category & { count: number })[];
  totalArticles: number;
}) {
  const base = `/categories/${category.slug}/`;
  const start = (page - 1) * PER_PAGE;
  const visible = articles.slice(start, start + PER_PAGE);

  const hero = categoryHeroFor(category.slug, 'post');
  const thumb = articles[0] ? coverFor(articles[0]) : hero ?? undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: category.name, path: base },
        ])}
      />

      <div className={`page-category-${category.slug}`}>
        <ArchiveHeader
          eyebrow="Topic"
          eyebrowColor={categoryColor(category.key)}
          title={category.name}
          intro={<p>{category.intro}</p>}
          meta={`${articles.length} ${articles.length === 1 ? 'article' : 'articles'}${page > 1 ? ` · Page ${page}` : ''}`}
          image={thumb}
          banner={hero}
        />

        <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
          <TopicChips categories={categoryCounts} activeSlug={category.slug} total={totalArticles} />

          {visible.length === 0 ? (
            <p className="mt-10 rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700">
              Nothing published in this section yet — it&apos;s next on the list.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3">
              {visible.map((article) => (
                <Card11 key={article.slug} post={toTPost(article)} />
              ))}
            </div>
          )}

          <Pagination base={base} page={page} total={articles.length} />

          {/* Long-form orientation, page 1 only (it would be duplicate content on /page/2/). */}
          {category.overview && page === 1 ? (
            <section className="mx-auto mt-20 max-w-3xl rounded-3xl bg-neutral-50 p-8 lg:p-10 dark:bg-neutral-800/50">
              <h2 className="text-xl font-semibold text-neutral-900 lg:text-2xl dark:text-white">
                {category.overview.heading}
              </h2>
              <div className="mt-4 space-y-3 leading-relaxed text-neutral-600 dark:text-neutral-300">
                {category.overview.paragraphs.map((text) => (
                  <p key={text.slice(0, 40)}>{text}</p>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
