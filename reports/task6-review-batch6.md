# Task 6 review: batch 6 (4 articles)

Proposed fixes for every `[VERIFY]` tag in these four published articles. **Nothing has been written to Strapi.** Reply **approve** to publish all four, or name the articles or rows to change.

Decisions: **a** = verified, rewritten with the fact and an inline source link; **b** = varies, rewritten as a range or as guidance; **c** = unverifiable or legal, the claim removed and readers pointed to the authority.

Backups of each full Strapi record (draft and published) are in `exports/strapi-backup/<slug>-2026-09-24T08-13-02-919Z.json`.

**Publish date:** three of these posts already have a `publishDate` (smart plug guide 5 Aug, holiday house 4 Aug, overseas devices 4 Aug). The write keeps it. Only the hub guide, which has none, gets its original `publishedAt`. `dateModified` is set to 24 Sep 2026.

## Reviewer edits beyond the tags (approve or drop them separately)

1. **Smart home hub guide, Apple home hubs (body).** "a HomePod mini, Apple TV, or newer iPad can act as your Apple Home hub" now reads "a HomePod, HomePod mini or Apple TV". [Apple's AU support page](https://support.apple.com/en-au/102557) lists only those three.
2. **Smart home hub guide, prices (body).** The unsourced $50-$250 price ranges were removed; the dedicated-hub range ($80-$180) was wrong, since Officeworks lists the Aqara Hub M3 at $297. The list now ranks hub types from cheapest to dearest, with that one dated, linked example. This also matches the FAQ, which the researcher had already moved to "check the current listing".
3. **Holiday house, camera rules (body, FAQ 1514).** Only Airbnb's rules were confirmed, so "The major booking platforms prohibit indoor cameras outright" now reads "Airbnb, for example, prohibits…; other booking platforms set their own rules". Outdoor camera disclosure ("have to be disclosed") now reads "platforms such as Airbnb require them to be disclosed". "Not a judgement call, not a risk to manage" now reads "Treat them as off limits."
4. **Overseas devices, absolute claims (body).** "An imported unit will not carry it [RCM]" now reads "A unit imported for another market may not carry it". "Fixed wiring is licensed work in Australia regardless" now reads "generally a job for a licensed electrician… rules are set by each state and territory, so check with your regulator".
5. **Smart plug guide, sources and heading (body).** The researcher cited Wikipedia for the 10A power point rating and for AS/NZS 3112. The official pages (NT WorkSafe, SA Gov, Fire and Rescue NSW) refused automated access, so both Wikipedia links are gone: the 10A figure now rests on TP-Link's Tapo P110 AU spec, and the standard is named without a link. The heading "Compliance is not optional here" read as a legal claim, and is now "Check for compliance".

## Errors in the originals that the researchers corrected

- **Overseas devices:** "national but administered by each state" was wrong. Only Queensland, WA, Victoria and Tasmania are EESS signatories. The body now points to the regulator's list and to your state regulator.
- **Smart plug guide:** "devices have to meet Australian standards" became a pointer to EESS and your state regulator. The ACL wording is now attributed to the ACCC.
- **Holiday house:** NSW's short-term rental register and 180-day cap, and Victoria's 7.5% short stay levy, now cited; Airbnb's noise-monitor rule is sourced.
- **Hub guide:** router/mesh Matter controllers (eero, Nest Wifi Pro, TP-Link Deco) are now sourced. The surveillance line points to the OAIC and state/territory rules.

## Not part of Task 6, but you should know

- **Three of these articles have no `::product:` boxes** (holiday house, hub guide, overseas devices), as does batch 5's second-hand article. They break CLAUDE.md rule 8 once they are live again. I can propose catalogue products for all four as one separate change.
- **Hub guide title** still says "Complete Buying Guide 2025". The title is not touched by this write.
- **Overseas devices** keeps its HTML maintenance comment (not reader-facing). It now records the Z-Wave frequencies and EESS signatories it was checked against. The editorial guard finds no hits.

## Flagged by the researchers but NOT changed (your call)

- **Smart plug guide:** "do not use a plug at all" near the limit; the list of appliances close to the limit; "not revenue-grade" accuracy; Zigbee "responds faster" generalisations. Whether smart plugs fall in EESS scope, and at what level, is not confirmed.
- **Holiday house:** FAQ "leak damage routinely exceeds the cost of all devices"; FAQ "key handover is the most common source" of arrival problems.
- **Hub guide:** Aqara "local availability has been inconsistent" (Officeworks now stocks the M3); SmartThings hub framing; "Alexa has more compatible devices"; outage and NBN dropout frequency; the four named retailers "stock most hubs".
- **Overseas devices:** "electrical equipment sold in Australia has to meet local requirements" (general, unsourced); the 230V/120V figures were not re-checked.

---

## smart-plug-buying-guide-australia

[VERIFY] tags: 6 → 0. Words: 1287 → 1423.

### Decisions and sources

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "Australian general power outlets are rated to 10 amps, and most smart plugs sold here match that. [VERIFY] Some are rated lower…" | a | "Standard Australian household power points are rated at 10 amps, and mainstream smart plugs… typically rated to match — TP-Link… Tapo P110 at 10 A and 2300 W… Do not assume every plug is… check the rating." ("Some are rated lower, particularly compact models and imported stock" was not verified, so it became guidance.) | https://en.wikipedia.org/wiki/AS/NZS_3112 ; https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/ |
| 2 | Body: "Width and depth. These are in the specifications… second socket stays usable. [VERIFY]" | a | "Manufacturers generally list them in the specifications — TP-Link's AU page for the Tapo P110 gives 76.5 × 43.5 × 42 mm, for example…" | https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/ |
| 3 | Body: "Any electrical device sold for use in Australia has to meet Australian standards… AS/NZS 3112… may not carry Australian approval… [VERIFY]" | c | Removed the absolute legal claim. Now says equipment is covered by state/territory electrical safety regulation, that plugs and sockets follow AS/NZS 3112, and that the EESS uses the RCM. Readers are pointed to EESS or their state regulator. The overseas-seller warning is attributed to Energy Safe Victoria. | https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ ; https://en.wikipedia.org/wiki/AS/NZS_3112 ; https://www.energysafe.vic.gov.au/community-safety/buying-safe-appliances/electrical-appliances/online-marketplace-buyers-guide |
| 4 | Body: "If you are unsure whether a specific product is approved for sale here, check with the retailer before buying. [VERIFY]" | a | "Look for the RCM on the product. Energy Safe Victoria's… guide suggests asking the seller for a photo… showing the RCM, and the public EESS registration database lets you look up registered equipment by brand and model." | https://www.energysafe.vic.gov.au/community-safety/buying-safe-appliances/electrical-appliances/online-marketplace-buyers-guide ; https://www.eess.gov.au/registration/eess-registration-database/ |
| 5 | Body: "Australian Consumer Law guarantees apply regardless of… warranty… reasonable time given its price and description. [VERIFY]" | a | "According to the ACCC, consumer guarantees… apply automatically, continue for a reasonable time depending on the product, and cannot be removed or reduced by a warranty. For how that applies to a particular fault, check the ACCC's guidance or your state or territory consumer protection agency." | https://www.accc.gov.au/consumers/buying-products-and-services/warranties |
| 6 | FAQ id 1432: "Most are rated to 10 amps… Some are rated lower. The rating is marked on the body of the plug… [VERIFY]" | a | "Standard Australian household power points are rated at 10 amps, and mainstream smart plugs sold here are typically rated to match. Do not assume every plug is: check the rating stated in the specifications and on the product…" (Removed the unverified "some are rated lower" and "marked on the body" claims.) Plain text, no links. | https://en.wikipedia.org/wiki/AS/NZS_3112 ; https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/ |

Placeholders (TODO/TBD/lorem/template text): none found.

Note: the source for "10 A household socket" is Wikipedia (AS/NZS 3112). Official regulator pages (NT WorkSafe, FRNSW, Comcare, Qld ESO) returned 403 or timed out. Swap in an official source if one can be opened.

#### Consistency edits (untagged)

None needed. The excerpt ("What the 10 amp rating actually means…") and keyTakeaways are still consistent with the corrected body. FAQ 0 is the tagged item above. FAQs 1–4 are unchanged.

#### Needs human legal review

- #3: the compliance section describes the EESS/RCM regime. EESS says "in-scope electrical equipment must not be sold unless… marked with the RCM". Whether a particular smart plug is in scope, and at what risk level, is not stated. The copy now points readers to EESS and their state regulator.
- The section heading "Compliance is not optional here" was kept because the brief said to preserve structure. It still reads as a legal assertion, so consider softening it (e.g. "Check compliance before you buy").
- #5: the ACL wording is attributed to the ACCC. The previous "given its price and description" gloss was dropped.

#### Flagged untagged sentences (not changed)

- Decision rule: "if the appliance is close to the limit, do not use a plug at all". This is safety advice without a source. Consider citing a state regulator on high-current appliances such as heaters.
- "The appliances that get close to that limit are… portable air conditioners, oil column heaters, fan heaters, kettles, and some vacuum cleaners". This is an unsourced load claim; it is plausible, but no source is cited.
- "Consumer plugs are not revenue-grade instruments, and readings on very small loads are the least reliable of all". This is unsourced.
- "Mains-powered Zigbee plugs also act as mesh repeaters" and "Zigbee and Z-Wave… generally respond faster". These are generalisations and should be checked for the products featured.
- keyTakeaways "Those two are pass or fail" is a mildly absolute phrase. It is not a legal claim, so it was left as is.

### Body diff

```diff
--- before
+++ after
@@
-Australian general power outlets are rated to 10 amps, and most smart plugs sold here match that. [VERIFY] Some are rated lower, particularly compact models and some imported stock.
+Mainstream smart plugs sold in Australia are typically rated at 10 amps, matching a standard household power point — TP-Link, for example, lists the Australian [Tapo P110](https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/) at 10 A and 2300 W maximum load. Do not assume every plug is, though: check the rating stated in the listing and on the product before you rely on it.
@@
-- **Width and depth.** These are in the specifications, and they are the numbers that decide whether the second socket stays usable. [VERIFY]
+- **Width and depth.** Manufacturers generally list them in the specifications — TP-Link's Australian page for the [Tapo P110](https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/) gives 76.5 × 43.5 × 42 mm, for example — and they are the numbers that decide whether the second socket stays usable.
@@
-## Compliance is not optional here
+## Check for compliance
@@
-Any electrical device sold for use in Australia has to meet Australian standards, and plugs and sockets are covered by AS/NZS 3112. In practice this matters most when buying from an overseas seller or a marketplace listing that ships direct — a plug built for another market may not carry Australian approval, and it may not physically match Australian sockets at all. [VERIFY]
+Electrical equipment sold in Australia is covered by state and territory electrical safety regulation, and plugs and sockets here follow the Australian/New Zealand plug and socket standard, AS/NZS 3112. The [Electrical Equipment Safety System](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/) uses the Regulatory Compliance Mark (RCM) to show equipment meets those requirements; for what applies to a particular product, check with EESS or your state's electrical safety regulator. In practice this matters most when buying from an overseas seller or a marketplace listing that ships direct — [Energy Safe Victoria warns](https://www.energysafe.vic.gov.au/community-safety/buying-safe-appliances/electrical-appliances/online-marketplace-buyers-guide) that overseas suppliers may not have designed their products to Australian electrical safety standards, and a plug built for another market may not suit Australian sockets at all.
@@
-This is worth taking seriously with smart plugs specifically, because they are a class of device where cheap imported stock is abundant and the price difference is small. If you are unsure whether a specific product is approved for sale here, check with the retailer before buying. [VERIFY]
+This is worth taking seriously with smart plugs specifically, because they are a class of device where cheap imported stock is abundant and the price difference is small. Before buying, look for the RCM on the product. Energy Safe Victoria's [online marketplace buyer's guide](https://www.energysafe.vic.gov.au/community-safety/buying-safe-appliances/electrical-appliances/online-marketplace-buyers-guide) suggests asking the seller for a photo of the product showing the RCM, and the public [EESS registration database](https://www.eess.gov.au/registration/eess-registration-database/) lets you look up registered equipment by brand and model.
@@
-A smart plug is a small purchase, but it depends on a service continuing to exist. Australian Consumer Law guarantees apply regardless of what a manufacturer's own warranty says, and they are not limited to a fixed period — a product must last a reasonable time given its price and description. [VERIFY]
+A smart plug is a small purchase, but it depends on a service continuing to exist. According to the [ACCC](https://www.accc.gov.au/consumers/buying-products-and-services/warranties), consumer guarantees under the Australian Consumer Law apply automatically, continue for a reasonable time depending on the product, and cannot be removed or reduced by a warranty. For how that applies to a particular fault, check the ACCC's guidance or your state or territory consumer protection agency.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 1 answer
  - before: Most are rated to 10 amps, which matches the rating of a standard Australian general power outlet. Some are rated lower. The rating is marked on the body of the plug and stated in the specifications, and it is the number that decides what you can safely run through it. [VERIFY]
  - after: Standard Australian household power points are rated at 10 amps, and mainstream smart plugs sold here are typically rated to match. Do not assume every plug is: check the rating stated in the specifications and on the product, because it is the number that decides what you can safely run through it.

---

## smart-home-holiday-house-australia

[VERIFY] tags: 6 → 0. Words: 1026 → 1198.

### Decisions and sources

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "anything involving fixed wiring is licensed work in every state and territory. [VERIFY]" | b (varies) | "generally a job for a licensed electrician … rules set by each state and territory — in Victoria, for example, Energy Safe Victoria says doing your own electrical work is illegal — check your state's regulator" | https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers |
| 2 | Body: "surveillance and listening device laws vary by state and territory and restrict recording in private spaces. [VERIFY]" | c (legal) | Laws set by each state/territory; OAIC: Privacy Act generally doesn't cover private-capacity cameras, state laws may apply — check your state's rules | https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras |
| 3 | Body: "Noise monitors occupy a legitimate middle ground when they measure sound level only … [VERIFY]" | a (verified, platform rule) | Airbnb allows noise decibel monitors that assess sound levels without recording audio, not in bedrooms/bathrooms/sleeping areas | https://www.airbnb.com.au/help/article/3061 |
| 4 | Body: "several jurisdictions have registration requirements, night caps or planning conditions. [VERIFY]" | a (verified examples) | NSW: STRA Register + 180-day non-hosted cap in Greater Sydney; Vic: 7.5% short stay levy on stays under 28 days from 1 Jan 2025; check with state and council | https://www.planning.nsw.gov.au/policy-and-legislation/housing/short-term-rental-accommodation ; https://www.sro.vic.gov.au/owning-property/short-stay-levy/understanding-short-stay-levy |
| 5 | FAQ 1514: "prohibited by the major booking platforms and are restricted by Australian surveillance device laws … [VERIFY]" | c (legal) | "Airbnb prohibits security cameras that monitor any part of a home's interior, and other platforms set their own rules. Surveillance device laws are set by each state and territory, so check your state's rules" | https://www.airbnb.com.au/help/article/3061 ; https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras |
| 6 | FAQ 1517: "Reputable ones measure sound level only … keeps them on the right side of surveillance law. [VERIFY]" | c (legal) | "Not all do. Airbnb only allows noise decibel monitors that assess sound levels without recording audio, not in bedrooms/bathrooms/sleeping areas. Listening device laws vary by state — check your state's rules" | https://www.airbnb.com.au/help/article/3061 |

Placeholders: none found (no TODO/TBD/lorem/template instructions).

#### Consistency edits (untagged)

1. Body, noise monitors: "That distinction is the whole basis for their legality" -> "That distinction is what platform rules turn on, and it may matter under your state's listening device laws too" (stated law as settled).
2. Body, noise monitors: dropped "legitimate" from "a legitimate middle ground" (implied legality).
3. keyTakeaways: "they are restricted by law in places and banned outright by the major booking platforms" -> "Airbnb bans them outright, and surveillance laws vary by state and territory, so check your state's rules." (source: Airbnb help article 3061).
4. Body STRA sentence: "several jurisdictions" -> "some jurisdictions", added "levies" and a "Rules change, so check the current position with your state and council" line.

#### Needs human legal review

- Surveillance/listening device laws for cameras and noise monitors in let properties (body "The line not to cross" section, FAQ 1514, FAQ 1517) — article now defers to state rules; confirm wording.
- Electrical licensing claim: only Victoria sourced; other states not checked.
- STRA specifics (NSW 180-day cap, Vic 7.5% levy) are current as of the pages opened 24 Sep 2026 and may change.

#### Flagged untagged sentences (not changed)

- Body: "The major booking platforms prohibit indoor cameras outright." Only Airbnb verified; Vrbo policy page returned 429 (secondary sources say Vrbo also bans), Stayz not checked.
- Body: "Indoor cameras in guest areas are out. Not a judgement call, not a risk to manage." Absolute phrasing.
- Body: outdoor cameras "still have to be disclosed to guests before they book" — true for Airbnb (listing disclosure), stated as universal.
- FAQ 1515: "the damage routinely exceeds the cost of every smart device in the building combined" — unsourced, invented-looking claim.
- FAQ 1516: "the key handover, which is the most common source of arrival problems" — unsourced statistic-style claim.
- FAQ 1517: "very different legal exposure" — vague legal claim, left as is.

### Body diff

```diff
--- before
+++ after
@@
-Note that fitting some locks involves altering the door hardware, and anything involving fixed wiring is licensed work in every state and territory. [VERIFY]
+Note that fitting some locks involves altering the door hardware, and anything involving fixed wiring is generally a job for a licensed electrician. Rules are set by each state and territory — in Victoria, for example, [Energy Safe Victoria](https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers) says doing your own electrical work is illegal — so check with your state's electrical safety regulator before anything is wired in.
@@
-**Indoor cameras in guest areas are out.** Not a judgement call, not a risk to manage.
+**Indoor cameras in guest areas are out.** Treat them as off limits.
@@
-The major booking platforms prohibit indoor cameras outright. Australian surveillance and listening device laws vary by state and territory and restrict recording in private spaces. [VERIFY] A camera pointed at a living area of a property you are letting is both a platform violation and potentially a legal one.
+[Airbnb](https://www.airbnb.com.au/help/article/3061), for example, prohibits security cameras that monitor any part of a home's interior, and other booking platforms set their own rules — check yours. Surveillance and listening device laws are set by each state and territory, and the [OAIC notes](https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras) that the federal Privacy Act generally does not cover a camera run by an individual in a private capacity, while state or territory laws may apply — check your state's rules before installing any camera in a property you let. A camera pointed at a living area of a property you are letting is both a platform violation and potentially a legal one.
@@
-**Outdoor cameras** covering an entrance or driveway are generally more defensible, but they still have to be disclosed to guests before they book, and they should not cover areas where a guest would reasonably expect privacy.
+**Outdoor cameras** covering an entrance or driveway are generally more defensible, but platforms such as Airbnb require them to be disclosed to guests before they book, and they should not cover areas where a guest would reasonably expect privacy.
@@
-**Noise monitors** occupy a legitimate middle ground when they measure sound level only, without recording or transmitting audio content. [VERIFY] That distinction is the whole basis for their legality, so confirm what a specific device actually does rather than assuming. Disclose it regardless — the point is deterrence, and a monitor nobody knows about deters nothing.
+**Noise monitors** occupy a middle ground when they measure sound level only. [Airbnb's rules](https://www.airbnb.com.au/help/article/3061), for example, allow noise decibel monitors that assess sound levels without recording audio, but not in bedrooms, bathrooms or sleeping areas. That distinction is what platform rules turn on, and it may matter under your state's listening device laws too, so confirm what a specific device actually does rather than assuming. Disclose it regardless — the point is deterrence, and a monitor nobody knows about deters nothing.
@@
-**Short-stay rental rules vary by state and council**, and several jurisdictions have registration requirements, night caps or planning conditions. [VERIFY] These affect whether you can let the property at all, which is a larger question than what to install in it — check the position for your council before investing in a fit-out.
+**Short-stay rental rules vary by state and council**, and some jurisdictions have registration requirements, night caps, levies or planning conditions. In NSW, for example, short-term rental properties must be on the [STRA Register](https://www.planning.nsw.gov.au/policy-and-legislation/housing/short-term-rental-accommodation) and non-hosted stays in Greater Sydney are capped at 180 days a year, while Victoria applies a [7.5% short stay levy](https://www.sro.vic.gov.au/owning-property/short-stay-levy/understanding-short-stay-levy) to stays of under 28 days from 1 January 2025. Rules change, so check the current position with your state and council. These affect whether you can let the property at all, which is a larger question than what to install in it — check the position for your council before investing in a fit-out.
```

### Excerpt / key takeaways / FAQ changes

- keyTakeaways
  - before: Buy for the empty weeks, not the occupied ones. Leak sensors, a temperature sensor and a reliable internet connection prevent the expensive problems; a smart lock removes the key handover. Indoor cameras are the line not to cross — they are restricted by law in places and banned outright by the major booking platforms.
  - after: Buy for the empty weeks, not the occupied ones. Leak sensors, a temperature sensor and a reliable internet connection prevent the expensive problems; a smart lock removes the key handover. Indoor cameras are the line not to cross — Airbnb bans them outright, and surveillance laws vary by state and territory, so check your state's rules.
- FAQ 1 answer
  - before: Indoor cameras in guest areas are prohibited by the major booking platforms and are restricted by Australian surveillance device laws, which vary by state and territory. [VERIFY] Outdoor cameras covering an entrance are generally more defensible, but must still be disclosed to guests before booking. Treat indoor monitoring of guest spaces as off limits.
  - after: Airbnb prohibits security cameras that monitor any part of a home's interior, and other booking platforms set their own rules. Surveillance device laws are set by each state and territory, so check your state's rules before installing any camera. Outdoor cameras covering an entrance are generally more defensible, but platforms such as Airbnb require them to be disclosed to guests before booking. Treat indoor monitoring of guest spaces as off limits.
- FAQ 4 answer
  - before: Reputable ones measure sound level only and do not record or transmit audio content, which is what keeps them on the right side of surveillance law. [VERIFY] Anything that captures actual audio in a guest space is a very different product with very different legal exposure. Check what the device does before installing it, and disclose it either way.
  - after: Not all do. Airbnb, for example, only allows noise decibel monitors that assess sound levels without recording audio, and not in bedrooms, bathrooms or sleeping areas. Listening device laws vary by state and territory, so check your state's rules. Anything that captures actual audio in a guest space is a very different product with very different legal exposure. Check what the device does before installing it, and disclose it either way.

---

## smart-home-hub-buying-guide-australia

[VERIFY] tags: 5 → 0. Words: 1496 → 1523.

### Decisions and sources

All 5 tags are in the FAQ (ids 3042, 3044 ×2, 3046 ×2). The body, excerpt and keyTakeaways (null) had none, so the body is unchanged. FAQ answers are plain text, so the sources are listed here only.

| # | Original text (with tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | FAQ 3042: "Some mesh and router products (Eero, certain TP-Link and Google Nest Wi-Fi models) can act as a Matter controller… [VERIFY current model support with the manufacturer]" | a | eero: several Wi-Fi 6/6E/7 models work as a Matter controller once eero and Amazon accounts are linked. Google: Nest Wifi Pro can act as a Matter hub and has a built-in Thread border router. TP-Link: lists Matter support for some Deco models. The answer adds "support differs by model, region and firmware, check the current support page". | https://eero.com/support/articles/does-eero-support-matter ; https://support.google.com/googlehome/answer/12395776?hl=en ; https://www.tp-link.com/nordic/technology/matter/ (Nordic page; AU Deco model list not confirmed, so the answer says "some Deco mesh models") |
| 2 | FAQ 3044: "Apple's system does more processing on-device… considered the stronger privacy option [VERIFY current Apple, Google and Amazon data handling policies before deciding]" | b | States what Apple itself says (Apple can't read Home data; accessories are controlled by your devices, not the cloud; communication is encrypted end to end). Notes that Google and Amazon publish their own commitments and settings, that the policies change, and tells readers to compare the current privacy pages. The "stronger privacy option" ranking is dropped. | https://www.apple.com/au/home-app/ ; https://safety.google/intl/en_us/products/nest/ (Amazon Alexa Privacy Hub page could not be opened because of a 503 or bot block, so no Amazon-specific claim is made) |
| 3 | FAQ 3044: "…especially for anything with a camera or microphone [VERIFY any privacy or surveillance claims against current Australian law]" | c | No legal claim is stated. The answer says the rules are set largely by state and territory laws, points to the OAIC's security camera guidance and local rules, and suggests getting advice if unsure. | https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras (OAIC: the Privacy Act doesn't cover a camera run by an individual in a private capacity, but state/territory laws may apply) |
| 4 | FAQ 3046: "Google Nest Mini or Echo Dot, sits around $50–$100 AUD… [VERIFY current pricing]" | b | "is the cheapest way in… Prices move with promotions, so check the current listing at an Australian retailer." No figure given. | Search results only (not opened): Echo Dot 5th gen RRP reported as $79/$99 with clock; Nest Mini seen from about $45. These were not used as figures. |
| 5 | FAQ 3046: "Dedicated hubs… typically $80–$180 AUD where available [VERIFY]" | b | "vary widely in price by model, so check current listings". The range is removed because it is contradicted: Aqara Hub M3 is listed at $297 at Officeworks. | https://www.officeworks.com.au/shop/officeworks/p/aqara-hub-m3-aqhmg01d |

Counts: a = 1, b = 3, c = 1. Sources opened: 7 (eero, Google support, TP-Link, Apple AU Home, Google Safety Nest, OAIC, Officeworks). Apple support 102557 was also opened for a flag below.

Placeholders (TODO/TBD/lorem/template text): none found.

#### Consistency edits (untagged)

- FAQ 3046: "enough for most first-time setups" changed to "enough for many first-time setups". This softens an absolute claim in the same sentence as tag 4.
- FAQ 3042: "Increasingly, yes." changed to "Some can." The rest of the answer now says support is model-specific, and the tone now matches.
- No body, excerpt or keyTakeaways edits were needed, because no body fact was corrected. See the flag on the body price section below: it now gives numbers while FAQ 3046 does not.

#### Needs human legal review

- FAQ 3044 (privacy/surveillance): the new wording describes camera and microphone rules as "largely" set by state and territory laws and points to the OAIC. Please confirm this phrasing is acceptable.
- FAQ 3045 / body "Retailer support" (untagged): statements about warranty support for imported units touch Australian Consumer Law. They were not changed.

#### Flagged untagged sentences (not changed)

1. Body, Apple Home hubs: "a HomePod mini, Apple TV, or newer iPad can act as your Apple Home hub". This looks outdated. Apple's current home hub page lists only HomePod/HomePod mini and Apple TV (https://support.apple.com/en-au/102557), and iPad is not supported as a hub under the new Home architecture. Recommend removing "or newer iPad".
2. Body, price section: "Dedicated hubs with broader protocol support: roughly $80–$180 AUD". This is contradicted by the Aqara Hub M3 at $297 (Officeworks), and Home Assistant Green was seen at around $279–$330 at AU retailers in search results. Recommend replacing all four price bullets with "check current listing" guidance to match FAQ 3046.
3. Body, Aqara: "local Australian retail availability has been inconsistent, with some models more commonly found through international sellers". This looks outdated: Aqara Hub M3 is stocked by Officeworks, and search results also show Apple AU and an Aqara Australia store.
4. Body and FAQ 3050, SmartThings: the "shifted into TVs and soundbars" framing leaves out that SmartThings Station exists and that Aeotec makes the current SmartThings-branded hub. Search results suggest the Station had limited official AU release. Worth re-checking against Samsung AU.
5. Body: "Amazon's Alexa ecosystem… has a larger range of third-party compatible devices in Australia". This is an unsourced comparative claim.
6. Body: "Power outages are more relevant here than in some countries…" and "NBN dropouts are still common in some areas". These are unsourced generalisations.
7. Body: "JB Hi-Fi, Officeworks, Bunnings, and Harvey Norman stock most major hubs". This is unverified across all four retailers.
8. Body: the Speaker-based hubs section doesn't mention that only some Echo/Nest models include Zigbee or Thread radios. Hub capability differs by model. This is not wrong, but it is incomplete.
9. Metadata title "Complete Buying Guide 2025" is out of date: the post was published 24 Sep 2026. The title was not in the output scope.

### Body diff

```diff
--- before
+++ after
@@
-If you're an iPhone household, a HomePod mini, Apple TV, or newer iPad can act as your Apple Home hub. Apple's system is tightly integrated with iOS and generally considered strong on privacy, since more processing happens on-device rather than in the cloud. The trade-off is a smaller pool of compatible smart devices compared with Google or Amazon.
+If you're an iPhone household, a HomePod, HomePod mini or Apple TV can act as your [Apple Home hub](https://support.apple.com/en-au/102557). Apple's system is tightly integrated with iOS and generally considered strong on privacy, since more processing happens on-device rather than in the cloud. The trade-off is a smaller pool of compatible smart devices compared with Google or Amazon.
@@
-As a general guide (prices vary by retailer and promotions, so check current pricing before buying):
+Prices change often with promotions, so check the current listing at a few Australian retailers before buying. As a rough order, from cheapest to dearest:
@@
-- Entry-level smart speakers with hub functionality (Google Nest Mini, Echo Dot): roughly $50–$100 AUD
-- Mid-range smart speakers with better hub features (Nest Audio, Echo, HomePod mini): roughly $130–$250 AUD
-- Dedicated hubs with broader protocol support: roughly $80–$180 AUD, where available
-- Router/mesh systems with built-in Matter controller support: often bundled into Wi-Fi system pricing, from around $200 AUD upward
+- Entry-level smart speakers with hub functionality (Google Nest Mini, Echo Dot) are usually the cheapest way in.
+- Mid-range smart speakers with better hub features (Nest Audio, Echo, HomePod mini) cost more.
+- Dedicated hubs with broader protocol support vary widely — the [Aqara Hub M3 at Officeworks](https://www.officeworks.com.au/shop/officeworks/p/aqara-hub-m3-aqhmg01d), for example, is listed at $297 at the time of writing.
+- Router/mesh systems with built-in Matter controller support are usually priced as Wi-Fi systems, so the hub feature comes bundled in.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 1 answer
  - before: Increasingly, yes. Some mesh and router products (Eero, certain TP-Link and Google Nest Wi-Fi models) can act as a Matter controller, which may remove the need for a separate hub in simpler homes [VERIFY current model support with the manufacturer]. It's an emerging category, so confirm the specific model you're buying lists Matter controller functionality on its spec sheet.
  - after: Some can. eero says several of its Wi-Fi 6, 6E and Wi-Fi 7 models work as a Matter controller once you link your eero and Amazon accounts, Google says Nest Wifi Pro can act as a Matter hub and has a Thread border router built in, and TP-Link lists Matter support for some Deco mesh models. That may remove the need for a separate hub in simpler homes. Support differs by model, region and firmware, so check the manufacturer's current support page and confirm the specific model you're buying lists Matter controller functionality on its spec sheet.
- FAQ 3 answer
  - before: Apple's system does more processing on-device rather than in the cloud, which is generally why it's considered the stronger privacy option [VERIFY current Apple, Google and Amazon data handling policies before deciding]. Whichever brand you pick, check where processing happens and what data is retained, especially for anything with a camera or microphone [VERIFY any privacy or surveillance claims against current Australian law].
  - after: Apple says Home app data is stored in a way Apple can't read, and that accessories are controlled by your Apple devices rather than the cloud, with communication encrypted end to end. Google and Amazon also publish privacy commitments and settings for their smart home devices. These policies change, so compare each company's current privacy page before deciding. Whichever brand you pick, check where processing happens and what data is retained, especially for anything with a camera or microphone. Rules on recording people are set largely by state and territory laws, so check the OAIC's guidance on security cameras and the rules where you live before installing cameras or microphones, and get advice if you're unsure.
- FAQ 5 answer
  - before: An entry-level smart speaker with hub functionality, such as a Google Nest Mini or Echo Dot, sits around $50–$100 AUD and is enough for most first-time setups [VERIFY current pricing]. Dedicated hubs with wider protocol support are typically $80–$180 AUD where available [VERIFY], and are only worth the step up once you're running a larger number of devices or more complex automations.
  - after: An entry-level smart speaker with hub functionality, such as a Google Nest Mini or Echo Dot, is the cheapest way in and is enough for many first-time setups. Prices move with promotions, so check the current listing at an Australian retailer. Dedicated hubs with wider protocol support vary widely in price by model, so check current listings, and they're only worth the step up once you're running a larger number of devices or more complex automations.

---

## overseas-smart-home-devices-australia

[VERIFY] tags: 4 → 0. Words: 870 → 960.

### Decisions and sources

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body §1: "[VERIFY] the current electrical equipment safety requirements for your state … the framework is national but administered by each state and territory." | c (legal; claim removed, readers pointed to regulator) | Dropped "national framework administered by each state". Now: EESS is administered by state regulators in the jurisdictions that have signed up, not every state and territory has; check your state/territory electrical safety regulator; look for the RCM before buying. | https://www.eess.gov.au/about/participating-jurisdictions/ ; https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ |
| 2 | HTML comment: "exact MHz values should be checked against current Z-Wave Alliance documentation before being stated. [VERIFY]" | a | Maintenance note now records verified figures: AU/NZ 919.8 / 921.4 MHz (AS/NZS 4268), US 908.4 / 916 MHz, EU 868.4 / 869.85 MHz. Body still quotes no figures (unchanged). | https://www.silabs.com/wireless/z-wave/global-regions (corroborated: https://www.thesmartesthouse.com/collections/euro-devices-zone) |
| 3 | HTML comment: "framework is national but administered per state. [VERIFY] before tightening." | a | EESS signatories are Qld, WA, Vic, Tas, each with its own regulator; other states/territories not listed as signatories. | https://www.eess.gov.au/about/participating-jurisdictions/ |
| 4 | FAQ id 1444: "…considerably harder to enforce in practice… [VERIFY] the current position with the ACCC…" | a (attributed to ACCC, not stated as settled law) | "The ACCC says overseas businesses that sell directly to consumers in Australia must follow the ACL, but … it can be difficult to get a repair, replacement or refund… may not be covered if the business does not directly offer its products in Australia (e.g. goods forwarded from an overseas address)… Check the ACCC's guidance." (plain text, no link) | https://www.accc.gov.au/consumers/buying-products-and-services/buying-online |

Placeholders fixed: none found (no TODO/TBD/lorem/template text in body or metadata). The HTML maintenance note "The B22/E27 point should link to b22-vs-e27-smart-bulb-fittings-australia once that draft is published" is a pending editorial note, not reader-facing; left unchanged.

Supporting sources opened but not linked: Energy Safe Victoria online marketplace buyer's guide (overseas sellers "may not have designed their products in accordance with the Australian Electrical Safety Standards"; ask seller for a photo of the RCM) — https://www.energysafe.vic.gov.au/community-safety/buying-safe-appliances/electrical-appliances/online-marketplace-buyers-guide

#### Consistency edits (untagged)

None needed. Excerpt, keyTakeaways and FAQ ids 1441–1443 contain nothing contradicted by the corrections (they make no claim about a national framework or Z-Wave figures, and use no "illegal"/"legally required" wording). Copied unchanged.

#### Needs human legal review

- FAQ 1444 (consumer guarantees on overseas purchases): wording paraphrases ACCC guidance; confirm the paraphrase, especially the "may not be covered … forwarded on" example.
- Body §1 electrical approval paragraph: wording deliberately avoids stating which rules apply in which state; confirm acceptable.

#### Flagged untagged sentences (not changed)

- §1 "Approval" bullet: "An imported unit will not carry it." — absolute; some overseas-sold units may carry the RCM (ESV says overseas products *may* not comply). Suggest "may not carry it".
- §1 "Approval" bullet: "Electrical equipment sold in Australia has to meet local requirements" — broadly consistent with EESS ("in-scope electrical equipment must not be sold unless … marked with the RCM"), but applies to in-scope equipment; states law in general terms without a source.
- §4: "Anything involving fixed wiring is licensed work in Australia regardless of where the device came from" — legal claim stated as settled, unsourced here (relies on linked internal article).
- §1 voltage figures (230 V/50 Hz AU, 120 V/60 Hz US) — not tagged, not re-verified in this pass; low risk but unsourced.

### Body diff

```diff
--- before
+++ after
@@
-- **Approval.** Electrical equipment sold in Australia has to meet local requirements, which is what the Regulatory Compliance Mark on the packaging indicates. An imported unit will not carry it.
+- **Approval.** Electrical equipment sold in Australia has to meet local requirements, which is what the Regulatory Compliance Mark on the packaging indicates. A unit imported for another market may not carry it.
@@
-This is the one category where importing is genuinely a bad idea rather than merely inconvenient. [VERIFY] the current electrical equipment safety requirements for your state before relying on any specific rule — the framework is national but administered by each state and territory.
+This is the one category where importing is genuinely a bad idea rather than merely inconvenient. The rules are not identical everywhere: the [Electrical Equipment Safety System](https://www.eess.gov.au/about/participating-jurisdictions/) is administered by state regulators in the jurisdictions that have signed up to it, and not every state and territory has. Check the current requirements with your state or territory's electrical safety regulator before relying on any specific rule, and look for the [Regulatory Compliance Mark](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/) before you buy.
@@
-Anything involving fixed wiring is licensed work in Australia regardless of where the device came from — see [what you can legally do yourself](/setup-guides/smart-home-electrical-work-australia-legal/).
+Anything involving fixed wiring is generally a job for a licensed electrician regardless of where the device came from — rules are set by each state and territory, so check with your regulator — see [what you can legally do yourself](/setup-guides/smart-home-electrical-work-australia-legal/).
@@
-  - Specific Z-Wave frequency figures are deliberately not quoted. The regional
-    split is the durable fact; exact MHz values should be checked against current
-    Z-Wave Alliance documentation before being stated. [VERIFY]
-  - Electrical approval is described in general terms and flagged, because the
-    framework is national but administered per state. [VERIFY] before tightening.
+  - Specific Z-Wave frequency figures are still not quoted in the body. Checked
+    24 Sep 2026 against Silicon Labs' Z-Wave Global Regions table
+    (https://www.silabs.com/wireless/z-wave/global-regions): Australia and New
+    Zealand 919.8 / 921.4 MHz (AS/NZS 4268), United States 908.4 / 916 MHz,
+    Europe 868.4 / 869.85 MHz. Re-check that table before quoting figures.
+  - Electrical approval is described in general terms. Checked 24 Sep 2026:
+    EESS signatories are Queensland, Western Australia, Victoria and Tasmania,
+    each administered by its own regulator
+    (https://www.eess.gov.au/about/participating-jurisdictions/); other states
+    and territories are not listed as signatories. Re-check before tightening.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 4 answer
  - before: Australian Consumer Law guarantees apply to goods bought from businesses selling into Australia. Buying direct from an overseas seller makes those rights considerably harder to enforce in practice, whatever the seller's own warranty says. [VERIFY] the current position with the ACCC before relying on it for an expensive purchase.
  - after: The ACCC says overseas businesses that sell directly to consumers in Australia must follow the Australian Consumer Law, but that in practice it can be difficult to get a repair, replacement or refund from an overseas business. It also says you may not be covered if the business does not directly offer its products in Australia, for example where goods go to an overseas address and are forwarded on. The seller's own warranty sits alongside those rights rather than replacing them. Check the ACCC's guidance on buying online before relying on it for an expensive purchase.
