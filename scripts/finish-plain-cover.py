#!/usr/bin/env python3
"""
Write the cover files for a generation that carries no text.

    python3 scripts/finish-plain-cover.py <slug> <raw-image> <WIDTHxHEIGHT>

Called by scripts/generate-cover.mjs for the grey editorial design, where the
generation IS the cover. compose-cover.py is not involved: it exists to typeset
a headline over artwork, and this design has no headline.

Two files are written:

    public/covers/<slug>.webp         the cover, at the requested size
    public/covers/square/<slug>.webp  500x500 card tile, cropped from the same art

The tile is a crop rather than a second generation. Generating again would
invent a different product on a different backdrop, and the card and the cover
are supposed to be the same picture.
"""
import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SQ = 500

if len(sys.argv) < 4:
    sys.exit('Usage: finish-plain-cover.py <slug> <raw-image> <WIDTHxHEIGHT>')

slug, raw_path, size = sys.argv[1], sys.argv[2], sys.argv[3]
if not os.path.exists(raw_path):
    sys.exit(f'No source image at {raw_path}')

W, H = (int(v) for v in size.lower().split('x'))
img = Image.open(raw_path).convert('RGB')

# The model is asked for the output size directly, so this is normally a no-op.
# It still runs, because a model that quietly rounds a dimension it cannot hit
# would otherwise ship a cover a few pixels off the size that was requested.
if img.size != (W, H):
    src_r, out_r = img.width / img.height, W / H
    if abs(src_r - out_r) > 0.01:
        # Aspect-correct: crop the long axis rather than squashing the product.
        if src_r > out_r:
            new_w = int(img.height * out_r)
            img = img.crop(((img.width - new_w) // 2, 0, (img.width - new_w) // 2 + new_w, img.height))
        else:
            new_h = int(img.width / out_r)
            img = img.crop((0, (img.height - new_h) // 2, img.width, (img.height - new_h) // 2 + new_h))
    print(f'  resized {Image.open(raw_path).size} -> {W}x{H}')
    img = img.resize((W, H), Image.LANCZOS)

out = f'{ROOT}/public/covers/{slug}.webp'
os.makedirs(os.path.dirname(out), exist_ok=True)
img.save(out, quality=90, method=6)
print(f'  wrote {out}  ({os.path.getsize(out) // 1024} KB, {img.width}x{img.height}, no text)')

# Square tile, framed right of centre. The composition puts the objects there,
# so a centre crop would cut the group in half and a left crop would return
# empty backdrop.
side = img.height
left = max(0, min(img.width - side, int(img.width * 0.66) - side // 2))
sq_dir = f'{ROOT}/public/covers/square'
os.makedirs(sq_dir, exist_ok=True)
sq_out = f'{sq_dir}/{slug}.webp'
img.crop((left, 0, left + side, side)).resize((SQ, SQ), Image.LANCZOS).save(sq_out, quality=90, method=6)
print(f'  wrote {sq_out}  ({os.path.getsize(sq_out) // 1024} KB)')
