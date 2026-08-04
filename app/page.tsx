import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import HomeConnect from '@/components/HomeConnect';
import { FeaturedPostCard, CompactPostCard } from '@/components/PostCards';
import {
  articleHref,
  categoriesWithCounts,
  coverFor,
  squareCoverFor,
  formatDate,
  getAllArticles,
  typeLabels,
  type Article,
} from '@/lib/content';
import { categories, site, type CategoryKey } from '@/lib/site';

/**
 * Magazine-style home page.
 *
 * Structure follows the Magzin "Home 2" reference: a dominant hero, a three-card
 * secondary row, a main column beside a trending sidebar, per-category rows, and
 * a closing CTA.
 *
 * Two deliberate departures from the reference:
 *  - No engagement metrics. The reference shows comment and view counts; this site
 *    has neither, and inventing them would be a lie on the front page. Read time
 *    and date carry the same "is this worth my time" signal honestly.
 *  - No "become an author" block. This is a single-author independent site, so the
 *    slot is used for the how-we-test trust CTA instead.
 */

function CategoryBadge({ article }: { article: Article }) {
  if (!article.categoryMeta) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-400/15 dark:text-brand-300">
      <span aria-hidden="true">{article.categoryMeta.emoji}</span>
      {article.categoryMeta.name}
    </span>
  );
}

function Meta({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
      <time dateTime={article.date}>{formatDate(article.updated ?? article.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{article.readingMinutes} min read</span>
      <span aria-hidden="true">·</span>
      <span>{typeLabels[article.type] ?? article.type}</span>
    </div>
  );
}


/**
 * Round CTA that sits in a card's or image's cut-out.
 *
 * `variant` picks which cut-out it aligns to — see .card-arrow / .image-arrow in
 * globals.css. Position, size, hover motion, focus ring and reduced-motion all
 * live in CSS, so no card carries its own geometry.
 */
function CircleCta({
  href,
  label,
  variant = 'card',
  className = '',
}: {
  href: string;
  label: string;
  variant?: 'card' | 'image';
  className?: string;
}) {
  // Surface, ring and ink come from the shared tokens in globals.css; only the
  // hover treatment is set here.
  const tone = 'hover:bg-brand-600 hover:text-white hover:border-brand-600';

  return (
    <Link
      href={href}
      aria-label={label}
      className={`${variant === 'card' ? 'card-arrow' : 'image-arrow'} ${tone} ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}


/** Category pill overlaid on a cover, bottom-left. */
function CoverPill({ article }: { article: Article }) {
  if (!article.categoryMeta) return null;
  return (
    <span className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm">
      {article.categoryMeta.name}
    </span>
  );
}

/** Author chip. No avatars exist, so the brand mark stands in rather than a stock face. */
function Byline({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-600 text-[10px] font-extrabold text-white">
        NXT
      </span>
      <span className="font-semibold text-slate-800 dark:text-slate-200">{article.author}</span>
      <span aria-hidden="true" className="text-slate-300">•</span>
      <time dateTime={article.date} className="text-slate-500 dark:text-slate-400">
        {formatDate(article.updated ?? article.date)}
      </time>
    </div>
  );
}

/**
 * Lead: full-width cover, then a detached bordered card beneath carrying the
 * headline, excerpt and byline.
 */
function Lead({ article }: { article: Article }) {
  return (
    <article className="relative flex h-full flex-col gap-5">
      <Link
        href={articleHref(article)}
        className="group relative block overflow-hidden rounded-lg"
      >
        <img
          src={coverFor(article)}
          alt=""
          width={1200}
          height={675}
          className="aspect-[62/35] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <CoverPill article={article} />
      </Link>

      <div className="notched-card relative rounded-2xl border border-slate-200 bg-white p-6 pb-14 sm:p-7 sm:pb-16 dark:border-card-edge dark:bg-card">
        <h2 className="pr-10 text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-[1.75rem] dark:text-white">
          <Link href={articleHref(article)} className="hover:text-brand-700 dark:hover:text-brand-400">
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-400">
          {article.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-card-edge">
          <Byline article={article} />
          <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <ClockIcon />
            {article.readingMinutes} min read
          </span>
        </div>

        {/*
          The reference also puts a bookmark button on this card. It is not
          reproduced: there is no save feature behind it, and a control that looks
          real but does nothing is worse than no control.
        */}
      </div>

      {/*
        Detached: it lives outside the notched card so the mask cannot clip it,
        and sits in the cut-out corner the mask leaves behind.
      */}
      <CircleCta href={articleHref(article)} label={`Read ${article.title}`} />
    </article>
  );
}

/**
 * Grid tile: cover with pill and arrow overlaid, headline beneath.
 *
 * The cover has no fixed ratio — it flexes to fill whatever height the row gives
 * it, so all four tiles match each other and the column matches the lead beside
 * it. Anchored left, which keeps the baked-in headline when the flexed height
 * makes the crop narrower than the artwork.
 */
function TileCard({ article }: { article: Article }) {
  return (
    <article className="post-card group">
      <div className="post-card__image-wrap">
        <Link
          href={articleHref(article)}
          aria-label={article.title}
          tabIndex={-1}
          className="block h-full"
        >
          <img
            className="post-card__image"
            src={squareCoverFor(article)}
            alt={article.imageAlt ?? article.title}
            width={500}
            height={500}
            loading="lazy"
          />
        </Link>

        {article.categoryMeta && (
          <span className="post-card__category">{article.categoryMeta.name}</span>
        )}

        <Link
          href={articleHref(article)}
          aria-label={`Read article: ${article.title}`}
          className="post-card__arrow"
        >
          {/* Thin stroked arrow, not a glyph — matches the reference weight. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      <h3 className="post-card__title">
        <Link href={articleHref(article)}>{article.title}</Link>
      </h3>
    </article>
  );
}

/**
 * Compact list row: thumbnail left, headline and meta right.
 *
 * `square` switches the thumbnail from the covers' native 62:35 to a square crop.
 * Anchored left either way, so the headline baked into the artwork survives the
 * tighter crop.
 */
function ListRow({ article, square = false }: { article: Article; square?: boolean }) {
  return (
    <article className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-brand-400 dark:border-card-edge dark:bg-card/40 dark:hover:border-brand-500">
      <Link
        href={articleHref(article)}
        className={`block shrink-0 overflow-hidden rounded-lg ${square ? 'w-[6.5rem]' : 'w-28 sm:w-32'}`}
      >
        <img
          src={coverFor(article)}
          alt=""
          width={1240}
          height={700}
          className={`w-full rounded-lg object-cover object-left transition duration-500 group-hover:scale-[1.05] ${
            square ? 'aspect-square' : 'aspect-[62/35]'
          }`}
        />
      </Link>
      <div className="min-w-0">
        <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-white">
          <Link href={articleHref(article)} className="hover:text-brand-700 dark:hover:text-brand-400">
            {article.title}
          </Link>
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <time dateTime={article.date} className="font-medium text-brand-700 dark:text-brand-400">
            {formatDate(article.updated ?? article.date)}
          </time>
          <span aria-hidden="true" className="text-slate-300">•</span>
          <span className="text-slate-500 dark:text-slate-400">{article.readingMinutes} mins read</span>
        </div>
      </div>
    </article>
  );
}

/**
 * "Most Popular Topics": a scrolling row of category chips, each on a darkened
 * cover with the topic name and its article count.
 *
 * "Popular" here means most published — the ordering is by article count, which
 * is a fact this site actually holds. It is not a traffic ranking, because there
 * is no traffic data to rank by.
 *
 * The artwork is the newest cover in each category, so the row always shows real
 * imagery from the section it links to.
 */
function PopularTopics({
  topics,
}: {
  topics: { slug: string; name: string; count: number; cover: string }[];
}) {
  if (!topics.length) return null;

  return (
    <section className="mb-14" aria-labelledby="topics-row-heading">
      <h2
        id="topics-row-heading"
        className="text-base font-bold tracking-tight text-slate-900 dark:text-white"
      >
        Most Popular Topics
      </h2>

      {/*
        A six-column grid rather than a flex row: every chip takes an equal share
        of the container, so the row ends flush with both edges at any width and
        nothing is left over. Two up on mobile, three on small, six from lg.
      */}
      <div className="mt-5">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {topics.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/categories/${t.slug}/`}
                className="group relative block h-[5.5rem] w-full overflow-hidden rounded-lg"
              >
                <img
                  src={t.cover}
                  alt=""
                  width={1240}
                  height={700}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {/* Darkened so white type stays legible over any cover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-slate-900/55 transition group-hover:bg-slate-900/45"
                />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-3 text-center">
                  <span className="w-full truncate text-sm font-bold text-white">{t.name}</span>
                  <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                    {t.count} {t.count === 1 ? 'post' : 'posts'}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Tile used inside CategoryFeature: cover with the category pill sitting inside
 * the bottom-left corner and the round "read" affordance straddling the bottom-right
 * edge, headline beneath.
 *
 * Separate from TileCard because the arrow here breaks out of the image bounds,
 * which needs the clipping wrapper and the positioning context to be different
 * elements. The hero tiles keep their contained arrow.
 */
function FeatureTile({ article }: { article: Article }) {
  return (
    <article className="group">
      <div className="article-image-wrap">
        <Link href={articleHref(article)} aria-label={article.title} className="block overflow-hidden rounded-lg">
          <img
            src={coverFor(article)}
            alt=""
            width={1240}
            height={700}
            className="notched-image aspect-[2/1] w-full rounded-lg object-cover object-left transition duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        {article.categoryMeta && (
          <span className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm">
            {article.categoryMeta.name}
          </span>
        )}

        <CircleCta href={articleHref(article)} label={`Read ${article.title}`} variant="image" />
      </div>

      <h3 className="mt-8 text-lg font-bold leading-snug text-slate-900 dark:text-white">
        <Link href={articleHref(article)} className="hover:text-brand-700 dark:hover:text-brand-400">
          {article.title}
        </Link>
      </h3>
    </article>
  );
}

/** Small clock glyph — stands in for the reference's comment/view icons. */
function ClockIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}


/**
 * Feature block for a category: one lead with the headline card overlapping the
 * bottom of its cover, two tiles, and two compact list rows. Renders whatever
 * exists — a category with three articles simply shows fewer slots.
 *
 * The reference puts a comment count and a view count in the lead card's footer.
 * This site measures neither, so the slot carries read time instead — same
 * "is this worth my time" signal, without inventing engagement numbers.
 */
function CategoryFeature({ items }: { items: Article[] }) {
  const [lead, ...rest] = items;
  const tiles = rest.slice(0, 2);
  const rows = rest.slice(2, 4);
  if (!lead) return null;

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
      {/* Lead: pill top-left, frosted card overlapping the foot of the cover */}
      <article className="group relative flex h-full flex-col">
        <Link
          href={articleHref(lead)}
          className="relative block overflow-hidden rounded-lg"
        >
          <img
            src={coverFor(lead)}
            alt=""
            width={1000}
            height={500}
            className="aspect-[62/35] w-full rounded-lg object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          {/*
            Soft scrim across the upper two-thirds. The covers carry their own
            headline, and this 4:3 box crops a 2:1 image, so that baked-in text
            lands part-cropped behind the card that already states the title.
            Veiling it turns a competing artefact into depth, and it lifts the
            contrast of the category pill sitting on top.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-slate-900/55 via-slate-900/25 to-transparent"
          />
        </Link>
        {lead.categoryMeta && (
          <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-900 shadow-sm backdrop-blur">
            {lead.categoryMeta.name}
          </span>
        )}

        <div className="relative mx-6 -mt-28 flex flex-1 flex-col rounded-lg border border-white/40 bg-white/85 p-7 shadow-lg backdrop-blur-md sm:mx-8 dark:border-card-edge/60 dark:bg-card/85">
          <h3 className="pr-10 text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
            <Link href={articleHref(lead)} className="hover:text-brand-700 dark:hover:text-brand-400">
              {lead.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {lead.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2 lg:mt-auto">
            <Byline article={lead} />
            <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <ClockIcon />
              {lead.readingMinutes} mins read
            </span>
          </div>

          <Link
            href={articleHref(lead)}
            aria-label={`Read ${lead.title}`}
            className="absolute -bottom-5 right-6 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-md transition hover:bg-brand-600 hover:text-white dark:border-card-edge dark:bg-card dark:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </article>

      {/* Right: two tiles above, two list rows below */}
      <div className="flex h-full flex-col gap-8">
        {tiles.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {tiles.map((a) => (
              <FeatureTile key={a.slug} article={a} />
            ))}
          </div>
        )}
        {rows.length > 0 && (
          <div className="flex flex-col gap-4">
            {rows.map((a) => (
              <ListRow key={a.slug} article={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Horizontal card: thumbnail left, text right. Used in the main column. */
function WideCard({ article }: { article: Article }) {
  return (
    <article className="group grid gap-4 border-b border-slate-200 pb-6 sm:grid-cols-[13rem_1fr] dark:border-card-edge">
      <Link href={articleHref(article)} className="block overflow-hidden rounded-lg">
        <img
          src={coverFor(article)}
          alt=""
          width={1200}
          height={675}
          className="aspect-[62/35] w-full rounded-lg object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div>
        <CategoryBadge article={article} />
        <h3 className="mt-2 text-xl font-bold leading-snug text-slate-900 dark:text-white">
          <Link href={articleHref(article)} className="hover:text-brand-700 dark:hover:text-brand-400">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {article.description}
        </p>
        <div className="mt-3">
          <Meta article={article} />
        </div>
      </div>
    </article>
  );
}

/** Numbered sidebar list — the reference's "trending" widget. */
function RankedItem({ article, rank }: { article: Article; rank: number }) {
  return (
    <li className="flex gap-3 border-b border-slate-200 pb-4 last:border-0 last:pb-0 dark:border-card-edge">
      <span className="text-2xl font-extrabold leading-none text-slate-200 tabular-nums dark:text-slate-700">
        {String(rank).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-bold leading-snug text-slate-900 dark:text-white">
          <Link href={articleHref(article)} className="hover:text-brand-700 dark:hover:text-brand-400">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {article.readingMinutes} min read
        </p>
      </div>
    </li>
  );
}

/**
 * Section heading: a bordered bar carrying a sparkle mark, the title, a short
 * standfirst, and a round "view more" control on the right.
 *
 * `compact` drops the card and the round control for the narrow sidebar, where a
 * full-width bar with a 3rem button would not fit.
 */
function SectionHeading({
  title,
  subtitle,
  href,
  id,
  compact = false,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  id: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="mb-4 flex items-end justify-between gap-3 border-b border-slate-200 pb-2 dark:border-card-edge">
        <h2 id={id} className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 dark:text-white">
          <Sparkle />
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="shrink-0 text-sm font-semibold text-brand-700 hover:underline dark:text-brand-400"
          >
            View all
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-lg border border-slate-200 bg-white px-6 py-5 sm:px-8 dark:border-card-edge dark:bg-card">
      <div className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2
          id={id}
          className="flex items-baseline gap-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <Sparkle />
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>

      {href && (
        <Link href={href} className="group flex shrink-0 items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-900 text-white transition group-hover:bg-brand-600 dark:bg-white dark:text-slate-900 dark:group-hover:bg-brand-500 dark:group-hover:text-white">
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </span>
          <span className="text-sm text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white">
            View More
          </span>
        </Link>
      )}
    </div>
  );
}

/** Four-pointed star that opens each section heading. */
function Sparkle() {
  return (
    <svg
      aria-hidden="true"
      className="h-[0.85em] w-[0.85em] shrink-0 self-center text-slate-900 dark:text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c.6 5.9 5.5 10.8 12 12-6.5 1.2-11.4 6.1-12 12-.6-5.9-5.5-10.8-12-12C6.5 10.8 11.4 5.9 12 0z" />
    </svg>
  );
}

export default async function HomePage() {
  const articles = await getAllArticles();
  const featured = articles.filter((a) => a.featured);
  const lead = featured[0] ?? articles[0];

  const rest = articles.filter((a) => a.slug !== lead?.slug);
  const secondary = rest.slice(0, 4);
  const latest = rest.slice(4, 10);
  const trending = [...articles].sort((a, b) => b.wordCount - a.wordCount).slice(0, 5);
  const cats = categoriesWithCounts(articles);

  // Ordered by how much has actually been published, and illustrated with the
  // newest cover from each category.
  const topics = cats
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
    .map((c) => {
      const newest = articles.find((a) => a.category === c.key);
      return { slug: c.slug, name: c.name, count: c.count, cover: newest ? coverFor(newest) : '' };
    })
    .filter((t) => t.cover);

  // Category rows, deepest first, so the front page leads with real depth.
  /*
   * Category rows, in the order they appear on the page.
   *
   * Chosen explicitly rather than "the two with the most articles": each row's
   * heading comes from the category it actually lists, so the title and the posts
   * beneath it can never disagree.
   */
  const ROW_CATEGORIES: CategoryKey[] = ['buying-guides', 'hubs-and-platforms'];
  const rows = ROW_CATEGORIES.map((key) => cats.find((c) => c.key === key))
    .filter((c): c is NonNullable<typeof c> => Boolean(c && c.count > 0))
    .map((c) => ({ category: c, items: articles.filter((a) => a.category === c.key) }));

  return (
    <>
      {/* Masthead strip */}
      {/*
        The strip sits between the header and the hero. In dark mode it is a
        half-opaque #202020 so the page background reads through it and it does
        not become a second solid bar under the header.
      */}
      <section className="border-0 bg-slate-900 px-4 py-3 dark:bg-[#202020]/50">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-slate-300">
          <span className="font-semibold text-white">Made for Australian homes</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>240V wiring, AS/NZS rules, local retailers and warranty law</span>
        </div>
      </section>

      <div className="mx-auto max-w-site px-4 py-10">
        {lead && (
          <section className="mb-14" aria-labelledby="lead-heading">
            <h2 id="lead-heading" className="sr-only">
              Featured articles
            </h2>
            {/* Lead on the left; a 2x2 tile grid on the right. */}
            <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
              <Lead article={lead} />
              {/*
                Two equal rows filling the column's full height, so the right side
                always ends level with the left. Each tile's cover is the flexible
                part, so the images size themselves to whatever height is left.
              */}
              <div className="grid h-full gap-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-6">
                {secondary.map((article) => (
                  <TileCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        <PopularTopics topics={topics} />

        {/* Main column + sidebar */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12">
          <section aria-labelledby="latest-heading">
            <SectionHeading
              id="latest-heading"
              title="Latest"
              subtitle="Fresh guides, reviews and explainers."
              href="/articles/"
            />
            <div className="flex flex-col gap-6">
              {latest.map((article) => (
                <WideCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          <aside className="flex flex-col gap-10">
            <div>
              <SectionHeading id="trending-heading" title="Most in depth" compact />
              <ol className="flex flex-col gap-4">
                {trending.map((article, i) => (
                  <RankedItem key={article.slug} article={article} rank={i + 1} />
                ))}
              </ol>
            </div>

            <div>
              <SectionHeading id="topics-heading" title="Topics" href="/categories/" compact />
              <ul className="flex flex-col gap-1">
                {cats.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/categories/${category.slug}/`}
                      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span aria-hidden="true">{category.emoji}</span>
                        <span className="truncate">{category.name}</span>
                      </span>
                      <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium tabular-nums text-slate-500 dark:bg-card dark:text-slate-400">
                        {category.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-card-edge dark:bg-card/50">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Why trust {site.shortName}?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                We say when something has not been tested, we disclose every commercial link,
                and if a product is a bad buy we say so.
              </p>
              <Link
                href="/how-we-test/"
                className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                How we test
              </Link>
            </div>
          </aside>
        </div>

        {/* Per-category rows */}
        {rows.map(({ category, items }, i) => (
          <section key={category.slug} className="mt-16" aria-labelledby={`row-${category.slug}`}>
            <SectionHeading
              id={`row-${category.slug}`}
              title={category.name}
              subtitle={`${category.count} ${category.count === 1 ? 'article' : 'articles'} in this topic.`}
              href={`/categories/${category.slug}/`}
            />
            {i === 0 ? (
              <CategoryFeature items={items} />
            ) : (
              /*
                One bordered group holding both halves, so the three featured cards
                and the compact list below them read as a single block rather than
                two stacked sections.

                Both halves come from this row's category: the first three articles
                are featured, and whatever remains fills the compact list. No
                article appears twice, and nothing from another topic appears here.
              */
              <div className="category-block">
                <div className="featured-post-grid">
                  {items.slice(0, 3).map((article) => (
                    <FeaturedPostCard key={article.slug} article={article} />
                  ))}
                </div>

                {items.length > 3 && (
                  <div className="compact-post-grid">
                    {items.slice(3).map((article) => (
                      <CompactPostCard key={`more-${article.slug}`} article={article} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        ))}

        <HomeConnect />
      </div>
    </>
  );
}
