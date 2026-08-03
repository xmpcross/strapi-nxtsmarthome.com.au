import Link from 'next/link';
import { articleHref, coverFor, formatDate, type Article } from '@/lib/content';

/**
 * "Related Posts" card shown above the FAQ on single posts.
 *
 * The match percentage and date are no longer displayed. getRelatedWithScores()
 * still ranks by them, so ordering is unchanged — the figures just do not need to
 * be on screen.
 *
 * The reference design has an "AI-generated" tab on the right edge; it is not
 * reproduced, because these suggestions are computed from the content, not
 * generated, and the label would be inaccurate.
 */
export default function RelatedPosts({
  items,
}: {
  items: { article: Article; match: number }[];
}) {
  if (!items?.length) return null;

  return (
    <section
      className="not-prose mt-12 rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-9 dark:border-slate-700 dark:bg-slate-800/60"
      aria-labelledby="related-heading"
    >
      <h2 id="related-heading" className="text-xl font-bold text-slate-900 dark:text-white">
        Related Posts
      </h2>

      <ul className="mt-6 flex flex-col gap-7">
        {items.map(({ article, match }) => (
          <li key={article.slug} className="group grid gap-5 sm:grid-cols-[15rem_minmax(0,1fr)]">
            <Link
              href={articleHref(article)}
              className="block overflow-hidden rounded-lg"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src={coverFor(article)}
                alt=""
                width={1000}
                height={500}
                className="aspect-[62/35] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </Link>

            <div className="min-w-0">
              <h3 className="text-xl font-bold leading-snug text-slate-900 dark:text-white">
                <Link
                  href={articleHref(article)}
                  className="hover:text-brand-700 dark:hover:text-brand-400"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-3 leading-relaxed text-slate-500 dark:text-slate-400">
                {article.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
