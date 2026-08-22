import Link from 'next/link';

/**
 * Section and widget heading.
 *
 * Lifted out of app/page.tsx so the sidebars can use the same heading the home
 * page uses rather than a near-copy that drifts. The `compact` variant is the
 * one on the home page's right rail (#trending-heading): sparkle, 16px bold,
 * hairline rule beneath, optional "View all" on the right.
 *
 * `id` is required because callers point aria-labelledby at it.
 */

export function Sparkle() {
  return (
    <svg
      aria-hidden="true"
      className="h-[0.85em] w-[0.85em] shrink-0 self-center text-slate-900 dark:text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c.6 5.9 5.5 10.8 12 12-6.5 1.2-11.4 6.1-12 12-.6-5.9-5.5-10.8-12-12C6.5 10.8 11.4 5.9 12 0z" />
    </svg>
  );
}

export default function SectionHeading({
  title,
  subtitle,
  href,
  id,
  compact = false,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  id: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="mb-4 flex items-end justify-between gap-3 border-b border-slate-200 pb-2 dark:border-card-edge">
        <h2 id={id} className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <Sparkle />
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="shrink-0 text-sm font-semibold text-brand-700 hover:underline dark:text-brand-400"
          >
            View all
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-lg border border-slate-200 bg-white px-6 py-5 sm:px-8 dark:border-card-edge dark:bg-card">
      <div className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2
          id={id}
          className="flex items-baseline gap-3 text-2xl font-bold text-slate-900 dark:text-white"
        >
          <Sparkle />
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>

      {href && (
        <Link href={href} className="group flex shrink-0 items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-900 text-white transition group-hover:bg-brand-600 dark:bg-white dark:text-slate-900 dark:group-hover:bg-brand-500 dark:group-hover:text-white">
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </span>
          <span className="text-sm text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white">
            View More
          </span>
        </Link>
      )}
    </div>
  );
}
