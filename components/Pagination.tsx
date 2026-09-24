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
  // Ncmaz pagination: round buttons, primary for the current page.
  const box =
    'inline-flex size-11 min-w-11 items-center justify-center rounded-full border text-sm font-medium transition-colors';
  const idle =
    'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800';
  const current = 'border-primary-600 bg-primary-600 text-white';
  const muted = 'pointer-events-none border-neutral-200 text-neutral-300 dark:border-neutral-700 dark:text-neutral-600';

  return (
    <nav aria-label="Pagination" className="mt-16 flex justify-center">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          {page > 1 ? (
            <Link href={pageHref(base, page - 1)} rel="prev" aria-label="Previous page" className={`${box} ${idle} w-auto px-4`}>
              ←
            </Link>
          ) : (
            <span className={`${box} ${muted} w-auto px-4`} aria-hidden="true">
              ←
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
            <Link href={pageHref(base, page + 1)} rel="next" aria-label="Next page" className={`${box} ${idle} w-auto px-4`}>
              →
            </Link>
          ) : (
            <span className={`${box} ${muted} w-auto px-4`} aria-hidden="true">
              →
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
