# nxtsmarthome.com.au

Smart home blog for the Australian market. Next.js static export, Strapi-backed
editorial content, a local product catalogue, nginx hosting, affiliate tracking,
consent handling, analytics and advertising.

The production site is still a flat-file export. There is no Node process in
production, but the build now reads posts, authors, navigation and cover media
from Strapi before writing `out/`.

**Source of truth is split deliberately:**

- Strapi is the source of truth for published posts, author bylines, uploaded post
  covers, the CMS navigation menu and CMS-managed article metadata.
- This repository is the source of truth for the Next.js app, design system,
  product catalogue, affiliate/rendering logic, redirects, nginx config and
  deployment scripts.
- `content/articles/` is retained as history and migration source. The live site
  does not read it.

Editorial rules (what may be claimed, how products are placed) live in
`CLAUDE.md`. Read that before writing content; this file covers the mechanics.

## Quick reference

```bash
cd /opt/projects/nxtsmarthome.com.au
nvm use 22

npm run dev                # local dev on http://localhost:3011
npm run build              # prebuild + Next static export + postbuild injectors
git push origin master      # production: Cloudflare Pages builds and deploys
npm run deploy             # legacy: publish to the /opt nginx copy (no longer serves the site)
npm run deploy:preview     # build/publish preview target
npm run seed:menu          # seed/update Strapi navigation menu
npm run new:article -- "Title" <category> <type> [--author=slug]
```

Node 22 is required (`.nvmrc` pins it). The system Node on the server is v26, so
run `nvm use 22` first.

Always use `npm run build`, never `npx next build`; the npm lifecycle is part of
the product. `prebuild` creates the search index, redirect/header files, nav cache
and author cache. `postbuild` injects the Geniuslink and GA4 scripts into the exported HTML.

## Content source

Published articles come from Strapi via `lib/strapi.ts` and are adapted in
`lib/content.ts` into the same shape the old markdown loader returned. Components
still consume `Article` objects, but the source is now:

```text
Strapi nxtsmarthome-posts  ->  lib/strapi.ts  ->  lib/content.ts  ->  static export
```

The build asks Strapi for `status=published`, populates categories, author,
cover image and FAQ, and appends a per-build cache buster to the CMS query so a
freshly uploaded cover is not hidden by Next's fetch cache.

Uploaded Strapi media wins over `coverImageUrl`. If no CMS image exists, the site
falls back to generated covers under `public/covers/` and square thumbnails under
`public/covers/square/`.

### Writing or editing an article

Use Strapi for live content. Set these fields there:

| CMS field | Site use |
|---|---|
| `title` | Article title, cards and metadata |
| `slug` | Article URL slug |
| `excerpt` | Meta description and card text |
| `content` | Markdown body rendered by the site |
| `postType` | Mapped to the site's article type labels |
| `publishDate` | Primary sort and display date |
| `dateModified` | Optional updated date |
| `categories` | First category maps to the site category key |
| `author` | Byline, resolved against cached authors |
| `coverImage` | Preferred cover image media |
| `coverImageUrl` | Fallback image URL only |
| `coverImageAlt` | Cover alt text fallback |
| `keyTakeaways` | "The short answer" callout |
| `tags` | Related-article scoring and search facets |
| `faq` | FAQ accordion and FAQ structured data |
| `featured` | Home page feature placement |

Strapi and the site use slightly different article type vocabularies. The mapping
lives in `lib/strapi.ts`:

| Strapi `postType` | Site type |
|---|---|
| `how-to-guide` | `how-to` |
| `product-comparison` | `comparison` |
| `product-roundup` | `roundup` |
| `informative` | `explainer` |
| `buying-guide` | `buying-guide` |
| `pillar` | `pillar` |
| `review` | `review` |

`npm run new:article` still scaffolds a markdown file, with optional
`--author=<slug>`, but that file is not published by the site. Treat it as a draft
or migration helper unless you later import it into Strapi.

### Categories

`security`, `lighting`, `energy`, `entertainment`, `climate`,
`hubs-and-platforms`, `robot-vacuums`, `setup-guides`, `buying-guides`

Defined in `lib/site.ts`. Frontend routes, category pages, counts and sitemap
entries use the category metadata there. Strapi categories are matched by slug or
key and translated back to the site category key.

### Products in articles

Products are still referenced inside the markdown body:

```markdown
::product:aqara-hub-m3::
```

`components/ArticleBody.tsx` swaps each marker for a `ProductBox` using the local
catalogue. Every article that recommends products should discuss them genuinely,
with a verdict and a category match. `CLAUDE.md` rule 8 is the authority.

```bash
node scripts/link-products.mjs <slug>            # preview placements
node scripts/link-products.mjs <slug> --write    # apply them to markdown drafts
```

The placement script is useful for markdown drafts and migration work. Live CMS
articles must still be updated in Strapi.

## Product catalogue

```text
public/data/products.json     205 products — the catalogue behind /products/ and ProductBox
content/products/*.md         curated overrides, hand-written
```

Products are sourced through DataForSEO and eBay, enriched with images, reviews
and retailer prices, then pruned. The pipeline lives in `scripts/` and runs
locally, never at build time:

```bash
npm run fetch:products:dry     # what would change
npm run fetch:products         # fetch and write
node scripts/prune-fabricated-products.mjs
node scripts/generate-cover.mjs <slug>     # fal.ai cover art, where available
```

The site itself still builds product pages from `public/data/products.json`, not
from Strapi commerce products.

### Strapi product import

`scripts/strapi-import-products.mjs` imports the local catalogue into shared
Strapi commerce types:

```bash
node --env-file=.env.local scripts/strapi-import-products.mjs --dry-run
node --env-file=.env.local scripts/strapi-import-products.mjs
```

This is a one-way catalogue push. It scopes imported products to the
`nxtsmarthome.com.au` commerce site, matches on product slug plus site, and
suffixes slug collisions rather than overwriting another catalogue's product.
Categories, brands and merchants are shared taxonomy; products and offers are
site-scoped.

## Affiliate, analytics and ads

Outbound merchant links are left as plain retailer URLs: `affiliateUrl()` in
`lib/affiliate.ts` returns them unchanged. `scripts/inject-geniuslink.mjs`
(`postbuild`) then adds the Geniuslink snippet to every exported page, and the
snippet affiliates and localises supported merchants in the browser. Put the raw
merchant URL in a product's `retailers[].url`, and do not paste pre-built
affiliate links into content.

Sovrn, and the per-network IDs for Amazon, eBay, Walmart and CJ, are no longer
used.

Useful environment variables:

```text
NEXT_PUBLIC_GENIUSLINK_TSID               Geniuslink TSID (numeric); unset = no snippet, no affiliation
NEXT_PUBLIC_GENIUSLINK_BASE_URL           default https://buy.geni.us
NEXT_PUBLIC_GENIUSLINK_PRESERVE_EXISTING  keep links that are already affiliated
NEXT_PUBLIC_GA_MEASUREMENT_ID             GA4 ID (also hard-coded in scripts/inject-ga.mjs)
STRAPI_URL                                CMS base URL, defaults in code
STRAPI_TOKEN / STRAPI_API_TOKEN           CMS API token
```

Form mail (the contact service on the server, Pages Functions on Pages):

```text
SMTP_HOST / SMTP_PORT            Stalwart, default mail.fxnstudio.com:465
SMTP_USER / SMTP_PASS            Stalwart account the forms send as (secret)
CONTACT_TO / CONTACT_FROM        recipient / sender (sender defaults to SMTP_USER)
CONTACT_ORIGIN                   CORS origin, default https://nxtsmarthome.com.au
```

Values are read at build time and baked into `out/`, so rebuild after changing
them. On Cloudflare Pages they come from the dashboard, never from `.env.local`.

### Consent and advertising

The cookie banner gates Google Analytics:

- GA4 is injected with Consent Mode v2 defaults set to denied until accepted.
- The Geniuslink snippet is not gated by the banner: it loads on every page.
- AdSense is not gated. Google needs the AdSense tag present for review and ad
  serving, so `/cookies` and the banner copy describe that plainly.

`/cookies` should stay in sync with the actual scripts. It no longer claims that
no analytics is present.

## Structure

```text
app/                         routes (App Router, static export)
  [category]/[slug]/         article template — live article URL
  articles/                  article index, paginated at /articles/page/2/
  categories/[slug]/         category landing pages
  products/[slug]/           product pages, built from the local catalogue
  authors/[slug]/            author pages, cached from Strapi during prebuild
  search/                    client-side search over public/search-index.json
  cookies/                   cookie/ads/analytics disclosure
  about/ contact/            redesigned editorial pages; contact has a form
  sitemap.ts robots.ts       generated at build
components/                  UI, including ArticleBody, ProductBox, CookieBanner
content/
  articles/                  historical markdown and migration drafts, not live
  products/                  curated product overrides
  authors/                   author cache/profiles used by byline resolution
lib/
  strapi.ts                  CMS client for published posts
  content.ts                 article adapter, markdown rendering, related posts
  nav.ts nav-cache.json      CMS-backed navigation cache
  authors.ts                 author loading and byline resolution
  site.ts                    site config + category definitions
  products.ts                catalogue loading; drops ratings from inline boxes
  affiliate.ts               plain retailer URLs; Geniuslink affiliates in the browser
  urls.ts                    canonical path building
  dataforseo.ts              API client for product pipeline
  seo.ts                     JSON-LD builders
scripts/
  build-search-index.mjs     prebuild search index writer
  gen-redirects.mjs          prebuild redirects, headers and nginx map writer
  fetch-nav.mjs              prebuild Strapi navigation cache
  fetch-authors.mjs          prebuild Strapi author cache
  inject-geniuslink.mjs      postbuild Geniuslink snippet injection
  inject-ga.mjs              postbuild GA4 Consent Mode injection
  strapi-import.mjs          old markdown-to-Strapi migration tool, not sync
  strapi-import-products.mjs catalogue-to-Strapi commerce import
  seed-strapi-menu.mjs       Strapi menu seeder
  new-article.mjs            markdown draft scaffolder
  deploy.sh                 production deploy
  deploy-preview.sh         preview deploy
```

## URLs and redirects

Articles live at `/<category-slug>/<article-slug>/`. The site category key can
be different from the URL slug; `lib/site.ts` holds the mapping.

Legacy article URLs used `/articles/<slug>/`. A static export cannot redirect by
itself, so `scripts/gen-redirects.mjs` writes all host formats on `prebuild`:

```text
public/_redirects        Cloudflare Pages / Workers / Netlify format
public/_headers          security and cache headers for the same hosts
public/_redirects.map    the same 301s as an nginx map
```

All three ship inside `out/`, so they land in the web root with the pages. The
nginx vhost includes `_redirects.map` from the web root, which keeps redirect
rules in the repository and portable across hosts.

Trailing slashes are canonical. Internal links should use `/articles/foo/`, not
`/articles/foo`.

## Deployment

**Production is Cloudflare Pages (since 24 Sep 2026).** A push to `master`
builds and deploys the site; work on `master` only. Strapi content appears after
the next build. See [`CLOUDFLARE_PAGES.md`](CLOUDFLARE_PAGES.md).

The sections below describe the previous self-hosted setup on **178.105.206.112**
(nginx serving `/var/www/html/nxtsmarthome.com.au`). It is kept for fallback and
is due to be retired.

```bash
npm run deploy                             # build and publish on this machine
DEPLOY_HOST=root@host npm run deploy       # build here, publish to another server over ssh
```

`scripts/deploy.sh` builds, refuses to continue without `out/index.html` and
`out/_redirects.map`, tars the current web root into
`/opt/backups/nxtsmarthome.com.au` on the target (keeping five), rsyncs `out/`
with `--delete`, fixes ownership, runs `nginx -t` before reloading, and submits
changed URLs to IndexNow.

That output check matters: a bare `npm run build && rsync` can republish the
previous build if the export failed or did not produce the files expected.

### Contact and comment forms

The contact form posts to `/api/contact`, and article comments post to
`/api/comment`. On the server, nginx proxies both paths to
`nxtsmarthome-contact.service` (`/opt/nxtsmarthome-contact/server.mjs`,
`127.0.0.1:4320`). The service is not in this repo, and its settings are in
`/opt/nxtsmarthome-contact/.env`.

Mail goes through the FXN **Stalwart** server (`mail.fxnstudio.com:465`) using
`SMTP_USER` / `SMTP_PASS`. Brevo was removed on 24 Sep 2026. Stalwart rejects a
sender the account does not own, so `CONTACT_FROM` defaults to `SMTP_USER`.
Messages go to `CONTACT_TO` (default `hello@nxtsmarthome.com.au`), with Reply-To
set to the reader.

Checks:
- A honeypot field (`company`) catches bots.
- A submission sent less than 2 seconds after the form loaded is dropped.
- Bot submissions get a 200 response, so a bot learns nothing.
- Each IP address can send 5 messages per 10 minutes.

When delivery fails, the reader gets a 502 that asks them to email
`CONTACT_TO` directly. Check with
`journalctl -u nxtsmarthome-contact -n 20`.

For mail sent through Stalwart to pass SPF and DKIM, the domain's DNS needs
`ip4:51.161.208.188` in SPF and Stalwart's DKIM records. MX stays on Google.

### Cloudflare Pages (production since 24 Sep 2026)

Pages builds `master` on every push, so work on `master` only. Strapi changes
appear after the next build. The repo's Pages pieces:
- `functions/api/contact.js` and `functions/api/comment.js` do the service's job
  with the same checks, sending with `worker-mailer`.
- `scripts/pages-build.sh` is the build command. It refuses to run without the
  Strapi and affiliate variables, and refuses to publish an incomplete export.

Settings, variables and the switch-over steps are in
[`CLOUDFLARE_PAGES.md`](CLOUDFLARE_PAGES.md). Keep
`functions/_lib/mail-form.js` and the server's `server.mjs` in step.

### The web server

nginx config lives in `deploy/nginx/`, and `scripts/setup-web-server.sh` installs
it. On a bare Ubuntu host it also installs nginx and certbot. Both are idempotent,
so the script is also how a config change reaches the server:

```bash
bash scripts/setup-web-server.sh                  # this machine
bash scripts/setup-web-server.sh root@1.2.3.4     # a new one
```

| Installed path | Purpose |
| --- | --- |
| `/etc/nginx/sites-available/nxtsmarthome.com.au` | vhost — server names, TLS, redirect maps |
| `/etc/nginx/snippets/nxtsmarthome-site.conf` | serving rules shared by HTTP and HTTPS blocks |
| `/etc/nginx/conf.d/00-map-hash.conf` | bigger map hash buckets; must parse before any `map` |
| `/etc/nginx/conf.d/10-gzip.conf` | compression beyond Ubuntu's HTML default |
| `/etc/nginx/conf.d/20-cloudflare-real-ip.conf` | restores visitor IPs from Cloudflare headers |
| `/var/www/certbot-webroot` | ACME challenges, outside the deploy-deleted site tree |

### TLS and Cloudflare

The certificate is Let's Encrypt, covering the apex and `www`, issued and
renewed through the webroot at `/var/www/certbot-webroot` by certbot's own timer:

```bash
certbot certonly --webroot -w /var/www/certbot-webroot \
  -d nxtsmarthome.com.au -d www.nxtsmarthome.com.au
certbot renew --dry-run          # check renewal still works
```

That webroot deliberately sits outside the site tree because deploy rsyncs with
`--delete` and would otherwise wipe a challenge mid-renewal. The ACME location is
also matched before the HTTP-to-HTTPS redirect, so validation over plain HTTP
works.

Cloudflare proxies the domain:

- SSL/TLS mode must be **Full (strict)**. Flexible creates redirect loops, and
  without a valid origin certificate Full (strict) yields a 521.
- A deploy does not clear the edge. Purge the Cloudflare cache, or visitors can
  keep seeing the previous build.

Two details in the serving config are load-bearing:

- `try_files` ends in `=404`, never `/404.html`; the latter serves the error page
  with a 200 status and creates soft 404s.
- Requests without a trailing slash get a 301 because `trailingSlash: true` makes
  the slashed form canonical.

## Things worth knowing

- `master` now includes the Strapi-driven content work merged in PR #4 on
  2026-08-23. Before that merge, rebuilding from `master` would not match what
  was deployed.
- Hosting history: Cloudflare Workers/Pages, then nginx on /opt from 23 Aug 2026,
  and Cloudflare Pages again from 24 Sep 2026. See
  [`CLOUDFLARE_PAGES.md`](CLOUDFLARE_PAGES.md).
- The contact and comment forms post to `/api/contact` and `/api/comment`. On
  the server, nginx proxies these to `nxtsmarthome-contact.service`
  (`/opt/nxtsmarthome-contact`); on Pages, `functions/api/` handles them. Both
  send through Stalwart SMTP (`mail.fxnstudio.com`). Brevo was removed on
  24 Sep 2026.
- `content/articles/` is not the live article store. Update Strapi for published
  content.
- `out/`, `public/search-index.json`, `public/_redirects`, `public/_headers` and
  `public/_redirects.map` are build artefacts and are gitignored.
- `scratch/` is gitignored; catalogue backups, API task payloads and unused
  components there should not reach the public repository.
- Anything that must survive a host change belongs in this repo, including
  redirect and header rules in all supported host formats.
- The previous site, an orphaned static export with no source, is archived at
  `/opt/backups/nxtsmarthome.com.au/static-export-archive-20260801.tar.gz` if
  any of its content is ever wanted back.
