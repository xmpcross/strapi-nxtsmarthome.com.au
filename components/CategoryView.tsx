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

  // Check if this category hides the sidebar filter (Setup Guides & Buying Guides)
  const isGuideCategory = category.slug === 'setup-guides' || category.slug === 'buying-guides';

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
        {/* Creative & Minimal Category Hero Header */}
        <div className="container pt-8 lg:pt-12">
          <header className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-primary-50/40 p-6 sm:p-10 lg:p-12 dark:border-neutral-800 dark:from-neutral-900 dark:via-neutral-900/90 dark:to-primary-950/20 shadow-xs">
            {/* Ambient Background Blur Orbs */}
            <div className="pointer-events-none absolute -right-16 -top-16 size-80 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-500/15" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 size-80 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />

            <div className="relative z-10 max-w-4xl space-y-4">
              {/* Category Badge & Metadata */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-xs dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700"
                  aria-hidden="true"
                >
                  {category.emoji || '⚡'}
                </span>
                <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white shadow-xs">
                  {category.name}
                </span>
                <span className="rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-semibold text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                  {page > 1 ? ` · Page ${page}` : ''}
                </span>
              </div>

              {/* Display Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
                {category.name}
              </h1>

              {/* Intro Text */}
              <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                {category.intro}
              </p>

              {/* Subcategory Pills */}
              {category.subcategories?.length ? (
                <div className="pt-2 flex flex-wrap items-center gap-2" aria-label={`What ${category.name} covers`}>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                    Topics Covered:
                  </span>
                  {category.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="rounded-xl border border-neutral-200/80 bg-white px-3 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Quick Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
                <Link
                  href={`/products/category/${category.slug}/`}
                  className="inline-flex items-center gap-1.5 text-primary-600 hover:underline dark:text-primary-400"
                >
                  <span>Compare {category.name} Products</span>
                  <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                </Link>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <Link
                  href="/all-topics/"
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  All Topics Directory →
                </Link>
              </div>
            </div>
          </header>
        </div>

        <div className="container py-12 lg:py-16">
          {isGuideCategory ? (
            /* CLEAN FULL-WIDTH LAYOUT (No Filter Sidebar for Setup & Buying Guides) */
            <div className="w-full space-y-10">
              {visible.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center text-neutral-500 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                  No published articles found in {category.name} yet.
                </p>
              ) : (
                <>
                  {lead && <LeadArticleCard post={lead} className="w-full" />}
                  <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${lead ? 'mt-6' : ''}`}>
                    {grid.map((article) => (
                      <Card11 key={article.slug} post={toTPost(article)} />
                    ))}
                  </div>
                </>
              )}

              <Pagination base={base} page={page} total={articles.length} />
            </div>
          ) : (
            /* DEFAULT LAYOUT WITH SIDEBAR FILTER (For Standard Product Categories) */
            <>
              <div className="lg:hidden mb-6">
                <TopicChips categories={categoryCounts} activeSlug={category.slug} total={totalArticles} />
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
                <aside className="hidden lg:block lg:w-72 lg:shrink-0">
                  <div className="sticky top-20 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    <h2 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold tracking-wider text-neutral-900 uppercase dark:border-neutral-800 dark:text-white">
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

                <div className="min-w-0 flex-1 space-y-8">
                  {visible.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700">
                      Nothing published in this section yet — it&apos;s next on the list.
                    </p>
                  ) : (
                    <>
                      {lead && <LeadArticleCard post={lead} />}
                      <div className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 ${lead ? 'mt-6' : ''}`}>
                        {grid.map((article) => (
                          <Card11 key={article.slug} post={toTPost(article)} />
                        ))}
                      </div>
                    </>
                  )}

                  <Pagination base={base} page={page} total={articles.length} />
                </div>
              </div>
            </>
          )}

          {/* Long-form SEO Overview, Page 1 Only */}
          {category.overview && page === 1 ? (
            <section className="mx-auto mt-16 max-w-4xl rounded-3xl border border-neutral-200/80 bg-neutral-50/80 p-8 sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/60 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {category.overview.heading}
              </h2>
              <div className="mt-4 space-y-3 leading-relaxed text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
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
