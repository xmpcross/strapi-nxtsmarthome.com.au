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

const NO_BANNER = new Set(['security-and-cameras', 'lighting']);

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
  // Categories whose title section shows no background banner, even though
  // one exists in public/heroes/post/ (user request, 24 Sep 2026).
  const banner = NO_BANNER.has(category.slug) ? null : hero;

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
          banner={banner}
          fullWidth
          introClassName="text-base/7"
          // Category title at 2.5rem (user request, 24 Sep 2026).
          titleClassName="text-[2.5rem] leading-tight"
        />

        <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
          {/* Phones and tablets keep the chip row; from lg the topics move to
              the left sidebar, the same layout as the product category page. */}
          <div className="lg:hidden">
            <TopicChips categories={categoryCounts} activeSlug={category.slug} total={totalArticles} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            <aside className="hidden lg:block lg:w-72 lg:shrink-0">
              <div className="sticky top-20 rounded-[8px] border border-neutral-200 bg-white p-5 shadow-2xs dark:border-neutral-700/80 dark:bg-neutral-800/80">
                <h2 className="mb-3 border-b border-neutral-100 pb-3 text-sm font-bold tracking-wider text-neutral-900 uppercase dark:border-neutral-700 dark:text-white">
                  Filter by topic
                </h2>
                <TopicChips
                  categories={categoryCounts}
                  activeSlug={category.slug}
                  total={totalArticles}
                  layout="sidebar"
                />
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {visible.length === 0 ? (
                <p className="mt-10 rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 lg:mt-0 dark:border-neutral-700">
                  Nothing published in this section yet — it&apos;s next on the list.
                </p>
              ) : (
                <div className="mt-8 grid gap-[15px] sm:grid-cols-2 lg:mt-0 xl:grid-cols-3">
                  {visible.map((article) => (
                    <Card11 key={article.slug} post={toTPost(article)} />
                  ))}
                </div>
              )}

              <Pagination base={base} page={page} total={articles.length} />
            </div>
          </div>

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
