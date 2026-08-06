# nxtsmarthome.com.au

Smart home blog for the Australian market. Next.js static export, markdown content, nginx.

48 articles, a 205-product catalogue, generated cover art, and a client-side search index —
all built to flat files, with no server process in production.

**This directory is the source of truth.** Nothing auto-deploys — you build and publish manually.

Editorial rules (what may be claimed, how products are placed) live in `CLAUDE.md`. Read that
before writing content; this file covers the mechanics.

## Quick reference

```bash
cd /opt/nxtsmarthome.com.au
nvm use 22

npm run dev                # local dev on http://localhost:3011
npm run build              # static export to out/
npm run deploy             # build + publish to /var/www/html/nxtsmarthome.com.au + reload nginx
npm run new:article -- "Title" <category> <type>
```

Node 22 is required (`.nvmrc` pins it). Node 18 is the system default, so run `nvm use 22` first.

## Writing an article

```bash
npm run new:article -- "Best Smart Locks for Australian Doors" security buying-guide
```

That creates `content/articles/best-smart-locks-for-australian-doors.md` with correct
frontmatter, marked `draft: true`. Remove the draft line to publish.

### Categories

`security`, `lighting`, `energy`, `entertainment`, `climate`, `hubs-and-platforms`,
`robot-vacuums`, `setup-guides`, `buying-guides`

Defined in `lib/site.ts`. Adding one there is all that is needed — the category page,
navigation counts and sitemap follow automatically.

### Article types

`review`, `comparison`, `buying-guide`, `how-to`, `explainer`, `roundup`

Type drives the badge on cards and the structured data. `review` emits `Review` schema with
the first product as `itemReviewed`; everything else emits `Article`.

### Frontmatter reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `description` | yes | Meta description and card text. 140–160 chars. |
| `category` | yes | One of the category keys above. |
| `type` | yes | One of the types above. |
| `date` | yes | `YYYY-MM-DD`, quoted. |
| `updated` | no | Shown instead of `date` when present. |
| `featured` | no | Promotes to the home page hero and raises sitemap priority. |
| `draft` | no | `true` excludes it from the build entirely. |
| `keyTakeaway` | no | Renders as "The short answer" callout above the body. |
| `tags` | no | Drives related-article scoring. |
| `faq` | no | List of `{q, a}`. Renders an accordion and emits FAQ structured data. |

No `image` field: cover art is matched by slug. `lib/content.ts` looks for
`public/covers/<slug>.webp|.png` and a square variant under `public/covers/square/`, so
naming the file after the article is all that connects them.

### Products in articles

Products are referenced by slug, inline in the markdown body:

```markdown
::product:aqara-hub-m3::
```

`components/ArticleBody.tsx` swaps each marker for a `ProductBox` — photograph, name, what it
suits, and buy buttons — reading the entry from the catalogue. The frontmatter `products:`
array the earlier version of this site used is gone; no article still carries one.

Every article needs at least two markers, and they carry editorial obligations — only products
the article genuinely discusses, only ones with a verdict, matching the category. `CLAUDE.md`
rule 8 is the authority on this.

```bash
node scripts/link-products.mjs <slug>            # preview placements
node scripts/link-products.mjs <slug> --write    # apply them
```

It refuses to link any product with no `bestFor` or `pros`, which is what keeps a bare marker
from becoming thin affiliate content.

### Affiliate links

Put the **raw merchant URL** in any product's `retailers[].url`. The affiliate wrapper is
applied at render time by `lib/affiliate.ts`, which also attaches the article slug as a subID
so you can attribute clicks per article. Never paste pre-built affiliate links into content —
that bypasses the tracking layer and makes network changes a find-and-replace job across every
article.

## The product catalogue

```text
public/data/products.json     205 products — the catalogue behind /products/ and ProductBox
content/products/*.md         curated overrides, hand-written
```

Products are sourced through DataForSEO and eBay, enriched with images, reviews and retailer
prices, then pruned. The pipeline lives in `scripts/` and runs locally, never at build time:

```bash
npm run fetch:products:dry     # what would change
npm run fetch:products         # fetch and write
node scripts/prune-fabricated-products.mjs
node scripts/generate-cover.mjs <slug>     # fal.ai cover art
```

These scripts need the secret credentials in `.env.local`. The build itself needs none of them.

## Affiliate configuration

**This repository is public.** `.env.example` is committed, so every value in it must stay
blank — real credentials belong only in `.env.local`, which is gitignored. The file carries
secret API keys too (eBay, DataForSEO, fal.ai); those are read by the pipeline scripts in Node
and must never take a `NEXT_PUBLIC_` prefix, which would bake them into the browser bundle.

Copy `.env.example` to `.env.local` and fill in IDs as programmes are approved:

```
NEXT_PUBLIC_SOVRN_KEY=
NEXT_PUBLIC_CJ_PID=
NEXT_PUBLIC_WALMART_PID=
NEXT_PUBLIC_EBAY_CAMPID=
NEXT_PUBLIC_AMAZON_TAG=
```

Values are inlined at build time, so **rebuild after changing them**.

A blank value disables that network cleanly — links still render and work, just untracked.
Setting `NEXT_PUBLIC_SOVRN_KEY` additionally injects the Sovrn Commerce script, which
auto-monetises outbound merchant links that no explicit network handles.

`/affiliate-disclosure/` lists the live networks by reading this config, so the disclosure
page cannot drift out of sync with what is actually running.

To route a new merchant through CJ, add its hostname to `cjMerchants` in `lib/affiliate.ts`.

## Structure

```
app/                      routes (App Router, static export)
  [category]/[slug]/      article template — the live article URL
  categories/[slug]/      category landing pages
  products/[slug]/        product pages, built from the catalogue
  authors/[slug]/         author pages
  search/                 client-side search over the prebuilt index
  design-preview/         layout experiments, not linked from the site
  sitemap.ts robots.ts    generated at build
components/               UI — AffiliateLink and ProductBox are the commercial path
content/
  articles/               the blog, one markdown file per post
  products/               curated product overrides
  authors/                author profiles
lib/
  site.ts                 site config + category definitions
  content.ts              markdown loading, parsing, related posts, cover matching
  products.ts             catalogue loading; drops ratings from inline boxes
  affiliate.ts            network URL builders — single place to change tracking
  urls.ts                 canonical path building
  dataforseo.ts           API client for the product pipeline
  seo.ts                  JSON-LD builders
scripts/
  build-search-index.mjs  runs on prebuild, writes public/search-index.json
  inject-sovrn.mjs        runs on postbuild, injects the Sovrn script into out/
  gen-article-redirects.mjs  writes the nginx 301 snippet — see URLs below
  link-products.mjs       places ::product: markers
  new-article.mjs         article scaffolder
  deploy.sh               build + publish
```

## URLs and redirects

Articles live at `/<category-slug>/<article-slug>/`. Note that frontmatter `category` uses the
category **key** (`security`) while the URL uses its slug (`security-and-cameras`) —
`lib/site.ts` holds the mapping.

They used to live at `/articles/<slug>/`, and those URLs are indexed. **A static export cannot
redirect by itself**, so the 301s are served by nginx from generated snippets:

```bash
node scripts/gen-article-redirects.mjs    # writes /etc/nginx/snippets/nxtsmarthome-article-redirects.conf
```

```text
/etc/nginx/snippets/nxtsmarthome-article-redirects.conf    old /articles/ URLs → new ones
/etc/nginx/snippets/nxtsmarthome-variant-redirects.conf    243 product-variant consolidations
```

Both are included by the vhost. **They live outside this repository**, so a rebuild does not
regenerate them and a move to any other host would drop them — roughly 259 redirects,
and the accumulated ranking on every one of those URLs, would become 404s. Regenerate the
article snippet whenever an article is added or changes category.

## Deployment

```bash
npm run deploy
```

Builds, backs up the current web root to `/opt/backups/nxtsmarthome.com.au/`, rsyncs
`out/` to `/var/www/html/nxtsmarthome.com.au/`, fixes ownership, and reloads nginx.
It refuses to deploy if the build produced no `out/index.html`.

nginx config: `/etc/nginx/sites-available/nxtsmarthome.com.au`

A preview build publishes to `/preview/` on the same host, with `X-Robots-Tag: noindex` set by
nginx so it cannot be indexed:

```bash
npm run deploy:preview
```

`PREVIEW_BASE_PATH` in `next.config.mjs` is what re-prefixes the assets for that subdirectory.

## Things worth knowing

- **Cloudflare sits in front of this domain.** SSL/TLS mode must be **Full (strict)** — a valid
  Let's Encrypt certificate is installed on the origin. Flexible mode causes an infinite
  redirect loop, which is exactly what this domain was doing before the rebuild.
- **Trailing slashes are on.** All internal links need them: `/articles/foo/`, not `/articles/foo`.
- **`out/` and `public/search-index.json` are build artefacts** and are gitignored.
- **`scratch/` is gitignored** — catalogue backups, API task payloads and unused components.
  Nothing there is needed to build, and it should not reach a public repository.
- **Anything that must survive a host change lives in this repo.** The redirect snippets
  currently do not; see URLs and redirects above.
- **The previous site** (an orphaned static export with no source, 143 articles) is archived at
  `/opt/backups/nxtsmarthome.com.au/static-export-archive-20260801.tar.gz` if any of its
  content is ever wanted back.
