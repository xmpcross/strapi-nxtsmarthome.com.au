/**
 * Category list, colours and fal.ai prompts for category hero images.
 *
 * Two hero sets are produced from the same category list:
 *   post    -> /categories/<slug>/            editorial topic hub
 *   product -> /products/category/<slug>/     the shop
 *
 * They must not look identical. The same artwork on both pages reads as a bug,
 * so each kind gets its own colour and its own scene: the topic hub is a
 * still life in a deep editorial tone, the shop is a front-facing line-up on a
 * brighter magazine tone.
 *
 * Categories are READ FROM lib/site.ts rather than copied here. That file already
 * has three hand-maintained copies of the category map in this repo
 * (build-search-index.mjs, compose-cover.py); a fourth is a fourth thing to
 * forget when a category is added.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

/** Categories that exist as editorial sections but stock no products. */
export const GUIDE_KEYS = ['setup-guides', 'buying-guides'];

/**
 * Pull the `categories` array out of lib/site.ts.
 *
 * A regex rather than a TypeScript import, for the same reason
 * build-search-index.mjs avoids one: these scripts run outside the Next build,
 * with no compiler available. The array is a plain literal, and the parse is
 * strict about the shape it expects — a category that fails to yield a key,
 * name and slug throws rather than being silently dropped from the run.
 */
export function readCategories() {
  const src = fs.readFileSync(path.join(ROOT, 'lib', 'site.ts'), 'utf8');
  const block = src.match(/export const categories: Category\[\] = \[([\s\S]*?)\n\];/);
  if (!block) throw new Error('Could not find `export const categories` in lib/site.ts');

  const field = (body, name) => {
    // Prettier wraps long values onto the next line, so the newline after the
    // colon is optional. Escaped apostrophes are kept ("Australia\'s").
    const m = body.match(new RegExp(`\\n\\s*${name}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`));
    return m ? m[1].replace(/\\'/g, "'") : '';
  };

  const out = [];
  // Objects terminate at a two-space-indented `},` — nested objects (`overview`)
  // close at four spaces, so they cannot end the match early.
  for (const m of block[1].matchAll(/\{\n([\s\S]*?)\n {2}\},/g)) {
    const body = `\n${m[1]}`;
    const cat = {
      key: field(body, 'key'),
      name: field(body, 'name'),
      slug: field(body, 'slug'),
      blurb: field(body, 'blurb'),
      intro: field(body, 'intro'),
    };
    if (!cat.key || !cat.name || !cat.slug) {
      throw new Error(`Unparsable category in lib/site.ts near: ${m[1].slice(0, 80)}`);
    }
    out.push(cat);
  }
  if (!out.length) throw new Error('Parsed zero categories from lib/site.ts');
  return out;
}

/**
 * Fixed colour per category and kind — NOT the rotation used for article covers.
 *
 * A category hero is a permanent piece of page furniture, so its colour has to
 * be stable and has to belong to that section: navy is security everywhere on
 * the site, and a rotation would hand it to lighting next month.
 *
 * `post` matches the per-category backdrops already in compose-cover.py, so a
 * topic hub and the article covers beneath it are the same colour family.
 * `product` uses the brighter cover palette instead, which is what separates
 * the shop from the topic hub at a glance.
 *
 * Each entry carries a NAME as well as a hex, and the name is not decoration.
 * A diffusion model cannot read '#96600C' — prompted with the hex alone it
 * ignores the instruction and returns its default near-white studio, which is
 * what the first lighting run produced. The written colour is what the text
 * encoder acts on; the hex only sharpens it and gives the compositor an exact
 * value to paint behind supplied photographs.
 */
export const COLOURS = {
  security: {
    post: { name: 'deep navy blue', hex: '#12264A' },
    product: { name: 'slate blue grey', hex: '#324157' },
  },
  lighting: {
    post: { name: 'rich burnt amber', hex: '#96600C' },
    product: { name: 'warm sand beige', hex: '#A28D69' },
  },
  energy: {
    post: { name: 'deep forest green', hex: '#0E5C42' },
    product: { name: 'bright emerald green', hex: '#29BB75' },
  },
  entertainment: {
    post: { name: 'deep aubergine purple', hex: '#4A2268' },
    product: { name: 'mulberry pink', hex: '#96386A' },
  },
  climate: {
    post: { name: 'deep teal', hex: '#104E5C' },
    product: { name: 'soft sky blue', hex: '#66B1CF' },
  },
  'hubs-and-platforms': {
    post: { name: 'deep royal blue', hex: '#1E2C7A' },
    product: { name: 'medium cornflower blue', hex: '#40619D' },
  },
  'robot-vacuums': {
    post: { name: 'deep indigo violet', hex: '#3A2C6E' },
    product: { name: 'warm crimson red', hex: '#B3314B' },
  },
  'setup-guides': {
    post: { name: 'dark steel navy', hex: '#1E3C64' },
    product: { name: 'medium cornflower blue', hex: '#40619D' },
  },
  'buying-guides': {
    post: { name: 'dark pine green', hex: '#165446' },
    product: { name: 'bright emerald green', hex: '#29BB75' },
  },
};

export function colourFor(key, kind) {
  const entry = COLOURS[key];
  if (!entry) throw new Error(`No hero colour for category '${key}' — add one to COLOURS`);
  return entry[kind];
}

/**
 * One concrete scene per category, written out rather than keyword-matched.
 *
 * There are nine of these and they never change, so the guesswork in
 * cover-prompt.mjs's matchScene() buys nothing here — and a wrong guess on a
 * category hero is wrong on every page in the section.
 *
 * Note what is missing from `energy`: no plugs, no sockets, no outlets. Image
 * models render US socket geometry no matter how the AS/NZS pin layout is
 * described, and foreign electrical hardware on a site whose whole
 * differentiator is Australian localisation is worse than no hardware at all.
 * cover-prompt.mjs carries the same restriction for the same reason.
 */
const SCENES = {
  security: {
    post: 'a compact white indoor security camera on a small stand with its lens forward, a slim video doorbell standing beside it, and a small door sensor in front',
    product: 'a front-facing row of four security devices — an indoor camera, an outdoor camera, a video doorbell and a small sensor puck — evenly spaced and all facing the viewer',
  },
  // No wall switches and no switch plates, for the reason `energy` carries no
  // plugs: the model renders US hardware — a Decora paddle, a US toggle — no
  // matter what is asked for, and a foreign wall plate is worst on exactly the
  // category where the AU fitting argument (B22 vs E27) lives. Bulbs and strips
  // are the same object in every country, so they carry the section safely.
  lighting: {
    post: 'a frosted smart light bulb standing upright and softly lit, a second unlit bulb of a different shape beside it, and a loosely coiled light strip resting in front. No wall switches, no switch plates, no sockets, no power outlets, no wall panels',
    product: 'a front-facing row of four smart light bulbs of clearly different shapes and sizes — a round globe, a teardrop, a candle and a compact spiral — evenly spaced, one of them softly lit. No wall switches, no switch plates, no sockets, no power outlets',
  },
  energy: {
    post: 'a plain white cylindrical energy monitor puck standing upright beside a smartphone lying flat, its screen showing a simple line graph with no words or numbers on it. No plugs, no sockets, no power outlets, no pins',
    product: 'a front-facing row of three plain white energy monitoring pucks and boxes of different sizes, evenly spaced. No plugs, no sockets, no power outlets, no pins, no cables',
  },
  entertainment: {
    post: 'a small fabric-covered smart speaker beside a slim soundbar lying flat, with a compact streaming puck in front',
    product: 'a front-facing row of four audio devices — two fabric-covered smart speakers of different sizes, a slim soundbar and a small streaming puck — evenly spaced',
  },
  climate: {
    post: 'a circular wall thermostat dial mounted on a plain panel, beside a small temperature sensor and a compact cylindrical air quality monitor',
    product: 'a front-facing row of four climate devices — a circular thermostat dial, a slim air conditioner controller, a small sensor puck and a cylindrical air purifier — evenly spaced',
  },
  'hubs-and-platforms': {
    post: 'one small white smart home hub in the centre foreground, large and prominent, with three tiny white sensor pucks placed around it at varying distances, very thin faint connecting lines arcing between them',
    product: 'a front-facing row of four small white smart home hubs and bridges of different shapes and sizes, evenly spaced',
  },
  'robot-vacuums': {
    post: 'a low round robot vacuum photographed from a three-quarter angle, with its slim upright self-emptying dock standing behind it',
    product: 'a front-facing row of three round robot vacuums of different sizes beside one tall self-emptying dock, evenly spaced',
  },
  'setup-guides': {
    post: 'a modern white mesh Wi-Fi node standing upright, a small smart home hub beside it, and a tiny sensor puck in front',
    product: 'a front-facing row of four small white networking and control devices — a mesh Wi-Fi node, a hub, a bridge and a sensor puck — evenly spaced',
  },
  'buying-guides': {
    post: 'three modern white smart home devices of clearly different shapes — a rounded speaker, a boxy hub and a flat sensor — arranged as a still life at varying depths',
    product: 'a front-facing comparison line-up of four modern white smart home devices of clearly different shapes, evenly spaced in a straight row',
  },
};

/**
 * Visual brief for the model.
 *
 * Deliberately short. Diffusion text encoders work on a few hundred tokens, so a
 * long brief is silently truncated and the model falls back to keyword-matching
 * — which is how an earlier run on this site produced the words "SMART HOME"
 * rendered as literal text across the artwork.
 *
 * The category name is never put in the prompt for the same reason. All type is
 * set locally by compose-category-hero.py, where it is the real name, spelled
 * correctly, in the site's own typeface.
 */
export function buildPrompt({ key, kind, colour }) {
  const scene = SCENES[key]?.[kind];
  if (!scene) throw new Error(`No ${kind} scene for category '${key}' — add one to SCENES`);

  return [
    'Photorealistic premium editorial product photograph for a technology magazine.',
    // Colour first, and repeated at the end. The backdrop is the one instruction
    // that must survive: a banner in the wrong colour is not the section's
    // banner. Naming it early keeps it inside the window the text encoder
    // actually weights, and the closing repeat stops the scene overriding it.
    `A strongly coloured ${colour.name} (${colour.hex}) studio backdrop fills the entire background.`,
    `Scene: ${scene}.`,
    // "no floor" and "no horizon" are explicit because the renders otherwise
    // produce a floor plane near the bottom of the frame, which stands every
    // object low and leaves a large empty band above it.
    `Background: a single flat solid saturated ${colour.name} (${colour.hex}) studio backdrop, seamless, unlit, no gradient, no pattern, no room, no wall, no furniture, no floor, no table, no visible surface, no horizon line, no corner where two planes meet. The backdrop is definitely NOT white, NOT grey and NOT cream.`,
    // Square and centred. The model does not honour "leave the left half empty"
    // — objects and their shadows cross the centre line — so the layout is not
    // asked for at all: compose-category-hero.py places this square on the right
    // of the wide banner itself, which cannot drift.
    'Composition: square 1:1 format. One group of objects centred in the frame, filling roughly 70% of the width and height, with generous empty backdrop margin on all four sides. Nothing touches an edge. Objects float against the seamless backdrop with no supporting surface beneath them. Maximum five objects.',
    'Lighting: soft commercial studio lighting, crisp edges, subtle natural shadow, restrained highlights, strong separation from the background.',
    'Devices are modern, clean and unbranded.',
    'NO TEXT ANYWHERE IN THE IMAGE. No words, no letters, no numbers, no digits, no labels, no captions, no signage, no logos, no branding, no packaging, no watermarks, no UI text, no screens showing writing or numerals.',
    'No people, no hands, no holograms, no glowing effects, no lightning bolts, no money.',
  ].join(' ');
}

/** Eyebrow line above the heading, matching what each page already says. */
export function eyebrowFor(kind) {
  return kind === 'product' ? 'Australian Buying Guide' : 'Guides & Reviews';
}

/** Headline for the banner. The shop says what it sells; the hub is the topic. */
export function headingFor(category, kind) {
  return kind === 'product' ? `Best ${category.name} in Australia` : category.name;
}
