# nxtsmarthome.com.au — Full SEO Audit

**Date:** 6 October 2026  
**Scope:** all 117 sitemap URLs crawled live (83 articles, 10 categories, 10 product pages, 2 product hubs, 11 static/trust pages, 1 author), plus ~40 probe URLs, Lighthouse lab runs, SERP sampling and source inspection of `/opt/projects/nxtsmarthome.com.au`.  
**Previous audit:** 4 August 2026 (Notion, "SEO / GEO / AEO Audit Report").  
**Business type:** independent Australian smart-home publisher, affiliate-funded (Amazon AU, JB Hi-Fi, The Good Guys, Bunnings and others). Content is served from Strapi; the 48 files in `content/articles/` are legacy drafts.

## SEO Health Score: 67 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 80 | 17.6 |
| Content Quality | 23% | 64 | 14.7 |
| On-Page SEO | 20% | 61 | 12.2 |
| Schema / Structured Data | 10% | 66 | 6.6 |
| Performance (CWV, lab) | 10% | 74 | 7.4 |
| AI Search Readiness | 10% | 58 | 5.8 |
| Images | 5% | 58 | 2.9 |
| **Total** | | | **67** |

Schema was scored 72 by the specialist pass, then lowered to 66 after cross-checking found `AggregateRating` built from syndicated retailer reviews on two product pages, which the sampled schema pass missed.

Data limits: no Google Search Console, GA4, CrUX, Moz or keyword-volume data was available. Performance numbers are Lighthouse lab runs, not field data. SERP checks used a US-based search index, not true google.com.au. No search volumes are stated anywhere in this report.

---

## Executive summary

The foundation is now solid. Every sitemap URL returns 200 with a self-referencing canonical. The site is server-rendered, carries `lang="en-AU"`, and emits Article, BreadcrumbList, FAQPage, Product, Person and Organization JSON-LD. The www/apex split that was the top problem in August is fixed. The trust pages (/about, /how-we-test, /affiliate-disclosure) are unusually honest: they say plainly that the guides are research-based, not bench-tested, and that drafting is AI-assisted.

The biggest problems now are about **consistency with that honesty**, plus **internal linking** and **page type**:

1. The homepage "Featured Smart Gear" widget shows hardcoded star ratings and fixed AUD prices. That directly contradicts /about and /how-we-test ("you will not find star ratings… anywhere") and breaks editorial rule 5.
2. Two product pages emit `AggregateRating` in their structured data, built from reviews copied from retailer sites. Google's review-snippet policy does not allow this, so it is a manual-action risk.
3. 82% of in-article links (157 of 192) point at category-*key* paths (`/security/…`, `/energy/…`) and go through a 308 redirect. 18 articles receive no contextual links at all.
4. Money pages explain *how to choose* while Google ranks pages that *name products*. The video doorbell buying guide has no product boxes.
5. The publishing pattern and the author entity look like scaled output: 83 articles from one thinly described author, including 18 published within 4 minutes on 23 August. The bio says "more than 20 guides".

## Top 5 critical / high issues

| # | Severity | Issue | Where |
|---|---|---|---|
| 1 | Critical | Hardcoded star ratings (4.7–5.0 ★) and AUD prices on the homepage contradict the site's own no-ratings policy | `components/home/ZairaBottomSections.tsx` lines 50–100 |
| 2 | High | `AggregateRating` built from syndicated retailer reviews in Product JSON-LD | `/products/bose-smart-soundbar-ultra/` (3.87/30), `/products/ecovacs-deebot-x2-omni-square-robot-vacuum/` (3.3/23) |
| 3 | High | 157 of 192 in-body article links go through a 308 redirect; 18 articles have no inbound contextual links; homepage cards emit `//` URLs | Strapi article bodies; homepage and /all-topics card builder |
| 4 | High | Video doorbell guide has 0 product boxes against a SERP that is ~80% named-product roundups; the robot vacuum guide shows the same pattern | `/security-and-cameras/video-doorbell-buying-guide-australia/`, `/robot-vacuums/robot-vacuum-buying-guide-australia/` |
| 5 | High | The electrical-law article states law as settled with 0 outbound sources (rule 6) | `/setup-guides/smart-home-electrical-work-australia-legal/` |

## Top 5 quick wins

| # | Fix | Effort |
|---|---|---|
| 1 | Delete `rating` and `price` from the homepage gear widget, and change "Color" to "Colour" | 10 min |
| 2 | Stop emitting `aggregateRating`/`review` in `productJsonLd` (keep the visible, labelled retailer reviews) | 15 min |
| 3 | Add one homepage `<h1>` ("Smart home guides for Australian homes") | 5 min |
| 4 | Truncate category and author meta descriptions at a word or sentence boundary, not byte 160 | 15 min |
| 5 | Wrap the Product `image` in `abs()`, add `fetchpriority="high"` to the first hero/card image, remove the `Host:` line from `app/robots.ts` | 20 min |

---

## Progress since the 4 August 2026 audit

| August finding | Status 6 Oct |
|---|---|
| www host served an abandoned Gatsby site | **Fixed:** www and http each 301 to the apex in one hop |
| Comments developer placeholder on every article | **Fixed:** no `NEXT_PUBLIC_COMMENTS` text live |
| No structured data | **Fixed:** Article, BreadcrumbList, FAQPage, Product, Person, Organization, WebSite |
| Empty alt text on ~100 images | **Fixed:** 0 missing alt; only decorative icons and avatars use empty alt |
| og:image identical on every page | **Fixed on articles** (cover image); /about still has og:url pointing at the homepage |
| Anonymous "NXT Smart Home" byline | **Partly fixed:** named author with a Person page, but no credentials, `sameAs` or job title |
| No outbound citations | **Mostly fixed:** up to 17 per article, .gov.au regulators cited; the electrical-law article still has 0 |
| Site promised reviews and 1–5 ratings it never published | **Fixed on trust pages** (now research-based), but "Guides & Reviews" labels and the homepage star widget remain |
| Category descriptions truncated mid-word | **Not fixed:** all 10 categories and the author page are cut at byte 160 |
| Published/displayed dates disagree | **Not fixed:** the visible date is an unlabelled modified date, bulk-stamped (52 articles show 24 Sep 2026), in US format |
| Contact email obfuscated by Cloudflare | **Not fixed** |
| Affiliate links need `rel=sponsored` | **Fixed:** `sponsored nofollow noopener noreferrer` |
| Thin single-article categories | **Improved:** 83 articles now; `/categories/smart-door-locks/` is indexed with 0 articles |

---

## 1. Technical SEO — 80 / 100

**What works**
- All 117 sitemap URLs return 200, are `index, follow`, and have absolute self-canonicals. No URL is blocked by the editorial guard.
- Single-hop redirects: http→https and www→apex (301); a missing trailing slash gets a 308.
- Content is server-rendered with complete article text in the raw HTML. Viewport, `lang="en-AU"`, og/twitter tags and canonical are present.
- `/search/` is noindex and canonicalised; query-string variants canonicalise to the clean URL; product pages with no verdict are noindex and kept out of the sitemap; paginated category pages are noindex,follow.
- Brotli is enabled, `_next/static` assets are immutable for a year, and nosniff, X-Frame-Options, Referrer-Policy and Permissions-Policy headers are set. Server response time is about 50 ms.
- IndexNow is wired (`scripts/submit-indexnow.mjs`), and `/feed.xml` is live.

**Findings**

| Sev | Finding | Fix |
|---|---|---|
| Medium | Legacy internal link paths cost 1–2 redirect hops each (e.g. `/climate/best-smart-fans-australia` → 308 → `/climate-and-comfort/…`) | Rewrite links in Strapi bodies to `/<category-slug>/<slug>/`, or normalise at render time via `lib/site.ts` |
| Medium | Homepage has no `<h1>` (every other page has exactly one) | Add a single H1 |
| Medium | Sitemap `lastmod` is not truthful: 25 URLs share `2026-10-05T21:34:04Z`, 11 share `2026-08-01` (`app/sitemap.ts`, `lastModified: newest`) | Use real per-page modified dates; drop `changefreq`/`priority` |
| Medium | No Content-Security-Policy header | Ship a report-only CSP (self, cms.fxnstudio.com, analytics/affiliate origins), then enforce |
| Medium | HSTS `max-age=15768000` (~6 months), no `includeSubDomains`/`preload` (nginx vhost line 54) | `max-age=31536000; includeSubDomains; preload` once every subdomain is HTTPS-only |
| Low | 404 page emits both `noindex` and `index, follow` plus a canonical to `/` | Stop root metadata leaking into `not-found.tsx` |
| Low | Non-standard `Host:` line in robots.txt (`host:` in `app/robots.ts`) | Remove |
| Low | Heavy HTML: home 552 KB, /products/ 623 KB, author page 604 KB (mostly RSC payload) | Pass fewer props to client components; paginate long listings |
| Low | Homepage JSON-LD has 2 WebSite blocks and 9 `Thing` entries | Emit WebSite once (layout only) |
| Low | No `llms.txt` or `security.txt`; RSS feed not linked in `<head>` | Add static files; add `alternates.types` for the feed |

## 2. Content Quality — 64 / 100

E-E-A-T 54 (Experience 35, Expertise 60, Authoritativeness 45, Trust 70) · AU localisation 90 · Readability 62.

**What works**
- The trust pages are specific and honest: research-based not bench-tested, AI drafting disclosed, corrections policy, publisher named (FXN Holdings Limited).
- No `[VERIFY]`, TODO, TBD or lorem text on any of the 117 live pages. No "we tested" claims in article bodies, and inline product boxes carry no stars.
- Strong AU sourcing: AS/NZS 3000 and 6059, the Privacy Act, NSW Government guidance, dated and attributed retailer prices. Spelling is Australian throughout the prose.
- Product-page retailer reviews are clearly labelled as not NXT's own and only show with 20 or more reviews.

**Findings**

| Sev | Finding | Evidence | Fix |
|---|---|---|---|
| Critical | Homepage gear widget shows star ratings and fixed prices, contradicting /about and /how-we-test and breaking rule 5 | "SMART LOCKS $297 AUD ★ 4.8 … Aqara A100"; `ZairaBottomSections.tsx` | Remove `rating` and `price`, or render live catalogue data with a dated price and no stars |
| High | Scaled-publishing pattern and a thin author entity | 18 articles published 23 Aug 00:41–00:45Z; 15 on 24 Sep at ~2 min intervals; all 83 by one author whose bio says "more than 20 guides" | Real credentials and `sameAs` on the author; a dynamic article count; a "Reviewed by" line where a second person genuinely checks; stagger releases |
| High | Cannibalising pairs | Smart plugs save money (2 URLs); camera storage cloud vs local (2); movie/cinema lighting (2); ducted zoning (2); neutral-wire switches; platform-choice cluster (4) | Merge the duplicate pairs (`data/merged-articles.json` + 301); designate hubs |
| High | Promised topics return 404; empty category indexed | B22 vs E27 (promised on /about and /categories/lighting/), smart-locks guide, home-security pillar all 404; `/categories/smart-door-locks/` has 0 articles | Resolve `[VERIFY]` tags and publish; noindex the empty category until then |
| Medium | 13 articles have no inline product box; 2 have only one (rule 8 gap) | incl. the video doorbell buying guide | `node scripts/link-products.mjs <slug>` → review → `--write`; document the legal/privacy exceptions |
| Medium | Safety wording conflicts with the site's own position | Two lighting articles say wiring should be "done or checked" by a licensed electrician | Align with /about ("must be carried out") or point readers to the state regulator |
| Medium | Readability drop in the 24 Sep – 5 Oct batch | Average sentence 30 words vs 18 earlier; Flesch 44 vs 57; most lack the "short answer" box (44 of 83 have it) | Split sentences over 30 words; put the short-answer block in the template |
| Medium | Dates bulk-stamped, unlabelled, US format | 52 articles show "September 24, 2026"; the Matter explainer is published 14 Jan but shows "August 1, 2026" | "Published 14 January 2026 · Updated …"; bump only on substantive edits |
| Medium | Product needing human fact-check | "Aqara Smart Light Switch H1 **EU** (No Neutral)" is featured for Australian walls | Confirm AU suitability/RCM against the manufacturer listing before keeping it |
| Low | Theme filler | "Editors Choice" (no apostrophe) is just the latest posts; the newsletter form does nothing; Twitter/Instagram/YouTube/LinkedIn/Pinterest icons link to `#`; raw ISO timestamps are printed | Remove or wire up |
| Low | "Guides & Reviews" labels while /how-we-test says no reviews are published | Category titles, /all-topics H1 | "Guides & Comparisons" |

## 3. On-Page SEO — 61 / 100

**What works:** exactly one H1 on every page except the homepage, H1 matches `<title>` on all articles, no missing or duplicate titles or descriptions, no templated metadata (`site_risk: low`), clean H2/H3 nesting inside article bodies.

| Sev | Finding | Fix |
|---|---|---|
| High | 82% of in-body links are non-canonical (see Technical); 18 articles get 0 contextual links and 29 link to no other article; product boxes never link to on-site `/products/<slug>/` pages | Canonicalise links; add 2–4 cluster links into each orphan; link product-box names to product pages |
| High | Homepage has no H1; ad headings ("Upgrade Your Living Space with Amazon Smart Tech") sit in the outline | One H1; demote widget and ad headings |
| Medium | 44 of 83 article titles are over 60 characters, 19 over 70 (max 95) | Separate SEO-title field of 60 characters or fewer; keep long H1s |
| Medium | 84 of 117 descriptions exceed 160 characters (articles up to 298, products up to 434); categories and the author page are hard-cut mid-word ("…full alarm sy") | Purpose-written 120–155 character descriptions; truncate at a word boundary |
| Medium | `/articles/` shows 6 posts per page across 14 pages | 24–30 per page; lean on category hubs |
| Low | Bare, brandless static titles: "About", "Contact", "Sitemap", "All Articles" | "About NXT Smart Home — Independent AU Smart Home Guides", etc. |
| Low | H1→H3 skips on /products/, the product category page and the author page | Add H2 section headings |
| Low | `/about/` og:url points to the homepage | Per-page og:url |

**Worst title/description lengths**

| URL | Title chars | Description chars |
|---|---|---|
| /setup-guides/home-assistant-energy-dashboard-solar-export-time-of-use-tariffs/ | 95 | 260 |
| /setup-guides/zigbee-mesh-garage-granny-flat-double-brick-home/ | 90 | 285 |
| /security-and-cameras/wiring-video-doorbell-australian-chime-transformer/ | 89 | 242 |
| /robot-vacuums/robot-vacuum-running-costs-australia/ | 88 | 279 |
| /climate-and-comfort/smart-thermostat-gas-ducted-hydronic-heating-australia/ | 86 | 298 |
| /products/tp-link-tapo-p110-smart-plug-with-energy-monitoring/ | 70 | 430 |

The full per-URL table is in `findings/content.md`.

## 4. Schema / Structured Data — 66 / 100

**What works:** JSON-LD only, with `https://schema.org` context. Organization and WebSite appear on every page. Article is complete (absolute image, ISO dates, author linked to the profile). BreadcrumbList matches the visible trail. The sitemap matches robots.txt and excludes noindex pages.

| Sev | Finding | Fix |
|---|---|---|
| High | `AggregateRating` from syndicated retailer reviews on the Bose and Ecovacs product pages (Google: ratings must come from the site's own users) | Drop `aggregateRating`/`review` from `productJsonLd`; keep the visible labelled reviews |
| High | Product `image` is a relative path (`/images/products/…-sq500.webp`) | Wrap in `abs()` |
| High | Offer URLs are retailer *search* pages (`amazon.com.au/s?k=…`) with availability hard-coded to InStock | Emit Offer only for verified product URLs; otherwise omit availability or offers |
| High (latent) | `articleJsonLd` has a Review branch that would emit `reviewRating` for any article typed `review` (none exist today) | Remove, or gate behind an explicit genuinely-tested flag (rule 5) |
| Medium | ItemList nests Product items with no offers, which are ineligible for rich results | ItemList of ListItem with `url` → `/products/<slug>/` |
| Medium | Organization has no `logo` or `description`; `sameAs` is Facebook only; Person has no `sameAs`, `image` or `jobTitle` | See the recommended snippets in `findings/schema.md` |
| Medium | Article `datePublished` looks ingest-stamped for some posts (live 2026-10-05 vs front matter 2026-08) | Preserve real `publishedAt` on Strapi import |
| Info | FAQPage on every article: Google now restricts FAQ rich results, so there is no SERP benefit, but it is harmless while it matches visible FAQs | Keep |
| Low | /about/, /articles/ and /authors/ carry only the global graph | AboutPage / CollectionPage / ProfilePage + BreadcrumbList |

## 5. Performance — 74 / 100 (lab only)

Lighthouse 13.5.0, one run per page per form factor, default simulated throttling (mobile = slow 4G + 4× CPU). There is no field data, so Core Web Vitals pass/fail at p75 cannot be stated.

| Page | Mobile score | LCP | TBT | CLS | Desktop score | Desktop LCP |
|---|---|---|---|---|---|---|
| Home | 64 | 7.3 s | 390 ms | 0 | 96 | 1.3 s |
| /all-topics/ | 64 | 7.0 s | 400 ms | 0 | 94 | 1.7 s |
| Article (platform guide) | 71 | 5.4 s | 290 ms | 0 | 96 | 1.3 s |
| Product (Arlo Ultra 2) | 64 | 5.2 s | 560 ms | 0 | 98 | 1.1 s |

The mobile LCP is inflated by simulation: the observed LCP subparts total about 0.2 s and TTFB is about 50 ms. Real users are likely to see much better. Confirm with CrUX or Search Console.

| Sev | Finding | Fix |
|---|---|---|
| High | Render-blocking 127 KB CSS file plus `/js/ga-init.js` (est. 0.9–1.1 s FCP/LCP) | Purge/split the Tailwind CSS; `experimental.inlineCss`; load `ga-init.js` async |
| High | `images.unoptimized: true` (`next.config.mjs:41`): 1024×768 JPEG covers are shown at ~570×285 with no srcset or WebP/AVIF (est. 653 KiB saving on home) | Build-time responsive WebP/AVIF (sharp) or Cloudflare image resizing; add `sizes` |
| High | LCP images are preloaded but without `fetchpriority="high"`; the homepage preloads 3+ covers that compete; covers come from a second origin (cms.fxnstudio.com) | Preload only the first image, with `fetchpriority="high"`; `preconnect` to the CMS or mirror covers |
| Medium | CMS uploads are served `Cache-Control: max-age=0`; `/images/*` only 4 h | Immutable 1-year caching for hashed uploads and `/images/` |
| Medium | Analytics and affiliate scripts load eagerly: gtag plus three link-monetisation tools (VigLink, Sovrn, Geniuslink) | Defer to idle (`lazyOnload`); consolidate to one tool |
| Medium | /all-topics Lottie: 123 KB JSON and the heaviest main thread (4.2 s, mobile lab) | Load on idle or IntersectionObserver; static fallback for mobile and `prefers-reduced-motion` |

## 6. Images — 58 / 100

- **Good:** 0 missing alt attributes; empty alt only on decorative icons and avatars; product images already WebP; CLS 0.
- **Medium:** no optimisation pipeline (see Performance); `category-3d` PNGs are 256 px and 60–70 KB each but shown at 40 px; the 44 px avatar is a 94 KB file; the CMS cover cache is `max-age=0`.
- **Low:** 20–43 `<img>` per page without width/height (inside sized containers, so no layout shift today).

## 7. AI Search Readiness — 58 / 100

Citability 58 · Structure 65 · Multi-modal 50 · Authority 45 · Technical 70. Platform estimates: Google AI Overviews 62, Bing Copilot 60, ChatGPT 55, Perplexity 55.

**What works:** server-rendered HTML. The search and live-fetch crawlers for every major platform get 200 (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot, Googlebot, bingbot). Schema is on every article. The smart plug buying guide is highly citable, with 7 .gov.au regulator links.

| Sev | Finding | Fix |
|---|---|---|
| High | Electrical-law article: 0 outbound links, states law as settled ("every state… no homeowner exemption"), contrary to rule 6 and the author bio's promise | Link each state/territory regulator; add a "check your regulator" table; soften until checked |
| Medium | Cloudflare returns 403 to GPTBot, ClaudeBot, anthropic-ai, CCBot, Bytespider, cohere-ai and Amazonbot while robots.txt allows all (tested with spoofed UAs, so confirm in Cloudflare → AI Crawl Control) | Decide on a policy and make both layers match. Consider allowing Amazonbot, which feeds Alexa answers, for a smart-home audience |
| Medium | Thin brand entity: no logo in Organization, Facebook the only `sameAs`; no Wikipedia, Reddit or YouTube footprint found (low-confidence check) | Logo, description and `areaServed`; author `sameAs`; build off-site profiles |
| Medium | 3 of 4 sampled articles don't lead with the answer; few question-form H2s outside the FAQs | 40–60-word direct answer at the top; question H2s where natural |
| Medium | "Read Also", "Affiliate Link" and "Comments" H2s and product-box H3s sit inside the `<article>` heading outline | Render as `<aside>` with non-heading labels |
| Low | Few comparison tables (1 across 4 sampled articles); no `llms.txt`; no Markdown versions | Add verified-only tables; static `llms.txt` |

## 8. Search Experience (SXO) and Authority

| Page | Target query (inferred) | SERP shape | SXO gap score | Verdict |
|---|---|---|---|---|
| /security-and-cameras/video-doorbell-buying-guide-australia/ | best video doorbell australia | ~80% named-product roundups (nestpath holds 4 slots) | 50 | **Critical mismatch:** 0 product boxes |
| /robot-vacuums/robot-vacuum-buying-guide-australia/ | best robot vacuum australia | Brand-blog roundups (Narwal 6 of 9) | 58 | High: 2 boxes, no table, "6 min read" for 3,700 words |
| /categories/security-and-cameras/ | home security cameras australia | Manufacturer guides, roundups | 42 | High: 241-word chronological list; money pages not on page 1; `//` link |
| /buying-guides/smart-home-for-renters-australia/ | smart home for renters australia | Mixed; almost no AU result | 66 | Medium: add a no-drill shortlist |
| /setup-guides/connect-smart-devices-2-4ghz-wifi/ | connect smart device to 2.4GHz | Support/how-to pages | 74 | Aligned: add Telstra/Optus/TPG modem steps; trim 12 buy buttons |
| /hubs-and-platforms/best-smart-home-platform-australia/ | best smart home platform australia | Comparisons and forums | 70 | Aligned: move the table above the fold |

Persona fit, weakest first: comparer 49, family 56, renter 67, beginner 72.

**Long-tail opportunities.** Volumes are not verified; prioritise with GSC impressions once connected.
- Renter video doorbell / landlord permission.
- B22 vs E27.
- Ring vs Eufy vs Arlo.
- No-neutral smart switches.
- Indoor and outdoor camera guides.
- Smart locks.

Drafts for most of these already exist in `content/articles/` but 404 live, several blocked by `[VERIFY]` tags.

**Authority:** Common Crawl (Q1 2026 graph) has the domain in its crawl but below the ranking threshold, so it has no measurable PageRank or host centrality. Moz, Bing and Keywords Everywhere were unavailable (no keys). Head terms ("best X australia") are unrealistic short-term, so long-tail AU content and linkable assets are the priority. Add a free Moz API key to `/root/.config/claude-seo/` and re-run for referring-domain counts.

---

## Limitations

- No GSC, GA4, CrUX or keyword-volume data: indexation, traffic, rankings and field Core Web Vitals are unmeasured.
- Lighthouse was one run per page with simulated throttling; mobile LCP in particular is pessimistic.
- SERP analysis used a US-based index, not true google.com.au.
- AI-crawler blocking was tested with spoofed user-agents from this server; confirm the rule in the Cloudflare dashboard.
- Backlink data is limited to the Common Crawl domain graph.

## Files

- `ACTION-PLAN.md`: prioritised fixes by phase
- `audit-data.json`: structured envelope for PDF generation
- `findings/technical.md`, `content.md`, `schema.md`, `performance.md`, `geo.md`, `sxo.md`: specialist detail and evidence
- `screenshots/homepage-desktop.png`, `homepage-mobile.png`
- `sitemap-urls.txt`: the 117 URLs crawled
