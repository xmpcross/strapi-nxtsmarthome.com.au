import Link from 'next/link';
import type { TopProduct } from '@/lib/products';

/**
 * Related products strip for the bottom of a product page.
 *
 * Six per row on desktop, stepping down to two on the narrowest screens — at
 * 1/6 of the content width a card is roughly 200px, so the compact card here
 * is deliberately lighter than ProductCard (no verdict, no retailer row).
 */
export default function RelatedProducts({ products }: { products: TopProduct[] }) {
  if (!products.length) return null;

  return (
    <section className="mt-5 rounded-[4px] bg-white p-5 dark:bg-slate-800 sm:p-6">
      <h2 className="mb-4 text-2xl font-bold text-[#1d252c] dark:text-white">Related Products</h2>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}/`}
              className="group flex h-full flex-col rounded-[4px] border border-[#e0e0e0] p-3 transition hover:border-[#0046be] dark:border-slate-700 dark:hover:border-blue-500"
            >
              <div className="mb-2.5 flex h-28 items-center justify-center overflow-hidden rounded-[4px] bg-[#f7f8f9] p-2 dark:bg-slate-900/60">
                <img
                  src={product.image || '/og-default.png'}
                  alt={product.brand ? `${product.brand} ${product.name}` : product.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {product.brand ? (
                <span className="text-[0.6875rem] font-semibold text-[#0046be] dark:text-blue-400">
                  {product.brand}
                </span>
              ) : null}

              <h3 className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug text-[#1d252c] group-hover:text-[#0046be] dark:text-white dark:group-hover:text-blue-400">
                {product.name}
              </h3>

              <div className="mt-auto pt-2">
                {product.rating ? (
                  <div className="flex items-center gap-1 text-[0.6875rem] text-[#55555a] dark:text-slate-400">
                    <span className="text-amber-500" aria-hidden="true">★</span>
                    <span className="font-semibold text-[#1d252c] dark:text-slate-200">
                      {product.rating.toFixed(1)}
                    </span>
                    {product.reviewCount ? <span>({product.reviewCount})</span> : null}
                  </div>
                ) : null}

                {product.priceAud ? (
                  <div className="mt-1 text-sm font-bold text-[#1d252c] dark:text-white">
                    ${product.priceAud.toLocaleString('en-AU')}
                  </div>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
