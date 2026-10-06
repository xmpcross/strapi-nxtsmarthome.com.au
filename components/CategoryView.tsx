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

  // Newest publish/update date across the topic, for the hero stat.
  const newest = articles.reduce<string | null>((max, a) => {
    const d = a.updated || a.date;
    return d && (!max || d > max) ? d : max;
  }, null);
  const lastUpdated = newest
    ? new Date(newest).toLocaleDateString('en-AU', { month: 'short', year: 'numeric', timeZone: 'Australia/Perth' })
    : null;

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
        {isGuideCategory ? (
          <>
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
          </>
        ) : (
          /* DEFAULT HERO — unboxed two-column, matches /all-topics/ */
          <div className="container pt-8 lg:pt-12">
            <header className="grid items-center gap-10 lg:grid-cols-2">
              <div className="space-y-5">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  <Link href="/" className="hover:text-neutral-900 dark:hover:text-white">Home</Link>
                  <span aria-hidden="true">/</span>
                  <Link href="/all-topics/" className="hover:text-neutral-900 dark:hover:text-white">All Topics</Link>
                  <span aria-hidden="true">/</span>
                  <span className="text-neutral-900 dark:text-white">{category.name}</span>
                </nav>

                <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-50 px-3.5 py-1 text-xs font-bold text-primary-700 dark:border-primary-500/40 dark:bg-primary-950/60 dark:text-primary-300">
                  <span className="size-2 rounded-full bg-primary-500" />
                  {articles.length} {articles.length === 1 ? 'Guide' : 'Guides'}
                  {page > 1 ? ` · Page ${page}` : ''}
                </div>

                <h1 className="text-4xl sm:text-[3rem] font-black tracking-tight leading-[1.1] text-neutral-900 dark:text-white">
                  {category.name}
                </h1>

                <p className="max-w-2xl text-base sm:text-lg font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {category.intro}
                </p>

                {category.subcategories?.length ? (
                  <ul className="flex flex-wrap gap-2" aria-label={`What ${category.name} covers`}>
                    {category.subcategories.map((sub) => (
                      <li
                        key={sub}
                        className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-700 dark:border-neutral-700 dark:text-neutral-200"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href={`/products/category/${category.slug}/`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
                  >
                    Browse {category.name} products
                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                  </Link>
                  <Link
                    href="/all-topics/"
                    className="inline-flex items-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-bold text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-white dark:hover:text-white"
                  >
                    All topics
                  </Link>
                </div>
              </div>

              <div className="relative hidden overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-primary-50/60 via-white to-purple-50/40 lg:block dark:border-neutral-800 dark:from-neutral-900/80 dark:via-neutral-900 dark:to-neutral-950">
                <div className="pointer-events-none absolute -right-16 -top-16 size-60 rounded-full bg-primary-500/15 blur-3xl dark:bg-primary-500/25" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 size-60 rounded-full bg-purple-500/15 blur-3xl dark:bg-purple-500/25" />
                <div className="relative flex aspect-[4/3] items-center justify-center">
                  {category.icon3d ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={category.icon3d} alt="" width={240} height={240} className="size-60 object-contain drop-shadow-xl" />
                  ) : (
                    <span className="text-8xl" aria-hidden="true">{category.emoji || '⚡'}</span>
                  )}
                </div>
                <dl className="relative grid grid-cols-2 border-t border-neutral-200/80 dark:border-neutral-800">
                  <div className="p-5">
                    <dt className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Guides</dt>
                    <dd className="text-2xl font-black text-primary-600 dark:text-primary-400">{articles.length}</dd>
                  </div>
                  <div className="border-l border-neutral-200/80 p-5 dark:border-neutral-800">
                    <dt className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Last updated</dt>
                    <dd className="text-2xl font-black text-primary-600 dark:text-primary-400">{lastUpdated ?? '—'}</dd>
                  </div>
                </dl>
              </div>
            </header>
          </div>
        )}

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
            /* DEFAULT LAYOUT — topic chip bar, full-width grid */
            <div className="w-full space-y-10">
              <div className="flex flex-col gap-3 border-y border-neutral-200 py-4 sm:flex-row sm:items-center dark:border-neutral-800">
                <h2 className="shrink-0 text-xs font-extrabold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  Browse topics
                </h2>
                <TopicChips categories={categoryCounts} activeSlug={category.slug} total={totalArticles} />
              </div>

              {visible.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700">
                  Nothing published in this section yet — it&apos;s next on the list.
                </p>
              ) : (
                <>
                  {lead && <LeadArticleCard post={lead} className="w-full" />}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {grid.map((article) => (
                      <Card11 key={article.slug} post={toTPost(article)} />
                    ))}
                  </div>
                </>
              )}

              <Pagination base={base} page={page} total={articles.length} />
            </div>
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
