import Link from 'next/link';
import AffiliateLink from './AffiliateLink';
import RetailerLogo from './RetailerLogo';
import type { TopProduct } from '@/lib/products';

interface Props {
  product: TopProduct;
  rank?: number;
}

/** Cheapest verified retailer price; the seeded `priceAud` is not a real price. */
function lowestPrice(product: TopProduct): number | undefined {
  const prices = (product.retailers || [])
    .map((r) => r.priceAud)
    .filter((p): p is number => typeof p === 'number' && p > 0);
  return prices.length ? Math.min(...prices) : undefined;
}

export default function ProductCard({ product, rank }: Props) {
  const topRetailers = (product.retailers || []).slice(0, 3);
  const primaryRetailer = product.retailers?.find((r) => r.primary) || product.retailers?.[0];
  const lowest = lowestPrice(product);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[8px] border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-800/80 dark:hover:border-slate-600">
      <div>
        {/* Header Tags & Price */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {rank !== undefined && (
              <span className="inline-flex items-center rounded-md bg-primary-600 px-2 py-0.5 text-xs font-bold text-white shadow-2xs">
                #{rank}
              </span>
            )}
            {product.subCategory ? (
              <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                {product.subCategory}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {product.categoryName}
              </span>
            )}
          </div>
          {lowest ? (
            <span className="text-base font-bold text-slate-900 dark:text-white">
              <span className="text-[10px] font-normal text-slate-500">from </span>${lowest.toLocaleString('en-AU')}{' '}
              <span className="text-[10px] font-normal text-slate-500">AUD</span>
            </span>
          ) : null}
        </div>

        {/* Featured Product Image */}
        <Link href={`/products/${product.slug}/`} className="block">
          <div className="relative mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-[8px] bg-slate-50 p-4 transition dark:bg-slate-900/60 group-hover:bg-slate-100 dark:group-hover:bg-slate-900/80">
            <img
              src={product.image || '/og-default.png'}
              alt={product.brand ? `${product.brand} ${product.name}` : product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Title */}
        <h3 className="mb-1 text-base font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
          <Link href={`/products/${product.slug}/`}>
            {product.brand ? `${product.brand} ` : ''}{product.name}
          </Link>
        </h3>

        {/* Best For — hidden on the card; the full verdict is on the product page. */}

        {/*
          No star rating on the card: beside a product name on this site it
          reads as our score, and none of these products has been tested.

          Retailer row. This was headed "PROMOTED" and showed prices invented
          from the seeded priceAud (x1.05, x1.12 per retailer). None of these is
          a paid placement, so there is no Sponsored label either — just the
          retailers, with a price only where one was verified.
        */}
        {topRetailers.length > 0 && (
          <div className="mb-4 rounded-[8px] bg-slate-100/90 p-2.5 dark:bg-slate-700/60">
            <div className="mb-2 text-[10px] font-extrabold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Available at
            </div>
            <div className="grid grid-cols-3 gap-2">
              {topRetailers.map((ret, i) => (
                <AffiliateLink
                  key={ret.name + i}
                  href={ret.url}
                  subId={`retailer-card-${product.slug}-${i}`}
                  className="flex flex-col items-center justify-between rounded-lg border border-slate-200/80 bg-white p-2 shadow-2xs transition hover:border-slate-300 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500 min-h-[58px]"
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {ret.priceAud ? `$${ret.priceAud.toLocaleString('en-AU')}` : 'Check price'}
                  </span>
                  <RetailerLogo name={ret.name} />
                </AffiliateLink>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="border-t border-slate-100 pt-3 dark:border-slate-700/60">
        {primaryRetailer ? (
          <AffiliateLink
            href={primaryRetailer.url}
            subId={`product-card-${product.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-2xs transition hover:bg-primary-700"
          >
            <span>Check price at {primaryRetailer.name}</span>
          </AffiliateLink>
        ) : null}

        <div className="mt-2 flex items-center justify-between">
          <Link
            href={`/products/${product.slug}/`}
            className="text-xs font-semibold text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
          >
            View full specs & price comparison →
          </Link>
        </div>
      </div>
    </div>
  );
}
