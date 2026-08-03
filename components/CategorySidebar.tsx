import Link from 'next/link';
import type { Category } from '@/lib/site';

interface Props {
  categories: (Category & { count: number })[];
  /** Slug of the category currently being viewed, if any. */
  activeSlug?: string;
  /** Total across all categories, for the "All articles" row. */
  total: number;
  /** Where the "All articles" row points. */
  allHref?: string;
}

/**
 * Category filter rail for the article index and category pages.
 *
 * These are links to the existing /categories/<slug>/ pages rather than an
 * in-page JavaScript filter. Each filtered view then has its own URL, its own
 * intro copy and its own metadata — shareable, crawlable, and it works with
 * JavaScript disabled. A client-side filter would hide the same articles behind
 * a single URL and lose all of that.
 */
export default function CategorySidebar({ categories, activeSlug, total, allHref = '/articles/' }: Props) {
  const rowBase =
    'flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition';
  const rowIdle =
    'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800';
  const rowActive =
    'bg-brand-600 font-semibold text-white hover:bg-brand-600';

  const countBase = 'shrink-0 rounded px-1.5 py-0.5 text-xs font-medium tabular-nums';

  return (
    <aside aria-labelledby="filter-heading" className="lg:sticky lg:top-24">
      <h2
        id="filter-heading"
        className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
      >
        Browse by category
      </h2>

      <nav>
        <ul className="flex flex-col gap-0.5">
          <li>
            <Link
              href={allHref}
              aria-current={activeSlug ? undefined : 'page'}
              className={`${rowBase} ${activeSlug ? rowIdle : rowActive}`}
            >
              <span>All articles</span>
              <span
                className={`${countBase} ${
                  activeSlug
                    ? 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    : 'bg-white/25 text-white'
                }`}
              >
                {total}
              </span>
            </Link>
          </li>

          {categories.map((category) => {
            const isActive = category.slug === activeSlug;
            return (
              <li key={category.key}>
                <Link
                  href={`/categories/${category.slug}/`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`${rowBase} ${isActive ? rowActive : rowIdle}`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden="true">{category.emoji}</span>
                    <span className="truncate">{category.name}</span>
                  </span>
                  <span
                    className={`${countBase} ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {category.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
