# SXO (Search Experience) + Authority/Backlinks — nxtsmarthome.com.au

Audit date: 6 Oct 2026. Method: rendered with `render_page.py --mode always`, parsed with `parse_html.py`, SERP backwards analysis via WebSearch. Source tree read-only. **SXO Gap Score is separate from the SEO Health Score.**

Note: the sitemap and category counts show **83 to 106 live article URLs**, not ~48. `content/articles/` holds 48 markdown files, and the live copy (served from Strapi) differs from them. For example, the live renters title is "...Without Drilling or Rewiring", while the markdown says "...Without Losing Your Bond".

---

## 1. Headline finding: the money pages are explanatory guides, but Google rewards "best X" product roundups

| # | Page | Inferred target query | SERP dominant type (consensus) | Page type | Mismatch |
|---|---|---|---|---|---|
| 1 | /security-and-cameras/video-doorbell-buying-guide-australia/ | best video doorbell australia | Product roundup / listicle with named picks (~80%: TechRadar AU, nestpath x4, Reolink, linkdhome) | Decision-framework guide, **0 product boxes** | **CRITICAL** |
| 2 | /robot-vacuums/robot-vacuum-buying-guide-australia/ | best robot vacuum australia / robot vacuum buying guide australia | Brand-blog roundups (Narwal x6), BHG, Good Guys, ShopBack comparison (~85% roundup) | Feature-explainer guide, 2 product boxes | **HIGH** |
| 3 | /buying-guides/smart-home-for-renters-australia/ | smart home for renters australia | Mixed: renter listicles (TechHive, Starling, fix-app), brand pages (Shelly, Ryse), retailer category (BestBuy). Almost no AU-specific result | Long guide (3.9k words), 3 product boxes | **MEDIUM** (format fits, but the "devices list" layer is weak) |
| 4 | /setup-guides/connect-smart-devices-2-4ghz-wifi/ | how to connect smart device to 2.4GHz wifi | Support/how-to articles (Asurion, Android Authority, Legrand, Amcrest, Kaiterra support) | Step-by-step how-to, FAQ | **ALIGNED** |
| 5 | /hubs-and-platforms/best-smart-home-platform-australia/ | best smart home platform australia / apple home vs google home vs alexa | Comparison/vs articles plus forum threads (element14, security.org, geekchamp, Stuff) | Comparison with one table | **ALIGNED** (low-competition AU angle) |
| 6 | /categories/security-and-cameras/ | home security cameras australia (guide) | Manufacturer buying guides (Reolink x5, TP-Link), roundups | Chronological category archive, 241 words | **HIGH** (a hub that does not route intent) |

Why it matters: for "best X australia" queries, every top result names specific models, with specs and a price or retailer, near the top. The video doorbell guide never names a product box. It also breaks the site's own CLAUDE.md rule 8, which requires at least two `::product:` markers in every article. The page answers "how do I choose?", while the SERP answers "which one do I buy?".

SERP signals observed: AI-summary-style answers that list named models on both "best" queries; nestpath.com.au ranks with **four URLs** for doorbells (homeowner-hub plus /compare/ side-by-side pages, "3 verified picks"); and "no subscription" appears in result titles. That last one is the site's own storage-first angle, which nestpath has already put in a title.

---

## 2. Per-page detail: user stories, gaps and fixes

### P1 Video doorbell buying guide — SXO Gap Score 50/100 (CRITICAL)
Rendered: title/H1 "Video Doorbell Buying Guide: What Matters in an Australian Home", 1,932 words, Article + FAQPage + BreadcrumbList schema, updated 1 Aug 2026. **0 "Check price" buttons and 0 retailer mentions.**
User stories:
- "As a homeowner comparing doorbells, I want 3-5 named picks for AU with no-subscription options, so I can buy today." (signal: "No Subscription Options Included" in nestpath's title; TechRadar AU's "tested" roundup)
- "As a renter, I want to know whether I can fit a battery doorbell without asking the landlord." (signal: the SERP for "video doorbell rental australia landlord" is held by Jim's Security, eufy AU, and bhatt.id.au on strata)
- "As a buyer with an old chime, I want to know whether model X works with my AU transformer." (signal: chime/wiring section; the site has a wiring article)
Scores: Page type 4/15, Depth 11/15, UX 8/15, Schema 9/15 (no ItemList/Product), Media 5/15, Authority 5/15, Freshness 8/10.
Fixes (in order): (1) Add a "Shortlist" block above the fold: 3-5 catalogue products, each with a `bestFor` verdict (storage type, battery/wired, subscription cost), placed by `scripts/link-products.mjs`. Only add products the text discusses, and no ratings (rule 5). (2) Add a comparison table: local storage, power, chime support, subscription required. (3) Retitle toward "Best Video Doorbells in Australia (No-Subscription Options) — How to Choose". Do not promise rankings. (4) Link to the renter/strata and chime-wiring articles inside the first screen.

### P2 Robot vacuum buying guide — 58/100 (HIGH)
3,695 words, 6 min read claim (inconsistent: 3.7k words is more like 15+ min), 2 product boxes, no table, updated 24 Sep 2026.
User stories: "As a pet owner on tiles and timber, I want a pick for pet hair" (Narwal/Ecovacs AU guides segment by pets, multiple floors and obstacle avoidance). "As a value buyer, I want the mid-range sweet spot in AUD" (ShopBack X10 vs S8 vs X40 comparison).
Fixes: add a "Best for..." shortlist (pets, apartments, multi-storey, budget) using catalogue products with verdicts; add a spec table (navigation, dock, mop type); fix the read-time calculation. This query is dominated by brand-owned blogs (Narwal holds 6 slots), and an independent, non-brand guide is a real differentiator. Say "independent" explicitly in the intro and meta.

### P3 Smart home for renters — 66/100 (MEDIUM)
3,928 words, strong AU tenancy and strata angle. The SERP has almost no AU independent result, which makes this the site's best realistic win.
User stories: "As a renter, I want a checklist of no-drill devices by room." (TechHive/Starling listicle format) "As a renter in a strata unit, I want to know what the owners corporation controls." (bhatt.id.au strata warning result)
Fixes: add a scannable "No-drill shortlist" (plug, bulb, adhesive sensor, free-standing camera, renter-friendly lock overlay), each a catalogue product box. Add a printable "ask your landlord" section and point readers to their state tenancy authority rather than stating law. Add HowTo or ItemList schema. Mark the strata/renter doorbell piece as a sibling and publish it (see 4).

### P4 2.4GHz connection guide — 74/100 (ALIGNED)
3,072 words, step-by-step, FAQ, 12 "Check price" buttons. The SERP is support pages and how-to articles.
Fixes: add router-specific steps for AU ISP-supplied modems (Telstra Smart Modem, Optus, TPG/iiNet), because the US results do not cover them. Add screenshots or a short video (media is the weakest dimension: 0 video). 12 buy buttons on a troubleshooting page may read as affiliate-heavy to a frustrated user, so cap them at 2-3 relevant products (for example a mesh system).

### P5 Best smart home platform AU — 70/100 (ALIGNED)
2,267 words, one at-a-glance table, an "Apple Home / Google / Alexa / SmartThings / Home Assistant" structure. The SERP is generic US comparisons and forums, so the AU angle (AU retailer stock, Matter, AU internet) is the opening.
Fixes: move the at-a-glance table above the five platform sections; add a "pick by phone you own" decision box at the top; add AU-specific data points only where they are verifiable (no invented availability claims). Add ItemList schema for the five platforms.

### P6 Security & Cameras category hub — 42/100 (HIGH)
241 words, newest-first archive (6 articles on page 1 of 12). The money pages (video doorbell guide, cloud vs local storage, reolink-vs-eufy) are not featured, and the doorbell guide is not linked from page 1. **Bug: a double-slash internal link `/security-and-cameras/security-camera-storage-cloud-vs-local//`.** Schema is only Organization/WebSite/BreadcrumbList (no CollectionPage/ItemList).
Fixes: turn the hub into a curated "Start here" layout: Buying guides (doorbell, outdoor, indoor camera), Comparisons, Renters and strata, Legal and privacy, then the chronological feed. Add a 150-300 word intro answering "which camera type do I need?", CollectionPage + ItemList schema, and fix the double-slash href.

---

## 3. Persona scoring (sitewide, across the 6 pages)

Each persona is scored out of 100: Relevance /25, Clarity /25, Trust /25, Action /25. The rows are sorted weakest first.

| Persona (SERP signal) | R | C | T | A | Total | Top fix |
|---|---|---|---|---|---|---|
| Comparer / ready-to-buy ("best X australia" roundups, nestpath /compare/ pages) | 12 | 14 | 15 | 8 | **49** | Named shortlists and comparison tables on P1/P2/P6; "Check price at X" buttons next to each pick |
| Family / security-focused (doorbell and camera SERPs, privacy results) | 15 | 15 | 17 | 9 | **56** | Doorbell/camera picks by use case (parcel theft, kids, privacy); link the privacy-law page from the doorbell guide |
| Renter (Jim's Security/eufy/bhatt renter-doorbell results, no-drill listicles) | 20 | 17 | 18 | 12 | **67** | Publish the renter doorbell article; no-drill device checklist with product boxes |
| Beginner ("how to connect", "which platform" results) | 20 | 19 | 18 | 15 | **72** | Add "pick by phone you own" box on P5 and screenshots on P4 |

Trust is capped across all personas by the absence of hands-on evidence (the site honestly avoids ratings, which is correct per rule 5). An original photo of a device on an AU door or wall would lift Trust without implying test results that did not happen. See `/seo content` for an E-E-A-T deep dive.

---

## 4. Quick keyword opportunities (AU long-tail, low authority)

Search volumes are **not verified**: no keyword tool credentials (Keywords Everywhere and DataForSEO were not used). Prioritise using GSC impressions.

| Opportunity | Evidence it is winnable | Existing asset | Action |
|---|---|---|---|
| video doorbell rental / landlord permission australia | SERP: Jim's Security, eufy AU, a personal blog (bhatt.id.au), UK council pages. Weak and partly off-market | `content/articles/smart-doorbell-renting-landlord-permission.md`, **404 live and not in sitemap** | Publish (resolve any legal claims to a "check your state tenancy authority" pointer per rule 6) |
| B22 smart bulb australia / B22 vs E27 | SERP: OzBargain, nestpath, eBay.de, UK Hue pages. Thin AU editorial | `b22-vs-e27-smart-bulb-fittings-australia.md`, **404 live; has a [VERIFY] tag (blocked by editorial guard)** | Resolve the [VERIFY] tag, publish, add B22 catalogue products |
| ring vs eufy vs arlo australia | Comparison intent, and the site already has a reolink-vs-eufy page | `ring-vs-eufy-vs-arlo-australia.md`, **404 live; [VERIFY] on AU subscription pricing** | Resolve by linking to official AU pricing pages rather than stating figures |
| smart light switch no neutral australia | SERP: Shopify product page, OzBargain threads, SmartThings forum, nestpath. Forum-heavy, which is a classic low-authority opening | /lighting/smart-light-switches-neutral-wire-older-australian-homes/ (live) | Retitle to lead with "No Neutral Wire", add an AU-certified (RCM) product shortlist and a licensed-electrician note |
| outdoor / indoor security camera buying guide australia | SERP dominated by Reolink and TP-Link brand blogs, so an independent angle is open | `outdoor-` and `indoor-security-camera-buying-guide-australia.md`, **404 live** | Publish and feature them on the Security hub |
| smart locks australia buying guide | Category `/categories/smart-door-locks/` exists | `smart-locks-australia-buying-guide.md`, **404 live** | Publish, since the hub otherwise lacks a pillar |
| independent robot vacuum guide australia | 6 of 9 results on the robot vacuum SERP are Narwal's own blog | P2 | Position as "independent, non-brand" |

---

## 5. Authority / Backlinks

| Source | Result |
|---|---|
| Common Crawl web graph (`commoncrawl_graph.py`, release cc-main-2026-jan-feb-mar) | `in_crawl: true`, `in_rankings: false`. PageRank, harmonic centrality and host count are all **null**: "Domain found in CC crawl but below ranking threshold (too small/new for PageRank rankings)." |
| Moz DA/PA, spam score | **Unavailable**: no `MOZ_API_KEY` (backlinks_auth tier 0) |
| Bing Webmaster inbound links | **Unavailable**: no API key |
| Keywords Everywhere / Open PageRank | **Unavailable**: no API key |

Severity: **HIGH**. The domain has no measurable link authority in Common Crawl's Q1 2026 graph. Competitors in the SERPs (TechRadar AU, CHOICE, BHG, brand blogs) outrank on authority alone for head terms. That is why "best X australia" head terms are unrealistic short-term and the long-tail table above is the priority.

Fixes: (1) Add a Moz free API key (2,500 rows/month) to `/root/.config/claude-seo/backlinks-api.json` and re-run for referring-domain counts. (2) Earn links with AU-specific linkable assets: a strata/renter rules explainer that points to the official sources, an AU ISP modem 2.4GHz split guide, and a B22 vs E27 explainer. (3) Do targeted outreach to OzBargain and Whirlpool threads where the site genuinely answers the question (no spam), and to AU renter and strata communities. (4) Re-check Common Crawl after the next quarterly release.

---

## 6. Structured findings (for audit-data.json, category "Search Experience")

```json
[
 {"id":"sxo-01","severity":"critical","page":"/security-and-cameras/video-doorbell-buying-guide-australia/","finding":"Page-type mismatch: SERP for 'best video doorbell australia' is ~80% named-product roundups; page has 0 product boxes (also violates site rule 8)","fix":"Add above-fold shortlist of >=2 catalogue products with verdicts + comparison table; retitle toward best/no-subscription"},
 {"id":"sxo-02","severity":"high","page":"/robot-vacuums/robot-vacuum-buying-guide-australia/","finding":"Explainer vs roundup SERP (Narwal brand blogs 6/9); 2 product boxes, no table; read-time 6 min for 3.7k words","fix":"Best-for shortlist + spec table; position as independent; fix read-time"},
 {"id":"sxo-03","severity":"high","page":"/categories/security-and-cameras/","finding":"Chronological archive, 241 words, money pages not linked on page 1, no CollectionPage/ItemList schema, double-slash href","fix":"Curated Start-here hub, intro, ItemList schema, fix href"},
 {"id":"sxo-04","severity":"medium","page":"/buying-guides/smart-home-for-renters-australia/","finding":"Format fits but lacks scannable no-drill device list; AU SERP gap is open","fix":"No-drill shortlist with product boxes, landlord-request section, ItemList/HowTo schema"},
 {"id":"sxo-05","severity":"medium","page":"(unpublished)","finding":"High-opportunity long-tail articles 404 live (renter doorbell, B22 vs E27, ring-vs-eufy-vs-arlo, outdoor/indoor camera guides, smart locks guide); some blocked by [VERIFY]","fix":"Resolve [VERIFY] tags per rule 6/7 and publish"},
 {"id":"sxo-06","severity":"low","page":"/setup-guides/connect-smart-devices-2-4ghz-wifi/","finding":"Aligned; lacks AU ISP modem steps and screenshots; 12 buy buttons on troubleshooting page","fix":"Add Telstra/Optus/TPG modem steps, screenshots; trim affiliate buttons"},
 {"id":"sxo-07","severity":"low","page":"/hubs-and-platforms/best-smart-home-platform-australia/","finding":"Aligned; comparison table sits below five long sections","fix":"Move table and 'pick by phone' box above the fold"},
 {"id":"auth-01","severity":"high","page":"domain","finding":"Common Crawl: in crawl but below ranking threshold (no PageRank/HC); Moz/Bing/KE unavailable (no keys)","fix":"Add Moz key, build AU linkable assets, targeted community outreach, re-check next CC release"}
]
```

---

## 7. Limitations
- WebSearch is a US-based index, not a true google.com.au SERP. Rankings, AI Overviews, PAA and ads could not be observed directly; result sets are approximations of AU intent.
- No search volumes, GSC or rank data were available, and none were invented.
- Competitor depth and schema were inferred from SERP titles and snippets, not crawled.
- Live content is served from Strapi and differs from `content/articles/*.md`. Unpublished-article findings are based on 404s at the expected category path plus absence from the sitemap.
- Backlink data is limited to the Common Crawl domain graph (tier 0 credentials).
- No wireframes were generated (not requested).

Cross-skill: `/seo schema` (ItemList/CollectionPage), `/seo content` (E-E-A-T, hands-on evidence), `/seo page` (hub page). Generate a PDF report? Use `/seo google report`.
