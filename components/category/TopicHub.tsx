import Link from 'next/link';
import GuideIndex, { type GuideRow } from '@/components/category/GuideIndex';
import JsonLd from '@/components/JsonLd';
import { categoryEssentials, crossTopicMatch } from '@/lib/category-essentials';
import { articleHref, squareCoverFor, type Article, type ArticleType } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { site, type Category } from '@/lib/site';
import { FOCUS, shortDate, TYPE_ORDER, typeLabel } from '@/components/category/shared';

const TOP_UP_TYPES: ArticleType[] = ['pillar', 'buying-guide', 'comparison', 'roundup'];
const ESSENTIALS = 4;
const NEW_COUNT = 5;


const typeRank = (type: ArticleType) => {
  const i = TYPE_ORDER.findIndex((t) => t.type === type);
  return i === -1 ? TYPE_ORDER.length : i;
};

/**
 * A topic category page (every category except Setup Guides and Buying Guides):
 * the few guides to start with, what is new, then every guide in a filterable
 * list. Built so a reader finds the right guide in one viewport.
 */
export default function TopicHub({
  category,
  articles,
  allArticles,
}: {
  category: Category;
  articles: Article[];
  allArticles: Article[];
}) {
  const base = `/categories/${category.slug}/`;
  const bySlug = new Map(articles.map((a) => [a.slug, a]));

  // Editorial picks first, skipping any that are not published; then top up
  // from the topic's buying guides and comparisons, newest first.
  const essentials: { article: Article; why: string }[] = [];
  for (const pick of categoryEssentials[category.slug] ?? []) {
    const article = bySlug.get(pick.slug);
    if (article && essentials.length < ESSENTIALS) essentials.push({ article, why: pick.why });
  }
  for (const article of articles) {
    if (essentials.length >= ESSENTIALS) break;
    if (TOP_UP_TYPES.includes(article.type) && !essentials.some((e) => e.article.slug === article.slug)) {
      essentials.push({ article, why: article.description });
    }
  }
  const essentialSlugs = new Set(essentials.map((e) => e.article.slug));

  const latest = [...articles]
    .filter((a) => !essentialSlugs.has(a.slug))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, NEW_COUNT);

  const rows: GuideRow[] = [...articles]
    .sort((a, b) => typeRank(a.type) - typeRank(b.type) || (b.date ?? '').localeCompare(a.date ?? ''))
    .map((a) => ({
      href: articleHref(a),
      title: a.title,
      type: a.type,
      typeLabel: typeLabel(a.type),
      minutes: a.readingMinutes,
    }));

  const productsHref = `/products/category/${category.slug}/`;
  const count = articles.length;

  // An empty topic points at guides published under other topics that cover it.
  const match = crossTopicMatch[category.slug];
  const elsewhere = count === 0 && match ? allArticles.filter((a) => match.test(a.title)).slice(0, 4) : [];

  // On small screens the intro is cut to its first sentence so the guides reach
  // the first viewport; wider screens show it whole.
  const [introLead, ...introRest] = category.intro.split(/(?<=[.!?])\s+/);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: category.name, path: base },
        ])}
      />
      {count > 0 ? (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: category.name,
            url: `${site.url}${base}`,
            inLanguage: site.language,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: rows.map((row, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${site.url}${row.href}`,
                name: row.title,
              })),
            },
          }}
        />
      ) : null}

      <div className={`page-category-${category.slug}`}>
        <header className="container pt-8 lg:pt-12">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400"
          >
            <Link href="/" className={`hover:text-neutral-900 dark:hover:text-white ${FOCUS}`}>
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/all-topics/" className={`hover:text-neutral-900 dark:hover:text-white ${FOCUS}`}>
              All Topics
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-900 dark:text-white" aria-current="page">
              {category.name}
            </span>
          </nav>

          <div className="mt-6 flex items-center gap-4 sm:gap-5">
            {category.icon3d ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={category.icon3d}
                alt=""
                width={72}
                height={72}
                className="size-14 shrink-0 object-contain sm:size-[4.5rem]"
              />
            ) : null}
            <h1 className="text-4xl font-black tracking-tight text-balance text-neutral-900 sm:text-5xl dark:text-white">
              {category.name}
            </h1>
          </div>

          {count > 0 ? (
            <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-pretty text-neutral-700 sm:text-lg dark:text-neutral-300">
              {introLead}
              {introRest.length ? <span className="hidden sm:inline"> {introRest.join(' ')}</span> : null}
            </p>
          ) : null}

          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            {count > 0 ? (
              <span>
                <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">{count}</span>{' '}
                {count === 1 ? 'guide' : 'guides'}
              </span>
            ) : null}
            <Link
              href={productsHref}
              className={`font-semibold text-primary-600 underline underline-offset-4 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 ${FOCUS}`}
            >
              Browse {category.name} products
            </Link>
          </p>
        </header>

        <div className="container pt-10 pb-20 lg:pt-12 lg:pb-28">
          {count === 0 ? (
            <section aria-labelledby="empty-heading" className="max-w-3xl border-y border-neutral-200 py-8 dark:border-neutral-800">
              <h2 id="empty-heading" className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                No {category.name} guides yet
              </h2>
              {elsewhere.length ? (
                <>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">These guides from other topics cover it:</p>
                  <ul className="mt-4 border-t border-neutral-200 dark:border-neutral-800">
                    {elsewhere.map((article) => (
                      <li key={article.slug} className="border-b border-neutral-200 dark:border-neutral-800">
                        <Link href={articleHref(article)} className={`group block py-4 ${FOCUS}`}>
                          <span className="block font-semibold text-neutral-900 group-hover:underline group-hover:underline-offset-4 dark:text-white">
                            {article.title}
                          </span>
                          <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">
                            {article.categoryMeta?.name ?? ''} · {typeLabel(article.type)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                Or{' '}
                <Link href="/all-topics/" className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}>
                  browse every topic
                </Link>{' '}
                and{' '}
                <Link href="/search/" className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}>
                  search the guides
                </Link>
                .
              </p>
            </section>
          ) : (
            <>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
                <section aria-labelledby="start-heading">
                  <h2
                    id="start-heading"
                    className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
                  >
                    Start with these
                  </h2>
                  <ol className="mt-4 border-t border-neutral-200 dark:border-neutral-800">
                    {essentials.map(({ article, why }, index) => (
                      <li key={article.slug} className="border-b border-neutral-200 dark:border-neutral-800">
                        <Link
                          href={articleHref(article)}
                          className={`group grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-4 py-4 sm:grid-cols-[2.75rem_minmax(0,1fr)_7rem] sm:gap-x-6 ${FOCUS}`}
                        >
                          <span
                            aria-hidden="true"
                            className="text-3xl leading-none font-black tabular-nums text-primary-600 sm:text-4xl dark:text-primary-400"
                          >
                            {index + 1}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-lg leading-snug font-bold text-neutral-900 group-hover:text-primary-600 group-hover:underline group-hover:underline-offset-4 dark:text-white dark:group-hover:text-primary-400">
                              {article.title}
                            </span>
                            <span className="mt-1.5 line-clamp-2 block text-neutral-700 dark:text-neutral-300">{why}</span>
                            <span className="mt-2 block text-sm text-neutral-600 dark:text-neutral-400">
                              {typeLabel(article.type)} ·{' '}
                              <span className="tabular-nums">{article.readingMinutes}</span> min read
                            </span>
                          </span>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={squareCoverFor(article)}
                            alt=""
                            width={112}
                            height={84}
                            loading="lazy"
                            className="hidden aspect-[4/3] w-28 rounded-lg object-cover sm:block"
                          />
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>

                {latest.length > 0 ? (
                  <section aria-labelledby="new-heading">
                    <h2 id="new-heading" className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      New
                    </h2>
                    <ul className="mt-4 border-t border-neutral-200 dark:border-neutral-800">
                      {latest.map((article) => (
                        <li key={article.slug} className="border-b border-neutral-200 dark:border-neutral-800">
                          <Link href={articleHref(article)} className={`group block py-4 ${FOCUS}`}>
                            <time
                              dateTime={article.date}
                              className="text-sm font-semibold tabular-nums text-primary-600 dark:text-primary-400"
                            >
                              {shortDate(article.date)}
                            </time>
                            <span className="mt-1 block leading-snug font-semibold text-neutral-900 group-hover:underline group-hover:underline-offset-4 dark:text-white">
                              {article.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>

              <section aria-labelledby="all-heading" className="mt-20 lg:mt-24">
                <h2 id="all-heading" className="mb-5 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Every {category.name} guide
                </h2>
                <GuideIndex rows={rows} types={TYPE_ORDER} />
              </section>
            </>
          )}

          {category.overview ? (
            <section aria-labelledby="overview-heading" className="mt-20 max-w-[68ch] lg:mt-24">
              <h2
                id="overview-heading"
                className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
              >
                {category.overview.heading}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
                {category.overview.paragraphs.map((text) => (
                  <p key={text.slice(0, 40)}>{text}</p>
                ))}
              </div>
            </section>
          ) : null}

          <section
            aria-labelledby="products-heading"
            className="mt-20 flex flex-col items-start gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-24 dark:border-neutral-800"
          >
            <div>
              <h2 id="products-heading" className="text-xl font-bold text-neutral-900 dark:text-white">
                {category.name} products
              </h2>
              <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                {count > 0
                  ? 'The devices these guides discuss, with where to buy them in Australia.'
                  : 'Devices in this category, with where to buy them in Australia.'}
              </p>
            </div>
            <Link
              href={productsHref}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              Browse products
              <svg
                aria-hidden="true"
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
