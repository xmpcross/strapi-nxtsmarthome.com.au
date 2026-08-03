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
import { assignColour, buildPrompt } from './cover-prompt.mjs';

const ROOT = process.cwd();
const ARTICLES = path.join(ROOT, 'content', 'articles');
const RAW_DIR = path.join(ROOT, 'public', 'covers', 'raw');
const OUT_DIR = path.join(ROOT, 'public', 'covers');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const slug = args.find((a) => !a.startsWith('--'));

if (!slug) {
  console.error('Usage: node --env-file=.env.local scripts/generate-cover.mjs <article-slug> [--force]');
  process.exit(1);
}
if (!process.env.FAL_KEY) {
  console.error('FAL_KEY is not set.');
  console.error('Add it to .env.local (it is gitignored) and re-run with --env-file=.env.local');
  process.exit(1);
}
fal.config({ credentials: process.env.FAL_KEY });

const file = path.join(ARTICLES, `${slug}.md`);
if (!fs.existsSync(file)) {
  console.error(`No such article: content/articles/${slug}.md`);
  process.exit(1);
}
const { data, content } = matter(fs.readFileSync(file, 'utf8'));

// Colour rotation is persisted, so consecutive articles never share a background.
const { colour, previous } = assignColour(slug, { reassign: args.includes('--recolour') });
const prompt = buildPrompt({
  title: data.title ?? slug,
  description: data.description ?? '',
  body: content,
  colour,
  previous,
});

fs.mkdirSync(RAW_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });
const rawPath = path.join(RAW_DIR, `${slug}.jpg`);



console.log(`article : ${slug}`);
console.log(`colour  : ${colour.name} ${colour.hex}`);
console.log(`previous: ${previous.join(', ') || 'none yet'}`);
console.log(`prompt  : ${prompt.length} chars`);

if (fs.existsSync(rawPath) && !FORCE) {
  console.log('\nRaw generation already exists — reusing it (pass --force to regenerate and spend credits).');
} else {
  console.log('\nGenerating with fal-ai/flux/schnell …');
  const MODEL = args.includes('--schnell') ? 'fal-ai/flux/schnell' : 'fal-ai/flux/dev';
  console.log(`model   : ${MODEL}`);
  const res = await fal.subscribe(MODEL, {
    input: {
      prompt,
      // 1240x704 — both multiples of 8, which the model requires. 704 rather
      // than 700 for that reason; compose-cover.py trims it to exactly 1240x700.
      image_size: { width: 1240, height: 704 },
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
  console.log(`saved raw generation → public/covers/raw/${slug}.jpg`);
}

// Composite the real headline over the generated product shot.
console.log('\nCompositing headline …');
execFileSync('python3', [path.join(ROOT, 'scripts', 'compose-cover.py'), slug], {
  cwd: ROOT,
  stdio: 'inherit',
});
