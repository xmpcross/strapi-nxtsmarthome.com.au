/**
 * Global site configuration.
 *
 * Affiliate network IDs live in `lib/affiliate.ts` — not here.
 */

export const site = {
  name: 'NXT Smart Home',
  shortName: 'NXT Smart Home',
  domain: 'nxtsmarthome.com.au',
  url: 'https://nxtsmarthome.com.au',
  tagline: 'Smart home reviews, setup guides and buying advice — built for Australia',
  /** Short form used in <title>. The long tagline truncates in search results. */
  shortTagline: 'Australian Smart Home Reviews and Guides',
  description:
    'Independent smart home reviews, step-by-step setup guides and buying advice. Written for Australian homes — 240V wiring, AS/NZS standards, NBN quirks and local retailers — and useful anywhere in the world.',
  /** Meta description. Kept inside 120-160 chars so it is not truncated. */
  metaDescription:
    'Independent Australian smart home reviews, setup guides and buying advice — local retailers, AS/NZS standards, renting rules and real-world testing.',
  /** Default Open Graph / Twitter card image, 1200x630. */
  ogImage: '/og-default.png',
  locale: 'en_AU',
  language: 'en-AU',
  country: 'AU',
  currency: 'AUD',
  // Used for JSON-LD publisher/author and the contact page.
  organisation: {
    name: 'NXT Smart Home',
    email: 'hello@nxtsmarthome.com.au',
  },
  social: {
    // Fill these in as accounts are created; empty strings are skipped in JSON-LD.
    twitter: '',
    youtube: '',
    facebook: 'https://www.facebook.com/nxtsmarthome/',
  },
} as const;

export type CategoryKey =
  | 'security'
  | 'lighting'
  | 'energy'
  | 'entertainment'
  | 'climate'
  | 'hubs-and-platforms'
  | 'robot-vacuums'
  | 'setup-guides'
  | 'buying-guides';

export interface Category {
  key: CategoryKey;
  name: string;
  slug: string;
  blurb: string;
  /** Longer intro shown on the category landing page. */
  intro: string;
  emoji: string;
}

export const categories: Category[] = [
  {
    key: 'security',
    name: 'Security & Cameras',
    slug: 'security-and-cameras',
    emoji: '🔒',
    blurb: 'Cameras, video doorbells, sensors, alarms and locks.',
    intro:
      'Security is where most Australian smart homes start. This section covers indoor and outdoor cameras, video doorbells, motion and door sensors, smart locks and full alarm systems — including the privacy law and strata rules that apply when your camera can see a neighbour or a shared space.',
  },
  {
    key: 'lighting',
    name: 'Lighting',
    slug: 'lighting',
    emoji: '💡',
    blurb: 'Smart bulbs, switches, strips and lighting automation.',
    intro:
      'Smart lighting is the cheapest way into home automation and the easiest to get wrong. This section covers bulbs versus switches, the B22 vs E27 fitting question that trips up Australians buying from overseas, dimming compatibility, and how to wire smart switches safely under AS/NZS rules.',
  },
  {
    key: 'energy',
    name: 'Energy & Solar',
    slug: 'energy-and-solar',
    emoji: '⚡',
    blurb: 'Smart plugs, energy monitoring, solar and load shifting.',
    intro:
      'Australian electricity is expensive and our solar uptake is the highest per capita in the world. This section covers energy monitoring, smart plugs, hot water and pool pump control, and how to automate around time-of-use tariffs and feed-in tariffs so your automations actually cut the bill.',
  },
  {
    key: 'entertainment',
    name: 'Entertainment & Audio',
    slug: 'entertainment-and-audio',
    emoji: '🔊',
    blurb: 'Speakers, streaming, multi-room audio and TV integration.',
    intro:
      'Smart speakers, multi-room audio, streaming boxes and how they tie into the rest of the house. Includes what actually works with Australian free-to-air and local streaming services, and which voice assistants are worth committing to.',
  },
  {
    key: 'climate',
    name: 'Climate & Comfort',
    slug: 'climate-and-comfort',
    emoji: '🌡️',
    blurb: 'Air conditioning, heating, fans, sensors and air quality.',
    intro:
      'Australia asks a lot of climate control — 45°C summers in the west, damp winters in Melbourne, humidity in Queensland. This section covers making split systems smart, thermostats, ceiling fan control, humidity and air quality monitoring, and bushfire-smoke automations.',
  },
  {
    key: 'hubs-and-platforms',
    name: 'Hubs & Platforms',
    slug: 'hubs-and-platforms',
    emoji: '🧠',
    blurb: 'Matter, Thread, Zigbee, Z-Wave, Home Assistant and the big ecosystems.',
    intro:
      'The most important decision you will make is which platform to build on, because it determines what you can buy for the next decade. This section explains Matter, Thread, Zigbee and Z-Wave in plain language, and compares Apple Home, Google Home, Amazon Alexa, SmartThings and Home Assistant.',
  },
  {
    key: 'robot-vacuums',
    name: 'Robot Vacuums',
    slug: 'robot-vacuums',
    emoji: '🤖',
    blurb: 'Robot vacuums, mops and self-emptying docks.',
    intro:
      'Robot vacuums and mops, how mapping and navigation actually differ between price tiers, what a self-emptying dock is worth, and how they cope with the pet hair and hard floors common in Australian homes.',
  },
  {
    key: 'setup-guides',
    name: 'Setup Guides',
    slug: 'setup-guides',
    emoji: '🛠️',
    blurb: 'Step-by-step installation, configuration and troubleshooting.',
    intro:
      'Practical, step-by-step walkthroughs: getting devices onto your Wi-Fi, building your first automations, fixing connection dropouts, and knowing when a job legally requires a licensed electrician in Australia.',
  },
  {
    key: 'buying-guides',
    name: 'Buying Guides',
    slug: 'buying-guides',
    emoji: '🛒',
    blurb: 'What to buy, what to skip, and how to compare.',
    intro:
      'Decision-first buying advice. What actually matters in a spec sheet, what marketing terms mean nothing, how to compare options honestly, and how to avoid the parallel-import and warranty traps that catch Australian buyers.',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryByKey(key: string): Category | undefined {
  return categories.find((c) => c.key === key);
}

/** Links shown directly in the header bar. */
export const navLinks = [
  { href: '/categories/hubs-and-platforms/', label: 'Hubs & Platforms' },
  { href: '/categories/security-and-cameras/', label: 'Security' },
  { href: '/categories/setup-guides/', label: 'Setup Guides' },
  { href: '/categories/buying-guides/', label: 'Buying Guides' },
];

/**
 * Everything under the "More Articles" menu: every category not already a
 * top-level link. Derived rather than hand-listed, so adding a category to
 * `categories` above surfaces it in the nav automatically instead of silently
 * going missing.
 */
export const moreNavLinks = categories
  .filter((category) => !navLinks.some((link) => link.href === `/categories/${category.slug}/`))
  .map((category) => ({
    href: `/categories/${category.slug}/`,
    label: category.name,
    emoji: category.emoji,
  }));

export const searchLink = { href: '/search/', label: 'Search' };
