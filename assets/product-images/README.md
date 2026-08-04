# Product images for article covers

Drop real product photographs here and the cover compositor will use them instead
of generating artwork with fal.ai.

## Where to put a file

**One product for one article** — name the file after the article slug:

```
assets/product-images/future-proof-smart-home-devices-australia.png
```

**Several products for one article** — make a folder named after the slug and put
them in it. They are laid out in a row, largest in the middle, up to four:

```
assets/product-images/future-proof-smart-home-devices-australia/
    monitor.png
    hub.jpg
    sensor.png
```

Accepted extensions: `.png` `.jpg` `.jpeg` `.webp`

## What happens to them

1. The background is removed automatically. Flood-fill runs inward from the four
   corners, so a clean studio background disappears while white areas **inside**
   the product — a phone screen, a white bezel — are kept. This is why a plain
   threshold is not used.
2. The cut-out is scaled and placed on the right of the cover, vertically centred,
   over the article's palette colour.
3. The headline and sub-heading are typeset on the left as usual.
4. The square card thumbnail is produced from the same cut-out.

**No fal.ai call is made when a file is present here.** That is the point: a real
product photograph is accurate, costs nothing per render, and cannot invent a US
power socket on an Australian site — which generated artwork did, repeatedly.

## Getting the best result

- **Plain, even background.** White or light grey studio shots cut out cleanly.
  A photograph taken on a desk will not.
- **Generous margin.** Do not crop tight to the product; the compositor adds its
  own spacing.
- **Reasonable size.** At least 1000px on the long edge. Smaller images will look
  soft at 1240px wide.
- **PNG with real transparency is used as-is** — if you have already cut something
  out, the background-removal step is skipped.

## Before you add anything

Product photography is usually owned by the manufacturer or the retailer.
Publishing it on a commercial site needs a licence. The routes that are actually
permitted:

- **Manufacturer press or media kits** — most allow editorial use, often with an
  attribution condition.
- **eBay Partner Network** — the Browse API returns listing imagery, and affiliate
  use is permitted within the programme terms. eBay credentials are already
  configured in `.env.local`.
- **Amazon Product Advertising API** — the correct licensed source for Amazon
  imagery. Requires three qualifying sales before access is granted.
- **Your own photographs** — no question at all, and the strongest signal that the
  device was genuinely handled. Consistent with what `/how-we-test/` promises.

Taking images from a retailer's product page without permission is the one route
to avoid. It is the sort of thing that surfaces after a site has traffic worth
noticing.
