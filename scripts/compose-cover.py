#!/usr/bin/env python3
"""
Composite an article headline onto a generated product shot.

    python3 scripts/compose-cover.py <article-slug>

Called by scripts/generate-cover.mjs after fal.ai produces the product half.

Layout follows the supplied reference covers: a flat background, the article
title set ALL-CAPS on the left (large bold main line, optional medium sub), and
the product floating on the right. The category is deliberately not printed —
the title alone carries the left column.

The image model is never asked to render text — it gets words wrong, and a
misspelled headline baked into a cover is permanent. The type is set here in
Urbanist, so it is the real title, correctly spelled. Re-running is free, so a
retitle costs nothing.

Per-article overrides can be set in front matter:

    coverScrim: true           # restore the panel behind the headline
    coverTextTop: false        # centre the headline instead of pinning it top
    coverBg: '#d8c9ae'         # override the category panel colour
    coverText: false           # product-only cover, no headline (product centres)
    coverProduct: right        # force the placement band: 'right' or 'centre'
    coverProductScale: 0.85    # shrink the product within that band (0.2-1.0)
    coverMain: 'ZIGBEE VS Z-WAVE'
    coverSub:  'VS THREAD VS WI-FI'
"""
import os
import re
import sys

import hashlib

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

# Resolved from this file's location rather than hardcoded. The absolute path was
# '/opt/nxtsmarthome.com.au', which broke every cover regeneration the moment the
# repo moved under /opt/projects/.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = f'{ROOT}/assets/fonts'  # was a /tmp path from an old session; the fonts live in the repo
W, H = 1240, 700          # per the cover brief
SCALE = W / 1000          # every metric below was tuned at 1000px wide

if len(sys.argv) < 2:
    sys.exit('Usage: compose-cover.py <article-slug>')
slug = sys.argv[1]

src = open(f'{ROOT}/content/articles/{slug}.md', encoding='utf-8').read()


def fm(field, default=''):
    m = re.search(rf"^{field}:\s*'?\"?(.*?)'?\"?$", src, re.M)
    return m.group(1).strip() if m else default


title = fm('title')
category = fm('category', 'hubs-and-platforms')

# Matches the background named in the fal prompt, so type sits on a known colour.
CATEGORY_RGB = {
    'security': (18, 38, 74), 'lighting': (150, 96, 12), 'energy': (14, 92, 66),
    'entertainment': (74, 34, 104), 'climate': (16, 78, 92),
    'hubs-and-platforms': (30, 44, 122), 'robot-vacuums': (58, 44, 110),
    'setup-guides': (30, 60, 100), 'buying-guides': (22, 84, 70),
}
bg = CATEGORY_RGB.get(category, (30, 44, 122))

# `coverBg: '#d8c9ae'` in front matter overrides the category colour.
#
# The category palette assumes the house composition — a white or pale product cut
# out onto a dark panel. It inverts badly for an article whose subject is a matte
# black device: black-on-dark-green is the same failure as white-on-white, and no
# amount of scrim fixes a product that is the same value as its backdrop. The ink
# picker below already handles a light backdrop, so overriding the panel is enough
# to flip the whole cover to dark-on-light without any other change.
#
# `coverBg: random` instead picks one from PANEL_PALETTE below — see _pick_bg().
_bg_hex = fm('coverBg')
BG_RANDOM = _bg_hex.strip().lower() == 'random'
if _bg_hex and not BG_RANDOM:
    h = _bg_hex.lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    if len(h) != 6:
        sys.exit(f"coverBg must be a 3- or 6-digit hex colour, got '{_bg_hex}'")
    bg = tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

# Panels for `coverBg: random`. Deliberately spans dark and light: the picker
# below needs candidates on both sides of a product's own brightness, or a set of
# uniformly dark panels would leave a black device with nowhere to go.
#
# The light end is deliberately the longer one. Consumer smart home hardware is
# overwhelmingly matte black or charcoal, so most subjects need a light panel and
# they all draw from the same short list — with only three pale entries, four dark
# products across a batch produced two pairs of identical covers. Variety at this
# end is what actually makes the picks look random across a category page.
PANEL_PALETTE = [
    ('Slate charcoal', (46, 51, 59)), ('Deep red', (163, 35, 48)),
    ('Blue grey', (60, 70, 84)), ('Forest', (31, 77, 58)),
    ('Royal blue', (30, 44, 122)), ('Deep teal', (16, 78, 92)),
    ('Navy', (18, 38, 74)), ('Burnt orange', (169, 84, 27)),
    ('Plum', (74, 35, 82)), ('Olive', (74, 82, 51)),
    ('Terracotta', (180, 87, 61)), ('Warm sand', (217, 201, 168)),
    ('Pale mint', (199, 220, 208)), ('Sky', (157, 195, 216)),
    ('Light stone', (214, 210, 202)), ('Blush', (226, 197, 190)),
    ('Cream', (232, 224, 205)), ('Sage', (196, 208, 188)),
    ('Lilac grey', (206, 200, 216)), ('Pale clay', (219, 199, 181)),
    ('Ice blue', (198, 214, 224)), ('Oat', (223, 214, 196)),
]


def _rel_lum(rgb):
    out = []
    for v in rgb:
        v = v / 255.0
        out.append(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4)
    return 0.2126 * out[0] + 0.7152 * out[1] + 0.0722 * out[2]


def _pick_bg(cuts):
    """A panel colour for `coverBg: random` — varied, stable, and not invisible.

    Random has to survive two things it does not get for free.

    Stable: the choice is seeded from the slug, not from a clock or an RNG, so
    re-running the composer returns the same colour. A cover that reshuffles its
    background every time it is regenerated cannot be iterated on, and a retitle
    would silently repaint it.

    Not invisible: a genuinely uniform pick eventually lands a matte black hub on
    a slate charcoal panel, which is the same failure the coverBg override exists
    to fix. So the palette is walked in a slug-derived order and the first entry
    with enough contrast against the product's own mean brightness wins. That
    keeps the result varied and unpredictable across articles while making the
    unusable combinations unreachable rather than merely unlikely.
    """
    lum = []
    for c in cuts:
        a = np.asarray(c.getchannel('A')).astype(np.float32) / 255.0
        rgb = np.asarray(c.convert('RGB')).astype(np.float32)
        if a.sum() < 1:
            continue
        # Brightness averaged over the product only — the transparent surround
        # would otherwise drag every subject toward whatever the padding holds.
        lum.append(float((rgb.mean(axis=2) * a).sum() / a.sum()) / 255.0)
    subject = _rel_lum((sum(lum) / len(lum) * 255,) * 3) if lum else 0.5

    seed = int(hashlib.md5(slug.encode()).hexdigest(), 16)
    order = list(range(len(PANEL_PALETTE)))
    # Deterministic Fisher-Yates driven by the slug digest.
    for i in range(len(order) - 1, 0, -1):
        seed, j = divmod(seed, i + 1)
        order[i], order[j] = order[j], order[i]

    best = None
    for i in order:
        name, rgb = PANEL_PALETTE[i]
        lo, hi = sorted((subject, _rel_lum(rgb)))
        ratio = (hi + 0.05) / (lo + 0.05)
        if ratio >= 2.4:
            print(f'    panel: {name} (random, {ratio:.2f}:1 vs subject)')
            return rgb
        if best is None or ratio > best[0]:
            best = (ratio, name, rgb)
    # Nothing cleared the bar — take the best available rather than the first.
    print(f'    panel: {best[1]} (random, best available {best[0]:.2f}:1)')
    return best[2]

# `coverText: false` drops the headline and makes it a product-only cover.
#
# The page already sets the title as an <h1> immediately beside the cover, so type
# baked into the artwork is the same words twice. Leaving it off is a legitimate
# treatment — but it changes the composition, not just the paint: the left band
# exists to hold the headline, so with no headline the product is centred across
# the full frame instead of being pushed right. A product still sitting in the
# right band with nothing on the left reads as a rendering failure.
NO_TEXT = fm('coverText', 'true').lower() in ('false', 'no', '0')

# ---- text tiers -----------------------------------------------------------
# The article title carries the whole left column — the category lead-in is not
# shown. Front matter wins. Otherwise split the title on its colon: the punchy
# half becomes the main line and the qualifier becomes the sub beneath it.
main = fm('coverMain')
sub = fm('coverSub')

if not main:
    # Split the title into a punchy main line and a qualifier. A colon is the
    # cleanest break; a bracketed or dashed aside works the same way. Without one
    # of these the whole title becomes the main line, and a long one then has to
    # shrink to fit — which is how a 73-character headline ended up at half the
    # size of every other cover.
    head = tail = None
    for sep in (':', ' (', ' — ', ' - '):
        if sep in title:
            head, tail = title.split(sep, 1)
            tail = tail.rstrip(')')
            break
    if head is not None:
        main, sub = head.strip(), (sub or tail.strip())
    else:
        main, sub = title, sub

main, sub = main.upper(), (sub or '').upper().rstrip('?') + ('?' if sub.strip().endswith('?') else '')

# Emptying both tiers is all `coverText: false` has to do. The whole headline
# stage below — measuring, wrapping, fitting, drawing — is already a no-op on an
# empty string, so it needs no branch of its own and cannot drift out of step with
# one. The layout branch in the SUPPLIED block is the only place NO_TEXT is
# actually consulted, because centring the product is a real decision rather than
# the absence of one.
if NO_TEXT:
    main = sub = ''

EXTS = ('png', 'jpg', 'jpeg', 'webp')


def _cutout(im, light=200, feather=1.6):
    """Remove a plain studio background, keeping white areas inside the product.

    Connectivity, not brightness, decides what goes. A plain brightness threshold
    punches holes through anything legitimately white — a phone screen, a white
    bezel, a pale label — and product photography is full of those. Instead the
    light-pixel mask is grown from the border inward, so only light regions that
    actually reach the edge of the frame are treated as background. A phone screen
    enclosed by a dark bezel never connects to the border, so it survives.

    `light` is deliberately loose (200, not 240) so the soft drop shadow beneath a
    product is swept up too. A tighter value leaves a grey smudge, which reads as a
    white blob once the cut-out is placed on a dark cover.

    An existing alpha channel is trusted ONLY if the image's own frame edge is
    already transparent. "Has some transparency somewhere" is not the same claim
    and was the weaker test this used to make: several catalogue PNGs carry a few
    soft pixels while the studio background is still fully opaque behind the
    product, so they passed the check untouched and composited onto the panel as a
    hard white rectangle. Checking the border instead asks the question that
    actually matters — has the background already been removed? — and lets
    everything else fall through to be cut properly.
    """
    if im.mode == 'RGBA':
        alpha = np.asarray(im.getchannel('A'))
        edge = np.concatenate([alpha[0, :], alpha[-1, :], alpha[:, 0], alpha[:, -1]])
        if edge.max() < 32:
            return im
        # Falling through: flatten onto white first. Dropping the alpha channel
        # instead would expose whatever RGB happens to sit under the transparent
        # pixels, which in these files is arbitrary.
        flat = Image.new('RGB', im.size, (255, 255, 255))
        flat.paste(im, (0, 0), im)
        im = flat

    rgb = im.convert('RGB')
    a = np.asarray(rgb).astype(np.int16)
    h, w, _ = a.shape

    lightmask = a.min(axis=2) > light

    # Grow the border-connected region with a binary dilation restricted to the
    # light mask. Iterating on whole-array shifts is fast enough at this size and
    # avoids a scipy dependency, which is not installed here.
    reach = np.zeros((h, w), bool)
    reach[0, :] = lightmask[0, :]
    reach[-1, :] = lightmask[-1, :]
    reach[:, 0] = lightmask[:, 0]
    reach[:, -1] = lightmask[:, -1]
    while True:
        grown = reach.copy()
        grown[1:, :] |= reach[:-1, :]
        grown[:-1, :] |= reach[1:, :]
        grown[:, 1:] |= reach[:, :-1]
        grown[:, :-1] |= reach[:, 1:]
        grown &= lightmask
        if grown.sum() == reach.sum():
            break
        reach = grown

    # Soft edge, but ONLY in a narrow band hugging what was removed. Applying the
    # luminance ramp to every bright pixel instead made the phone's white app
    # screen semi-transparent — the cover colour showed straight through it. The
    # band keeps the anti-aliasing where the cut actually is.
    band = reach.copy()
    for _ in range(3):
        grown = band.copy()
        grown[1:, :] |= band[:-1, :]
        grown[:-1, :] |= band[1:, :]
        grown[:, 1:] |= band[:, :-1]
        grown[:, :-1] |= band[:, 1:]
        band = grown
    band &= ~reach

    lum = a.mean(axis=2)
    soft = np.clip((light + 40 - lum) / (40 * feather), 0, 1)
    alpha = np.where(reach, 0.0, np.where(band, soft, 1.0)) * 255

    out = rgb.convert('RGBA')
    out.putalpha(Image.fromarray(alpha.astype('uint8'), 'L'))
    return out


def _seat(canvas, cut, x, y, panel):
    """Paste a cut-out onto the panel with a shadow, so it sits rather than floats.

    A cut-out dropped straight onto a flat colour reads as a sticker: the product
    photograph carries its own studio lighting, but nothing beneath it agrees that
    it is standing on anything. Two shadows fix that, and both are needed —

    `ambient` is the whole silhouette, blurred wide and nudged down. It gives the
    object mass and stops the edges looking die-cut.

    `contact` is the bottom sliver of the silhouette squashed into a thin band at
    the base and blurred much less. This is the one that actually reads as a
    surface: shadows tighten and darken where an object meets the thing it rests
    on, and without it the ambient blur alone just looks like fog.

    Combined with a lighten (max) rather than added, so the overlap where both
    land does not double up into a black bruise. The tint is the panel colour
    darkened rather than pure black, because a real shadow is the surface with
    less light on it, not a smear of ink.
    """
    a = cut.getchannel('A')
    w, h = cut.size
    pad = max(8, int(h * 0.16))
    size = (w + pad * 2, h + pad * 3)

    ambient = Image.new('L', size, 0)
    ambient.paste(a, (pad, pad + int(h * 0.045)))
    ambient = ambient.filter(ImageFilter.GaussianBlur(max(6, int(h * 0.055))))
    ambient = ambient.point(lambda v: int(v * 0.42))

    foot = max(1, int(h * 0.14))
    band = max(3, int(h * 0.055))
    contact = Image.new('L', size, 0)
    contact.paste(a.crop((0, h - foot, w, h)).resize((w, band), Image.LANCZOS),
                  (pad, pad + h - band // 2))
    contact = contact.filter(ImageFilter.GaussianBlur(max(3, int(h * 0.014))))
    contact = contact.point(lambda v: min(255, int(v * 0.92)))

    tint = tuple(int(c * 0.34) for c in panel)
    canvas.paste(Image.new('RGB', size, tint), (x - pad, y - pad),
                 ImageChops.lighter(ambient, contact))
    canvas.paste(cut, (x, y), cut)


def _images_in(folder):
    if not os.path.isdir(folder):
        return []
    return sorted(
        os.path.join(folder, f) for f in os.listdir(folder)
        if f.lower().rsplit('.', 1)[-1] in EXTS
    )


def _supplied_products():
    """Real product photographs for this article, if any were uploaded.

    Resolution order, most specific first:
      1. assets/product-images/<slug>.<ext>        one image, this article only
      2. assets/product-images/<slug>/             several images, this article
      3. assets/product-images/<category-slug>/    a shared pool for the category

    The category pool exists so a folder of photographs can be dropped in once and
    used across a whole section. Which image an article gets is picked by hashing
    the slug, so it is stable — re-running does not shuffle covers around — and
    different articles in the same category get different products rather than all
    landing on the first file.

    A slug-named file always wins, so any article whose automatic pick is a poor
    match can be corrected by dropping in one file named after it.
    """
    base = f'{ROOT}/assets/product-images'

    for ext in EXTS:
        cand = f'{base}/{slug}.{ext}'
        if os.path.exists(cand):
            return [cand]

    own = _images_in(f'{base}/{slug}')
    if own:
        return own[:4]

    # Category pool. Front matter carries the category KEY ('security'), but the
    # obvious folder name is the URL SLUG ('security-and-cameras'), so both are
    # tried — as is the one-letter shorthand 'hub-and-platforms', because that is
    # what gets typed.
    #
    # NOTE: this is the third copy of the key-to-slug map in the repo, after
    # lib/site.ts and scripts/build-search-index.mjs. Adding a category means
    # editing all three.
    KEY_TO_SLUG = {
        'security': 'security-and-cameras', 'lighting': 'lighting',
        'energy': 'energy-and-solar', 'entertainment': 'entertainment-and-audio',
        'climate': 'climate-and-comfort', 'hubs-and-platforms': 'hubs-and-platforms',
        'robot-vacuums': 'robot-vacuums', 'setup-guides': 'setup-guides',
        'buying-guides': 'buying-guides',
    }
    cat_slug = KEY_TO_SLUG.get(category, category)
    pool = []
    for name in (category, cat_slug, cat_slug.replace('hubs-', 'hub-')):
        pool = _images_in(f'{base}/{name}')
        if pool:
            break
    if not pool:
        return []
    pick = int(hashlib.md5(slug.encode()).hexdigest(), 16) % len(pool)
    return [pool[pick]]


SUPPLIED = _supplied_products()

raw_path = None
for ext in ('jpg', 'jpeg', 'png', 'webp'):
    cand = f'{ROOT}/public/covers/raw/{slug}.{ext}'
    if os.path.exists(cand):
        raw_path = cand
        break
if not raw_path and not SUPPLIED:
    sys.exit(f'No source image at {ROOT}/public/covers/raw/{slug}.[jpg|png|webp] '
             f'and nothing in {ROOT}/assets/product-images/ — '
             'run generate-cover.mjs or drop a product photo in.')

if SUPPLIED:
    # ---- real product photographs -----------------------------------------
    # Cut out, laid across the right of a canvas in the article's palette colour,
    # vertically centred. Nothing is generated: a real photograph is accurate, is
    # free to re-render, and cannot invent a US power socket on an Australian
    # site — which the generated artwork did, three times running.
    print(f'  using {len(SUPPLIED)} supplied product image(s) — no fal call')
    cuts = [_cutout(Image.open(p)) for p in SUPPLIED]

    # Trim each cut-out to what it actually contains.
    #
    # Stock product photography is padded: the Hue hub arrived as 1106x1241 of
    # product centred in a 1500x1500 frame, a quarter of it empty. Scaling that to
    # fit the zone scales the emptiness too, so the product lands visibly smaller
    # than the space allotted to it. Worse for the shadow — the silhouette's bottom
    # edge is then the padding's bottom edge, so the contact shadow is cast 100px
    # below where the product actually stands and the whole thing reads as hovering.
    # Cropping to the alpha bounds fixes the scale and the shadow together.
    cuts = [c.crop(c.getchannel('A').getbbox() or c.getbbox()) for c in cuts]

    # Resolved here, not up with the other front matter, because a contrast-aware
    # pick needs to have seen the product first. The canvas therefore cannot be
    # painted until after the cut-outs are loaded and trimmed.
    if BG_RANDOM:
        bg = _pick_bg(cuts)
    img = Image.new('RGB', (W, H), bg)

    # Lay the cut-outs in a row, each scaled to fit, all sitting on a common
    # baseline. Order is the order on disk, so a deliberate filename prefix
    # controls the arrangement.
    #
    # Placement band. With a headline the row occupies the right and the left is
    # left free for type; with none, it spans the frame — inset enough that the
    # ~10% side crop the home page cards apply cannot bite into the product.
    #
    # `coverProduct` overrides that default, because the two questions are not the
    # same one. "No headline right now" and "no headline ever" look identical to
    # the composer but want opposite layouts: a cover being held for a title still
    # needs its left column kept clear, so the artwork does not have to be redone
    # once the words arrive.
    PLACE = fm('coverProduct', 'centre' if NO_TEXT else 'right').lower()
    if PLACE not in ('right', 'centre'):
        sys.exit(f"coverProduct must be 'right' or 'centre', got '{PLACE}'")

    if PLACE == 'centre':
        BAND_L, BAND_R = int(W * 0.13), int(W * 0.87)
    else:
        BAND_L, BAND_R = int(W * 0.52), int(W * 0.97)
    band_w = BAND_R - BAND_L

    # `coverProductScale` shrinks the product inside its band without moving it.
    # The band decides where the subject sits; this decides how much of that band
    # it fills, so a cover can be given breathing room without the subject
    # drifting off its placement as a side effect.
    raw_scale = fm('coverProductScale', '1')
    try:
        PSCALE = float(raw_scale)
    except ValueError:
        sys.exit(f"coverProductScale must be a number, got '{raw_scale}'")
    if not 0.2 <= PSCALE <= 1.0:
        sys.exit(f'coverProductScale must be between 0.2 and 1.0, got {PSCALE}')

    # Room is left below the row for the shadow; a product scaled to the full
    # height would have its contact shadow clipped off by the bottom edge, which
    # is exactly the floating look the shadow is there to remove.
    fit_w, fit_h = band_w * PSCALE, H * 0.74 * PSCALE
    gap = int(W * 0.015)

    each_w = (fit_w - gap * (len(cuts) - 1)) / len(cuts)
    scaled = []
    for c in cuts:
        f = min(each_w / c.size[0], fit_h / c.size[1])
        scaled.append(c.resize((max(1, int(c.size[0] * f)), max(1, int(c.size[1] * f))), Image.LANCZOS))

    # Baseline rather than centre. Products of different heights centred on one
    # line float at different distances from the floor, and once each is casting a
    # contact shadow that reads as several surfaces at once. Sharing a baseline is
    # what makes them one group standing on one surface.
    tallest = max(s.size[1] for s in scaled)
    base = (H + tallest) // 2 - int(H * 0.02)

    # Centred in the BAND, not in the shrunken fit box — otherwise scaling down
    # would drag the product toward the band's left edge instead of leaving it
    # where it was placed.
    total_w = sum(s.size[0] for s in scaled) + gap * (len(scaled) - 1)
    x = BAND_L + (band_w - total_w) // 2
    for s in scaled:
        _seat(img, s, x, base - s.size[1], bg)
        x += s.size[0] + gap
    print(f'    product: {PLACE} @ {PSCALE:g}x')

    # The card thumbnail reuses the largest cut-out on the same colour, so the
    # tile and the cover are visibly the same artwork.
    SQ_BUILD = 800
    sq_src = Image.new('RGB', (SQ_BUILD, SQ_BUILD), bg)
    big = max(cuts, key=lambda c: c.size[0] * c.size[1])
    f = min(SQ_BUILD * 0.72 / big.size[0], SQ_BUILD * 0.72 / big.size[1])
    bigr = big.resize((max(1, int(big.size[0] * f)), max(1, int(big.size[1] * f))), Image.LANCZOS)
    _seat(sq_src, bigr, (SQ_BUILD - bigr.size[0]) // 2,
          (SQ_BUILD - bigr.size[1]) // 2 - int(SQ_BUILD * 0.03), bg)
    SUPPLIED_SQUARE = sq_src
    SQUARE_SRC = False
else:
    SUPPLIED_SQUARE = None
    src_img = Image.open(raw_path).convert('RGB')
    sw, sh = src_img.size
    target = W / H
    SQUARE_SRC = abs(sw / sh - 1.0) < 0.02

if SUPPLIED:
    pass
elif SQUARE_SRC:
    # ---- square source: place it, do not crop to it ------------------------
    # The generation is a centred product on a flat backdrop. Rather than asking
    # the model to leave a text column free — which it would not do reliably —
    # the square is pasted into the RIGHT of a canvas painted in the backdrop's
    # own colour, vertically centred. The left column is then empty by
    # construction, not by persuasion.
    #
    # 0.92 rather than full height leaves a margin, so anything the model let touch
    # the square's own edge does not end up flush against the canvas edge.
    side = int(H * 0.92)
    sq = src_img.resize((side, side), Image.LANCZOS)

    # Centre of the product group sits at 72% of the width — clear of the headline
    # column, comfortably inside the right edge.
    left = max(int(W * 0.45), min(W - side, int(W * 0.72) - side // 2))

    # Lift the square. Despite being told there is no supporting surface, the model
    # reliably stands the group on one near the bottom of the square, at roughly
    # 0.72 of its height. Mapping that point to the canvas mid-line is what actually
    # puts the product in the middle, which asking for it did not.
    PRODUCT_AT = 0.72
    top = int(H * 0.5 - side * PRODUCT_AT)

    # Build the canvas by extending the square's OWN leftmost column across the
    # full width, row by row, rather than flooding it with one sampled colour.
    #
    # A single median colour left a visible grey band down the left of any
    # generation whose backdrop carries a vertical gradient — which most of them
    # do. Matching per row means the canvas is the same colour as the square at
    # every height, so the join cannot show whatever the model produced.
    # Both sides, not just the left. The product group sits at 72% of the width, so
    # the square stops short of the right edge and leaves a strip of bare canvas —
    # which was being painted with the square's LEFT column. On any backdrop with a
    # horizontal gradient the two do not match, and the result was a hard vertical
    # seam a few centimetres in from the right edge. Each side is filled from the
    # column it actually abuts.
    src_arr = np.asarray(sq)
    col_l = src_arr[:, :4, :].mean(axis=1)                  # side x 3, one per row
    col_r = src_arr[:, -4:, :].mean(axis=1)
    rows = np.clip(np.arange(H) - top, 0, side - 1)          # canvas row -> square row
    canvas = np.repeat(col_l[rows][:, None, :], W, axis=1)
    right = left + side
    if right < W:
        canvas[:, right:, :] = col_r[rows][:, None, :]
    img = Image.fromarray(canvas.astype('uint8'), 'RGB')

    # Feather the left and bottom edges so the square dissolves into that canvas.
    alpha = np.full((side, side), 255.0)
    fx, fy = int(side * 0.34), int(side * 0.22)
    alpha[:, :fx] *= np.linspace(0, 1, fx)[None, :]
    alpha[-fy:, :] *= np.linspace(1, 0, fy)[:, None]
    # The right edge only needs feathering when it actually meets canvas. Kept
    # narrow: the product sits close to it, and a wide fade would eat into it.
    if right < W:
        fr = min(int(side * 0.05), side)
        alpha[:, -fr:] *= np.linspace(1, 0, fr)[None, :]
    img.paste(sq, (left, top), Image.fromarray(alpha.astype('uint8'), 'L'))
else:
    # ---- wide source: original behaviour, kept for pre-existing raws --------
    # Aspect-correct cover crop. A plain resize would distort anything whose aspect
    # does not already match the output. Where the source is wider than the target,
    # crop from the LEFT: those covers put the product on the right.
    if abs(sw / sh - target) < 0.01:
        img = src_img.resize((W, H), Image.LANCZOS)
    elif sw / sh > target:                     # too wide -> trim the left
        new_w = int(sh * target)
        img = src_img.crop((sw - new_w, 0, sw, sh)).resize((W, H), Image.LANCZOS)
    else:                                      # too tall -> trim top and bottom evenly
        new_h = int(sw / target)
        top = (sh - new_h) // 2
        img = src_img.crop((0, top, sw, top + new_h)).resize((W, H), Image.LANCZOS)

# Sample the actual background from the empty left edge of the source and use that
# for the scrim. Using the category colour instead would tint supplied artwork the
# wrong hue — a green wash over navy art, for example.
patch = img.crop((0, 0, int(W * 0.18), H)).resize((1, 1), Image.LANCZOS)
sampled = patch.getpixel((0, 0))
# Only fall back to the category colour if the sample is near-white (no art there).
if sum(sampled) > 700:
    sampled = bg
bg = sampled

# Push the artwork right so the subject sits further into the right-hand half.
# The vacated strip is filled with the sampled backdrop; at 60px it stays entirely
# beneath the solid part of the panel below, so the seam is never visible. The
# 60px lost from the right edge is backdrop — the prompt requires objects to sit
# well inside the frame.
# Skipped when the layout was composed here rather than cropped from a wide
# generation: those paths already place the subject exactly where it belongs, and
# shifting would move it back off centre.
SHIFT = 0 if (SUPPLIED or SQUARE_SRC) else int(60 * SCALE)
shifted = Image.new('RGB', (W, H), bg)
shifted.paste(img, (SHIFT, 0))
# Fill the vacated strip by stretching the artwork's own leftmost column rather
# than flooding it with one sampled colour. A flat fill only went unnoticed while
# the scrim covered it; with the scrim off it read as a dark band down the edge,
# because the artwork's backdrop is not perfectly uniform top to bottom.
if SHIFT:
    edge = img.crop((0, 0, 1, H)).resize((SHIFT, H), Image.NEAREST)
    shifted.paste(edge, (0, 0))
img = shifted

# Off by default: the headline sits straight on the artwork's own backdrop, with no
# darker panel and no fade. The generated backgrounds are flat and even by design,
# so the panel was covering artwork it did not need to.
#
# `coverScrim: true` in front matter brings it back for a cover that needs it —
# a pale or busy generation where white type would otherwise struggle. This used to fade from 44% all the way out to
# 92% of the width, which laid a ~54% veil across the product and washed it out.
# It is now solid across the text column and blended out over 160px, reaching
# fully transparent at 62% — before the subject, but gradual enough that the
# panel edge does not read as a hard vertical seam against artwork that
# brightens toward the right.
if fm('coverScrim', 'false').lower() in ('true', 'yes', '1'):
    scrim = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    SOLID, FADE_END = 0.46, 0.62
    for x in range(W):
        t = x / W
        if t <= SOLID:
            a = 252
        elif t >= FADE_END:
            a = 0
        else:
            a = int(252 * (1 - (t - SOLID) / (FADE_END - SOLID)) ** 1.6)
        if a:
            sd.line([(x, 0), (x, H)], fill=(*bg, a))
    img = Image.alpha_composite(img.convert('RGBA'), scrim).convert('RGB')
# Ink colour follows the backdrop.
#
# With no panel behind the headline, legibility depends entirely on what the model
# generated. White on a bright orange or lilac backdrop measures around 2.3:1,
# well under the 4.5:1 WCAG AA floor. Rather than put the panel back, the type
# switches to near-black wherever that reads better — the artwork stays exactly as
# generated, which is the point of dropping the scrim.
#
# _rel_lum is defined once, up with the panel palette that also needs it.
_band = img.crop((int(88 * SCALE), int(H * 0.28), int(W * 0.45), int(H * 0.72)))
_mean = _band.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
_lum = _rel_lum(_mean)
_white = 1.05 / (_lum + 0.05)
_black = (_lum + 0.05) / 0.05

if NO_TEXT:
    INK, INK_SOFT = (255, 255, 255), (255, 255, 255, 215)
    print('    headline: off (coverText: false)')
elif _white >= _black:
    INK, INK_SOFT = (255, 255, 255), (255, 255, 255, 215)
    print(f'    ink: white  ({_white:.2f}:1)')
else:
    INK, INK_SOFT = (18, 16, 14), (18, 16, 14, 225)
    print(f'    ink: dark   ({_black:.2f}:1)')

d = ImageDraw.Draw(img, 'RGBA')

# Left inset. Wider than the old 60px so the headline is not sitting hard against
# the frame edge — the type now starts well clear of it.
PAD = int(88 * SCALE)
COL = int(W * 0.46) - PAD          # text column width, within the brief's left band

# `coverTextFull: true` widens the headline out of the left band.
#
# NOT edge-to-edge, though. This 1240x700 cover is shown on the home page in slots
# whose narrowest aspect is 282/200; object-fit: cover scales to fill the height
# and crops the sides, which removes about 10% of the width at each edge. Type set
# to W - PAD*2 starts at 109px and is therefore already inside the cut.
#
# So "full width" means the widest band that survives that crop, with margin to
# spare: 76% of the canvas leaves 149px each side against a ~126px worst-case cut.
# Set from the crop rather than chosen by eye, so it stays correct if the cover
# dimensions change.
#
# The product sits centre-right and low in the frame, so a top-pinned headline
# clears it. Combined with coverTextTop, which is what makes this usable.
if fm('coverTextFull', 'false').lower() in ('true', 'yes', '1'):
    COL = int(W * 0.76)

# Horizontal placement. Left-aligned at PAD by default, matching the brief's left
# band. `coverTextCentre: true` centres the column in the canvas AND centres each
# line within it, which is what gives equal space left and right — both on the
# full cover and, because the column is crop-safe, in the cropped home page slots.
CENTRE = fm('coverTextCentre', 'false').lower() in ('true', 'yes', '1')
ORIGIN = (W - COL) // 2 if CENTRE else PAD


def font(weight, size):
    return ImageFont.truetype(f'{FONTS}/urbanist-{weight}.ttf', size)


def wrap(text, f, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = f'{cur} {w}'.strip()
        if d.textlength(t, font=f) <= width:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def fit(text, weight, hi, lo, max_lines):
    """Largest size at which `text` fits within max_lines."""
    for size in range(hi, lo - 1, -2):
        f = font(weight, size)
        ls = wrap(text, f, COL)
        if len(ls) <= max_lines:
            return f, ls, size
    f = font(weight, lo)
    return f, wrap(text, f, COL), lo


# Three title lines are allowed now that the category lead-in is gone: it frees
# the vertical space, and a long title no longer has to shrink to fit two.
main_f, main_lines, main_s = fit(main, 800, int(54 * SCALE), int(26 * SCALE), 3)
sub_f, sub_lines, sub_s = fit(sub, 500, int(27 * SCALE), int(17 * SCALE), 2) if sub else (None, [], 0)

MAIN_GAP = int(16 * SCALE)
block_h = (
    len(main_lines) * int(main_s * 1.08)
    + (MAIN_GAP + len(sub_lines) * int(sub_s * 1.24) if sub_lines else 0)
)
# Vertical placement. CENTRED by default, so the headline sits on the same optical
# line as the product now that the product is itself centred on the right. Top
# pinning made sense when the artwork stood on a floor plane at the bottom of the
# frame; it does not any more. `coverTextTop: true` restores the old behaviour.
if fm('coverTextTop', 'false').lower() in ('true', 'yes', '1'):
    y = int(64 * SCALE)
else:
    y = (H - block_h) // 2

def line_x(line, f):
    """Left edge for one line — centred within the column, or flush with it."""
    if not CENTRE:
        return ORIGIN
    return ORIGIN + int((COL - d.textlength(line, font=f)) / 2)


for line in main_lines:
    d.text((line_x(line, main_f), y), line, font=main_f, fill=INK)
    y += int(main_s * 1.08)

if sub_lines:
    y += MAIN_GAP
    for line in sub_lines:
        d.text((line_x(line, sub_f), y), line, font=sub_f, fill=INK_SOFT)
        y += int(sub_s * 1.24)

# ---- square variant -------------------------------------------------------
# A 500x500 crop of the same artwork, centred on the product.
#
# Cropped rather than generated a second time: another fal call would invent a
# different product on a different backdrop, and the brief is for the same one.
# Taking a square window out of the wide render keeps the exact product and its
# real background, with no compositing seam to hide.
SQ = 500


# Deterministic crop, not subject detection.
#
# This previously tried to isolate the product by thresholding distance from a
# background sample, searching the right half only. It did not work: measured
# across every render in public/covers/raw, that detector returned the box
# x616-1231 for almost all of them — i.e. it was handing back the right half
# rather than finding anything, so the crop centred at x~923 and sliced the main
# device off at the left edge. Corner-sampled thresholds cannot separate these
# subjects because the backdrop is a smooth gradient and the products are a
# similar tone to it, especially on the pale palette entries.
#
# The brief already guarantees what the detector was trying to rediscover: the
# product is composed right-of-centre, standing on a floor plane near the bottom.
# Anchoring to that is predictable and cannot misfire.
#
# CX_FRAC 0.60 keeps the product group whole without pulling in the headline area
# on the left. Bottom-aligning trims the empty upper wall, which is what made the
# full-height crop look sparse.
CX_FRAC, SIDE_FRAC = 0.60, 0.88

if SUPPLIED_SQUARE is not None:
    # Built alongside the cover from the same cut-outs — no source file to crop.
    side = SUPPLIED_SQUARE.size[0]
    square = SUPPLIED_SQUARE.resize((SQ, SQ), Image.LANCZOS)
else:
    shot = Image.open(raw_path).convert('RGB')
    shot_w, shot_h = shot.size
    if SQUARE_SRC:
        # The generation is already square and already centred on the product, so
        # it IS the thumbnail. No crop, and nothing left to misframe.
        side = shot_h
        square = shot.resize((SQ, SQ), Image.LANCZOS)
    else:
        side = int(shot_h * SIDE_FRAC)
        left = max(0, min(shot_w - side, int(shot_w * CX_FRAC) - side // 2))
        top = shot_h - side
        square = shot.crop((left, top, left + side, top + side)).resize((SQ, SQ), Image.LANCZOS)

sq_dir = f'{ROOT}/public/covers/square'
os.makedirs(sq_dir, exist_ok=True)
sq_out = f'{sq_dir}/{slug}.webp'
square.save(sq_out, quality=88, method=6)
print(f'  wrote {sq_out}  ({os.path.getsize(sq_out)//1024} KB, subject framed at {side}px)')

# WebP rather than PNG: visually identical at q88 and about a tenth of the bytes
# on this kind of artwork (332 KB -> 35 KB measured). Every browser the site
# supports has handled it for years.
out = f'{ROOT}/public/covers/{slug}.webp'
img.save(out, quality=88, method=6)
print(f'  wrote {out}  ({os.path.getsize(out)//1024} KB)')
print(f'    main {main_s}px x{len(main_lines)} | sub {sub_s}px x{len(sub_lines)}')
