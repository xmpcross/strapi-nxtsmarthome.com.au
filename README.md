# nxtsmarthome.com.au

Smart home blog for the Australian market. Next.js static export, markdown content, nginx.

**This directory is the source of truth.** Nothing auto-deploys — you build and publish manually.

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
| `products` | no | Renders buy boxes with affiliate links. See below. |
| `image` / `imageAlt` | no | Card and OG image. Path under `public/`. |

### Products and affiliate links

Products go in frontmatter, not inline markdown:

```yaml
products:
  - name: 'Video Doorbell 4'
    brand: 'Example'
    bestFor: 'Wired installs with an existing chime'
    rating: 4.5
    pros:
      - 'Local storage, no subscription required'
    cons:
      - 'Needs an existing transformer'
    retailers:
      - name: 'JB Hi-Fi'
        url: 'https://www.jbhifi.com.au/products/example'
        price: 'A$249'
```

Put the **raw merchant URL** in `url`. The affiliate wrapper is applied at render time by
`lib/affiliate.ts`, which also attaches the article slug as a subID so you can attribute
clicks per article. Never paste pre-built affiliate links into content — that bypasses the
tracking layer and makes network changes a find-and-replace job across every article.

## Affiliate configuration

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
app/                    routes (App Router, static export)
  articles/[slug]/      article template
  categories/[slug]/    category landing pages
  sitemap.ts robots.ts  generated at build
components/             UI — AffiliateLink and ProductBox are the commercial path
content/articles/       the blog, one markdown file per post
lib/
  site.ts               site config + category definitions
  content.ts            markdown loading, parsing, related posts
  affiliate.ts          network URL builders — single place to change tracking
  seo.ts                JSON-LD builders
scripts/
  build-search-index.mjs  runs on prebuild, writes public/search-index.json
  new-article.mjs         article scaffolder
  deploy.sh               build + publish
```

## Deployment

```bash
npm run deploy
```

Builds, backs up the current web root to `/opt/backups/nxtsmarthome.com.au/`, rsyncs
`out/` to `/var/www/html/nxtsmarthome.com.au/`, fixes ownership, and reloads nginx.
It refuses to deploy if the build produced no `out/index.html`.

nginx config: `/etc/nginx/sites-available/nxtsmarthome.com.au`

## Things worth knowing

- **Cloudflare sits in front of this domain.** SSL/TLS mode must be **Full (strict)** — a valid
  Let's Encrypt certificate is installed on the origin. Flexible mode causes an infinite
  redirect loop, which is exactly what this domain was doing before the rebuild.
- **Trailing slashes are on.** All internal links need them: `/articles/foo/`, not `/articles/foo`.
- **`out/` and `public/search-index.json` are build artefacts** and are gitignored.
- **The previous site** (an orphaned static export with no source, 143 articles) is archived at
  `/opt/backups/nxtsmarthome.com.au/static-export-archive-20260801.tar.gz` if any of its
  content is ever wanted back.
