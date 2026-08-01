import Link from 'next/link';
import { formatDate, typeLabels, type Article } from '@/lib/content';

interface Props {
  article: Article;
  /** Larger treatment used for the lead item on the home page. */
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: Props) {
  const href = `/articles/${article.slug}/`;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-brand-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-brand-600 ${
        featured ? 'sm:flex-row' : ''
      }`}
    >
      <div
        className={`relative flex shrink-0 items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700 text-5xl ${
          featured ? 'sm:w-2/5 sm:text-7xl' : ''
        } h-40 ${featured ? 'sm:h-auto' : ''}`}
        aria-hidden="true"
      >
        {article.image ? (
          <img
            src={article.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span>{article.categoryMeta?.emoji ?? '🏠'}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            {typeLabels[article.type] ?? article.type}
          </span>
          {article.categoryMeta && (
            <span className="text-slate-500 dark:text-slate-400">
              {article.categoryMeta.name}
            </span>
          )}
        </div>

        <h3
          className={`font-bold leading-snug text-slate-900 dark:text-white ${
            featured ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}
        >
          <Link href={href} className="after:absolute after:inset-0 group-hover:text-brand-700 dark:group-hover:text-brand-400">
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {article.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <time dateTime={article.date}>{formatDate(article.updated ?? article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingMinutes} min read</span>
        </div>
      </div>
    </article>
  );
}
