import Link from 'next/link';
import { articleHref } from '@/lib/urls';
import { squareCoverFor, type Article } from '@/lib/content';

/**
 * "Next Up": a compact two-column grid of onward links.
 *
 * The reference pairs its heading with an "AI-generated" chip. That is not
 * reproduced — these are the site's own articles, chosen by category and tag
 * overlap, so the label would be untrue.
 */
export default function NextUp({ items }: { items: Article[] }) {
  if (!items?.length) return null;

  return (
    <section className="not-prose mt-12" aria-labelledby="next-up-heading">
      <h2
        id="next-up-heading"
        className="text-xl font-bold text-slate-900 dark:text-white"
      >
        Next Up
      </h2>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((article) => (
          <li key={article.slug}>
            <Link
              href={articleHref(article)}
              className="group flex items-center gap-4 rounded-lg border-0 bg-white p-2.5 pr-5 shadow-sm transition hover:shadow-md dark:bg-slate-800/60"
            >
              <img
                src={squareCoverFor(article)}
                alt=""
                width={500}
                height={500}
                loading="lazy"
                className="aspect-square w-14 shrink-0 rounded-lg object-cover"
              />
              <span className="line-clamp-2 min-w-0 text-sm font-bold leading-snug text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                {article.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
