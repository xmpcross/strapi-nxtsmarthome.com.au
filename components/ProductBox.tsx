import AffiliateLink from './AffiliateLink';
import type { ProductRef } from '@/lib/content';

interface Props {
  product: ProductRef;
  /** Article slug — becomes the affiliate subID so you can attribute the click. */
  subId: string;
  rank?: number;
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${rating} out of 5`}>
      <span className="text-accent-500" aria-hidden="true">
        {'★'.repeat(Math.floor(rounded))}
        {rounded % 1 ? '½' : ''}
      </span>
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

/**
 * The commercial unit of the site: a product summary with pros/cons and buy buttons.
 * Every buy button routes through AffiliateLink.
 */
export default function ProductBox({ product, subId, rank }: Props) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {rank !== undefined && (
              <span className="mb-1 inline-block rounded bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
                #{rank}
              </span>
            )}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {product.brand ? `${product.brand} ${product.name}` : product.name}
            </h3>
            {product.bestFor && (
              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                Best for: {product.bestFor}
              </p>
            )}
          </div>
          {product.rating !== undefined && <Stars rating={product.rating} />}
        </div>
      </div>

      {(product.pros?.length || product.cons?.length) && (
        <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
          {product.pros?.length ? (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                What we like
              </h4>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {product.pros.map((pro) => (
                  <li key={pro} className="flex gap-2">
                    <span className="text-emerald-600" aria-hidden="true">
                      ✓
                    </span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {product.cons?.length ? (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-rose-700 dark:text-rose-400">
                Worth knowing
              </h4>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {product.cons.map((con) => (
                  <li key={con} className="flex gap-2">
                    <span className="text-rose-500" aria-hidden="true">
                      –
                    </span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {product.retailers?.length ? (
        <div className="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-4 dark:border-slate-700">
          {product.retailers.map((retailer) => (
            <AffiliateLink
              key={retailer.name + retailer.url}
              href={retailer.url}
              subId={subId}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              <span>Check price at {retailer.name}</span>
              {retailer.price && (
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-xs">
                  {retailer.price}
                </span>
              )}
            </AffiliateLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
