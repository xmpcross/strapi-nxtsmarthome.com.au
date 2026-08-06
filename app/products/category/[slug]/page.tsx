import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ProductGrid from '@/components/ProductGrid';
import { categoryHeroFor } from '@/lib/content';
import { getAllTopProducts } from '@/lib/products';
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

  return {
    title: `Best ${category.name} in Australia — Prices & Retailers`,
    description: `Compare top rated ${category.name.toLowerCase()} in Australia across JB Hi-Fi, Amazon AU, The Good Guys, and Harvey Norman.`,
    alternates: { canonical: `/products/category/${category.slug}/` },
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

  const allProducts = getAllTopProducts();
  const hero = categoryHeroFor(category.slug, 'product');
  const heading = `Best ${category.name} in Australia`;

  return (
    <main className="mx-auto max-w-[1366px] px-4 py-8 sm:px-6">
      {/*
        The banner already carries the eyebrow, the heading and the category
        blurb as artwork, so printing them again underneath would say everything
        twice. The h1 is kept in the markup and hidden visually instead — a
        page whose only heading is baked into a JPEG has no heading at all as
        far as a crawler or a screen reader is concerned.

        Categories with no banner generated yet fall back to the plain header,
        which is why this is a branch rather than a replacement.
      */}
      {hero ? (
        <header className="mb-8">
          <h1 className="sr-only">{heading}</h1>
          <img
            src={hero}
            alt=""
            aria-hidden="true"
            width={1600}
            height={600}
            className="w-full rounded-[8px]"
          />
          <p className="mt-6 w-full text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:w-4/5 sm:text-base">
            {category.intro}
          </p>
        </header>
      ) : (
        <PageHeader
          eyebrow="Australian Buying Guide"
          title={heading}
          intro={category.intro}
        />
      )}

      {/* Main Grid with Left Filter Sidebar */}
      <ProductGrid
        products={allProducts}
        categoriesList={categories}
        currentCategorySlug={category.slug}
      />
    </main>
  );
}
