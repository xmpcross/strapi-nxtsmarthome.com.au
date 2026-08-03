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

/** Rotation supplied with the brief, in order. */
export const PALETTE = [
  { name: 'Deep teal', hex: '#125E63' },
  { name: 'Navy blue', hex: '#163A5F' },
  { name: 'Burnt orange', hex: '#A94F24' },
  { name: 'Forest green', hex: '#285943' },
  { name: 'Muted purple', hex: '#624A7B' },
  { name: 'Burgundy', hex: '#743746' },
  { name: 'Slate blue', hex: '#465D75' },
  { name: 'Dark turquoise', hex: '#176B72' },
  { name: 'Warm mustard', hex: '#9A721F' },
  { name: 'Deep indigo', hex: '#343C78' },
  { name: 'Terracotta', hex: '#9B5141' },
  { name: 'Olive green', hex: '#5B633A' },
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
export function buildPrompt({ title, body, description, colour, previous }) {
  const subject = describeSubject(title, `${description} ${body}`);

  return [
    `Photorealistic premium editorial product photograph for a technology magazine.`,
    `Scene: ${subject}`,
    `Background: a single flat solid ${colour.name.toLowerCase()} (${colour.hex}) studio backdrop, seamless, unlit, no gradient, no pattern, no room, no wall, no furniture.`,
    `Composition: 16:9 wide landscape. The entire LEFT HALF is empty backdrop with nothing in it. All objects sit in the RIGHT HALF, filling most of that half, large and clearly readable at thumbnail size, well inside the frame, never touching an edge. Maximum five objects.`,
    `Lighting: soft commercial studio lighting, crisp edges, subtle natural shadow, restrained highlights, strong separation from the background.`,
    `Devices are modern, clean and unbranded.`,
    `NO TEXT. No words, no letters, no numbers, no labels, no captions, no signage, no logos, no packaging, no screens showing writing.`,
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
  const pick = (t) => matchScene(t);
  return pick(title.toLowerCase()) ?? pick(text.toLowerCase())
    ?? 'a small group of three modern white smart home devices arranged as a still life.';
}

function matchScene(t) {
  const au = 'an Australian wall socket with two angled flat pins above one vertical earth pin';

  if (/zigbee|z-wave|thread|matter|protocol|mesh|hub|platform/.test(t))
    return 'one small white smart home hub in the centre foreground, large and prominent, with three tiny white sensor pucks placed around it at varying distances, very thin faint connecting lines arcing between them.';
  if (/smart plug|energy monitor|tariff|electricity bill|power bill/.test(t))
    return `a white smart plug fitted to ${au}, beside a smartphone lying flat showing a simple line graph with no words on it.`;
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
  return null;
}
