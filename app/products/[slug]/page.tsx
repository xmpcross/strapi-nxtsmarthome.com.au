import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AffiliateLink from '@/components/AffiliateLink';
import ProductAccordion from '@/components/ProductAccordion';
import ProductHighlights from '@/components/ProductHighlights';
import ProductReviews from '@/components/ProductReviews';
import RelatedProducts from '@/components/RelatedProducts';
import RetailerPriceList from '@/components/RetailerPriceList';
import RetailerPriceTable from '@/components/RetailerPriceTable';
import { getAllTopProducts, getTopProductBySlug } from '@/lib/products';

export async function generateStaticParams() {
  const products = getAllTopProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getTopProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.brand ? product.brand + ' ' : ''}${product.name} Australia Price & Review`,
    description: `Where to buy ${product.name} in Australia. Compare prices across JB Hi-Fi, Amazon AU, The Good Guys, and Harvey Norman.`,
    alternates: { canonical: `/products/${product.slug}/` },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getTopProductBySlug(slug);
  if (!product) notFound();

  // Related products: same subcategory first, then the wider category. Variants
  // of this same product ("… Pro", "… Ultra") are excluded — they are near
  // duplicates of the page you are already on, not alternatives to it.
  const baseSlug = (s: string) => s.replace(/-(pro|ultra|gen-\d+)$/, '');
  const thisBase = baseSlug(product.slug);
  const pool = getAllTopProducts().filter((p) => baseSlug(p.slug) !== thisBase);
  const sameSubCategory = product.subCategory
    ? pool.filter((p) => p.subCategory === product.subCategory)
    : [];
  const relatedProducts = [
    ...sameSubCategory,
    ...pool.filter((p) => p.categorySlug === product.categorySlug && !sameSubCategory.includes(p)),
  ].slice(0, 6); // one row of six on desktop

  const retailers = product.retailers || [];
  const primaryRetailer = retailers.find((r) => r.primary) || retailers[0];

  /*
   * The headline price is the cheapest verified retailer price, not the seeded
   * `priceAud` — that figure came from the original generator and was never a
   * real RRP. Where no retailer could be priced, no price is shown at all.
   */
  const pricedRetailers = retailers
    .filter((r) => typeof r.priceAud === 'number' && r.priceAud > 0)
    .sort((a, b) => (a.priceAud || 0) - (b.priceAud || 0));
  const cheapest = pricedRetailers[0];
  const ctaRetailer = cheapest || primaryRetailer;

  return (
    /* The page element lives in app/layout.tsx — this is a div, not a second
       <main>, which would be invalid HTML. */
    <div className="bg-[#f0f2f4] dark:bg-slate-900">
      <div className="mx-auto max-w-[1366px] px-4 py-6 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#55555a] dark:text-slate-400">
          <Link href="/" className="hover:text-[#0046be] dark:hover:text-blue-400">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/products/" className="hover:text-[#0046be] dark:hover:text-blue-400">Products</Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/products/category/${product.categorySlug}/`}
            className="hover:text-[#0046be] dark:hover:text-blue-400"
          >
            {product.categoryName}
          </Link>
        </nav>

        {/* Two-column shell: content left, purchase panel right */}
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(300px,26%)]">
          {/* ---------- Left column ---------- */}
          <div className="flex min-w-0 flex-col gap-5">
            {/* Hero card: gallery beside summary */}
            <div className="grid items-start gap-6 rounded-[4px] bg-white p-5 dark:bg-slate-800 sm:p-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.85fr)]">
              {/* Gallery. One image per product in this dataset, so the
                  reference's thumbnail rail has nothing to show and is omitted
                  rather than faked with duplicates. */}
              <div className="flex min-w-0 items-center justify-center rounded-lg bg-white p-4 dark:bg-slate-800">
                <img
                  src={product.image || '/og-default.png'}
                  alt={product.brand ? `${product.brand} ${product.name}` : product.name}
                  className="max-h-[380px] w-full object-contain"
                />
              </div>

              {/* Summary */}
              <div className="min-w-0">
                {product.brand ? (
                  <div className="text-sm font-semibold text-[#0046be] dark:text-blue-400">
                    {product.brand}
                  </div>
                ) : null}

                <h1 className="mb-2.5 mt-1.5 text-[1.2rem] font-bold leading-[1.25] text-[#1d252c] dark:text-white">
                  {product.name}
                </h1>

                <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-[#55555a] dark:text-slate-400">
                  {product.rating ? (
                    <span className="flex items-center gap-1">
                      <span className="text-amber-500" aria-hidden="true">★</span>
                      <span className="font-semibold text-[#1d252c] dark:text-slate-200">
                        {product.rating.toFixed(1)}
                      </span>
                      {product.reviewCount ? (
                        <span>({product.reviewCount.toLocaleString('en-AU')} reviews)</span>
                      ) : null}
                    </span>
                  ) : null}
                  {product.subCategory ? (
                    <span>
                      <span className="font-semibold text-[#1d252c] dark:text-slate-200">Type:</span>{' '}
                      {product.subCategory}
                    </span>
                  ) : null}
                </div>

                {product.description || product.bestFor ? (
                  <div className="border-t border-[#e0e0e0] pt-4 dark:border-slate-700">
                    <h2 className="mb-2.5 text-[1.05rem] font-bold text-[#1d252c] dark:text-white">
                      About this product
                    </h2>
                    {/* The manufacturer's own short description where we have
                        one; the editorial verdict is the fallback. Clamped
                        here — the full text is in the Description panel. */}
                    <p className="line-clamp-5 text-sm leading-relaxed text-[#55555a] dark:text-slate-300">
                      {product.description || product.bestFor}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Highlights sit above the Description panels */}
            <ProductHighlights product={product} />

            {/* Description / Specifications / Additional Info */}
            <ProductAccordion product={product} />

            {/* Reviews sit directly beneath the Additional Info panel */}
            <ProductReviews product={product} />
          </div>

          {/* ---------- Right column: purchase panel ---------- */}
          <aside className="lg:sticky lg:top-20">
            <div className="rounded-[4px] border border-[#e0e0e0] bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              {cheapest ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#55555a] dark:text-slate-400">
                    Lowest price
                  </p>
                  <div className="mt-1 text-[1.875rem] font-bold leading-none text-[#1d252c] dark:text-white">
                    ${cheapest.priceAud!.toLocaleString('en-AU', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <p className="mt-1.5 text-[0.8125rem] text-[#55555a] dark:text-slate-400">
                    at {cheapest.name}
                    {pricedRetailers.length > 1
                      ? ` · ${pricedRetailers.length} retailers compared`
                      : ''}
                  </p>
                </>
              ) : (
                <p className="text-sm text-[#55555a] dark:text-slate-300">
                  We could not verify a current Australian price for this product. Check the
                  retailers below.
                </p>
              )}

              <div className="my-5">
                <RetailerPriceList
                  retailers={retailers}
                  subId={`buybox-${product.slug}`}
                  pricesCheckedAt={product.pricesCheckedAt}
                />
              </div>

              {ctaRetailer ? (
                <AffiliateLink
                  href={ctaRetailer.url}
                  subId={`detail-cta-${product.slug}`}
                  className="block w-full rounded-[0.25rem] bg-[#ffe000] px-4 py-3.5 text-center text-sm font-bold text-[#040c13] transition hover:bg-[#fff200]"
                >
                  {cheapest ? `Buy at ${ctaRetailer.name}` : `Check price at ${ctaRetailer.name}`}
                </AffiliateLink>
              ) : null}

              <p className="mt-3 text-center text-[0.6875rem] leading-relaxed text-[#55555a] dark:text-slate-400">
                We may earn a commission from links on this page, at no extra cost to you.
              </p>
            </div>
          </aside>
        </div>

        {/* Retailer Price Comparison Table */}
        <RetailerPriceTable
          productName={product.name}
          retailers={product.retailers}
          subId={`detail-table-${product.slug}`}
          pricesCheckedAt={product.pricesCheckedAt}
        />

        {/* Related products — six per row on desktop */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
