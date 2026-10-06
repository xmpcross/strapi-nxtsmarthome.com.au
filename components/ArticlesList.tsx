import Link from 'next/link';
import ArticleIndex, { type ArticleRow } from '@/components/articles/ArticleIndex';
import { FOCUS, shortDate, TYPE_ORDER, typeLabel } from '@/components/category/shared';
import JsonLd from '@/components/JsonLd';
import { articleHref, coverFor, type Article } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { categories, site } from '@/lib/site';

const NEWEST = 3;

/**
 * /articles/: the whole library on one page. The newest few lead with their
 * cover images; then every article sits in one compact list, newest first,
 * that readers narrow by title, topic and type (ArticleIndex). Nothing is
 * paginated, so any guide is a search or a click away.
 */
export default function ArticlesList({ articles }: { articles: Article[] }) {
  const sorted = [...articles].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  const newest = sorted.slice(0, NEWEST);
  const total = sorted.length;

  const rows: ArticleRow[] = sorted.map((a) => ({
    href: articleHref(a),
    title: a.title,
    topic: a.category,
    topicName: a.categoryMeta?.name ?? a.category,
    type: a.type,
    typeLabel: typeLabel(a.type),
    date: a.date,
    dateLabel: shortDate(a.date),
    minutes: a.readingMinutes,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'All articles', path: '/articles/' },
        ])}
      />
      {total > 0 ? (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'All articles',
            url: `${site.url}/articles/`,
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

      <div className="page-articles">
        <header className="container pt-8 lg:pt-12">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400"
          >
            <Link href="/" className={`hover:text-neutral-900 dark:hover:text-white ${FOCUS}`}>
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-900 dark:text-white" aria-current="page">
              All articles
            </span>
          </nav>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
            All articles
          </h1>
          <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-pretty text-neutral-700 sm:text-lg dark:text-neutral-300">
            Every buying guide, setup guide, comparison and explainer we have published, written for Australian homes.
            Search a title, or narrow the list by topic and type.
          </p>
          {total > 0 ? (
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">{total}</span>{' '}
              {total === 1 ? 'article' : 'articles'} ·{' '}
              <Link
                href="/all-topics/"
                className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
              >
                Browse by topic
              </Link>
            </p>
          ) : null}
        </header>

        <div className="container pt-10 pb-20 lg:pt-12 lg:pb-28">
          {total === 0 ? (
            <p className="text-neutral-700 dark:text-neutral-300">No articles published yet.</p>
          ) : (
            <>
              <section aria-labelledby="newest-heading">
                <h2 id="newest-heading" className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Newest
                </h2>
                <ul className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {newest.map((article, index) => (
                    <li key={article.slug} className={index === 2 ? 'sm:hidden lg:block' : undefined}>
                      <Link href={articleHref(article)} className={`group block rounded-sm ${FOCUS}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coverFor(article)}
                          alt=""
                          width={640}
                          height={360}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          className="aspect-[16/9] w-full rounded-lg object-cover"
                        />
                        <span className="mt-3 block text-sm text-neutral-600 dark:text-neutral-400">
                          <time
                            dateTime={article.date}
                            className="tabular-nums font-semibold text-primary-600 dark:text-primary-400"
                          >
                            {shortDate(article.date)}
                          </time>{' '}
                          · {article.categoryMeta?.name ?? article.category}
                        </span>
                        <span className="mt-1 block text-lg leading-snug font-bold text-neutral-900 group-hover:underline group-hover:underline-offset-4 dark:text-white">
                          {article.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="index-heading" className="mt-16 lg:mt-20">
                <h2 id="index-heading" className="mb-5 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Every article
                </h2>
                <ArticleIndex
                  rows={rows}
                  topics={categories.map((c) => ({ key: c.key, name: c.name }))}
                  types={TYPE_ORDER}
                />
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
