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
    coverMain: 'ZIGBEE VS Z-WAVE'
    coverSub:  'VS THREAD VS WI-FI'
"""
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = '/opt/nxtsmarthome.com.au'
FONTS = '/tmp/claude-0/-var-www-html/3137644f-60bd-49cf-930c-822117827c4b/scratchpad/fonts'
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

raw_path = None
for ext in ('jpg', 'jpeg', 'png', 'webp'):
    cand = f'{ROOT}/public/covers/raw/{slug}.{ext}'
    if os.path.exists(cand):
        raw_path = cand
        break
if not raw_path:
    sys.exit(f'No source image at {ROOT}/public/covers/raw/{slug}.[jpg|png|webp] — '
             'run generate-cover.mjs or drop one in.')

src_img = Image.open(raw_path).convert('RGB')

# Aspect-correct cover crop. A plain resize would distort anything whose aspect
# does not already match the output.
# Where the source is wider than the target, crop from the LEFT: these covers put
# the product on the right, and the left is empty background we are covering with
# the text scrim anyway.
sw, sh = src_img.size
target = W / H
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
SHIFT = int(60 * SCALE)
shifted = Image.new('RGB', (W, H), bg)
shifted.paste(img, (SHIFT, 0))
# Fill the vacated strip by stretching the artwork's own leftmost column rather
# than flooding it with one sampled colour. A flat fill only went unnoticed while
# the scrim covered it; with the scrim off it read as a dark band down the edge,
# because the artwork's backdrop is not perfectly uniform top to bottom.
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
def _rel_lum(rgb):
    out = []
    for v in rgb:
        v = v / 255.0
        out.append(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4)
    return 0.2126 * out[0] + 0.7152 * out[1] + 0.0722 * out[2]


_band = img.crop((int(88 * SCALE), int(H * 0.28), int(W * 0.45), int(H * 0.72)))
_mean = _band.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
_lum = _rel_lum(_mean)
_white = 1.05 / (_lum + 0.05)
_black = (_lum + 0.05) / 0.05

if _white >= _black:
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
# Vertical placement. Pinned to the top by default: the headline reads first, and
# the lower half of the frame stays clear for the product. `coverTextTop: false`
# in front matter centres it instead.
if fm('coverTextTop', 'true').lower() in ('false', 'no', '0'):
    y = (H - block_h) // 2
else:
    y = int(64 * SCALE)

for line in main_lines:
    d.text((PAD, y), line, font=main_f, fill=INK)
    y += int(main_s * 1.08)

if sub_lines:
    y += MAIN_GAP
    for line in sub_lines:
        d.text((PAD, y), line, font=sub_f, fill=INK_SOFT)
        y += int(sub_s * 1.24)

# ---- square variant -------------------------------------------------------
# A 500x500 crop of the same artwork, centred on the product.
#
# Cropped rather than generated a second time: another fal call would invent a
# different product on a different backdrop, and the brief is for the same one.
# Taking a square window out of the wide render keeps the exact product and its
# real background, with no compositing seam to hide.
SQ = 500


def _subject_box(src):
    """Bounding box of the subject, or None if it cannot be isolated."""
    import numpy as np

    a = np.asarray(src).astype(int)
    h, w, _ = a.shape
    bg = a[:, : int(w * 0.06)].reshape(-1, 3).mean(0)
    mask = np.abs(a - bg).mean(2) > 45
    # Right half only: the brief puts every object there, and the floor plane spans
    # the full width, which would otherwise drag the box out to the whole frame.
    right = mask[:, w // 2 :]
    cols = np.where(right.sum(0) > h * 0.04)[0]
    rows = np.where(right.sum(1) > (w // 2) * 0.04)[0]
    if len(cols) < 8 or len(rows) < 8:
        return None
    return (w // 2 + cols.min(), rows.min(), w // 2 + cols.max(), rows.max())


shot = Image.open(raw_path).convert('RGB')
sw, sh = shot.size
box = _subject_box(shot)

if box:
    # Frame the subject on both axes. Cropping the full height instead — which is
    # what this did first — left the product sitting low against a large empty
    # wall, because these renders stand the object on a floor plane near the
    # bottom of the frame.
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    # 1.2 leaves a little air around the subject without letting it swim in
    # empty backdrop; capped at 85% of the frame so it always crops in.
    side = int(max(x1 - x0, y1 - y0) * 1.2)
    side = max(int(sh * 0.42), min(int(sh * 0.85), side))
else:
    cx, cy, side = int(sw * 0.70), sh // 2, sh

left = max(0, min(sw - side, cx - side // 2))
top = max(0, min(sh - side, cy - side // 2))
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
