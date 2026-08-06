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
  shortTagline: 'Australian Smart Home Reviews and Guides',
  description:
    'Independent smart home reviews, step-by-step setup guides and buying advice. Written for Australian homes — 240V wiring, AS/NZS standards, NBN quirks and local retailers — and useful anywhere in the world.',
  metaDescription:
    'Independent Australian smart home reviews, setup guides and buying advice — local retailers, AS/NZS standards, renting rules and real-world testing.',
  ogImage: '/og-default.png',
  locale: 'en_AU',
  language: 'en-AU',
  country: 'AU',
  currency: 'AUD',
  organisation: {
    name: 'NXT Smart Home',
    email: 'hello@nxtsmarthome.com.au',
  },
  social: {
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
  intro: string;
  emoji: string;
  subcategories?: string[];
  /**
   * Long-form orientation shown above the article grid on the category page.
   * Optional: a category with only a couple of articles benefits from it, one
   * with thirty does not need padding. Written per category — a generic block
   * repeated nine times would be worse than nothing.
   */
  overview?: { heading: string; paragraphs: string[] };
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
    subcategories: ['Video Doorbells', 'Security Cameras', 'Smart Locks', 'Alarm Systems & Sensors'],
  },
  {
    key: 'lighting',
    name: 'Lighting',
    slug: 'lighting',
    emoji: '💡',
    blurb: 'Smart bulbs, switches, strips and lighting automation.',
    intro:
      'Smart lighting is the cheapest way into home automation and the easiest to get wrong. This section covers bulbs versus switches, the B22 vs E27 fitting question that trips up Australians buying from overseas, dimming compatibility, and how to wire smart switches safely under AS/NZS rules.',
    subcategories: ['Smart Bulbs', 'Smart Lightstrips', 'Smart Wall Switches', 'Outdoor Lighting'],
  },
  {
    key: 'energy',
    name: 'Energy & Solar',
    slug: 'energy-and-solar',
    emoji: '⚡',
    blurb: 'Smart plugs, energy monitoring, solar and load shifting.',
    intro:
      'Australian electricity is expensive and our solar uptake is the highest per capita in the world. This section covers energy monitoring, smart plugs, hot water and pool pump control, and how to automate around time-of-use tariffs and feed-in tariffs so your automations actually cut the bill.',
    subcategories: ['Smart Plugs', 'Power Boards', 'Energy Relays & Meters', 'Portable Power Stations'],
  },
  {
    key: 'entertainment',
    name: 'Entertainment & Audio',
    slug: 'entertainment-and-audio',
    emoji: '🔊',
    blurb: 'Speakers, streaming, multi-room audio and TV integration.',
    intro:
      'Smart speakers, multi-room audio, streaming boxes and how they tie into the rest of the house. Includes what actually works with Australian free-to-air and local streaming services, and which voice assistants are worth committing to.',
    subcategories: ['Smart Speakers', 'Smart Soundbars', 'Smart Displays & TV Boxes'],
  },
  {
    key: 'climate',
    name: 'Climate & Comfort',
    slug: 'climate-and-comfort',
    emoji: '🌡️',
    blurb: 'Air conditioning, heating, fans, sensors and air quality.',
    intro:
      'Australia asks a lot of climate control — 45°C summers in the west, damp winters in Melbourne, humidity in Queensland. This section covers making split systems smart, thermostats, ceiling fan control, humidity and air quality monitoring, and bushfire-smoke automations.',
    subcategories: ['Smart AC Controllers & Thermostats', 'Air Purifiers & Monitors', 'Climate Sensors'],
  },
  {
    key: 'hubs-and-platforms',
    name: 'Hubs & Platforms',
    slug: 'hubs-and-platforms',
    emoji: '🧠',
    blurb: 'Matter, Thread, Zigbee, Z-Wave, Home Assistant and the big ecosystems.',
    intro:
      'The most important decision you will make is which platform to build on, because it determines what you can buy for the next decade. This section explains Matter, Thread, Zigbee and Z-Wave in plain language, and compares Apple Home, Google Home, Amazon Alexa, SmartThings and Home Assistant.',
    subcategories: ['Matter & Thread Hubs', 'Zigbee & Z-Wave Coordinators', 'Automation Controllers'],
  },
  {
    key: 'robot-vacuums',
    name: 'Robot Vacuums',
    slug: 'robot-vacuums',
    emoji: '🤖',
    blurb: 'Robot vacuums, mops and self-emptying docks.',
    intro:
      'Robot vacuums and mops, how mapping and navigation actually differ between price tiers, what a self-emptying dock is worth, and how they cope with the pet hair and hard floors common in Australian homes.',
    subcategories: ['Robot Vacuums & Mops', 'Self-Emptying Docks', 'Curtain & Home Automations'],
  },
  {
    key: 'setup-guides',
    name: 'Setup Guides',
    slug: 'setup-guides',
    emoji: '🛠️',
    blurb: 'Step-by-step installation, configuration and troubleshooting.',
    intro:
      'Practical, step-by-step walkthroughs: getting devices onto your Wi-Fi, building your first automations, fixing connection dropouts, and knowing when a job legally requires a licensed electrician in Australia.',
    overview: {
      heading: 'What setting up a smart home in Australia actually involves',
      paragraphs: [
        'Most smart home problems are network problems. Devices that pair once and drop off, automations that fire late, cameras that buffer — the cause is usually 2.4 GHz congestion, a mesh node placed badly, or a router quietly moving a device between bands. Getting the network right first saves more time than any individual device guide.',
        'The second thing worth knowing before you start is where the legal line sits. In every Australian state, fixed wiring is licensed electrician territory. That covers hardwired switches, downlights and anything behind a wall plate. Plug-in devices, battery sensors and adhesive-mounted gear are yours to install. Getting this wrong is not a technicality — unlicensed electrical work voids home insurance and carries real penalties.',
        'Renting changes the calculation rather than ending it. Almost everything worth having in a smart home plugs in, sits on a shelf, or mounts with removable adhesive. The guides here flag what needs permission and what does not, so you can build something that comes with you when you move.',
      ],
    },
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

/*
 * Header navigation, grouped by what the reader is trying to do rather than by
 * how the content is stored: buy something, explore a topic, or follow a
 * how-to. Each group is one dropdown, so the bar stays at four items.
 */

/** Guides are articles, not products — the two keys below are excluded from
 *  anything product-facing, since /products/category/setup-guides/ lists
 *  nothing and wastes both a click and a crawl. */
const GUIDE_KEYS = ['setup-guides', 'buying-guides'];

const topicCategories = categories.filter((c) => !GUIDE_KEYS.includes(c.key));

/** "All Products" — the catalogue, plus a category per product hub. */
export const productsNavLink = { href: '/products/', label: 'All Products' };

export const productCategoryNavLinks = topicCategories.map((category) => ({
  href: `/products/category/${category.slug}/`,
  label: category.name,
  emoji: category.emoji,
}));

/** "Categories" — the seven editorial topic hubs, rendered two-up. */
export const topicNavLinks = topicCategories.map((category) => ({
  href: `/categories/${category.slug}/`,
  label: category.name,
  emoji: category.emoji,
}));

/** "Guides & Advice" — how-to content and the methodology behind it. */
export const guideNavLinks = [
  { href: '/categories/buying-guides/', label: 'Buying Guides', emoji: '🛒' },
  { href: '/categories/setup-guides/', label: 'Setup Guides', emoji: '🛠️' },
  { href: '/how-we-test/', label: 'How We Test', emoji: '🔬' },
];

/** "Latest" — every article, newest first. A plain link, not a menu. */
export const latestNavLink = { href: '/articles/', label: 'Latest' };

export const searchLink = { href: '/search/', label: 'Search' };
