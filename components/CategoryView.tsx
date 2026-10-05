import Link from 'next/link';
import LeadArticleCard from '@/components/LeadArticleCard';
import Card11 from '@/components/PostCards/Card11';
import JsonLd from '@/components/JsonLd';
import Pagination, { PER_PAGE } from '@/components/Pagination';
import TopicChips from '@/components/TopicChips';
import { toTPost } from '@/data/posts';
import { breadcrumbJsonLd } from '@/lib/seo';
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

  // Page one opens with the topic's newest article as a wide lead card.
  const lead = page === 1 && visible[0] ? toTPost(visible[0]) : null;
  const grid = lead ? visible.slice(1) : visible;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: category.name, path: base },
        ])}
      />

      <div className={`page-category-${category.slug}`}>
        {/* Default header for every topic: the same tinted panel as the product category pages. */}
        <div className="container pt-10 lg:pt-16">
          <header className="mb-10 rounded-3xl bg-primary-50 px-6 py-10 sm:px-10 lg:mb-14 lg:px-14 lg:py-14 dark:bg-primary-950/40">
            <div className="flex items-center gap-4">
              <span
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl dark:bg-neutral-900"
                aria-hidden="true"
              >
                {category.emoji}
              </span>
              <p className="text-sm font-semibold tracking-wider text-primary-700 uppercase dark:text-primary-300">
                Topic
              </p>
            </div>
            {/* Category title at 2.5rem (user request, 24 Sep 2026). */}
            <h1 className="mt-5 max-w-3xl text-[2.5rem] leading-tight font-bold tracking-tight text-neutral-900 dark:text-white">
              {category.name}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700 md:text-lg dark:text-neutral-300">
              {category.intro}
            </p>
            {category.subcategories?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`What ${category.name} covers`}>
                {category.subcategories.map((sub) => (
                  <li
                    key={sub}
                    className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <span>
                {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                {page > 1 ? ` · Page ${page}` : ''}
              </span>
              <Link
                href={`/products/category/${category.slug}/`}
                className="font-medium text-primary-700 hover:underline dark:text-primary-300"
              >
                Compare {category.name} products →
              </Link>
            </p>
          </header>
        </div>

        <div className="container pb-24 lg:pb-28">
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
                <>
                  {lead && <LeadArticleCard post={lead} className="mt-8 lg:mt-0" />}
                  <div
                    className={`grid gap-[15px] sm:grid-cols-2 xl:grid-cols-3 ${lead ? 'mt-[15px]' : 'mt-8 lg:mt-0'}`}
                  >
                    {grid.map((article) => (
                      <Card11 key={article.slug} post={toTPost(article)} />
                    ))}
                  </div>
                </>
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
