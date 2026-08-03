/**
 * Scaffold the eight "quick win" articles from the keyword map.
 *
 *   node scripts/scaffold-quick-wins.mjs            # preview
 *   node scripts/scaffold-quick-wins.mjs --write
 *
 * Each article is created through scripts/new-article.mjs so there is one
 * template, then renamed to a shorter hand-picked slug — the generated slug is
 * derived from the full title and ends up unwieldy
 * ("b22-vs-e27-which-smart-bulb-fitting-do-australian-homes-need").
 *
 * Everything lands as `draft: true`. lib/content.ts:136 drops drafts from the
 * build, so nothing reaches the site until you remove that flag deliberately.
 *
 * Re-running is safe: anything already present is skipped.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ARTICLES = path.join(ROOT, 'content', 'articles');
const WRITE = process.argv.includes('--write');

/** rank order matches the keyword map's start-here shortlist */
const PLAN = [
  {
    rank: 1,
    title: 'B22 vs E27: Which Smart Bulb Fitting Do Australian Homes Need?',
    slug: 'b22-vs-e27-smart-bulb-fittings-australia',
    category: 'lighting',
    type: 'explainer',
  },
  {
    rank: 2,
    title: 'Smart Locks in Australia: What Actually Matters Before You Buy',
    slug: 'smart-locks-australia-buying-guide',
    category: 'security',
    type: 'buying-guide',
    note: 'No ratings or ranked picks until locks have been hands-on tested (CLAUDE.md rule 5).',
  },
  {
    rank: 3,
    title: 'Smart Doorbells and Renting: Can Your Landlord Say No?',
    slug: 'smart-doorbell-renting-landlord-permission',
    category: 'security',
    type: 'explainer',
    verify: 'tenancy law — varies by state, and by whether the doorbell counts as a fixture or a fitting',
  },
  {
    rank: 4,
    title: 'Indoor Security Cameras: What Matters in an Australian Home',
    slug: 'indoor-security-camera-buying-guide-australia',
    category: 'security',
    type: 'buying-guide',
    note: 'Pairs with video-doorbell-buying-guide-australia — link both ways.',
  },
  {
    rank: 5,
    title: 'Do Smart Home Devices Still Work When the Internet Drops?',
    slug: 'smart-home-devices-without-internet',
    category: 'hubs-and-platforms',
    type: 'explainer',
    note: 'Draw on the local-control material already in the Zigbee and Matter articles.',
  },
  {
    rank: 6,
    title: 'Smart Home in a Strata Apartment: What You Can Actually Install',
    slug: 'smart-home-strata-apartment-australia',
    category: 'buying-guides',
    type: 'explainer',
    verify: 'strata by-laws — vary by scheme and by state',
  },
  {
    rank: 7,
    title: 'Smart Blinds in Australia: What to Know Before You Spend',
    slug: 'smart-blinds-australia-buying-guide',
    category: 'climate',
    type: 'buying-guide',
    note: 'Angle is heat management, which is why this sits in climate rather than lighting.',
  },
  {
    rank: 8,
    title: 'Where to Buy Smart Home Gear in Australia: Bunnings vs JB Hi-Fi',
    slug: 'where-to-buy-smart-home-australia',
    category: 'buying-guides',
    type: 'comparison',
    note: 'Touches all seven affiliate retailers — see scripts/retailers.mjs.',
  },
];

/** The slug scripts/new-article.mjs will derive from a title. */
const derivedSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

let created = 0;
let skipped = 0;

for (const item of PLAN) {
  const dest = path.join(ARTICLES, `${item.slug}.md`);

  if (fs.existsSync(dest)) {
    console.log(`  ${item.rank}. skip     ${item.slug} — already exists`);
    skipped++;
    continue;
  }

  if (!WRITE) {
    console.log(`  ${item.rank}. would create ${item.slug}.md  [${item.category}/${item.type}]`);
    continue;
  }

  const generated = path.join(ARTICLES, `${derivedSlug(item.title)}.md`);

  // The title-derived file may already exist from a manual `npm run new:article`.
  // Adopt it rather than failing — the only difference is the filename.
  if (fs.existsSync(generated)) {
    fs.renameSync(generated, dest);
    console.log(`  ${item.rank}. adopted  ${item.slug}.md  (renamed from title-derived slug)`);
    created++;
    continue;
  }

  // Reuse the one template rather than duplicating it here.
  execFileSync('node', ['scripts/new-article.mjs', item.title, item.category, item.type], {
    cwd: ROOT,
    stdio: 'pipe',
  });

  if (!fs.existsSync(generated)) {
    console.error(`  ${item.rank}. FAILED   expected ${path.basename(generated)}`);
    continue;
  }
  fs.renameSync(generated, dest);

  // Leave the research context in the file so it is not lost between sessions.
  const lines = ['', '<!--', `  Quick-win #${item.rank} from the keyword map.`];
  if (item.note) lines.push(`  Note: ${item.note}`);
  if (item.verify) {
    lines.push(
      '',
      `  [VERIFY] ${item.verify}`,
      '  Do not state this as settled law. Human fact-check required before publishing.',
    );
  }
  lines.push('-->', '');
  fs.appendFileSync(dest, lines.join('\n'));

  console.log(`  ${item.rank}. created  ${item.slug}.md  [${item.category}/${item.type}]`);
  created++;
}

console.log(
  WRITE
    ? `\n${created} created, ${skipped} skipped. All are draft: true — run \`git diff --stat\` then edit.`
    : `\n${PLAN.length - skipped} would be created. Re-run with --write.`,
);
