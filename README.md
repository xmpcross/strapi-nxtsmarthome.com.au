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
npm run deploy             # build here, publish to the web server, reload its nginx
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
redirect by itself**, so the 301s come from the host. `scripts/gen-redirects.mjs` writes all
three formats on `prebuild`, from the same rules:

```text
public/_redirects        Cloudflare Pages / Workers / Netlify format
public/_headers          security and cache headers for the same hosts
public/_redirects.map    the same 301s as an nginx map
```

All three ship inside `out/`, so they land in the web root with the pages. The vhost
includes `_redirects.map` straight from there — the rules stay in the repository and
travel with a host change. They used to live in `/etc/nginx/snippets` instead, and when
the site moved to Cloudflare all 259 of them silently became 404s until they were ported.

## Deployment

Self-hosted on **178.105.206.112**, which both builds the site and serves it — from
nginx, out of `/var/www/html/nxtsmarthome.com.au`. No node process runs in production;
it is flat files behind Cloudflare.

```bash
npm run deploy                             # build and publish on this machine
DEPLOY_HOST=root@host npm run deploy       # build here, publish to another server over ssh
```

`scripts/deploy.sh` builds, refuses to continue without `out/index.html` and
`out/_redirects.map`, tars the current web root into `/opt/backups/nxtsmarthome.com.au`
on the target (keeping five), rsyncs `out/` with `--delete`, fixes ownership, runs
`nginx -t` before reloading, and submits the changed URLs to IndexNow.

### The web server

Its nginx config lives in `deploy/nginx/`, and `scripts/setup-web-server.sh` installs it —
on a bare Ubuntu host it also installs nginx and certbot. Both are idempotent, so the
script is also how a config change reaches the server:

```bash
bash scripts/setup-web-server.sh                  # this machine
bash scripts/setup-web-server.sh root@1.2.3.4     # a new one
```

| Installed path | Purpose |
| --- | --- |
| `/etc/nginx/sites-available/nxtsmarthome.com.au` | vhost — server names, TLS, redirect maps |
| `/etc/nginx/snippets/nxtsmarthome-site.conf` | the serving rules, shared by the HTTP and HTTPS blocks |
| `/etc/nginx/conf.d/00-map-hash.conf` | bigger map hash buckets; must parse before any `map` |
| `/etc/nginx/conf.d/10-gzip.conf` | Ubuntu compresses only HTML by default |
| `/var/www/certbot-webroot` | ACME challenges, so renewal never touches the site tree |

### TLS and Cloudflare

The certificate is Let's Encrypt, covering the apex and `www`, issued and renewed
through the webroot at `/var/www/certbot-webroot` by certbot's own timer:

```bash
certbot certonly --webroot -w /var/www/certbot-webroot \
  -d nxtsmarthome.com.au -d www.nxtsmarthome.com.au
certbot renew --dry-run          # check renewal still works
```

That webroot deliberately sits **outside** the site tree, because the deploy rsyncs
with `--delete` and would otherwise wipe a challenge mid-renewal. The ACME location
is also matched before the HTTP→HTTPS redirect, so validation over plain HTTP works.

Cloudflare proxies the domain. Two things follow from that:

- **SSL/TLS mode must be Full (strict).** Flexible produces the redirect loop this
  domain has hit before, and with no origin certificate Full (strict) yields a 521.
- **A deploy does not clear the edge.** Purge the Cloudflare cache, or visitors keep
  seeing the previous build.

`conf.d/20-cloudflare-real-ip.conf` maps Cloudflare's ranges back to the real client
address, so the access log shows visitors instead of the CDN.

Two details in the serving config are load-bearing:

- **`try_files` ends in `=404`**, never `/404.html` — the latter serves the error page
  with a 200 status, a soft 404 that search engines index. This bit the site once.
- **Requests without a trailing slash get a 301**, not the page, because
  `trailingSlash: true` makes the slashed form canonical. One URL per page.

### Environment variables

Read from `.env.local` at **build** time and inlined into the HTML, so a change
means a rebuild:

```text
NEXT_PUBLIC_SOVRN_KEY            affiliate monetisation
NEXT_PUBLIC_GA_MEASUREMENT_ID    analytics
```

Both fail quietly when unset — the build succeeds and the script simply is not
there. `npm run build` says which it injected; worth checking a deployed page
rather than trusting the log.

`.env.local` is gitignored, so it exists only on this box. Building anywhere else
without copying it first yields a site with no analytics and no monetisation.

### Building

Always `npm run build`, never `npx next build` — the latter skips the npm lifecycle,
and both halves matter:

- `prebuild` writes `public/search-index.json` (gitignored, so it exists only if
  generated) and `public/_redirects`, `public/_headers`, `public/_redirects.map`
- `postbuild` injects the Sovrn and GA4 snippets into the exported HTML

Skipping them yields a green build with no search, no redirects, no security
headers and no analytics — all silently.

## Things worth knowing

- **The site is served from 178.105.206.112**, not from this box and not from Cloudflare.
  It ran on Cloudflare Workers through August 2026 and moved back to nginx after; the
  Worker and its `wrangler.jsonc` are kept only as a fallback host.
- **Trailing slashes are on.** All internal links need them: `/articles/foo/`, not `/articles/foo`.
- **`out/` and `public/search-index.json` are build artefacts** and are gitignored.
- **`scratch/` is gitignored** — catalogue backups, API task payloads and unused components.
  Nothing there is needed to build, and it should not reach a public repository.
- **Anything that must survive a host change lives in this repo** — including the redirect
  and header rules, in all three host formats; see URLs and redirects above.
- **The previous site** (an orphaned static export with no source, 143 articles) is archived at
  `/opt/backups/nxtsmarthome.com.au/static-export-archive-20260801.tar.gz` if any of its
  content is ever wanted back.
