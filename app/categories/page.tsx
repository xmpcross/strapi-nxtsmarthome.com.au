import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import ProductSlider from '@/components/ProductSlider';
import { articleHref, categoriesWithCounts, coverFor, formatDate, getAllArticles, getFeaturedArticles, typeLabels } from '@/lib/content';
import { getAllTopProducts } from '@/lib/products';
import { breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

const DESCRIPTION =
  'Browse smart home guides and reviews by topic — security, lighting, energy, climate, hubs and platforms, robot vacuums, setup guides and buying guides.';

export const metadata: Metadata = {
  title: 'Topics & Categories',
  description: DESCRIPTION,
  alternates: { canonical: '/categories/' },
};

/** Task-based sections. Everything else is a device category. */
const GUIDE_KEYS = ['setup-guides', 'buying-guides'];

export default async function CategoriesIndex() {
  const articles = await getAllArticles();
  const cats = categoriesWithCounts(articles);

  /*
    One lead article plus three behind it. getFeaturedArticles tops up from the
    newest when fewer are flagged, so this never renders a short row.
  */
  const featured = await getFeaturedArticles(4);
  const [lead, ...alsoFeatured] = featured;

  /*
    Article cards for the categories with enough published work to fill a row.
    A "latest from" strip under a category holding one article looks broken, so
    the threshold decides which categories get one rather than showing all nine.
  */
  const SPOTLIGHT_MIN = 3;
  const spotlights = cats
    .filter((c) => c.count >= SPOTLIGHT_MIN)
    .slice(0, 3)
    .map((c) => ({
      category: c,
      posts: articles.filter((a) => a.categoryMeta?.slug === c.slug).slice(0, 4),
    }));

  /*
    Newest ten products. Sorted on updatedAt rather than catalogue order, so
    "latest" means what it says as the importer adds stock.
  */
  const latestProducts = [...getAllTopProducts()]
    .sort((a, b) => String(b.updatedAt ?? '').localeCompare(String(a.updatedAt ?? '')))
    .slice(0, 10);

  /*
    Newest few per category, so this index links to actual articles rather than
    only to nine more listing pages. An index that links exclusively to other
    indexes gives a crawler nowhere to go and a reader nothing to read.
  */
  const latestByCategory = new Map<string, typeof articles>();
  for (const cat of cats) {
    latestByCategory.set(
      cat.slug,
      articles.filter((a) => a.categoryMeta?.slug === cat.slug).slice(0, 3),
    );
  }

  const groups = [
    {
      id: 'devices',
      eyebrow: 'By device',
      heading: 'Device categories',
      blurb:
        'What you are buying or setting up. Each one covers what to look for, what is genuinely different about buying it in Australia, and what to avoid.',
      cats: cats.filter((c) => !GUIDE_KEYS.includes(c.key)),
    },
    {
      id: 'guides',
      eyebrow: 'By task',
      heading: 'Guides and advice',
      blurb:
        'What you are trying to do. Setup guides walk through installation and troubleshooting; buying guides work through the decision before you spend anything.',
      cats: cats.filter((c) => GUIDE_KEYS.includes(c.key)),
    },
  ].filter((g) => g.cats.length);

  return (
    <div className="mx-auto max-w-[1366px] px-4 py-8 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Topics & Categories', path: '/categories/' },
        ])}
      />
      {/* CollectionPage + ItemList: this page is a list of category pages, and
          declaring that is the difference between a crawler inferring the
          structure and being told it. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Topics & Categories',
          url: `${site.url}/categories/`,
          description: DESCRIPTION,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: cats.length,
            itemListElement: cats.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.name,
              url: `${site.url}/categories/${c.slug}/`,
            })),
          },
        }}
      />

      {/* Clean 2-Column Hero Section with Transparent Background (No background color box) */}
      <div className="relative mb-12 text-slate-900 dark:text-white">
        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Side: Title, Badges & Intro */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-emerald-600/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                Australian Smart Home Directory
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 backdrop-blur-md">
                <span>🇦🇺</span>
                <span>240V &amp; AS/NZS Standards</span>
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-tight text-slate-900 dark:text-white">
              Explore Smart Home <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-brand-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-brand-300">
                Topics &amp; Buying Guides
              </span>
            </h1>

            <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed max-w-2xl font-normal dark:text-slate-300">
              Everything we publish, organised by what you&apos;re trying to do —{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">{articles.length} independent guides</strong> across{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">{cats.length} curated topics</strong>, written specifically for Australian homes, local retailers, and electrical rules.
            </p>

            {/* Stat Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200/80 pt-6 dark:border-slate-800">
              <div className="flex items-center gap-2 rounded-[8px] border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{articles.length}</span> Published Guides
              </div>
              <div className="flex items-center gap-2 rounded-[8px] border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="text-brand-600 dark:text-brand-400 font-bold text-sm">{cats.length}</span> Topic Hubs
              </div>
              <div className="flex items-center gap-2 rounded-[8px] border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">100%</span> Independent Testing
              </div>
            </div>
          </div>

          {/* Right Side: Real Transparent Product Showcase Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full overflow-hidden rounded-[8px] border border-slate-200/80 bg-gradient-to-b from-white/90 to-emerald-50/60 p-6 dark:border-slate-700/80 dark:bg-gradient-to-b dark:from-slate-800/80 dark:to-slate-900/90">
              <div className="absolute right-3 top-3 rounded-[8px] bg-emerald-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                AU Stocks Tested
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                {/* Product 1: Camera */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/reolink-argus-3-ultra-4k-solar-camera.png"
                      alt="Reolink 4K Security Camera"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Reolink 4K Solar</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Security &amp; Cameras</span>
                </div>

                {/* Product 2: Smart Lock */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/aqara-smart-lock-u100-apple-homekey.png"
                      alt="Aqara Smart Lock U100"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Aqara HomeKey U100</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Smart Locks</span>
                </div>

                {/* Product 3: Smart Hub */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/google-nest-hub-2nd-gen-smart-display.png"
                      alt="Google Nest Hub"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Google Nest Hub</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Hubs &amp; Displays</span>
                </div>

                {/* Product 4: Robot Vacuum */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/dreame-l10s-ultra-robot-vacuum-and-mop.png"
                      alt="Dreame Robot Vacuum"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Dreame L10s Ultra</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Robot Vacuums</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Split Orientation Cards */}
        <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 lg:gap-6 border-t border-slate-200/80 pt-6 dark:border-slate-800">
          <div className="group rounded-[8px] border border-slate-200/80 bg-white/80 p-5 transition-all duration-300 hover:border-emerald-500/50 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-slate-900/80">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-emerald-500/15 text-lg text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                🔌
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors dark:text-white dark:group-hover:text-emerald-300">
                  Device Categories
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">
                  Hardware verticals — Security, Lighting, Hubs, Vacuums &amp; Climate.
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-[8px] border border-slate-200/80 bg-white/80 p-5 transition-all duration-300 hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-slate-900/80">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-brand-500/15 text-lg text-brand-700 dark:bg-brand-500/20 dark:text-brand-400">
                🛒
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors dark:text-white dark:group-hover:text-brand-300">
                  Guides &amp; Advice
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">
                  Task-based guides — installation, troubleshooting &amp; buying advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redesigned "Start with these" Featured Section */}
      {lead ? (
        <section className="mb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-400/15 dark:text-brand-300">
                <span aria-hidden="true">⭐</span> Editor&apos;s Picks
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                Start with these
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
              Essential guides, reviews, and foundational advice handpicked for building your Australian smart home.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Lead Featured Article Showcase */}
            <article className="group relative overflow-hidden rounded-[8px] border border-slate-200 bg-white p-2 shadow-md transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl dark:border-card-edge dark:bg-card dark:hover:border-brand-500/40">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                {/* Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[8px] bg-slate-100 lg:col-span-7 dark:bg-slate-800">
                  <img
                    src={coverFor(lead)}
                    alt={lead.title}
                    width={1000}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                  {lead.categoryMeta && (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md dark:bg-black/80">
                      <span aria-hidden="true">{lead.categoryMeta.emoji}</span>
                      <span>{lead.categoryMeta.name}</span>
                    </span>
                  )}
                </div>

                {/* Content Container */}
                <div className="flex flex-col justify-center p-4 lg:col-span-5 lg:pr-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-800 dark:bg-brand-950/80 dark:text-brand-300">
                      {typeLabels[lead.type] ?? lead.type}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {lead.readingMinutes} min read
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold leading-tight text-slate-900 sm:text-2xl lg:text-3xl dark:text-white">
                    <Link
                      href={articleHref(lead)}
                      className="transition-colors hover:text-brand-700 dark:hover:text-brand-400"
                    >
                      {lead.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-300">
                    {lead.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(lead.updated ?? lead.date)}
                    </span>
                    <Link
                      href={articleHref(lead)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-brand-700 hover:shadow-md dark:bg-brand-600 dark:hover:bg-brand-500"
                    >
                      Read Article
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Sub-featured Grid (3 Secondary Cards) */}
            {alsoFeatured.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {alsoFeatured.map((article) => (
                  <article
                    key={article.slug}
                    className="group relative flex flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-lg dark:border-card-edge dark:bg-card dark:hover:border-brand-500/30"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                      <img
                        src={coverFor(article)}
                        alt={article.title}
                        width={600}
                        height={337}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {article.categoryMeta && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm dark:bg-black/80">
                          <span>{article.categoryMeta.emoji}</span>
                          <span>{article.categoryMeta.name}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col pt-4">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {typeLabels[article.type] ?? article.type}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {article.readingMinutes} min read
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 line-clamp-2 dark:text-white">
                        <Link
                          href={articleHref(article)}
                          className="after:absolute after:inset-0 transition-colors group-hover:text-brand-700 dark:group-hover:text-brand-400"
                        >
                          {article.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-300">
                        {article.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/80">
                        <span className="text-[11px] text-slate-400">
                          {formatDate(article.updated ?? article.date)}
                        </span>
                        <span className="text-xs font-semibold text-brand-600 transition-transform group-hover:translate-x-1 dark:text-brand-400">
                          Read →
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {groups.map((group) => (
        <div key={group.id}>
          {/* Slider sits between the two groups, as asked — device categories
              above it, guides below. */}
          {group.id === 'guides' ? (
            <ProductSlider
              products={latestProducts}
              eyebrow="Latest"
              heading="Newest products"
              intro="The ten most recently added devices, each stocked by an Australian retailer."
            />
          ) : null}
        <section className="mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            {group.eyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {group.heading}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {group.blurb}
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.cats.map((category) => {
              const latest = latestByCategory.get(category.slug) ?? [];
              return (
                <div
                  key={category.slug}
                  className="flex flex-col rounded-[8px] border border-slate-200 p-6 transition hover:border-emerald-500 dark:border-slate-700 dark:hover:border-emerald-500"
                >
                  <Link href={`/categories/${category.slug}/`} className="group">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                      {category.name}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {category.intro}
                  </p>

                  {latest.length ? (
                    <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 dark:border-slate-700/70">
                      {latest.map((article) => (
                        <li key={article.slug}>
                          <Link
                            href={articleHref(article)}
                            className="text-sm text-slate-700 hover:text-emerald-700 hover:underline dark:text-slate-300 dark:hover:text-emerald-400"
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {category.count} {category.count === 1 ? 'article' : 'articles'}
                    </span>
                    <Link
                      href={`/categories/${category.slug}/`}
                      className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                    >
                      View all →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </div>
      ))}
      {/* Latest from the categories deep enough to fill a row. */}
      {spotlights.map(({ category, posts }) => (
        <section key={`spot-${category.slug}`} className="mb-14">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Latest in {category.name}
            </h2>
            <Link
              href={`/categories/${category.slug}/`}
              className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
            >
              All {category.count} articles →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ))}

    </div>
  );
}
