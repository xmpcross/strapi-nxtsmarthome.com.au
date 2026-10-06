# Technical SEO audit: nxtsmarthome.com.au (6 Oct 2026)

**Technical score: 80/100.** Crawled all 117 sitemap URLs (4 concurrent) plus about 40 probe URLs. Evidence only.

| Category | Status |
|---|---|
| Crawlability | Pass |
| Indexability | Pass, with minor issues |
| Security | Partial |
| URL structure and redirects | Pass, with internal-link redirect hops |
| Mobile | Pass |
| Core Web Vitals (source inspection) | Pass |
| Structured data | Pass |
| JS rendering | Pass (SSR/ISR) |
| IndexNow | Not implemented (Low) |

## What works
- All 117 sitemap URLs return HTTP 200. None is noindex. Every canonical is self-referencing and absolute, so no sitemap URL is blocked by the editorial guard.
- sitemap.xml is valid (`sitemap_discovery.py` reports `valid: true`, kind urlset). robots.txt declares it. The sitemap omits /search/, /preview/ and /articles/page/N/ on purpose (app/sitemap.ts).
- Redirects:
  - http to https: one hop, 301.
  - www to apex: one hop, 301.
  - No trailing slash gets a 308 to the trailing-slash URL. `//` collapses to `/`.
  - Uppercase paths return 404.
- Content is server-rendered. The raw HTML of / has about 1,160 visible words, and `<html lang="en-AU">`, viewport meta, og:*, twitter:* and a canonical are present. No SPA shell.
- The 404 page returns a real 404 status with `noindex`.
- /search/ is noindex,follow and canonicalised to /search/ (including `?q=`). `?utm=` and `?page=` variants canonicalise to the clean URL.
- Product pages with no verdict are noindex (6 of the 13 linked from /products/ were noindex in a spot check) and left out of the sitemap.
- JSON-LD is present on all 117 pages. Articles carry Article, BreadcrumbList, FAQPage, Person and Organization. The homepage has WebSite+SearchAction and CollectionPage.
- Brotli is on. Static assets are `max-age=31536000, immutable`. The article hero image is preloaded with fetchPriority and has explicit width/height.
- Pagination: /articles/page/N/ has a self-canonical and rel=next. /categories/*/page/2/ is noindex,follow.
- Some security headers are in place: nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy.

## Findings

### Medium
1. **No Content-Security-Policy header.** `curl -sI https://nxtsmarthome.com.au/` returns no `content-security-policy`.
   - Fix: add a report-only CSP in nginx or `next.config.mjs` headers(). Allow self, cms.fxnstudio.com for images, and the AdSense/analytics origins. Tighten it after a week of reports.
2. **HSTS is weak.** The header is `max-age=15768000` (about 6 months), with no `includeSubDomains` or `preload` (/etc/nginx/sites-enabled/*nxtsmarthome*:54).
   - Fix: use `max-age=31536000; includeSubDomains; preload`. First confirm every subdomain is HTTPS-only, then submit to hstspreload.org.
3. **Internal links in article bodies use legacy URLs.** These cost 1 to 2 redirect hops each. Examples: `/climate/best-smart-fans-australia` goes 308 to `/climate/best-smart-fans-australia/`, then to `/climate-and-comfort/best-smart-fans-australia/` (hops=2). Other legacy prefixes are `/energy/`, `/entertainment/`, and `/buying-guides/...` with no trailing slash. They appear on at least 8 sitemap articles, for example /energy-and-solar/amber-electric-smart-home-automation/ and /entertainment-and-audio/echo-show-vs-nest-hub/. Link counts were 3 to 5 per page, and the raw-href crawl found 640 unique internal links.
   - Fix: rewrite the links in `content/articles/*.md` and the Strapi posts to the canonical `/<category-slug>/<slug>/` form. Alternatively, rewrite them at render time using `articleHref`.
4. **Homepage has no `<h1>`.** I counted 0 `<h1` tags on / (every other page has exactly 1), and the first headings are h2 article cards.
   - Fix: add one visible or sr-only `<h1>` carrying the primary topic, for example "Smart home guides for Australian homes".
5. **Sitemap lastmod is not truthful.** 25 URLs share `2026-10-05T21:34:04.713Z`, which is the newest article date or build time, and 11 share `2026-08-01T00:00:00.000Z` (app/sitemap.ts, `lastModified: newest`). Static, category and hub pages all get the same stamp, and `changefreq`/`priority` are ignored by Google.
   - Fix: use a real per-page modified date. Drop `changefreq` and `priority`.

### Low
6. **Meta descriptions run long.** About 100 of 117 pages have a description over 160 characters (the check was approximate and includes entity encoding). Product pages reach 384 to 434 characters (for example /products/tp-link-tapo-p110-smart-plug-with-energy-monitoring/ at 434). They will be truncated or rewritten.
   - Fix: trim to about 150 to 155 characters in the metadata generator.
7. **Title tag lengths.**
   - Several pages are too short and have no brand suffix: /about/ ("About"), /contact/ ("Contact"), /sitemap/, /articles/ ("All Articles"), /privacy/.
   - A few article titles run to 76 to 95 characters, for example /setup-guides/home-assistant-energy-dashboard-solar-export-time-of-use-tariffs/ at 95. Aim for 60 or fewer.
8. **robots.txt has the non-standard `Host:` line** (from `host: site.url` in app/robots.ts). It is a Yandex-only directive that is now deprecated, and Google ignores it. Harmless, but Search Console or validators may flag it.
   - Fix: remove `host:` from app/robots.ts.
9. **The 404 page has duplicate robots meta tags and a canonical to `/`.** `/nope/` outputs `noindex` and also `index, follow` (and `/index.html` shows a canonical of `/`). The 404 status keeps it out of the index, but the markup is contradictory.
   - Fix: stop the root layout metadata leaking into not-found.tsx. Remove the canonical there.
10. **No `hreflang`.** Only `lang="en-AU"` and `og:locale en_AU` are set. That is acceptable for a single-market site. Optionally add `alternates.languages {'en-AU': ...}` and `x-default`.
11. **Large HTML payloads.** The homepage is 552 KB and /products/ is 623 KB. Articles are about 320 KB. The raw HTML carries a large RSC flight payload with duplicated data (/authors/kritin-curtis/ is 604 KB). Brotli helps, but it is worth watching for INP and TTFB.
    - Fix: pass fewer props to client components and paginate the long listings.
12. **No `/llms.txt` or `/.well-known/security.txt`** (both 404), and no IndexNow key. All optional.
13. **Homepage JSON-LD contains 9 `Thing` entries and 2 `WebSite` blocks.** These are likely duplicates (the layout and the page both emit WebSite). Merge them. The SearchAction targets /search/?q=, which is noindex and disallowed in robots.txt. That is harmless, but Google has retired the sitelinks search box.
14. **FAQPage schema on articles.** Google restricts FAQ rich results to authoritative government and health sites, so there is no rich-result benefit. Keep it only if the FAQ text is visible on the page.

### Not observed
- Redirect chains from http or www (single hop).
- Orphan sitemap URLs (every URL is linked from at least one crawled page).
- Duplicate titles (0 among the 117).
- Missing meta descriptions (0).
- Critical or High issues.

## Notes
- /products/ and /categories/<slug>/ are different surfaces, not duplicates. Product category pages live at /products/category/<slug>/ and only /products/category/energy-and-solar/ is in the sitemap (the app requires 3 or more indexable products). /categories/ holds article listings.
- The sitemap lists only 10 product pages, against 252 products in public/data/products.json. This is intentional (indexability filter, AdSense clean-up), and 6 removed products redirect to a category.
