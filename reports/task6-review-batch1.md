# Task 6 review: batch 1 (4 articles)

Proposed fixes for every `[VERIFY]` tag in these four published articles. **Nothing has been written to Strapi.** Reply **approve** to publish all four, or name the articles or rows to change.

Decisions: **a** = verified, rewritten with the fact and an inline source link; **b** = varies, rewritten as a range or as guidance; **c** = unverifiable or legal, the claim removed and readers pointed to the authority.

Backups of each full Strapi record (draft and published) are in `exports/strapi-backup/<slug>-2026-09-24T06-56-38-734Z.json`.

**Reviewer edits made on top of the researchers' proposals:**

1. **Outdoor TVs:** "using them outdoors usually voids the warranty" had no tag and no source. It now points readers to the manufacturer's warranty terms.
2. **Robot vacuum running costs:** the article recommends an energy-metering plug but embedded the Tapo P100, which has no energy monitoring. The product box is swapped to the **Tapo P110**, which meters energy and has its own research notes, and the caution paragraph is updated to match. **This goes beyond the tags; approve or drop it separately.**

On publish, `dateModified` is set to 24 Sep 2026. `publishDate` is set to each post's original `publishedAt`, because a REST update resets `publishedAt` and the article's displayed date would otherwise jump to today.

---

## outdoor-tvs-projectors-speakers-australian-summer

[VERIFY] tags: 18 → 0. Words: 1374 → 1562.

### Decisions and sources

18 [VERIFY] tags (10 body, 8 FAQ). Excerpt and keyTakeaways had none and are unchanged. No placeholder text (TODO/TBD/lorem/template instructions) found.

| # | original text (short quote incl. the tag) | decision | new text (short) | source URL(s) |
| --- | --- | --- | --- | --- |
| 1 | "typical indoor TV … 300–600 nits of sustained full-screen brightness [VERIFY]" (body) | b | "Indoor TVs vary widely in brightness from model to model…" (no number) | none (the number was dropped because no source backed it) |
| 2 | "partial sun … 700–1,500 nit range, and full-sun models push well beyond that [VERIFY]" (body) | b | Samsung lists partial-shade The Terrace at 2,000 nits typical; brightness varies by model, so compare the exact model | https://www.samsung.com/au/lifestyle-tvs/the-terrace/lst7t-55-inch-the-terrace-4k-smart-tv-titan-black-qa55lst7tawxxy/ |
| 3 | "often several thousand dollars in AUD [VERIFY]" (body) | b | The Terrace launched in AU in 2020 at RRPs of $5,999–$10,999; prices vary, so check current pricing | https://eftm.com/2020/09/samsung-terrace-outdoor-tv-84920 |
| 4 | "some outdoor TVs are only rated to around 50°C ambient [VERIFY]" (body) | a | "Samsung … lists The Terrace's operating range as topping out at 50°C" | https://www.samsung.com/au/lifestyle-tvs/the-terrace/lst7t-55-inch-the-terrace-4k-smart-tv-titan-black-qa55lst7tawxxy/ |
| 5 | "Marketing figures on cheap units are frequently inflated [VERIFY]" (body) | a | AAXA agreed after Epson legal action to cut a claim from 1,100 to 500 lumens and adopt ISO 21118; cross-check ISO 21118/ANSI | https://www.avnation.tv/2025/10/09/epson-settles-projector-brightness-lawsuit-aaxa-to-correct-white-brightness-specification-on-p6u-projector-from-1100-lumens-down-to-500-lumens/ |
| 6 | "runs a projector, a couple of speakers … for an evening without drama [VERIFY capacity and output figures against the listing]" (body) | a | E600 listed at 307.2Wh and 600W rated AC (1,200W peak); add up your devices' wattage before relying on it | https://outbax.com.au/products/voltx-600w-307wh-portable-power-station-lifepo4-battery-quick-charge-lcd-display |
| 7 | "residential noise limits vary by state and council [VERIFY your local rules]" (body) | c | Rules vary by state and council. EPA Victoria is given as an example (prohibited times, and councils can still find noise unreasonable), with a pointer to the council or state regulator | https://www.epa.vic.gov.au/residential-noise |
| 8 | "DIY fixed wiring is illegal … in every Australian state and territory [VERIFY current requirements in your state]" (body) | c | ESV example ("unqualified electrical work … illegal"); rules differ by state, so check the state regulator | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| 9 | "weatherproof enclosures and RCD protection under AS/NZS 3000 [VERIFY the specific clauses with your electrician]" (body) | c | Ask your electrician about enclosures and RCD protection. The requirements come from AS/NZS 3000 and state rules, and the electrician confirms them | none (referred to a licensed electrician) |
| 10 | "fixed installations generally need written landlord consent … [VERIFY your tenancy legislation]" (body) | c | NSW example: changes only if the lease allows it or the landlord gives written permission. Rules differ by state, so check your tenancy authority. Wiring still needs a licensed electrician | https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property |
| 11 | FAQ 1: "that damage generally isn't covered [VERIFY warranty terms with your manufacturer]" | b | "check your manufacturer's warranty terms … outdoor use may not be covered" | none (guidance only) |
| 12 | FAQ 2: "only rated to around 50°C ambient [VERIFY]" | a | Samsung lists The Terrace as operating up to 50°C | https://www.samsung.com/au/lifestyle-tvs/the-terrace/lst7t-55-inch-the-terrace-4k-smart-tv-titan-black-qa55lst7tawxxy/ |
| 13 | FAQ 3: "roughly 300–600 nits … [VERIFY]" | b | "Indoor TVs vary widely in brightness…" | none |
| 14 | FAQ 3: "700–1,500 nits, with full-sun models going well beyond that [VERIFY]" | b | The Terrace (partial shade) quoted at 2,000 nits typical; varies by model | Samsung AU (as #2) |
| 15 | FAQ 3: "several thousand dollars in AUD [VERIFY]" | b | 2020 AU RRPs $5,999–$10,999; check current pricing | eftm (as #3) |
| 16 | FAQ 4: "cross-check ANSI figures where published [VERIFY]" | a | AAXA 1,100 to 500 lumen correction; cross-check ISO 21118/ANSI | avnation (as #5) |
| 17 | FAQ 5: "DIY fixed wiring is illegal … across Australia [VERIFY current requirements in your state]" | c | ESV example; rules differ by state, so check the state regulator | ESV (as #8) |
| 18 | FAQ 5: "RCD protection under AS/NZS 3000 [VERIFY the specific clauses with your electrician]" | c | Ask your electrician; AS/NZS 3000 plus state rules | none |

Totals: a = 5 (#4, 5, 6, 12, 16), b = 7 (#1, 2, 3, 11, 13, 14, 15), c = 6 (#7, 8, 9, 10, 17, 18). There are 6 distinct source URLs, all opened.

Notes:
- The original "700–1,500 nits for partial sun" figure looks too low against Samsung's own AU spec (2,000 nits for a partial-shade model), so it was replaced rather than softened.
- The Terrace RRPs date from the 2020 launch and are labelled that way. The Samsung AU page showed GBP pricing when fetched, so no current price is quoted.
- FAQ text is plain text, so the sources are named there without links.

## Needs human legal review

- Body, Power section, bullet 1: new outlets or hard-wired gear must be installed by a licensed electrician, with ESV's "illegal" wording given as an example and a pointer to state regulators (electrical work).
- Body, Power section, bullet 2: weatherproof enclosures and RCD protection under AS/NZS 3000 and state rules (electrical work).
- Body, Power section, bullet 3 (unchanged, no tag): "Extension leads are a temporary measure, not an installation" (electrical safety).
- Body, Power section, renters bullet: NSW written-permission rule given as an example, other states to be checked, licensed electrician for wiring (tenancy plus electrical).
- Body, Speakers section: noise rules, with EPA Victoria prohibited times given as an example (local noise law; not in the three named categories but regulatory).
- FAQ 5: licensed electrician, ESV example, RCD/AS/NZS 3000 (electrical work).
- Body, "rule of thumb" paragraph and FAQ 1 (no tag in the body): "using them outdoors usually voids the warranty". This is a warranty/Australian Consumer Law claim with no source. Consider softening it to "may not be covered".

### Body diff

```diff
--- before
+++ after
@@
-The rule of thumb worth remembering: **indoor TVs and soundbars are not rated for outdoor use, and using them outdoors usually voids the warranty** even under a roof. Condensation inside the panel from overnight temperature swings is the common failure, and it isn't covered.
+The rule of thumb worth remembering: **indoor TVs and soundbars are not rated for outdoor use, and outdoor use may not be covered by the manufacturer's warranty** even under a roof, so read the warranty terms before you mount one on the patio. Condensation inside the panel from overnight temperature swings is the common risk.
@@
-**Brightness, measured in nits.** A typical indoor TV sits somewhere around 300–600 nits of sustained full-screen brightness [VERIFY]. That is fine in a dim lounge room and washed out on a bright patio. Purpose-built outdoor TVs designed for partial sun are commonly quoted in the 700–1,500 nit range, and full-sun models push well beyond that [VERIFY]. Full-sun models are dramatically more expensive — often several thousand dollars in AUD [VERIFY] — because they need brightness, anti-glare coatings and active cooling.
+**Brightness, measured in nits.** Indoor TVs vary widely in brightness from model to model, and a level that's fine in a dim lounge room can look washed out on a bright patio. Purpose-built outdoor TVs quote much higher figures — Samsung lists its partial-shade [The Terrace](https://www.samsung.com/au/lifestyle-tvs/the-terrace/lst7t-55-inch-the-terrace-4k-smart-tv-titan-black-qa55lst7tawxxy/) at 2,000 nits typical — though brightness varies by model and sun rating, so compare the quoted figure for the exact model you're considering. Outdoor models are dramatically more expensive than indoor sets — The Terrace [launched in Australia in 2020](https://eftm.com/2020/09/samsung-terrace-outdoor-tv-84920) at RRPs from $5,999 (55-inch) to $10,999 (75-inch) — because they need brightness, anti-glare coatings and active cooling. Prices vary by retailer and model year, so check current pricing before you budget.
@@
-**Ingress protection, the IP rating.** IP55 is a reasonable baseline for a covered area; IP65 and above suits genuinely exposed positions. The first digit is dust, the second is water. Also check the stated **operating temperature range** — this matters more in Australia than in the northern-hemisphere marketing material, and some outdoor TVs are only rated to around 50°C ambient [VERIFY].
+**Ingress protection, the IP rating.** IP55 is a reasonable baseline for a covered area; IP65 and above suits genuinely exposed positions. The first digit is dust, the second is water. Also check the stated **operating temperature range** — this matters more in Australia than in the northern-hemisphere marketing material, and Samsung, for example, [lists The Terrace's operating range](https://www.samsung.com/au/lifestyle-tvs/the-terrace/lst7t-55-inch-the-terrace-4k-smart-tv-titan-black-qa55lst7tawxxy/) as topping out at 50°C.
@@
-- **Real lumens, not "LED lumens".** Marketing figures on cheap units are frequently inflated [VERIFY]. Cross-check against ANSI lumens where the manufacturer publishes them.
+- **Real lumens, not "LED lumens".** Brightness claims aren't always comparable — after legal action by Epson, AAXA agreed to [cut one projector's white brightness claim from 1,100 to 500 lumens](https://www.avnation.tv/2025/10/09/epson-settles-projector-brightness-lawsuit-aaxa-to-correct-white-brightness-specification-on-p6u-projector-from-1100-lumens-down-to-500-lumens/) and move to the ISO 21118 standard. Cross-check against ISO 21118 or ANSI lumens where the manufacturer publishes them.
@@
-A power station in this class typically runs a projector, a couple of speakers and phone charging for an evening without drama [VERIFY capacity and output figures against the listing]. It also means no cable crossing a walkway — which is a real trip hazard, not a theoretical one.
+The VoltX E600 is [listed with a 307.2Wh battery and 600W rated AC output](https://outbax.com.au/products/voltx-600w-307wh-portable-power-station-lifepo4-battery-quick-charge-lcd-display) (1,200W peak), so add up the wattage of your projector and speakers and check it against that capacity before counting on it for a whole evening. It also means no cable crossing a walkway — which is a real trip hazard, not a theoretical one.
@@
-One detail people miss: **noise travels further outdoors at night**, and residential noise limits vary by state and council [VERIFY your local rules]. Aim speakers inward toward the seating area rather than out toward the fence.
+One detail people miss: **noise travels further outdoors at night**, and residential noise rules vary by state and council — in Victoria, for example, [EPA Victoria sets prohibited times](https://www.epa.vic.gov.au/residential-noise) for stereos and TVs and says a council can still find noise unreasonable within allowed hours. Check with your local council or state environment regulator. Aim speakers inward toward the seating area rather than out toward the fence.
@@
-- **New outdoor power outlets, hard-wired amplifiers or anything inside a wall or ceiling cavity must be installed by a licensed electrician.** DIY fixed wiring is illegal for unlicensed people in every Australian state and territory [VERIFY current requirements in your state].
-- Outdoor socket outlets need suitable weatherproof enclosures and RCD protection under AS/NZS 3000 [VERIFY the specific clauses with your electrician].
+- **New outdoor power outlets, hard-wired amplifiers or anything inside a wall or ceiling cavity must be installed by a licensed electrician.** Electrical safety regulators treat this as licensed work — [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says unqualified electrical work is illegal, even for small jobs like changing power points — and rules differ by state, so check with your state's electrical safety regulator before anything is wired to mains.
+- Ask your electrician about weatherproof enclosures and safety switch (RCD) protection for any outdoor outlet — the requirements come from the Wiring Rules (AS/NZS 3000) and your state's regulations, and your electrician is the one to confirm them.
@@
-- Renters: fixed installations generally need written landlord consent, and anything wired in still needs a licensed electrician [VERIFY your tenancy legislation].
+- Renters: in NSW, for example, you can [make changes to a rental](https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property) only if your lease allows it or your landlord gives written permission. Tenancy rules differ by state, so check with your state's tenancy authority — and anything wired in still needs a licensed electrician.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 1 answer
  - before: Indoor TVs aren't rated for outdoor use, and running one outside will usually void the warranty even under a roof. The common failure is condensation forming inside the panel from overnight temperature swings, and that damage generally isn't covered [VERIFY warranty terms with your manufacturer]. If the area is covered and you only watch occasionally, a portable screen you bring back inside is a safer bet.
  - after: Indoor TVs aren't rated for outdoor use, and running one outside will usually void the warranty even under a roof. The common failure is condensation forming inside the panel from overnight temperature swings, so check your manufacturer's warranty terms before taking an indoor TV outside — outdoor use may not be covered. If the area is covered and you only watch occasionally, a portable screen you bring back inside is a safer bet.
- FAQ 2 answer
  - before: IP55 is a reasonable baseline for a covered area where wind-driven rain doesn't reach, while IP65 or above suits genuinely exposed positions. The first digit covers dust and the second covers water. Also check the stated operating temperature range rather than the IP number alone — some outdoor TVs are only rated to around 50°C ambient [VERIFY], which matters on a north or west-facing Australian patio.
  - after: IP55 is a reasonable baseline for a covered area where wind-driven rain doesn't reach, while IP65 or above suits genuinely exposed positions. The first digit covers dust and the second covers water. Also check the stated operating temperature range rather than the IP number alone — Samsung, for example, lists its outdoor The Terrace as operating up to 50°C, which matters on a north or west-facing Australian patio.
- FAQ 3 answer
  - before: A typical indoor TV manages roughly 300–600 nits of sustained full-screen brightness [VERIFY], which is fine in a dim lounge but hopeless on a bright patio. Outdoor TVs built for partial sun are commonly quoted around 700–1,500 nits, with full-sun models going well beyond that [VERIFY]. Full-sun panels often run to several thousand dollars in AUD [VERIFY] because they add anti-glare coatings and active cooling.
  - after: Indoor TVs vary widely in brightness, and a level that's fine in a dim lounge can look hopeless on a bright patio. Purpose-built outdoor TVs quote much higher figures — Samsung lists its partial-shade The Terrace at 2,000 nits typical — but brightness varies by model and sun rating, so compare the quoted figure for the exact model. Outdoor TVs cost far more than indoor sets because they add anti-glare coatings and active cooling — The Terrace launched in Australia in 2020 at RRPs from $5,999 to $10,999 by size — and prices vary by retailer, so check current pricing.
- FAQ 4 answer
  - before: It's the cheapest route to a big picture, but with daylight saving in the southern states it isn't properly dark until close to 8:30pm in summer, so a 6pm movie night will disappoint. Treat advertised "LED lumens" with suspicion and cross-check ANSI figures where published [VERIFY]. Plan for moths too — put the projector behind seating and use a yellow-tinted light nearby to draw insects away.
  - after: It's the cheapest route to a big picture, but with daylight saving in the southern states it isn't properly dark until close to 8:30pm in summer, so a 6pm movie night will disappoint. Treat advertised "LED lumens" with suspicion — after legal action by Epson, AAXA agreed to cut one projector's claim from 1,100 to 500 lumens — and cross-check ISO 21118 or ANSI figures where published. Plan for moths too — put the projector behind seating and use a yellow-tinted light nearby to draw insects away.
- FAQ 5 answer
  - before: Extension leads are a temporary measure, not an installation — if you're running one every weekend, that's the signal to have a proper outlet fitted. New outdoor socket outlets, hard-wired amplifiers and any cabling inside a wall or ceiling cavity must be installed by a licensed electrician, and DIY fixed wiring is illegal for unlicensed people across Australia [VERIFY current requirements in your state]. Outdoor outlets also need suitable weatherproof enclosures and RCD protection under AS/NZS 3000 [VERIFY the specific clauses with your electrician].
  - after: Extension leads are a temporary measure, not an installation — if you're running one every weekend, that's the signal to have a proper outlet fitted. New outdoor socket outlets, hard-wired amplifiers and any cabling inside a wall or ceiling cavity must be installed by a licensed electrician, and Energy Safe Victoria, for example, says unqualified electrical work is illegal even for small jobs; rules differ by state, so check with your state's electrical safety regulator. Ask your electrician about weatherproof enclosures and safety switch (RCD) protection for any outdoor outlet; they'll confirm what the Wiring Rules (AS/NZS 3000) and your state require.

---

## smart-zoning-ducted-air-conditioning-cost-australia

[VERIFY] tags: 17 → 0. Words: 1296 → 1513.

### Decisions and sources

No official source publishes zoning prices. Price figures now come only from two published Australian installer cost guides, credited by name. The two guides disagree with each other and with the original figures, so every price passage also tells readers to get quotes.

| # | original text (short quote incl. the tag) | decision | new text (short) | source URL(s) |
|---|---|---|---|---|
| 1 | "expect zoning to add roughly $1,200 to $3,500 … on/off dampers [VERIFY]" (body, practical takeaway) | b | "published Australian cost guides put zoning at anywhere from about $1,500 to $4,000 extra … guides do not agree … get at least two itemised quotes" | https://tradieverify.com.au/guides/how-much-does-ducted-air-conditioning-cost-in-australia/ |
| 2 | "often a few hundred dollars for a manufacturer Wi-Fi module [VERIFY]" (body) | b | "often just a manufacturer Wi-Fi module, though the price varies by brand, so ask for a supplied-and-fitted figure" | none (no reliable source for a price) |
| 3 | "Advantage Air MyAir, Polyaire ZoneTouch, iZone and Airtouch … ActronAir's controllers and Daikin's zone kits [VERIFY]" | a | MyAir, AirTouch, iZone, ActronAir Tru-Zone and Daikin AirHub Linear Zone Control (±2°C of the master) confirmed. **Correction:** ZoneTouch controls airflow in 5% steps, not room temperature, so it is now described as a step below. | https://www.advantageair.com.au/myair/ ; https://www.airtouch.net.au/smart-air-conditioning/intelligent-temperature-sensors/ ; https://izone.com.au/izone-individual-room-temperature-control-for-every-home/ ; https://actronair.com.au/tru-zone/ ; https://www.daikin.com.au/article/daikin-introduces-airhub-touch-zone-controller-for-homes ; https://www.polyaire.com.au/airtouch-smart-home-zoning/zonetouch |
| 4 | "All figures below are indicative ranges based on typical Australian quotes … [VERIFY]" | b | "figures below come from published Australian installer cost guides, which do not agree … get at least two itemised quotes from licensed installers" | (the two guides below) |
| 5 | "4–6 zones, on/off dampers: around $1,200–$2,200 … [VERIFY]" | b | Credited to TradieVerify: 2–3 zones $1,500–$2,500; 4–8 zones $2,500–$4,000 (bullet label changed to match) | https://tradieverify.com.au/guides/how-much-does-ducted-air-conditioning-cost-in-australia/ |
| 6 | "per-zone temperature sensors and a touchscreen controller: around $2,000–$3,500 [VERIFY]" | b | Credited to Quotcha: smart zoning such as MyAir "usually add[s] $1,200–$2,500 over basic zoning" | https://www.quotcha.com.au/air-conditioning/guide/ducted-air-conditioning-cost-australia |
| 7 | "Extra zones … commonly $250–$500 per zone [VERIFY]" | b | Credited to Quotcha: $200–$500 per additional zone at install | https://www.quotcha.com.au/air-conditioning/guide/ducted-air-conditioning-cost-australia |
| 8 | "Retrofit … frequently $2,500–$5,000-plus … [VERIFY]" | b | Credited to TradieVerify: $2,000–$4,500 depending on number of zones and brand | https://tradieverify.com.au/guides/how-much-does-ducted-air-conditioning-cost-in-australia/ |
| 9 | "Wi-Fi/app module … roughly $200–$500 supplied and fitted [VERIFY]" | b | "pricing varies by brand and by whether your controller already supports it, so ask for a supplied-and-fitted price" | none |
| 10 | "most Australian ducted systems use a hard-wired wall controller with a proprietary data bus … [VERIFY]" | a | "many … are run from a hard-wired wall controller … Sensibo's own compatibility guide says your air conditioner must have a working infrared remote" ("most" and "data bus" dropped) | https://support.sensibo.com/getting-started/ac-compatibility/ |
| 11 | "a sensible $40–$80 purchase [VERIFY]" (Tuya IR) | b | "a sensible low-cost purchase; prices vary between Australian retailers, so compare before you buy" | none |
| 12 | "several Google Nest models, are frequently not compatible … [VERIFY]" | a | Google: Nest is designed for 24V systems; proprietary systems (non-standard terminal labels) are not compatible; check your specific model | https://support.google.com/googlehome/answer/9246656?hl=en |
| 13 | "requires an ARCtick-licensed technician, and … a licensed electrician under AS/NZS wiring rules [VERIFY]" | c | Refrigerant: ARC says anyone who handles refrigerant or works on RAC equipment needs a refrigerant handling licence. Electrical: licensing is state-based (Energy Safe Victoria given as an example), so check with your state's regulator. The AS/NZS reference is removed. | https://arctick.org/information/faqs ; https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers |
| 14 | keyTakeaways: "$1,200–$3,500 … $2,500–$5,000-plus … [VERIFY]" | b | "a few thousand dollars … retrofitting usually costs more … Published cost guides disagree, so get at least two itemised quotes". The untagged "few hundred dollars for a Wi-Fi module" in the same field is also softened to match #2. | (as #1, #8) |
| 15 | FAQ 1: "Most Australian ducted systems use a hard-wired wall controller on a proprietary data bus … [VERIFY]" | a | "Many … hard-wired wall controller … IR controllers such as Sensibo need a working infrared remote to learn from" | https://support.sensibo.com/getting-started/ac-compatibility/ |
| 16 | FAQ 4: "several Nest models, are frequently incompatible … [VERIFY]" | a | Google: designed for 24V systems; proprietary systems not compatible; "may fall into that category" | https://support.google.com/googlehome/answer/9246656?hl=en |
| 17 | FAQ 5: "roughly $200–$500 supplied and fitted [VERIFY]" | b | "often just a manufacturer Wi-Fi module; pricing varies by brand, so ask for a supplied-and-fitted figure" | none |

Totals: a = 5 (#3, 10, 12, 15, 16), b = 11, c = 1 (#13).

Placeholders: none found (searched for TODO, TBD, lorem, placeholder and template instructions). Excerpt and FAQ 2 and 3 are unchanged.

Other sources opened but not cited: the Sensibo Sky/Air compatibility page (it says nothing about ducted systems), the NSW Planning Portal BASIX zoning page (it gives no costs), the ARC licence-types page, and the ActronAir QUE FAQ (would not load).

## Needs human legal review

- Body, "The regulated bits you cannot DIY", rewritten sentence on refrigerant licensing (ARC) and state electrical licensing (#13). It covers refrigerant handling and electrical work.
- Body, same section, untagged and unchanged: "Zone damper motors and controller wiring are typically low voltage, but they are still part of a fixed installation and get connected back to a switched supply." This covers electrical work.
- Body, same section, untagged and unchanged: "Plug-in sensors, IR bridges and app modules that connect via a standard Type I socket are fair game for anyone. Anything in the roof space that terminates in the switchboard or the indoor unit is not." This says what DIY electrical work is allowed.
- Body, "This is not a weekend project." and the section heading "The regulated bits you cannot DIY". These imply a legal restriction without naming a jurisdiction.
- Body, "The price bands, roughly": the price figures credited to third-party installer guides (#5 to #8). These are not legal claims, but under Australian Consumer Law they are price claims on a commercial site, so an editor should approve relying on these sources.

### Body diff

```diff
--- before
+++ after
@@
-On a new ducted install, expect zoning to add roughly $1,200 to $3,500 to the job depending on the number of zones and whether you want per-room temperature sensors rather than simple on/off dampers [VERIFY]. Retrofitting zoning into an existing ducted system usually lands higher per zone, because someone has to get into the roof space and cut into ductwork that is already installed.
+On a new ducted install, published Australian cost guides put zoning at anywhere from about [$1,500 to $4,000 extra](https://tradieverify.com.au/guides/how-much-does-ducted-air-conditioning-cost-in-australia/), depending on the number of zones and whether you want per-room temperature sensors rather than simple on/off dampers. The guides do not agree with each other, so get at least two itemised quotes from licensed installers. Retrofitting zoning into an existing ducted system usually lands higher per zone, because someone has to get into the roof space and cut into ductwork that is already installed.
@@
-If your ducted system already has motorised zones and you just want app and voice control, that is a much smaller job — often a few hundred dollars for a manufacturer Wi-Fi module [VERIFY]. Do not let the two be quoted as the same thing.
+If your ducted system already has motorised zones and you just want app and voice control, that is a much smaller job — often just a manufacturer Wi-Fi module, though the price varies by brand, so ask for a supplied-and-fitted figure. Do not let the two be quoted as the same thing.
@@
-**Tier 2 — temperature-controlled zoning.** Each zone gets a temperature sensor, and the damper modulates to hit a set point for that room. This is what systems like Advantage Air MyAir, Polyaire ZoneTouch, iZone and Airtouch offer, plus manufacturer systems such as ActronAir's controllers and Daikin's zone kits [VERIFY]. It is the tier most people mean when they say "smart zoning".
+**Tier 2 — temperature-controlled zoning.** Each zone gets a temperature sensor, and the damper modulates to hit a set point for that room. This is what systems like Advantage Air [MyAir](https://www.advantageair.com.au/myair/), [AirTouch](https://www.airtouch.net.au/smart-air-conditioning/intelligent-temperature-sensors/) and [iZone](https://izone.com.au/izone-individual-room-temperature-control-for-every-home/) offer, plus manufacturer systems such as ActronAir's [Tru-Zone](https://actronair.com.au/tru-zone/) and Daikin's [AirHub with Linear Zone Control](https://www.daikin.com.au/article/daikin-introduces-airhub-touch-zone-controller-for-homes) (zone set points within ±2°C of the master). Polyaire's [ZoneTouch](https://www.polyaire.com.au/airtouch-smart-home-zoning/zonetouch) sits a step below: it sets each zone's airflow in 5% increments rather than holding a room temperature. It is the tier most people mean when they say "smart zoning".
@@
-All figures below are indicative ranges based on typical Australian quotes and should be treated as a starting point for your own comparisons, not a fixed price [VERIFY]. Ducted pricing varies enormously with roof access, house layout and state.
+The figures below come from published Australian installer cost guides, which do not agree with one another, so treat them as a starting point for your own comparisons, not a fixed price, and get at least two itemised quotes from licensed installers. Ducted pricing varies enormously with roof access, house layout and state.
@@
-- **Zoning added to a new ducted install, 4–6 zones, on/off dampers:** around $1,200–$2,200 on top of the base system [VERIFY].
-- **Same install with per-zone temperature sensors and a touchscreen controller:** around $2,000–$3,500 [VERIFY].
-- **Extra zones beyond the standard package:** commonly $250–$500 per zone at install time [VERIFY].
-- **Retrofit zoning into an existing ducted system:** frequently $2,500–$5,000-plus for a whole-house job, because it is roof work, new dampers, new cabling and a new controller [VERIFY].
-- **Wi-Fi/app module for an existing zoned system:** roughly $200–$500 supplied and fitted [VERIFY].
+- **Zoning added to a new ducted install:** [TradieVerify's cost guide](https://tradieverify.com.au/guides/how-much-does-ducted-air-conditioning-cost-in-australia/) puts basic zoning (2–3 zones) at $1,500–$2,500 and 4–8 zones at $2,500–$4,000 on top of the base system.
+- **Temperature-sensed "smart" zoning:** [Quotcha's cost guide](https://www.quotcha.com.au/air-conditioning/guide/ducted-air-conditioning-cost-australia) says smart zoning systems such as MyAir usually add $1,200–$2,500 over basic zoning.
+- **Extra zones beyond the standard package:** the [same Quotcha guide](https://www.quotcha.com.au/air-conditioning/guide/ducted-air-conditioning-cost-australia) puts each additional zone at $200–$500 at install time.
+- **Retrofit zoning into an existing ducted system:** [TradieVerify's guide](https://tradieverify.com.au/guides/how-much-does-ducted-air-conditioning-cost-in-australia/) puts it at $2,000–$4,500 depending on the number of zones and the system brand, because it is roof work, new dampers, new cabling and a new controller.
+- **Wi-Fi/app module for an existing zoned system:** pricing varies by brand and by whether your controller already supports it, so ask for a supplied-and-fitted price before agreeing to anything bigger.
@@
-These are excellent value on **split systems**, and on the minority of ducted units that are still driven by an IR handheld remote. The catch for ducted owners is that most Australian ducted systems use a hard-wired wall controller with a proprietary data bus, not infrared. An IR bridge cannot talk to that, and it certainly cannot open and close motorised dampers. Check what your existing controller is before buying anything on this basis [VERIFY].
+These are excellent value on **split systems**, and on the minority of ducted units that are still driven by an IR handheld remote. The catch for ducted owners is that many Australian ducted systems are run from a hard-wired wall controller rather than an infrared handheld. Sensibo's own [compatibility guide](https://support.sensibo.com/getting-started/ac-compatibility/) says your air conditioner must have a working infrared remote, so an IR bridge cannot talk to a wired-only controller, and it certainly cannot open and close motorised dampers. Check what your existing controller is before buying anything on this basis.
@@
-Budget Tuya-based IR controllers cover the same ground for less money, with a rougher app experience and more variable Home Assistant support. For a bedroom split or a garage unit, they are a sensible $40–$80 purchase [VERIFY]. For a ducted system, they are not a substitute for zoning.
+Budget Tuya-based IR controllers cover the same ground for less money, with a rougher app experience and more variable Home Assistant support. For a bedroom split or a garage unit, they are a sensible low-cost purchase; prices vary between Australian retailers, so compare before you buy. For a ducted system, they are not a substitute for zoning.
@@
-A note on wall thermostats generally: North American-style 24V thermostats, including several Google Nest models, are frequently **not** compatible with Australian ducted reverse-cycle systems that use proprietary controllers. Verify compatibility with your specific model before ordering [VERIFY].
+A note on wall thermostats generally: Google says its Nest thermostats are designed for 24V systems, and its [compatibility guide](https://support.google.com/googlehome/answer/9246656?hl=en) states that proprietary systems — wiring with non-standard terminal labels such as 1, 2, 3 or A, B, C — are **not** compatible. If your ducted reverse-cycle system runs from a manufacturer's proprietary wall controller, verify compatibility with your specific indoor unit and controller model before ordering.
@@
-This is not a weekend project. Installing or modifying a ducted air conditioning system involves refrigerant work, which in Australia requires an ARCtick-licensed technician, and 240V fixed wiring, which requires a licensed electrician under AS/NZS wiring rules [VERIFY]. Zone damper motors and controller wiring are typically low voltage, but they are still part of a fixed installation and get connected back to a switched supply.
+This is not a weekend project. Installing or modifying a ducted air conditioning system involves refrigerant work and 240V fixed wiring. The Australian Refrigeration Council [says](https://arctick.org/information/faqs) anyone who handles refrigerant or works on refrigeration and air conditioning equipment must hold a refrigerant handling licence (ARCtick). Electrical licensing is set by each state and territory — Victoria's regulator, for example, [tells householders](https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers) not to do their own electrical work and to engage a registered electrical contractor — so check the rules with your state's electrical safety regulator. Zone damper motors and controller wiring are typically low voltage, but they are still part of a fixed installation and get connected back to a switched supply.
```

### Excerpt / key takeaways / FAQ changes

- keyTakeaways
  - before: On a new ducted install, smart zoning typically adds around $1,200–$3,500 depending on zone count and whether each zone gets its own temperature sensor; retrofitting zoning into an existing system often runs $2,500–$5,000-plus because of roof access and ductwork [VERIFY]. If your system is already zoned, adding app control is usually just a few hundred dollars for a Wi-Fi module.
  - after: On a new ducted install, smart zoning typically adds a few thousand dollars depending on zone count and whether each zone gets its own temperature sensor; retrofitting zoning into an existing system usually costs more because of roof access and ductwork. Published cost guides disagree, so get at least two itemised quotes from licensed installers. If your system is already zoned, adding app control is usually a much smaller job, often just a manufacturer Wi-Fi module.
- FAQ 1 answer
  - before: Generally no. Most Australian ducted systems use a hard-wired wall controller on a proprietary data bus rather than infrared, so an IR bridge cannot talk to them and definitely cannot drive motorised dampers [VERIFY]. IR controllers are great value on split systems and the few ducted units still run by a handheld remote, but they are not a substitute for zoning — check what controller you have before buying.
  - after: Generally no. Many Australian ducted systems are run from a hard-wired wall controller rather than an infrared handheld remote. IR controllers such as Sensibo need a working infrared remote to learn from, so they cannot talk to a wired-only controller and definitely cannot drive motorised dampers. IR controllers are great value on split systems and the few ducted units still run by a handheld remote, but they are not a substitute for zoning — check what controller you have before buying.
- FAQ 4 answer
  - before: Often not. North American-style 24V thermostats, including several Nest models, are frequently incompatible with Australian ducted reverse-cycle systems that use proprietary wall controllers [VERIFY]. Confirm compatibility against your specific indoor unit and controller model before ordering anything.
  - after: Often not. Google says Nest thermostats are designed for 24V systems and that proprietary systems, with non-standard terminal labels such as 1, 2, 3 or A, B, C, are not compatible. If your ducted reverse-cycle system runs from a manufacturer's proprietary wall controller, it may fall into that category. Confirm compatibility against your specific indoor unit and controller model before ordering anything.
- FAQ 5 answer
  - before: That is a much smaller job than installing zoning from scratch, often a manufacturer Wi-Fi module at roughly $200–$500 supplied and fitted [VERIFY]. Do not let an installer quote it as the same line item as full zoning. Also ask whether app control is included at no extra cost, whether there is any ongoing fee, and whether there is a documented local API or Home Assistant integration.
  - after: That is a much smaller job than installing zoning from scratch, often just a manufacturer Wi-Fi module; pricing varies by brand, so ask for a supplied-and-fitted figure. Do not let an installer quote it as the same line item as full zoning. Also ask whether app control is included at no extra cost, whether there is any ongoing fee, and whether there is a documented local API or Home Assistant integration.

---

## smart-thermostat-gas-ducted-hydronic-heating-australia

[VERIFY] tags: 16 → 0. Words: 1259 → 1529.

### Decisions and sources

| # | original text (short quote incl. the tag) | decision | new text (short) | source URL(s) |
|---|---|---|---|---|
| 1 | "proprietary low-voltage data bus ... language only they speak [VERIFY, varies by model and vintage]" | a | Networked controllers commonly use a manufacturer-specific link; Brivis Networker carries power + serial data over two wires; wiring varies by brand, model and age | https://github.com/Makin-Things/ESPHome-Brivis-Networker |
| 2 | "Brivis, Rinnai and Seeley (Braemar) all have their own ecosystems [VERIFY current model names, compatibility and pricing with the manufacturer]" | a | Rinnai Touch Wi-Fi kit retrofits to heaters with a wired Networker controller; Seeley MagIQtouch Wi-Fi covers Braemar ducted gas, existing installs may need a controller upgrade | https://ecoluxappliances.com.au/products/brivis-rinnai-touch-wifi-controller-gas-ducted-heater-evaporative-cooling ; https://www.seeleyinternational.com/magiqtouch/ |
| 3 | "Expect a few hundred dollars installed [VERIFY]" | b | Kit alone listed at $389-$450 at one AU retailer, before installation; get an installed quote | https://ecoluxappliances.com.au/products/brivis-rinnai-touch-wifi-controller-gas-ducted-heater-evaporative-cooling |
| 4 | "community integrations ... [VERIFY - community integrations are unofficial and can break with firmware updates]" | a | Rinnai Touch HA integration works with Rinnai/Brivis modules; independent, unofficial, no guarantee after firmware/app changes | https://github.com/funtastix/rinnaitouch |
| 5 | "Nest ... 24V North American wiring ... [VERIFY availability, current model and local support before buying]" | a | Separate North American and European versions; 4th-gen launched US/Canada only; check an AU retailer offers local warranty/support | https://support.google.com/googlenest/answer/9256506?hl=en-IE ; https://www.techadvisor.com/article/2420822/google-nest-thermostat-4th-gen-price-release-features.html |
| 6 | "240V wiring ... licensed electrician ... [VERIFY current requirements in your state]" | a | ESV says unqualified electrical work is illegal; NSW requires a licence for any wiring work; rules differ, check your state regulator | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself ; https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/electrical |
| 7 | "can meaningfully cut gas use in a well-zoned house [VERIFY savings for your system]" | b | Lower flow temps keep a condensing boiler condensing longer; savings vary, no set figure | https://www.resideo.com/gb/en/news-events/all-articles/5-things-you-didnt-know-about-opentherm/ |
| 8 | "M30x1.5 is common but not universal on older Australian installs [VERIFY]" | a | Aqara E1 fits M30x1.5 directly, adapters for other valve types; confirm your valve's thread | https://www.aqara.com/eu/product/radiator-thermostat-e1/specs/ |
| 9 | "$25-$40 Wi-Fi or Zigbee ... sensors [VERIFY pricing]" | b | "inexpensive" sensors, prices vary; Tapo T310 $34 at JB Hi-Fi, needs hub | https://www.jbhifi.com.au/products/tp-link-tapo-smart-temperature-humidity-monitor |
| 10 | "licensed electrician under the AS/NZS 3000 wiring rules [VERIFY current edition and state requirements]" | a | Licensed electrician; work to AS/NZS 3000 (2018 edition with amendments); licensing set by each state, check regulator | https://ecawa.org.au/news-insights/timeline-of-the-asnzs-3000-wiring-rules-and-what-s-coming-next ; ESV + NSW URLs above |
| 11 | "keep the original controller ... [VERIFY your state's tenancy rules on alterations]" | c | Rules on renter modifications differ by state; check your state's tenancy authority (Victoria example linked) | https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property |
| 12 | FAQ 1: "check current Australian availability and support before buying [VERIFY]" | a | Check an AU retailer sells it with local warranty/support; 4th gen US/Canada only; also "24V" clause reworded to North American/European versions | Google Nest Help + Tech Advisor URLs above |
| 13 | FAQ 2: "under the AS/NZS 3000 wiring rules [VERIFY current edition and your state's requirements]" | a | 2018 edition with amendments; ESV/NSW require licence; rules differ, check state regulator | ECA WA + ESV + NSW URLs above |
| 14 | FAQ 3: "meaningfully cut gas use ... [VERIFY savings for your system]" | b | Keeps condensing boiler condensing longer; savings vary | Resideo URL above |
| 15 | FAQ 4: "$25-$40 temperature and humidity sensors [VERIFY pricing]" | b | inexpensive sensors, prices vary; Tapo T310 $34 plus hub | JB Hi-Fi URL above |
| 16 | FAQ 5: "reinstate it at the end of the lease [VERIFY your state's tenancy rules on alterations]" | c | Rules differ by state; check your state's tenancy authority (CAV example) | CAV URL above |

Excerpt and keyTakeaways contained no [VERIFY] tags and are copied unchanged. No placeholder text (TODO/TBD/lorem/template instructions) found.

## Needs human legal review

- Body, "Switching voltage" bullet: 240V wiring is licensed electrical work; cites ESV (DIY illegal) and NSW (licence for any wiring work) - electrical.
- Body, "What needs a licensed trade": mains-voltage wiring needs a licensed electrician and AS/NZS 3000 compliance; licensing set by state - electrical.
- Body, same section: "Anything touching the gas appliance itself ... licensed gasfitter or the manufacturer's service agent. DIY here can void warranties and insurance" (untagged, unchanged) - gas work, warranty/insurance claim.
- Body, dry-contact retrofit: "done badly it can bypass safety interlocks" / technician must confirm (untagged) - gas appliance safety.
- Body + FAQ 5, renting: written landlord permission, reinstate controller; state tenancy rules differ - tenancy.
- FAQ 2: licensed electrician for 240V thermostats; gasfitter for boiler control board - electrical and gas.
- Excerpt: "where a licensed trade is legally required" (untagged, unchanged) - states law generally.
- keyTakeaways: "any mains-voltage wiring must be done by a licensed electrician" (untagged, unchanged) - electrical.
- No privacy-law statements in the article.

### Body diff

```diff
--- before
+++ after
@@
-Australian gas ducted heating almost never works that way. Brands like Brivis, Bonaire, Braemar and Rinnai typically use a proprietary low-voltage data bus between the wall controller and the furnace control board - the controller and the heater talk to each other in a language only they speak [VERIFY, varies by model and vintage]. Swap the controller for a third-party thermostat and you get nothing, because there is no standard signal to intercept.
+Australian gas ducted heating almost never works that way. Networked controllers from the big ducted brands commonly use a manufacturer-specific link between the wall controller and the furnace control board - Brivis's Networker controllers, for example, carry both power and serial data over just two wires ([community documentation](https://github.com/Makin-Things/ESPHome-Brivis-Networker)) - so the controller and the heater talk to each other in a language only they speak. Exactly how yours is wired varies by brand, model and age. Swap the controller for a third-party thermostat and you get nothing, because there is no standard signal to intercept.
@@
-**1. The manufacturer's own Wi-Fi module.** Unromantic, but usually the cleanest result. Most of the major Australian ducted brands now sell a Wi-Fi kit or a networked touch controller that adds app scheduling and remote start - Brivis, Rinnai and Seeley (Braemar) all have their own ecosystems [VERIFY current model names, compatibility and pricing with the manufacturer]. Expect a few hundred dollars installed [VERIFY], and expect compatibility to depend on the age of the furnace control board. A 1990s unit may not be supported at all.
+**1. The manufacturer's own Wi-Fi module.** Unromantic, but usually the cleanest result. Most of the major Australian ducted brands now sell a Wi-Fi kit or a networked touch controller that adds app scheduling and remote start. Brivis and Rinnai use the Rinnai Touch Wi-Fi kit, which retrofits to ducted gas heaters that already have a wired Networker controller ([retailer listing](https://ecoluxappliances.com.au/products/brivis-rinnai-touch-wifi-controller-gas-ducted-heater-evaporative-cooling)); Seeley's MagIQtouch Wi-Fi app covers Braemar ducted gas heaters, though Seeley notes existing MagIQtouch installations may need a controller upgrade to take the Wi-Fi module ([Seeley International](https://www.seeleyinternational.com/magiqtouch/)). The Brivis/Rinnai kit alone was listed at $389-$450 at one Australian retailer at the time of writing, before installation, so get an installed quote for your system - and expect compatibility to depend on the age of the furnace control board. A 1990s unit may not be supported at all.
@@
-The upside for Home Assistant users: several of these systems have community integrations, so a manufacturer module can end up more automatable than a third-party thermostat would have been [VERIFY - community integrations are unofficial and can break with firmware updates].
+The upside for Home Assistant users: several of these systems have community integrations - the [Rinnai Touch integration](https://github.com/funtastix/rinnaitouch), for example, works with Rinnai and Brivis Wi-Fi modules - so a manufacturer module can end up more automatable than a third-party thermostat would have been. These are independent, unofficial projects rather than manufacturer-supported features, so there is no guarantee they keep working after a firmware or app change.
@@
-One thermostat people constantly ask about is Google's. It is a genuinely good product, but the Nest range has had a patchy Australian retail history and is built around 24V North American wiring conventions, so treat it as a hydronic or heat pump option rather than a ducted gas one unless your installer confirms otherwise [VERIFY availability, current model and local support before buying].
+One thermostat people constantly ask about is Google's. It is a genuinely good product, but the Nest range has had a patchy Australian retail history. Google makes separate Nest thermostat versions for North American and European heating systems ([Google Nest Help](https://support.google.com/googlenest/answer/9256506?hl=en-IE)), and the current fourth-generation Learning Thermostat launched in the US and Canada only ([Tech Advisor](https://www.techadvisor.com/article/2420822/google-nest-thermostat-4th-gen-price-release-features.html)). Treat it as a hydronic or heat pump option rather than a ducted gas one unless your installer confirms otherwise, and check that an Australian retailer sells the model you want with local warranty and support before buying.
@@
-- **Switching voltage.** Australian hydronic thermostats are often mains-voltage switched. Anything involving 240V wiring is electrical work and must be done by a licensed electrician - this is not a DIY job, regardless of what an overseas YouTube video shows [VERIFY current requirements in your state].
-- **On/off versus modulating.** A basic thermostat just says "heat" or "no heat". An OpenTherm-capable thermostat paired with an OpenTherm boiler can tell the boiler *how much* heat to make, which lowers flow temperatures and can meaningfully cut gas use in a well-zoned house [VERIFY savings for your system]. Bosch's smart room thermostats are the usual example of this class in Australia.
+- **Switching voltage.** Australian hydronic thermostats are often mains-voltage switched. Anything involving 240V wiring is electrical work for a licensed electrician - this is not a DIY job, regardless of what an overseas YouTube video shows. [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says unqualified electrical work is illegal, and [NSW](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/electrical) requires a licence for any electrical wiring work; rules differ between states, so check with your state's electrical safety regulator.
+- **On/off versus modulating.** A basic thermostat just says "heat" or "no heat". An OpenTherm-capable thermostat paired with an OpenTherm boiler can tell the boiler *how much* heat to make, which lets the boiler run at lower flow temperatures and keeps a condensing boiler condensing for longer ([Resideo](https://www.resideo.com/gb/en/news-events/all-articles/5-things-you-didnt-know-about-opentherm/)). How much gas that saves varies with the boiler, the house and how it is zoned, so don't bank on a set figure. Bosch's smart room thermostats are the usual example of this class in Australia.
@@
-For radiator-level control, smart thermostatic radiator valve heads (Zigbee models from the likes of Aqara and Sonoff) screw onto standard valve bodies and let you run bedrooms cooler than living areas. Check the valve thread - M30x1.5 is common but not universal on older Australian installs [VERIFY], and old valve bodies sometimes seize and need a plumber to swap.
+For radiator-level control, smart thermostatic radiator valve heads (Zigbee models from the likes of Aqara and Sonoff) screw onto standard valve bodies and let you run bedrooms cooler than living areas. Check the valve thread - Aqara's E1 head, for example, fits M30x1.5 valves directly and ships with adapters for a few other valve types ([Aqara specs](https://www.aqara.com/eu/product/radiator-thermostat-e1/specs/)), so confirm your valve's thread and brand before buying - and old valve bodies sometimes seize and need a plumber to swap.
@@
-A handful of $25-$40 Wi-Fi or Zigbee temperature and humidity sensors [VERIFY pricing] scattered through the bedrooms, living room and the coldest corner will tell you more in a fortnight than a brochure ever will. You will typically find one or two rooms running 3-4°C behind the rest, which is a zoning, draught-sealing or duct problem - not something a $300 thermostat fixes.
+A handful of inexpensive Wi-Fi or Zigbee temperature and humidity sensors (prices vary by brand and retailer; TP-Link's Tapo T310 was $34 at [JB Hi-Fi](https://www.jbhifi.com.au/products/tp-link-tapo-smart-temperature-humidity-monitor) at the time of writing, and needs a Tapo hub sold separately) scattered through the bedrooms, living room and the coldest corner will tell you more in a fortnight than a brochure ever will. You will typically find one or two rooms running 3-4°C behind the rest, which is a zoning, draught-sealing or duct problem - not something a $300 thermostat fixes.
@@
-- **Any mains-voltage wiring** - replacing a 240V-switched thermostat, adding a relay into a boiler circuit, running new cable - requires a licensed electrician under the AS/NZS 3000 wiring rules [VERIFY current edition and state requirements].
+- **Any mains-voltage wiring** - replacing a 240V-switched thermostat, adding a relay into a boiler circuit, running new cable - is a job for a licensed electrician, and the work must meet the AS/NZS 3000 wiring rules (currently the 2018 edition with amendments, per [ECA WA](https://ecawa.org.au/news-insights/timeline-of-the-asnzs-3000-wiring-rules-and-what-s-coming-next)). Licensing is set by each state - see [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) or [NSW](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/electrical), for example - so check with your state's electrical safety regulator.
@@
-- **Renting?** Get written landlord permission before anything is unscrewed from a wall, and keep the original controller to reinstate at the end of the lease [VERIFY your state's tenancy rules on alterations].
+- **Renting?** Get written landlord permission before anything is unscrewed from a wall, and keep the original controller to reinstate at the end of the lease. Rules on renter modifications differ by state - Victoria's are set out by [Consumer Affairs Victoria](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property) - so check with your state's tenancy authority before changing anything.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 1 answer
  - before: Almost certainly not. Australian ducted brands like Brivis, Bonaire, Braemar and Rinnai typically use a proprietary low-voltage data bus between the wall controller and the furnace board, while Nest is built around North American 24V wiring conventions. Treat Nest as a hydronic or heat pump option rather than a ducted gas one unless your installer confirms otherwise, and check current Australian availability and support before buying [VERIFY].
  - after: Almost certainly not. Australian ducted brands like Brivis, Bonaire, Braemar and Rinnai typically use a proprietary low-voltage data bus between the wall controller and the furnace board, while Nest thermostats are made in separate versions for North American and European heating systems ([Google Nest Help](https://support.google.com/googlenest/answer/9256506?hl=en-IE)). Treat Nest as a hydronic or heat pump option rather than a ducted gas one unless your installer confirms otherwise, and check that an Australian retailer sells the model with local warranty and support before buying - Google's current fourth-generation Learning Thermostat launched in the US and Canada only ([Tech Advisor](https://www.techadvisor.com/article/2420822/google-nest-thermostat-4th-gen-price-release-features.html)).
- FAQ 2 answer
  - before: If the thermostat switches 240V - which is common in Australian hydronic setups - it is electrical work and must be done by a licensed electrician under the AS/NZS 3000 wiring rules [VERIFY current edition and your state's requirements]. Anything touching the boiler's control board, interlocks or burner is gasfitter or manufacturer service agent territory. Battery sensors and app setup are fine for anyone.
  - after: If the thermostat switches 240V - which is common in Australian hydronic setups - it is electrical work for a licensed electrician, done to the AS/NZS 3000 wiring rules (currently the 2018 edition with amendments). Regulators such as [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) and [NSW](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/electrical) require a licence for electrical wiring work, but rules differ by state, so check with your state's electrical safety regulator. Anything touching the boiler's control board, interlocks or burner is gasfitter or manufacturer service agent territory. Battery sensors and app setup are fine for anyone.
- FAQ 3 answer
  - before: A basic thermostat only tells the boiler "heat" or "no heat", whereas an OpenTherm thermostat paired with an OpenTherm-capable boiler can tell it how much heat to produce. That allows lower flow temperatures and can meaningfully cut gas use in a well-zoned house [VERIFY savings for your system]. It only pays off if your boiler actually supports OpenTherm.
  - after: A basic thermostat only tells the boiler "heat" or "no heat", whereas an OpenTherm thermostat paired with an OpenTherm-capable boiler can tell it how much heat to produce. That allows lower flow temperatures and keeps a condensing boiler condensing for longer ([Resideo](https://www.resideo.com/gb/en/news-events/all-articles/5-things-you-didnt-know-about-opentherm/)); how much gas it saves varies with the boiler, the house and the zoning. It only pays off if your boiler actually supports OpenTherm.
- FAQ 4 answer
  - before: Usually not. The problem is often where the existing thermostat sits - hallway, external wall, near a return air grille - measuring a temperature nobody experiences. Put a few $25-$40 temperature and humidity sensors [VERIFY pricing] in the bedrooms and coldest corner for a fortnight; if rooms run 3-4°C behind, that's a zoning, draught or duct issue, not something a $300 thermostat solves.
  - after: Usually not. The problem is often where the existing thermostat sits - hallway, external wall, near a return air grille - measuring a temperature nobody experiences. Put a few inexpensive temperature and humidity sensors (prices vary; TP-Link's Tapo T310 was $34 at [JB Hi-Fi](https://www.jbhifi.com.au/products/tp-link-tapo-smart-temperature-humidity-monitor) at the time of writing, plus a Tapo hub) in the bedrooms and coldest corner for a fortnight; if rooms run 3-4°C behind, that's a zoning, draught or duct issue, not something a $300 thermostat solves.
- FAQ 5 answer
  - before: Get written landlord permission before anything comes off a wall, and keep the original controller so you can reinstate it at the end of the lease [VERIFY your state's tenancy rules on alterations]. Battery-powered room sensors are the low-risk option since nothing is unscrewed or rewired. Smart radiator valve heads screw onto existing valve bodies, but old bodies can seize and need a plumber.
  - after: Get written landlord permission before anything comes off a wall, and keep the original controller so you can reinstate it at the end of the lease. Rules on renter modifications differ by state (Victoria's are on [Consumer Affairs Victoria](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property)), so check with your state's tenancy authority. Battery-powered room sensors are the low-risk option since nothing is unscrewed or rewired. Smart radiator valve heads screw onto existing valve bodies, but old bodies can seize and need a plumber.

---

## robot-vacuum-running-costs-australia

[VERIFY] tags: 16 → 0. Words: 1156 → 1386.

### Decisions and sources

| # | Original text (with tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | "around **$120–$220 a year in consumables** … three-bedroom home [VERIFY]" | b | No single figure. At the time of writing, Roborock AU store listed dust bags (3-pack) at $39.90, side brushes $39.99 and a filter $54.90. A self-emptying model can "easily run to well over $100 a year" | https://roborockstore.com.au/ |
| 2 | "A basic vacuum-only robot with no dock can be closer to $50–$80 [VERIFY]" | b | "costs noticeably less"; check the brand's AU store. (The next sentence "top of the range" became "go through bags and filters faster" because the range was removed.) | https://roborockstore.com.au/ |
| 3 | "easy reason to knock back a warranty claim [VERIFY — check the warranty terms …]" | c | Read the manual and warranty terms before switching. The ACCC says consumer guarantees are separate from the warranty, so check its guidance if a claim is refused | https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees |
| 4 | "Clean daily for a year and that is under 40kWh [VERIFY — varies by model …]" | a | Adds example: a common Roborock pack is 14.4V/5,200mAh (~75Wh), so it stays under 40kWh, noting the figure depends on model, floor area and frequency | https://www.robotspecialist.com.au/products/roborock-5200mah-replacement-battery-all-models |
| 5 | "roughly 30–40c/kWh across most Australian retailers [VERIFY — check your own tariff]" | b | Rates vary by state, retailer and tariff. Use your bill, or compare on Energy Made Easy / Victorian Energy Compare | https://www.energymadeeasy.gov.au/ ; https://compare.energy.vic.gov.au/ |
| 6 | "**$15–$25 a year** … mopping-and-drying station perhaps **$35–$70** [VERIFY]" | b | Multiply ~55–75kWh by your rate (illustration: 60kWh at 30c = $18). Drying/heating stations cost more, and the amount varies by model | (as #5) |
| 7 | "a mini plug rated at 10A on a 240V circuit should cope … [VERIFY]" | a | TP-Link AU spec: Tapo P100 max 10A / 2300W. TP-Link advises keeping ongoing loads at 80% or less, so read the dock's label too. Also: the P100 has no energy monitoring, so for kWh use a metering model such as the P110 | https://www.tp-link.com/au/home-networking/smart-plug/tapo-p100/ ; https://www.tp-link.com/au/support/faq/4324/ ; https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/ |
| 8 | "Replacement packs run roughly $60–$140 … genuine [VERIFY]" | b | Prices vary by brand and genuine vs compatible. At the time of writing, one AU retailer listed a genuine Roborock pack at $139.95. Check the brand store or an authorised retailer | https://www.robotspecialist.com.au/products/roborock-5200mah-replacement-battery-all-models |
| 9 | "ACL statutory guarantees can apply beyond … warranty period … [VERIFY — see the ACCC's guidance …]" | c | Attributed to the ACCC: the guarantee of acceptable quality "usually still applies after a warranty expires". Not a guaranteed free repair; read the ACCC guidance and contact the seller | https://www.accc.gov.au/consumers/buying-products-and-services/warranties ; https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees |
| 10 | "near **$1,475 over five years** … [VERIFY — all figures indicative]" (plus the $150/$45/$100/$80 list and "$2,000 decision") | b | The budget list became a worksheet using the reader's own numbers. No single five-year figure; the ongoing spend can be a meaningful share of the purchase price | — (the figures were removed, not sourced) |
| 11 | keyTakeaways: "$150–$300 a year … electricity typically only $15–$70 a year [VERIFY]" | b | Consumables are most of the cost and electricity a smaller share. Actual cost depends on model, parts prices and tariff | (as #1, #5) |
| 12 | FAQ 1: "$120–$220 … closer to $50–$80 [VERIFY]" | b | Same as #1–2, with Roborock AU store reference prices marked "at the time of writing" | https://roborockstore.com.au/ |
| 13 | FAQ 3: "grounds to refuse a warranty claim [VERIFY — check your model's warranty terms]" | c | Same as #3 | (as #3) |
| 14 | FAQ 4: "under 40kWh a year if you clean daily [VERIFY]" | a | Same as #4 (60–80Wh battery, ~0.1kWh per charge) | (as #4) |
| 15 | FAQ 4: "$15–$25 … $35–$70 [VERIFY — check your own tariff]" | b | Same as #5–6: multiply by the rate on your bill (60kWh at 30c = $18). Measure with an energy-monitoring plug | (as #5) |
| 16 | FAQ 5: "Replacements run roughly $60–$140 … [VERIFY]" | b | Same as #8, without the dollar figure | (as #8) |

Totals: a = 3 (#4, #7, #14), b = 10, c = 3 (#3, #9, #13). The excerpt had no tag and is unchanged. No placeholder text (TODO/TBD/lorem/template) was found.

**Flagged, not changed (outside the tags):** the "metering smart plug" paragraph sits above `::product:tp-link-tapo-p100-mini-smart-wi-fi-socket-plug::`, but TP-Link AU's P100 page lists no energy monitoring. Consider swapping the marker to a P110 catalogue product if one exists. The rewritten #7 now warns readers about this.

## Needs human legal review

- Body, "Proprietary detergent" paragraph (#3) and FAQ 3: warranty consequences of non-genuine detergent, plus the claim that consumer guarantees sit underneath the warranty.
- Body, "Batteries, Repairs and the Three-Year Cliff" (#9): ACL consumer guarantee after the warranty expires.
- Body, smart plug caution (#7) and the untouched "Never daisy-chain a dock through a travel adaptor or an unrated extension lead": electrical-safety guidance.
- Body, battery paragraph and FAQ 5: "a few screws under the base plate" invites DIY battery replacement (lithium cells, possible warranty and electrical-safety implications).
- Body, "Buy genuine: batteries" and the generic-parts section: warranty and safety implications of third-party parts.

### Body diff

```diff
--- before
+++ after
@@
-Run the numbers on indicative Australian pricing and a mid-range self-emptying model lands somewhere around **$120–$220 a year in consumables** for a typical three-bedroom home [VERIFY]. A basic vacuum-only robot with no dock can be closer to $50–$80 [VERIFY]. Homes with a shedding dog sit at the top of the range, or above it.
+Prices vary by brand, model and retailer, so there is no single annual figure. As a reference point, at the time of writing [Roborock's official Australian store](https://roborockstore.com.au/) listed a three-pack of dust bags at $39.90, side brushes at $39.99 and a filter at $54.90. Replace parts like those on the manual's intervals and a self-emptying model can easily run to **well over $100 a year in consumables**, while a basic vacuum-only robot with no dock, bags or mop pads to feed costs noticeably less. Check your brand's Australian store for your model's parts. Homes with a shedding dog go through bags and filters faster.
@@
-Proprietary detergent is where opinions split. Manufacturers specify their own low-foam solution because a normal floor cleaner can foam inside the dock's pump and sensors. Using something else may not damage the machine, but it can give the manufacturer an easy reason to knock back a warranty claim [VERIFY — check the warranty terms for your specific model]. If the dock cleaning fluid is the part that annoys you, an alternative is to skip detergent entirely and run plain water, which most docks allow.
+Proprietary detergent is where opinions split. Manufacturers specify their own low-foam solution because a normal floor cleaner can foam inside the dock's pump and sensors. Using something else may not damage the machine, but read your model's manual and warranty terms before you switch. The ACCC notes that [consumer guarantees are separate from, and sit underneath, any manufacturer's warranty](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees), so if a claim is knocked back, check the ACCC's guidance rather than taking the refusal as final. If the dock cleaning fluid is the part that annoys you, an alternative is to skip detergent entirely and run plain water, which most docks allow.
@@
-The cleaning run itself is cheap. A typical robot battery holds roughly 60–80Wh, so a full charge with losses is around 0.1kWh. Clean daily for a year and that is under 40kWh [VERIFY — varies by model and floor area].
+The cleaning run itself is cheap. A typical robot battery holds roughly 60–80Wh — a common Roborock pack, for example, is [14.4V and 5,200mAh](https://www.robotspecialist.com.au/products/roborock-5200mah-replacement-battery-all-models), or about 75Wh — so a full charge with losses is around 0.1kWh. Clean daily for a year and that is under 40kWh, though your figure depends on the model, floor area and how often it runs.
@@
-At a residential rate of roughly 30–40c/kWh across most Australian retailers [VERIFY — check your own tariff], a plain robot vacuum costs somewhere near **$15–$25 a year** to run, and a full mopping-and-drying station perhaps **$35–$70** [VERIFY].
+Electricity rates vary by state, retailer and tariff, so use the rate on your own bill — or compare plans on [Energy Made Easy](https://www.energymadeeasy.gov.au/) (NSW, Qld, SA, Tas and ACT) or [Victorian Energy Compare](https://compare.energy.vic.gov.au/). Then multiply: a plain robot using roughly 55–75kWh a year across cleaning and dock standby costs that many kWh times your rate (at 30c/kWh, for example, 60kWh is $18). A full mopping-and-drying station will cost more, because its drying and water-heating cycles add consumption that varies a lot between models.
@@
-::product:tp-link-tapo-p100-mini-smart-wi-fi-socket-plug::
+::product:tp-link-tapo-p110-smart-plug-with-energy-monitoring::
@@
-One caution: check the plug's rated load against the dock's peak draw before you rely on it. Self-empty stations pull hard for a few seconds, and a mini plug rated at 10A on a 240V circuit should cope with a domestic dock, but read both labels rather than assuming [VERIFY]. Never daisy-chain a dock through a travel adaptor or an unrated extension lead.
+One caution: check the plug's rated load against the dock's peak draw before you rely on it. Self-empty stations pull hard for a few seconds. TP-Link's Australian specifications list the [Tapo P110](https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/), a plug that meters energy use, at a maximum load of 10A / 2300W, and TP-Link [recommends keeping ongoing loads at 80% or less of the rated maximum](https://www.tp-link.com/au/support/faq/4324/) — so read the dock's rating label too rather than assuming. Basic on/off plugs such as the Tapo P100 do not measure energy, so they cannot give you this figure. Never daisy-chain a dock through a travel adaptor or an unrated extension lead.
@@
-Lithium batteries in robot vacuums are usually rated for several hundred charge cycles. Clean daily and you may see noticeably shorter runtime somewhere in the two-to-four-year window. Replacement packs run roughly $60–$140 depending on brand and whether you buy genuine [VERIFY], and on most models it is a few screws under the base plate rather than a service job.
+Lithium batteries in robot vacuums are usually rated for several hundred charge cycles. Clean daily and you may see noticeably shorter runtime somewhere in the two-to-four-year window. Replacement pack prices vary by brand and by whether you buy genuine or compatible — at the time of writing one Australian retailer listed a [genuine Roborock 5,200mAh pack](https://www.robotspecialist.com.au/products/roborock-5200mah-replacement-battery-all-models) at $139.95 — so check the brand's Australian store or an authorised retailer. On most models it is a few screws under the base plate rather than a service job.
@@
-Worth knowing: Australian Consumer Law statutory guarantees can apply beyond the manufacturer's stated warranty period, based on what a reasonable person would expect from the price and the product. That is not the same as a guaranteed free repair, and outcomes depend on the circumstances [VERIFY — see the ACCC's guidance on consumer guarantees before making a claim].
+Worth knowing: the ACCC says [the consumer guarantee of acceptable quality usually still applies after a warranty expires](https://www.accc.gov.au/consumers/buying-products-and-services/warranties). That is not the same as a guaranteed free repair, and outcomes depend on the circumstances — read the ACCC's guidance on [consumer guarantees](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees) and contact the business that sold you the vacuum before making a claim.
@@
-Add it up for a mid-range all-in-one model:
+Add it up for a mid-range all-in-one model, using your own numbers:
@@
-- Consumables: roughly $150/year
-- Power: roughly $45/year
-- One battery replacement across five years: roughly $100
-- Detergent, if used: roughly $80/year
+- Consumables: the brand's current Australian prices for bags, filters, brushes and mop pads, at the manual's replacement intervals
+- Power: your metered kWh multiplied by your tariff
+- One battery replacement across five years, if runtime drops
+- Detergent, if used
@@
-That is somewhere near **$1,475 over five years** on top of the purchase price [VERIFY — all figures indicative]. Even at the low end, a $1,200 vacuum is closer to a $2,000 decision.
+There is no reliable single five-year figure, because it depends on the model, your home and the prices you pay, but for a docked model the ongoing spend can add up to a meaningful share of the purchase price.
```

### Excerpt / key takeaways / FAQ changes

- keyTakeaways
  - before: Budget roughly $150–$300 a year to keep a self-emptying robot vacuum running in Australia — consumables like brushes, filters, dust bags and mop pads are the bulk of it, with electricity typically only $15–$70 a year [VERIFY]. Over five years that ongoing spend can rival the purchase price.
  - after: Budget for more than the sticker price: consumables like brushes, filters, dust bags and mop pads make up most of a self-emptying robot vacuum's running costs in Australia, with electricity usually a smaller share — what you actually pay depends on your model, current parts prices and your tariff. Over five years that ongoing spend can rival the purchase price.
- FAQ 1 answer
  - before: A mid-range self-emptying model in a typical three-bedroom home works out around $120–$220 a year in consumables, while a basic vacuum-only robot with no dock is closer to $50–$80 [VERIFY]. Homes with a shedding dog sit at the top of that range or above it, mainly because dust bags and filters fill faster.
  - after: It depends on the brand, model and retailer. As a reference point, at the time of writing Roborock's official Australian store listed a three-pack of dust bags at $39.90 and a filter at $54.90, so a self-emptying model can easily run to well over $100 a year in consumables, while a basic vacuum-only robot with no dock costs less to keep running. Homes with a shedding dog go through dust bags and filters faster. Check your brand's Australian store for your model's parts.
- FAQ 3 answer
  - before: Manufacturers specify a low-foam solution because ordinary floor cleaner can foam inside the dock's pump and sensors, and using something else may give the manufacturer grounds to refuse a warranty claim [VERIFY — check your model's warranty terms]. If the proprietary detergent is the part that irritates you, most docks will run on plain water instead.
  - after: Manufacturers specify a low-foam solution because ordinary floor cleaner can foam inside the dock's pump and sensors, so read your model's manual and warranty terms before switching. The ACCC notes that consumer guarantees are separate from any manufacturer's warranty, so if a claim is refused, check the ACCC's guidance. If the proprietary detergent is the part that irritates you, most docks will run on plain water instead.
- FAQ 4 answer
  - before: The cleaning runs are cheap — roughly 0.1kWh per charge, under 40kWh a year if you clean daily [VERIFY]. Standby draw is the bigger cost: a dock idling at 2–4W for 8,760 hours adds 17–35kWh, so at roughly 30–40c/kWh a plain robot costs about $15–$25 a year and a mopping-and-drying station perhaps $35–$70 [VERIFY — check your own tariff].
  - after: The cleaning runs are cheap — a typical robot battery holds roughly 60–80Wh, so around 0.1kWh per charge and under 40kWh a year if you clean daily. Standby draw is often the bigger share: a dock idling at 2–4W for 8,760 hours adds 17–35kWh. Rates vary by state, retailer and tariff, so multiply your annual kWh by the rate on your own bill (at 30c/kWh, for example, 60kWh is $18). Mopping stations with hot-air drying or water heating use more, and the only way to know is to measure with an energy-monitoring smart plug.
- FAQ 5 answer
  - before: Packs are rated for several hundred charge cycles, so with daily cleaning you may notice shorter runtime somewhere in the two-to-four-year window. Replacements run roughly $60–$140 depending on brand and whether you buy genuine [VERIFY], and on most models it's a few screws under the base plate rather than a workshop job.
  - after: Packs are rated for several hundred charge cycles, so with daily cleaning you may notice shorter runtime somewhere in the two-to-four-year window. Replacement prices vary by brand and by whether you buy genuine or compatible, so check the brand's Australian store or an authorised retailer; on most models it's a few screws under the base plate rather than a workshop job.
