import type { ReactNode } from 'react';

/**
 * The title block used by every hub and listing page.
 *
 * These four pages had drifted apart — the h1 was 2rem on the product pages
 * but text-3xl/sm:text-4xl on /categories/, bold in one place and extrabold in
 * another, with the eyebrow tracked two different ways. Same page furniture,
 * four slightly different renderings. This is the single source.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  meta,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Small line under the intro — a page number, a count, a checked date. */
  meta?: ReactNode;
}) {
  return (
    <header className="mb-8 text-left">
      {eyebrow ? (
        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="mt-1 text-[2rem] font-bold leading-[2.25rem] text-slate-900 dark:text-white">
        {title}
      </h1>

      {intro ? (
        <p className="mt-4 w-full text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:w-4/5 sm:text-base">
          {intro}
        </p>
      ) : null}

      {meta ? (
        <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">{meta}</p>
      ) : null}
    </header>
  );
}
