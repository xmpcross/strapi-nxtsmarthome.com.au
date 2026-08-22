import Link from 'next/link';
import {
  articleHref,
  coverFor,
  formatDate,
  squareCoverFor,
  type Article,
} from '@/lib/content';
import './for-you.css';

/**
 * "For you": an overlaid lead beside two tiles and two compact rows.
 *
 * Same token names and pocket geometry as MagzinHero and StaffPicks, so the
 * three sections stay one family. The difference is the lead — its text panel
 * sits on the artwork rather than beneath it.
 *
 * As elsewhere, the reference's comment and view counters are not reproduced.
 * There are none to report, and inventing them would be a falsehood on the front
 * page. Date and read time fill the meta slots and are real.
 */

function Arrow({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="fy__arrow">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h13" />
        <path d="M13 7l5 5-5 5" />
      </svg>
    </Link>
  );
}

function Lead({ article }: { article: Article }) {
  const href = articleHref(article);
  return (
    <article className="fy__lead">
      {/* Image and panel are siblings, not nested. The panel is pulled up over the
          artwork in CSS and hangs past its bottom edge, so they stack as two
          planes rather than one framed picture with a caption inside it. */}
      <div className="fy__media">
        <Link href={href} aria-label={article.title} tabIndex={-1} className="fy__clip">
          <img
            className="fy__img"
            src={coverFor(article)}
            alt={article.imageAlt ?? article.title}
            width={1240}
            height={877}
          />
        </Link>
        {article.categoryMeta && <span className="fy__badge">{article.categoryMeta.name}</span>}
      </div>

      <div className="fy__panel">
        <h3 className="fy__panel-title">
          <Link href={href}>{article.title}</Link>
        </h3>
        <p className="fy__panel-excerpt">{article.description}</p>
        <div className="fy__panel-meta">
          <div className="fy__byline">
            <span className="fy__avatar" aria-hidden="true">NXT</span>
            <span className="fy__author">{article.author}</span>
            <span className="fy__dot" aria-hidden="true">•</span>
            <time className="fy__date" dateTime={article.date}>
              {formatDate(article.updated ?? article.date)}
            </time>
          </div>
          <span className="fy__readtime">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {article.readingMinutes} min
          </span>
        </div>

        {/* Hangs off the panel's corner — the panel is the positioning context. */}
        <span className="fy__notch" aria-hidden="true" />
        <Arrow href={href} label={`Read article: ${article.title}`} />
      </div>
    </article>
  );
}

function Tile({ article }: { article: Article }) {
  const href = articleHref(article);
  return (
    <article className="fy__tile">
      <div className="fy__media">
        <Link href={href} aria-label={article.title} tabIndex={-1} className="fy__clip">
          <img
            className="fy__img"
            src={coverFor(article)}
            alt={article.imageAlt ?? article.title}
            width={1240}
            height={930}
          />
        </Link>
        {article.categoryMeta && <span className="fy__badge">{article.categoryMeta.name}</span>}
        <span className="fy__notch" aria-hidden="true" />
        <Arrow href={href} label={`Read article: ${article.title}`} />
      </div>
      <h3 className="fy__tile-title">
        <Link href={href}>{article.title}</Link>
      </h3>
    </article>
  );
}

function Row({ article }: { article: Article }) {
  return (
    <Link href={articleHref(article)} className="fy__row">
      <img
        className="fy__thumb"
        src={squareCoverFor(article)}
        alt=""
        width={500}
        height={500}
        loading="lazy"
      />
      <div className="fy__row-body">
        <h3 className="fy__row-title">{article.title}</h3>
        <div className="fy__row-meta">
          <time dateTime={article.date}>{formatDate(article.updated ?? article.date)}</time>
          <span aria-hidden="true">•</span>
          <span>{article.readingMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}

export default function ForYou({
  lead,
  tiles,
  rows,
  title = 'For you',
  standfirst = 'More from across the site',
  href = '/articles/',
  standalone = false,
}: {
  lead?: Article;
  tiles: Article[];
  rows: Article[];
  title?: string;
  standfirst?: string;
  href?: string;
  standalone?: boolean;
}) {
  if (!lead) return null;

  return (
    <section className={`fy${standalone ? ' fy--standalone' : ''}`} aria-labelledby="for-you-heading">
      <div className="fy__inner">
        <div className="fy__bar">
          <div className="fy__bar-left">
            <h2 id="for-you-heading" className="fy__title">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="sparkle-twinkle">
                <path d="M12 0c.6 5.9 5.5 10.8 12 12-6.5 1.2-11.4 6.1-12 12-.6-5.9-5.5-10.8-12-12C6.5 10.8 11.4 5.9 12 0z" />
              </svg>
              {title}
            </h2>
            <p className="fy__standfirst">{standfirst}</p>
          </div>

          <Link href={href} className="fy__more">
            <span className="fy__more-dot" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h13" />
                <path d="M13 7l5 5-5 5" />
              </svg>
            </span>
            View More
          </Link>
        </div>

        <div className="fy__grid">
          <Lead article={lead} />
          <div className="fy__side">
            <div className="fy__tiles">
              {tiles.map((a) => (
                <Tile key={a.slug} article={a} />
              ))}
            </div>
            <div className="fy__rows">
              {rows.map((a) => (
                <Row key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
