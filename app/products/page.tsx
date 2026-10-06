import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/JsonLd';
import ProductGrid from '@/components/ProductGrid';
import { getIndexableTopProducts, getShoppableTopProducts, toListingCard } from '@/lib/products';
import { faqJsonLd } from '@/lib/seo';
import { categories, site } from '@/lib/site';
import { getNav } from '@/lib/nav';

const TITLE = 'Smart Home Devices for Australian Homes';
const DESCRIPTION =
  // 154 chars, no "Compare" (user request, 6 Oct 2026).
  'Smart home devices sold in Australia — cameras, robot vacuums, lighting, hubs and climate — with links to Amazon AU, JB Hi-Fi, The Good Guys and Bunnings.';

export const metadata: Metadata = {
  title: `${TITLE} | NXT Smart Home`,
  description: DESCRIPTION,
  alternates: { canonical: '/products/' },
  /*
    The hub lists price listings; with no indexable product among them it is
    noindex, follow (AdSense Task 2, lib/products.ts isIndexableProduct). The
    catalogue is read at build, so this is decided per deploy.
  */
  ...(getIndexableTopProducts().length ? {} : { robots: { index: false, follow: true } }),
  /*
    Without these the page inherits the root object wholesale — including an
    og:url pointing at the homepage — so sharing this page anywhere presented
    it as the front page. Defining openGraph here replaces the root entirely,
    which is why the image has to be repeated.
  */
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/products/`,
    images: [site.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [site.ogImage],
  },
};

/** The two links that save a first-time buyer the most money, in order. */
const START_HERE = [
  {
    href: '/buying-guides/smart-home-starter-guide-beginners-australia/',
    label: 'Smart Home for Beginners: How to Start Without Wasting Money',
  },
  {
    href: '/hubs-and-platforms/best-smart-home-platform-australia/',
    label: 'Which Smart Home Platform Should You Choose in Australia?',
  },
];

/** Your "Browse by category" copy, one card each. */
const CATEGORY_CARDS = [
  {
    slug: 'security-and-cameras', emoji: '🔒', name: 'Security & Cameras',
    body: 'Doorbells, indoor and outdoor cameras, and sensors. The category where subscription costs and where footage is stored matter more than the camera itself.',
    links: [
      { href: '/security-and-cameras/video-doorbell-buying-guide-australia/', label: 'Video Doorbell Buying Guide' },
      { href: '/security-and-cameras/smart-home-privacy-cameras-australia-law/', label: 'Cameras and Australian Privacy Law' },
    ],
  },
  {
    slug: 'smart-door-locks', emoji: '🔐', name: 'Smart Door Locks',
    body: 'Keyless entry deadbolts, fingerprint keypads, and Apple HomeKey locks. Make sure to check door backset and Australian mortise compatibility.',
    links: [{ href: '/security-and-cameras/smart-lock-compatibility-australian-doors/', label: 'Smart Lock Compatibility for AU Doors' }],
  },
  {
    slug: 'lighting', emoji: '💡', name: 'Lighting',
    body: 'Bulbs, lightstrips and switches. Check the fitting before anything else; Australian homes are mostly B22 bayonet, not E27 screw.',
    links: [{ href: '/lighting/smart-bulbs-vs-smart-switches-australia/', label: 'Smart Bulbs vs Smart Switches' }],
  },
  {
    slug: 'energy-and-solar', emoji: '⚡', name: 'Energy & Solar',
    body: "Plugs with energy monitoring, power stations and solar accessories. Useful if you're on a time-of-use tariff and want to shift load.",
    links: [{ href: '/energy-and-solar/smart-plugs-energy-monitoring-australia/', label: 'Smart Plugs and Energy Monitoring' }],
  },
  {
    slug: 'entertainment-and-audio', emoji: '🔊', name: 'Entertainment & Audio',
    body: "Smart speakers, displays and multi-room audio. Mostly a decision about which voice assistant you're willing to live with.",
    links: [{ href: '/entertainment-and-audio/smart-speakers-multiroom-audio-australia/', label: 'Smart Speakers and Multi-Room Audio' }],
  },
  {
    slug: 'climate-and-comfort', emoji: '🌡️', name: 'Climate & Comfort',
    body: 'Aircon controllers, thermostats and air quality monitors. Most Australian homes use split systems, which need an IR controller rather than a wired thermostat.',
    links: [{ href: '/climate-and-comfort/make-split-system-aircon-smart-australia/', label: 'How to Make a Split System Aircon Smart' }],
  },
  {
    slug: 'hubs-and-platforms', emoji: '🧠', name: 'Hubs & Platforms',
    body: 'Hubs, bridges and coordinators. The choice everything else depends on.',
    links: [
      { href: '/hubs-and-platforms/what-is-matter-smart-home-australia/', label: 'What Is Matter?' },
      { href: '/hubs-and-platforms/zigbee-vs-zwave-vs-thread-vs-wifi/', label: 'Zigbee vs Z-Wave vs Thread vs Wi-Fi' },
    ],
  },
  {
    slug: 'robot-vacuums', emoji: '🤖', name: 'Robot Vacuums',
    body: 'Vacuums and mop hybrids. Suction numbers are the most oversold spec in the category.',
    links: [{ href: '/robot-vacuums/robot-vacuum-buying-guide-australia/', label: 'Robot Vacuum Buying Guide' }],
  },
];

/** Australia-specific failure modes, ordered by how expensive the mistake is. */
const CHECKS: { label: string; body: string; link?: { href: string; label: string } }[] = [
  {
    label: 'Bulb fittings',
    body: 'Australian homes use B22 bayonet far more than E27 screw. Check which one a smart bulb ships with before ordering — this is the single most common return in the category.',
  },
  {
    label: 'Z-Wave frequency',
    body: 'Australian Z-Wave runs near 921.42 MHz against roughly 908.42 MHz in North America. An imported Z-Wave device will not talk to an Australian hub, and no adaptor fixes it.',
  },
  {
    label: 'Voltage and plugs',
    body: 'Anything sold locally is fine. Imported gear expecting 110V needs more than a plug adaptor.',
  },
  {
    label: 'Warranty',
    body: "Buying from an Australian retailer gives you consumer guarantees under Australian Consumer Law that apply regardless of what the manufacturer's warranty says. Grey imports don't carry the same protection.",
  },
  {
    label: 'Matter support',
    body: '"Works with Matter" on the box doesn\'t mean every feature is exposed. Check what the specific device actually shares before you rely on it.',
  },
  {
    label: 'Wired work',
    body: 'Anything involving fixed wiring — switches, downlights, hardwired sensors — is licensed electrician territory in every state.',
    link: {
      href: '/setup-guides/smart-home-electrical-work-australia-legal/',
      label: 'What Electrical Work You Can Legally Do Yourself',
    },
  },
];

/**
 * Answers are kept as plain strings so the same text feeds both the page and
 * the FAQPage schema — a rich result that quotes different words to the ones
 * on screen is worse than no rich result.
 */
const FAQ: { q: string; a: string; link: { href: string; label: string } }[] = [
  {
    q: "Where's the cheapest place to buy smart home gear in Australia?",
    a: 'It depends on the category. Bunnings carries lighting and basic sensors, JB Hi-Fi and The Good Guys stock the mainstream ecosystem devices, and Amazon AU carries the widest range including brands the bricks-and-mortar chains skip. Prices move constantly, so check two before buying.',
    link: { href: '/buying-guides/where-to-buy-smart-home-australia/', label: 'Bunnings vs JB Hi-Fi: Where to Buy' },
  },
  {
    q: 'Do overseas smart home devices work in Australia?',
    a: "Sometimes. Four things decide it: voltage, plug type, radio frequency and app region locking. Wi-Fi devices usually work. Z-Wave devices usually don't, because Australia uses a different frequency band.",
    link: { href: '/buying-guides/overseas-smart-home-devices-australia/', label: 'Do Overseas Devices Work in Australia?' },
  },
  {
    q: 'Do I need a hub?',
    a: 'Not for Wi-Fi devices. You do need one for Zigbee, Z-Wave or Thread devices, and a hub also keeps automations running when your internet drops.',
    link: { href: '/hubs-and-platforms/smart-home-devices-without-internet/', label: 'Do Devices Still Work When the Internet Drops?' },
  },
  {
    q: 'Can renters install this gear?',
    a: 'Most of it, yes. Anything that plugs in, sits on a shelf or mounts with adhesive is fine. Avoid anything requiring fixed wiring or holes without written permission.',
    link: { href: '/buying-guides/smart-home-for-renters-australia/', label: 'Smart Home for Renters' },
  },
  {
    q: 'Will these devices still work in five years?',
    a: 'The hardware usually outlasts the service behind it. Devices that work locally, without a cloud account, survive longest — which is why Matter and Thread support matter more than any single feature.',
    link: { href: '/buying-guides/future-proof-smart-home-devices-australia/', label: 'Buying Devices That Will Still Work in Five Years' },
  },
];

export default function ProductsPage() {
  const { productCategoryNavLinks } = getNav();

  // Empty listings are never listed; their pages still resolve (isEmptyListing).
  const products = getShoppableTopProducts();

  /*
    {{DATE}} in the draft copy. Derived from the newest pricesCheckedAt in the
    catalogue rather than hardcoded, so the page cannot claim prices were
    checked on a date that has since gone stale.
  */
  const lastChecked = products
    .map((p) => p.pricesCheckedAt)
    .filter(Boolean)
    .sort()
    .at(-1);
  const checkedLabel = lastChecked
    ? new Date(lastChecked).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  // Priced products per category, for the category cards.
  const countBySlug = new Map<string, number>();
  for (const p of products) countBySlug.set(p.categorySlug, (countBySlug.get(p.categorySlug) ?? 0) + 1);

  return (
    <main className="container py-10 lg:py-16">
      {/* Hero — two columns, matches /all-topics/ and the category hubs */}
      <header className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-900 dark:text-white">Products</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-50 px-3.5 py-1 text-xs font-bold text-primary-700 dark:border-primary-500/40 dark:bg-primary-900/40 dark:text-primary-300">
            <span className="size-2 rounded-full bg-primary-500" />
            Product catalogue
          </div>

          <h1 className="text-4xl sm:text-[3rem] font-black tracking-tight leading-[1.1] text-neutral-900 dark:text-white">
            Smart home devices{' '}
            <span className="bg-gradient-to-r from-primary-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-primary-400 dark:via-indigo-300 dark:to-purple-400">
              for Australian homes.
            </span>
          </h1>

          <p className="max-w-2xl text-base font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
            Every device here is sold in Australia, runs on 230V power, and is stocked by at least one local retailer
            with Australian warranty support. We link you to the retailer to check the current price, because prices
            move daily. Order is based on what we&apos;d recommend, not on what pays us the most.
          </p>

          <dl className="grid max-w-md grid-cols-2 gap-3 pt-1">
            <div className="rounded-2xl border border-neutral-200/80 flex flex-col-reverse p-3.5 dark:border-neutral-800">
              <dt className="mt-0.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">Devices listed</dt>
              <dd className="text-2xl font-black text-primary-600 dark:text-primary-400">{products.length}</dd>
            </div>
            <div className="rounded-2xl border border-neutral-200/80 flex flex-col-reverse p-3.5 dark:border-neutral-800">
              <dt className="mt-0.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">Categories</dt>
              <dd className="text-2xl font-black text-primary-600 dark:text-primary-400">{countBySlug.size}</dd>
            </div>
          </dl>
          {checkedLabel ? (
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Prices last checked {checkedLabel}.</p>
          ) : null}
        </div>

        <aside className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-primary-50/60 via-white to-purple-50/40 p-6 sm:p-8 dark:border-neutral-800 dark:from-neutral-900/80 dark:via-neutral-900 dark:to-neutral-950">
          <div className="pointer-events-none absolute -right-16 -top-16 size-60 rounded-full bg-primary-500/15 blur-3xl dark:bg-primary-500/25" />
          <div className="relative space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">New here? Start with these</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Two things save the most money: picking your platform before you buy anything, and knowing which devices
              you can install yourself.
            </p>
            {START_HERE.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block rounded-2xl border border-neutral-200 bg-white/80 p-5 transition hover:-translate-y-0.5 hover:border-primary-500 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800/70"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-primary-600 uppercase dark:text-primary-400">
                    {idx === 0 ? 'Starter guide' : 'Platform choice'}
                  </span>
                  <span className="text-xs font-medium text-neutral-500 transition-transform group-hover:translate-x-1">
                    Read →
                  </span>
                </div>
                <h3 className="mt-2 text-base leading-snug font-bold text-neutral-900 dark:text-white">{item.label}</h3>
              </Link>
            ))}
          </div>
        </aside>
      </header>

      {/* Category chips + the grid. Chips are a shortcut to the category pages,
          kept on one row and scrolling on narrow screens. */}
      <section aria-label="Products" className="mt-16">
        <nav aria-label="Product categories" className="-mx-4 mb-6 border-y border-neutral-200 px-4 py-4 sm:mx-0 sm:px-0 dark:border-neutral-800">
          <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {productCategoryNavLinks.map((cat) => (
              <li key={cat.href} className="shrink-0">
                <Link
                  href={cat.href}
                  className="inline-block whitespace-nowrap rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-primary-500 hover:text-primary-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:border-primary-400 dark:hover:text-primary-400"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ProductGrid products={products.map(toListingCard)} categoriesList={categories} pageSize={6} showCounts={false} />
      </section>

      {/* Browse by category — one card per category, 3D icon + real counts. */}
      <section className="mt-24">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
          Categories
        </span>
        <h2 className="mt-2 text-[2rem] leading-tight font-bold text-neutral-900 dark:text-white">Browse by category</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((card) => {
            const meta = categories.find((c) => c.slug === card.slug);
            const count = countBySlug.get(card.slug) ?? 0;
            return (
              <div
                key={card.slug}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-primary-500 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-400"
              >
                <div className="flex items-start justify-between">
                  {meta?.icon3d ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={meta.icon3d} alt="" width={48} height={48} className="size-12 object-contain" />
                  ) : (
                    <span className="text-3xl" aria-hidden="true">{card.emoji}</span>
                  )}
                  {count ? (
                    <span className="rounded-full border border-primary-500/20 bg-primary-50 px-2.5 py-0.5 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                      {count} {count === 1 ? 'device' : 'devices'}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-base font-bold text-neutral-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  <Link href={`/products/category/${card.slug}/`}>{card.name}</Link>
                </h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{card.body}</p>
                <ul className="mt-4 space-y-1 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  {card.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-xs font-medium text-primary-700 hover:underline dark:text-primary-400">
                        → {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* What to check — the Australia-specific traps, ordered by cost of error. */}
      <section className="mt-24 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
            Australia only
          </span>
          <h2 className="mt-2 text-[2rem] leading-tight font-bold text-neutral-900 dark:text-white">
            What to check before you buy in Australia
          </h2>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">Ordered by how expensive the mistake is.</p>
        </div>
        <ol className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {CHECKS.map((item, i) => (
            <li key={item.label} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-2 py-5">
              <span aria-hidden="true" className="text-2xl font-black leading-none text-primary-600 dark:text-primary-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">{item.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{item.body}</p>
                {item.link ? (
                  <Link
                    href={item.link.href}
                    className="mt-2 inline-block text-sm font-medium text-primary-700 hover:underline dark:text-primary-400"
                  >
                    → {item.link.label}
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/*
        Transparency and FAQ share one row: both answer "can I trust this
        page", and side by side they read as one disclosure block rather than
        two more things to scroll past. Stacks below lg, where two columns
        would leave the FAQ answers too narrow to read.
      */}
      <section className="mt-24 grid gap-x-12 gap-y-12 rounded-3xl bg-primary-50 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-14 dark:bg-primary-900/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
            Transparency
          </span>
          <h2 className="mt-2 text-[2rem] leading-tight font-bold text-neutral-900 dark:text-white">
            How products get onto this page
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            <p>
              We list devices that are actually available in Australia from a retailer with local
              warranty support. Imported-only gear is excluded.
            </p>
            <p>
              Prices are indicative{checkedLabel ? ` and last checked ${checkedLabel}` : ''}. They
              change daily — always confirm on the retailer&apos;s site before buying. We don&apos;t
              hold stock and we don&apos;t set prices.
            </p>
            <p>
              Some links earn us a commission at no extra cost to you. It doesn&apos;t affect which
              products appear here or how they&apos;re ordered. These are price listings, not
              reviews: we have not tested these products.
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
              <Link
                href="/how-we-test/"
                className="text-sm font-medium text-primary-700 hover:underline dark:text-primary-400"
              >
                → How we research
              </Link>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">·</span>
              <Link
                href="/affiliate-disclosure/"
                className="text-sm font-medium text-primary-700 hover:underline dark:text-primary-400"
              >
                Affiliate disclosure
              </Link>
            </p>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
            FAQ
          </span>
          <h2 className="mt-2 text-[2rem] leading-tight font-bold text-neutral-900 dark:text-white">
            Common questions
          </h2>
          <FaqAccordion items={FAQ} />
        </div>
      </section>

      <JsonLd data={faqJsonLd(FAQ.map(({ q, a }) => ({ q, a })))} />

    </main>
  );
}
