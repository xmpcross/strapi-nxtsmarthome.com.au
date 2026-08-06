/**
 * Builds the fal.ai prompt for a featured image, and assigns the background colour.
 *
 * The prompt template is supplied by the site owner and kept verbatim below, with
 * four placeholders filled in per article:
 *   [POST_TITLE] [POST_CONTENT] [BACKGROUND_COLOUR] [PREVIOUS_BACKGROUND_COLOURS]
 *
 * Colour assignments are persisted to scripts/cover-colours.json so the rotation
 * survives across runs — otherwise every invocation would start from the top of
 * the list and consecutive articles would share a colour, which the brief forbids.
 */
import fs from 'node:fs';
import path from 'node:path';

const STORE = path.join(process.cwd(), 'scripts', 'cover-colours.json');

/**
 * Rotation supplied with the brief, in order.
 *
 * Unlike the previous set, which was uniformly dark, this one spans near-white to
 * mid-tone. The headline ink is not fixed to white for that reason — compose-cover.py
 * measures the rendered background and picks white or near-black by WCAG contrast,
 * so 'Pale mint' and 'Light grey' get dark type automatically. Nothing here needs to
 * be paired with an ink colour by hand.
 *
 * The supplied list contained '#a28d69' twice; it appears once here, since a repeat
 * would simply make that colour twice as likely in the rotation.
 */
export const PALETTE = [
  { name: 'Dark slate blue', hex: '#354156' },
  { name: 'Teal blue', hex: '#2b7e9d' },
  { name: 'Slate charcoal', hex: '#334555' },
  { name: 'Crimson red', hex: '#aa3344' },
  { name: 'Soft light blue', hex: '#eaf0f5' },
  { name: 'Light grey', hex: '#d9d9d9' },
  { name: 'Navy slate', hex: '#324157' },
  { name: 'Cool grey', hex: '#dcdcdc' },
  { name: 'Sky blue', hex: '#66b1cf' },
  { name: 'Royal blue', hex: '#40619d' },
  { name: 'Warm sand', hex: '#a28d69' },
];

function readStore() {
  if (!fs.existsSync(STORE)) return { order: [], bySlug: {} };
  try {
    return JSON.parse(fs.readFileSync(STORE, 'utf8'));
  } catch {
    return { order: [], bySlug: {} };
  }
}

/**
 * Colour for a slug. Sticky: re-running for the same article keeps its colour, so
 * a regeneration does not shuffle the whole rotation.
 * Otherwise take the least-recently-used colour, which guarantees no two
 * consecutive assignments match.
 */
export function assignColour(slug, { reassign = false } = {}) {
  const store = readStore();

  if (store.bySlug[slug] && !reassign) {
    const kept = PALETTE.find((c) => c.name === store.bySlug[slug]) ?? PALETTE[0];
    return { colour: kept, previous: store.order.filter((n) => n !== kept.name).slice(-5), store };
  }

  const recent = store.order.slice(-5);
  const next = PALETTE.find((c) => !recent.includes(c.name)) ?? PALETTE[0];

  store.bySlug[slug] = next.name;
  store.order = [...store.order.filter((n) => n !== next.name), next.name];
  fs.writeFileSync(STORE, JSON.stringify(store, null, 2));

  return { colour: next, previous: recent, store };
}

/** Trim the article body to something a prompt can carry without being truncated. */
function summarise(raw, limit = 900) {
  const text = raw
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^::product:.*$/gm, '')
    .replace(/[#*_>`]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length <= limit ? text : `${text.slice(0, limit)}…`;
}

/**
 * Compact visual brief for the model.
 *
 * The full written brief runs ~4,500 characters. Diffusion text encoders work on a
 * few hundred tokens, so a prompt that long is silently truncated and the model
 * falls back to keyword-matching — which is exactly how the first attempt produced
 * the words "SMART HOME", "Thread" and "Wi-fi" rendered as literal text.
 *
 * So: the scene leads, the constraints are terse, and protocol/brand words are
 * deliberately kept OUT of the visual description. Naming "Zigbee" or "Wi-Fi" all
 * but guarantees the model writes it on the wall.
 */
/**
 * The flat-grey editorial design, matching the Midjourney covers now being used
 * on the site.
 *
 * Differences from buildPrompt() below, all deliberate:
 *
 *   - one fixed backdrop, light grey #D1D5DB, instead of the rotating palette.
 *     These covers are a set; a different colour per article was a magazine
 *     device that stopped applying the moment the artwork became photographic.
 *   - no headline, and no space reserved for one. The generation is the whole
 *     cover, so there is no left column to keep clear.
 *   - the frame is wide, not square, because nothing is composited afterwards.
 *
 * Text is still forbidden outright. The last two Midjourney covers came back
 * reading "SMART PUVES MONEY?" and with a keypad numbered 9 5 9 / 9 8 9 —
 * diffusion models cannot spell, and a wrong word baked into a cover is
 * permanent.
 */
export function buildGreyPrompt({ title, description, body }) {
  const subject = describeSubject(title, `${description} ${body}`);

  return [
    'Photorealistic premium editorial product photograph for a technology magazine.',
    `Scene: ${subject}`,
    'Background: a single flat matte light grey (#D1D5DB) studio backdrop, seamless, uniform, no gradient, no banding, no pattern, no room, no wall, no furniture, no horizon line, no corner where two planes meet.',
    'Composition: the objects sit right of centre, resting on a plain pale ledge, with generous empty backdrop to the left and above. Nothing touches an edge. Maximum four objects.',
    'Lighting: soft commercial studio lighting, crisp edges, subtle natural shadow, restrained highlights, strong separation from the background.',
    'Devices are modern, clean and unbranded.',
    'NO TEXT ANYWHERE IN THE IMAGE. No words, no letters, no numbers, no digits, no labels, no captions, no signage, no logos, no branding, no packaging, no watermarks, no UI text, no keypads showing numerals, no screens showing writing or numerals.',
    'No people, no hands, no coins, no cash, no holograms, no glowing effects, no lightning bolts, no clutter.',
    'No power outlets, no sockets, no plugs of any country.',
  ].join(' ');
}

export function buildPrompt({ title, body, description, colour, previous }) {
  const subject = describeSubject(title, `${description} ${body}`);

  return [
    `Photorealistic premium editorial product photograph for a technology magazine.`,
    `Scene: ${subject}`,
    // "no floor" and "no horizon" are explicit because the renders kept producing a
    // floor plane near the bottom of the frame, which stood every object low and
    // left a large empty band above it. That is also what made the square thumbnail
    // crop awkward.
    `Background: a single flat solid ${colour.name.toLowerCase()} (${colour.hex}) studio backdrop, seamless, unlit, no gradient, no pattern, no room, no wall, no furniture, no floor, no table, no visible surface, no horizon line, no corner where two planes meet.`,
    // The left column is where the headline is typeset afterwards, so it has to
    // come back genuinely empty. "Left half empty" alone was not enough — objects
    // crept over the centre line and, more often, their shadows did, which puts
    // texture directly behind the sub-heading. Stated as an explicit fraction, and
    // shadows and reflections are named because they are not "objects".
    // Square, centred — NOT a wide frame with an empty left side.
    //
    // Asking for "left half empty, objects right, vertically centred" failed three
    // times running: objects crossed the centre line, shadows crossed it, and the
    // group stayed pinned to a floor plane at the bottom. The model does not follow
    // spatial constraints reliably, so the layout is no longer requested from it.
    // compose-cover.py now places this square on the right of the canvas itself,
    // which makes the position guaranteed rather than hoped for.
    `Composition: square 1:1 format. One group of objects centred in the frame, filling roughly 70% of the width and height, with generous empty backdrop margin on all four sides. Nothing touches an edge. Objects float against the seamless backdrop with no supporting surface beneath them. Maximum five objects.`,
    `Lighting: soft commercial studio lighting, crisp edges, subtle natural shadow, restrained highlights, strong separation from the background.`,
    `Devices are modern, clean and unbranded.`,
    // The headline and sub-heading are typeset locally by scripts/compose-cover.py,
    // so the generation must contribute no lettering of any kind. Models render text
    // badly — a misspelled word baked into a cover is permanent — and any generated
    // wording would also collide with the real headline.
    `NO TEXT ANYWHERE IN THE IMAGE. No words, no letters, no numbers, no digits, no labels, no captions, no signage, no logos, no branding, no packaging, no watermarks, no UI text, no screens showing writing or numerals.`,
    `No people, no hands, no holograms, no glowing effects, no lightning bolts, no money.`,
  ].join(' ');
}

/**
 * One concrete scene per article. Keyword-matched against the title and body so it
 * describes THIS article rather than smart homes in general.
 */
function describeSubject(title, text) {
  // Title first, body only as a fallback. Matching both together let an incidental
  // body mention hijack the scene — the protocol comparison article mentions smart
  // plugs in passing and was rendered as a smart-plug photo.
  //
  // The fallback path passes fromBody, because the title-first rule alone was not
  // enough: an article whose title matches NOTHING still falls through to the body,
  // where one passing mention picks the scene. "Smart Home Devices for Older
  // Australians" was rendered as a wall socket for exactly that reason — the words
  // "smart plug" appear once, in a list.
  return matchScene(title.toLowerCase())
    ?? matchScene(text.toLowerCase(), { fromBody: true })
    ?? 'a small group of three modern white smart home devices arranged as a still life.';
}

function matchScene(t, { fromBody = false } = {}) {
  if (/zigbee|z-wave|thread|matter|protocol|mesh|hub|platform/.test(t))
    return 'one small white smart home hub in the centre foreground, large and prominent, with three tiny white sensor pucks placed around it at varying distances, very thin faint connecting lines arcing between them.';
  // No plug and no socket, in any orientation. Two attempts failed: specifying the
  // AS/NZS 3112 pin layout produced a US plug, and hiding the pins produced a plug
  // whose FACE was a US pass-through outlet. Image models do not render
  // region-correct socket geometry, and foreign electrical hardware on a site whose
  // whole differentiator is Australian localisation is worse than no hardware.
  // Energy articles get a neutral monitor puck instead, which carries no country.
  // Scene is also title-only: a passing body mention must not select it.
  if (!fromBody && /smart plug|energy monitor|tariff|electricity bill|power bill/.test(t))
    return 'a small plain white cylindrical energy monitor puck standing upright, beside a smartphone lying flat showing a simple line graph with no words on it. No plugs, no sockets, no power outlets, no pins, no cables.';
  if (/smart lock|deadbolt|keypad/.test(t))
    return 'a modern matte smart deadbolt lock mounted on a plain dark timber door panel, keypad face visible.';
  if (/doorbell/.test(t))
    return 'a slim video doorbell mounted on a plain door frame edge, lens catching a soft highlight.';
  if (/camera|surveillance/.test(t))
    return 'a compact white indoor security camera on a small stand, lens forward, next to a smaller sensor puck.';
  if (/bulb|lighting|switch|dimmer|b22|e27/.test(t))
    return 'a frosted smart light bulb standing upright beside a flat white wall switch plate.';
  if (/vacuum|mop/.test(t))
    return 'a low round robot vacuum photographed from a three-quarter angle on a plain surface.';
  if (/speaker|audio|multi-room/.test(t))
    return 'a small fabric-covered smart speaker beside a slim remote puck.';
  if (/thermostat|aircon|air conditioner|heating|cooling|climate/.test(t))
    return 'a circular wall thermostat dial mounted on a plain panel, beside a small temperature sensor.';
  if (/blind|curtain|shade/.test(t))
    return 'a compact roller-blind motor unit beside a small remote control.';
  if (/wi-?fi|router|dropout|network/.test(t))
    return 'a modern white mesh Wi-Fi router unit standing upright, with a second smaller node behind it at a distance.';
  // Imports get a plain unmarked carton rather than a plug or a socket. The
  // subject of these articles is electrical hardware bought overseas, which is
  // precisely the thing image models render with the wrong country's geometry.
  // A blank box carries "imported" and cannot be wrong.
  if (/overseas|imported|import|parallel import|grey import/.test(t))
    return 'one small white smart home hub standing beside a plain unmarked cardboard carton with no printing on it, the carton slightly behind and to one side.';
  if (/where to buy|retailer|bunnings|jb hi-?fi|store|shop/.test(t))
    return 'four modern unbranded white smart home devices of clearly different shapes — a hub, a speaker, a sensor puck and a camera — standing in a row on a plain pale shelf like a retail display.';
  return null;
}
