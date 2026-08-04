import Link from 'next/link';
import BookmarkButton from '@/components/BookmarkButton';
import { articleHref, coverFor, formatDate, type Article } from '@/lib/content';
import './magzin-hero.css';

/**
 * Home page hero: lead article on the left, a 2x2 tile grid on the right.
 *
 * Shared by the live home page and /design-preview/magzin-hero/, so the two
 * cannot drift. `standalone` adds the section's own background and gutters for
 * the preview page; the live page supplies its own container.
 *
 * One element of the reference is deliberately absent: its comment and view
 * counters. This site has neither, and inventing the numbers would put a
 * falsehood on the front page. Read time fills the slot and is real.
 */

function Arrow({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="mzh__arrow">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h13" />
        <path d="M13 7l5 5-5 5" />
      </svg>
    </Link>
  );
}

function Badge({ article }: { article: Article }) {
  if (!article.categoryMeta) return null;
  return <span className="mzh__badge">{article.categoryMeta.name}</span>;
}

function Lead({ article }: { article: Article }) {
  const href = articleHref(article);
  return (
    <article className="mzh__lead">
      <Link href={href} aria-label={article.title} tabIndex={-1} className="mzh__media mzh__card-link">
        <img
          className="mzh__img"
          src={coverFor(article)}
          alt={article.imageAlt ?? article.title}
          width={1240}
          height={853}
        />
        <Badge article={article} />
      </Link>

      <div className="mzh__lead-card">
        <div className="mzh__lead-head">
          <h2 className="mzh__lead-title">
            <Link href={href}>{article.title}</Link>
          </h2>
          <span className="mzh__save">
            <BookmarkButton slug={article.slug} title={article.title} />
          </span>
        </div>

        <p className="mzh__excerpt">{article.description}</p>

        <div className="mzh__meta">
          <div className="mzh__byline">
            <span className="mzh__avatar" aria-hidden="true">NXT</span>
            <span className="mzh__author">{article.author}</span>
            <span className="mzh__dot" aria-hidden="true">•</span>
            <time className="mzh__date" dateTime={article.date}>
              {formatDate(article.updated ?? article.date)}
            </time>
          </div>
          <span className="mzh__readtime">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {article.readingMinutes} min
          </span>
        </div>

        <span className="mzh__notch" aria-hidden="true" />
        <Arrow href={href} label={`Read article: ${article.title}`} />
      </div>
    </article>
  );
}

function Tile({ article }: { article: Article }) {
  const href = articleHref(article);
  return (
    <article className="mzh__tile">
      <div className="mzh__media">
        <Link href={href} aria-label={article.title} tabIndex={-1} className="mzh__card-link">
          <img
            className="mzh__img"
            src={coverFor(article)}
            alt={article.imageAlt ?? article.title}
            width={1240}
            height={880}
          />
        </Link>
        <Badge article={article} />
        <span className="mzh__notch" aria-hidden="true" />
        <Arrow href={href} label={`Read article: ${article.title}`} />
      </div>
      <h3 className="mzh__tile-title">
        <Link href={href}>{article.title}</Link>
      </h3>
    </article>
  );
}

export default function MagzinHero({
  lead,
  tiles,
  standalone = false,
}: {
  lead: Article;
  tiles: Article[];
  standalone?: boolean;
}) {
  return (
    <div className={`mzh${standalone ? ' mzh--standalone' : ''}`}>
      <div className="mzh__grid">
        <Lead article={lead} />
        <div className="mzh__tiles">
          {tiles.map((a) => (
            <Tile key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
