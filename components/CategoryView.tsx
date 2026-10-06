import Link from 'next/link';
import LeadArticleCard from '@/components/LeadArticleCard';
import Card11 from '@/components/PostCards/Card11';
import JsonLd from '@/components/JsonLd';
import Pagination, { PER_PAGE } from '@/components/Pagination';
import TopicChips from '@/components/TopicChips';
import { toTPost } from '@/data/posts';
import { breadcrumbJsonLd } from '@/lib/seo';
import type { Article, ArticleType } from '@/lib/content';
import { isGuideCategory, type Category } from '@/lib/site';

/**
 * Hub sections, in reading order: decide-what-to-buy first, then set it up,
 * then background. Every article type has a section, so no post is dropped.
 */
const HUB_SECTIONS: { type: ArticleType; id: string; heading: string; blurb: string }[] = [
  { type: 'pillar', id: 'complete-guides', heading: 'Complete guides', blurb: 'Start-to-finish overviews of the topic.' },
  { type: 'buying-guide', id: 'buying-advice', heading: 'Buying advice', blurb: 'What to look for before you spend.' },
  { type: 'comparison', id: 'comparisons', heading: 'Comparisons', blurb: 'Head-to-head picks between brands and approaches.' },
  { type: 'roundup', id: 'roundups', heading: 'Roundups', blurb: 'Shortlists across a product type.' },
  { type: 'review', id: 'reviews', heading: 'Reviews', blurb: 'Single products, looked at closely.' },
  { type: 'how-to', id: 'how-to', heading: 'How-to & setup', blurb: 'Step-by-step installs, automations and fixes.' },
  { type: 'explainer', id: 'explained', heading: 'Explained', blurb: 'The background: standards, rules and how things work.' },
];

/**
 * The category listing, shared by /categories/[slug]/ and its /page/N/ routes.
 *
 * Setup Guides and Buying Guides are paginated grids with a topic chip bar.
 * Every other category is a single long-form hub page: its own posts only,
 * grouped by article type, with an on-page contents list. Hub categories have
 * no /page/N/ routes — those redirect to the hub.
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
  const guide = isGuideCategory(category.slug);
  const start = (page - 1) * PER_PAGE;
  const visible = guide ? articles.slice(start, start + PER_PAGE) : articles;

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

  const sections = HUB_SECTIONS.map((section) => ({
    ...section,
    posts: grid.filter((a) => a.type === section.type),
  })).filter((section) => section.posts.length > 0);

  const contents = [
    ...(lead ? [{ id: 'newest', label: 'Newest' }] : []),
    ...sections.map((section) => ({ id: section.id, label: section.heading, count: section.posts.length })),
    ...(category.overview ? [{ id: 'overview', label: category.overview.heading }] : []),
    { id: 'products', label: `${category.name} products` },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: category.name, path: base },
        ])}
      />

      <div className={`page-category-${category.slug}`}>
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

        {guide ? (
          <div className="container py-12 lg:py-16">
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
        ) : (
          /* HUB — this category's posts only, grouped by type */
          <div className="container py-12 lg:py-16">
            <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
              <nav aria-label="On this page" className="mb-10 lg:mb-0">
                <div className="lg:sticky lg:top-24">
                  <h2 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    On this page
                  </h2>
                  <ol className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-l lg:border-neutral-200 dark:lg:border-neutral-800">
                    {contents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="flex items-center justify-between gap-3 rounded-full border border-neutral-200 px-3 py-1 text-sm font-medium text-neutral-600 hover:border-primary-500 hover:text-primary-600 lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:px-4 lg:py-1.5 lg:hover:border-primary-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-primary-400"
                        >
                          <span>{item.label}</span>
                          {'count' in item ? (
                            <span className="text-xs text-neutral-400 dark:text-neutral-500">{item.count}</span>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>

              <div className="min-w-0 space-y-16">
                {articles.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700">
                    Nothing published in {category.name} yet — it&apos;s next on the list.
                  </p>
                ) : null}

                {lead ? (
                  <section id="newest" className="scroll-mt-24 space-y-5">
                    <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">Newest</h2>
                    <LeadArticleCard post={lead} className="w-full" />
                  </section>
                ) : null}

                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
                    <div className="border-b border-neutral-200 pb-3 dark:border-neutral-800">
                      <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                        {section.heading}
                        <span className="ml-2 align-middle text-sm font-semibold text-neutral-400 dark:text-neutral-500">
                          {section.posts.length}
                        </span>
                      </h2>
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{section.blurb}</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {section.posts.map((article) => (
                        <Card11 key={article.slug} post={toTPost(article)} />
                      ))}
                    </div>
                  </section>
                ))}

                {category.overview ? (
                  <section
                    id="overview"
                    className="scroll-mt-24 rounded-3xl border border-neutral-200/80 bg-neutral-50/80 p-8 sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/60"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      {category.overview.heading}
                    </h2>
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-300">
                      {category.overview.paragraphs.map((text) => (
                        <p key={text.slice(0, 40)}>{text}</p>
                      ))}
                    </div>
                  </section>
                ) : null}

                <section
                  id="products"
                  className="scroll-mt-24 flex flex-col items-start gap-4 rounded-3xl border border-primary-500/20 bg-primary-50/60 p-8 sm:flex-row sm:items-center sm:justify-between dark:border-primary-500/30 dark:bg-primary-950/30"
                >
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{category.name} products</h2>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                      The devices these guides discuss, with where to buy them in Australia.
                    </p>
                  </div>
                  <Link
                    href={`/products/category/${category.slug}/`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
                  >
                    Browse products
                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                  </Link>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
