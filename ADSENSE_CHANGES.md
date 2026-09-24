# AdSense re-application: changes, 24 September 2026

The site was rejected by AdSense, most likely for "low value content". This
file lists every change made for re-application, every file touched, and
everything that still needs a person, in Strapi or in the AdSense dashboard.

**Status:** code complete. Eight `npm run build` runs passed, one after each
task: tasks 1+2 were built together, and task 3 needed a second run to fix a
syntax error. The build went into `.next-build`, as `deploy.sh` does, because a
plain `next build` overwrites the `.next` the live server is running from.
Nothing is deployed and nothing is committed. `./deploy.sh` refuses a dirty
tree, so commit first, or run `./deploy.sh --allow-dirty`.

## Read this first

1. **34 of the 64 published posts are now held back from the site.** They
   contain `[VERIFY` fact-check tags. Once deployed, each returns 404 and drops
   out of every listing, search result and sitemap, until its tags are cleared
   in Strapi. That leaves **29 live articles** (64 − 34 held back − 1 more
   merged away). No code change is needed to bring a post back: clear its
   markers and it reappears within about 5 minutes. The full list is in
   [Strapi to-do](#strapi-to-do).
2. **Two merge survivors are themselves held back.**
   `keep-security-cameras-running-blackout-nbn-outage` and
   `smart-light-switches-neutral-wire-older-australian-homes` both carry
   `[VERIFY]` tags. Their 301s land on a 404 until those two posts are
   fact-checked. Fix these two first.
3. **Live search already reflects the guard.** `prebuild` rewrote
   `public/search-index.json`, and `next start` serves `public/` live. The
   held-back posts' pages still work until you deploy.
4. **All 205 product pages are now `noindex`.** None meets the bar in task 3:
   the 3 curated files in `content/products/` don't share a slug with any
   `/products/` page, and each has under 150 words of editorial text (91–131).
   The pages stay up for visitors, labelled "Price listing — not a review".

## 1. Unfinished content is not published

- **`lib/editorial-guard.mjs`** (new) holds the markers: `[VERIFY` (any case),
  `TODO` and `TBD` (upper case only, so prose isn't caught), `lorem`,
  `What they cover, e.g.`, `Tag one`, `Tag two` and
  `One or two sentences that would`. It checks the body, excerpt,
  keyTakeaways and every FAQ question and answer. The site, the search index
  and the audit all share this one definition.
- **`lib/content.ts`**: `getAllArticles()` drops held-back and merged posts
  before anything is built. Every listing, category page, related-posts block,
  author page, home section and the sitemap reads from it, so all of them
  inherit the guard. `getArticle()` then misses, and the article page returns
  `notFound()`. Held-back slugs are logged with their marker counts at build
  time, and at runtime whenever the set changes.
- **`scripts/build-search-index.mjs`** applies the same guard and merge
  exclusion.
- **`scripts/audit-content.mjs`** (new) and **`npm run audit:content`**
  (`-- --json` for machine output). Per post, it reports:
  - slug, title and author;
  - word count;
  - `[VERIFY]` count and other placeholder hits;
  - publishDate, Strapi createdAt and whether the post is backdated;
  - status: ok, BLOCKED or merged.

  It also prints duplicate clusters and totals. It is read-only.

## 2. Duplicates merged

The detector is in `scripts/audit-content.mjs`. It flags a pair when
title-token Jaccard is at least 0.6 (case and punctuation normalised, stop
words dropped) or 5-word-shingle body Jaccard is at least 0.4. Across all 64
posts it found three clusters: blackout/NBN, power bill and neutral wire. The
other three clusters you listed share topics but not wording, so they fall
below both thresholds. I merged them anyway, as instructed.

**Survivor rule:** keep the longer article, except where the longer one is held
back by `[VERIFY]` and the shorter one is live. That exception applies only to
the split-system pair.

**Mechanism:** the 301 map is in `data/merged-articles.json`. It feeds:
- `lib/merged-articles.mjs`, shared by the site and the scripts;
- `scripts/gen-redirects.mjs`, which writes nginx 301s into
  `public/_redirects.map`. The live vhost includes that file, and `deploy.sh`
  reloads nginx;
- the article route itself, which answers requests that bypass nginx. Next
  sends these as 308, which Google treats as permanent, the same as a 301.

Merged-away slugs are excluded everywhere (listings, search and sitemap).

### Redirect map

| From (301) | To |
|---|---|
| `/security-and-cameras/how-to-keep-security-cameras-running-through-a-blackout-or-nbn-outage/` | `/security-and-cameras/keep-security-cameras-running-blackout-nbn-outage/` ⚠ survivor held back |
| `/energy-and-solar/smart-plugs-energy-monitors-cut-power-bill-australia/` | `/energy-and-solar/smart-plugs-energy-monitors-lower-power-bill-australia/` |
| `/lighting/smart-light-switches-no-neutral-wire-australia/` | `/lighting/smart-light-switches-neutral-wire-older-australian-homes/` ⚠ survivor held back |
| `/robot-vacuums/robot-vacuum-buying-guide-australian-homes-pets/` | `/robot-vacuums/robot-vacuum-buying-guide-australia/` |
| `/setup-guides/reverse-cycle-split-system-voice-app-control-without-replacing/` | `/climate-and-comfort/make-split-system-aircon-smart-australia/` |
| `/buying-guides/renter-smart-home-devices-no-drilling/` | `/buying-guides/smart-home-for-renters-australia/` |
| `/authors/k-curtis/` | `/authors/kritin-curtis/` (author merge, task 4) |

Each rule is written with and without the trailing slash.

### Merge plan

The H2s listed under each pair are the losing article's sections that the
survivor doesn't cover. Move them into the survivor in Strapi, then unpublish
the loser. The redirect keeps working after the loser is unpublished.

1. **Blackout/NBN.** Keep `keep-security-cameras-running-blackout-nbn-outage`
   (1,248 words, 16 `[VERIFY]`). From `how-to-keep-…-nbn-outage` (1,155 words),
   move **"Test it before you need it"** into the survivor's "A practical setup
   checklist". Skip "Step four: know the moment it happens"; it duplicates
   "Know when the power comes back".
2. **Power bill.** Keep `smart-plugs-energy-monitors-lower-power-bill-australia`
   (1,078 words). From `…-cut-power-bill-australia` (978 words), move **"Where
   Your Power Bill Actually Goes"** and **"Renters and Strata Considerations"**.
   For "What to Check Before You Buy", link to `smart-plug-buying-guide-australia`
   rather than copying it.
   - Checked and kept separate: `smart-plugs-energy-monitoring-australia`, a
     sceptical "do they save money?" angle (title similarity 0.18, body 0.00).
   - Checked and kept separate: `smart-plug-buying-guide-australia`, a
     pre-purchase checklist (title 0.05, body 0.00).
3. **Neutral wire.** Keep `smart-light-switches-neutral-wire-older-australian-homes`
   (1,358 words, 12 `[VERIFY]`). From `…-no-neutral-wire-australia` (1,295
   words), move **"Renting, or not ready to call an electrician"** and **"The
   questions to ask before you buy"**. Fold any extra detail from "Check the
   ceiling first" into the survivor's "Option 3: Put the smarts in the ceiling
   instead".
4. **Robot vacuums.** Keep `robot-vacuum-buying-guide-australia` (1,135 words,
   live). From `…-australian-homes-pets` (625 words), move **"What actually
   matters for pet hair"** and **"Corners, edges and bigger floorplans"**. Its
   mopping and Australian-specifics sections overlap and can be dropped.
5. **Split system.** Keep `make-split-system-aircon-smart-australia` (1,032
   words, live). The other post is longer (1,368 words) but has 4 `[VERIFY]`
   tags. From `reverse-cycle-split-system-voice-app-control-without-replacing`:
   - move **"Where to mount it, and why that decides whether this works"**;
   - move **"Step-by-step setup"**;
   - move **"What this approach won't do — and when to call a professional"**;
   - fold "Choosing a controller: budget puck, mid-range, or sensor-led" into
     the survivor's "Option 1: an infrared bridge".

   Resolve the `[VERIFY]` claims in whatever you move before publishing.
6. **Renters.** Keep `smart-home-for-renters-australia` (1,020 words, live).
   From `renter-smart-home-devices-no-drilling` (885 words), move **"Sticks on
   with adhesive"**, **"Screws into what is already there"** and **"What to
   leave alone"**.
   - Checked and kept separate: `lighting/smart-lighting-rental-australia-no-wiring`,
     which is renters' lighting specifically, in a different category (title
     0.26, body 0.00). Link it from the survivor.

## 3. Products

- **Noindex rule.** It lives in `lib/products.ts` as `productEditorial()` and
  `getIndexableTopProducts()`. A product is indexable only with all three:
  - a curated file in `content/products/` with the same slug;
  - bestFor, pros and cons all filled in;
  - at least 150 words of our own text across the note (HTML comments
    excluded), bestFor, pros and cons.

  Everything else gets `robots: noindex, follow`, is left out of
  `sitemap.xml`, and shows a **"Price listing — not a review"** label on the
  page (`app/products/[slug]/page.tsx`).
- **Reviews** (`components/ProductReviews.tsx` and the new
  `lib/review-sources.ts`):
  - **"Verified purchase" removed.**
  - **Only named Australian retailers kept:** JB Hi-Fi, The Good Guys, Harvey
    Norman, Bunnings, Officeworks, Myer, Bing Lee, Appliances Online, Betta,
    Costco AU, Mitre 10, Mwave and Mighty Ape. The imported reviews had come
    from all over the world, including AliExpress, Shopee, Lazada, Etsy, US,
    UK and EU chains and brand stores.
  - **The block hides entirely** when no AU retailer reviews remain.
  - **Heading:** "Customer reviews from <retailers>", then "Not written or
    tested by NXT Smart Home."
  - **Aggregate score:** now counted only from the reviews shown, and only
    shown at 20 or more. The same threshold applies to the histogram, the
    "4 stars or higher" figure and the `aggregateRating` JSON-LD (`lib/seo.ts`).
    The catalogue's pooled worldwide rating is no longer shown anywhere.
  - **Filtering happens on the server.** The components are client
    components, so they previously serialised every review into the HTML,
    even ones that were hidden.
- **"PROMOTED" removed** from `components/ProductCard.tsx`. It wasn't a paid
  placement, so there's no "Sponsored" label either. The row also showed
  **made-up prices**: the seeded `priceAud` multiplied by 1.05 and 1.12. It
  now shows each retailer's verified price, or "Check price" where there
  isn't one.
- **Seeded prices replaced.** Card and related-product headers used the seeded
  `priceAud`, which was never a real RRP. They now show "from $X", the lowest
  verified retailer price.
- **Product meta.** The description is now built from `bestFor` where present,
  instead of one template across 205 pages, and "Review" is gone from the
  title ("<Product> Price in Australia").
- **Hub payload.** `toListingCard()` strips reviews, specs and descriptions
  before products go into the client-side grid. The `/products/` HTML dropped
  from 2.4 MB to 458 KB.

**Noindexed products: 205 of 205.** Indexable: 0.

- **Climate & Comfort** (32): `aircon-off-universal-air-conditioner-smart-remote`, `airversa-smart-air-purifier-matter-over-thread`, `aqara-temperature-and-humidity-sensor-t1`, `bing-lee-smart-air-conditioner-wifi-controller`, `bosch-ii-smart-thermostat`, `breville-easy-air-connect-purifier`, `breville-smart-air-viral-protect-night-glow-purifier`, `dyson-purifier-cool-autoreact-tp07`, `dyson-purifier-hot-cool-formaldehyde-hp09`, `ecobee-smart-thermostat-premium`, `ecobee-smartsensor-2-pack`, `google-nest-learning-thermostat-e-3rd-generation`, `google-nest-smart-thermostat`, `levoit-core-300s-smart-air-purifier`, `levoit-core-400s-air-purifier`, `levoit-core-600s-smart-air-purifier`, `netatmo-smart-thermostat`, `philips-pureprotect-mini-900-series-smart-air-purifier`, `sensibo-air-pro-smart-ac-controller-with-air-quality`, `sensibo-air-smart-air-conditioner-controller`, `sensibo-elements-indoor-air-quality-monitor`, `sensibo-sky-smart-air-conditioner-controller`, `shark-neverchange5-air-purifier`, `smart-thermostat-temperature-controller`, `switchbot-hub-2-matter-ir-ac-controller`, `tado-smart-ac-control-v3`, `tp-link-tapo-smart-temperature-humidity-monitor`, `tuya-smart-wifi-ir-air-conditioner-controller-thermostat`, `tuya-wifi-temperature-humidity-sensor-indoor-hygrometer-thermometer-detector-sma`, `uantii-zigbee-temperature-humidity-sensor-with-external-probe-for-for-plants-aqu`, `wifi-digital-thermometer-fridge-hygrometer-room-indoor-humidity-meter`, `xiaomi-smart-air-purifier-6`
- **Energy & Solar** (34): `anker-solix-c1000-portable-power-station`, `bluetti-ac180p-portable-power-station`, `ecoflow-delta-2-portable-power-station-1024wh`, `eve-energy-smart-plug-matter-over-thread`, `eve-energy-strip-3-outlet-smart-power-board`, `fibaro-wall-plug-z-wave-plus-au-plug`, `iammeter-wem3050t-wifi-energy-meter`, `lt1-63t-smart-switch-circuit-breaker-touch-control-power-metering-timer-relay-63`, `meross-smart-wi-fi-plug-mini-au-mss210`, `netatmo-smart-weather-station`, `philips-hue-smart-plug`, `powerboard-10in1-surge-protection-smart-usb-c-power-board`, `powersensor-energy-and-solar-monitoring-solution`, `sensibo-power-smart-plug`, `shelly-1pm-gen3-wi-fi-power-relay`, `shelly-pro-4pm-4-channel-din-rail-relay`, `smart-home-energy-monitor-real-time-electricity-monitor-with-16-50a-3-300a-circu`, `smart-mirabella-genio-wi-fi-powerboard`, `smart-power-board-wifi-power-strip-compatible-with-alexa-and-google-home-wifi-ve`, `smart-power-strip-with-6-outlets`, `switchbot-curtain-3-motorized-rod-track`, `switchbot-smart-plug-mini-au`, `tapo-p110-smart-energy-monitoring`, `tp-link-tapo-p100-mini-smart-wi-fi-socket-plug`, `tp-link-tapo-p110-smart-plug-with-energy-monitoring`, `tp-link-tapo-p110m-mini-smart-wi-fi-plug`, `tp-link-tapo-p300-smart-wi-fi-power-strip`, `tp-link-tapo-smart-wi-fi-power-strip`, `tuya-smart-circuit-breaker`, `tuya-wifi-intelligent-circuit-breaker-power-measurement-energy-kwh-meter-1p-1-63`, `tuya-zigbee-smart-circuit-breaker`, `useelink-wifi-smart-power-strip-power-board-with-4-outlets-and-2-usb-ports-2-typ`, `voltx-e600-portable-power-station`, `wiz-smart-plug`
- **Entertainment & Audio** (33): `amazon-echo-4th-gen-smart-speaker`, `amazon-echo-dot-5th-gen-smart-speaker`, `amazon-echo-dot-max-speaker`, `amazon-echo-show-10-3rd-gen-hd-display`, `amazon-echo-show-15-2nd-gen`, `anko-pro-home-soundbar`, `apple-homepod-2nd-generation`, `apple-homepod-mini`, `avantree-harmony-2-multi-room-wireless-speaker-system`, `blaupunkt-bptv10-android-tv-streaming-device`, `bose-lifestyle-ultra-speaker`, `bose-smart-soundbar-ultra`, `eufy-e10-smart-display`, `google-nest-audio-smart-speaker`, `google-nest-hub-2nd-gen-smart-display`, `google-premium-audio-speaker`, `hisense-hs2100-2-1ch-soundbar`, `jbl-authentics-200-smart-home-speaker`, `jbl-cinema-sb510-3-1-channel-soundbar`, `laser-digital-full-hd-media-player`, `lg-stanbyme-2-27-portable-smart-touch-screen-tv`, `nvidia-shield-tv-pro-4k-hdr-streaming-media-player`, `samsung-music-studio-5-speaker`, `samsung-music-studio-7-wifi-bluetooth-wireless-speaker`, `sonos-arc-premium-smart-soundbar`, `sonos-beam-gen-2-compact-smart-soundbar`, `sonos-era-100-sl`, `sonos-era-100-smart-speaker`, `sonos-era-300-spatial-audio-speaker`, `sonos-move-2-portable-smart-speaker`, `sonos-ray-soundbar`, `sonos-sub-mini-wireless-subwoofer`, `sony-hts100f-soundbar`
- **Hubs & Platforms** (30): `3-5-inch-smart-home-control-panel`, `3-5-inch-smart-home-control-panel-with-3-gang-relay-touchscreen-and-3-button-app`, `aeotec-smart-home-hub-smartthings`, `amazon-echo-hub-8-smart-home-control-panel`, `apple-tv-4k-128gb-wi-fi-ethernet-thread`, `aqara-hub-m2-multi-protocol-hub`, `aqara-hub-m3-matter-zigbee-coordinator`, `atlantic-cozytouch-v2-bridge-box-home-automation-connection-for-cozytouch-applic`, `bosch-pof-1200-ae-1200w-corded-router`, `electric-wood-trimmer-hand-router-trimmer`, `go-smart-bridge-home-automation-hub`, `ha-smart-home-matter-hub`, `homey-bridge-the-ultimate-home-automation-hub`, `homey-pro-2023-smart-home-hub`, `matter-smart-home-hub-m6-zigbee-3-0-gateway-with-antenna-for-home-automation`, `matter-smart-home-hub-thread-tuya-zigbee-3-0-control-your-connected-devices`, `nabu-casa-home-assistant-green-plug-and-play-hub`, `nabu-casa-home-assistant-yellow-hub-poe`, `ozito-850w-router`, `ozito-pxc-18v-brushless-trim-router-pxblts-018`, `philips-hue-bridge-v2`, `rf-bridge`, `ryobi-1600w-plunge-router-rrt1600-s`, `ryobi-400w-trim-router-rtr400-s`, `samsung-smartthings-station-with-15w-wireless-charger`, `sonoff-zigbee-3-0-usb-dongle`, `tuya-smart-home-bridge`, `tuya-zigbee-matter-thread-gateway-smart-home-bridge-matter-hub`, `wifi-rf-bridge-smart-home-automation-module`, `zemismart-matter-zigbee-thread-smart-home-hub`
- **Lighting** (33): `aqara-smart-light-switch-h1-eu-no-neutral`, `connect-smart-rgb-led-light-bulb-b22`, `eufy-e22-permanent-outdoor-lights-15m`, `govee-outdoor-spot-light-2-pack`, `govee-smart-colour-downlight`, `govee-smart-light-bulb-b22`, `govee-wi-fi-bluetooth-smart-light-bulb-e27`, `kogan-smarterhome-smart-touch-single-light-switch`, `laser-smart-home-6m-rgb-light-strip-tv-sync-kit-alexa-google-assistant`, `lifx-clean-antibacterial-smart-bulb-e27`, `lifx-color-smart-bulb-b22`, `lifx-z-led-lightstrip-starter-kit-2m`, `mirabella-genio-9w-led-wi-fi-dimmable-downlight`, `nanoleaf-essentials-matter-led-lightstrip-2m`, `nanoleaf-essentials-matter-smart-bulb-e27`, `nanoleaf-essentials-smart-bulb-e27-2-pack`, `nanoleaf-sense-smart-wireles-switch`, `nanoleaf-shapes-hexagons-starter-kit-9-panels`, `philips-hue-akari-downlight`, `philips-hue-discover-outdoor-floodlight`, `philips-hue-lightstrip-plus-2m-base-v4`, `philips-hue-lily-xl-outdoor-led-spot-light`, `philips-hue-outdoor-lily-spotlight-base-kit`, `philips-hue-play-light-bar-2-pack`, `philips-hue-smart-dimmer-switch-v2`, `philips-hue-white-color-ambiance-b22-bulb`, `philips-hue-white-color-ambiance-starter-kit-e27`, `tapo-l530b-tp-link-smart-wi-fi-light-bulb`, `tp-link-tapo-l530e-smart-wi-fi-light-bulb-e27`, `tp-link-tapo-smart-wi-fi-light-strip`, `wiz-colour-smart-downlight`, `wiz-smart-colour-bulb-a60-b22`, `wiz-smart-led-color-downlight-90mm`
- **Robot Vacuums** (13): `dreame-l10s-ultra-robot-vacuum-and-mop`, `dreame-l20-ultra-robot-vacuum-with-mopextend`, `dreame-x40-ultra-flagship-robot-vacuum`, `ecovacs-deebot-t30-pro-omni-robot-vacuum`, `ecovacs-deebot-x2-omni-square-robot-vacuum`, `eufy-clean-x10-pro-omni-robot-vacuum`, `irobot-roomba-combo-i5-robot-vacuum`, `irobot-roomba-combo-j9-robot-vacuum-mop`, `narwal-freo-x-ultra-robot-vacuum-mop`, `roborock-q5-pro-self-emptying-robot-vacuum`, `roborock-qrevo-master-robot-vacuum`, `roborock-s8-maxv-ultra-robot-vacuum-and-mop`, `xiaomi-robot-vacuum-x20-self-cleaning`
- **Security & Cameras** (30): `aqara-camera-hub-g3-pan-tilt`, `aqara-doorbell-camera-g4-matter`, `aqara-smart-lock-u100-apple-homekey`, `arlo-essential-wireless-video-doorbell-2k`, `arlo-pro-5-2k-wireless-security-camera`, `arlo-ultra-2-4k-spotlight-camera`, `august-wi-fi-smart-lock-4th-gen`, `eufy-eufycam-2c-pro-2k-wireless-security-system`, `eufy-eufycam-3-s380-4k-solar-security-camera`, `eufy-security-indoor-cam-s350-dual-lens`, `eufy-security-solocam-s340-solar-pan-tilt`, `eufy-smart-lock-c220-with-wi-fi`, `eufy-video-doorbell-e340-dual-camera`, `google-nest-cam-outdoor-or-indoor-battery`, `google-nest-doorbell-battery`, `reolink-argus-3-ultra-4k-solar-camera`, `reolink-video-doorbell-wifi-2k`, `ring-alarm-5-piece-security-kit-2nd-gen`, `ring-battery-doorbell-plus`, `ring-floodlight-cam-plus-wired`, `ring-indoor-cam-2nd-gen`, `ring-spotlight-cam-pro-battery`, `ring-stick-up-cam-battery`, `ring-video-doorbell-2nd-gen`, `ring-video-doorbell-pro-2`, `swann-max-4k-ultra-hd-security-system`, `tp-link-tapo-c220-2k-pan-tilt-security-camera`, `tp-link-tapo-c520ws-outdoor-pan-tilt-security-camera`, `tp-link-tapo-d230s1-smart-video-doorbell`, `yale-assure-lock-sl-key-free-deadbolt`

To make a product indexable, write a curated `content/products/<catalogue-slug>.md`
with bestFor, pros, cons and a note, 150 or more words in total. See CLAUDE.md
rules 3 and 5.

## 4. Trust and E-E-A-T

- **`/how-we-test/`** has been rewritten as "How we research and review". It
  says plainly that every article is research-based and none is a hands-on
  review:
  - the "at least two weeks" and 1–5 scoring claims are removed;
  - the article-type labels are kept, with Review reserved for genuine
    hands-on reviews, of which there are none yet;
  - it explains the fact-check flags, labelled retailer reviews, corrections,
    and the fact that the site carries both affiliate links and advertising.
- **Other "testing" claims removed:**
  - site meta description and taglines (`lib/site.ts`): "real-world testing"
    and "reviews" are gone;
  - About page: "testing methodology… used hands-on";
  - terms: "reviews", "what we have tested";
  - products hub: "If a product is a bad buy, we say so", which these
    listings don't do;
  - nav, footer and HTML sitemap labels, now "How we research".
- **Star ratings removed** from product cards, related products, the product
  page header and the spec table's Rating row. The "Highest rated" sort is
  replaced by Name A–Z, and price sorts now use verified prices.
- **Authors:**
  - **K Curtis and Kritin Curtis merged** into `kritin-curtis`.
    `AUTHOR_ALIASES` in `lib/authors.ts` resolves the CMS slug `k-curtis`,
    and `scripts/fetch-authors.mjs` writes the profile under the kept slug.
    `/authors/k-curtis/` 301s to `/authors/kritin-curtis/`. Posts in Strapi
    stay linked to `k-curtis`, so the AI writer needs no change.
  - **Author pages** already listed every post (unpaginated), so no change was
    needed there.
  - **Placeholder roles** such as "What they cover, e.g. …" now render no role
    line (`cleanRole`). `ArchiveHeader`'s badge is optional.
  - **Author pages with 0 posts** are `noindex` and left out of both sitemaps.
    Today that's only the editorial default.
- **`/about/`** has been redesigned with three generated photos in
  `public/images/about/`. They are fal.ai images of Australian interiors with
  no people and no brands, and nothing on the page presents them as our
  homes or team. The page has these sections:
  - "What we do differently";
  - "How our guides are made";
  - **"Who runs this site"**: published by `site.organisation.operator`, with
    Kritin Curtis as editor (real CMS photo) and the contributors with their
    post counts;
  - **an editorial policy**: research not testing, AI-assisted drafting,
    corrections, independence, how affiliate links work, and advertising;
  - "Not electrical advice".

  The operator's `[VERIFY: FXN Holdings Limited, UK Co. No. 16134139 …]` note
  is a code comment in `lib/site.ts` only; it isn't rendered. Change the name
  there and the About page, Contact, Privacy, Terms and the footer all follow.
- **`/contact/`**: a "Who you are contacting" box naming the operator, with a
  `TODO(owner)` comment for the postal address. The Stalwart form is
  unchanged.
- **Backdated posts** are listed under [Strapi to-do](#strapi-to-do). No dates
  were changed in code.

## 5. AdSense

- **Ads are OFF until the site is approved.** There are two switches, both in
  `lib/ads.ts` and both added blank to `.env.example`:
  - **`NEXT_PUBLIC_ADSENSE_CLIENT`** (the publisher id) turns on verification
    only: the `google-adsense-account` meta tag on every page, plus `/ads.txt`.
    That's what Google needs to review the site. No ad script loads and no ads
    display.
  - **`NEXT_PUBLIC_ADSENSE_SHOW_ADS=1`**, set as well and only after approval,
    makes `components/HeadScripts.tsx` load `adsbygoogle.js?client=…` (async,
    crossOrigin anonymous) on every page, so ads can display.
  - A malformed or unset id renders nothing. There are no manual ad units;
    turn on Auto ads after approval.
- **Advertising wording follows the second switch.** While ads are off:
  - the footer, About, Terms, Affiliate disclosure and How we research don't
    mention advertising;
  - the cookie banner doesn't mention AdSense or wait for Google's consent
    message;
  - the Privacy and Cookie pages keep their Advertising sections, which
    reviewers look for, but say that no ads or advertising cookies are served
    yet.

  Verified with a dummy id: the meta tag and `/ads.txt` were present on every
  page, and there was no ad script and no "shows advertising" wording.
- **`app/ads.txt/route.ts`** returns `google.com, pub-…, DIRECT,
  f08c47fec0942fa0` as text/plain with a 1-hour cache. When the id is unset it
  returns 404 with `no-store`, so Cloudflare won't cache the 404. nginx
  already passes `/ads.txt` to Next, so no nginx change is needed.
- **`NEXT_PUBLIC_` values are inlined at build time.** Set the variable in
  `.env.local` before `./deploy.sh`; changing it later needs a rebuild.
- **Consent (`components/CookieBanner.tsx`):**
  - **Consent Mode v2 defaults stay denied.** AdSense reads the same signals
    as GA.
  - **For EEA, UK and Swiss visitors**, once Google's consent message is live,
    it exposes the TCF API and reports `gdprApplies`. Our banner then stands
    aside for that visitor and Google's message drives consent.
  - **Sovrn stays off for EEA/UK visitors.** I couldn't confirm its IAB vendor
    id, so gating it on TCF would have been a guess.
  - **Footer "Cookie settings"** reopens Google's message for those visitors
    (`googlefc.showRevocationMessage`) and our banner for everyone else.
  - **Consent key bumped to `nxt.consent.v2`**, together with
    `public/js/ga-init.js` and `sovrn-init.js`. Everyone is asked again,
    because a choice made before ads existed isn't consent to ads. The banner
    text now mentions AdSense.
- **Deleted:**
  - `components/SectionAds.tsx` with `images/ads.webp` (the fake "-
    Advertisement -" placeholder);
  - `components/SectionBecomeAnAuthor.tsx` with `images/BecomeAnAuthorImg.webp`;
  - `components/SectionVideos.tsx`.

  All were unused. Likes and comment counts already render nothing (gated on
  `NEXT_PUBLIC_SHOW_ENGAGEMENT`), and the audio player only mounts for audio
  posts, of which there are none, so both stay.

## 6. Legal pages

- **`/privacy/`** has been rewritten, with a last-updated date of 24 September
  2026:
  - names the operator and the privacy contact email;
  - a new **Advertising** section with Google's required wording, opt-outs at
    adssettings.google.com and aboutads.info/choices, and the
    policies.google.com/technologies/partner-sites link;
  - Google Analytics named, with Consent Mode;
  - the contact form and comments disclosed as data collection (the old page
    said nothing could be submitted);
  - overseas processing;
  - rights under the Australian Privacy Act 1988 and APPs (with OAIC), and
    under the GDPR and UK GDPR.
- **`/cookies/`**:
  - "no advertising scripts" is replaced with an Advertising section on
    AdSense cookies, noting they load only after consent where required;
  - the "what we set ourselves" section now mentions local storage;
  - the maintainer comment is kept in sync with `HeadScripts.tsx`;
  - the date is updated.
- **`/terms/`** and **`/affiliate-disclosure/`**: one line each saying the site
  displays advertising, labelled and separate from editorial. The terms now
  name the operator and say "research-based"; their date is updated.

## 7. Sitemap and indexing

- **`/sitemap.xml` is `app/sitemap.ts`.** Nothing static shadows it:
  `public/` has no sitemap, `/var/www/html/nxtsmarthome.com.au` no longer
  exists, and the nginx `location /` proxies everything to Next. No nginx
  change was needed.
- **The sitemap now excludes:**
  - noindexed products;
  - merged articles;
  - `[VERIFY]`-blocked posts;
  - authors with 0 posts.

  It has 64 URLs, all verified returning 200.
- **Why `/articles/` showed only 23 posts:** `app/articles/page.tsx` had no
  `revalidate`. It was prerendered once per deploy and cached for a year
  (`s-maxage=31536000`), so it froze at the count from the last build. It now
  revalidates every 5 minutes, like `/articles/page/N/`, and pages through all
  29 posts, 6 per page. The HTML `/sitemap/` page had the same bug and got the
  same fix.

## 8. Final checks (run on a test server from the new build)

- `npm run build`: passed.
- `npm run lint`: **could not run.** The repo has no ESLint config, and `next
  lint` stops at an interactive setup prompt. Type checking ran as part of the
  build.
- `npm run audit:content`: **0** `[VERIFY]`/placeholder hits in indexable
  posts, **0** duplicate clusters among indexable posts (3 exist among all
  posts, and all three are merged).
- All 64 sitemap URLs returned 200 with **0** hits for `[VERIFY`, `Verified
  purchase`, `PROMOTED`, `Advertisement`, `lorem`, `e.g. Security and cameras`
  and `What they cover`. All 205 product pages returned 0 hits for `Verified
  purchase`, `PROMOTED`, `aliexpress`, `shopee` and `lazada`.
- Every redirect in the map was checked. Blocked posts return 404; `/ads.txt`
  returns 404 with `no-store` while unset.

## Also done in this session (separate requests)

- **Logo** (`shared/Logo.tsx`): Outfit 700 wordmark ("NXT" in brand colour),
  with the mark on a brand tile. Outfit is self-hosted again from
  `app/fonts/outfit` (OFL) and used only through the `font-logo` utility.
- **Footer** (`components/Footer/Footer.tsx`) redesigned:
  - a brand block with a contact button and email;
  - four link columns;
  - an affiliate and advertising disclosure strip;
  - an operator line.
- **`/articles/`**: the topic filter is in a sticky left sidebar from lg up,
  the same layout as the category pages.
- **Category pages**: the h1 is 2.5rem (`titleClassName` on `ArchiveHeader`),
  and `/categories/lighting/` has no background banner.
- **`/categories/`**: the h1 is 2.5rem, and the topic section h2s are 2rem.
  The h2 rule is scoped to a `section-heading` class added in
  `shared/Heading.tsx`, plus a rule in `app/globals.css`; card-title h2s keep
  their own size.
- **`/articles/`**: the h1 is 2.5rem.

## Strapi to-do

### Fact-check and clear `[VERIFY]` (34 posts, held back until done)

Fix the two merge survivors first (see "Read this first"). The count column is
the number of `[VERIFY]` tags.

| Post | Category | `[VERIFY]` | Note |
|---|---|---|---|
| `outdoor-tvs-projectors-speakers-australian-summer` | entertainment | 18 |  |
| `smart-zoning-ducted-air-conditioning-cost-australia` | climate | 17 |  |
| `keep-security-cameras-running-blackout-nbn-outage` | security | 16 |  |
| `smart-thermostat-gas-ducted-hydronic-heating-australia` | climate | 16 |  |
| `robot-vacuum-running-costs-australia` | robot-vacuums | 16 |  |
| `reverse-cycle-air-conditioner-rooftop-solar-australia` | climate | 14 |  |
| `zigbee-mesh-garage-granny-flat-double-brick-home` | setup-guides | 13 |  |
| `robot-vacuum-dock-placement-rental-apartment-no-new-wiring` | robot-vacuums | 13 |  |
| `smart-light-switches-neutral-wire-older-australian-homes` | lighting | 12 |  |
| `local-recording-vs-cloud-subscriptions-security-cameras-australia` | security | 12 |  |
| `smart-downlights-australian-ceilings-insulation-clearance-rules` | lighting | 12 |  |
| `streaming-box-australia-free-to-air-catch-up-tv` | entertainment | 12 |  |
| `wiring-video-doorbell-australian-chime-transformer` | security | 11 |  |
| `home-assistant-energy-dashboard-solar-export-time-of-use-tariffs` | setup-guides | 11 |  |
| `how-to-keep-security-cameras-running-through-a-blackout-or-nbn-outage` | security | 10 | merged away — fix only if you keep it |
| `smart-light-switches-no-neutral-wire-australia` | lighting | 9 | merged away — fix only if you keep it |
| `bathroom-humidity-sensor-exhaust-fan-automation-australia` | climate | 9 |  |
| `robot-vacuum-buying-guide-australian-homes-pets` | robot-vacuums | 8 | merged away — fix only if you keep it |
| `movie-night-lighting-scenes-you-can-build-without-touching-the-switchboard` | entertainment | 8 |  |
| `smart-lighting-rental-australia-no-wiring` | lighting | 7 |  |
| `robot-vacuum-local-home-assistant-no-cloud` | robot-vacuums | 7 |  |
| `what-not-to-plug-into-a-smart-plug-australia` | energy | 7 |  |
| `second-hand-smart-home-devices-australia` | buying-guides | 7 |  |
| `reverse-cycle-split-system-voice-app-control-without-replacing` | setup-guides | 6 | merged away — fix only if you keep it |
| `smart-plug-buying-guide-australia` | energy | 6 |  |
| `smart-home-holiday-house-australia` | buying-guides | 6 |  |
| `smart-home-hub-buying-guide-australia` | buying-guides | 5 |  |
| `overseas-smart-home-devices-australia` | buying-guides | 4 |  |
| `smart-home-devices-older-australians` | buying-guides | 4 |  |
| `renter-smart-home-devices-no-drilling` | buying-guides | 3 | merged away — fix only if you keep it |
| `smart-home-devices-without-internet` | hubs-and-platforms | 2 |  |
| `future-proof-smart-home-devices-australia` | buying-guides | 1 |  |
| `where-to-buy-smart-home-australia` | buying-guides | 1 |  |
| `thread-vs-matter-difference` | hubs-and-platforms | 1 |  |

### Merge, then unpublish

The six losers in the redirect map. Move the sections listed in the merge plan
into each survivor, then unpublish the loser. Fact-check anything you move.

### Correct backdated publish dates (25 posts)

Each of these has a publishDate earlier than its Strapi createdAt. Set a true
date, or clear publishDate.

| Post | publishDate | createdAt | Status |
|---|---|---|---|
| `smart-plug-buying-guide-australia` | 2026-08-05 | 2026-08-13 | held back |
| `what-not-to-plug-into-a-smart-plug-australia` | 2026-08-05 | 2026-08-13 | held back |
| `overseas-smart-home-devices-australia` | 2026-08-04 | 2026-08-13 | held back |
| `future-proof-smart-home-devices-australia` | 2026-08-04 | 2026-08-13 | held back |
| `renter-smart-home-devices-no-drilling` | 2026-08-04 | 2026-08-13 | held back |
| `second-hand-smart-home-devices-australia` | 2026-08-04 | 2026-08-13 | held back |
| `smart-home-devices-older-australians` | 2026-08-04 | 2026-08-13 | held back |
| `smart-home-holiday-house-australia` | 2026-08-04 | 2026-08-13 | held back |
| `where-to-buy-smart-home-australia` | 2026-08-04 | 2026-08-13 | held back |
| `thread-vs-matter-difference` | 2026-08-03 | 2026-08-13 | held back |
| `smart-home-devices-without-internet` | 2026-08-03 | 2026-08-13 | held back |
| `smart-speakers-multiroom-audio-australia` | 2026-07-23 | 2026-08-13 | live |
| `smart-home-for-renters-australia` | 2026-07-09 | 2026-08-13 | live |
| `smart-home-starter-guide-beginners-australia` | 2026-06-25 | 2026-08-13 | live |
| `robot-vacuum-buying-guide-australia` | 2026-06-11 | 2026-08-13 | live |
| `make-split-system-aircon-smart-australia` | 2026-05-28 | 2026-08-13 | live |
| `smart-plugs-energy-monitoring-australia` | 2026-05-14 | 2026-08-13 | live |
| `smart-home-privacy-cameras-australia-law` | 2026-04-30 | 2026-08-13 | live |
| `video-doorbell-buying-guide-australia` | 2026-04-16 | 2026-08-13 | live |
| `fix-smart-home-wifi-dropouts` | 2026-04-02 | 2026-08-13 | live |
| `smart-home-electrical-work-australia-legal` | 2026-03-19 | 2026-08-13 | live |
| `smart-bulbs-vs-smart-switches-australia` | 2026-03-05 | 2026-08-13 | live |
| `zigbee-vs-zwave-vs-thread-vs-wifi` | 2026-02-18 | 2026-08-13 | live |
| `best-smart-home-platform-australia` | 2026-02-03 | 2026-08-13 | live |
| `what-is-matter-smart-home-australia` | 2026-01-14 | 2026-08-13 | live |

### Optional

- **Author placeholder roles.** Adrian Thompson and Harry Cheng still have the
  role "What they cover, e.g. Security and cameras" in Strapi. It no longer
  renders, but real roles would strengthen the author pages.
- **Author name.** You could rename the CMS author "K Curtis" to "Kritin
  Curtis" for consistency. The site already shows "Kritin Curtis", so this is
  cosmetic. Leave the slug `k-curtis` as it is, because the AI writer uses it.

## Statements to confirm are true

These now appear on the site. Please confirm each one, or tell me to change it:

- "We do not accept payment for coverage, and manufacturers do not see or
  approve articles before they are published." (About, How we research;
  carried over from the old pages.)
- "Some articles are drafted with the help of AI writing tools, then published
  under the name of the contributor responsible for them." (About.)
- Kritin Curtis as editor, and `FXN Holdings Limited` as operator. This is the
  `[VERIFY]` in `lib/site.ts`.
- "An article with an open fact-check flag is not published." This is true in
  code now, but only for flags written as `[VERIFY` tags.

## Manual checklist

1. Set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX` in `.env.local`.
   This is verification only; ads stay off. Leave
   `NEXT_PUBLIC_ADSENSE_SHOW_ADS` unset until Google approves the site. After
   approval, set it to `1`, run `./deploy.sh`, then turn on Auto ads.
2. Commit, then `./deploy.sh`, or run `./deploy.sh --allow-dirty` without
   committing. The script reloads nginx, which picks up the new 301s.
3. Verify:
   - `https://nxtsmarthome.com.au/ads.txt` shows the `google.com, pub-…` line;
   - the page source has `<meta name="google-adsense-account">`, and no
     `adsbygoogle.js` until you switch ads on;
   - a merged URL returns 301.

   If `/ads.txt` shows a stale 404, purge it in Cloudflare.
4. In AdSense, go to **Privacy & messaging** and turn on the **European
   regulations (GDPR)** message and the **US state regulations** message.
5. In Strapi, work through the [Strapi to-do](#strapi-to-do): the two merge
   survivors first, then the merges, the other `[VERIFY]` posts and the dates.
6. Add the postal address on `/contact/` (the `TODO(owner)` comment), and
   confirm the operator entity in `lib/site.ts`.
7. In Search Console, resubmit `https://nxtsmarthome.com.au/sitemap.xml`.
8. Wait 2–4 weeks for recrawling, then reapply in AdSense.

## Files touched

- **New:**
  - `ADSENSE_CHANGES.md`, `data/merged-articles.json`
  - `lib/editorial-guard.mjs`, `lib/merged-articles.mjs`, `lib/review-sources.ts`, `lib/ads.ts`
  - `scripts/audit-content.mjs`, `app/ads.txt/route.ts`
  - `app/fonts/outfit/` (restored), `public/images/about/{hero,research,home}.webp`
- **Modified:**
  - `.env.example`, `package.json`
  - `lib/content.ts`, `lib/products.ts`, `lib/seo.ts`, `lib/site.ts`,
    `lib/authors.ts`
  - `scripts/build-search-index.mjs`, `scripts/gen-redirects.mjs`,
    `scripts/fetch-authors.mjs`
  - `app/[category]/[slug]/page.tsx`, `app/products/[slug]/page.tsx`,
    `app/products/page.tsx`, `app/products/category/[slug]/page.tsx`
  - `app/sitemap.ts`, `app/sitemap/page.tsx`, `app/articles/page.tsx`,
    `app/articles/page/[page]/page.tsx`, `app/authors/[slug]/page.tsx`
  - `app/about/page.tsx`, `app/contact/page.tsx`, `app/how-we-test/page.tsx`,
    `app/privacy/page.tsx`, `app/cookies/page.tsx`, `app/terms/page.tsx`,
    `app/affiliate-disclosure/page.tsx`
  - `app/layout.tsx`, `app/globals.css`
  - `components/ProductReviews.tsx`, `components/ProductCard.tsx`,
    `components/ProductGrid.tsx`, `components/RelatedProducts.tsx`,
    `components/ProductAccordion.tsx`
  - `components/HeadScripts.tsx`, `components/CookieBanner.tsx`,
    `components/Footer/Footer.tsx`, `components/ArchiveHeader.tsx`,
    `components/ArticlesList.tsx`, `components/CategoryView.tsx`,
    `shared/Logo.tsx`, `shared/Heading.tsx`, `app/categories/page.tsx`
  - `public/js/ga-init.js`, `public/js/sovrn-init.js`
- **Deleted:**
  - `components/SectionAds.tsx`, `components/SectionBecomeAnAuthor.tsx`,
    `components/SectionVideos.tsx`
  - `images/ads.webp`, `images/BecomeAnAuthorImg.webp`
  - `content/authors/k-curtis.md` (generated, untracked)
- **Regenerated by prebuild:**
  - `public/_redirects`, `public/_redirects.map`, `public/search-index.json`
  - `content/authors/*.md` (placeholder roles blanked)
- **Not touched, and not mine:**
  - `components/PostFilterGrid.tsx` (untracked, unused; an earlier session's
    draft of a post filter);
  - `AI_FIX_PROMPTS.md` (untracked);
  - the deletion of `CLAUDE copy.md`.

---

## 24 September 2026: Task 0, thin-content audit script

**Files changed:** `scripts/audit-thin-content.mjs` (new) and `package.json`
(`npm run audit:thin`). **Output:** `reports/thin-content-audit.csv`. **Strapi
entries changed:** none; the script is read-only. No content was changed.

`npm run audit:thin` rebuilds the audit from Strapi and the repo, prints a
summary by type and verdict, and exits 1 if any *indexable* page is DUPLICATE,
FIX, OFF-TOPIC or THIN - EMPTY. "Indexable" mirrors the live site's own rules:
the editorial guard, the merge map, `productEditorial()` and author post
counts.

**The root `thin-content-audit.csv` isn't on this host,** so the columns are
based on the names the prompts use: `visible_verify`, `original_words`,
verdict, action and word counts. There's one extra column, `verify_total`,
which also counts `[VERIFY]` tags hidden in HTML comments.

### Run on 24 Sep 2026, compared with the reference CSV

| Type | Verdict | Expected | Now | Indexable now |
|---|---|---|---|---|
| article | FIX | 24 | 26 | 0 |
| article | DUPLICATE | 9 | 6 | 0 |
| article | BORDERLINE | 2 | 2 | 0 |
| article | OK | — | 30 | 29 |
| product | OFF-TOPIC | 6 | 6 | 0 |
| product | THIN - EMPTY | 37 | 37 | 0 |
| product | THIN | 162 | 162 | 0 |
| author | THIN | 2 | 4 | 3 |

**INDEXABLE THIN PAGES: 3** (the three author profiles). **Exit code: 0**,
because none of the three has a blocking verdict.

The differences:

- **DUPLICATE is 9 − 3.** The reference flagged both halves of the 3
  text-similar pairs (6) plus the losers of the 3 topic merges (3). Since PR
  #12, all 6 losers are merged away and 301'd on the site, so the survivors
  `keep-security-cameras-running-blackout-nbn-outage`,
  `smart-light-switches-neutral-wire-older-australian-homes` and
  `smart-plugs-energy-monitors-lower-power-bill-australia` have no live
  duplicate. The script no longer flags them, but it still lists the 6 losers
  as DUPLICATE and as "still published in Strapi" until they're unpublished.
- **FIX is 24 + 2.** The blackout and neutral-wire survivors carry visible
  `[VERIFY]` notes, so they moved from DUPLICATE to FIX.
- **BORDERLINE matches.** Three posts have `[VERIFY]` only inside HTML
  comments, so none is visible: `thread-vs-matter-difference` (748 words) and
  `where-to-buy-smart-home-australia` (720 words) are BORDERLINE, and
  `smart-home-devices-without-internet` (881 words) is OK. The site still holds
  all three back, because its guard counts hidden tags too.
- **Author THIN is 4, not 2.** The script counts profile words (bio plus
  profile note). Every bio is under 150 words: Adrian Thompson 46, Harry Cheng
  60, Kritin Curtis 58, and the editorial profile 95 with 0 posts. The
  reference probably counted the whole author page, where the listed article
  titles push authors with posts over 150, leaving only the two post-less
  profiles (then `k-curtis` and the editorial byline). The K Curtis / Kritin
  Curtis name clash is still reported in `flags`; the site already aliases
  `k-curtis` to `kritin-curtis`.
- **Products match exactly.** The 6 off-topic items are woodworking routers
  and trimmers filed under Hubs & Platforms. None of the 205 products is
  indexable under the current rule.

**Left for a human:**
- Expand the three contributor bios in Strapi to 150+ words, or confirm that a
  profile-word bar isn't wanted.
- **Rule mismatch for Task 2:** it specifies a stricter product rule (pros ≥ 3,
  cons ≥ 2, 300+ words including shortDescription) than the live
  `productEditorial()` (150+ words). The script mirrors the live rule; if Task 2
  changes it, update the replica in the script too.

---

## 24 September 2026: Task 1, off-topic products removed

**Removed** from `public/data/products.json` (205 → 199 products), along with
their images in `public/images/products/`:
- `bosch-pof-1200-ae-1200w-corded-router`
- `ryobi-400w-trim-router-rtr400-s`
- `ryobi-1600w-plunge-router-rrt1600-s`
- `ozito-850w-router`
- `ozito-pxc-18v-brushless-trim-router-pxblts-018`
- `electric-wood-trimmer-hand-router-trimmer`

No `content/products/*.md` files existed for them, and nothing generated at
build time indexes products.

**References:** none. None of the six appears in the repo's article drafts, or
in any of the 69 published and 70 draft Strapi posts (checked for
`::product:` markers and links). So there are no Strapi edits to make.

**Redirects:** `data/redirects-adsense.json` (new, `[{ from, to, reason }]`)
sends each `/products/<slug>/` to `/products/category/hubs-and-platforms/`.
The file feeds two places, and both forms (with and without the trailing
slash) are covered:
- `next.config.mjs`, as `redirects()` with `permanent: true`;
- `scripts/gen-redirects.mjs`, which writes the rules into
  `public/_redirects` and nginx's `_redirects.map`.

`scripts/audit-thin-content.mjs` reads only the article entries from that
file, so these product entries don't affect its article checks.

**Root cause:** `scripts/import-category-products.mjs` accepted any Google
Shopping result with a title, price, image and Australian retailer. Nothing
checked it was a smart home product, so the "Thread border router Australia"
query brought in Bunnings woodworking routers.

**The fix is a new guard, `lib/catalogue-guard.mjs`** (`offTopicReason(title,
category)`). It is used by both keyword-search importers
(`import-category-products.mjs` and `fetch-top-products.mjs`) and by the
audit. It rejects:
- "router" without a networking signal (Wi-Fi, mesh, Thread, Matter, Zigbee,
  modem, NBN and similar);
- power-tool and workshop terms (trim, plunge, corded router, wood, trimmer,
  drill, saw and so on);
- power-tool brands, but only in Hubs & Platforms. Bosch also makes the smart
  thermostat in the catalogue, so a global brand ban would be wrong.

Tested against the catalogue as it was before the removal: it flags exactly
these six and nothing else, and lets through a mesh Wi-Fi router, a Thread
border router and the Bosch thermostat.

**Checks:** `npm run build` passes. `npm run audit:thin` reports **OFF-TOPIC
= 0**, with 198 products (199 minus the disabled HomePod): 23 THIN - EMPTY,
175 THIN, none indexable. On a test server, all six URLs redirect to the Hubs
category, and it no longer lists them. **Not deployed.**

**Also in this change:** the product page's Features list moved from the
Highlights card to the Specifications panel, below the spec table (user
request).

---

## 24 September 2026: Task 2, product quality gate

**The rule** is `isIndexableProduct(product)` in `lib/products.ts`. A product
page is indexable only with all of:
- a curated file, `content/products/<slug>.md`;
- a non-empty bestFor line, at least 3 pros and at least 2 cons;
- 300+ words of original text, measured by `originalWordCount(product)`.

**What counts as original text:** the curated body (HTML comments excluded),
bestFor, pros, cons and the shortDescription blurb. The long description counts
only when it's our rewrite (`descriptionRewrite.model`). For the 63 products
not rewritten, that field holds the old generated template ("… is a X option
for shoppers comparing current deals"), which isn't original writing. Scraped
descriptions, specs, retailer data and reviews never count.

**Replaces the earlier rule:** `productEditorial()`, which asked for only 150
words and no minimum number of pros or cons. `scripts/audit-thin-content.mjs`
carries a copy of the rule, since it can't import TypeScript; change both
together.

**Quick check:** `node scripts/check-original-words.mts` (new) passed all 6
expectations on three products: the Echo (rewritten, 671 words), the eufy
C220 (template description not counted, 35 words) and the curated
`apple-homepod` file (131 words, 4 pros and 3 cons, so not indexable).

**Where it applies:**
- **Product pages** (`app/products/[slug]`): non-indexable pages are
  `noindex, follow`, and show "Price listing — not a review. See our guides
  for recommendations." The link goes to that category's article list.
- **Meta description** (indexable pages only): bestFor plus the first sentence
  of the curated verdict. Noindexed pages keep a plain line: "Where to buy X
  in Australia. Compare prices at Australian retailers."
- **Empty listings (under 50 words, `isEmptyListing`):** kept out of the
  `/products/` hub, the category lists, related products, the HTML sitemap and
  article product boxes. Their URLs still work (200, noindex).
- **`app/sitemap.ts`:** only indexable products; only product-category pages
  with 3 or more indexable products; the hub only if it lists an indexable
  product.
- **`/products/` hub and `/products/category/*`:** `noindex, follow` when they
  list no indexable product.

**Counts after the build**, from `npm run audit:thin` and a test server:
- **Indexable product URLs: 0.** The task expected possibly 3, but none of the
  3 curated files shares a slug with a catalogue product, and the most any of
  them has is 131 words.
- **Sitemap: 62 URLs**, down from 64: no product pages, no product-category
  pages, and the hub dropped out as noindex.
- **THIN - EMPTY: 63** (the reference CSV says 37). The difference is that the
  template text is no longer counted. These are exactly the 63 products held
  back from the description rewrite. THIN: 135 (no curated file, so no pros or
  cons).
- **Checked on a test server:** empty products return 200 with noindex, and
  none is linked from the hub. The hub and category pages are noindex.

**Needs a decision:** 33 of the 153 product boxes in published articles point
at empty products, and now render nothing. Two live articles fall below
CLAUDE.md rule 8's minimum of 2 boxes:
- `smart-lock-compatibility-australian-doors` (3 → 1 box: eufy C220 and
  Aqara U100 hidden);
- `indoor-air-quality-monitor-co2-pm25` (3 → 1: Sensibo Elements and Sensibo
  Air Pro hidden).

Two ways to fix this:
- write descriptions for the embedded empty products, which lifts them over
  50 words (about 20 products, roughly $0.10);
- swap those markers in Strapi for products that have content.

**Not deployed.**

---

## 24 September 2026: Task 3, product reviews and ratings

Most of Task 3 was already done in the first AdSense pass:
- no "Verified purchase" badge;
- an Australian-retailer filter;
- scores counted only from the shown reviews, 20 or more;
- no stars or review counts on the hub, cards or related products;
- "PROMOTED" removed, with its made-up prices.

There is no paid-placement flag in the catalogue, so no card is labelled
"Sponsored". This task tightened the rest.

**One allow-list:** `lib/review-sources.ts`. The product page, the reviews
block, the structured data and `scripts/audit-thin-content.mjs` all read it;
the audit imports the `.ts` file directly, which needs Node 22.18 or later.
A review renders only when its source is:
- **an Australian retailer:** jbhifi, thegoodguys, harveynorman, bunnings,
  officeworks, amazon.com.au, ebay.com.au, binglee, myer, appliancesonline,
  betta, costco.com.au, mwave, mightyape, kogan.com / .com.au, mitre10;
- **the brand's own Australian site:** e.g. dyson.com.au, shown as "Dyson
  Australia";
- **the brand's global store:** ring.com, sonos.com, eufylife.com and so on,
  shown as "<Brand> (global store)", and only when the domain matches the
  product's brand. Marketplaces and overseas chains are never treated as brand
  stores.

**Thresholds:**
- under **5** allowed reviews, the block is hidden;
- the score and histogram are counted from the allowed reviews only, and
  appear only from **20** up;
- the catalogue's pooled Google Shopping rating is never shown.

**Heading:** "What customers say at <retailers>", with the note "Reviews
written by customers of these retailers — not by NXT Smart Home, and not a
test result."

**Structured data:** `AggregateRating` is emitted only when the page shows a
score, so none when the block is hidden or has fewer than 20 reviews. No
`Review` items are emitted. Only the allowed reviews are sent to the browser,
so the others never appear in the page HTML.

**How many products still show reviews:** **33 of 198** active products,
with 651 reviews between them, and 17 of the 33 show a score.
- **80** products have imported reviews at all. **76** of them had reviews
  from sources that aren't allowed.
- **10** products now hide the block, because fewer than 5 allowed reviews
  remain.
- **Global-store reviews shown:** eufy 82, Sonos 71, ecobee 47, Anker 29,
  Ring 27, Bose 27, SwitchBot 18, Narwal 18, Swann 17, Arlo 16, Shelly 14,
  Google 10, Dyson 4, tado 2.

**Checked:** `npm run build` passes. The spot-check used the dev server on port
3023 with its own build folder. The `npm run dev` script binds port 3011,
which is nxt.deals' live port on this host, and it writes into the live
`.next`. The three pages:
- `ring-floodlight-cam-plus-wired`: 21 reviews, a score, and `AggregateRating`
  in the page;
- `tado-smart-ac-control-v3`: exactly 5 reviews, "(global store)" labels, no
  score, no `AggregateRating`;
- `google-nest-doorbell-battery`: 30 imported reviews, all from US and
  Canadian stores, so the block is hidden.

None contained "Verified purchase" or any foreign store name, and the hub
shows no stars or "PROMOTED". `npm run audit:thin` agrees: 33 products with
the block shown, 17 with a score.

**Not deployed.**

---

## 24 September 2026: Task 5, editorial guard for [VERIFY] and placeholders

Code only; the content itself is fixed in Task 6.

**`editorialIssues(post): string[]`** in `lib/content.ts`, built on the shared
marker list in `lib/editorial-guard.mjs`. It checks the body, excerpt, key
takeaways and every FAQ question and answer, case-insensitive, for:
- `[VERIFY`, `TODO`, `TBD` and `lorem ipsum`;
- `Tag one`, `Tag two`, `One or two sentences that would`, `What they
  cover, e.g.` and `A direct answer in two to four sentences`.

Matching is now case-insensitive; TODO and TBD used to match upper case only.
The last marker is new.

**Blocking:** a post with any issue is left out of `getAllArticles()`, and
everything reads from that: listings, category pages, related posts, the
homepage, author pages and the sitemap. Its article page then returns
`notFound()`. `scripts/build-search-index.mjs` applies the same check.

**Logging:** each blocked slug is logged with its issues, prefixed
`[editorial-guard]`, at build time and whenever the flagged set changes on
revalidation.

**`EDITORIAL_GUARD=warn`** (server environment variable) keeps flagged posts
live and in search, but still logs every one. The default, `block`, applies
when the variable is unset or has any other value.

**CLAUDE.md rules 6 and 7** now say `[VERIFY]` tags belong in drafts only.
A post must have zero tags before it is published, because the site refuses
to render tagged posts. Unverifiable claims must be confirmed, removed, or
rewritten to point readers to the official source.

**Build with `EDITORIAL_GUARD=warn`:** it passes, and **29 posts** would be
blocked:
- **26 with visible `[VERIFY]` tags**, which matches the audit's FIX count.
  The old reference CSV said 24; since then the two merge survivors moved
  from DUPLICATE to FIX.
- **3 with tags only inside HTML comments:** `thread-vs-matter-difference`,
  `where-to-buy-smart-home-australia` and
  `smart-home-devices-without-internet`. The comments still ship in the page
  source, so the guard counts them.

The 5 merged-away posts that also carry tags aren't counted; they're already
off the site. No post tripped any of the other markers.

The 29 (tag counts in brackets): smart-light-switches-neutral-wire-older-australian-homes (12),
wiring-video-doorbell-australian-chime-transformer (11),
local-recording-vs-cloud-subscriptions-security-cameras-australia (12),
smart-downlights-australian-ceilings-insulation-clearance-rules (12),
keep-security-cameras-running-blackout-nbn-outage (16),
smart-lighting-rental-australia-no-wiring (7),
streaming-box-australia-free-to-air-catch-up-tv (12),
movie-night-lighting-scenes-you-can-build-without-touching-the-switchboard (8),
outdoor-tvs-projectors-speakers-australian-summer (18),
smart-zoning-ducted-air-conditioning-cost-australia (17),
reverse-cycle-air-conditioner-rooftop-solar-australia (14),
bathroom-humidity-sensor-exhaust-fan-automation-australia (9),
smart-thermostat-gas-ducted-hydronic-heating-australia (16),
robot-vacuum-local-home-assistant-no-cloud (7),
zigbee-mesh-garage-granny-flat-double-brick-home (13),
robot-vacuum-running-costs-australia (16),
robot-vacuum-dock-placement-rental-apartment-no-new-wiring (13),
home-assistant-energy-dashboard-solar-export-time-of-use-tariffs (11),
smart-home-hub-buying-guide-australia (5), smart-plug-buying-guide-australia (6),
what-not-to-plug-into-a-smart-plug-australia (7), overseas-smart-home-devices-australia (4),
future-proof-smart-home-devices-australia (1), second-hand-smart-home-devices-australia (7),
smart-home-devices-older-australians (4), smart-home-holiday-house-australia (6),
where-to-buy-smart-home-australia (1, in a comment), thread-vs-matter-difference (1, in a comment),
smart-home-devices-without-internet (2, in comments).

### Step to take: when to block in production

The task says not to switch the default to `block` in production until Task
6 has cleaned the content. **But production already blocks.** The guard went
live with PR #12 on 24 September, when the first AdSense brief asked for it,
and these posts have returned 404 since then. The choice is yours:
- **Keep blocking** (current live state; nothing to do). The tagged posts
  stay hidden until Task 6 clears each one, and each reappears within about
  5 minutes of being fixed in Strapi.
- **Relax until Task 6 is done:** add `EDITORIAL_GUARD=warn` to `.env.local`
  and run `./deploy.sh`. The 29 posts come back with their `[VERIFY]` notes
  visible to readers and to an AdSense reviewer. When Task 6 is finished,
  remove the variable and deploy again.

**Not deployed.**

---

## 24 September 2026: Task 4, editorial for the most-linked products (batch 1 of N)

**Priority list:** products referenced by `::product:` markers in the 69
published Strapi posts, counted per post. None passed `isIndexableProduct`
before this batch. Three curated files (`apple-homepod`, `philips-hue-bridge`,
`aqara-hub-m3`) have no catalogue entry, so they have no product page to make
indexable; `apple-homepod`'s 4 references were therefore skipped.

**Completed:** ten new files in `content/products/`, all now indexable. Each
is research-based, with no rating, no product price and no testing language:

| Product | Posts linking | Body words | Sources |
|---|---|---|---|
| tp-link-tapo-p100-mini-smart-wi-fi-socket-plug | 13 | 459 | 7 |
| ecovacs-deebot-x2-omni-square-robot-vacuum | 6 | 458 | 6 |
| sonoff-zigbee-3-0-usb-dongle | 6 | 441 | 7 |
| arlo-ultra-2-4k-spotlight-camera | 4 | 417 | 7 |
| dreame-l10s-ultra-robot-vacuum-and-mop | 4 | 438 | 6 |
| tp-link-tapo-p110-smart-plug-with-energy-monitoring | 4 | 384 | 7 |
| tp-link-tapo-smart-temperature-humidity-monitor | 4 | 433 | 6 |
| voltx-e600-portable-power-station | 4 | 439 | 5 |
| bose-smart-soundbar-ultra | 3 | 421 | 4 |
| philips-hue-smart-dimmer-switch-v2 | 3 | 427 | 4 |

**Format:** the front matter follows the existing curated files: name, brand,
bestFor, match, identifiers, pros (4–5) and cons (3–4). The `rating` field is
left out, with a comment saying why. So is the `retailers` block: for a
catalogue product the page and product boxes use the catalogue's verified
retailers and photo, so a second list would only compete with them.

**Sources:** each file ends with a "Sources" list, which also renders on the
page. They are mostly the manufacturer's Australian pages:
- tp-link.com/au, ecovacs.com/au, dreame.com.au, voltx.com.au, bose.com.au,
  philips-hue.com/en-au, au.arlo.com;
- plus ITEAD/Sonoff and kb.arlo.com where no AU page existed;
- plus the AU retailers that list each product: The Good Guys, JB Hi-Fi,
  Bunnings, Officeworks, Amazon AU and Outbax;
- plus Home Assistant's integration pages and a ChannelNews launch report.

Brand claims are attributed to the brand. The only AUD figures are Arlo
Secure plan prices from au.arlo.com. A draft that quoted Dreame consumable
prices was edited to leave the prices out.

**Code:**
- `lib/products.ts`:
  - `getProductBySlug` merges a curated file over its catalogue record: the
    editorial comes from the file, while the photo and verified retailers come
    from the catalogue. Before, the curated file replaced the record
    wholesale, which would have dropped both.
  - `getCuratedProduct()` added.
- `components/ProductEditorial.tsx` (new) adds an "Our research notes" card on
  the product page:
  - best for, pros and cons, the body and its sources;
  - a line reading "Research-based … NXT Smart Home has not tested this
    product".
- The verdict card and the meta description now use the curated bestFor.

**Checked:**
- `isIndexableProduct` passes for all ten, at 1,030–1,220 original words each
  (the files plus the rewritten descriptions and blurbs).
- `npm run build` passes. On a test server all ten pages render the notes and
  sources, with no noindex and no "Price listing" label.
- The sitemap is now 74 URLs: 10 product pages, 1 product category (Energy &
  Solar, the only one with 3 or more indexable products) and the `/products/`
  hub, which is back in the index.
- `npm run audit:thin`: product OK 10 (all indexable), THIN 125,
  THIN - EMPTY 63.
- **Article links (rule 8):** each product is already embedded by the posts
  that put it in the queue. No markers were added or changed in Strapi.

**Open questions** are in `reports/product-editorial-todo.md`: everything the
research could not confirm, and conflicts between sources. The main ones:
- **Tapo P110:** the catalogue entry's description matches the **P110M**
  (Matter, Siri), not the P110. Its rewritten Description panel may mention
  Matter, while the new research notes follow TP-Link's P110 page, which
  lists no Matter. Fix the catalogue text, or repoint the entry to the P110M.
- **Arlo Ultra 2:** a retailer marks it end of life, replaced by the Ultra 3,
  and Arlo's AU pages returned 403. The hub requirement, Wi-Fi band and IP
  rating are unconfirmed.
- **Dreame L10s Ultra:** Dreame's AU product page returns 404, so the specs
  come from its global page. The model may have been superseded by the Gen 2.
- **Ecovacs X2 Omni:** shown as sold out on Ecovacs AU; only the Amazon AU
  listing is confirmed. Ecovacs' own pages give conflicting mop-wash
  temperature and runtime figures, so both were left out.
- **Tapo temperature and humidity monitor:** it's the T315. The JB Hi-Fi link
  in the catalogue may point at the T310.
- **VoltX E600:** sources disagree on the output count (6 or 10), the charge
  time and the warranty (2 years on the product page, 12 months in the terms).
- **Sonoff dongle:** written as the ZBDongle-E, per the catalogue text. The
  exact variant sold is unconfirmed (Amazon AU offers P, E and MG24).

**Next 10 in the queue**, by the number of published posts linking to each:
1. philips-hue-white-color-ambiance-starter-kit-e27 (3)
2. sensibo-air-smart-air-conditioner-controller (3)
3. smart-mirabella-genio-wi-fi-powerboard (3)
4. tp-link-tapo-l530e-smart-wi-fi-light-bulb-e27 (3)
5. tuya-smart-wifi-ir-air-conditioner-controller-thermostat (3)
6. zemismart-matter-zigbee-thread-smart-home-hub (3)
7. amazon-echo-show-10-3rd-gen-hd-display (2)
8. dyson-purifier-cool-autoreact-tp07 (2)
9. ecovacs-deebot-t30-pro-omni-robot-vacuum (2)
10. eufy-eufycam-2c-pro-2k-wireless-security-system (2)

**Not deployed.**

---

## 24 September 2026: Task 6, [VERIFY] clean-up (batch 1)

**Approved** by the user after reviewing `reports/task6-review-batch1.md`,
which has the per-article diffs, the decision tables and every source URL.
**Written to Strapi** with `PUT /api/nxtsmarthome-posts/<documentId>?status=published`.

Each update set:
- `content`, `excerpt`, `keyTakeaways` and `faq` to the approved versions;
- `dateModified` to 2026-09-24;
- `publishDate` to the post's original `publishedAt`. A REST update resets
  `publishedAt`, and these posts had no `publishDate`, so without this the
  site would have dated them today.

**Checked:** both the published and draft copies were re-fetched after the
write, and all four have zero `[VERIFY` and match the approved text.

| Article | Tags | a / b / c | Backup |
|---|---|---|---|
| outdoor-tvs-projectors-speakers-australian-summer | 18 → 0 | 5 / 7 / 6 | exports/strapi-backup/outdoor-tvs-projectors-speakers-australian-summer-2026-09-24T06-56-38-734Z.json |
| smart-zoning-ducted-air-conditioning-cost-australia | 17 → 0 | 5 / 11 / 1 | exports/strapi-backup/smart-zoning-ducted-air-conditioning-cost-australia-2026-09-24T06-56-38-734Z.json |
| smart-thermostat-gas-ducted-hydronic-heating-australia | 16 → 0 | 9 / 5 / 2 | exports/strapi-backup/smart-thermostat-gas-ducted-hydronic-heating-australia-2026-09-24T06-56-38-734Z.json |
| robot-vacuum-running-costs-australia | 16 → 0 | 3 / 10 / 3 | exports/strapi-backup/robot-vacuum-running-costs-australia-2026-09-24T06-56-38-734Z.json |

Decisions: a = verified and linked to its source; b = rewritten as a range or
as guidance; c = unverifiable or legal, so the claim was removed and readers
are pointed to the authority. To restore an article, PUT the `published`
record from its backup file.

**Changes beyond the tags** (both approved):
- **Outdoor TVs:** the unsourced "voids the warranty" line now points readers
  to the manufacturer's warranty terms.
- **Robot vacuum running costs:** the metering-plug product box is now the
  Tapo P110. The P100 it showed has no energy monitoring.

**For a human to check (legal).** These sentences were reworded to point to
an authority, but they still touch regulated areas:
- **Electrical work:**
  - licensed electricians for new outdoor outlets and for 240V thermostat or
    mains wiring;
  - AS/NZS 3000 and RCD safety switches;
  - zone damper motors and switched supplies;
  - that extension leads are temporary only;
  - smart-plug load and adaptor/extension-lead safety.

  These cite Energy Safe Victoria and the NSW Government as examples.
- **Gas work:** use a licensed gasfitter; DIY retrofits and safety
  interlocks; the claim that DIY work voids warranties and insurance.
- **Refrigerant:** licensing, per arctick.org.
- **Tenancy:**
  - landlord permission for outdoor wiring and for thermostat or controller
    changes;
  - reinstating the original controller at move-out.

  These cite the NSW rules and Consumer Affairs Victoria as examples.
- **Noise rules** for outdoor audio, with EPA Victoria's times as an example.
- **Consumer law:**
  - the consumer guarantee still applying after a warranty expires (ACCC
    wording);
  - warranty risk from non-genuine detergent, generic parts and DIY battery
    replacement.

**Effect on the site:** with no tags left, the editorial guard stops blocking
these four. They come back to the live site within about 5 minutes (ISR); no
deploy is needed.

**Next 4 in the queue:**
1. reverse-cycle-air-conditioner-rooftop-solar-australia (14)
2. zigbee-mesh-garage-granny-flat-double-brick-home (13)
3. robot-vacuum-dock-placement-rental-apartment-no-new-wiring (13)
4. streaming-box-australia-free-to-air-catch-up-tv (12)

---

## 24 September 2026: Task 6, [VERIFY] clean-up (batch 2)

**Approved** by the user after reviewing `reports/task6-review-batch2.md`,
which has the per-article diffs, the decision tables and every source URL.
**Written to Strapi** with `PUT /api/nxtsmarthome-posts/<documentId>?status=published`,
the same way as batch 1: `content`, `excerpt`, `keyTakeaways` and `faq` set
to the approved versions, `dateModified` set to 2026-09-24, and
`publishDate` set to the post's original `publishedAt`.

**Checked:** before the write, the live records still matched the backups (no
edits since). After the write, both the published and draft copies were
re-fetched: all four have zero `[VERIFY`, match the approved text, and still
have 5 FAQ entries.

| Article | Tags | a / b / c | Backup |
|---|---|---|---|
| reverse-cycle-air-conditioner-rooftop-solar-australia | 14 → 0 | 6 / 5 / 3 | exports/strapi-backup/reverse-cycle-air-conditioner-rooftop-solar-australia-2026-09-24T07-08-26-197Z.json |
| zigbee-mesh-garage-granny-flat-double-brick-home | 13 → 0 | 3 / 7 / 3 | exports/strapi-backup/zigbee-mesh-garage-granny-flat-double-brick-home-2026-09-24T07-08-26-197Z.json |
| robot-vacuum-dock-placement-rental-apartment-no-new-wiring | 13 → 0 | 7 / 2 / 4 | exports/strapi-backup/robot-vacuum-dock-placement-rental-apartment-no-new-wiring-2026-09-24T07-08-26-197Z.json |
| streaming-box-australia-free-to-air-catch-up-tv | 12 → 0 | 7 / 3 / 2 | exports/strapi-backup/streaming-box-australia-free-to-air-catch-up-tv-2026-09-24T07-08-26-197Z.json |

To restore an article, PUT the `published` record from its backup file.

**Changes beyond the tags** (all three approved):
- **Robot vacuum dock:**
  - "One approved extension lead is fine" now treats a lead as a temporary
    stop-gap. This covers the body, the key takeaways, FAQ 2 and FAQ 3, and
    cites Queensland's Electrical Safety Office
    (https://www.electricalsafety.qld.gov.au/sites/default/files/2022-07/electricity-in-the-home.pdf).
  - The invented "Ninety per cent of 'my robot won't dock' complaints"
    statistic now reads "often a placement problem".
- **Zigbee mesh:** "single-digit milliwatts" now says most devices transmit
  at low power and that some amplified adapters reach about 100 mW, citing
  Zigbee2MQTT. "Two-year lifespans" became "run for a long time".

**Flagged but not changed:** some untagged sentences still have no source.
Each is listed in the review file.
- **Rooftop solar:**
  - "three to seven times that rate";
  - "4-6kWh";
  - "dedicated 15A circuit";
  - no caveat for households on gross metering.
- **Zigbee:** "every 6–10 metres", "three to five routers" and
  "10–15 minutes".
- **Dock:** the power-board advice against Dreame's 1000 W emptying draw;
  "2.4 GHz only".
- **Streaming box:**
  - "240V", where the nominal supply is 230V;
  - "25/5 plan";
  - "2GB RAM";
  - "still running iview in five years".

**For a human to check (legal).** These sentences were reworded to point to
an authority, but they still touch regulated areas:
- **Electrical work:**
  - licensed electricians for hardwired circuits, CT clamps, new power
    points, outdoor circuits and relays;
  - AS/NZS 3000;
  - ESV's warning that DIY electrical work is illegal (Victoria);
  - extension leads, power boards and RCM approval;
  - the 10A smart plug and 15A circuit claim;
  - plug and supply ratings on grey imports.
- **Tenancy and strata:**
  - landlord permission for wiring;
  - NSW strata "minor renovations";
  - "completely bond-safe", an absolute claim;
  - adhesive clips;
  - permanent water connections;
  - control of a granny-flat tenant's power, and recording devices.
- **Regulatory:**
  - Victoria's solar emergency backstop, sourced to AusNet only;
  - network export limits;
  - ACMA cabling rules for data points;
  - Zigbee transmit power.
- **Consumer law:** how the ACL applies to overseas and marketplace sellers.

**Effect on the site:** with no tags left, the editorial guard stops blocking
these four. They come back to the live site once the cached 404s expire (ISR,
about 5 minutes); no deploy is needed.

**Next 4 in the queue:**
1. smart-downlights-australian-ceilings-insulation-clearance-rules (12)
2. local-recording-vs-cloud-subscriptions-security-cameras-australia (12)
3. home-assistant-energy-dashboard-solar-export-time-of-use-tariffs (11)
4. wiring-video-doorbell-australian-chime-transformer (11)

---

## 24 September 2026: Task 6, [VERIFY] clean-up (batch 3)

**Approved** by the user after reviewing `reports/task6-review-batch3.md`,
which has the per-article diffs, the decision tables and every source URL.
**Written to Strapi** the same way as batches 1 and 2.

**Checked:**
- **Before the write:** each live record still matched its backup.
- **After the write:** both the published and draft copies were re-fetched.
  All four have zero `[VERIFY`, match the approved content, excerpt and key
  takeaways, and still have 5 FAQ entries.

| Article | Tags | a / b / c | Backup |
|---|---|---|---|
| smart-downlights-australian-ceilings-insulation-clearance-rules | 12 → 0 | 9 / 1 / 2 | exports/strapi-backup/smart-downlights-australian-ceilings-insulation-clearance-rules-2026-09-24T07-31-02-572Z.json |
| local-recording-vs-cloud-subscriptions-security-cameras-australia | 12 → 0 | 5 / 2 / 5 | exports/strapi-backup/local-recording-vs-cloud-subscriptions-security-cameras-australia-2026-09-24T07-31-02-572Z.json |
| home-assistant-energy-dashboard-solar-export-time-of-use-tariffs | 11 → 0 | 6 / 3 / 2 | exports/strapi-backup/home-assistant-energy-dashboard-solar-export-time-of-use-tariffs-2026-09-24T07-31-02-572Z.json |
| wiring-video-doorbell-australian-chime-transformer | 11 → 0 | 6 / 2 / 3 | exports/strapi-backup/wiring-video-doorbell-australian-chime-transformer-2026-09-24T07-31-02-572Z.json |

**Changes beyond the tags** (all four approved):
- **Smart downlights, insulation classifications:** the body list, key
  takeaways, excerpt and FAQ 1 were corrected against Table ZD1 of
  AS/NZS 60598.2.2:2016.
  - Non-IC fittings are for commercial and industrial use only, not homes.
  - A Do-Not-Cover bullet was added; it carries the manufacturer-clearance
    rule.
  - IC fittings can be abutted as well as covered.
  - The unlisted "CA80" became CA90, and CA135 is New Zealand only.
- **Smart downlights, excerpt:** "legally required" now reads "where you need
  a licensed electrician".
- **Video doorbell, key takeaways:** "Plug-in transformers are DIY-friendly"
  was removed. Ring AU says a licensed electrician must install its
  doorbells, so the text now points to the state regulator.
- **Video doorbell, key takeaways and excerpt:** "expect North American
  16-24V AC" was removed, since Ring's wired doorbell takes 8-24V AC. Both
  now tell readers to check their model's figures.

**Prices with a date:**
- **Security cameras:** Arlo AU plan prices, and Officeworks' $98 for
  SanDisk's 128GB High Endurance microSD card, which replaces a wrong
  $25-$40.
- **Smart downlights:** Hue prices corrected to $59.95 and $104.95.

Each is "at the time of writing", with a link.

**Flagged but not changed** (listed in the review file):
- **Downlights:** the 50°C roof-space figure, capacitor failure and Ta
  ratings, and the neutral-wire claim.
- **Cameras:** "2-4Mbps", and PoE cabling with no mention of a registered
  cabler.
- **Home Assistant energy:**
  - "highest rooftop solar uptake in the world";
  - "trapezoidal" advice that conflicts with the Home Assistant docs;
  - percentage figures that look invented;
  - the YAML example's 2pm-8pm peak, which is labelled illustrative.
- **Doorbell:** DC plug packs, "15 metres", and "240V" (the nominal supply is
  230V).

**For a human to check (legal):**
- **Electrical work:**
  - dimmer modules, smart switches and full downlight replacement;
  - CT clamps and switchboard work;
  - mains versus low-voltage doorbell wiring;
  - AS/NZS 3000;
  - the CA135 status, where the 2017 and 2021 amendments were not checked.
- **Privacy:**
  - the OAIC position on household cameras;
  - state listening-device laws for audio;
  - eufy's overseas data transfers;
  - smart-meter data.
- **Tenancy:** Victorian removable versus hard-wired camera consent, and
  Victorian and NSW renter consent for doorbells.
- **Consumer law:** the RCM sale requirement.

**Queue correction.** The earlier "next 4" lists left out two merge
survivors: keep-security-cameras-running-blackout-nbn-outage (16) and
smart-light-switches-neutral-wire-older-australian-homes (12). The five
merged-away posts still carry tags (36 in total), but they only redirect
(data/merged-articles.json), so they are not in the queue; unpublish them in
Strapi once their unique sections have moved.

**Remaining:** 17 live posts, 103 tags, which is about 5 more batches.

**Next 4 in the queue:**
1. keep-security-cameras-running-blackout-nbn-outage (16)
2. smart-light-switches-neutral-wire-older-australian-homes (12)
3. bathroom-humidity-sensor-exhaust-fan-automation-australia (9)
4. movie-night-lighting-scenes-you-can-build-without-touching-the-switchboard (8)

---

## 24 September 2026: Task 6, [VERIFY] clean-up (batch 4)

**Approved** by the user after reviewing `reports/task6-review-batch4.md`,
which has the per-article diffs, the decision tables and every source URL.
**Written to Strapi** the same way as batches 1-3.

**Checked:**
- **Before the write:** each live record still matched its backup.
- **After the write:** both the published and draft copies were re-fetched.
  All four have zero `[VERIFY`, match the approved content, excerpt and key
  takeaways, and still have 5 FAQ entries.

| Article | Tags | a / b / c | Backup |
|---|---|---|---|
| keep-security-cameras-running-blackout-nbn-outage | 16 → 0 | 8 / 7 / 1 | exports/strapi-backup/keep-security-cameras-running-blackout-nbn-outage-2026-09-24T07-47-41-669Z.json |
| smart-light-switches-neutral-wire-older-australian-homes | 12 → 0 | 7 / 5 / 0 | exports/strapi-backup/smart-light-switches-neutral-wire-older-australian-homes-2026-09-24T07-47-41-669Z.json |
| bathroom-humidity-sensor-exhaust-fan-automation-australia | 9 → 0 | 5 / 2 / 2 | exports/strapi-backup/bathroom-humidity-sensor-exhaust-fan-automation-australia-2026-09-24T07-47-41-669Z.json |
| movie-night-lighting-scenes-you-can-build-without-touching-the-switchboard | 8 → 0 | 2 / 3 / 3 | exports/strapi-backup/movie-night-lighting-scenes-you-can-build-without-touching-the-switchboard-2026-09-24T07-47-41-669Z.json |

**Errors corrected in the originals:**
- **Blackout cameras:**
  - On FTTC, the in-home box powers the service; the article said the
    street equipment had its own power.
  - 500Wh ÷ 25W is 20 hours, not 17, before losses.
  - nbn stopped offering FTTP battery back-up units in June 2024.
- **Bathroom humidity:** the unsupported 40-60% band became the National
  Asthma Council's 30-50%.
- **Smart light switches:** the unsourced depth and price figures were
  removed, along with "future sale obligations".
- **Movie-night lighting:** the budget figures were removed. The Hue Smart
  Button price, dated "at the time of writing", is $54.95 at Hue AU and $49
  at JB Hi-Fi.

**Consistency edits:** the excerpts, key takeaways and FAQs were changed to
match the body corrections. These are listed per article in the review
file.

**Changes beyond the tags** (both approved): in the smart light switches
excerpt, "no neutral … which is exactly what a smart switch wants", which
had the meaning backwards, was fixed. "Legally required" now reads "where you
need a licensed electrician".

**Flagged but not changed:** listed in the review file. They include
"240V", the bathroom fan trigger numbers, and the missing pointer to a
tenancy authority in the bathroom article.

**For a human to check (legal):**
- **Electrical work:**
  - swapping a switch;
  - bypass capacitors;
  - relay modules;
  - generator back-feeding;
  - bathroom wiring and fan replacement;
  - the NCC discharge rule;
  - the state-by-state licensing line.
- **Other areas:**
  - DIY work voiding insurance, citing NSW;
  - the RCM legal-sale wording;
  - renter consent, with Victoria as the example;
  - humidity and mould health claims.

**Remaining:** 13 live posts, 58 tags.

**Next 4 in the queue:**
1. what-not-to-plug-into-a-smart-plug-australia (7)
2. second-hand-smart-home-devices-australia (7)
3. smart-lighting-rental-australia-no-wiring (7)
4. robot-vacuum-local-home-assistant-no-cloud (7)

---

## 24 September 2026: Task 6, [VERIFY] clean-up (batch 5)

**Approved** by the user after reviewing `reports/task6-review-batch5.md`,
which has the per-article diffs, the decision tables and every source URL.
**Written to Strapi** the same way as batches 1-4.

**Checked:**
- **Before the write:** each live record still matched its backup.
- **After the write:** both the published and draft copies were re-fetched.
  All four have zero `[VERIFY` and match the approved content, excerpt and
  key takeaways. Each kept its FAQ count (5, 4, 5, 5).

| Article | Tags | Backup |
|---|---|---|
| what-not-to-plug-into-a-smart-plug-australia | 7 → 0 | exports/strapi-backup/what-not-to-plug-into-a-smart-plug-australia-2026-09-24T07-58-52-203Z.json |
| second-hand-smart-home-devices-australia | 7 → 0 | exports/strapi-backup/second-hand-smart-home-devices-australia-2026-09-24T07-58-52-203Z.json |
| smart-lighting-rental-australia-no-wiring | 7 → 0 | exports/strapi-backup/smart-lighting-rental-australia-no-wiring-2026-09-24T07-58-52-203Z.json |
| robot-vacuum-local-home-assistant-no-cloud | 7 → 0 | exports/strapi-backup/robot-vacuum-local-home-assistant-no-cloud-2026-09-24T07-58-52-203Z.json |

**Errors corrected in the originals:**
- **Robot vacuum:** Matter room and zone cleaning (service areas) arrived
  in Matter 1.4, and Home Assistant added initial support in 2026.3.
- **Second-hand devices:** private sales still carry the guarantees of
  title, undisturbed possession and no hidden debts.
- **Rental lighting:** AS/NZS 3000 is the Wiring Rules, not the licensing
  law.
- **Smart plug:** ratings now come from the Tapo P110M AU spec and Kmart AU
  heater manuals.

**Changes beyond the tags** (all three approved):
- **Robot vacuum, Ecovacs:** "no local path" now mentions the self-hosted
  (Bumper) option that Home Assistant documents, in the body and FAQ 2.
- **Robot vacuum, excerpt:** the dated "in 2024-25" was removed.
- **Rental lighting:**
  - "no landlord conversation, no risk" now reads "in most rentals",
    noting the heritage-listed exception;
  - "almost universally fine" now reads "generally the lowest-risk changes"
    (body and FAQ 5).

**Date fix (after the write):** two of these posts already had a
`publishDate`, and the write had overwritten it with `publishedAt`:
- second-hand-smart-home-devices-australia had 4 Aug 2026;
- what-not-to-plug-into-a-smart-plug-australia had 5 Aug 2026.

Both were restored from their backups on 24 Sep 2026 and checked on both the
published and draft copies. Batches 1-4 were not affected: none of those
posts had a `publishDate`. From batch 6 on, the write keeps an existing
`publishDate` and only fills it when it is empty.

**Open, not part of Task 6:** second-hand-smart-home-devices-australia has no
`::product:` boxes (CLAUDE.md rule 8). Two catalogue products could be added
as a separate change.

**Flagged but not changed:** listed in the review file. They include the
E26 bulb claim, the "stuck closed" relays and the L10s Ultra Gen2
distinction.

**Remaining:** 9 live posts, 30 tags.

**Next 4 in the queue:**
1. smart-plug-buying-guide-australia (6)
2. smart-home-holiday-house-australia (6)
3. smart-home-hub-buying-guide-australia (5)
4. overseas-smart-home-devices-australia (4)

After that: smart-home-devices-older-australians (4),
smart-home-devices-without-internet (2), thread-vs-matter-difference (1),
future-proof-smart-home-devices-australia (1) and
where-to-buy-smart-home-australia (1).

---

## 24 September 2026: Task 6, [VERIFY] clean-up (batch 6)

**Approved** by the user after reviewing `reports/task6-review-batch6.md`,
which has the per-article diffs, the decision tables and every source URL.

**Written to Strapi** the same way as before, with one change: an existing
`publishDate` is now kept. The smart plug guide (5 Aug), holiday house
(4 Aug) and overseas devices (4 Aug) kept theirs.

**Checked:**
- **Before the write:** each live record still matched its backup.
- **After the write:** both the published and draft copies were re-fetched.
  All four have zero `[VERIFY` and match the approved content, excerpt and
  key takeaways, and each kept its FAQ count (5, 4, 10, 4).

**Hub guide date:** the smart home hub guide had no `publishDate`. Its
`publishedAt` had already been reset to 24 Sep 2026 02:14 UTC by the
FAQ-to-field conversion earlier that day, so the write first gave it
today's date. Its original publish time was not kept anywhere, so its
`publishDate` is set to its `createdAt`, 13 Aug 2026. That is the best
available estimate: 24 of the 69 posts were published within an hour of
creation.

| Article | Tags | a / b / c | Backup |
|---|---|---|---|
| smart-plug-buying-guide-australia | 6 → 0 | 5 / 0 / 1 | exports/strapi-backup/smart-plug-buying-guide-australia-2026-09-24T08-13-02-919Z.json |
| smart-home-holiday-house-australia | 6 → 0 | 2 / 1 / 3 | exports/strapi-backup/smart-home-holiday-house-australia-2026-09-24T08-13-02-919Z.json |
| smart-home-hub-buying-guide-australia | 5 → 0 | 1 / 3 / 1 | exports/strapi-backup/smart-home-hub-buying-guide-australia-2026-09-24T08-13-02-919Z.json |
| overseas-smart-home-devices-australia | 4 → 0 | 3 / 0 / 1 | exports/strapi-backup/overseas-smart-home-devices-australia-2026-09-24T08-13-02-919Z.json |

**Changes beyond the tags** (all five approved):
- **Hub guide:**
  - iPad was removed as an Apple home hub, per Apple's AU support page.
  - The unsourced and wrong price ranges became a cheapest-to-dearest
    ranking, with one dated example: the Aqara Hub M3 at $297, Officeworks.
- **Holiday house:** the indoor-camera ban and outdoor-camera disclosure are
  now attributed to Airbnb. "Not a judgement call" was softened.
- **Overseas devices:** "will not carry" the RCM became "may not".
  "Licensed work regardless" became "generally", with a pointer to the
  state rules.
- **Smart plug guide:** the Wikipedia citations were removed, and the 10A
  figure now rests on the TP-Link Tapo P110 AU spec. The heading "Compliance
  is not optional here" became "Check for compliance".

**Error corrected in the original:** overseas devices called EESS
"national". Only Qld, WA, Vic and Tas are signatories.

**Open, not part of Task 6:**
- **No `::product:` boxes (CLAUDE.md rule 8):** holiday house, hub guide and
  overseas devices, plus second-hand devices from batch 5.
- **Hub guide title:** it still says "2025".

**Remaining:** 5 live posts, 9 tags:
- smart-home-devices-older-australians (4)
- smart-home-devices-without-internet (2)
- thread-vs-matter-difference (1)
- future-proof-smart-home-devices-australia (1)
- where-to-buy-smart-home-australia (1)

---

## 24 September 2026: Task 6, [VERIFY] clean-up (batch 7, final)

**Approved** by the user after reviewing `reports/task6-review-batch7.md`.
The 9 tags were few enough to research directly, without research agents.
**Written to Strapi** the same way as batch 6: the existing `publishDate`
(3-4 Aug 2026) was kept on all five.

**Checked:**
- **Before the write:** each live record still matched its backup.
- **After the write:** both the published and draft copies were re-fetched.
  All five have zero `[VERIFY`, match the approved content, and still have
  4 FAQ entries each.

| Article | Tags | Decisions | Backup |
|---|---|---|---|
| smart-home-devices-older-australians | 4 → 0 | a 2 / c 2 | exports/strapi-backup/smart-home-devices-older-australians-2026-09-24T08-28-48-837Z.json |
| future-proof-smart-home-devices-australia | 1 → 0 | a 1 | exports/strapi-backup/future-proof-smart-home-devices-australia-2026-09-24T08-28-48-837Z.json |
| smart-home-devices-without-internet | 2 → 0 | b 2 (maintenance comment) | exports/strapi-backup/smart-home-devices-without-internet-2026-09-24T08-28-48-837Z.json |
| thread-vs-matter-difference | 1 → 0 | b 1 (maintenance comment) | exports/strapi-backup/thread-vs-matter-difference-2026-09-24T08-28-48-837Z.json |
| where-to-buy-smart-home-australia | 1 → 0 | b 1 (maintenance comment) | exports/strapi-backup/where-to-buy-smart-home-australia-2026-09-24T08-28-48-837Z.json |

**Sources:**
- Energy Safe Victoria;
- OAIC (security cameras);
- the My Aged Care and Department of Health, Disability and Ageing pages on
  the AT-HM scheme;
- the ACCC ("Broken but out of warranty? Your consumer guarantee rights may
  still apply").

**Changes beyond the tags** (both approved):
- The older Australians article's "Home Care Package" wording was updated
  to Support at Home, in the body and in the FAQ 1511 question and answer.
- The unsourced "reimbursement after the fact is far harder" claim was
  removed.

### Task 6 result

**Every live post is now free of `[VERIFY]`:** 69 published posts, and 0
live posts carry a tag. Across the seven batches, 29 articles were cleaned.
The editorial guard no longer holds back any live post, and every one
returns 200.

**Remaining tags are on merged-away duplicates only.** These redirect to
their survivors and are excluded from listings and the sitemap:
- renter-smart-home-devices-no-drilling (3)
- robot-vacuum-buying-guide-australian-homes-pets (8)
- smart-light-switches-no-neutral-wire-australia (9)
- how-to-keep-security-cameras-running-through-a-blackout-or-nbn-outage (10)
- reverse-cycle-split-system-voice-app-control-without-replacing (6)

Move their unique sections into the survivors, then unpublish them in
Strapi.

**Thin-content audit** (`npm run audit:thin`, re-run after the write) finds
5 indexable thin pages:
- where-to-buy-smart-home-australia: 720 words, borderline;
- thread-vs-matter-difference: 748 words, borderline;
- three author profiles under 150 words: adrian-thompson, harry-cheng and
  kritin-curtis.

**Still open, not part of Task 6:** 9 live articles have no `::product:`
boxes, which breaks CLAUDE.md rule 8:
- second-hand-smart-home-devices-australia
- smart-home-holiday-house-australia
- smart-home-hub-buying-guide-australia
- overseas-smart-home-devices-australia
- smart-home-devices-older-australians
- future-proof-smart-home-devices-australia
- smart-home-devices-without-internet
- thread-vs-matter-difference
- where-to-buy-smart-home-australia

The hub guide's title still says "2025".
