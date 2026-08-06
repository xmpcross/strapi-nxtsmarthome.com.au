import Link from 'next/link';
import AffiliateLink from './AffiliateLink';
import RetailerLogo from './RetailerLogo';
import type { TopProduct } from '@/lib/products';

interface Props {
  product: TopProduct;
  rank?: number;
}

function Stars({ rating, count }: { rating?: number; count?: number }) {
  if (!rating) return null;
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`${rating} out of 5 stars`}>
      <span className="text-amber-500 font-bold text-sm" aria-hidden="true">
        {'★'.repeat(Math.floor(rounded))}
        {rounded % 1 ? '½' : ''}
      </span>
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
        {rating.toFixed(1)}
      </span>
      {count ? (
        <span className="text-xs text-slate-500 dark:text-slate-400">({count})</span>
      ) : null}
    </div>
  );
}

export default function ProductCard({ product, rank }: Props) {
  const topRetailers = (product.retailers || []).slice(0, 3);
  const primaryRetailer = product.retailers?.find((r) => r.primary) || product.retailers?.[0];

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-800/80 dark:hover:border-slate-600">
      <div>
        {/* Header Tags & Price */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {rank !== undefined && (
              <span className="inline-flex items-center rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white shadow-xs">
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
          {product.priceAud ? (
            <span className="text-base font-bold text-slate-900 dark:text-white">
              ${product.priceAud.toLocaleString('en-AU')} <span className="text-[10px] font-normal text-slate-500">AUD</span>
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
        <h3 className="mb-1 text-base font-bold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
          <Link href={`/products/${product.slug}/`}>
            {product.brand ? `${product.brand} ` : ''}{product.name}
          </Link>
        </h3>

        {/* Best For — hidden on the card; the full verdict is on the product page. */}

        {/* Rating Stars */}
        <div className="mb-4">
          <Stars rating={product.rating} count={product.reviewCount} />
        </div>

        {/* PROMOTED Retailer Deal Row (Matched to uploaded screenshot) */}
        {topRetailers.length > 0 && (
          <div className="mb-4 rounded-[8px] bg-slate-100/90 p-2.5 dark:bg-slate-700/60">
            <div className="mb-2 text-[10px] font-extrabold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              PROMOTED
            </div>
            <div className="grid grid-cols-3 gap-2">
              {topRetailers.map((ret, i) => {
                const estPrice = product.priceAud
                  ? Math.round(product.priceAud * (i === 0 ? 1 : i === 1 ? 1.05 : 1.12))
                  : undefined;
                return (
                  <AffiliateLink
                    key={ret.name + i}
                    href={ret.url}
                    subId={`promoted-card-${product.slug}-${i}`}
                    className="flex flex-col items-center justify-between rounded-lg border border-slate-200/80 bg-white p-2 shadow-xs transition hover:border-slate-300 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500 min-h-[58px]"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {estPrice ? `$${estPrice.toLocaleString('en-AU')}` : 'Check'}
                    </span>
                    <RetailerLogo name={ret.name} />
                  </AffiliateLink>
                );
              })}
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
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700"
          >
            <span>Check price at {primaryRetailer.name}</span>
          </AffiliateLink>
        ) : null}

        <div className="mt-2 flex items-center justify-between">
          <Link
            href={`/products/${product.slug}/`}
            className="text-xs font-semibold text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
          >
            View full specs & price comparison →
          </Link>
        </div>
      </div>
    </div>
  );
}
