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
    if ':' in title:
        head, tail = title.split(':', 1)
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
img = shifted

# Flat panel behind the type only. This used to fade from 44% all the way out to
# 92% of the width, which laid a ~54% veil across the product and washed it out.
# It is now solid across the text column and blended out over 160px, reaching
# fully transparent at 62% — before the subject, but gradual enough that the
# panel edge does not read as a hard vertical seam against artwork that
# brightens toward the right.
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
y = (H - block_h) // 2          # vertically centred, as in the references

for line in main_lines:
    d.text((PAD, y), line, font=main_f, fill=(255, 255, 255))
    y += int(main_s * 1.08)

if sub_lines:
    y += MAIN_GAP
    for line in sub_lines:
        d.text((PAD, y), line, font=sub_f, fill=(255, 255, 255, 215))
        y += int(sub_s * 1.24)

out = f'{ROOT}/public/covers/{slug}.png'
img.save(out, optimize=True)
print(f'  wrote {out}  ({os.path.getsize(out)//1024} KB)')
print(f'    main {main_s}px x{len(main_lines)} | sub {sub_s}px x{len(sub_lines)}')
