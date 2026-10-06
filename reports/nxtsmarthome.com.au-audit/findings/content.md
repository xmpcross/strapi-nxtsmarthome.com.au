# Content Quality and On-Page SEO: nxtsmarthome.com.au

Audit date: 6 October 2026. Read-only audit; nothing in content or code was changed.

**Evidence base.** I fetched all 117 sitemap URLs live with `render_page.py --mode never`. All 117 returned 200 with a self-referencing canonical and `index, follow`. Article metrics come from the rendered `#article-body .prose` blocks, so FAQ, product boxes and site chrome are excluded. Strapi is the live content source (`lib/strapi.ts`); the 48 files in `content/articles/` are history only. Where I cite them, it is only to show what is *not* live.

| Inventory | Count |
|---|---|
| Sitemap URLs | 117 (83 articles, 10 categories, 10 product pages, 2 product hubs, 11 static/trust pages, 1 author) |
| Articles live | 83, all bylined "Kritin Curtis" |
| Article body words (prose only) | median 1,422; min 834; max 2,180; 50 of 83 under 1,500; 5 under 1,000 |

---

# Content Quality: 64 / 100

| Component | Score |
|---|---|
| E-E-A-T (weighted, internal model) | 54 |
|   Experience (20%) | 35 |
|   Expertise (25%) | 60 |
|   Authoritativeness (25%) | 45 |
|   Trustworthiness (30%) | 70 |
| AI citation readiness | 72 |
| Readability | 62 |
| AU localisation | 90 |
| Editorial-rule compliance (live) | 60 (one critical breach, on the homepage) |

## What works

- **The trust pages are unusually honest and specific.** `/about/`, `/how-we-test/` and `/affiliate-disclosure/` all say plainly that guides are research-based and not bench-tested. They disclose AI-assisted drafting, state a corrections policy, explain affiliate funding, and name the publisher (FXN Holdings Limited) and the editor. This is exactly the transparency the QRG rewards.
- **No editorial markers leak live.** All 117 pages were scanned for `[VERIFY`, `TODO`, `TBD` and `lorem`: zero hits. The guard in `lib/editorial-guard.mjs` is working.
- **No fabricated testing in article bodies.** I found no "we tested" or "in our tests" claims. One article explicitly says durability "isn't something we've tested hands-on" (`/security-and-cameras/reolink-vs-eufy-security-cameras/`). Inline ProductBoxes carry no star ratings.
- **AU localisation is strong and sourced.** AS/NZS 3000 and AS/NZS 6059 are cited, the Privacy Act and surveillance-devices law are covered, and NSW Government guidance is quoted. Prices are dated and attributed, for example "at the time of writing Officeworks lists SanDisk's 128GB High Endurance card at $98" (`/security-and-cameras/local-recording-vs-cloud-subscriptions-security-cameras-australia/`). The zoning cost ranges are attributed to TradieVerify and Quotcha (`/climate-and-comfort/smart-zoning-ducted-air-conditioning-cost-australia/`).
- **Spelling is Australian.** The only "Color" hits are the Philips Hue product name "White & Color Ambiance", and "Colorbond" is a brand name. No `-ize` or `-or` US spellings appear in article prose.
- **Product-page reviews are well caveated.** They are labelled "Reviews written by customers of these retailers — not by NXT Smart Home, and not a test result", with a 20-review minimum before any score is shown (`lib/review-sources.ts`).
- **Article template.** Each article has a byline linking to the author page, an affiliate notice above the fold, a table of contents, an FAQ, and an answer-first "The short answer" box on 44 of 83 articles.

## Findings

### C1. Critical: hardcoded star ratings and prices on the homepage contradict the site's own trust pages (rule 5)
- **Evidence:** `https://nxtsmarthome.com.au/`, "Featured Smart Gear" widget: "SMART LOCKS $297 AUD ★ 4.8 ★ HomeKit & Fingerprint Aqara A100 Smart Door Lock".
- **Source:** `components/home/ZairaBottomSections.tsx` lines ~50-100, `SmartGearShowcaseWidget`. It hardcodes `rating: '4.8 ★'`, `'5.0 ★'` and `'4.7 ★'` plus fixed prices for five products. No source or date is attributed.
- **Why it matters:**
  - `/about/` says "You will not find a star rating from us"; `/how-we-test/` says "you will not find star ratings or scores from us anywhere on this site".
  - An unattributed score implies testing, which breaks CLAUDE.md rule 5.
  - Static prices also contradict "Prices change daily, so our guides do not state them".
  - This is the most-visited page and the first thing a quality rater sees.
  - The same widget uses US spelling: "4K HDR & Color Night Vision".
- **Fix:** Remove the `rating` and `price` fields from the widget, or render live catalogue data with a "price checked <date>" label and no stars. Change "Color" to "Colour" in the highlight copy.

### C2. High: publishing pattern, single author and thin author entity weaken trust in the AI-assisted output
- **Evidence (Article schema `datePublished`):**
  - 18 articles were published on 23 Aug 2026 between 00:41:36 and 00:45:30Z, roughly 13 seconds apart.
  - 15 articles were published on 24 Sep between 01:48 and 05:12Z, about 2 minutes apart.
  - From 24 Sep to 5 Oct, articles appear twice daily at about 05:32 and 21:32Z.
  - All 83 articles are by one author.
- **Author page `/authors/kritin-curtis/`:**
  - No credentials, qualifications, years of experience or external profiles.
  - Person schema has no `sameAs`, `jobTitle` or `knowsAbout`.
  - The bio text reads "has written more than 20 guides", while the page lists 83.
- **Why it matters:** The QRG (September 2025) treats scaled, low-effort output as a lowest-quality signal. The content itself is not low-effort: it is localised and sourced. But the cadence plus one thinly-evidenced author is exactly the pattern raters are told to probe. `/about/` discloses AI drafting, which helps; the author entity does not back it up.
- **Fixes:**
  - Expand the author bio with verifiable background (trade, IT or networking experience, if real) and `sameAs` links (LinkedIn and so on).
  - Correct the article count, or generate it dynamically.
  - Add an editor or reviewer line ("Reviewed by …") where a second person actually checks electrical, legal or privacy articles.
  - Space releases out, and stop bulk-stamping publish times.

### C3. High: keyword and intent cannibalisation clusters
TF-IDF body similarity is moderate (max 0.42), so these are not copy duplicates. They are, however, the same search intents:

| Cluster | URLs | Action |
|---|---|---|
| Smart plugs save money | `/energy-and-solar/smart-plugs-energy-monitoring-australia/` ("Do Smart Plugs Actually Save You Money on Australian Electricity?") vs `/energy-and-solar/smart-plugs-energy-monitors-lower-power-bill-australia/` ("How Smart Plugs and Energy Monitors Can Cut Your Australian Power Bill"); adjacent: `/energy-and-solar/standby-power-costs-appliances-australia/`, `/energy-and-solar/smart-energy-monitors-australia/` | Merge the first two (add to `data/merged-articles.json`); keep standby-power and energy-monitors as distinct, cross-linked spokes |
| Camera storage | `/security-and-cameras/security-camera-storage-cloud-vs-local/` vs `/security-and-cameras/local-recording-vs-cloud-subscriptions-security-cameras-australia/` | Merge into the longer, better-sourced second URL |
| Neutral-wire switches | `/lighting/best-smart-light-switches-australia/` ("(Neutral vs No-Neutral)") vs `/lighting/smart-light-switches-neutral-wire-older-australian-homes/` (which is already the survivor of an earlier merge) | Re-angle the first as a product roundup and link it to the second for the neutral question |
| Movie lighting | `/entertainment-and-audio/home-cinema-lighting-automation/` vs `/entertainment-and-audio/movie-night-lighting-scenes-you-can-build-without-touching-the-switchboard/` | Merge |
| Ducted zoning | `/climate-and-comfort/smart-ducted-air-con-zoning/` vs `/climate-and-comfort/smart-zoning-ducted-air-conditioning-cost-australia/` | Merge, or make one "how" and one "cost" with reciprocal links |
| Lighting scenes | `/lighting/smart-lighting-scene-ideas/`, `/lighting/smart-lighting-kids-rooms/`, `/lighting/circadian-smart-lighting-sleep/` (highest pairwise similarity on the site, 0.38-0.42) | Differentiate the intros and H2s; cross-link |
| Platform choice | `/hubs-and-platforms/best-smart-home-platform-australia/`, `/hubs-and-platforms/switch-smart-home-platforms/`, `/buying-guides/smart-home-hub-buying-guide-australia/`, `/hubs-and-platforms/aqara-m3-vs-hue-bridge-vs-smartthings-station/` | Designate `best-smart-home-platform-australia` as the hub; the others link up to it |
| Wi-Fi setup | `/setup-guides/connect-smart-devices-2-4ghz-wifi/`, `/setup-guides/separate-wifi-network-smart-devices/`, `/setup-guides/fix-smart-home-wifi-dropouts/` | Keep, but make the distinct intents explicit in titles and cross-link |

### C4. High: promised differentiator topics return 404, and one category is empty
- `/about/` and `/categories/lighting/` both promise B22 vs E27 coverage ("the B22 vs E27 fitting question"). Yet `/lighting/b22-vs-e27-smart-bulb-fittings-australia/` returns **404**.
- `/security-and-cameras/smart-locks-australia-buying-guide/` and `/security-and-cameras/home-security-australia-pillar/` also return **404**.
- `/categories/smart-door-locks/` is indexed and in the sitemap but shows "0 Articles … Nothing published in this section yet". It is a thin, indexable page.
- 24 topics drafted in `content/articles/*.md` are not live. These include all three pillars (home-security, smart-home-budget, smart-home-standards), the smart-locks guide, indoor and outdoor camera guides, smoke alarms and leak sensors, and strata/apartment. Ten of them carry `[VERIFY]` tags in the markdown.
- **Fixes:**
  - Publish B22 vs E27 and the smart-locks guide first, resolving their `[VERIFY]` tags per rules 6-7. The smart-locks guide fills the empty category.
  - Until then, set `noindex` on `/categories/smart-door-locks/` and drop it from the sitemap.
  - Publish the pillars as hubs for the clusters in C3.

### C5. Medium: 15 articles fall short of the rule 8 product-marker minimum
- **No inline ProductBox (13 articles):**
  - `/buying-guides/smart-home-holiday-house-australia/`, `/buying-guides/smart-home-devices-older-australians/`, `/buying-guides/second-hand-smart-home-devices-australia/`, `/buying-guides/overseas-smart-home-devices-australia/`, `/buying-guides/future-proof-smart-home-devices-australia/`
  - `/hubs-and-platforms/smart-home-devices-without-internet/`, `/buying-guides/smart-home-starter-guide-beginners-australia/`, `/energy-and-solar/smart-plugs-energy-monitoring-australia/`, `/security-and-cameras/smart-home-privacy-cameras-australia-law/`
  - `/security-and-cameras/video-doorbell-buying-guide-australia/`, `/setup-guides/fix-smart-home-wifi-dropouts/`, `/setup-guides/smart-home-electrical-work-australia-legal/`, `/lighting/smart-bulbs-vs-smart-switches-australia/`
- **Only one box (2 articles):** `/entertainment-and-audio/smart-speakers-multiroom-audio-australia/` and `/hubs-and-platforms/best-smart-home-platform-australia/`.
- The video-doorbell *buying guide* has no doorbell products at all.
- Rule 8 applies to "new or rewritten" articles, so these are gaps rather than strict violations. They are also missed affiliate opportunities.
- **Fix:** `node scripts/link-products.mjs <slug>` (preview), then `--write`. Only use products with `bestFor` or `pros` that the text actually discusses. The privacy-law and electrical-legal articles can reasonably stay product-free; document that exception.
- **Product reuse:** Tapo P100 appears in 10 articles, and the SONOFF dongle, VoltX E600 and Arlo Ultra 2 in several each. Placement was checked and is contextual (the preceding paragraph discusses the product type), so this is Low. Broaden the catalogue so boxes are not the same four items.

### C6. Medium: one safety claim conflicts with the site's own legal position
- `/entertainment-and-audio/home-cinema-lighting-automation/` says fixed-wiring work "should be done, **or at least checked**, by a licensed electrician rather than attempted as a DIY job".
- `/lighting/smart-lighting-scene-ideas/` says installation "should be carried out **or checked** by a licensed electrician".
- `/about/` says fixed wiring "must be carried out by a licensed electrician", and other articles quote NSW guidance not to DIY even small jobs. "Or checked" implies DIY-then-inspect is acceptable.
- **Fix:** Align the wording with the site's position, or point readers to their state electrical safety regulator (rule 6).
- **Related:** `/lighting/smart-lighting-scene-ideas/` and `/lighting/best-smart-light-switches-australia/` feature the "Aqara Smart Light Switch H1 **EU** (No Neutral)" for Australian walls. Flag it for human fact-check: confirm AU suitability and RCM status against the manufacturer or retailer listing before keeping it. This is not asserted here as non-compliant.

### C7. Medium: readability drop in the 24 Sep – 5 Oct batch
| Group | Articles | Avg sentence length (words) | Flesch reading ease |
|---|---|---|---|
| 24 Sep – 5 Oct batch | 40 | 30.2 | 44 |
| Earlier articles | 43 | 18.1 | 57 |

- The figures are heuristic; list items without full stops inflate sentence length equally in both groups.
- The new batch is noticeably denser, for example the opening of `/entertainment-and-audio/home-cinema-lighting-automation/` (avg sentence length 40.3).
- It also lacks the "The short answer" box: 44 of 83 articles carry it, and most of the gaps are in this batch.
- Generic AI-style phrasing is low overall ("unlock" ×10, "elevate" ×3, "peace of mind" ×3 across 83 articles).
- **Fix:** Split sentences over 30 words, and add the short-answer block to the new template.

### C8. Medium: freshness dates are bulk-stamped and unlabelled
- The visible byline date is the *modified* date, with no "Updated" label.
- 52 articles show "September 24, 2026" and 11 show "August 1, 2026".
- Example: `/hubs-and-platforms/what-is-matter-smart-home-australia/` has `datePublished` 2026-01-14 but displays "August 1, 2026".
- Bulk date bumps without visible substantive change look like freshness manipulation.
- The format is US style ("September 24, 2026", "Oct 4, 2026") on an `en-AU` site.
- **Fixes:**
  - Show "Published 14 January 2026 · Updated 1 August 2026".
  - Only bump `dateModified` for substantive edits.
  - Use the AU date format (`d MMMM yyyy`).

### C9. Low: homepage theme filler undermines credibility
- An "Editors Choice" heading (missing apostrophe) sits over what is simply the latest posts.
- "Trending News" and "Popular Posts" also show recency, not measured popularity.
- The "Daily Newsletter … Subscribe Now" form does nothing (`onSubmit={(e) => e.preventDefault()}`).
- The Twitter, Instagram, YouTube, LinkedIn and Pinterest icons link to `#`; only Facebook is real.
- Raw ISO timestamps are printed as text, for example "2026-10-05T21:34:04.713Z".
- **Fix:** Remove or wire up the newsletter, drop the dead social icons, rename the sections honestly, and format the dates.

### C10. Low: "Reviews" labelling contradicts /how-we-test
- Category titles read "Lighting — Guides & Reviews" and similar.
- The `/all-topics/` H1 reads "Smart Home Topics. Complete AU Guides & Reviews."
- `/how-we-test/` says of reviews: "We have not published any yet."
- **Fix:** Use "Guides & Comparisons" or "Buying Guides & Explainers".

## AI citation readiness: 72 / 100
- **Strengths:**
  - Article, BreadcrumbList and FAQPage JSON-LD on all 83 articles.
  - Question-form H1s and H2s.
  - Short-answer box on 44 articles.
  - Dated, attributed figures and outbound links to official sources (up to 17 per article).
- **Weaknesses:**
  - Author entity lacks credentials and `sameAs`.
  - 40 recent articles have no short-answer block.
  - Long sentences make passages less quotable.
  - Cannibalising pairs split citation signals.

---

# On-Page SEO: 61 / 100

## What works
- All 117 sitemap URLs return 200, with a self-referencing canonical, `index, follow`, and exactly one H1 on every page except the homepage.
- Article H1 matches the `<title>` on all 83 articles. No missing meta descriptions. No duplicate titles or descriptions.
- `metadata_template.py` over 117 pairs: `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}`. The only flag is `description_echoes_title` on `/products/`, which is secondary. There is no bulk-metadata pattern.
- Structured data:
  - Article (with author, publisher and dates), BreadcrumbList and FAQPage on articles.
  - Product and BreadcrumbList on product pages.
  - Person on the author page.
  - Organization and WebSite (with SearchAction) site-wide.
- Article headings nest cleanly: no level skips inside article bodies, with 4-12 H2s per article.

## Findings

### S1. High: 82% of contextual internal links go through a 308 redirect; 18 articles receive no in-body links
- In-body article-to-article links use the category *key* path instead of the URL slug, for example `/security/smart-home-privacy-cameras-australia-law/` and `/energy/smart-plug-buying-guide-australia/`. These 308 to `/security-and-cameras/…` and `/energy-and-solar/…`.
- 157 of 192 in-body article links are non-canonical.
- The homepage and `/all-topics/` also emit double-slash URLs such as `/security-and-cameras/security-camera-storage-cloud-vs-local//`, which 308 as well.
- **18 articles have zero contextual inbound links:**
  - Security: `/security-and-cameras/security-camera-storage-cloud-vs-local/`, `/security-and-cameras/diy-vs-monitored-alarm-systems-australia/`
  - Setup and climate: `/setup-guides/connect-smart-devices-2-4ghz-wifi/`, `/climate-and-comfort/automate-air-con-geofencing/`
  - Energy and hubs: `/energy-and-solar/home-battery-rebate-smart-home-ready/`, `/hubs-and-platforms/samsung-smartthings-australia/`
  - Buying guides: `/buying-guides/smart-home-devices-under-50-australia/`, `/buying-guides/smart-home-devices-home-office/`, `/buying-guides/smart-home-holiday-house-australia/`, `/buying-guides/smart-home-devices-older-australians/`, `/buying-guides/second-hand-smart-home-devices-australia/`
  - Entertainment: `/entertainment-and-audio/connect-bluetooth-headphones-smart-tv/`, `/entertainment-and-audio/smart-tv-parental-controls-setup/`, `/entertainment-and-audio/outdoor-tvs-projectors-speakers-australian-summer/`
  - Lighting: `/lighting/best-smart-light-switches-australia/`, `/lighting/smart-lighting-kids-rooms/`, `/lighting/smart-downlights-australian-ceilings-insulation-clearance-rules/`
  - Robot vacuums: `/robot-vacuums/stick-vacuum-vs-robot-vacuum/`
- 29 articles link out to no other article.
- Inline ProductBoxes link only to retailers, never to the on-site `/products/<slug>/` page.
- **Fixes:**
  - Rewrite stored in-body links in Strapi to canonical paths. Map category key to URL slug via `lib/site.ts` (the CLAUDE.md "category key vs URL slug" trap), or normalise at render time.
  - Fix the double-slash URL builder used by the homepage and all-topics cards.
  - Add 2-4 contextual links into each orphan from its cluster (see C3).
  - Link ProductBox names to their product pages.

### S2. High: Product AggregateRating built from syndicated third-party reviews
- **Evidence:**
  - `/products/bose-smart-soundbar-ultra/` emits `AggregateRating` 3.87 from 30 reviews.
  - `/products/ecovacs-deebot-x2-omni-square-robot-vacuum/` emits 3.3 from 23 reviews.
  - Both come from reviews syndicated from retailers (Bose global store, Myer, Harvey Norman, The Good Guys).
- **Why it matters:** Google's review-snippet guidelines say ratings must be sourced directly from users of the site and must not be aggregated from other websites. This risks a structured-data manual action on review snippets.
- **Fix:** Keep the visible, labelled retailer reviews, but stop emitting `aggregateRating` and `review` in Product JSON-LD.

### S3. High: homepage has no H1
- `https://nxtsmarthome.com.au/` has 0 H1s.
- The first headings are four article titles as H2s; later "Upgrade Your Living Space with Amazon Smart Tech", an ad, is an H3.
- **Fix:** Add a single H1 stating the site's purpose, for example "Smart home guides for Australian homes". Demote sidebar and widget headings and ad headings to non-heading elements.

### S4. Medium: title tags too long on article pages
- 44 of 83 article titles exceed 60 characters, and 19 exceed 70. Examples:
  - 95 chars: "How to Build a Home Assistant Energy Dashboard That Tracks Solar Export and Time-of-Use Tariffs" (`/setup-guides/home-assistant-energy-dashboard-solar-export-time-of-use-tariffs/`)
  - 90: `/setup-guides/zigbee-mesh-garage-granny-flat-double-brick-home/`
  - 89: `/security-and-cameras/wiring-video-doorbell-australian-chime-transformer/`
  - 88: `/robot-vacuums/robot-vacuum-running-costs-australia/`
  - 86: `/climate-and-comfort/smart-thermostat-gas-ducted-hydronic-heating-australia/`
  - 86: `/entertainment-and-audio/streaming-box-australia-free-to-air-catch-up-tv/`
- No article title carries the brand; only 3 of 117 titles include "NXT Smart Home".
- **Fix:** Add a separate SEO title field (≤60 chars) and keep the long H1 where it reads well.

### S5. Medium: meta descriptions too long; category and author descriptions cut mid-word
- 84 of 117 descriptions exceed 160 chars. Among articles, 71 of 83 exceed 160 and 41 exceed 200 (max 298, `/climate-and-comfort/smart-thermostat-gas-ducted-hydronic-heating-australia/`).
- Product descriptions run 257-430 chars.
- All 10 category pages and the author page are hard-truncated at exactly 160 chars mid-word:
  - "…and full alarm sy" (`/categories/security-and-cameras/`)
  - "…the B22 vs E27 fitting question" (`/categories/lighting/`)
  - "…security camer" (`/authors/kritin-curtis/`)
- **Fix:** Write purpose-made descriptions of 120-155 chars. For category and author pages, truncate at a sentence or word boundary rather than at byte 160.

### S6. Medium: thin or empty indexable hub pages
- `/categories/smart-door-locks/` has 0 articles (see C4).
- `/articles/` shows 6 posts per page across 14 pages, so 83 articles need 14 clicks of pagination. Raise the page size (24-30) and rely on category hubs.
- **Product XML sitemap coverage:** only 10 of the product pages linked from `/sitemap/` appear in the XML sitemap. Confirm this is intentional (`getIndexableTopProducts`). If the others are meant to rank, add them; if not, `noindex` them.

### S7. Low: short or brandless static-page titles
- "About" (5 chars), "Contact" (7), "Sitemap" (7), "All Articles" (12), "Privacy Policy" (14), "Kritin Curtis — Articles" (24).
- **Fix:** Use "About NXT Smart Home — Independent AU Smart Home Guides" and similar. For the author page, use "Kritin Curtis — Editor, NXT Smart Home".

### S8. Low: heading level skips on hub pages
- `/products/`, `/products/category/energy-and-solar/` and `/authors/kritin-curtis/` jump from H1 to H3.
- **Fix:** Insert H2 section headings.

### S9. Low: visible date format and ISO leakage
- US date format on an `en-AU` site, and raw ISO strings on the homepage. See C8 and C9.

## Title / meta issue table

| URL | Title (len) | Description (len) | Issue |
|---|---|---|---|
| `/` | Smart Home Guides for Australian Homes \| NXT Smart Home (55) | 205 | Description >160; **no H1** |
| `/articles/` | All Articles (12) | 111 | Title short, no brand |
| `/about/` | About (5) | 171 | Title too short; description >160 |
| `/contact/` | Contact (7) | 80 | Title too short |
| `/sitemap/` | Sitemap (7) | 120 | Title too short |
| `/privacy/`, `/terms/`, `/cookies/`, `/affiliate-disclosure/` | 14-20 chars | 120-154 | Brandless short titles |
| `/how-we-test/` | How We Research and Review (26) | 158 | Short title; slug/title mismatch ("test" vs "research") |
| `/categories/security-and-cameras/` | Security & Cameras — Guides & Reviews (37) | 160 | Description cut mid-word ("alarm sy"); "Reviews" label |
| `/categories/smart-door-locks/` | Smart Door Locks — Guides & Reviews (35) | 160 | Cut mid-word; **empty category indexed** |
| `/categories/lighting/` | Lighting — Guides & Reviews (27) | 160 | Cut mid-word; short title |
| `/categories/energy-and-solar/`, `/entertainment-and-audio/`, `/climate-and-comfort/`, `/hubs-and-platforms/`, `/robot-vacuums/`, `/setup-guides/`, `/buying-guides/` | 31-40 | 160 | All hard-truncated mid-word at 160 |
| `/authors/kritin-curtis/` | Kritin Curtis — Articles (24) | 160 | Cut mid-word ("security camer"); no role in title |
| `/setup-guides/home-assistant-energy-dashboard-solar-export-time-of-use-tariffs/` | 95 | 260 | Title and description far too long |
| `/setup-guides/zigbee-mesh-garage-granny-flat-double-brick-home/` | 90 | 285 | Both too long |
| `/security-and-cameras/wiring-video-doorbell-australian-chime-transformer/` | 89 | 242 | Both too long |
| `/robot-vacuums/robot-vacuum-running-costs-australia/` | 88 | 279 | Both too long |
| `/climate-and-comfort/smart-thermostat-gas-ducted-hydronic-heating-australia/` | 86 | 298 | Both too long (longest description) |
| `/entertainment-and-audio/streaming-box-australia-free-to-air-catch-up-tv/` | 86 | 243 | Both too long |
| `/lighting/smart-lighting-rental-australia-no-wiring/` | 84 | 265 | Both too long |
| `/climate-and-comfort/reverse-cycle-air-conditioner-rooftop-solar-australia/` | 80 | 281 | Both too long |
| `/lighting/smart-light-switches-neutral-wire-older-australian-homes/` | 79 | 272 | Both too long |
| `/lighting/smart-downlights-australian-ceilings-insulation-clearance-rules/` | 78 | 287 | Both too long |
| `/security-and-cameras/local-recording-vs-cloud-subscriptions-security-cameras-australia/` | 77 | 281 | Both too long; cannibalises camera-storage article |
| `/robot-vacuums/robot-vacuum-dock-placement-rental-apartment-no-new-wiring/` | 76 | 257 | Both too long |
| `/climate-and-comfort/make-split-system-aircon-smart-australia/` | 74 | 286 | Both too long |
| `/entertainment-and-audio/movie-night-lighting-scenes-you-can-build-without-touching-the-switchboard/` | 74 | 244 | Both too long; cannibalises home-cinema article |
| `/robot-vacuums/robot-vacuum-local-home-assistant-no-cloud/` | 59 | 294 | Description far too long |
| `/climate-and-comfort/indoor-air-quality-monitor-co2-pm25/` | 61 | 273 | Description too long |
| `/climate-and-comfort/automate-air-con-geofencing/` | 44 | 250 | Description too long |
| `/energy-and-solar/home-battery-rebate-smart-home-ready/` | 61 | 246 | Description too long |
| `/security-and-cameras/reolink-vs-eufy-security-cameras/` | 55 | 239 | Description too long |
| `/products/tp-link-tapo-p110-smart-plug-with-energy-monitoring/` | 70 | 430 | Both too long (longest on site) |
| `/products/bose-smart-soundbar-ultra/` | 44 | 419 | Description too long; AggregateRating from syndicated reviews |
| `/products/ecovacs-deebot-x2-omni-square-robot-vacuum/` | 61 | 306 | Description too long; AggregateRating from syndicated reviews |
| `/products/voltx-e600-portable-power-station/`, `/products/tp-link-tapo-p100-mini-smart-wi-fi-socket-plug/`, `/products/philips-hue-smart-dimmer-switch-v2/`, `/products/tp-link-tapo-smart-temperature-humidity-monitor/` | 52-68 | 351-380 | Descriptions roughly 2× limit |
| `/products/` | Compare Smart Home Devices in Australia \| NXT Smart Home (56) | 157 | `description_echoes_title` (secondary) |

All other article pages: titles 41-73 chars, descriptions 137-246 chars. The pattern is consistent: descriptions run long and titles exceed 60 chars on about half the pages. There are no duplicates and no templated CTAs.

---

## Priority order
1. **C1:** Remove the homepage star ratings and prices (Critical, trust contradiction, rule 5).
2. **S1:** Canonicalise the in-body links and link the 18 orphans.
3. **S2:** Drop AggregateRating from Product JSON-LD.
4. **C3:** Merge the cannibalising pairs.
5. **C4:** Publish the B22 vs E27 and smart-locks guides; noindex the empty category until then.
6. **C2:** Strengthen the author entity and de-bulk publishing.
7. **S3, S4, S5:** Homepage H1, title and description rewrite, sentence-boundary truncation.
8. **C5–C10, S6–S9:** Remaining Medium and Low items.
