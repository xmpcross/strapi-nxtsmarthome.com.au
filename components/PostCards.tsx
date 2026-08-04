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
    <article className="featured-post-card notched-card group">
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

      <Link href={articleHref(article)} aria-label={article.title} className="featured-post-figure">
        <img
          src={coverFor(article)}
          alt={article.imageAlt ?? article.title}
          width={1240}
          height={700}
          loading="lazy"
        />
      </Link>

      <p className="featured-post-excerpt">{article.description}</p>

      <DetachedArrowButton href={articleHref(article)} label={`Read ${article.title}`} />
    </article>
  );
}

/**
 * Compact horizontal card: square thumbnail, title, date and read time.
 *
 * No excerpt and no arrow, per the reference — the whole card is the link.
 */
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
