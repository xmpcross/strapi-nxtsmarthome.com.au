# Task 7 review: cluster 4, robot vacuum buying guide + homes with pets

**Nothing has been written to Strapi.** Reply **approve** to publish the merged article, update two internal links and add the redirect. Then unpublish the MERGE post in the Strapi admin.

| | Slug | Title | Words | [VERIFY] | Product boxes |
|---|---|---|---|---|---|
| **KEEP** | robot-vacuum-buying-guide-australia | Robot Vacuum Buying Guide: What Actually Matters (and What Does Not) | 1135 | 0 | 0 |
| MERGE | robot-vacuum-buying-guide-australian-homes-pets | Robot Vacuum Buying Guide for Australian Homes With Pets | 625 | 8 | 2 |

## What happens on approve

1. **KEEP updated in Strapi:** body, excerpt, keyTakeaways and FAQ from the draft below. The pet material becomes one "Homes with pets" section. Title kept ("Robot Vacuum Buying Guide: What Actually Matters (and What Does Not)"); new seoTitle "Robot Vacuum Buying Guide Australia: What Actually Matters" and seoDescription "Navigation, brushes, self-emptying docks and mopping: which robot vacuum features are worth paying for in an Australian home, including homes with pets.". Slug and `publishDate` (11 Jun 2026) kept; `dateModified` set to today.
2. **KEEP gains both product boxes** (Dreame L10s Ultra, Ecovacs Deebot X2 Omni). It had none, which broke rule 8.
3. **Two internal links updated in Strapi**, now pointing to the new section `…/robot-vacuum-buying-guide-australia/#homes-with-pets`:
   - `self-emptying-robot-vacuum-worth-it`
     - before: …which we cover in the [robot vacuum buying guide for Australian homes with pets](https://nxtsmarthome.com.au/robot-vacuums/robot-vacuum-buying-guide-australian-homes-pets)…
     - after: …which we cover in the [homes with pets section of our robot vacuum buying guide](https://nxtsmarthome.com.au/robot-vacuums/robot-vacuum-buying-guide-australia/#homes-with-pets)…
   - `roborock-vs-ecovacs-vs-dreame-australia`
     - before: …our [robot vacuum buying guide for Australian homes with pets](https://nxtsmarthome.com.au/robot-vacuums/robot-vacuum-buying-guide-australian-homes-pets) goes into more detail…
     - after: …the [homes with pets section of our robot vacuum buying guide](https://nxtsmarthome.com.au/robot-vacuums/robot-vacuum-buying-guide-australia/#homes-with-pets) goes into more detail…
4. **301** `/robot-vacuums/robot-vacuum-buying-guide-australian-homes-pets/` → `/robot-vacuums/robot-vacuum-buying-guide-australia/` added to `data/redirects-adsense.json` (already live via `data/merged-articles.json`).
5. **You unpublish the MERGE post** in the Strapi admin.
6. Build, audit, changelog.

Backups: `exports/strapi-backup/<slug>-2026-09-24T09-46-52-146Z.json` (all four posts).

## Worth knowing

- **Both featured products are hard to buy now.** The researcher found the Dreame L10s Ultra is no longer in Dreame Australia's range, and Ecovacs AU showed the X2 Omni sold out on 24 Sep. The article discusses them as examples; swapping in current models is a separate change for later.
- The KEEP post had not been fact-checked before; the researcher also checked the specs and figures it kept (see decisions).

---

# Merge: robot-vacuum-buying-guide-australian-homes-pets → robot-vacuum-buying-guide-australia

## Section map (MERGE → KEEP)

| MERGE item | Status | Where in merged KEEP |
| --- | --- | --- |
| Intro: pet hair, tracked litter, dander; budget unit chokes on heavy coat | UNIQUE | Homes with pets (opening para) |
| Practical takeaway: priority order brush → self-empty base → obstacle avoidance | UNIQUE (ordering) | Homes with pets (numbered list) |
| "Suction matters less past ~4,000Pa" | COVERED (Suction: mostly marketing) | Figure dropped (decision 2) |
| H2 What actually matters for pet hair | COVERED overall (Brushes; Australian considerations: pets) | Folded into Homes with pets |
| Brush design beats raw suction | COVERED (Brushes section) | — |
| Rubber/anti-tangle roller with comb-style hair cutting | COVERED (Anti-tangle designs: combs) | Wording extended in Brushes |
| Auto-empty base; onboard bin 300–500mL; two pets fill it in a day or two | UNIQUE (bin size, pet fill rate) | Self-emptying docks + Homes with pets item 2 |
| Auto-empty keeps dust out of face / allergies | COVERED (Self-emptying docks: allergy sufferers) | — |
| Obstacle avoidance / pet waste; cameras + structured light vs bump-only | COVERED (Obstacle avoidance para); sensor detail UNIQUE | Navigation (obstacle avoidance) + Homes with pets item 3 |
| Filtration: sealed HEPA for dander/asthma | UNIQUE | Homes with pets (Filtration) |
| H2 Mopping: lift/detach over carpet | COVERED (Mopping: mid-range) | — |
| Mopping: hot-air drying; damp pads smell in Qld summer | COVERED (Mopping: high end, mould) | Humid-summer line added to high end |
| Mixed tile/timber/rug homes | COVERED (Australian considerations: hard floors) | Mid-range mopping line |
| Dreame L10s Ultra product para + marker | UNIQUE | Mopping (after high-end tier) |
| H2 Corners, edges: round robots miss corners; D/square shapes, extending side brushes | UNIQUE | Brushes ("Shape matters for corners") + Homes with pets |
| Ecovacs X2 Omni product para + marker | UNIQUE | Homes with pets (corners) |
| Power: plug-in dock, new outlet = licensed work | UNIQUE | Australian considerations (Power) |
| Where to buy: JB Hi-Fi, Good Guys, Harvey Norman, Amazon AU; EOFY/Black Friday | UNIQUE | Australian considerations (Where to buy) |
| Grey-import eBay AU listings / warranty | UNIQUE | Australian considerations (Grey imports) |
| Consumables stocked locally | COVERED (Check local support) | — |
| Fine dust in bushfire season / inland | UNIQUE | Australian considerations (Fine dust) |
| H2 Setting realistic expectations: maintenance tool, not deep clean | UNIQUE (KEEP only said this about mopping) | What to buy (closing) |
| Still need a stick vacuum for lounges and stairs | UNIQUE | What to buy (closing) |
| FAQ 1537 suction for dog/cat hair | COVERED (KEEP FAQ 1463) | Merged into 1463 |
| FAQ 1538 self-emptying with two pets | COVERED (KEEP FAQ 1462) | Merged into 1462 |
| FAQ 1539 electrician for dock | UNIQUE | New FAQ order 4 (no id) |
| FAQ 1540 mop damage rugs/carpet | COVERED (KEEP FAQ 1464) | Merged into 1464 |
| FAQ 1541 eBay grey imports | UNIQUE | New FAQ order 5 (no id) |

## Decisions (a = verified + linked, b = rewritten as range/guidance, c = removed / pointed to authority)

| # | Original | a/b/c | New | Sources |
| --- | --- | --- | --- | --- |
| 1 | MERGE: onboard bin "typically 300-500mL [VERIFY]" | a | Dreame lists 350mL (L10s Ultra), Ecovacs lists 420mL (X2 Omni) | https://global.dreametech.com/products/dreamebot-l10s-ultra ; https://www.ecovacs.com/au/deebot-robotic-vacuum-cleaner/deebot-x2-omni-white |
| 2 | MERGE: "past roughly 4,000Pa" suction threshold | b | "Beyond a reasonable baseline" (KEEP wording); no figure | — (no authoritative source for a threshold) |
| 3 | MERGE: L10s "street pricing upper-mid bracket [VERIFY]" | c | Removed; "check the current listing and the seller's warranty terms" | https://dreame.com.au/pages/warranty-policy |
| 4 | MERGE: L10s "dual spinning mop pads that lift for carpet … anti-tangle brush hardware" | b | Dreame says mops lift when returning to base; Dreame says brush design makes long hair easy to detangle (no carpet-lift claim) | https://global.dreametech.com/products/dreamebot-l10s-ultra |
| 5 | MERGE: X2 Omni "expect to pay well above $1,500 [VERIFY]" | c | Removed; "premium end", sold out on Ecovacs AU store when checked, check current listings | https://www.ecovacs.com/au/deebot-robotic-vacuum-cleaner/deebot-x2-omni-white |
| 6 | MERGE: X2 square front for corners; base empties/washes/dries | a | Square body + edge sensor for edge-to-edge cleaning; AIVI 3D pet mode; hot-water wash, hot-air dry | https://www.ecovacs.com/au/deebot-robotic-vacuum-cleaner/deebot-x2-omni-white |
| 7 | MERGE: "240V plug-in bases using a standard Type I plug" | b | "Docks plug into an ordinary power point" (voltage/plug type dropped) | — |
| 8 | MERGE: new outlet "is licensed electrical work in Australia [VERIFY]" | a + pointer | Energy Safe Victoria example (DIY electrical work illegal, hire licensed electrician); rules vary by state, check local regulator | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| 9 | MERGE: retailers "discount heavily around EOFY and Black Friday" | b | Retailers range them; prices move during sales periods, compare current listings | — |
| 10 | MERGE: grey imports "may not carry local warranty support [VERIFY]" | a | ACCC: consumer guarantees still apply against the seller; manufacturer warranty may not apply in Australia | https://www.accc.gov.au/consumers/buying-products-and-services/buying-parallel-imports |
| 11 | MERGE: "sealed HEPA-grade filter matters if dander triggers asthma" (health) | b | Point to Asthma Australia HEPA guidance ("HEPA-style" labels a step below true HEPA); check model filter spec; medical questions to GP | https://asthma.org.au/blog/can-a-hepa-filter-vacuum-help-with-allergies-and-asthma/ |
| 12 | MERGE: two pets fill bin "in a day or two" | b | "you could be emptying it after every run" | — |
| 13 | KEEP: "Australia has one of the highest rates of pet ownership in the world" | a (reworded) | AMA 2025 survey: 73% of households have a pet; dogs 49%, cats 34% (no world-ranking claim; the source makes none) | https://animalmedicinesaustralia.org.au/news-and-media/australias-most-comprehensive-pet-survey-shows-nearly-three-quarters-of-australian-homes-now-have-a-pet/ |
| 14 | KEEP: dock bag holds "several weeks of debris" | a | Dreame claims up to 60 days from the L10s Ultra's 3L bag; pet homes should expect less | https://global.dreametech.com/products/dreamebot-l10s-ultra |
| 15 | KEEP: "Buying locally also means Australian Consumer Law guarantees apply" (legal) | a | ACCC: consumer guarantees are automatic when buying from a business selling in Australia, separate from warranties | https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees |
| 16 | KEEP: "Hard floors are common here" / MERGE "Most Australian homes mix tile, timber and rug" | b | Conditional guidance ("If your home is mostly tile, timber or vinyl…") | — |
| 17 | KEEP: camera mapping "rules out running it at night" | b | "can struggle in low light, so check how a model copes" | — |
| 18 | KEEP: mapping data "generally goes to the manufacturer's servers" (privacy) | b | "Many models sync that data to the manufacturer's cloud"; read the privacy policy | — |
| 19 | KEEP: absolutes ("genuinely, obviously better", "dramatically better", "you will use it twice", "catastrophe") | b | Softened to usually/generally/good chance | — |

Counts: a = 7 (#1, 6, 8, 10, 13, 14, 15); b = 10 (#2, 4, 7, 9, 11, 12, 16, 17, 18, 19); c = 2 (#3, 5).

## FAQ sources (answers are plain text)

- 1462 self-emptying: https://global.dreametech.com/products/dreamebot-l10s-ultra (350mL bin)
- 1463 pet hair: guidance, no figures
- 1464 mopping/rugs: guidance, no figures
- 1465 privacy: guidance
- New (order 4) electrician: https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself
- New (order 5) grey imports: https://www.accc.gov.au/consumers/buying-products-and-services/buying-parallel-imports

## Needs human legal review

- Power / new power point for the dock (article "Australian considerations" + FAQ order 4): sourced to Energy Safe Victoria only; states it as an example and points readers to their state regulator. Confirm wording is acceptable nationally.
- Grey imports / consumer guarantees / warranties (article + FAQ order 5), and the ACL consumer-guarantees sentence under "Check local support": paraphrased from ACCC pages; confirm no overstatement.
- Privacy section and FAQ 1465 (cloud sync of maps/images): general guidance, no legal claim, but rule 6 lists privacy.
- Dreame warranty statement ("direct warranty applies to purchases from dreame.com.au"): from Dreame's policy page; confirm it reads fairly.

## Flagged, not changed

- Asthma/allergy filtration paragraph is health-adjacent; it defers to Asthma Australia and a GP rather than making a claim. Editor may prefer to cut it.
- Neither product page confirmed a true HEPA filter, so no filter claim is made for either product.
- Dreame L10s Ultra is no longer in Dreame AU's current line-up (per product notes) and X2 Omni was sold out on Ecovacs AU's store on 24 Sep 2026: both markers may point to hard-to-buy products. Consider swapping for current models (e.g. Dreame L20 Ultra) in a later pass.
- Ecovacs pages disagree on edge distance (product notes say ~5 mm; the AU product page says mop pads reach within 30 mm of corners). The article avoids quoting either figure.
- "Emptying a small bin after every run is a common reason people stop scheduling" and "Many people who give up on robot vacuums bought the second kind" are editorial opinion carried over from KEEP, unsourced.
- Pet-welfare claims: none made, so RSPCA/AVA not consulted.


---

## Merged article: meta

- **title:** Robot Vacuum Buying Guide: What Actually Matters (and What Does Not)
- **seoTitle:** Robot Vacuum Buying Guide Australia: What Actually Matters
- **seoDescription:** Navigation, brushes, self-emptying docks and mopping: which robot vacuum features are worth paying for in an Australian home, including homes with pets.
- **excerpt:** Navigation, brushes, self-emptying docks and mopping: which robot vacuum features are worth paying for in an Australian home, plus what changes when you have a shedding dog or cat.
- **keyTakeaways:** Navigation quality matters more than suction: LiDAR mapping is the biggest jump in usefulness. After that, prioritise tangle-resistant rubber brushes and a self-emptying dock. In a pet home, add camera or structured-light obstacle avoidance and consider a square or D-shaped robot for corners. Check local warranty support and current listings before you buy.

### FAQ (6)

**Is a self-emptying dock worth the extra money?** (KEEP #1462)

For most households, yes. It is the feature that changes a robot vacuum from a device you maintain into one you largely forget about. Onboard bins are small (Dreame lists 350mL for the L10s Ultra), and with shedding pets you may be emptying one after every run. The trade-offs are dock size, noise during emptying, and the ongoing cost of replacement bags on models that use them.

**Do robot vacuums handle pet hair?** (KEEP #1463)

Good ones do. Brush design matters more than headline suction figures: rubber or silicone brushes tend to tangle far less than bristle brushes, and anti-tangle designs with combs that strip hair off the roller help further. Long-haired pets will still need you to clear the brush and wheels occasionally, whatever the price.

**Are the mopping functions any good, and will they wet my rugs?** (KEEP #1464)

They vary enormously. Basic models drag a damp cloth, which is fine for light dust on sealed floors and does little on a genuinely dirty one. If you have rugs, check first that the robot lifts or detaches its mop pads over carpet. Models that wash the pads at the dock and dry them with hot air do a genuinely useful maintenance job, but neither replaces a proper mop for a dirty floor.

**Should I worry about robot vacuums mapping my house?** (KEEP #1465)

A mapping robot builds a floor plan of your home, and camera-equipped models capture images inside it. Many models sync that data to the manufacturer's cloud. If that concerns you, read the privacy policy, look for models with local processing, or check whether the brand supports a cloud-free mode. LiDAR-only models without cameras are a middle ground.

**Do I need an electrician to install a robot vacuum dock?** (new)

Not to plug one in: docks use an ordinary power point. Installing a new power point for the dock, for example in a cupboard or laundry nook, is fixed electrical wiring, and regulators such as Energy Safe Victoria say that work must be done by a licensed electrician. Rules are set by each state and territory, so check with your local electrical safety regulator.

**Is it safe to buy a cheaper grey-import robot vacuum from eBay AU?** (new)

The ACCC says you still have consumer guarantee rights against the seller of a parallel import, but the manufacturer's warranty may not apply in Australia. Check the warranty terms before buying, and check that filters, brushes and dust bags are stocked locally. Local retailers such as JB Hi-Fi, The Good Guys, Harvey Norman and Amazon AU also run sales, so compare current listings.

## Body diff against the current KEEP post

```diff
--- KEEP now
+++ merged
@@
-Robot vacuums are one of the few smart home categories where the expensive models are genuinely, obviously better than the cheap ones. But the price differences do not map onto the features manufacturers advertise most loudly.
+Robot vacuums are one of the few smart home categories where the expensive models are usually, noticeably better than the cheap ones. But the price differences do not map neatly onto the features manufacturers advertise most loudly.
@@
-Here is what actually determines whether you keep using one.
+Here is what actually determines whether you keep using one, including what changes when you share the house with a shedding dog or cat.
@@
-**Random bounce.** The cheapest robots move in semi-random patterns until the battery runs down. They eventually cover most of a simple room. They also miss areas entirely, cannot be told where to clean, and cannot return to where they left off. In anything more complex than a single open room, they are frustrating.
+**Random bounce.** The cheapest robots move in semi-random patterns until the battery runs down. They eventually cover most of a simple room. They also tend to miss areas, cannot be told where to clean, and cannot return to where they left off. In anything more complex than a single open room, they are frustrating.
@@
-**Camera-based mapping.** A step up. The robot builds a map using a camera and visual landmarks. It cleans in orderly rows and can navigate back to the dock. Performance degrades in low light, since it needs to see to navigate — which rules out running it at night in a dark house.
+**Camera-based mapping.** A step up. The robot builds a map using a camera and visual landmarks, cleans in orderly rows and can find its way back to the dock. Camera-only navigation can struggle in low light, so check how a model copes before planning to run it at night in a dark house.
@@
-**LiDAR mapping.** A spinning laser rangefinder builds an accurate map regardless of lighting. This is the big jump. LiDAR robots clean methodically, know where they have been, resume properly after recharging, and let you define no-go zones and clean specific rooms on command.
+**LiDAR mapping.** A spinning laser rangefinder builds a map regardless of lighting. This is the big jump. LiDAR robots clean methodically, know where they have been, resume after recharging, and let you define no-go zones and clean specific rooms on command.
@@
-The practical difference is enormous. A LiDAR robot is a device you schedule and forget. A random-bounce robot is a device you supervise. Most people who abandon robot vacuums bought the second kind.
+The practical difference is large. A well-mapped robot is a device you schedule and largely forget. A random-bounce robot is a device you supervise. Many people who give up on robot vacuums bought the second kind.
@@
-**Obstacle avoidance** is the newer differentiator on top of mapping. Better models use additional sensors to identify and avoid cables, socks, shoes and — the reason this feature exists at all — pet accidents. If you have a dog and hard floors, this feature justifies its cost the first time it works.
+**Obstacle avoidance** is the newer differentiator on top of mapping. Better models add cameras or structured-light sensors to identify and steer around cables, socks, shoes and pet accidents, where bump-only robots simply drive into things. If you have a dog and hard floors, this is the feature to look at hardest (more on that under Homes with pets below).
@@
-Manufacturers advertise suction in pascals, and the numbers have inflated steadily to the point of meaninglessness.
+Manufacturers advertise suction in pascals (Pa), and the headline numbers have climbed steadily for years.
@@
-Beyond a reasonable baseline, suction is not what limits real-world performance. Brush design, brush contact with the floor, airflow path and bin capacity matter more. A well-designed robot with modest suction outperforms a badly designed one with a bigger number.
+Beyond a reasonable baseline, suction is rarely what limits real-world performance. Brush design, brush contact with the floor, airflow path and bin capacity matter more. A well-designed robot with modest suction can outperform a badly designed one with a bigger number.
@@
-Where suction genuinely matters is deep carpet. If your home is mostly carpet, weight the suction figures and look for carpet boost. If it is mostly hard floors — very common in Australian homes — you are comfortably into diminishing returns.
+Where suction genuinely matters is deep carpet. If your home is mostly carpet, give the suction figures more weight and look for automatic carpet boost. If it is mostly hard floors, you are quickly into diminishing returns.
@@
-**Rubber or silicone brushes** resist tangling dramatically better than bristle brushes. If anyone in the house has long hair, or you have a shedding pet, this is the single most important hardware detail after navigation. Bristle brushes wrap hair around the roller and require regular scissor work.
+**Rubber or silicone brushes** generally tangle far less than bristle brushes. If anyone in the house has long hair, or you have a shedding pet, this is the most important hardware detail after navigation. Bristle brushes wrap hair around the roller and tend to need regular work with scissors.
@@
-**Anti-tangle designs** — combs, tapered brushes, dual counter-rotating rollers — build on this and genuinely reduce maintenance.
+**Anti-tangle designs** — combs that strip or cut hair off the roller, tapered brushes, dual counter-rotating rollers — build on this and can cut maintenance noticeably.
@@
-**Side brushes** sweep debris from edges into the path. They also fling debris around on hard floors sometimes. Most robots let you reduce this behaviour.
+**Side brushes** sweep debris from edges and corners into the robot's path. On hard floors they sometimes flick debris around instead; most robots let you reduce side-brush speed in the app.
+
+**Shape matters for corners.** A round robot physically cannot reach into a square corner, which is exactly where dust and pet hair drift. D-shaped and square-fronted designs, and models with extending side brushes or mop pads, get closer along skirting boards.
@@
-A self-emptying dock sucks the robot's onboard bin into a much larger container in the base, typically holding several weeks of debris.
+A self-emptying dock sucks the contents of the robot's small onboard bin into a much larger bag or container in the base. Onboard bins really are small: Dreame lists [350mL for the L10s Ultra](https://global.dreametech.com/products/dreamebot-l10s-ultra) and Ecovacs lists [420mL for the Deebot X2 Omni](https://www.ecovacs.com/au/deebot-robotic-vacuum-cleaner/deebot-x2-omni-white). How long a dock bag lasts depends on your home; Dreame, for example, claims up to 60 days of hands-free cleaning from the L10s Ultra's 3L bag, but a household with shedding pets should expect to change bags more often than the headline figure.
@@
-**Worth it if:** you want to genuinely forget about the robot. Emptying a small bin after every run is the main reason people stop scheduling their vacuum. It is also a real benefit for allergy sufferers, since you handle the dust far less often.
+**Worth it if:** you want to genuinely forget about the robot. Emptying a small bin after every run is a common reason people stop scheduling their vacuum. It also means you handle the dust far less often, which helps if anyone in the house has allergies.
@@
-- **Size.** These docks are large. Measure where it will live before ordering.
+- **Size.** These docks are large. Measure where it will live before ordering, including height if it is going under a bench.
@@
-- **Consumables.** Bagged docks need replacement bags — an ongoing cost. Bagless docks avoid this but you handle the dust directly.
+- **Consumables.** Bagged docks need replacement bags, an ongoing cost. Bagless docks avoid this but you handle the dust directly.
@@
-**Basic:** a water tank and a cloth dragged behind the robot. On sealed hard floors this picks up light dust. It does not clean anything that is actually dirty, and the cloth needs washing after every run.
+**Basic:** a water tank and a cloth dragged behind the robot. On sealed hard floors this picks up light dust. It does little for anything that is actually dirty, and the cloth needs washing after every run.
@@
-**Mid-range:** larger tanks, controllable water flow, and mop pads that lift or detach so the robot does not drag a wet cloth over your rugs.
+**Mid-range:** larger tanks, controllable water flow, and mop pads that lift or detach so the robot does not drag a wet cloth over your rugs. If your home mixes tile, timber and rugs, check how a model handles carpet while mopping before anything else.
@@
-**High end:** vibrating or spinning mop pads with downward pressure, automatic pad washing at the dock, and hot-water washing with drying to stop the pad going mouldy between runs.
+**High end:** spinning or vibrating mop pads with downward pressure, automatic pad washing at the dock, and hot-water washing and hot-air drying so the pads do not sit damp between runs. Pads left wet in a warm, humid summer go musty quickly, so the drying step is worth more here than the spec sheet suggests.
+
+::product:dreame-l10s-ultra-robot-vacuum-and-mop::
+
+The Dreame L10s Ultra is a good example of the high-end approach, going by Dreame's specifications. Its [product page](https://global.dreametech.com/products/dreamebot-l10s-ultra) describes twin rotating mops that lift when the robot returns to the base, and a dock that empties the dustbin, washes the mops, dries them with hot air, refills water and doses cleaning solution. Dreame also says the brush design makes long hair easy to detangle. It navigates with an RGB camera and 3D structured light, which some households will not want roaming the home. We have not run this unit through our own floor tests, so treat this as a spec-sheet read rather than a verdict. It no longer appears in Dreame Australia's current line-up, and [Dreame's direct warranty](https://dreame.com.au/pages/warranty-policy) applies to purchases from dreame.com.au, so check the current listing and the seller's warranty terms before buying.
@@
+## Homes with pets
+
+Pets are common in Australia: Animal Medicines Australia's 2025 national survey found [73% of households have at least one pet](https://animalmedicinesaustralia.org.au/news-and-media/australias-most-comprehensive-pet-survey-shows-nearly-three-quarters-of-australian-homes-now-have-a-pet/), with dogs in 49% and cats in 34%. Living with a shedding dog or cat changes what you need from a robot vacuum. Hair, tracked litter and dander build up faster than most people expect, and a budget unit that copes in a pet-free apartment can choke on a heavy-coated dog's winter moult.
+
+For a pet household, prioritise in this order:
+
+1. **A tangle-resistant brush.** A rubber roller with a comb or hair-cutting design is the best predictor of how often you will be on the floor with scissors. Long-haired pets will still need you to clear the brush and wheels occasionally, whatever you spend.
+2. **A self-emptying base.** With a small onboard bin and one or two shedding animals, you could be emptying it after every run. A dock bag stretches that out considerably and keeps the dust out of your face.
+3. **Reliable obstacle avoidance.** The polite phrase is "pet waste avoidance". A robot that drives through an accident on a hard floor makes a very bad day. Look for camera or structured-light avoidance rather than bump sensors alone.
+
+**Filtration** is worth checking if pet dander affects anyone's allergies or asthma. Asthma Australia's guidance on [HEPA filter vacuums](https://asthma.org.au/blog/can-a-hepa-filter-vacuum-help-with-allergies-and-asthma/) explains that "HEPA-style" or "high efficiency" labels are usually a step below a true HEPA filter, and that emptying and filter replacement matter too. Check the filter specification on the model you are considering, and take medical questions to your GP.
+
+**Corners collect hair.** This is where body shape pays off in a pet home.
+
+::product:ecovacs-deebot-x2-omni-square-robot-vacuum::
+
+The Ecovacs Deebot X2 Omni is built around that problem. According to [Ecovacs Australia](https://www.ecovacs.com/au/deebot-robotic-vacuum-cleaner/deebot-x2-omni-white), its square body and edge sensor are designed for edge-to-edge cleaning, its AIVI 3D obstacle avoidance includes a pet mode that detects and avoids pets, food bowls and waste, and its OMNI station empties the bin into a bag, washes the mops in hot water and dries them with hot air. It sits at the premium end and suits larger homes with a lot of hard floor. As with the Dreame, this is based on the manufacturer's specifications, not our own testing. Ecovacs' Australian store showed it as sold out when we checked, so check current listings and pricing at your preferred retailer.
+
@@
-**Hard floors are common here**, which favours good brush design and mopping over deep-carpet suction.
+**Match the robot to your floors.** If your home is mostly tile, timber or vinyl, good brush design and mopping matter more than deep-carpet suction.
@@
-**Pets are common here too** — Australia has one of the highest rates of pet ownership in the world. That makes anti-tangle brushes and obstacle avoidance more valuable than the spec sheet implies.
+**Power.** Robot vacuum docks plug into an ordinary power point, so no electrician is needed to set one up. Installing a new power point for the dock, say in a cupboard or laundry nook, is a different matter: that is fixed electrical wiring. Energy Safe Victoria, for example, says [doing unqualified electrical work is illegal](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) and to always hire a licensed electrician. Rules are set by each state and territory, so check with your local electrical safety regulator.
@@
-**Check local support before buying an unfamiliar brand.** Robot vacuums are mechanical devices with consumable parts — brushes, filters, mop pads, sometimes batteries. A brand with no Australian distribution can leave you unable to source a two-dollar filter. Buying locally also means Australian Consumer Law guarantees apply, which matters for a device with this many moving parts.
+**Where to buy.** JB Hi-Fi, The Good Guys, Harvey Norman and Amazon AU all range robot vacuums, and prices move around during sales periods, so compare current listings rather than relying on a quoted price.
@@
-**Multi-storey homes** need consideration. A robot maps per floor, and better models store multiple floor maps. If you plan to carry it upstairs, confirm multi-floor mapping is supported — otherwise it re-maps every time, badly.
+**Grey imports and warranties.** Cheaper overseas-sourced (parallel import) listings, including on eBay AU, can undercut local pricing. The ACCC says you still have [consumer guarantee rights against the seller of a parallel import](https://www.accc.gov.au/consumers/buying-products-and-services/buying-parallel-imports), but that a manufacturer's warranty may not apply in Australia. Check the warranty terms before you buy.
+
+**Check local support before buying an unfamiliar brand.** Robot vacuums are mechanical devices with consumable parts — brushes, filters, mop pads, dust bags, sometimes batteries. A brand with no Australian distribution can leave you unable to source a cheap filter. The ACCC notes that [consumer guarantees are automatic](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees) when you buy from a business selling in Australia, and are separate from any manufacturer's warranty, which matters for a device with this many moving parts.
+
+**Fine dust.** In dusty inland areas or during bushfire smoke, expect to clean or replace filters more often than the manual suggests.
+
+**Multi-storey homes** need consideration. A robot maps per floor, and better models store multiple floor maps. If you plan to carry it upstairs, confirm multi-floor mapping is supported; otherwise it may have to re-map every time.
@@
-A mapping robot builds a detailed floor plan of your home. Camera-equipped models capture images from inside it. That data generally goes to the manufacturer's servers.
+A mapping robot builds a detailed floor plan of your home. Camera-equipped models capture images from inside it. Many models sync that data to the manufacturer's cloud.
@@
-This is not a reason to avoid the category, but it is worth a moment's thought. If it concerns you, look for models that keep processing local, or check whether the manufacturer offers a cloud-free mode. LiDAR-only models without cameras are also a middle ground — they map your layout but do not photograph your living room.
+This is not a reason to avoid the category, but it is worth a moment's thought. If it concerns you, read the manufacturer's privacy policy, look for models that keep processing local, or check whether the brand offers a cloud-free mode. LiDAR-only models without cameras are also a middle ground: they map your layout but do not photograph your living room.
@@
-**Tight budget:** get the cheapest model that has real mapping. Do not buy a random-bounce robot to save money — you will use it twice.
+**Tight budget:** get the cheapest model that has real mapping. Do not buy a random-bounce robot to save money — there is a good chance you will stop using it.
@@
-**Pets and hard floors:** add obstacle avoidance. It is the difference between a helpful appliance and a catastrophe you have to clean up.
+**Pets and hard floors:** add obstacle avoidance with pet-waste detection, and look at square or D-shaped designs for corners. It can be the difference between a helpful appliance and a mess you have to clean up.
@@
+Set expectations accordingly: a robot vacuum is a maintenance tool, not a replacement for a deep clean. In a pet home you will still want a stick vacuum for lounges, stairs and the car. What the robot buys you is a floor that never reaches the tumbleweed stage, and for many dog and cat owners that alone justifies the spend.
+
@@
+
```

## Full merged body

Robot vacuums are one of the few smart home categories where the expensive models are usually, noticeably better than the cheap ones. But the price differences do not map neatly onto the features manufacturers advertise most loudly.

Here is what actually determines whether you keep using one, including what changes when you share the house with a shedding dog or cat.

## Navigation is the whole ballgame

If you take one thing from this guide: **buy the best navigation you can afford, and treat everything else as secondary.**

There are broadly three tiers.

**Random bounce.** The cheapest robots move in semi-random patterns until the battery runs down. They eventually cover most of a simple room. They also tend to miss areas, cannot be told where to clean, and cannot return to where they left off. In anything more complex than a single open room, they are frustrating.

**Camera-based mapping.** A step up. The robot builds a map using a camera and visual landmarks, cleans in orderly rows and can find its way back to the dock. Camera-only navigation can struggle in low light, so check how a model copes before planning to run it at night in a dark house.

**LiDAR mapping.** A spinning laser rangefinder builds a map regardless of lighting. This is the big jump. LiDAR robots clean methodically, know where they have been, resume after recharging, and let you define no-go zones and clean specific rooms on command.

The practical difference is large. A well-mapped robot is a device you schedule and largely forget. A random-bounce robot is a device you supervise. Many people who give up on robot vacuums bought the second kind.

**Obstacle avoidance** is the newer differentiator on top of mapping. Better models add cameras or structured-light sensors to identify and steer around cables, socks, shoes and pet accidents, where bump-only robots simply drive into things. If you have a dog and hard floors, this is the feature to look at hardest (more on that under Homes with pets below).

## Suction: mostly marketing

Manufacturers advertise suction in pascals (Pa), and the headline numbers have climbed steadily for years.

Beyond a reasonable baseline, suction is rarely what limits real-world performance. Brush design, brush contact with the floor, airflow path and bin capacity matter more. A well-designed robot with modest suction can outperform a badly designed one with a bigger number.

Where suction genuinely matters is deep carpet. If your home is mostly carpet, give the suction figures more weight and look for automatic carpet boost. If it is mostly hard floors, you are quickly into diminishing returns.

## Brushes, and why they matter more than suction

**Rubber or silicone brushes** generally tangle far less than bristle brushes. If anyone in the house has long hair, or you have a shedding pet, this is the most important hardware detail after navigation. Bristle brushes wrap hair around the roller and tend to need regular work with scissors.

**Anti-tangle designs** — combs that strip or cut hair off the roller, tapered brushes, dual counter-rotating rollers — build on this and can cut maintenance noticeably.

**Side brushes** sweep debris from edges and corners into the robot's path. On hard floors they sometimes flick debris around instead; most robots let you reduce side-brush speed in the app.

**Shape matters for corners.** A round robot physically cannot reach into a square corner, which is exactly where dust and pet hair drift. D-shaped and square-fronted designs, and models with extending side brushes or mop pads, get closer along skirting boards.

## Self-emptying docks

A self-emptying dock sucks the contents of the robot's small onboard bin into a much larger bag or container in the base. Onboard bins really are small: Dreame lists [350mL for the L10s Ultra](https://global.dreametech.com/products/dreamebot-l10s-ultra) and Ecovacs lists [420mL for the Deebot X2 Omni](https://www.ecovacs.com/au/deebot-robotic-vacuum-cleaner/deebot-x2-omni-white). How long a dock bag lasts depends on your home; Dreame, for example, claims up to 60 days of hands-free cleaning from the L10s Ultra's 3L bag, but a household with shedding pets should expect to change bags more often than the headline figure.

**Worth it if:** you want to genuinely forget about the robot. Emptying a small bin after every run is a common reason people stop scheduling their vacuum. It also means you handle the dust far less often, which helps if anyone in the house has allergies.

**Consider before buying:**

- **Size.** These docks are large. Measure where it will live before ordering, including height if it is going under a bench.
- **Noise.** The emptying cycle is loud, briefly. If the dock is near a bedroom, schedule accordingly.
- **Consumables.** Bagged docks need replacement bags, an ongoing cost. Bagless docks avoid this but you handle the dust directly.

## Mopping

Mopping capability ranges from token to genuinely useful.

**Basic:** a water tank and a cloth dragged behind the robot. On sealed hard floors this picks up light dust. It does little for anything that is actually dirty, and the cloth needs washing after every run.

**Mid-range:** larger tanks, controllable water flow, and mop pads that lift or detach so the robot does not drag a wet cloth over your rugs. If your home mixes tile, timber and rugs, check how a model handles carpet while mopping before anything else.

**High end:** spinning or vibrating mop pads with downward pressure, automatic pad washing at the dock, and hot-water washing and hot-air drying so the pads do not sit damp between runs. Pads left wet in a warm, humid summer go musty quickly, so the drying step is worth more here than the spec sheet suggests.

::product:dreame-l10s-ultra-robot-vacuum-and-mop::

The Dreame L10s Ultra is a good example of the high-end approach, going by Dreame's specifications. Its [product page](https://global.dreametech.com/products/dreamebot-l10s-ultra) describes twin rotating mops that lift when the robot returns to the base, and a dock that empties the dustbin, washes the mops, dries them with hot air, refills water and doses cleaning solution. Dreame also says the brush design makes long hair easy to detangle. It navigates with an RGB camera and 3D structured light, which some households will not want roaming the home. We have not run this unit through our own floor tests, so treat this as a spec-sheet read rather than a verdict. It no longer appears in Dreame Australia's current line-up, and [Dreame's direct warranty](https://dreame.com.au/pages/warranty-policy) applies to purchases from dreame.com.au, so check the current listing and the seller's warranty terms before buying.

The honest position: even the best robot mop does not replace mopping a properly dirty floor. What it does well is maintain an already-clean floor so it needs proper mopping far less often. Judged on that basis it is worth having; judged as a replacement for a mop it will disappoint.

If most of your home is carpet, skip mopping entirely and put the money into navigation.

## Homes with pets

Pets are common in Australia: Animal Medicines Australia's 2025 national survey found [73% of households have at least one pet](https://animalmedicinesaustralia.org.au/news-and-media/australias-most-comprehensive-pet-survey-shows-nearly-three-quarters-of-australian-homes-now-have-a-pet/), with dogs in 49% and cats in 34%. Living with a shedding dog or cat changes what you need from a robot vacuum. Hair, tracked litter and dander build up faster than most people expect, and a budget unit that copes in a pet-free apartment can choke on a heavy-coated dog's winter moult.

For a pet household, prioritise in this order:

1. **A tangle-resistant brush.** A rubber roller with a comb or hair-cutting design is the best predictor of how often you will be on the floor with scissors. Long-haired pets will still need you to clear the brush and wheels occasionally, whatever you spend.
2. **A self-emptying base.** With a small onboard bin and one or two shedding animals, you could be emptying it after every run. A dock bag stretches that out considerably and keeps the dust out of your face.
3. **Reliable obstacle avoidance.** The polite phrase is "pet waste avoidance". A robot that drives through an accident on a hard floor makes a very bad day. Look for camera or structured-light avoidance rather than bump sensors alone.

**Filtration** is worth checking if pet dander affects anyone's allergies or asthma. Asthma Australia's guidance on [HEPA filter vacuums](https://asthma.org.au/blog/can-a-hepa-filter-vacuum-help-with-allergies-and-asthma/) explains that "HEPA-style" or "high efficiency" labels are usually a step below a true HEPA filter, and that emptying and filter replacement matter too. Check the filter specification on the model you are considering, and take medical questions to your GP.

**Corners collect hair.** This is where body shape pays off in a pet home.

::product:ecovacs-deebot-x2-omni-square-robot-vacuum::

The Ecovacs Deebot X2 Omni is built around that problem. According to [Ecovacs Australia](https://www.ecovacs.com/au/deebot-robotic-vacuum-cleaner/deebot-x2-omni-white), its square body and edge sensor are designed for edge-to-edge cleaning, its AIVI 3D obstacle avoidance includes a pet mode that detects and avoids pets, food bowls and waste, and its OMNI station empties the bin into a bag, washes the mops in hot water and dries them with hot air. It sits at the premium end and suits larger homes with a lot of hard floor. As with the Dreame, this is based on the manufacturer's specifications, not our own testing. Ecovacs' Australian store showed it as sold out when we checked, so check current listings and pricing at your preferred retailer.

## Australian considerations

**Match the robot to your floors.** If your home is mostly tile, timber or vinyl, good brush design and mopping matter more than deep-carpet suction.

**Power.** Robot vacuum docks plug into an ordinary power point, so no electrician is needed to set one up. Installing a new power point for the dock, say in a cupboard or laundry nook, is a different matter: that is fixed electrical wiring. Energy Safe Victoria, for example, says [doing unqualified electrical work is illegal](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) and to always hire a licensed electrician. Rules are set by each state and territory, so check with your local electrical safety regulator.

**Where to buy.** JB Hi-Fi, The Good Guys, Harvey Norman and Amazon AU all range robot vacuums, and prices move around during sales periods, so compare current listings rather than relying on a quoted price.

**Grey imports and warranties.** Cheaper overseas-sourced (parallel import) listings, including on eBay AU, can undercut local pricing. The ACCC says you still have [consumer guarantee rights against the seller of a parallel import](https://www.accc.gov.au/consumers/buying-products-and-services/buying-parallel-imports), but that a manufacturer's warranty may not apply in Australia. Check the warranty terms before you buy.

**Check local support before buying an unfamiliar brand.** Robot vacuums are mechanical devices with consumable parts — brushes, filters, mop pads, dust bags, sometimes batteries. A brand with no Australian distribution can leave you unable to source a cheap filter. The ACCC notes that [consumer guarantees are automatic](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees) when you buy from a business selling in Australia, and are separate from any manufacturer's warranty, which matters for a device with this many moving parts.

**Fine dust.** In dusty inland areas or during bushfire smoke, expect to clean or replace filters more often than the manual suggests.

**Multi-storey homes** need consideration. A robot maps per floor, and better models store multiple floor maps. If you plan to carry it upstairs, confirm multi-floor mapping is supported; otherwise it may have to re-map every time.

## Privacy, briefly

A mapping robot builds a detailed floor plan of your home. Camera-equipped models capture images from inside it. Many models sync that data to the manufacturer's cloud.

This is not a reason to avoid the category, but it is worth a moment's thought. If it concerns you, read the manufacturer's privacy policy, look for models that keep processing local, or check whether the brand offers a cloud-free mode. LiDAR-only models without cameras are also a middle ground: they map your layout but do not photograph your living room.

## What to buy

**Tight budget:** get the cheapest model that has real mapping. Do not buy a random-bounce robot to save money — there is a good chance you will stop using it.

**Most households:** LiDAR navigation, rubber anti-tangle brushes, self-emptying dock. Skip advanced mopping unless you have a lot of hard floor. This combination is where the value sits.

**Pets and hard floors:** add obstacle avoidance with pet-waste detection, and look at square or D-shaped designs for corners. It can be the difference between a helpful appliance and a mess you have to clean up.

**Large or multi-storey homes:** confirm multi-floor mapping and check the battery runtime against your floor area.

Set expectations accordingly: a robot vacuum is a maintenance tool, not a replacement for a deep clean. In a pet home you will still want a stick vacuum for lounges, stairs and the car. What the robot buys you is a floor that never reaches the tumbleweed stage, and for many dog and cat owners that alone justifies the spend.

Prioritise navigation, brushes and the dock. Ignore the pascal figures.
