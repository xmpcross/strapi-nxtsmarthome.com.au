# nxtsmarthome.com.au — SEO Action Plan

Audit date 6 October 2026 · Health score 67/100 · Detail in `FULL-AUDIT-REPORT.md`.

Deploy code changes with `./deploy.sh` (builds into `.next-build`, then swaps). Content changes go through Strapi. Follow the editorial rules in `CLAUDE.md`: no invented figures, no ratings without testing, and resolve every `[VERIFY]` tag before publishing.

## Phase 1: Critical fixes (week 1)

| # | Sev | Action | Where | Effort |
|---|---|---|---|---|
| 1 | Critical | Remove the `rating` and `price` fields from the homepage "Featured Smart Gear" widget; change "Color" to "Colour" | `components/home/ZairaBottomSections.tsx` | 10 min |
| 2 | High | Stop emitting `aggregateRating`/`review` in Product JSON-LD; keep the visible labelled retailer reviews | `lib/seo.ts` `productJsonLd` | 15 min |
| 3 | High | Remove (or gate behind a genuinely-tested flag) the latent Review branch in `articleJsonLd` | `lib/seo.ts` | 10 min |
| 4 | High | Add outbound regulator links to the electrical-law article and stop stating law as settled (rule 6) | Strapi: `/setup-guides/smart-home-electrical-work-australia-legal/` | 1–2 h + fact-check |
| 5 | High | Add a homepage `<h1>`; demote ad and widget headings | `app/page.tsx` | 15 min |
| 6 | High | Product `image` → `abs()`; emit Offer only for verified product URLs, never search pages; no hard-coded InStock | `lib/seo.ts` | 30 min |
| 7 | Medium | Align the "done or checked by an electrician" wording in the two lighting articles with /about | Strapi: home-cinema-lighting-automation, smart-lighting-scene-ideas | 15 min |

## Phase 2: High-impact improvements (weeks 2–3)

| # | Sev | Action | Effort |
|---|---|---|---|
| 8 | High | Canonicalise in-body links: map category key → URL slug (`lib/site.ts`) at render time or rewrite in Strapi (157 of 192 links redirect). Fix the `//` card URL builder on home and /all-topics | 2–3 h |
| 9 | High | Add 2–4 contextual links into each of the 18 orphan articles; link product-box names to `/products/<slug>/` | 3–4 h |
| 10 | High | Video doorbell guide: add an above-the-fold shortlist of catalogue products with verdicts (`link-products.mjs`), a comparison table and a "no-subscription" angle; same treatment for the robot vacuum guide; fix its read-time | 1 day |
| 11 | High | Security & Cameras hub: curated "Start here" layout, 150–300 word intro, CollectionPage + ItemList schema | 3 h |
| 12 | High | Merge cannibalising pairs (`data/merged-articles.json` + 301): smart-plug savings, camera storage, movie lighting, ducted zoning. Designate `best-smart-home-platform-australia` as the platform hub | 1 day |
| 13 | High | `noindex` `/categories/smart-door-locks/` and drop it from the sitemap until the smart-locks guide is live | 10 min |
| 14 | High | Performance: turn on image optimisation (sharp variants or Cloudflare resizing) with `sizes`; `fetchpriority="high"` on the first image only; `preconnect` to cms.fxnstudio.com; shrink the category-3d PNGs | 1 day |
| 15 | High | Cut render-blocking CSS (purge Tailwind, inline critical CSS); load `ga-init.js` async | 3 h |
| 16 | Medium | Meta: sentence-boundary truncation for category and author descriptions; SEO-title field ≤ 60 characters; descriptions 120–155 characters; brand static-page titles | 1 day |
| 17 | Medium | Dates: "Published … · Updated …" in AU format; bump `dateModified` only for substantive edits; real per-URL sitemap `lastmod`; preserve Strapi `publishedAt` on import | 3 h |

## Phase 3: Content and authority (month 2)

| # | Action |
|---|---|
| 18 | Strengthen the author entity: real credentials, `jobTitle`, `sameAs` (LinkedIn), a dynamic article count (bio says "20+", page lists 83); add a "Reviewed by" line only where a second person genuinely checks |
| 19 | Stagger publishing; stop bulk-stamping publish times |
| 20 | Publish the drafted long-tail articles after resolving their `[VERIFY]` tags: B22 vs E27, the smart-locks guide, renter doorbell / landlord permission, Ring vs Eufy vs Arlo, indoor and outdoor camera guides, then the pillars |
| 21 | Run `link-products.mjs` on the 13 articles with no product box (document the legal/privacy exceptions) |
| 22 | Add a 40–60-word direct-answer block to the ~40 recent articles without one; split sentences over 30 words; add question-form H2s where natural |
| 23 | Add verified-only comparison tables to comparison and buying-guide articles |
| 24 | Organization schema: logo, description, `areaServed: AU`; build real YouTube/LinkedIn profiles; remove the dead social icons and the non-functional newsletter form |
| 25 | Render Read Also, Affiliate Link and Comments as `<aside>` outside the heading outline |
| 26 | Fact-check the "Aqara H1 EU (No Neutral)" listing for AU suitability and RCM before keeping it |
| 27 | Rename "Guides & Reviews" → "Guides & Comparisons" |
| 28 | Earn links with AU-specific assets (renter/strata explainer, ISP-modem 2.4 GHz guide, B22 explainer); genuine answers in OzBargain and Whirlpool threads |

## Phase 4: Monitoring and hardening (ongoing)

| # | Action |
|---|---|
| 29 | Connect Google Search Console and GA4 to the audit tooling (`google_auth.py`) for field Core Web Vitals, indexation and queries; add a Moz key for backlinks |
| 30 | Decide the AI-crawler policy; make Cloudflare AI Crawl Control and `app/robots.ts` agree; consider allowing Amazonbot |
| 31 | Security headers: report-only CSP → enforce; HSTS one year + includeSubDomains (+ preload when ready) |
| 32 | Cache headers: one-year immutable for CMS uploads and `/images/` |
| 33 | Defer and consolidate VigLink/Sovrn/Geniuslink; lazy-load the /all-topics Lottie |
| 34 | Small items: remove the robots.txt `Host:` line, the 404 page's duplicate robots meta and canonical, the duplicate WebSite JSON-LD; add `llms.txt`, `security.txt` and RSS autodiscovery; per-page og:url on /about |
| 35 | Capture a drift baseline (`seo-drift`) after Phase 1 ships, and re-audit in ~6 weeks |
