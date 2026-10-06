import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { articleHref, getAllArticles } from '@/lib/content';
import { getShoppableTopProducts, isIndexableProduct, toListingCard } from '@/lib/products';
import { categories, getCategory } from '@/lib/site';

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  // A category page listing no indexable product is a page of price listings:
  // noindex, follow (AdSense Task 2).
  const indexableHere = getShoppableTopProducts().filter(
    (p) => p.categorySlug === category.slug && isIndexableProduct(p),
  ).length;

  return {
    title: `Best ${category.name} in Australia — Prices & Retailers`,
    description: `Compare top rated ${category.name.toLowerCase()} in Australia across JB Hi-Fi, Amazon AU, The Good Guys, and Harvey Norman.`,
    alternates: { canonical: `/products/category/${category.slug}/` },
    ...(indexableHere ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  // Empty listings (under 50 words of our own text) are never listed; their
  // pages still resolve (lib/products.ts isEmptyListing).
  const allProducts = getShoppableTopProducts();
  const inCategory = allProducts.filter((p) => p.categorySlug === category.slug).length;
  const heading = `Best ${category.name} in Australia`;
  // Newest real articles in this category: the buying context for the grid above.
  const guides = (await getAllArticles()).filter((a) => a.category === category.key);

  return (
    <main className="container space-y-20 py-10 lg:space-y-24 lg:py-16">
      {/*
        One default header for every category. The per-category banner JPEGs
        carried their heading as baked-in artwork and existed for only some
        categories; this works for all of them and keeps a real visible h1.
      */}
      <header className="rounded-3xl bg-primary-50 px-6 py-10 sm:px-10 lg:px-14 lg:py-14 dark:bg-primary-950/40">
        <div className="flex items-center gap-4">
          <span
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl dark:bg-neutral-900"
            aria-hidden="true"
          >
            {category.emoji}
          </span>
          <p className="text-sm font-semibold tracking-wider text-primary-700 uppercase dark:text-primary-300">
            Australian buying guide
          </p>
        </div>
        <h1 className="mt-5 max-w-3xl text-[2.5rem] leading-tight font-bold tracking-tight text-neutral-900 dark:text-white">
          {heading}
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
        {inCategory > 0 && (
          <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
            {inCategory} {inCategory === 1 ? 'product' : 'products'} listed, each with prices at Australian retailers.
          </p>
        )}
      </header>

      {/* Category switcher: the other product categories, this one filled. */}
      <nav aria-label="Product categories" className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          <li className="shrink-0">
            <Link
              href="/products/"
              className="inline-block rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-sm font-medium whitespace-nowrap text-neutral-700 transition hover:border-primary-500 hover:text-primary-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200"
            >
              All products
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/products/category/${c.slug}/`}
                aria-current={c.slug === category.slug ? 'page' : undefined}
                className={`inline-block rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition ${
                  c.slug === category.slug
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-primary-500 hover:text-primary-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200'
                }`}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Grid with Left Filter Sidebar */}
      <ProductGrid
        products={allProducts.map(toListingCard)}
        categoriesList={categories}
        currentCategorySlug={category.slug}
      />

      {guides.length > 0 && (
        <section>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h2 className="text-[2rem] leading-tight font-bold text-neutral-900 dark:text-white">
              {category.name} guides
            </h2>
            <Link
              href={`/categories/${category.slug}/`}
              className="text-sm font-medium text-primary-700 hover:underline dark:text-primary-300"
            >
              All {guides.length} {category.name} articles →
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.slice(0, 4).map((a) => (
              <li key={a.slug}>
                <Link
                  href={articleHref(a)}
                  className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-primary-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-700"
                >
                  <span className="font-semibold leading-snug text-neutral-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
                    {a.title}
                  </span>
                  <span className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">{a.description}</span>
                  <span className="mt-auto pt-3 text-xs text-neutral-500 dark:text-neutral-400">
                    {a.readingMinutes} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Same disclosure as /products/, so every category page carries it. */}
      <section className="rounded-3xl bg-neutral-100 px-6 py-8 sm:px-10 dark:bg-neutral-900">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">How these products are listed</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          We list devices sold in Australia by a retailer with local warranty support. Prices are indicative and change
          daily, so confirm on the retailer&apos;s site. These are price listings, not reviews: we have not tested these
          products. Some links earn us a commission at no extra cost to you, which does not affect what appears here or
          its order.
        </p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
          <Link href="/how-we-test/" className="text-primary-700 hover:underline dark:text-primary-300">
            How we research →
          </Link>
          <Link href="/affiliate-disclosure/" className="text-primary-700 hover:underline dark:text-primary-300">
            Affiliate disclosure →
          </Link>
        </p>
      </section>
    </main>
  );
}
