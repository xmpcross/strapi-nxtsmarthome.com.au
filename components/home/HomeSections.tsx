import Link from 'next/link'
import Card11 from '@/components/PostCards/Card11'
import ProductCard from '@/components/ProductCard'
import HeadingWithSub from '@/shared/Heading'
import type { TCategory } from '@/data/categories'
import type { TPost } from '@/data/posts'
import type { TopProduct } from '@/lib/products'
import { getCategory, site } from '@/lib/site'
import { AFFILIATE_ENABLED } from '@/lib/affiliate'

/*
 * Home page sections added in the SEO redesign (24 Sep 2026). The page used to
 * be cards only: an h1 hidden from view, a topic image slider and ten magazine
 * blocks, with almost no text a search engine could read as the page's subject,
 * and no link to the product pages that carry real editorial. These add a
 * visible h1 and intro, text-rich topic links, a "start here" set, the
 * researched product pages, and the research/trust statement.
 */

export function HomeHero({ articleCount, topicCount }: { articleCount: number; topicCount: number }) {
  return (
    <section>
      <p className="text-sm font-semibold tracking-wider text-primary-700 uppercase dark:text-primary-300">
        Independent · Australian
      </p>
      <h1 className="mt-3 max-w-3xl text-[2.5rem] leading-tight font-bold tracking-tight text-neutral-900 dark:text-white">
        Smart home guides for Australian homes
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
        Buying guides, setup help and plain-English explainers for smart lighting, security
        cameras, energy monitoring, climate control, robot vacuums and the platforms that tie
        them together, written for 230V wiring, Australian retailers and renters as well as
        owners. {articleCount} articles across {topicCount} topics.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/articles/"
          className="inline-flex items-center rounded-lg bg-primary-600 px-5 py-2.5 font-semibold text-white transition hover:bg-primary-700"
        >
          Browse all guides
        </Link>
        <Link
          href="/all-topics/"
          className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-5 py-2.5 font-semibold text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
        >
          Explore topics
        </Link>
      </div>
      <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
        Research-based, not lab-tested: see{' '}
        <Link href="/how-we-test/" className="font-medium text-primary-700 underline underline-offset-2 dark:text-primary-300">
          how we research
        </Link>
        .
      </p>
    </section>
  )
}

/** One topic tile: emoji, guide count, what it covers and the newest article. Shared with /all-topics/. */
export function TopicTile({ topic }: { topic: TCategory }) {
  const newest = topic.posts?.[0]
  return (
    <Link
      href={`/categories/${topic.handle}/`}
      className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-700"
    >
      <span className="flex items-center justify-between gap-3">
        <span
          className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-2xl dark:bg-primary-950/60"
          aria-hidden="true"
        >
          {getCategory(topic.handle)?.emoji}
        </span>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          {topic.count} {topic.count === 1 ? 'guide' : 'guides'}
        </span>
      </span>
      <span className="mt-5 text-lg font-bold text-neutral-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
        {topic.name}
      </span>
      <span className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{topic.description}</span>
      {newest && (
        <span className="mt-auto border-t border-neutral-100 pt-4 text-sm dark:border-neutral-800">
          <span className="mt-4 block text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
            Latest
          </span>
          <span className="mt-1 line-clamp-2 block font-medium text-neutral-800 dark:text-neutral-200">{newest.title}</span>
        </span>
      )}
    </Link>
  )
}

/**
 * Browse by topic, redesigned (6 Oct 2026): a tile per topic with its emoji,
 * article count, what it covers and the newest article, so the grid also
 * shows what is fresh. Still plain crawlable text links to every topic.
 */
export function HomeTopics({ topics }: { topics: TCategory[] }) {
  if (!topics.length) return null
  return (
    <section>
      <HeadingWithSub subHeading={`${topics.length} topics, from security cameras to robot vacuums.`}>
        Browse by topic
      </HeadingWithSub>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <li key={topic.id}>
            <TopicTile topic={topic} />
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * One topic's section, redesigned (6 Oct 2026). It replaces the rotating
 * Ncmaz magazine/grid/slider layouts: every topic now uses the same shape, a
 * lead guide beside a ranked list of the next four, with the lead on alternate
 * sides down the page. Text first, because most guides have no cover image.
 */
export function HomeTopicSection({
  category,
  posts,
  flip,
}: {
  category: TCategory
  posts: TPost[]
  flip?: boolean
}) {
  if (!posts.length) return null
  const [lead, ...rest] = posts
  const list = rest.slice(0, 4)
  const emoji = getCategory(category.handle)?.emoji
  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-neutral-200 pb-5 dark:border-neutral-800">
        <div className="flex items-center gap-4">
          <span
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-2xl dark:bg-primary-950/60"
            aria-hidden="true"
          >
            {emoji}
          </span>
          <div>
            <h2 className="section-heading text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white">
              {category.name}
            </h2>
            <p className="section-subheading mt-1 text-neutral-500 dark:text-neutral-400">{category.description}</p>
          </div>
        </div>
        <Link
          href={`/categories/${category.handle}/`}
          className="text-sm font-medium whitespace-nowrap text-primary-700 hover:underline dark:text-primary-300"
        >
          All {category.count} {category.name} articles →
        </Link>
      </div>
      <div className="grid gap-8 lg:grid-cols-5">
        <Link
          href={`/${lead.handle}/`}
          className={`group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-primary-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-700 ${
            list.length ? 'lg:col-span-2' : 'lg:col-span-5'
          } ${flip ? 'lg:order-2' : ''}`}
        >
          <div className="relative aspect-16/10 w-full">
            {lead.featuredImage?.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lead.featuredImage.src}
                alt={lead.featuredImage.alt || lead.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-50 text-6xl dark:from-primary-950/60 dark:to-neutral-900">
                <span aria-hidden="true">{emoji}</span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <span className="text-xs font-semibold tracking-wider text-primary-700 uppercase dark:text-primary-300">
              Latest in {category.name}
            </span>
            <h3 className="mt-2 text-xl leading-snug font-bold text-neutral-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
              {lead.title}
            </h3>
            {lead.excerpt && (
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{lead.excerpt}</p>
            )}
            <span className="mt-auto pt-4 text-xs text-neutral-500 dark:text-neutral-400">{lead.readingTime} min read</span>
          </div>
        </Link>
        {list.length > 0 && (
          <ol className={`flex flex-col lg:col-span-3 ${flip ? 'lg:order-1' : ''}`}>
            {list.map((post, i) => (
              <li key={post.id} className="flex-1 border-b border-neutral-200 first:border-t-0 last:border-b-0 dark:border-neutral-800">
                <Link href={`/${post.handle}/`} className="group flex h-full items-start gap-5 py-5 first:pt-0 last:pb-0">
                  <span className="w-8 shrink-0 text-2xl leading-none font-bold text-primary-600 tabular-nums dark:text-primary-400" aria-hidden="true">
                    {String(i + 2).padStart(2, '0')}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-semibold leading-snug text-neutral-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
                      {post.title}
                    </span>
                    {post.excerpt && (
                      <span className="mt-1.5 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{post.excerpt}</span>
                    )}
                    <span className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{post.readingTime} min read</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}

/**
 * The Buying Guides topic, redesigned (24 Sep 2026). It replaced the Ncmaz
 * posts-with-widgets block: a 2-column grid of image cards (most guides have no
 * cover, so most cards were blank) beside four sidebar widgets that repeated
 * the topic list. Now one featured guide and a numbered shelf of text cards.
 */
export function HomeBuyingGuides({
  heading,
  subHeading,
  posts,
  moreHref,
  moreLabel,
}: {
  heading: string
  subHeading?: string
  posts: TPost[]
  moreHref: string
  moreLabel: string
}) {
  if (!posts.length) return null
  const [featured, ...rest] = posts
  const meta = (post: TPost) => (
    <span className="text-xs text-neutral-500 dark:text-neutral-400">
      {post.author.name} · {new Date(post.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })} ·{' '}
      {post.readingTime} min read
    </span>
  )
  return (
    <section>
      <HeadingWithSub subHeading={subHeading}>{heading}</HeadingWithSub>
      <div className="grid gap-6 lg:grid-cols-3">
        <Link
          href={`/${featured.handle}/`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-primary-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-700"
        >
          {/* On large screens the card matches the list's height; the cover takes the slack. */}
          <div className="relative aspect-16/10 w-full lg:aspect-auto lg:min-h-56 lg:flex-1">
            {featured.featuredImage?.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.featuredImage.src}
                alt={featured.featuredImage.alt || featured.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-950/60 dark:to-neutral-900" />
            )}
          </div>
          <div className="flex flex-col p-6">
            <span className="text-xs font-semibold tracking-wider text-primary-700 uppercase dark:text-primary-300">Featured guide</span>
            <h3 className="mt-2 text-xl leading-snug font-bold text-neutral-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
              {featured.title}
            </h3>
            {featured.excerpt && (
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{featured.excerpt}</p>
            )}
            <div className="pt-4">{meta(featured)}</div>
          </div>
        </Link>
        <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {rest.map((post, i) => (
            <li key={post.id}>
              <Link
                href={`/${post.handle}/`}
                className="group flex h-full gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-primary-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-700"
              >
                <span className="text-2xl leading-none font-bold text-primary-600 tabular-nums dark:text-primary-400" aria-hidden="true">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-semibold leading-snug text-neutral-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
                    {post.title}
                  </span>
                  {post.excerpt && (
                    <span className="mt-1.5 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{post.excerpt}</span>
                  )}
                  <span className="mt-auto pt-3">{meta(post)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-8 flex justify-end">
        <Link href={moreHref} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">
          {moreLabel} →
        </Link>
      </div>
    </section>
  )
}

/**
 * The Setup Guides topic, redesigned (24 Sep 2026): a two-column list of
 * how-to rows (thumbnail, title, one-line summary, reading time) on the page
 * background, in place of the rotating magazine/grid layout on a grey panel.
 */
export function HomeSetupGuides({
  heading,
  subHeading,
  posts,
  moreHref,
  moreLabel,
}: {
  heading: string
  subHeading?: string
  posts: TPost[]
  moreHref: string
  moreLabel: string
}) {
  if (!posts.length) return null
  return (
    <section>
      <HeadingWithSub subHeading={subHeading}>{heading}</HeadingWithSub>
      <ul className="grid gap-x-10 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-neutral-200 dark:border-neutral-800">
            <Link href={`/${post.handle}/`} className="group flex items-center gap-5 py-5">
              <span className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24">
                {post.featuredImage?.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featuredImage.src}
                    alt={post.featuredImage.alt || post.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <span className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-950/60 dark:to-neutral-900" />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-xs font-semibold tracking-wider text-primary-700 uppercase dark:text-primary-300">
                  How-to · {post.readingTime} min read
                </span>
                <span className="mt-1 font-semibold leading-snug text-neutral-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
                  {post.title}
                </span>
                {post.excerpt && (
                  <span className="mt-1 line-clamp-1 text-sm text-neutral-600 dark:text-neutral-400">{post.excerpt}</span>
                )}
              </span>
              <span
                className="hidden shrink-0 text-xl text-neutral-400 transition group-hover:translate-x-1 group-hover:text-primary-600 sm:block dark:group-hover:text-primary-400"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-end">
        <Link href={moreHref} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">
          {moreLabel} →
        </Link>
      </div>
    </section>
  )
}

/** A random selection of products priced at 3+ Australian retailers (chosen in app/page.tsx). */
export function HomeProducts({ products }: { products: TopProduct[] }) {
  if (!products.length) return null
  return (
    <section>
      <HeadingWithSub subHeading="A rotating selection of products with prices from at least three Australian retailers.">
        Researched products
      </HeadingWithSub>
      <div className="grid gap-[15px] sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <Link href="/products/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">
          All products and prices →
        </Link>
      </div>
    </section>
  )
}

export function HomeTrust({ editorName, editorSlug }: { editorName: string; editorSlug: string }) {
  const points = [
    {
      title: 'Written for Australian homes',
      body: '230V wiring and AS/NZS rules, Australian retailers and warranties, renters and strata, and our climate.',
    },
    {
      title: 'Research, not hype',
      body: 'Guides are built from manufacturer documentation, Australian standards and retailer listings. We do not score products we have not tested.',
    },
    {
      title: 'Fact-checked before publishing',
      body: 'Legal, electrical and safety claims are checked against official sources, and we point you to the regulator where rules differ by state.',
    },
  ]
  return (
    <section className="rounded-3xl bg-primary-50 px-6 py-10 sm:px-10 lg:px-14 lg:py-14 dark:bg-primary-950/40">
      <HeadingWithSub
        className="mb-8!"
        subHeading={`Edited by ${editorName}. Independent: ${AFFILIATE_ENABLED ? 'affiliate links never decide' : 'no brand or retailer decides'} what we recommend.`}
      >
        How we research
      </HeadingWithSub>
      <ul className="grid gap-6 md:grid-cols-3">
        {points.map((p) => (
          <li key={p.title} className="rounded-2xl bg-white p-6 dark:bg-neutral-900">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{p.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
        <Link href="/how-we-test/" className="text-primary-700 hover:underline dark:text-primary-300">
          How we research →
        </Link>
        <Link href="/about/" className="text-primary-700 hover:underline dark:text-primary-300">
          About {site.name} →
        </Link>
        <Link href={`/authors/${editorSlug}/`} className="text-primary-700 hover:underline dark:text-primary-300">
          {editorName} →
        </Link>
      </div>
    </section>
  )
}
