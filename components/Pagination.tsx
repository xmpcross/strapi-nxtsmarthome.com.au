import Link from 'next/link';

/** Articles shown per category page. */
export const PER_PAGE = 6;

/**
 * Page 1 keeps the clean URL; later pages get /page/N/. Keeping page 1 at the
 * base URL matters — it is the one that is linked to and indexed, and moving it
 * to /page/1/ would orphan every existing link to the category.
 */
export function pageHref(base: string, page: number) {
  return page <= 1 ? base : `${base}page/${page}/`;
}

export function pageCount(total: number) {
  return Math.max(1, Math.ceil(total / PER_PAGE));
}

/**
 * Numbered pager, aligned to the right of the listing.
 *
 * Real links, not a client-side slice: this is a static export, so every page
 * exists as its own HTML file and works with JavaScript disabled — which also
 * means crawlers can reach articles that are not on page one.
 */
export default function Pagination({
  base,
  page,
  total,
}: {
  base: string;
  page: number;
  total: number;
}) {
  const pages = pageCount(total);
  if (pages <= 1) return null;

  const numbers = Array.from({ length: pages }, (_, i) => i + 1);
  const box =
    'inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition';
  const idle =
    'border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-700 dark:border-card-edge dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-400';
  const current = 'border-brand-600 bg-brand-600 text-white';
  const muted =
    'border-slate-200 text-slate-300 dark:border-card-edge dark:text-slate-600 pointer-events-none';

  return (
    <nav aria-label="Pagination" className="mt-10 flex justify-end">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          {page > 1 ? (
            <Link href={pageHref(base, page - 1)} rel="prev" className={`${box} ${idle}`}>
              Previous
            </Link>
          ) : (
            <span className={`${box} ${muted}`} aria-hidden="true">
              Previous
            </span>
          )}
        </li>

        {numbers.map((n) => (
          <li key={n}>
            {n === page ? (
              <span className={`${box} ${current}`} aria-current="page">
                {n}
              </span>
            ) : (
              <Link href={pageHref(base, n)} className={`${box} ${idle}`}>
                {n}
              </Link>
            )}
          </li>
        ))}

        <li>
          {page < pages ? (
            <Link href={pageHref(base, page + 1)} rel="next" className={`${box} ${idle}`}>
              Next
            </Link>
          ) : (
            <span className={`${box} ${muted}`} aria-hidden="true">
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
