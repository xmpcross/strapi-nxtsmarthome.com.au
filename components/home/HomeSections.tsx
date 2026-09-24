import Link from 'next/link'
import Card11 from '@/components/PostCards/Card11'
import ProductCard from '@/components/ProductCard'
import HeadingWithSub from '@/shared/Heading'
import type { TCategory } from '@/data/categories'
import type { TPost } from '@/data/posts'
import type { TopProduct } from '@/lib/products'
import { site } from '@/lib/site'

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
          href="/categories/"
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

export function HomeStartHere({ posts }: { posts: TPost[] }) {
  if (!posts.length) return null
  return (
    <section>
      <HeadingWithSub subHeading="The buying guides and complete guides most readers start with.">
        Start here
      </HeadingWithSub>
      <div className="grid gap-[15px] sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <Card11 key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

/** Text links to every topic: name, what it covers, article count. Replaces the image-only slider. */
export function HomeTopics({ topics }: { topics: TCategory[] }) {
  if (!topics.length) return null
  return (
    <section>
      <HeadingWithSub subHeading={`${topics.length} topics, from security cameras to robot vacuums.`}>
        Browse by topic
      </HeadingWithSub>
      <ul className="grid gap-[15px] sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href={`/categories/${topic.handle}/`}
              className="group flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-primary-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-700"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-lg font-bold text-neutral-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
                  {topic.name}
                </span>
                <span className="shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
                  {topic.count} {topic.count === 1 ? 'guide' : 'guides'}
                </span>
              </span>
              <span className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {topic.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
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

/** Product pages with our own research notes (the indexable ones). */
export function HomeProducts({ products }: { products: TopProduct[] }) {
  if (!products.length) return null
  return (
    <section>
      <HeadingWithSub subHeading="Devices our guides recommend most, with research notes on who each suits, Australian details and alternatives.">
        Researched products
      </HeadingWithSub>
      <div className="grid gap-[15px] sm:grid-cols-2 lg:grid-cols-4">
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
    <section className="rounded-2xl bg-neutral-50 px-6 py-10 sm:px-10 dark:bg-neutral-800/50">
      <HeadingWithSub
        className="mb-8!"
        subHeading={`Edited by ${editorName}. Independent: affiliate links never decide what we recommend.`}
      >
        How we research
      </HeadingWithSub>
      <ul className="grid gap-6 md:grid-cols-3">
        {points.map((p) => (
          <li key={p.title}>
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
