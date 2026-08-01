import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles, categoriesWithCounts } from '@/lib/content';
import { site } from '@/lib/site';

export default async function HomePage() {
  const articles = await getAllArticles();
  const featured = articles.filter((a) => a.featured);
  const lead = featured[0] ?? articles[0];
  const secondary = articles.filter((a) => a.slug !== lead?.slug).slice(0, 6);
  const cats = categoriesWithCounts(articles);

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white px-4 py-14 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            Made for Australian homes 🇦🇺
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Smart home advice that actually applies here
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Independent reviews, step-by-step setup guides and honest buying advice — written
            around 240V wiring, AS/NZS rules, Australian retailers and local warranty law.
            Useful anywhere in the world, accurate for people living here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/articles/"
              className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Browse all articles
            </Link>
            <Link
              href="/categories/hubs-and-platforms/"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              Start here: pick a platform
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {lead && (
          <section className="mb-14" aria-labelledby="lead-heading">
            <h2 id="lead-heading" className="sr-only">
              Featured article
            </h2>
            <ArticleCard article={lead} featured />
          </section>
        )}

        <section className="mb-14" aria-labelledby="topics-heading">
          <h2
            id="topics-heading"
            className="mb-6 text-2xl font-bold text-slate-900 dark:text-white"
          >
            Browse by topic
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cats.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}/`}
                className="group rounded-xl border border-slate-200 p-5 transition hover:border-brand-400 hover:bg-brand-50/50 dark:border-slate-700 dark:hover:border-brand-600 dark:hover:bg-slate-800"
              >
                <div className="mb-2 text-2xl" aria-hidden="true">
                  {category.emoji}
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{category.blurb}</p>
                <p className="mt-3 text-xs font-medium text-slate-400">
                  {category.count} {category.count === 1 ? 'article' : 'articles'}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {secondary.length > 0 && (
          <section aria-labelledby="latest-heading">
            <div className="mb-6 flex items-end justify-between">
              <h2
                id="latest-heading"
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                Latest
              </h2>
              <Link
                href="/articles/"
                className="text-sm font-semibold text-brand-700 hover:underline dark:text-brand-400"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {secondary.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Why trust {site.shortName}?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            We explain how we reach every recommendation, we tell you when we have not tested
            something ourselves, and we disclose every commercial link. If a product is a bad
            buy, we say so.
          </p>
          <Link
            href="/how-we-test/"
            className="mt-5 inline-block rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            How we test and review
          </Link>
        </section>
      </div>
    </>
  );
}
