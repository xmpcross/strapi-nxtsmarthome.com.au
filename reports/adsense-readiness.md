# AdSense readiness: nxtsmarthome.com.au

Checked 24 September 2026, after AdSense Tasks 0–9 (see `ADSENSE_CHANGES.md`).

## Recommendation: **no-go for now; go after two short steps**

The site-quality problems behind the rejection are fixed. The audit finds no
thin, duplicate or placeholder pages that search engines can index, no
`[VERIFY]` notes and no broken internal links.

The site **cannot be reviewed yet** because AdSense has nothing to verify:
- there is no `google-adsense-account` tag on the pages;
- `/ads.txt` returns 404.

Two steps are needed first:

1. **Set the publisher ID and deploy.**
   - Add `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-2867376862905050` to
     `.env.local`. That is the ID in the `ads.txt` of FXN's other sites, and
     it was used on this site before.
   - Run `./deploy.sh`.
   - This adds the verification tag and `/ads.txt` only. No ad code loads
     until `NEXT_PUBLIC_ADSENSE_SHOW_ADS=1` is also set (see `lib/ads.ts`).
2. **Turn on AdSense Privacy & messaging.** This is the Google-certified
   consent message for EEA, UK and Swiss visitors, set up in the AdSense
   dashboard. The cookies page already says Google's message takes over
   there.

Then resubmit the sitemap, request removal of the old URLs, and apply
(see "Human actions").

## Pass / fail

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Build | ✅ Pass | `npm run build` (into `.next-build`) passes, with no Strapi seed fallback |
| 1 | Indexable pages with a DUPLICATE, FIX, OFF-TOPIC, THIN - EMPTY or THIN verdict | ✅ **0** | `npm run audit:thin`: 63 articles OK; 3 authors OK; 10 products OK. The 188 thin or empty products are noindexed, and so is the 1 thin author (editorial, 0 posts) |
| 1 | Posts blocked by the editorial guard | ✅ 0 | No live post carries `[VERIFY]` (Task 6). No `[editorial-guard]` lines in the build log |
| 1 | `EDITORIAL_GUARD` mode | ✅ block | Not set anywhere, so `guardMode()` returns `block` |
| 2 | Sitemap URLs returning non-200 | ✅ 0 of 98 | Crawl of the production build on :3022 |
| 2 | Sitemap URLs whose robots meta says noindex | ✅ 0 | |
| 2 | Visible "[VERIFY", "Verified purchase", "PROMOTED", "Advertisement", "lorem", "e.g. Security and cameras" | ✅ none | Scripts and styles stripped before matching |
| 2 | Internal links ending non-200 | ✅ 0 of 334 (fixed in this task) | Before the fix, 5 `/product/<slug>` links 404ed. See "Fixed in this task" |
| 2 | Internal links through a redirect | ⚠️ 16 single, 20 two-hop | These are links inside Strapi article text: see "Open items" |
| 2 | Sitemap URLs under 600 words of main content | ℹ️ 15, **no articles** | 10 category hubs (~230–420 words), /articles/, /contact/, /affiliate-disclosure/, /terms/, /how-we-test/ (538), /authors/adrian-thompson/ (570). These are navigation, legal or profile pages. Every article is over 600 |
| 3 | The sitemap lists only the allowed page types | ✅ Pass (fixed in this task) | Static pages, 10 categories, published non-merged articles, the /products/ hub, product categories with ≥3 indexable products, 10 indexable products, 3 authors with posts. The 10 paginated `/articles/page/N/` URLs were removed |
| 4 | AdSense verification tag and ads.txt | ❌ **Fail** | Neither is live because `NEXT_PUBLIC_ADSENSE_CLIENT` is unset (step 1 above) |
| 4 | Privacy and cookies pages cover advertising | ✅ Pass | /privacy/ covers advertising and AdSense; /cookies/ has an Advertising section written for ads off and switches its wording when ads go on (`ADS_ENABLED`) |
| 4 | Certified CMP | ⚠️ Human action | The site's own banner runs Consent Mode v2 with defaults denied. For EEA/UK/CH, Google's Privacy & messaging must be switched on in AdSense (step 2 above) |
| 4 | About and Contact operator details | ✅ Pass (could be stronger) | Every legal page and /about/ names FXN Holdings Limited as the operator. /contact/ has a working form and hello@nxtsmarthome.com.au. No postal address or company number is shown; adding one builds trust but is not required |
| 4 | /how-we-test/ accurate | ✅ Pass | It says every article is research-based and that there are no hands-on tests and no star ratings. That matches the site: ratings are stripped, and no page says "we tested" |

## Fixed in this task (Task 10)

- **Wrong category in a URL now 301s to the canonical URL.**
  - The article route (`app/[category]/[slug]/page.tsx`) resolved by slug
    alone, so `/climate/<slug>/` rendered the same page as
    `/climate-and-comfort/<slug>/`. That page's canonical was already
    correct.
  - 37 internal links in generated article text used the category key
    (`/climate/`, `/energy/`, `/entertainment/` …).
- **`/product/<slug>` now 301s to `/products/<slug>/`** (`next.config.mjs`).
  - `smart-lighting-scene-ideas` linked 5 products at the singular path, and
    all of them 404ed.
- **Paginated listing pages removed from the sitemap** (`app/sitemap.ts`).
  They are ~230-word card grids; page one (`/articles/`) stays, and the
  rest stay crawlable through pagination.

## Open items (not blocking)

- **Links inside generated articles.** The AI writer writes internal links
  with the category key and sometimes `/product/`.
  - Both now redirect, so nothing is broken, but each costs a hop.
  - Fix the generator
    (`/opt/strapi-cms-git/backend/ai-writer-cli/generate-site-post.js`) to
    write `/<category slug>/<slug>/` and `/products/<slug>/`.
  - Optionally rewrite the existing links in Strapi (about 20 posts).
- **Product boxes (CLAUDE.md rule 8).** 15 of 63 live articles have fewer
  than two `::product:` markers (counted in Strapi on 24 Sep 2026). This is
  the site's own rule, not an AdSense requirement.
  - **None:**
    - smart-home-starter-guide-beginners-australia
    - smart-home-privacy-cameras-australia-law
    - video-doorbell-buying-guide-australia
    - smart-bulbs-vs-smart-switches-australia
    - fix-smart-home-wifi-dropouts
    - smart-home-electrical-work-australia-legal
    - second-hand-smart-home-devices-australia
    - smart-home-holiday-house-australia
    - overseas-smart-home-devices-australia
    - smart-home-devices-older-australians
    - future-proof-smart-home-devices-australia
    - smart-home-devices-without-internet
    - smart-plugs-energy-monitoring-australia
  - **One:**
    - smart-speakers-multiroom-audio-australia
    - best-smart-home-platform-australia
- **Author bylines.** Adrian Thompson and Harry Cheng were assigned by the
  generator's random-author setting. If either is not a real person, move
  their posts to a real byline or to NXT Smart Home Editorial: the site
  says it does not publish invented bylines, and reviewers look for this.
- **smart-plugs-energy-monitoring-australia.** Never fact-checked. It
  repeats the safety article and suggests pool pumps on a plug.
- **Buying guide.** It says the Tapo P300 powerboard monitors energy; TP-Link
  AU lists no monitoring.
- **Legal review.** About 40 wording items across Tasks 6–8 are listed for
  a human in `ADSENSE_CHANGES.md` (electrical work, tenancy, privacy,
  consumer law).

## Human actions, in order

1. **Publisher ID.** Confirm `ca-pub-2867376862905050` is the AdSense
   account for this site, then set it in `.env.local` and deploy. Check that
   `/ads.txt` returns `google.com, pub-2867376862905050, DIRECT,
   f08c47fec0942fa0` and that the tag is on every page.
2. **AdSense.** Add nxtsmarthome.com.au as a site if it is not listed, and
   switch on Privacy & messaging (the European regulations message).
3. **Search Console.**
   - Resubmit `https://nxtsmarthome.com.au/sitemap.xml`.
   - Request removal, or let them drop, for these URLs, all of which now
     301 to their survivors:
     - `/security-and-cameras/how-to-keep-security-cameras-running-through-a-blackout-or-nbn-outage/`
     - `/energy-and-solar/smart-plugs-energy-monitors-cut-power-bill-australia/`
     - `/lighting/smart-light-switches-no-neutral-wire-australia/`
     - `/robot-vacuums/robot-vacuum-buying-guide-australian-homes-pets/`
     - `/buying-guides/renter-smart-home-devices-no-drilling/`
     - `/setup-guides/reverse-cycle-split-system-voice-app-control-without-replacing/`
     - the 6 woodworking-router product URLs from Task 1
4. **Wait 2–4 weeks** for Google to recrawl the changed pages.
   - Search Console "Pages" should show the noindexed product listings as
     "Excluded by 'noindex' tag" and the merged URLs as redirects.
5. **Request review in AdSense.**
6. **Only after approval:** set `NEXT_PUBLIC_ADSENSE_SHOW_ADS=1` and deploy.
   The site's advertising wording switches automatically.

## Re-running these checks

- `npm run audit:thin` writes `reports/thin-content-audit.csv`.
- The crawl was a one-off script against a production build on
  127.0.0.1:3022, not kept in the repo. It fetched `/sitemap.xml`, every
  URL in it, and every internal link on those pages. It checked status,
  redirect chains, robots meta, main-content word count and the banned
  strings.
