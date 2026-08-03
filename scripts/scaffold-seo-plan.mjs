/**
 * Scaffold the pillar pages and supporting articles from the SEO strategy plan.
 *
 *   node scripts/scaffold-seo-plan.mjs            # preview
 *   node scripts/scaffold-seo-plan.mjs --write
 *
 * Same approach as scaffold-quick-wins.mjs: create through scripts/new-article.mjs
 * so there is a single template, then rename to a hand-picked slug because the
 * title-derived one is unusable ("how-much-does-a-smart-home-actually-cost-in-australia").
 *
 * Everything is draft: true. lib/content.ts drops drafts from the build, so none of
 * this reaches the site until the flag is removed deliberately.
 *
 * Titles avoid "Best X" on purpose. That phrasing promises a tested, ranked list,
 * which CLAUDE.md rule 5 forbids until devices have been hands-on tested. The
 * intent is identical; the claim is not.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ARTICLES = path.join(ROOT, 'content', 'articles');
const WRITE = process.argv.includes('--write');

const PLAN = [
  /* ---- Pillars ---------------------------------------------------------- */
  {
    group: 'Pillar',
    title: 'Home Security in Australia: Cameras, Doorbells and Locks',
    slug: 'home-security-australia-pillar',
    category: 'security',
    type: 'pillar',
    note: 'Hub for: video doorbell guide, indoor + outdoor camera guides, smart locks, Ring vs Eufy vs Arlo, smoke/leak sensors, and the privacy-law article as a trust signal.',
  },
  {
    group: 'Pillar',
    title: 'Matter, Thread, Zigbee and Z-Wave: The Australian Guide',
    slug: 'smart-home-standards-australia-pillar',
    category: 'hubs-and-platforms',
    type: 'pillar',
    note: 'Binds the existing Matter and protocol articles, plus Thread vs Matter and the network-design piece.',
  },
  {
    group: 'Pillar',
    title: 'Smart Home on a Budget: A Practical Australian Guide',
    slug: 'smart-home-budget-australia-pillar',
    category: 'buying-guides',
    type: 'pillar',
    note: 'Differentiator pillar. Decide whether the existing renters article becomes a child of this or is widened into it instead.',
  },

  /* ---- Beginner --------------------------------------------------------- */
  {
    group: 'Beginner',
    title: 'How Much Does a Smart Home Actually Cost in Australia?',
    slug: 'smart-home-cost-australia',
    category: 'buying-guides',
    type: 'explainer',
    verify: 'all AUD pricing tiers — verify against current retailer pricing at publish and set a refresh cadence',
  },
  {
    group: 'Beginner',
    title: 'Do Overseas Smart Home Devices Work in Australia?',
    slug: 'overseas-smart-home-devices-australia',
    category: 'buying-guides',
    type: 'explainer',
    verify: 'voltage, plug standards and frequency claims — AS/NZS references must be checked, not asserted',
  },
  {
    group: 'Beginner',
    title: 'Smart Home Devices Renters Can Install Without Drilling',
    slug: 'renter-smart-home-devices-no-drilling',
    category: 'buying-guides',
    type: 'roundup',
    verify: 'tenancy rules vary by state — what counts as an alteration is not uniform',
  },
  {
    group: 'Beginner',
    title: 'Apple Home vs Google Home vs Alexa: Which Should You Pick?',
    slug: 'apple-google-alexa-comparison-australia',
    category: 'hubs-and-platforms',
    type: 'comparison',
    note: 'Child of the platform pillar. Avoid duplicating it — this is the head-to-head, the pillar is the overview.',
  },

  /* ---- Intermediate ----------------------------------------------------- */
  {
    group: 'Intermediate',
    title: 'Outdoor Security Cameras: What Matters in an Australian Home',
    slug: 'outdoor-security-camera-buying-guide-australia',
    category: 'security',
    type: 'buying-guide',
    note: 'Completes the camera pair with the indoor guide already drafted.',
  },
  {
    group: 'Intermediate',
    title: 'Mesh Wi-Fi for Smart Homes: What Australian Houses Need',
    slug: 'mesh-wifi-smart-home-australia',
    category: 'setup-guides',
    type: 'buying-guide',
    note: 'Natural link target from the Wi-Fi dropouts article, which is likely your traffic magnet.',
  },
  {
    group: 'Intermediate',
    title: 'Ring vs Eufy vs Arlo: Which Suits an Australian Home?',
    slug: 'ring-vs-eufy-vs-arlo-australia',
    category: 'security',
    type: 'comparison',
    verify: 'AU availability and subscription pricing for all three brands',
  },
  {
    group: 'Intermediate',
    title: 'Smart Smoke Alarms and Water Leak Sensors in Australia',
    slug: 'smoke-alarms-leak-sensors-australia',
    category: 'security',
    type: 'buying-guide',
    verify: 'smoke alarm legislation — mandatory type, placement and interconnection rules differ by state and are a safety matter',
  },
  {
    group: 'Intermediate',
    title: 'Robot Mops and Vacuum-Mop Combos: What Actually Matters',
    slug: 'robot-mop-vacuum-combo-australia',
    category: 'robot-vacuums',
    type: 'buying-guide',
  },

  /* ---- Advanced --------------------------------------------------------- */
  {
    group: 'Advanced',
    title: 'Home Assistant Setup for Australian Homes: A Practical Guide',
    slug: 'home-assistant-setup-australia',
    category: 'setup-guides',
    type: 'how-to',
  },
  {
    group: 'Advanced',
    title: 'Building a Local-Only Smart Home in Australia',
    slug: 'local-only-smart-home-australia',
    category: 'hubs-and-platforms',
    type: 'explainer',
    note: 'Related to the "works without internet" draft — that one answers the fear, this one is the build guide. Link them, do not merge.',
  },
  {
    group: 'Advanced',
    title: 'Zigbee vs Thread: Network Design for Multi-Storey Homes',
    slug: 'zigbee-thread-network-design-australia',
    category: 'hubs-and-platforms',
    type: 'explainer',
  },
  {
    group: 'Advanced',
    title: 'Solar and Home Battery Data in Your Smart Home',
    slug: 'solar-battery-smart-home-australia',
    category: 'energy',
    type: 'explainer',
    verify: 'inverter compatibility, feed-in tariffs and rebates — these change and vary by state',
  },
  {
    group: 'Advanced',
    title: 'Cutting Power Bills With Smart Automation and Time-of-Use Tariffs',
    slug: 'energy-automation-time-of-use-australia',
    category: 'energy',
    type: 'explainer',
    verify: 'time-of-use tariff structures and any savings figures — vary by distributor and retailer',
    note: 'Title is 65 chars and may truncate in results. Shorter option: "Cutting Power Bills With Smart Home Automation".',
  },

  /* ---- From the 90-day calendar ----------------------------------------- */
  {
    group: 'Calendar',
    title: 'Thread vs Matter: What Is the Difference, Simply Explained',
    slug: 'thread-vs-matter-difference',
    category: 'hubs-and-platforms',
    type: 'explainer',
    verify: 'Matter and Thread version numbers and feature support — check manufacturer docs',
  },
  {
    group: 'Calendar',
    title: 'Smart Thermostats and Aircon Controllers in Australia',
    slug: 'smart-thermostat-aircon-controller-australia',
    category: 'climate',
    type: 'buying-guide',
    note: 'Buying-guide counterpart to the existing split-system how-to. Link both ways.',
  },
  {
    group: 'Calendar',
    title: 'Smart Home Deals in Australia: EOFY and Black Friday',
    slug: 'smart-home-deals-australia',
    category: 'buying-guides',
    type: 'roundup',
    note: 'Publish well before the window so it ages. EOFY is June; Black Friday late November.',
  },
];

const derivedSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

let created = 0;
let skipped = 0;
let group = '';

for (const item of PLAN) {
  if (item.group !== group) {
    group = item.group;
    console.log(`\n${group}`);
  }

  const dest = path.join(ARTICLES, `${item.slug}.md`);
  if (fs.existsSync(dest)) {
    console.log(`  skip     ${item.slug}`);
    skipped++;
    continue;
  }
  if (!WRITE) {
    console.log(`  create   ${item.slug}  [${item.category}/${item.type}]`);
    continue;
  }

  const generated = path.join(ARTICLES, `${derivedSlug(item.title)}.md`);
  if (fs.existsSync(generated)) {
    fs.renameSync(generated, dest);
  } else {
    execFileSync('node', ['scripts/new-article.mjs', item.title, item.category, item.type], {
      cwd: ROOT,
      stdio: 'pipe',
    });
    if (!fs.existsSync(generated)) {
      console.error(`  FAILED   ${item.slug}`);
      continue;
    }
    fs.renameSync(generated, dest);
  }

  const lines = ['', '<!--', `  From the SEO strategy plan — ${item.group}.`];
  if (item.note) lines.push(`  Note: ${item.note}`);
  if (item.verify) {
    lines.push(
      '',
      `  [VERIFY] ${item.verify}`,
      '  Human fact-check required before publishing. Do not state as settled.',
    );
  }
  lines.push('-->', '');
  fs.appendFileSync(dest, lines.join('\n'));

  console.log(`  created  ${item.slug}  [${item.category}/${item.type}]`);
  created++;
}

console.log(
  WRITE
    ? `\n${created} created, ${skipped} skipped. All draft: true.`
    : `\n${PLAN.length - skipped} would be created. Re-run with --write.`,
);
