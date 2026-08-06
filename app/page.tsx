import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import ForYou from '@/components/ForYou';
import HomeConnect from '@/components/HomeConnect';
import MagzinHero from '@/components/MagzinHero';
import SectionHeading from '@/components/SectionHeading';
import StaffPicks from '@/components/StaffPicks';
import { FeaturedPostCard, CompactPostCard } from '@/components/PostCards';
import BookmarkButton from '@/components/BookmarkButton';
import AuthorByline from '@/components/AuthorByline';
import { resolveAuthor } from '@/lib/authors';
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
 * Round CTA, either detached in a cut-out or sitting in normal flow.
 *
 * `variant` picks the placement — see .card-arrow / .image-arrow / .inline-arrow
 * in globals.css. The first two are absolutely positioned against a mask cut-out;
 * `inline` is the same control in normal flow, for a card with no notch. Size,
 * hover motion, focus ring and reduced-motion all live in CSS, so no card
 * carries its own geometry.
 */
function CircleCta({
  href,
  label,
  variant = 'card',
  className = '',
}: {
  href: string;
  label: string;
  variant?: 'card' | 'image' | 'inline';
  className?: string;
}) {
  // Surface, ring and ink come from the shared tokens in globals.css; only the
  // hover treatment is set here.
  const tone = 'hover:bg-brand-600 hover:text-white hover:border-brand-600';
  const placement = { card: 'card-arrow', image: 'image-arrow', inline: 'inline-arrow' }[variant];

  return (
    <Link
      href={href}
      aria-label={label}
      className={`${placement} ${tone} ${className}`}
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
    <span className="pointer-events-none absolute top-4 right-4 z-10 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm">
      {article.categoryMeta.name}
    </span>
  );
}

/** Author chip. No avatars exist, so the brand mark stands in rather than a stock face. */
function Byline({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <AuthorByline author={resolveAuthor(article.author)} size={32} />
      <span aria-hidden="true" className="text-slate-300">•</span>
      <time dateTime={article.date} className="text-slate-500 dark:text-slate-400">
        {formatDate(article.updated ?? article.date)}
      </time>
    </div>
  );
}

/**
 * Lead: full-width cover, then a bordered card beneath carrying the headline,
 * excerpt, byline and read CTA.
 *
 * The card is plain — no notch. The round CTA sits in the meta row rather than
 * hanging off the corner, so nothing has to escape a mask.
 */
function Lead({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col gap-5">
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

      <div className="relative rounded-lg border border-slate-200 bg-white p-6 pb-14 sm:p-7 sm:pb-16 dark:border-card-edge dark:bg-card magzin-style-card">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-[1.75rem] dark:text-white">
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

        <span className="post-card__notch" aria-hidden="true" />

        <Link
          href={articleHref(article)}
          aria-label={`Read article: ${article.title}`}
          className="post-card__arrow"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h13" />
            <path d="M13 7l5 5-5 5" />
          </svg>
        </Link>
      </div>
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
    <article className="secondary-post-card magzin-style-card flex h-full flex-col">
      <div className="post-card__media flex-1 min-h-[130px]">
        <Link
          href={articleHref(article)}
          aria-label={article.title}
          tabIndex={-1}
          className="post-card__image-link"
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

        <span className="post-card__notch" aria-hidden="true" />

        <Link
          href={articleHref(article)}
          aria-label={`Read article: ${article.title}`}
          className="post-card__arrow"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h13" />
            <path d="M13 7l5 5-5 5" />
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
    <article className="group magzin-style-card">
      <div className="post-card__media aspect-[2/1] w-full rounded-lg">
        <Link href={articleHref(article)} aria-label={article.title} tabIndex={-1} className="post-card__image-link">
          <img
            src={coverFor(article)}
            alt=""
            width={1240}
            height={700}
            className="post-card__image object-left"
          />
        </Link>

        {article.categoryMeta && (
          <span className="post-card__category">{article.categoryMeta.name}</span>
        )}

        <span className="post-card__notch" aria-hidden="true" />

        <Link
          href={articleHref(article)}
          aria-label={`Read article: ${article.title}`}
          className="post-card__arrow"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h13" />
            <path d="M13 7l5 5-5 5" />
          </svg>
        </Link>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-slate-900 dark:text-white">
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/10"
          />
        </Link>
        {lead.categoryMeta && (
          <span className="pointer-events-none absolute left-5 top-5 z-10 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-900 shadow-sm backdrop-blur">
            {lead.categoryMeta.name}
          </span>
        )}

        <div className="relative mx-6 -mt-28 flex flex-1 flex-col overflow-hidden rounded-lg border border-white/50 bg-white/65 p-7 pb-14 shadow-lg backdrop-blur-lg sm:mx-8 sm:pb-16 dark:border-card-edge/60 dark:bg-card/65 magzin-style-card">
          <h3 className="pr-10 text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
            <Link href={articleHref(lead)} className="hover:text-brand-700 dark:hover:text-brand-400">
              {lead.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {lead.description}
          </p>
          <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
            <Byline article={lead} />
            <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <ClockIcon />
              {lead.readingMinutes} mins read
            </span>
          </div>

          <span className="post-card__notch" aria-hidden="true" />

          <Link
            href={articleHref(lead)}
            aria-label={`Read article: ${lead.title}`}
            className="post-card__arrow"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13" />
              <path d="M13 7l5 5-5 5" />
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

export default async function HomePage() {
  const articles = await getAllArticles();
  const featured = articles.filter((a) => a.featured);
  const lead = featured[0] ?? articles[0];

  const rest = articles.filter((a) => a.slug !== lead?.slug);
  const secondary = rest.slice(0, 4);
  const latest = rest.slice(4, 10);

  /*
   * The two lower sections each show ONE category, so the heading and the posts
   * beneath it can never disagree — the same rule the old category rows followed.
   * The layouts are the new ones; only the source of the articles is pinned.
   */
  const buyingItems = articles.filter((a) => a.category === 'buying-guides');
  const spFeatures = buyingItems.slice(0, 3);
  const spItems = buyingItems.slice(3, 9);

  const hubsItems = articles.filter((a) => a.category === 'hubs-and-platforms');
  const fyLead = hubsItems[0];
  const fyTiles = hubsItems.slice(1, 3);
  const fyRows = hubsItems.slice(3, 5);
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
  const buyingCategory = cats.find((c) => c.key === 'buying-guides');
  const buyingData = buyingCategory ? { category: buyingCategory, items: articles.filter((a) => a.category === 'buying-guides') } : null;

  const ROW_CATEGORIES: CategoryKey[] = ['hubs-and-platforms'];
  const rows = ROW_CATEGORIES.map((key) => cats.find((c) => c.key === key))
    .filter((c): c is NonNullable<typeof c> => Boolean(c && c.count > 0))
    .map((c) => ({ category: c, items: articles.filter((a) => a.category === c.key) }));

  return (
    <>
      {/* Masthead strip */}
      {/*
        The strip sits between the header and the hero.

        A soft left-to-right wash rather than the solid dark bar it used to be:
        brand lavender (#f1f0ff, brand-50) fading through white into a warm
        accent tint derived from accent-400. Both ends come from the site's own
        palette, so it reads as this brand rather than as a stock gradient.

        The type is dark now because the strip is light — white on brand-50
        measures about 1.2:1 and would be invisible.

        Dark mode keeps a dark strip, tinted with brand-950 rather than pure
        grey so the same colour relationship survives the theme switch.
      */}
      <section className="border-0 bg-gradient-to-r from-brand-50 via-white to-[#fff3e6] px-4 py-3 dark:from-brand-950/40 dark:via-[#202020]/50 dark:to-accent-600/10">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">
            Made for Australian homes
          </span>
          <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
          <span>240V wiring, AS/NZS rules, local retailers and warranty law</span>
        </div>
      </section>

      <div className="mx-auto max-w-site px-4 py-10">
        {lead && (
          <section className="mb-14" aria-labelledby="lead-heading">
            <h2 id="lead-heading" className="sr-only">
              Featured articles
            </h2>
            {/*
              The same component the design preview renders, so the two cannot
              drift. No `standalone`: this page supplies its own container and
              background, and the section must not add a second set of gutters.
            */}
            <MagzinHero lead={lead} tiles={secondary} />
          </section>
        )}

        <PopularTopics topics={topics} />

        {/* Buying Guides, in the Staff Picks layout. */}
        <div className="mb-14">
          <StaffPicks
            title="Buying Guides"
            standfirst="What to look for before you spend"
            href="/categories/buying-guides/"
            features={spFeatures}
            items={spItems}
          />
        </div>

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

        {/* Hubs & Platforms, in the For You layout. */}
        <div className="mt-16">
          <ForYou
            title="Hubs & Platforms"
            standfirst="The choice everything else depends on"
            href="/categories/hubs-and-platforms/"
            lead={fyLead}
            tiles={fyTiles}
            rows={fyRows}
          />
        </div>

        

        

        <HomeConnect />
      </div>
    </>
  );
}
