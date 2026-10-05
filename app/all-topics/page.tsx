import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { getCategories } from '@/data/categories';
import { getAllArticles } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { getListableTopProducts } from '@/lib/products';
import { getCategory, site } from '@/lib/site';

const DESCRIPTION =
  'Browse smart home guides and reviews by topic — security, lighting, energy, climate, hubs and platforms, robot vacuums, setup guides and buying guides.';

export const metadata: Metadata = {
  title: 'Topics & Categories',
  description: DESCRIPTION,
  alternates: { canonical: '/all-topics/' },
};

// Topic counts and the per-topic rows refresh with the articles (ISR).
export const revalidate = 300;

export default async function CategoriesIndex() {
  const articles = await getAllArticles();
  const cats = (await getCategories()).filter((c) => c.count > 0);
  // Topics with listed products get a link to their product category page; the rest (setup and buying guides) have none.
  const withProducts = new Set(getListableTopProducts().map((p) => p.categorySlug));

  return (
    <div className="page-categories-index container pt-14 pb-24 lg:pt-20 lg:pb-28">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Topics & Categories', path: '/all-topics/' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Topics & Categories',
          url: `${site.url}/all-topics/`,
          description: DESCRIPTION,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: cats.length,
            itemListElement: cats.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.name,
              url: `${site.url}/categories/${c.handle}/`,
            })),
          },
        }}
      />

      <PageHeader
        eyebrow="Topics"
        title="Explore smart home topics"
        // h1 at 2.5rem, section h2s at 2rem (app/globals.css), user request 24 Sep 2026.
        titleClassName="text-[2.5rem] leading-tight"
        intro={`Everything we publish, organised by what you're trying to do: ${articles.length} guides across ${cats.length} topics, written for Australian homes, retailers and electrical rules.`}
      />

      {/* A directory, not a feed: what each topic covers and where to go next.
          The home page carries the latest articles per topic. */}
      <ul className="grid gap-6 md:grid-cols-2">
        {cats.map((c) => {
          const meta = getCategory(c.handle);
          return (
            <li
              key={c.id}
              className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-7 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className="flex size-14 items-center justify-center rounded-2xl bg-primary-50 text-3xl dark:bg-primary-950/60"
                  aria-hidden="true"
                >
                  {meta?.emoji}
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  {c.count} {c.count === 1 ? 'guide' : 'guides'}
                </span>
              </div>
              <h2 className="mt-5 text-2xl leading-tight font-bold text-neutral-900 dark:text-white">
                <Link href={`/categories/${c.handle}/`} className="hover:text-primary-700 dark:hover:text-primary-300">
                  {c.name}
                </Link>
              </h2>
              <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-300">{meta?.intro ?? c.description}</p>
              {meta?.subcategories?.length ? (
                <div className="mt-5">
                  <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    Covers
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {meta.subcategories.map((sub) => (
                      <li
                        key={sub}
                        className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-700 dark:border-neutral-700 dark:text-neutral-200"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-100 pt-5 text-sm font-medium dark:border-neutral-800">
                <Link href={`/categories/${c.handle}/`} className="mt-5 text-primary-700 hover:underline dark:text-primary-300">
                  Read {c.name} guides →
                </Link>
                {withProducts.has(c.handle) && (
                  <Link
                    href={`/products/category/${c.handle}/`}
                    className="mt-5 text-primary-700 hover:underline dark:text-primary-300"
                  >
                    Compare products →
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
