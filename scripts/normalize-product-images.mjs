#!/usr/bin/env node
// Normalise product images to a square, evenly padded WebP.
//
//   node scripts/normalize-product-images.mjs                  # preview, writes nothing
//   node scripts/normalize-product-images.mjs --cutout         # transparent cut-out instead of padding (see Modes)
//   node scripts/normalize-product-images.mjs --out=/tmp/prev   # preview + save the results to look at
//   node scripts/normalize-product-images.mjs --apply           # write the images and repoint the catalogue
//   node scripts/normalize-product-images.mjs --apply --slug=<slug>
//   node scripts/normalize-product-images.mjs --apply --slug=<slug> --image=<url or path>
//
// Options: --limit=N  --size=500  --margin=40  --tolerance=N (default 8 with --cutout, 20 for padding)
//
// Modes. This catalogue is mostly WHITE devices photographed on WHITE, which is
// where it differs from bestlooking.skin: a white camera's edge against a white
// backdrop has no boundary for the flood-fill to stop at, so a cut-out eats into
// the product at any tolerance (tested on the Ring range, 24 Sep 2026).
//   - pad (default): the fill only MEASURES where the product is. The image is
//     trimmed to that box, scaled and centred on a SIZE x SIZE canvas of its own
//     backdrop colour, so the margins are equal and nothing is cut away. Safe on
//     white-on-white.
//   - --cutout: the bestlooking.skin behaviour, transparent background, for
//     products that clearly contrast with their backdrop. Preview with --out
//     and look at the results before --apply.
//
// Adapted from bestlooking.skin/scripts/normalize-product-images.mjs (itself from
// nxt.deals). The image pipeline is unchanged; the source and destination differ.
// On bestlooking.skin products and their images live in Strapi. Here the catalogue
// is public/data/products.json and each product's `image` is a file under
// public/images/products/, so this reads that file and writes a new one beside it.
//
// What one image goes through:
//   1. Decode, honouring EXIF rotation, into straight RGBA.
//   2. Flood-fill the background from the edges inwards. In pad mode this only
//      measures the product; with --cutout the filled area becomes transparent.
//      Filling from the edges, rather than keying every pixel of a colour, keeps
//      interior white opaque: the fill never reaches it.
//   3. --cutout only: soften the alpha edge by one pixel, so the cut-out does
//      not have the jagged rim that a hard threshold leaves.
//   4. Trim to the product, scale the longest side to SIZE - 2*MARGIN, and
//      centre it on a SIZE x SIZE canvas (the backdrop colour, or transparent
//      with --cutout). Centring is what makes the spacing equal: left gap
//      matches right, top matches bottom.
//   5. Encode as WebP and save as a NEW file,
//      public/images/products/<slug>-sq<SIZE>.webp, then repoint the product's
//      `image` in products.json. The original file is never altered or deleted,
//      so any change is reversible by pointing `image` back at it.
//
// Two refusals, because a bad cut-out is worse than none:
//   - If the fill would erase most of the picture, the "background" was the
//     subject (a full-bleed photograph); the image is reported and skipped.
//   - If the fill finds almost nothing, the background is not a plain colour
//     (a full-bleed or lifestyle photo). The image is still squared and padded,
//     and is listed at the end as needing a better source image.
//
// Amazon-hosted images are refused (--image, or a remote `image` in the
// catalogue). Associates rules bar re-using Amazon product images without
// PA-API access, and re-hosting one here is no better than hotlinking it.
//
// Skips products disabled in data/disabled-products.json, and anything this
// script made before (filenames carry the -sq<SIZE> marker).

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CATALOGUE = join(ROOT, 'public', 'data', 'products.json');
const IMAGE_DIR = join(ROOT, 'public', 'images', 'products');
const DISABLED = join(ROOT, 'data', 'disabled-products.json');

const args = process.argv.slice(2);
const flag = (n, d = null) => { const hit = args.find((a) => a.startsWith(`--${n}=`)); return hit ? hit.slice(n.length + 3) : d; };
const APPLY = args.includes('--apply');
const SLUG = flag('slug');
/*
 * --image replaces the picture rather than tidying the one already there: a
 * retailer's own photograph (URL) or a local file, put through the same trim,
 * cut-out and centring as everything else, so a hand-picked image still matches
 * the grid it lands in.
 */
const IMAGE = flag('image');
const LIMIT = Number(flag('limit', Infinity));
const SIZE = Number(flag('size', 500));
const MARGIN = Number(flag('margin', 40));
const CUTOUT = args.includes('--cutout');
// Per-channel distance that still counts as background. Tighter for a cut-out,
// where a loose fill bites into light products.
const TOLERANCE = Number(flag('tolerance', CUTOUT ? 8 : 20));
const OUT = flag('out');
const MARKER = `-sq${SIZE}`;

if (MARGIN * 2 >= SIZE) { console.error(`--margin=${MARGIN} leaves no room inside --size=${SIZE}`); process.exit(1); }
if (IMAGE && !SLUG) { console.error('--image replaces one product\'s picture, so --slug is required with it'); process.exit(1); }
if (OUT) mkdirSync(OUT, { recursive: true });

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const isRemote = (u) => /^https?:\/\//i.test(u);
const isAmazonImage = (u) => {
  try { return /(^|\.)(media-amazon\.com|images-amazon\.com|ssl-images-amazon\.com)$/i.test(new URL(u).hostname); } catch { return false; }
};

/** The image bytes for a catalogue path (/images/products/x.webp?v=..), a local path, or a URL. */
async function readImage(src) {
  if (isRemote(src)) {
    const res = await fetch(src, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  const clean = src.split('?')[0];
  const file = clean.startsWith('/') && existsSync(join(ROOT, 'public', clean)) ? join(ROOT, 'public', clean) : clean;
  if (!existsSync(file)) throw new Error(`no file at ${file}`);
  return readFileSync(file);
}

/* ---------------------------------------------------------------- pixels -- */

/**
 * Make the background transparent by flooding inwards from every edge pixel.
 *
 * `seed` is the median of the four corners: on a catalogue photograph that is
 * the backdrop, and comparing against it rather than against pure white also
 * catches the off-white and light-grey backdrops retailers actually use. A
 * neighbouring pixel joins the background when it is within `TOLERANCE` of the
 * seed on every channel, so a soft vignette is followed while the product edge
 * stops the fill.
 */
function cutOutBackground(data, width, height) {
  const at = (x, y) => (y * width + x) * 4;
  const corner = (x, y) => { const i = at(x, y); return [data[i], data[i + 1], data[i + 2], data[i + 3]]; };
  const corners = [corner(0, 0), corner(width - 1, 0), corner(0, height - 1), corner(width - 1, height - 1)];

  // An image that already has a transparent border is already cut out.
  if (corners.every((c) => c[3] < 24)) return { removed: 0, preexisting: true };

  const med = (k) => corners.map((c) => c[k]).sort((a, b) => a - b)[1];
  const seed = [med(0), med(1), med(2)];

  // The corners must agree with each other, or there is no single backdrop.
  const spread = Math.max(...[0, 1, 2].map((k) => Math.max(...corners.map((c) => Math.abs(c[k] - seed[k])))));
  if (spread > TOLERANCE * 3) return { removed: 0, preexisting: false };

  const isBg = (i) =>
    Math.abs(data[i] - seed[0]) <= TOLERANCE &&
    Math.abs(data[i + 1] - seed[1]) <= TOLERANCE &&
    Math.abs(data[i + 2] - seed[2]) <= TOLERANCE;

  const mask = new Uint8Array(width * height);
  const stack = [];
  for (let x = 0; x < width; x += 1) { stack.push(x, x + (height - 1) * width); }
  for (let y = 0; y < height; y += 1) { stack.push(y * width, y * width + width - 1); }

  while (stack.length) {
    const p = stack.pop();
    if (mask[p]) continue;
    if (!isBg(p * 4)) continue;
    mask[p] = 1;
    const x = p % width;
    const y = (p - x) / width;
    if (x > 0) stack.push(p - 1);
    if (x < width - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - width);
    if (y < height - 1) stack.push(p + width);
  }

  let removed = 0;
  for (let p = 0; p < mask.length; p += 1) if (mask[p]) { data[p * 4 + 3] = 0; removed += 1; }
  return { removed: removed / mask.length, preexisting: false };
}

/**
 * One pass of 3x3 averaging over alpha only, applied to pixels on the boundary
 * between kept and removed. Without it the cut-out rim is a hard staircase.
 */
function featherAlpha(data, width, height) {
  const alpha = new Uint8Array(width * height);
  for (let p = 0; p < alpha.length; p += 1) alpha[p] = data[p * 4 + 3];
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const p = y * width + x;
      let min = 255; let max = 0; let sum = 0;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const a = alpha[p + dy * width + dx];
          sum += a; if (a < min) min = a; if (a > max) max = a;
        }
      }
      if (max - min > 8) data[p * 4 + 3] = Math.round(sum / 9);
    }
  }
}

/** Bounding box of everything still visible, with a small alpha floor to ignore dust. */
function contentBox(data, width, height) {
  let top = height; let left = width; let right = -1; let bottom = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] > 12) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }
  if (right < 0) return null;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

async function normalize(buf) {
  const flat = await sharp(buf).rotate().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = flat.info;
  const data = flat.data;

  // In pad mode the fill runs on a copy: it only measures the product's box.
  const work = CUTOUT ? data : Buffer.from(data);
  const cut = cutOutBackground(work, width, height);
  if (cut.removed > 0.97) return { skip: 'the fill would erase the whole picture' };
  if (CUTOUT && cut.removed > 0) featherAlpha(data, width, height);

  const box = contentBox(work, width, height);
  if (!box || box.width < 8 || box.height < 8) return { skip: 'nothing left after the cut-out' };

  // Pad mode fills the canvas with the backdrop colour (top-left pixel of the
  // source); an image that is already transparent stays transparent.
  const backdrop = CUTOUT || cut.preexisting
    ? null
    : { r: data[0], g: data[1], b: data[2], alpha: 1 };

  /*
   * "fit: contain" scales the longest side to the inner box and centres what is
   * left over, so the object sits in the middle; extending by MARGIN on all four
   * sides then makes the gap identical on every edge, whatever the object's
   * shape. Doing it in one chain also avoids a re-encode between the two steps.
   * WebP rather than bestlooking's PNG: the rest of this catalogue is WebP, and
   * it keeps the alpha channel at a fraction of the size.
   */
  const fill = backdrop ?? { r: 0, g: 0, b: 0, alpha: 0 };
  const inner = SIZE - MARGIN * 2;
  const out = await sharp(data, { raw: { width, height, channels: 4 } })
    .extract(box)
    .resize(inner, inner, { fit: 'contain', background: fill })
    .extend({ top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN, background: fill })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toBuffer();

  return { buf: out, removed: cut.removed, preexisting: cut.preexisting, from: `${width}x${height}` };
}

/* ------------------------------------------------------------------ main -- */

function listProducts(rows) {
  const disabled = existsSync(DISABLED)
    ? new Set((JSON.parse(readFileSync(DISABLED, 'utf8')).disabled ?? []).map((d) => d.slug ?? d))
    : new Set();
  return rows.filter((p) => !disabled.has(p.slug) && (!SLUG || p.slug === SLUG));
}

async function main() {
  const rows = JSON.parse(readFileSync(CATALOGUE, 'utf8'));
  const products = listProducts(rows);
  console.log(`${products.length} product(s) in scope (public/data/products.json)`);
  if (SLUG && !products.length) console.log(`no active product "${SLUG}" in the catalogue`);
  console.log(`target ${SIZE}x${SIZE} WebP, ${CUTOUT ? 'transparent cut-out' : 'padded on its own backdrop'}, ${MARGIN}px margin, tolerance ${TOLERANCE}${APPLY ? '' : ' — preview only, nothing will be written'}\n`);

  let done = 0; let skipped = 0; let failed = 0;
  const noBackdrop = [];

  for (const p of products) {
    if (done >= LIMIT) break;
    const src = IMAGE || p.image;
    if (!src) { skipped += 1; console.log(`skip  ${p.slug} — no image`); continue; }
    if (isRemote(src) && isAmazonImage(src)) { skipped += 1; console.log(`skip  ${p.slug} — Amazon-hosted image, not allowed to be re-used`); continue; }
    if (!IMAGE && src.includes(MARKER)) { skipped += 1; console.log(`skip  ${p.slug} — already normalised`); continue; }

    try {
      const out = await normalize(await readImage(src));
      if (out.skip) { skipped += 1; console.log(`skip  ${p.slug} — ${out.skip}`); continue; }

      const pct = out.preexisting
        ? 'already transparent'
        : `${(out.removed * 100).toFixed(1)}% backdrop ${CUTOUT ? 'removed' : 'trimmed'}`;
      if (!out.preexisting && out.removed < 0.02) noBackdrop.push(p.slug);
      const name = `${p.slug}${MARKER}.webp`;

      if (OUT) writeFileSync(join(OUT, name), out.buf);
      if (APPLY) {
        writeFileSync(join(IMAGE_DIR, name), out.buf);
        p.image = `/images/products/${name}`;
      }
      done += 1;
      console.log(`${APPLY ? 'wrote' : 'ready'} ${p.slug} — ${out.from} → ${SIZE}x${SIZE}, ${pct}, ${(out.buf.length / 1024).toFixed(0)} KB`);
    } catch (err) {
      failed += 1;
      console.log(`fail  ${p.slug} — ${err.message}`);
    }
  }

  // Same formatting as the other catalogue writers (2-space indent, no trailing newline).
  if (APPLY && done) writeFileSync(CATALOGUE, JSON.stringify(rows, null, 2));

  console.log(`\n${APPLY ? 'updated' : 'would update'} ${done}, skipped ${skipped}, failed ${failed}`);
  if (OUT) console.log(`previews in ${OUT}`);
  if (noBackdrop.length) {
    console.log(`\nNo plain backdrop on ${noBackdrop.length} image(s) — squared, but the photo fills the frame (full-bleed or a lifestyle shot).`);
    console.log('These need a better source image or a cut-out by hand:');
    for (const s of noBackdrop) console.log(`  ${s}`);
  }
  if (!APPLY) console.log('\nNothing was written. Re-run with --apply to write the images and repoint the catalogue.');
}

main().catch((e) => { console.error(e); process.exit(1); });
