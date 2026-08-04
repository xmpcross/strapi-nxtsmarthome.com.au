import Link from 'next/link';
import BookmarkButton from './BookmarkButton';
import { coverFor, squareCoverFor, formatDate, type Article } from '@/lib/content';
import { articleHref } from '@/lib/urls';

/**
 * Post card set for the editorial listing section.
 *
 * Every dimension, colour and radius lives in CSS custom properties on the
 * classes in globals.css (.featured-post-card, .compact-post-card, .post-badge,
 * .bookmark-btn, .card-arrow). Nothing here carries per-card geometry, so a new
 * article renders identically without touching styles.
 */

/** Compact dark pill naming the article's category. */
export function PostCategoryBadge({ article }: { article: Article }) {
  if (!article.categoryMeta) return null;
  return <span className="post-badge">{article.categoryMeta.name}</span>;
}

/** Round CTA that sits in a card's concave corner. */
export function DetachedArrowButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="card-arrow post-arrow">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}

/**
 * Large card: metadata row, title, cover, excerpt, detached arrow.
 *
 * The title is clamped and the image height fixed so all three cards in a row
 * finish level and their excerpts start on the same line.
 */
export function FeaturedPostCard({ article }: { article: Article }) {
  return (
    <article className="featured-post-card group flex h-full flex-col relative rounded-lg border border-slate-200 bg-white p-6 dark:border-card-edge dark:bg-card">
      <div className="featured-post-meta">
        <div className="featured-post-meta-left">
          <PostCategoryBadge article={article} />
          <span aria-hidden="true" className="post-dot">
            •
          </span>
          <span className="post-muted">{article.readingMinutes} mins read</span>
        </div>
        <BookmarkButton slug={article.slug} title={article.title} />
      </div>

      <h3 className="featured-post-title">
        <Link href={articleHref(article)}>{article.title}</Link>
      </h3>

      <Link href={articleHref(article)} aria-label={article.title} className="featured-post-figure mb-4 block overflow-hidden rounded-lg">
        <img
          src={coverFor(article)}
          alt={article.imageAlt ?? article.title}
          width={1240}
          height={700}
          loading="lazy"
          className="w-full rounded-lg object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <p className="featured-post-excerpt line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{article.description}</p>
    </article>
  );
}

export function StaffPicksCard({ article }: { article: Article }) {
  return (
    <article className="staff-picks-card group">
      <div className="featured-post-meta">
        <div className="featured-post-meta-left">
          <PostCategoryBadge article={article} />
          <span aria-hidden="true" className="post-dot">
            •
          </span>
          <span className="post-muted">{article.readingMinutes} mins read</span>
        </div>
        {/* Top-right bookmark icon removed per request */}
      </div>

      <h3 className="featured-post-title">
        <Link href={articleHref(article)}>{article.title}</Link>
      </h3>

      <Link href={articleHref(article)} aria-label={article.title} className="featured-post-figure mb-4 block overflow-hidden rounded-lg">
        <img
          src={coverFor(article)}
          alt={article.imageAlt ?? article.title}
          width={1240}
          height={700}
          loading="lazy"
          className="w-full rounded-lg object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <p className="featured-post-excerpt line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{article.description}</p>

      {/* Bottom-right corner notch & arrow button */}
      <div className="staff-picks-notch" aria-hidden="true">
        <div className="curve-top" />
        <div className="curve-left" />
      </div>

      <Link
        href={articleHref(article)}
        aria-label={`Read article: ${article.title}`}
        className="staff-picks-arrow"
      >
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19 12H4.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </Link>
    </article>
  );
}


export function CompactPostCard({ article }: { article: Article }) {
  return (
    <article className="compact-post-card">
      <Link href={articleHref(article)} className="compact-post-link">
        <img
          className="compact-post-thumb"
          src={squareCoverFor(article)}
          alt={article.imageAlt ?? article.title}
          width={500}
          height={500}
          loading="lazy"
        />
        <span className="compact-post-body">
          <span className="compact-post-title">{article.title}</span>
          <span className="compact-post-meta">
            <time dateTime={article.date}>{formatDate(article.updated ?? article.date)}</time>
            <span aria-hidden="true" className="post-dot">
              •
            </span>
            <span>{article.readingMinutes} mins read</span>
          </span>
        </span>
      </Link>
    </article>
  );
}
