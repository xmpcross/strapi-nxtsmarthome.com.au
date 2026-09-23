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
  // Ncmaz page heading: large semibold title, muted intro, badge eyebrow.
  return (
    <header className="mb-10 text-left lg:mb-14">
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl xl:text-5xl dark:text-white">
        {title}
      </h1>

      {intro ? (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-500 md:text-lg dark:text-neutral-400">
          {intro}
        </p>
      ) : null}

      {meta ? (
        <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">{meta}</p>
      ) : null}
    </header>
  );
}
