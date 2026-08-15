#!/usr/bin/env python3
"""
Composite a category hero banner: type on the left, product artwork on the right.

Normally driven by scripts/generate-category-hero.mjs, which resolves the
category list, colour and artwork and then calls this. It is usable on its own
for a one-off banner:

    python3 scripts/compose-category-hero.py \
        --kind post --slug lighting \
        --eyebrow 'Guides & Reviews' --main 'Lighting' \
        --sub 'Smart bulbs, switches, strips and lighting automation.' \
        --bg '#96600C' --raw public/heroes/raw/post-lighting.jpg

Deliberately knows nothing about the site's categories. Everything it prints or
paints arrives as an argument, so lib/site.ts stays the one place a category is
defined — this file never becomes a copy of it that has to be kept in step.

Why the type is set here and not by the image model: models render text badly,
and a misspelled category name baked into a banner sits on every page in that
section until someone notices. Set in Urbanist here, it is the real name.

Three files are written per run:

    public/heroes/<kind>/<slug>.webp        1600x600  the banner
    public/heroes/<kind>/<slug>-og.jpg      1200x630  social card
    public/heroes/square/<kind>/<slug>.webp  600x600  artwork only, no type

Re-running is free — a renamed category or a reworded blurb costs a compositing
pass, not another paid generation.
"""
import argparse
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

HERO = (1600, 600)
OG = (1200, 630)
SQUARE = 600

EXTS = ('png', 'jpg', 'jpeg', 'webp')

# Urbanist lives in the repo so a generation is not dependent on a scratch
# directory surviving. compose-cover.py reads the same directory.
FONT_DIRS = [
    os.path.join(ROOT, 'assets', 'fonts'),
]


def font_dir():
    for d in FONT_DIRS:
        if os.path.exists(os.path.join(d, 'urbanist-800.ttf')):
            return d
    sys.exit(f'No Urbanist fonts found. Looked in: {", ".join(FONT_DIRS)}')


FONTS = font_dir()


def parse_args():
    p = argparse.ArgumentParser(description='Composite a category hero banner.')
    p.add_argument('--kind', required=True, choices=('post', 'product'))
    p.add_argument('--slug', required=True)
    p.add_argument('--main', required=True, help='Headline, set ALL CAPS.')
    p.add_argument('--sub', default='', help='Supporting line under the headline.')
    p.add_argument('--eyebrow', default='', help='Small tracked line above the headline.')
    p.add_argument('--bg', required=True, help='Backdrop colour, #RRGGBB.')
    p.add_argument('--raw', help='Square generated artwork.')
    p.add_argument('--photos', nargs='*', default=[],
                   help='Real product photographs; cut out and laid in a row. Wins over --raw.')
    p.add_argument('--out-dir', default=os.path.join(ROOT, 'public', 'heroes'))
    args = p.parse_args()
    if not args.raw and not args.photos:
        p.error('give either --raw or --photos')
    return args


def hex_rgb(value):
    v = value.lstrip('#')
    if len(v) != 6:
        sys.exit(f'--bg must be #RRGGBB, got {value!r}')
    return tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))


# ---------------------------------------------------------------------------
# Cut-out
# ---------------------------------------------------------------------------
def _flood_from_border(mask):
    """Grow a border-connected region inside `mask`.

    Whole-array shifts rather than a queue: fast enough at product-photo sizes
    and avoids a scipy dependency, which is not installed here.
    """
    h, w = mask.shape
    reach = np.zeros((h, w), bool)
    reach[0, :] = mask[0, :]
    reach[-1, :] = mask[-1, :]
    reach[:, 0] = mask[:, 0]
    reach[:, -1] = mask[:, -1]
    while True:
        grown = reach.copy()
        grown[1:, :] |= reach[:-1, :]
        grown[:-1, :] |= reach[1:, :]
        grown[:, 1:] |= reach[:, :-1]
        grown[:, :-1] |= reach[:, 1:]
        grown &= mask
        if grown.sum() == reach.sum():
            break
        reach = grown
    return reach


def cutout(im, feather=2.5):
    """Remove a plain studio background, keeping white areas inside the product.

    Two rules do the work.

    Connectivity, not brightness. A plain brightness threshold punches holes
    through anything legitimately white — a phone screen, a white bezel, a pale
    label — and product photography is full of those. The background mask is
    grown inward from the border, so only background-coloured regions that
    actually reach the edge of the frame are removed. A screen enclosed by a
    dark bezel never connects to the border and survives.

    Distance from the MEASURED backdrop, not a fixed brightness. This used to
    treat everything brighter than 200 as background, which is fine for a dark
    product and catastrophic for a white one: on the Tapo L530E it removed the
    bulb body and half the box, because a white bulb on white is brighter than
    200 everywhere. The backdrop colour is sampled from the frame border and
    only pixels close to THAT go — a white bulb sitting on white differs by the
    few levels of shading that separate them, and the tolerance is tightened
    until it stops crossing that line.

    The tolerance escalates rather than being fixed because not every photo is
    on pure white: some backdrops are 250-ish, some carry a faint vignette. The
    smallest tolerance that actually floods is the one that keeps the most
    subject, so the loop stops at the first one that removes a plausible amount.

    Anything already carrying real alpha is returned untouched.

    Kept in step with the same function in scripts/compose-cover.py.
    Duplicated rather than shared because every script in scripts/ is
    standalone; if this behaviour changes, change it in both.
    """
    if im.mode == 'RGBA' and im.getchannel('A').getextrema()[0] < 255:
        return im

    rgb = im.convert('RGB')
    a = np.asarray(rgb).astype(np.int16)
    h, w, _ = a.shape

    # Backdrop colour, per channel, from the one-pixel frame border. Median, so a
    # product that runs off the edge of its own photo does not drag the sample
    # with it.
    border = np.concatenate([a[0, :, :], a[-1, :, :], a[:, 0, :], a[:, -1, :]])
    bg = np.median(border, axis=0)

    dist = np.abs(a - bg).max(axis=2)

    reach = None
    tol = 6
    for candidate in (6, 10, 16, 24, 36):
        tol = candidate
        reach = _flood_from_border(dist <= tol)
        if reach.mean() >= 0.05:
            break

    # Nothing plausible to remove: a photo already cut out, or one whose subject
    # runs edge to edge. Returning it whole is better than gouging a hole in it.
    if reach.mean() < 0.02:
        return rgb.convert('RGBA')

    # Soft edge, but ONLY in a narrow band hugging what was removed. Ramping every
    # near-background pixel instead made a white app screen semi-transparent — the
    # cover colour showed straight through it. The band keeps the anti-aliasing
    # where the cut actually is.
    band = reach.copy()
    for _ in range(3):
        grown = band.copy()
        grown[1:, :] |= band[:-1, :]
        grown[:-1, :] |= band[1:, :]
        grown[:, 1:] |= band[:, :-1]
        grown[:, :-1] |= band[:, 1:]
        band = grown
    band &= ~reach

    soft = np.clip(dist / (tol * feather), 0, 1)
    alpha = np.where(reach, 0.0, np.where(band, soft, 1.0)) * 255

    out = rgb.convert('RGBA')
    out.putalpha(Image.fromarray(alpha.astype('uint8'), 'L'))
    return out


# ---------------------------------------------------------------------------
# Artwork
# ---------------------------------------------------------------------------
def _smooth_column(col, window):
    """Moving average down a column of colours.

    Kills any horizontal edge in the artwork before it is stretched sideways. The
    prompt forbids a floor plane and a horizon, but the model produces one often
    enough, and an edge in the source column repeats across the full width of the
    banner as a hard line through the type — far more conspicuous than the floor
    it came from.
    """
    window = max(3, window | 1)                 # odd, so 'valid' returns len(col)
    pad = window // 2
    p = np.pad(col, ((pad, pad), (0, 0)), mode='edge')
    k = np.ones(window) / window
    return np.stack([np.convolve(p[:, c], k, mode='valid') for c in range(3)], axis=1)


def art_from_square(square, W, H):
    """Place a square generation on the right of a wide banner.

    The generation is a centred product on a flat backdrop. Rather than asking
    the model to leave a text column free — which it will not do reliably, its
    objects and their shadows drift across any centre line it is given — the
    square is pasted into the right of a canvas painted in the backdrop's own
    colour. The left column is then empty by construction.

    The canvas is built from the square's OWN edge colours, row by row: its left
    column extended leftward, its right column extended rightward. Flooding it
    with a single sampled colour instead leaves a visible band down the side of
    any generation whose backdrop carries a vertical gradient, which most of them
    do — and sampling only the left edge leaves a seam at the right, where the
    square is usually a different tone.
    """
    side = int(H * 0.92)
    sq = square.resize((side, side), Image.LANCZOS)

    # Centre of the product group at 76% of the width: clear of the text column,
    # comfortably inside the right edge at both banner aspects.
    left = max(int(W * 0.5), min(W - side, int(W * 0.76) - side // 2))

    # Lift. Despite being told there is no supporting surface, the model reliably
    # stands the group on one at roughly 0.72 of the square's height. Mapping that
    # point to the canvas mid-line is what actually centres the product; asking
    # for it in the prompt did not.
    top = int(H * 0.5 - side * 0.72)

    a = np.asarray(sq).astype(float)
    win = side // 10
    col_l = _smooth_column(a[:, :4, :].mean(axis=1), win)      # side x 3, per row
    col_r = _smooth_column(a[:, -4:, :].mean(axis=1), win)

    rows = np.clip(np.arange(H) - top, 0, side - 1)            # canvas row -> square row
    xs = np.arange(W)
    canvas = np.where(
        (xs >= left + side)[None, :, None],
        col_r[rows][:, None, :],
        col_l[rows][:, None, :],
    )
    canvas = Image.fromarray(canvas.astype('uint8'), 'RGB')

    # Feather the square into that canvas. The left band is wide because it is
    # what hides the join under the empty half of the artwork; the right and
    # bottom only need enough to soften an edge, since the fill either side of
    # them is the square's own colour.
    alpha = np.full((side, side), 255.0)
    fx, fr, fy = int(side * 0.34), max(2, int(side * 0.05)), int(side * 0.22)
    alpha[:, :fx] *= np.linspace(0, 1, fx)[None, :]
    alpha[:, -fr:] *= np.linspace(1, 0, fr)[None, :]
    alpha[-fy:, :] *= np.linspace(1, 0, fy)[:, None]
    canvas.paste(sq, (left, top), Image.fromarray(alpha.astype('uint8'), 'L'))
    return canvas


def art_from_photos(cuts, W, H, bg):
    """Lay real product cut-outs in a row across the right of the banner.

    Nothing is generated on this path: a real photograph is accurate, free to
    re-render, and cannot invent a US power socket on an Australian site — which
    the generated artwork did, three times running, on the energy category.
    """
    canvas = Image.new('RGB', (W, H), bg)
    zone_l, zone_r = int(W * 0.50), int(W * 0.97)
    zone_w, zone_h = zone_r - zone_l, int(H * 0.80)
    gap = int(W * 0.015)

    each_w = (zone_w - gap * (len(cuts) - 1)) / len(cuts)
    scaled = []
    for c in cuts:
        f = min(each_w / c.size[0], zone_h / c.size[1])
        scaled.append(c.resize((max(1, int(c.size[0] * f)), max(1, int(c.size[1] * f))), Image.LANCZOS))

    total_w = sum(s.size[0] for s in scaled) + gap * (len(scaled) - 1)
    x = zone_l + (zone_w - total_w) // 2
    for s in scaled:
        canvas.paste(s, (x, (H - s.size[1]) // 2), s)
        x += s.size[0] + gap
    return canvas


def square_tile(square, cuts, bg):
    """Artwork only, no type — for a category card or thumbnail."""
    if square is not None:
        return square.resize((SQUARE, SQUARE), Image.LANCZOS)

    tile = Image.new('RGB', (SQUARE, SQUARE), bg)
    big = max(cuts, key=lambda c: c.size[0] * c.size[1])
    f = min(SQUARE * 0.76 / big.size[0], SQUARE * 0.76 / big.size[1])
    r = big.resize((max(1, int(big.size[0] * f)), max(1, int(big.size[1] * f))), Image.LANCZOS)
    tile.paste(r, ((SQUARE - r.size[0]) // 2, (SQUARE - r.size[1]) // 2), r)
    return tile


# ---------------------------------------------------------------------------
# Type
# ---------------------------------------------------------------------------
def rel_lum(rgb):
    out = []
    for v in rgb:
        v = v / 255.0
        out.append(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4)
    return 0.2126 * out[0] + 0.7152 * out[1] + 0.0722 * out[2]


def pick_ink(img, W, H, pad, col, quiet=False):
    """White or near-black, whichever measures better against what is behind it.

    The banner colours span near-white (#E3EEE8) to near-black navy, so a fixed
    white ink would fail WCAG AA outright on the pale end — white on the brighter
    palette entries measures around 2.3:1 against a 4.5:1 floor. Measured on the
    text band rather than assumed from the requested colour, because supplied
    photographs bring their own backdrop with them.
    """
    band = img.crop((pad, int(H * 0.24), pad + col, int(H * 0.78)))
    mean = band.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
    lum = rel_lum(mean)
    white = 1.05 / (lum + 0.05)
    black = (lum + 0.05) / 0.05
    if white >= black:
        if not quiet:
            print(f'    ink: white ({white:.2f}:1)')
        return (255, 255, 255), (255, 255, 255, 220)
    if not quiet:
        print(f'    ink: dark  ({black:.2f}:1)')
    return (18, 16, 14), (18, 16, 14, 230)


def render(W, H, square, cuts, bg, text, quiet=False):
    """One banner at one size. Called twice — the hero and the social card."""
    img = art_from_square(square, W, H) if square is not None else art_from_photos(cuts, W, H, bg)

    scale = W / 1000
    pad = int(88 * scale)
    col = int(W * 0.46) - pad          # text column, clear of the artwork

    ink, ink_soft = pick_ink(img, W, H, pad, col, quiet=quiet)
    d = ImageDraw.Draw(img, 'RGBA')

    def font(weight, size):
        return ImageFont.truetype(f'{FONTS}/urbanist-{weight}.ttf', size)

    def wrap(s, f, width):
        words, lines, cur = s.split(), [], ''
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

    def fit(s, weight, hi, lo, max_lines):
        """Largest size at which `s` fits within max_lines."""
        for size in range(hi, lo - 1, -2):
            f = font(weight, size)
            ls = wrap(s, f, col)
            if len(ls) <= max_lines:
                return f, ls, size
        f = font(weight, lo)
        return f, wrap(s, f, col), lo

    eyebrow = text['eyebrow'].upper()
    main = text['main'].upper()
    sub = text['sub']

    # Tracking, drawn per character. The site sets its eyebrows at 0.16em and
    # Pillow has no letter-spacing, so the loop below is what matches the CSS.
    eye_f = font(700, int(15 * scale))
    eye_track = max(1, int(2.4 * scale))
    eye_h = int(15 * scale * 1.4) if eyebrow else 0

    main_f, main_lines, main_s = fit(main, 800, int(64 * scale), int(30 * scale), 3)
    sub_f, sub_lines, sub_s = fit(sub, 500, int(26 * scale), int(16 * scale), 3) if sub else (None, [], 0)

    eye_gap, sub_gap = int(18 * scale), int(20 * scale)
    block_h = (
        (eye_h + eye_gap if eyebrow else 0)
        + len(main_lines) * int(main_s * 1.08)
        + (sub_gap + len(sub_lines) * int(sub_s * 1.35) if sub_lines else 0)
    )
    y = (H - block_h) // 2

    if eyebrow:
        x = pad
        for ch in eyebrow:
            d.text((x, y), ch, font=eye_f, fill=ink_soft)
            x += d.textlength(ch, font=eye_f) + eye_track
        y += eye_h + eye_gap

    for line in main_lines:
        d.text((pad, y), line, font=main_f, fill=ink)
        y += int(main_s * 1.08)

    if sub_lines:
        y += sub_gap
        for line in sub_lines:
            d.text((pad, y), line, font=sub_f, fill=ink_soft)
            y += int(sub_s * 1.35)

    return img, (main_s, len(main_lines), sub_s, len(sub_lines))


def main():
    args = parse_args()
    bg = hex_rgb(args.bg)

    square, cuts = None, []
    if args.photos:
        missing = [p for p in args.photos if not os.path.exists(p)]
        if missing:
            sys.exit(f'No such photo(s): {", ".join(missing)}')
        cuts = [cutout(Image.open(p)) for p in args.photos]
        print(f'  using {len(cuts)} supplied product image(s)')
    else:
        if not os.path.exists(args.raw):
            sys.exit(f'No source image at {args.raw} — run generate-category-hero.mjs first.')
        square = Image.open(args.raw).convert('RGB')
        w, h = square.size
        if abs(w / h - 1.0) > 0.02:
            # Everything downstream assumes the artwork is the square the prompt
            # asks for. Centre-crop anything else rather than distorting it.
            side = min(w, h)
            square = square.crop(((w - side) // 2, (h - side) // 2,
                                  (w - side) // 2 + side, (h - side) // 2 + side))

    text = {'eyebrow': args.eyebrow, 'main': args.main, 'sub': args.sub}

    out_dir = os.path.join(args.out_dir, args.kind)
    sq_dir = os.path.join(args.out_dir, 'square', args.kind)
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs(sq_dir, exist_ok=True)

    hero, metrics = render(*HERO, square, cuts, bg, text)
    hero_path = os.path.join(out_dir, f'{args.slug}.webp')
    hero.save(hero_path, quality=88, method=6)
    print(f'  wrote {os.path.relpath(hero_path, ROOT)}  ({os.path.getsize(hero_path) // 1024} KB)')
    print(f'    main {metrics[0]}px x{metrics[1]} | sub {metrics[2]}px x{metrics[3]}')

    # JPEG for the social card, not WebP. Every scraper that matters handles
    # WebP now except the ones that do not, and an og:image that silently fails
    # to unfurl is not worth the few KB saved.
    og, _ = render(*OG, square, cuts, bg, text, quiet=True)
    og_path = os.path.join(out_dir, f'{args.slug}-og.jpg')
    og.save(og_path, quality=88, subsampling=0)
    print(f'  wrote {os.path.relpath(og_path, ROOT)}  ({os.path.getsize(og_path) // 1024} KB)')

    tile = square_tile(square, cuts, bg)
    tile_path = os.path.join(sq_dir, f'{args.slug}.webp')
    tile.save(tile_path, quality=88, method=6)
    print(f'  wrote {os.path.relpath(tile_path, ROOT)}  ({os.path.getsize(tile_path) // 1024} KB)')


if __name__ == '__main__':
    main()
