# nxtsmarthome.com.au — AI fix prompts (AdSense / thin content)

Each task below is a **self-contained prompt**. Open Claude Code (or a similar agent) in the repo root, paste **one task at a time**, review the result, then move to the next. Run them in order: Task 0 builds the checker the others use to confirm they worked.

Inputs these prompts rely on (all in the repo root):

- `thin-content-audit.csv` — every page with verdict, action and word counts (from the 24 Sep 2026 audit)
- `ADSENSE_REMEDIATION_PROMPT.md` — the wider AdSense audit
- `CLAUDE.md` — editorial rules (must be obeyed)

| # | Task | Where the change lands | Pages affected |
|---|---|---|---|
| 0 | Build a repeatable thin-content audit script | repo | all |
| 1 | Delete off-topic products | repo | 6 |
| 2 | Product quality gate (noindex thin / empty products) | repo | 199 |
| 3 | Fix misleading product reviews | repo | 80 |
| 4 | Write real editorial for linked products (batches) | repo `content/products/` | ~10 per run |
| 5 | Guard against publishing `[VERIFY]` notes | repo | all posts |
| 6 | Resolve `[VERIFY]` notes in 24 articles (batches) | Strapi | 24 |
| 7 | Merge 6 duplicate article clusters | Strapi + repo redirects | 13 |
| 8 | Expand borderline articles, fix structure | Strapi | 3 |
| 9 | Author pages clean-up | repo (+ Strapi) | 2 |
| 10 | Final verification before reapplying | repo | all |

---

## Shared context (every prompt tells the agent to read this)

```text
CONTEXT — nxtsmarthome.com.au
- Next.js 15 App Router running as a Node server (`next start`, 127.0.0.1:3013) behind nginx + Cloudflare.
- Articles come from Strapi (cms.fxnstudio.com, collection `nxtsmarthome-posts`) via lib/strapi.ts -> lib/content.ts, ISR 5 min.
  content/articles/*.md is history only; the live site does not read it.
- Products: public/data/products.json (205 items) + curated overrides in content/products/*.md; logic in lib/products.ts;
  pages in app/products/[slug]/page.tsx, hub in app/products/page.tsx, sitemap in app/sitemap.ts.
- Editorial rules in CLAUDE.md are mandatory: no fabricated testing, no unearned star ratings, Australian English,
  no keyword stuffing, legal/safety claims must be sourced.
- Goal: Google AdSense approval. The site was rejected; the audit found thin product pages, duplicate articles and
  visible [VERIFY] editorial notes. thin-content-audit.csv lists every page with a verdict and action.
- Windows dev machine (PowerShell), Node 22 per .nvmrc. Use `npm run build` (never `npx next build`). Do NOT deploy.
- Strapi writes: use STRAPI_URL and a write-capable STRAPI_TOKEN from .env.local. Never print the token. Before
  changing any Strapi entry, save its full JSON to exports/strapi-backup/<slug>-<timestamp>.json. Detect the Strapi
  version first (v5 uses documentId in /api/<collection>/<documentId>; v4 uses numeric id).
- Every task ends with: run the build, run `npm run audit:thin` (once Task 0 exists), and append a dated section to
  ADSENSE_CHANGES.md listing files changed, Strapi entries changed (slug + backup path) and anything left for a human.
```

---

## Task 0 — Build the thin-content audit script

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

TASK: Create scripts/audit-thin-content.mjs and add `"audit:thin": "node --env-file-if-exists=.env.local scripts/audit-thin-content.mjs"` to package.json.

The script must reproduce thin-content-audit.csv from source data (not the live site), so it can be re-run after every fix:
1. Articles: fetch all published posts from Strapi (same query shape as lib/strapi.ts, paginate until done).
   For each post compute: body word count (markdown stripped), FAQ word count, H2 count, count of "[VERIFY" (case-insensitive)
   in content/excerpt/keyTakeaways/FAQ, and placeholder hits ("TODO", "TBD", "lorem", "Tag one", "One or two sentences that would",
   "What they cover, e.g.").
   Duplicate detection: title-token Jaccard >= 0.5 (tokens > 3 chars) OR 5-word-shingle body Jaccard >= 0.30 -> report the pair.
   Also report any slug listed as a "from" in data/redirects-adsense.json (created in Task 7) that is still published.
2. Products: load products via the same functions the site uses (lib/products.ts; if it is TS-only, replicate the merge of
   products.json + content/products/*.md in the script). original_words = words in bestFor + shortDescription +
   cmsDescriptionHtml (HTML stripped) + curated markdown body + pros + cons. Flag: no bestFor, no pros/cons, reviews whose
   source is not an Australian retailer, category mismatch (e.g. slug contains "router"/"trimmer" in hubs-and-platforms).
   Also report whether each product is currently indexable (mirror the rule Task 2 adds; until then every product is indexable).
3. Authors: posts per author; flag 0-post authors and duplicate display names ("K Curtis" vs "Kritin Curtis").
4. Verdicts, same as the CSV: article DUPLICATE / FIX ([VERIFY]) / BORDERLINE (<800 body words) / OK;
   product OFF-TOPIC / THIN - EMPTY (<50 original words) / THIN (<300) / OK (>=300 and has bestFor + pros + cons);
   author THIN (0 posts or <150 words).
5. Output: write reports/thin-content-audit.csv (same columns as the root CSV) and print a summary table by type and verdict,
   plus "INDEXABLE THIN PAGES: n". Exit code 1 if any indexable page is DUPLICATE, FIX, OFF-TOPIC or THIN - EMPTY
   (so it can gate deploys later).

Run it and compare the counts with the root thin-content-audit.csv (expected today: 24 FIX, 9 DUPLICATE, 2 BORDERLINE,
6 OFF-TOPIC, 37 THIN - EMPTY, 162 THIN, 2 author THIN). Explain any difference. Do not change any content in this task.
```

---

## Task 1 — Delete the 6 off-topic products

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

TASK: Remove products that are not smart-home devices. They are woodworking routers imported because a search matched "router":
  bosch-pof-1200-ae-1200w-corded-router
  ryobi-400w-trim-router-rtr400-s
  ryobi-1600w-plunge-router-rrt1600-s
  ozito-850w-router
  ozito-pxc-18v-brushless-trim-router-pxblts-018
  electric-wood-trimmer-hand-router-trimmer

Steps:
1. Remove them from public/data/products.json and any content/products/*.md, product images under public/images/products/,
   and any search index / cache the build generates from them.
2. grep the repo AND all published Strapi posts for "::product:<slug>::" markers or links to these slugs; list them. Remove
   markers from repo drafts; for Strapi posts list them in ADSENSE_CHANGES.md (do not edit Strapi in this task).
3. Add permanent redirects for /products/<slug>/ -> /products/category/hubs-and-platforms/ in data/redirects-adsense.json
   (create it: [{ "from": "...", "to": "...", "reason": "..." }]) and wire that file into next.config.mjs `redirects()`
   (permanent: true, trailing slashes preserved). Also make scripts/gen-redirects.mjs include it so nginx/_redirects stay in sync.
4. Find the root cause in the product import scripts (scripts/fetch-top-products.mjs, import-category-products.mjs,
   generate-full-catalog.mjs, etc.): add a category guard / negative keyword list (router -> only networking routers, exclude
   "trim", "plunge", "wood", "corded router", power-tool brands in hubs category) so this cannot recur. Show the diff.
5. Build, run `npm run audit:thin`, confirm OFF-TOPIC = 0, update ADSENSE_CHANGES.md.
```

---

## Task 2 — Product quality gate (noindex thin and empty products)

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

PROBLEM: All 205 product pages are indexable but none has substantial original content: 37 have <50 original words,
the rest ~130-190 words of templated text plus scraped specs/prices/reviews. To Google/AdSense this is "low value content"
and it outnumbers the ~55 real articles 4:1.

TASK: Add one quality rule and apply it everywhere.
1. In lib/products.ts export `isIndexableProduct(product): boolean` = true ONLY if ALL hold:
   - product has a curated file in content/products/<slug>.md
   - bestFor is non-empty, pros has >= 3 items, cons has >= 2 items
   - original editorial words (curated body + bestFor + pros + cons + shortDescription; NOT scraped description, specs,
     retailer data or reviews) >= 300
   Export `originalWordCount(product)` too, and unit-check it on 3 products in a quick script.
2. app/products/[slug]/page.tsx generateMetadata: robots { index: false, follow: true } when !isIndexableProduct.
   Keep the page working for visitors. For non-indexable products show a small neutral label near the title:
   "Price listing — not a review. See our guides for recommendations." linking to the matching category article list.
3. Products with < 50 original words (THIN - EMPTY in thin-content-audit.csv, 37 items): additionally remove them from
   the /products/ hub, category product lists, RelatedProducts and ProductBox rendering, so no internal link points at an
   empty page. Their URLs should still resolve (noindex) so existing links do not 404.
4. app/sitemap.ts: include only indexable products and only product-category pages that contain >= 3 indexable products.
5. /products/ hub and /products/category/* pages: if the page lists zero indexable products, set noindex, follow.
6. Replace the templated product meta description ("Where to buy X in Australia. Compare prices…") with one built from
   bestFor + first sentence of the curated verdict when available; keep the old template only for noindexed products.
7. Build, run `npm run audit:thin`: report how many product URLs are now indexable (expected: very few, possibly only the
   3 curated ones) and confirm the sitemap count. Update ADSENSE_CHANGES.md with the rule and the counts.
```

---

## Task 3 — Fix misleading product reviews and ratings

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

PROBLEM: 80 products show syndicated customer reviews; 67 of them include reviews from overseas or unrelated stores
(bestbuy.ca, homedepot.com, walmart.com, shopee.com.my, aliexpress.com, lazada.sg, kaufland.*, etc.) on an Australian
site, each card labelled "Verified purchase", and aggregate stars like "5.0 (8 reviews)". Star ratings also appear on the
products hub, which contradicts CLAUDE.md rule 5 and the /how-we-test/ page.

TASK:
1. components/ProductReviews.tsx: remove the "Verified purchase" badge entirely.
2. Add an allow-list of Australian retailer domains in one place (e.g. lib/review-sources.ts): jbhifi.com.au,
   thegoodguys.com.au, harveynorman.com.au, bunnings.com.au, officeworks.com.au, amazon.com.au, ebay.com.au, binglee.com.au,
   myer.com.au, appliancesonline.com.au, betta.com.au, costco.com.au, mwave.com.au, mightyape.com.au, kogan.com (AU),
   plus the brand's own .com.au site. Only reviews from allow-listed sources render. Brand global sites (ring.com, sonos.com,
   eufylife.com) are allowed only if clearly labelled "via <brand> (global store)".
3. Hide the reviews block when fewer than 5 allowed reviews remain. Never show an aggregate score from fewer than 20 allowed
   reviews. Recompute any score/histogram from the allowed subset only — never show the Google Shopping catalogue score.
4. Heading for the block: "What customers say at <retailer(s)>" with a one-line note: "Reviews written by customers of
   these retailers — not by NXT Smart Home, and not a test result."
5. Products hub, ProductCard, ProductGrid, RelatedProducts: remove star ratings and review counts from cards. Remove any
   "PROMOTED" badge unless backed by a real paid placement flag; if so, label "Sponsored" and use rel="sponsored nofollow".
6. Remove Product/AggregateRating structured data for any product whose reviews block is hidden (check lib/seo.ts / JsonLd).
7. Build, spot-check 3 product pages in `npm run dev` (list which), run `npm run audit:thin`, update ADSENSE_CHANGES.md
   with how many products still show reviews.
```

---

## Task 4 — Write genuine editorial for linked products (run repeatedly, 10 per run)

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first. CLAUDE.md rules 3, 5 and 7 are critical here.

GOAL: Turn the products that articles actually link to into indexable pages with real, useful editorial, so the product
section adds value instead of thin listings. We have NOT hands-on tested these devices — the writing must be honest
research-based analysis, never implied testing.

1. Build the priority list: every product referenced by a "::product:<slug>::" marker in a published Strapi post (fetch
   posts; count references per product). Exclude products that already pass isIndexableProduct (Task 2). Sort by reference
   count desc. Take the next 10 that are not done yet. Print the list before writing.
2. For each product, research current Australian facts (AU model name/variant, plug type/voltage, hub or protocol
   requirements, Matter/Thread/Zigbee support, subscription costs in AUD, AU warranty/distributor, which AU retailers stock it).
   Use the manufacturer's AU site and major AU retailers. Record source URLs.
3. Write content/products/<slug>.md following the format of the existing curated files (content/products/aqara-hub-m3.md,
   philips-hue-bridge.md, apple-homepod.md — copy their front matter shape exactly):
   - bestFor: one specific sentence (who, which home, which ecosystem)
   - pros: 3-5 specific points; cons: 2-4 honest points (subscription lock-in, hub required, no local control, etc.)
   - body 300-500 words, Australian English: what it does, who it suits and who should skip it, AU-specific notes,
     ecosystem compatibility, running costs, 2-3 alternatives already in our catalogue with one line each, and a
     "Sources" list of the URLs used.
   - NO rating, NO price, NO "we tested"/"in our testing"/"hands-on" wording. Anything you cannot confirm: leave it out
     (do NOT write [VERIFY] into rendered text); log it in reports/product-editorial-todo.md instead.
4. Check each file renders (npm run dev), passes isIndexableProduct, and link it back from any matching article section
   only if that article genuinely discusses it (rule 8).
5. Run `npm run audit:thin`; append to ADSENSE_CHANGES.md: products completed this run, sources used, open questions.
   Stop after 10 products and tell me the next 10 in the queue.
```

---

## Task 5 — Stop `[VERIFY]` and placeholder text ever reaching readers

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

PROBLEM: 24 live articles show raw editorial notes such as "[VERIFY current requirements with your state regulator]" to
readers. CLAUDE.md rules 6/7 tell writers to add [VERIFY] tags, but nothing stops tagged posts from publishing.

TASK (code only — content is fixed in Task 6):
1. In lib/content.ts (where Strapi posts are adapted) add `editorialIssues(post): string[]` that detects, case-insensitive,
   in content, excerpt, keyTakeaways and FAQ: "[VERIFY", "TODO", "TBD", "lorem ipsum", "Tag one", "Tag two",
   "One or two sentences that would", "What they cover, e.g.", "A direct answer in two to four sentences".
2. Posts with any issue: exclude from getAllArticles() listings, category pages, related posts, search index
   (scripts/build-search-index.mjs), homepage and sitemap; their article route returns notFound(). Log slug + issue at
   build/revalidate time with a clear "[editorial-guard]" prefix.
   Add an env override EDITORIAL_GUARD=warn that keeps them live but logs (so I can choose when to switch it on), default = block.
3. Update CLAUDE.md rules 6 and 7: [VERIFY] tags are allowed in drafts only; a post must have zero [VERIFY] tags before it
   is published, and the site will refuse to render tagged posts. Unverifiable claims must be removed or rewritten to point
   readers to the official source (e.g. "check your state's electrical safety regulator").
4. Build with EDITORIAL_GUARD=warn and print the list of posts that would be blocked (expected: the 24 FIX/DUPLICATE articles
   with visible notes in thin-content-audit.csv). Do not switch the default to block in production until Task 6 is done —
   write that as a step in ADSENSE_CHANGES.md.
```

---

## Task 6 — Resolve the `[VERIFY]` notes in Strapi (run repeatedly, 4 articles per run)

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

TASK: Clean the editorial notes out of the published articles in Strapi, properly — by verifying or rewriting each claim,
not by deleting the tag and leaving an unverified statement.

1. From thin-content-audit.csv take the next 4 articles (verdict FIX, highest visible_verify first) that are NOT in a
   duplicate cluster (Task 7 handles those). Worst first:
   outdoor-tvs-projectors-speakers-australian-summer (18), smart-zoning-ducted-air-conditioning-cost-australia (17),
   smart-thermostat-gas-ducted-hydronic-heating-australia (16), robot-vacuum-running-costs-australia (16),
   reverse-cycle-air-conditioner-rooftop-solar-australia (14), zigbee-mesh-garage-granny-flat-double-brick-home (13),
   robot-vacuum-dock-placement-rental-apartment-no-new-wiring (13), streaming-box-australia-free-to-air-catch-up-tv (12),
   local-recording-vs-cloud-subscriptions-security-cameras-australia (12), smart-downlights-australian-ceilings-insulation-clearance-rules (12),
   home-assistant-energy-dashboard-solar-export-time-of-use-tariffs (11), wiring-video-doorbell-australian-chime-transformer (11),
   bathroom-humidity-sensor-exhaust-fan-automation-australia (9), movie-night-lighting-scenes-you-can-build-without-touching-the-switchboard (8),
   robot-vacuum-local-home-assistant-no-cloud (7), smart-lighting-rental-australia-no-wiring (7), second-hand-smart-home-devices-australia (7),
   what-not-to-plug-into-a-smart-plug-australia (7), smart-plug-buying-guide-australia (6), smart-home-holiday-house-australia (6),
   smart-home-hub-buying-guide-australia (5), smart-home-devices-older-australians (4), overseas-smart-home-devices-australia (2),
   future-proof-smart-home-devices-australia (1).
2. For each article: fetch it from Strapi, back it up (exports/strapi-backup/), and list every [VERIFY …] occurrence with the
   sentence around it.
3. For each occurrence, research it (official AU sources first: state electrical safety regulators, AEMO/AER/energy retailers
   for tariffs, ACCC/ACL, OAIC, Standards Australia summaries, manufacturer AU sites, AU retailers) and choose ONE:
   a) VERIFIED — rewrite the sentence with the confirmed fact and add an inline link to the source;
   b) VARIES — rewrite as a range or as guidance ("prices vary by retailer — check current pricing at …"), no fake precision;
   c) UNVERIFIABLE / legal — remove the specific claim and point readers to the authority ("rules differ by state — check
      with your state's electrical safety regulator before wiring anything to mains"). Never state law as settled.
   Remove the tag in every case. Never invent numbers, test results or quotes.
4. Also fix, while you are in the article: any placeholder text, and set dateModified to today.
5. Show me a before/after diff per article and a table (occurrence -> decision a/b/c -> source URL). WAIT for my "approve"
   before writing to Strapi. After approval, PUT the updated content via the Strapi API, then re-fetch and confirm zero
   "[VERIFY" remain.
6. Log in ADSENSE_CHANGES.md: articles done, backup paths, legal claims that a human should still review
   (anything about electrical work, surveillance/privacy law, tenancy). Tell me the next 4 in the queue.
```

---

## Task 7 — Merge the 6 duplicate article clusters

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

PROBLEM: 6 clusters of articles target the same search intent — two even share an identical title. This looks like scaled
content and splits ranking signals. Suggested survivor (KEEP) and pages to fold in (MERGE):

1. KEEP security-and-cameras/keep-security-cameras-running-blackout-nbn-outage
   MERGE security-and-cameras/how-to-keep-security-cameras-running-through-a-blackout-or-nbn-outage   (identical title)
2. KEEP energy-and-solar/smart-plugs-energy-monitoring-australia
   MERGE energy-and-solar/smart-plugs-energy-monitors-lower-power-bill-australia
   MERGE energy-and-solar/smart-plugs-energy-monitors-cut-power-bill-australia
   (keep energy-and-solar/smart-plug-buying-guide-australia and what-not-to-plug-into-a-smart-plug-australia separate —
   different intent — but make sure they cross-link and do not repeat sections)
3. KEEP lighting/smart-light-switches-no-neutral-wire-australia
   MERGE lighting/smart-light-switches-neutral-wire-older-australian-homes
4. KEEP robot-vacuums/robot-vacuum-buying-guide-australia
   MERGE robot-vacuums/robot-vacuum-buying-guide-australian-homes-pets   (fold in as a "Homes with pets" section)
5. KEEP buying-guides/smart-home-for-renters-australia
   MERGE buying-guides/renter-smart-home-devices-no-drilling
6. KEEP climate-and-comfort/make-split-system-aircon-smart-australia
   MERGE setup-guides/reverse-cycle-split-system-voice-app-control-without-replacing

If Google Search Console data is available to you (ask me for an export), prefer the URL with more impressions as the
survivor; otherwise use the list above.

For each cluster:
1. Fetch all posts from Strapi, back them up, and produce a section map: which H2s/facts/FAQ items in the MERGE posts are
   NOT already covered by the KEEP post.
2. Draft the merged KEEP article: integrate the unique material into logical sections (no stacked near-duplicate sections),
   combine and de-duplicate FAQs (max 6), keep every product marker that the text genuinely discusses, resolve any
   [VERIFY] notes using the Task 6 method (a/b/c + sources), Australian English, target 1,500-2,200 words. Keep the KEEP
   post's slug and original publishDate; set dateModified to today; pick the stronger title (no identical titles anywhere).
3. Show me the merged draft + section map. WAIT for "approve". Then update the KEEP post in Strapi and set each MERGE post
   to draft/unpublished (do not delete).
4. Add 301s MERGE -> KEEP to data/redirects-adsense.json (wired into next.config.mjs redirects() and gen-redirects.mjs by
   Task 1; create the wiring if Task 1 was skipped).
5. Search all published posts for internal links to MERGE URLs and list them; after my approval update those links in
   Strapi to the KEEP URL.
6. Build, run `npm run audit:thin` (DUPLICATE must drop to 0 for finished clusters), update ADSENSE_CHANGES.md with the
   redirect table and backup paths. Do one cluster per approval round.
```

---

## Task 8 — Expand borderline articles and fix structure

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

TASK: Improve three published Strapi articles:
1. buying-guides/where-to-buy-smart-home-australia (718 body words)
2. hubs-and-platforms/thread-vs-matter-difference (744 body words)
3. buying-guides/smart-home-hub-buying-guide-australia (1,460 words but only 1 H2 heading; also has 5 [VERIFY] notes)

For 1 and 2: expand to 1,100-1,500 words with genuinely new, useful Australian detail — no padding, no repeating the intro.
 - where-to-buy: retailer-by-retailer comparison (JB Hi-Fi, The Good Guys, Harvey Norman, Bunnings, Officeworks, Amazon AU,
   eBay AU): range, returns/ACL handling, price-match policies, click-and-collect, grey imports and warranty risk; a short
   decision table. Cite each retailer's policy page.
 - thread-vs-matter: plain-English analogy, how they work together, which AU-available devices act as Thread border routers
   (link products in our catalogue only if discussed), what "Matter over Wi-Fi vs Thread" means for buyers, common setup
   problems. Cite the CSA / Thread Group pages.
For 3: restructure into 6-9 descriptive H2s (e.g. Do you need a hub?, Protocols, Ecosystem, Local control, AU availability,
 Shortlist, FAQ), keep the content, resolve [VERIFY] notes with the Task 6 method.

Rules: Australian English, no ratings, no "we tested", sources linked inline, add/refresh "The short answer" (keyTakeaways)
and 3-5 FAQs that answer real questions. Back up each post, show before/after, WAIT for "approve", then update Strapi and
set dateModified. Run `npm run audit:thin` and update ADSENSE_CHANGES.md.
```

---

## Task 9 — Author pages clean-up

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

PROBLEM: /authors/k-curtis/ (19 posts) and /authors/kritin-curtis/ (0 posts, "nothing published yet") are the same person.
/authors/nxt-smart-home-editorial/ has ~113 words. Some author records have placeholder roles
("What they cover, e.g. Security and cameras") in content/authors/*.md.

TASK:
1. Inspect lib/authors.ts and scripts/fetch-authors.mjs to see how Strapi author names map to slugs. Make the canonical
   slug kritin-curtis with display name "Kritin Curtis"; map "K Curtis" to it so all 19 posts show under one profile.
   If the fix must happen in Strapi (author record name), list the exact change for me instead of doing it.
2. 301 /authors/k-curtis/ -> /authors/kritin-curtis/ via data/redirects-adsense.json.
3. Any author page with 0 published posts: noindex, follow, and exclude from sitemap and "Hottest authors" widgets.
4. Render no role line when role is empty or starts with "What they cover". Remove the placeholder role text from
   content/authors/*.md (leave role empty rather than inventing one) and list the roles I should fill in.
5. Delete content/authors/contributor-*.md.template only if nothing references them (grep first).
6. Build, run `npm run audit:thin` (author THIN should be 0 indexable), update ADSENSE_CHANGES.md.
```

---

## Task 10 — Final verification before reapplying to AdSense

```text
Read CLAUDE.md, README.md and the "Shared context" block in AI_FIX_PROMPTS.md first.

TASK: Verify the whole site is ready and give me a go / no-go.
1. `npm run build` and `npm run audit:thin`. Required: 0 indexable pages with verdict DUPLICATE, FIX, OFF-TOPIC,
   THIN - EMPTY or THIN; 0 posts blocked by the editorial guard. If EDITORIAL_GUARD is still "warn", switch the default to block.
2. Start the production build locally (`npm run start` on port 3013, or `npm run dev`) and crawl it with a small script:
   every URL from /sitemap.xml plus every internal link found on those pages. Report: non-200s, redirect chains, pages whose
   <meta name="robots"> says noindex but that appear in the sitemap, sitemap URLs with < 600 words of main content, visible
   text containing "[VERIFY", "Verified purchase", "PROMOTED", "Advertisement", "lorem", "e.g. Security and cameras".
3. Confirm the sitemap contains only: static pages, category pages, published non-merged articles, indexable products,
   product categories with >= 3 indexable products, authors with posts.
4. Check ADSENSE_REMEDIATION_PROMPT.md items are done or explicitly listed as open: AdSense script + ads.txt, privacy /
   cookies advertising sections, certified CMP, About/Contact operator details, /how-we-test/ accuracy.
5. Write reports/adsense-readiness.md: pass/fail table, remaining human actions (Strapi edits, AdSense Privacy & messaging,
   Search Console sitemap resubmit + URL removals for deleted/merged pages, wait 2-4 weeks), and a go / no-go recommendation.
```
