import type { Metadata } from 'next';
import Link from 'next/link';
import CategoryCarousel from '@/components/CategoryCarousel';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import ProductGrid from '@/components/ProductGrid';
import { getAllTopProducts } from '@/lib/products';
import { faqJsonLd } from '@/lib/seo';
import { categories, site } from '@/lib/site';
import { getNav } from '@/lib/nav';

const TITLE = 'Compare Smart Home Devices in Australia';
const DESCRIPTION =
  // 157 chars. Your draft ran 166; dropping "and energy" left 162, so "sold"
  // goes too — it was the only word that could leave without losing a category
  // or a retailer.
  'Compare smart home devices in Australia — cameras, robot vacuums, lighting, hubs and climate — with links to Amazon AU, JB Hi-Fi, The Good Guys and Bunnings.';

export const metadata: Metadata = {
  title: `${TITLE} | NXT Smart Home`,
  description: DESCRIPTION,
  alternates: { canonical: '/products/' },
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

  const products = getAllTopProducts();

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

  return (
    <main className="mx-auto max-w-[1366px] px-4 py-8 sm:px-6">
      {/* Clean 2-Column Hero Header matching design preview (Transparent background, no border, no padding around title) */}
      <div className="relative mb-10 text-slate-900 dark:text-white">
        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Title, Eyebrow Badges & Description */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-emerald-600/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                Australian Availability · Local Retailers
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 backdrop-blur-md">
                <span>🇦🇺</span>
                <span>240V &amp; AS/NZS Standards</span>
              </span>
            </div>

            {/* Title matching exact typography */}
            <h1 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl leading-[1.15] text-slate-900 dark:text-white">
              Compare Smart Home <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400">
                Devices in Australia
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed max-w-3xl font-normal dark:text-slate-300">
              Every device here is sold in Australia, runs on 240V power, and is stocked by at least one local retailer with Australian warranty support. We link you to the retailer to check the current price, because prices move daily. Order is based on what we&apos;d recommend, not on what pays us the most.
            </p>

            {/* Stat Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200/80 pt-6 dark:border-slate-800">
              <div className="flex items-center gap-2 rounded-[8px] border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{products.length}+</span> Devices Catalogued
              </div>
              <div className="flex items-center gap-2 rounded-[8px] border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="text-brand-600 dark:text-brand-400 font-bold text-sm">4</span> Major AU Retailers
              </div>
              <div className="flex items-center gap-2 rounded-[8px] border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">100%</span> Independent Testing
              </div>
            </div>
          </div>

          {/* Right Column: Real Transparent Product Showcase Grid */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full overflow-hidden rounded-[8px] border border-slate-200/80 bg-gradient-to-b from-white/90 to-emerald-50/60 p-6 dark:border-slate-700/80 dark:bg-gradient-to-b dark:from-slate-800/80 dark:to-slate-900/90">
              <div className="absolute right-3 top-3 rounded-[8px] bg-emerald-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                AU STOCKS TESTED
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                {/* Product 1 */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/reolink-argus-3-ultra-4k-solar-camera.png"
                      alt="Reolink 4K Solar"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Reolink 4K Solar</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Security &amp; Cameras</span>
                </div>

                {/* Product 2 */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/aqara-smart-lock-u100-apple-homekey.png"
                      alt="Aqara HomeKey U100"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Aqara HomeKey U100</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Smart Locks</span>
                </div>

                {/* Product 3 */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/google-nest-hub-2nd-gen-smart-display.png"
                      alt="Google Nest Hub"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Google Nest Hub</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Hubs &amp; Displays</span>
                </div>

                {/* Product 4 */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/dreame-l10s-ultra-robot-vacuum-and-mop.png"
                      alt="Dreame L10s Ultra"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Dreame L10s Ultra</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Robot Vacuums</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text from uploaded image above starter guide cards with extra top padding */}
        <p className="relative z-10 mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
          New to this? Two things save the most money: picking your platform before you buy anything, and knowing which devices you can install yourself.
        </p>

        {/* 2-Column Split Start Here Cards wrapped in background color container matching uploaded image */}
        <div className="relative z-10 mt-4 rounded-[8px] bg-slate-100/80 p-3 sm:p-4 dark:bg-slate-900/60">
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {START_HERE.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[8px] border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:border-emerald-500/50 dark:border-slate-800 dark:bg-slate-950/80 dark:hover:bg-slate-900/80"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {idx === 0 ? '🚀 Starter Guide' : '🧠 Platform Choice'}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-300">
                    Read →
                  </span>
                </div>
                <h3 className="mt-2 font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors dark:text-white dark:group-hover:text-emerald-300">
                  {item.label}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Category chips. Names only, kept on one row — it is a shortcut to the
          seven category pages, not a second navigation system. Scrolls
          horizontally on narrow screens rather than wrapping into a block that
          competes with the grid below it. */}
      <nav aria-label="Product categories" className="-mx-4 mb-5 px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {productCategoryNavLinks.map((cat) => (
            <li key={cat.href} className="shrink-0">
              <Link
                href={cat.href}
                className="inline-block whitespace-nowrap rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-500 hover:text-brand-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-400"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ProductGrid products={products} categoriesList={categories} pageSize={6} />

      {/* What to check — the Australia-specific traps, ordered by cost of error. */}
      <section className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-700">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">
          Australia only
        </span>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          What to check before you buy in Australia
        </h2>

        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKS.map((item, i) => (
            <div key={item.label} className="border-t border-slate-200 pt-4 dark:border-slate-700">
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="text-2xl font-bold leading-none text-amber-200 dark:text-amber-900/70"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.label}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.body}
              </p>
              {item.link ? (
                <Link
                  href={item.link.href}
                  className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-brand-400"
                >
                  → {item.link.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Browse by category — auto-advancing cards. */}
      <section className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-700">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
          Categories
        </span>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          Browse by category
        </h2>
        <div className="mt-8">
          <CategoryCarousel
            cards={CATEGORY_CARDS.map((c) => ({
              ...c,
              count: products.filter((p) => p.categorySlug === c.slug).length,
            }))}
          />
        </div>
      </section>

      {/*
        Transparency and FAQ share one row: both answer "can I trust this
        page", and side by side they read as one disclosure block rather than
        two more things to scroll past. Stacks below lg, where two columns
        would leave the FAQ answers too narrow to read.
      */}
      <section className="mt-16 grid gap-x-12 gap-y-12 border-t border-slate-200 pt-10 dark:border-slate-700 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            Transparency
          </span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            How products get onto this page
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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
              products appear here or how they&apos;re ordered. If a product is a bad buy, we say so.
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
              <Link
                href="/how-we-test/"
                className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-400"
              >
                → How we test
              </Link>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <Link
                href="/affiliate-disclosure/"
                className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-400"
              >
                Affiliate disclosure
              </Link>
            </p>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            FAQ
          </span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            Common questions
          </h2>
          <FaqAccordion items={FAQ} />
        </div>
      </section>

      <JsonLd data={faqJsonLd(FAQ.map(({ q, a }) => ({ q, a })))} />

    </main>
  );
}
