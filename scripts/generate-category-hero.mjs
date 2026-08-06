/**
 * Generate hero banners for the category pages.
 *
 *   node --env-file=.env.local scripts/generate-category-hero.mjs all
 *   node --env-file=.env.local scripts/generate-category-hero.mjs lighting
 *   node --env-file=.env.local scripts/generate-category-hero.mjs all --kind=product
 *   node --env-file=.env.local scripts/generate-category-hero.mjs lighting --force
 *
 * Two banners exist per category, and they are not the same picture:
 *
 *   post     /categories/<slug>/           deep editorial tone, still life
 *   product  /products/category/<slug>/    brighter shop tone, front-facing line-up
 *
 * The sibling of scripts/generate-cover.mjs, and split the same way for the same
 * reason: fal.ai renders only the photographic half — a square product shot on a
 * flat backdrop — and scripts/compose-category-hero.py sets the type locally in
 * Urbanist. Image models spell badly, and a wrong category name on a banner is
 * wrong on every page in that section until someone notices.
 *
 * The raw generation is kept, so a renamed category or a reworded blurb needs
 * only the compositing step re-run, not another paid generation.
 *
 * Real photographs beat generated artwork and cost nothing. If any of these
 * exist, fal is not called at all:
 *
 *   assets/category-images/<kind>/<slug>.<ext>   this kind, this category
 *   assets/category-images/<kind>/<slug>/        several, this kind
 *   assets/category-images/<slug>.<ext>          both kinds
 *   assets/category-images/<slug>/               both kinds
 *   assets/product-images/<slug>/                the pool compose-cover.py shares
 *
 * Pass --ignore-photos to generate anyway.
 *
 * Flags
 *   --kind=post|product|both   default both
 *   --force                    regenerate the artwork (spends credits)
 *   --schnell                  cheaper, faster, rougher model
 *   --ignore-photos            ignore assets/, always generate
 *   --dry-run                  print what would run, call nothing
 */
import { fal } from '@fal-ai/client';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  GUIDE_KEYS,
  buildPrompt,
  colourFor,
  eyebrowFor,
  headingFor,
  readCategories,
} from './category-hero-prompt.mjs';

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, 'public', 'heroes', 'raw');
const OUT_DIR = path.join(ROOT, 'public', 'heroes');
const EXTS = ['png', 'jpg', 'jpeg', 'webp'];

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const DRY = args.includes('--dry-run');
const IGNORE_PHOTOS = args.includes('--ignore-photos');
const MODEL = args.includes('--schnell') ? 'fal-ai/flux/schnell' : 'fal-ai/flux/dev';
const kindArg = (args.find((a) => a.startsWith('--kind=')) ?? '--kind=both').slice(7);
const target = args.find((a) => !a.startsWith('--'));

if (!target) {
  console.error('Usage: node --env-file=.env.local scripts/generate-category-hero.mjs <category-slug|all> [flags]');
  console.error('Flags: --kind=post|product|both  --force  --schnell  --ignore-photos  --dry-run');
  process.exit(1);
}
if (!['post', 'product', 'both'].includes(kindArg)) {
  console.error(`--kind must be post, product or both — got '${kindArg}'`);
  process.exit(1);
}
const KINDS = kindArg === 'both' ? ['post', 'product'] : [kindArg];

const categories = readCategories();
const selected =
  target === 'all' ? categories : categories.filter((c) => c.slug === target || c.key === target);

if (!selected.length) {
  console.error(`No such category: ${target}`);
  console.error(`Known: ${categories.map((c) => c.slug).join(', ')}`);
  process.exit(1);
}

/**
 * Product banners for the guide sections are skipped on an `all` run.
 *
 * /products/category/setup-guides/ is a real route — generateStaticParams builds
 * one for every category — but nothing in the header links to it and it lists no
 * products, because those two sections are articles. Generating artwork for a
 * page with nothing on it is spending credits on a page nobody reaches. Naming
 * the category explicitly still builds it.
 */
function jobsFor(category) {
  return KINDS.filter(
    (kind) => !(kind === 'product' && target === 'all' && GUIDE_KEYS.includes(category.key)),
  ).map((kind) => ({ category, kind }));
}

const jobs = selected.flatMap(jobsFor);
if (!jobs.length) {
  console.error('Nothing to do for that combination of category and --kind.');
  process.exit(1);
}

function imagesIn(dir) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => EXTS.includes(f.toLowerCase().split('.').pop()))
    .sort()
    .map((f) => path.join(dir, f));
}

function firstFile(base) {
  for (const ext of EXTS) {
    const cand = `${base}.${ext}`;
    if (fs.existsSync(cand)) return [cand];
  }
  return [];
}

/**
 * Real photographs for this banner, most specific first.
 *
 * The shared pool at the end is the one compose-cover.py already draws article
 * covers from, so a folder of photographs dropped in once serves both. The two
 * kinds take different slices of it where it is deep enough — the same three
 * products in the same order on both banners would look like one page had been
 * copied onto the other.
 *
 * Three at most, not four: the row is width-limited by the banner's right half,
 * so a fourth photograph shrinks all of them to the point where a camera is a
 * white speck.
 */
const MAX_PHOTOS = 3;

function suppliedPhotos({ category, kind }) {
  if (IGNORE_PHOTOS) return [];
  const base = path.join(ROOT, 'assets', 'category-images');
  const slug = category.slug;

  for (const cand of [
    firstFile(path.join(base, kind, slug)),
    imagesIn(path.join(base, kind, slug)),
    firstFile(path.join(base, slug)),
    imagesIn(path.join(base, slug)),
  ]) {
    if (cand.length) return cand.slice(0, MAX_PHOTOS);
  }

  const pool = imagesIn(path.join(ROOT, 'assets', 'product-images', slug));
  if (!pool.length) return [];
  const want = Math.min(MAX_PHOTOS, pool.length);
  const offset = kind === 'product' && pool.length > want ? want : 0;
  return Array.from({ length: want }, (_, i) => pool[(offset + i) % pool.length]);
}

fs.mkdirSync(RAW_DIR, { recursive: true });

if (!DRY && !process.env.FAL_KEY) {
  // Only fatal if something actually needs generating — a run covered entirely
  // by supplied photographs should not require a key it never uses.
  const needsFal = jobs.some(
    (job) =>
      !suppliedPhotos(job).length &&
      (FORCE || !fs.existsSync(path.join(RAW_DIR, `${job.kind}-${job.category.slug}.jpg`))),
  );
  if (needsFal) {
    console.error('FAL_KEY is not set.');
    console.error('Add it to .env.local (it is gitignored) and re-run with --env-file=.env.local');
    process.exit(1);
  }
} else if (process.env.FAL_KEY) {
  fal.config({ credentials: process.env.FAL_KEY });
}

let generated = 0;
let reused = 0;
let fromPhotos = 0;

for (const { category, kind } of jobs) {
  const colour = colourFor(category.key, kind);
  const photos = suppliedPhotos({ category, kind });
  const rawPath = path.join(RAW_DIR, `${kind}-${category.slug}.jpg`);

  console.log(`\n${kind.padEnd(7)} ${category.slug}`);
  console.log(`  colour : ${colour.name} ${colour.hex}`);

  if (photos.length) {
    console.log(`  source : ${photos.length} supplied photo(s) — no fal call`);
    fromPhotos += 1;
  } else if (fs.existsSync(rawPath) && !FORCE) {
    console.log('  source : existing raw generation (pass --force to regenerate)');
    reused += 1;
  } else {
    const prompt = buildPrompt({ key: category.key, kind, colour });
    console.log(`  model  : ${MODEL}`);
    console.log(`  prompt : ${prompt.length} chars`);
    if (DRY) {
      console.log('  dry run — not generating');
      continue;
    }
    const res = await fal.subscribe(MODEL, {
      input: {
        // Square, not wide. Asking for a wide frame with an empty left column
        // failed repeatedly — objects and their shadows crossed into the text
        // area. compose-category-hero.py places this square on the right of the
        // banner itself, which cannot drift. 704 is a multiple of 8, which the
        // model requires.
        prompt,
        image_size: { width: 704, height: 704 },
        num_images: 1,
        enable_safety_checker: true,
        num_inference_steps: 32,
      },
      logs: false,
    });
    const url = res?.data?.images?.[0]?.url;
    if (!url) {
      console.error('  fal returned no image URL — skipping');
      continue;
    }
    const img = await fetch(url);
    fs.writeFileSync(rawPath, Buffer.from(await img.arrayBuffer()));
    console.log(`  saved  : public/heroes/raw/${kind}-${category.slug}.jpg`);
    generated += 1;
  }

  if (DRY) {
    console.log(`  dry run — would composite "${headingFor(category, kind)}"`);
    continue;
  }

  const composeArgs = [
    path.join(ROOT, 'scripts', 'compose-category-hero.py'),
    '--kind', kind,
    '--slug', category.slug,
    '--eyebrow', eyebrowFor(kind),
    '--main', headingFor(category, kind),
    '--sub', category.blurb,
    '--bg', colour.hex,
    '--out-dir', OUT_DIR,
  ];
  if (photos.length) composeArgs.push('--photos', ...photos);
  else composeArgs.push('--raw', rawPath);

  execFileSync('python3', composeArgs, { cwd: ROOT, stdio: 'inherit' });
}

console.log(
  `\nDone. ${jobs.length} banner(s): ${generated} generated, ${reused} reused, ${fromPhotos} from photographs.`,
);
