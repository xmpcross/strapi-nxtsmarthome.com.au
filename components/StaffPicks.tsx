import Link from 'next/link';
import BookmarkButton from '@/components/BookmarkButton';
import {
  articleHref,
  coverFor,
  formatDate,
  squareCoverFor,
  type Article,
} from '@/lib/content';
import './staff-picks.css';

/**
 * Staff Picks: a header bar, three feature cards, then a staggered list.
 *
 * Rebuilt from the reference in this site's own tokens and components, sharing
 * the corner-pocket geometry used by the hero and the post cards.
 *
 * The reference's counters are again not reproduced — read time and date are
 * real values this site actually has, so those fill the meta slots instead.
 */

function Arrow({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="sp__arrow">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h13" />
        <path d="M13 7l5 5-5 5" />
      </svg>
    </Link>
  );
}

function FeatureCard({ article }: { article: Article }) {
  const href = articleHref(article);
  return (
    <article className="sp__card">
      <div className="sp__card-head">
        <span className="sp__eyebrow">
          {article.categoryMeta && <span className="sp__pill">{article.categoryMeta.name}</span>}
          <span aria-hidden="true">•</span>
          <span>{article.readingMinutes} min read</span>
        </span>
        <BookmarkButton slug={article.slug} title={article.title} />
      </div>

      <h3 className="sp__card-title">
        <Link href={href}>{article.title}</Link>
      </h3>

      <Link href={href} aria-label={article.title} tabIndex={-1} className="sp__card-media">
        <img
          src={coverFor(article)}
          alt={article.imageAlt ?? article.title}
          width={1240}
          height={775}
        />
      </Link>

      <p className="sp__card-excerpt">{article.description}</p>

      <span className="sp__notch" aria-hidden="true" />
      <Arrow href={href} label={`Read article: ${article.title}`} />
    </article>
  );
}

function ListItem({ article }: { article: Article }) {
  return (
    <Link href={articleHref(article)} className="sp__item">
      <img
        className="sp__thumb"
        src={squareCoverFor(article)}
        alt=""
        width={500}
        height={500}
        loading="lazy"
      />
      <div className="sp__item-body">
        <h3 className="sp__item-title">{article.title}</h3>
        <div className="sp__item-meta">
          <time dateTime={article.date}>{formatDate(article.updated ?? article.date)}</time>
          <span aria-hidden="true">•</span>
          <span>{article.readingMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}

export default function StaffPicks({
  features,
  items,
  title = 'Staff Picks',
  standfirst = 'Chosen by the editor, not by a ranking',
  href = '/articles/',
  standalone = false,
}: {
  features: Article[];
  items: Article[];
  title?: string;
  standfirst?: string;
  href?: string;
  standalone?: boolean;
}) {
  if (features.length === 0) return null;

  return (
    <section
      className={`sp${standalone ? ' sp--standalone' : ''}`}
      aria-labelledby="staff-picks-heading"
    >
      <div className="sp__inner">
        <div className="sp__bar">
          <div className="sp__bar-left">
            <h2 id="staff-picks-heading" className="sp__title">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c.6 5.9 5.5 10.8 12 12-6.5 1.2-11.4 6.1-12 12-.6-5.9-5.5-10.8-12-12C6.5 10.8 11.4 5.9 12 0z" />
              </svg>
              {title}
            </h2>
            <p className="sp__standfirst">{standfirst}</p>
          </div>

          <Link href={href} className="sp__more">
            <span className="sp__more-dot" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h13" />
                <path d="M13 7l5 5-5 5" />
              </svg>
            </span>
            View More
          </Link>
        </div>

        <div className="sp__features">
          {features.map((a) => (
            <FeatureCard key={a.slug} article={a} />
          ))}
        </div>

        {items.length > 0 && (
          <div className="sp__list">
            {items.map((a) => (
              <ListItem key={a.slug} article={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
