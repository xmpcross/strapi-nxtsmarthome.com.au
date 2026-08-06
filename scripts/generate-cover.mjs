/**
 * Generate a featured image for an article using fal.ai.
 *
 *   node --env-file=.env.local scripts/generate-cover.mjs <article-slug>
 *   node --env-file=.env.local scripts/generate-cover.mjs <article-slug> --force
 *
 * Layout follows the Magzin reference: a coloured background that varies by
 * category, the product photographed on the RIGHT, and the headline on the LEFT.
 *
 * Why two steps rather than one prompt
 * -----------------------------------
 * Image models render text badly — misspelled words, invented letterforms,
 * wrong line breaks. Putting the article title in the prompt would produce a
 * plausible-looking headline that is subtly wrong, on every card, permanently.
 *
 * So fal generates only the photographic half: the product, on a flat background,
 * composed to the right with empty space on the left. The headline is then
 * composited locally in Urbanist by scripts/compose-cover.py, which guarantees
 * the real title, spelled correctly, on brand.
 *
 * The raw generation is kept alongside the finished cover so a title change only
 * needs the compositing step re-run, not another paid generation.
 */
import { fal } from '@fal-ai/client';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';
import { assignColour, buildGreyPrompt, buildPrompt } from './cover-prompt.mjs';

const ROOT = process.cwd();
const ARTICLES = path.join(ROOT, 'content', 'articles');
const RAW_DIR = path.join(ROOT, 'public', 'covers', 'raw');
const OUT_DIR = path.join(ROOT, 'public', 'covers');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const slug = args.find((a) => !a.startsWith('--'));

/*
  Two designs.

  'grey' is the default and matches the covers now being made in Midjourney: one
  flat light grey backdrop, photographic product, no type. The generation IS the
  cover, so it is requested at the final output size and nothing is composited
  afterwards — which is also how the exact pixel dimensions are guaranteed
  rather than hoped for.

  '--design=magzin' is the original: a coloured backdrop per the palette
  rotation, generated square, with the headline typeset over it by
  scripts/compose-cover.py.
*/
const DESIGN = (args.find((a) => a.startsWith('--design=')) ?? '--design=grey').split('=')[1];

/*
  Output size. Both values must be multiples of 8 — the model requires it, and
  a size it cannot honour is silently rounded, which is how you end up with a
  cover that is 4px off the size you asked for.
*/
const sizeArg = (args.find((a) => a.startsWith('--size=')) ?? '--size=1000x600').split('=')[1];
const [OUT_W, OUT_H] = sizeArg.split('x').map(Number);
if (![OUT_W, OUT_H].every((n) => Number.isInteger(n) && n > 0 && n % 8 === 0)) {
  console.error(`--size must be WxH with both a positive multiple of 8 — got '${sizeArg}'`);
  process.exit(1);
}

if (!slug) {
  console.error('Usage: node --env-file=.env.local scripts/generate-cover.mjs <article-slug> [--force]');
  process.exit(1);
}
if (process.env.FAL_KEY) {
  fal.config({ credentials: process.env.FAL_KEY });
}

const file = path.join(ARTICLES, `${slug}.md`);
if (!fs.existsSync(file)) {
  console.error(`No such article: content/articles/${slug}.md`);
  process.exit(1);
}
const { data, content } = matter(fs.readFileSync(file, 'utf8'));

const GREY = DESIGN === 'grey';

// The colour rotation is persisted state, so it is only touched by the design
// that actually uses it. Calling it on a grey run would advance the rotation for
// an article that never shows a palette colour.
const { colour, previous } = GREY
  ? { colour: { name: 'Light grey', hex: '#D1D5DB' }, previous: [] }
  : assignColour(slug, { reassign: args.includes('--recolour') });

const prompt = GREY
  ? buildGreyPrompt({
      title: data.title ?? slug,
      description: data.description ?? '',
      body: content,
    })
  : buildPrompt({
      title: data.title ?? slug,
      description: data.description ?? '',
      body: content,
      colour,
      previous,
    });

fs.mkdirSync(RAW_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });
// Kept apart from the square Magzin raw, so switching designs cannot pick up a
// generation shaped for the other one.
const rawPath = GREY
  ? path.join(RAW_DIR, `${slug}-grey.jpg`)
  : path.join(RAW_DIR, `${slug}.jpg`);

if (!process.env.FAL_KEY && !fs.existsSync(rawPath) && !fs.existsSync(path.join(RAW_DIR, `${slug}.png`))) {
  console.log('FAL_KEY is not set. Looking for local raw generation file or using AI generator pipeline...');
}

if (process.env.FAL_KEY) {
  fal.config({ credentials: process.env.FAL_KEY });
}

console.log(`article : ${slug}`);
console.log(`design  : ${DESIGN}${GREY ? `, ${OUT_W}x${OUT_H}, no text` : ''}`);
console.log(`colour  : ${colour.name} ${colour.hex}`);
if (!GREY) console.log(`previous: ${previous.join(', ') || 'none yet'}`);
console.log(`prompt  : ${prompt.length} chars`);

const rawPngPath = path.join(RAW_DIR, `${slug}.png`);
if ((fs.existsSync(rawPath) || fs.existsSync(rawPngPath)) && !FORCE) {
  console.log('\nRaw generation already exists — reusing it (pass --force to regenerate).');
} else if (process.env.FAL_KEY) {
  console.log('\nGenerating with fal-ai/flux/schnell …');
  const MODEL = args.includes('--schnell') ? 'fal-ai/flux/schnell' : 'fal-ai/flux/dev';
  console.log(`model   : ${MODEL}`);
  const res = await fal.subscribe(MODEL, {
    input: {
      prompt,
      // Grey: generated at the final size, because nothing is composited after
      // it — asking the model for the output dimensions is what makes them
      // exact rather than approximate.
      //
      // Magzin: square, not 16:9. The wide frame was generated so the model
      // could leave the left half empty for the headline; it would not do that
      // reliably — objects and their shadows kept crossing into the text column.
      // So the product is generated square and compose-cover.py places it on the
      // right of the wide canvas itself, which cannot drift. 704 is a multiple of
      // 8, which the model requires.
      image_size: GREY ? { width: OUT_W, height: OUT_H } : { width: 704, height: 704 },
      num_images: 1,
      enable_safety_checker: true,
      num_inference_steps: 32,
    },
    logs: false,
  });
  const url = res?.data?.images?.[0]?.url;
  if (!url) {
    console.error('fal returned no image URL');
    process.exit(1);
  }
  const img = await fetch(url);
  fs.writeFileSync(rawPath, Buffer.from(await img.arrayBuffer()));
  console.log(`saved raw generation → ${path.relative(ROOT, rawPath)}`);
} else {
  console.log('\nFAL_KEY not configured. To generate via fal.ai, add FAL_KEY to .env.local.');
}

if (GREY) {
  // No compositing step: the generation is the cover. Only the square card
  // variant has to be cut, and that is a crop rather than a re-render so the
  // tile and the cover are the same artwork.
  console.log('\nWriting covers …');
  execFileSync(
    'python3',
    [path.join(ROOT, 'scripts', 'finish-plain-cover.py'), slug, rawPath, `${OUT_W}x${OUT_H}`],
    { cwd: ROOT, stdio: 'inherit' },
  );
} else {
  // Composite headline over product shot and build webp covers
  console.log('\nCompositing headline & building WebP covers …');
  execFileSync('python3', [path.join(ROOT, 'scripts', 'compose-cover.py'), slug], {
    cwd: ROOT,
    stdio: 'inherit',
  });
}

// Copy to web root if exists
const WEB_ROOT = '/var/www/html/nxtsmarthome.com.au/covers';
if (fs.existsSync(WEB_ROOT)) {
  const mainWebp = path.join(OUT_DIR, `${slug}.webp`);
  const sqWebp = path.join(OUT_DIR, 'square', `${slug}.webp`);
  if (fs.existsSync(mainWebp)) {
    fs.copyFileSync(mainWebp, path.join(WEB_ROOT, `${slug}.webp`));
  }
  if (fs.existsSync(sqWebp)) {
    fs.mkdirSync(path.join(WEB_ROOT, 'square'), { recursive: true });
    fs.copyFileSync(sqWebp, path.join(WEB_ROOT, 'square', `${slug}.webp`));
  }
  console.log(`Synced webp covers to ${WEB_ROOT}`);
}
