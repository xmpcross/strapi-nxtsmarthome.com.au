# Task 6 review: batch 5 (4 articles)

Proposed fixes for every `[VERIFY]` tag in these four published articles. **Nothing has been written to Strapi.** Reply **approve** to publish all four, or name the articles or rows to change.

Decisions: **a** = verified, rewritten with the fact and an inline source link; **b** = varies, rewritten as a range or as guidance; **c** = unverifiable or legal, the claim removed and readers pointed to the authority.

Backups of each full Strapi record (draft and published) are in `exports/strapi-backup/<slug>-2026-09-24T07-58-52-203Z.json`.

## Reviewer edits beyond the tags (approve or drop them separately)

1. **Robot vacuum local control, Ecovacs (body and FAQ 2).** "Some brands simply don't have a local path. Ecovacs is the clearest example" was overstated. [Home Assistant's Ecovacs page](https://www.home-assistant.io/integrations/ecovacs/) says you can choose a self-hosted instance instead of the cloud servers during setup (based on Bumper), with its own requirements and limitations. Both places now say that, keeping cloud as the default.
2. **Robot vacuum local control, excerpt.** The dated "in 2024-25" was removed.
3. **Rental smart lighting, absolute tenancy claims.** "No tools, no landlord conversation, no risk" now reads "in most rentals no landlord conversation needed (heritage-listed homes can be an exception)". Consumer Affairs Victoria lists that exception. "Screw-in globes and plug-in devices are almost universally fine" (body and FAQ 5) now reads "…that don't touch the fixed wiring are generally the lowest-risk changes".

## Errors in the originals that the researchers corrected

- **Robot vacuum local control:** "no room selection, no zone cleaning" over Matter was wrong. Room and zone cleaning (service areas) arrived in Matter 1.4, and Home Assistant added initial support in 2026.3.
- **Rental smart lighting:** AS/NZS 3000 is the Wiring Rules, not the law that requires a licence, so that wording was removed from the body and FAQ 1. Readers are pointed to their state's electrical safety regulator.
- **Second-hand devices:** private sales. The ACCC says *most* consumer guarantees don't apply, but title, undisturbed possession and no hidden debts still do. The article said none applied. It also said "every state and territory" for the licensing rule; that is now a pointer to the reader's regulator.
- **What not to plug into a smart plug:** figures now come from the Tapo P110M AU spec (10A, 2300W, 1/10 HP motor) and two Kmart AU heater manuals. The "licensed in every state" claims now cite Energy Safe Victoria and a check with your own regulator.

## Not part of Task 6, but you should know

- **second-hand-smart-home-devices-australia has no `::product:` boxes.** This breaks CLAUDE.md rule 8, and cleaning the tags brings it back onto the live site still breaking it. I did not add any, because choosing the products is an editorial call. Say so and I will propose two catalogue products the article genuinely discusses, as a separate change.
- The second-hand article doesn't tell readers to check for recalls, which the ACCC advises. That's a possible addition, not made.

## Flagged by the researchers but NOT changed (your call)

- **Smart plug:** relays failing "stuck closed" (body and FAQ); motor start-up surge claims; the clothes dryer advice. No official page confirming 10A standard power points loaded, so that clause rests on AU plug specs.
- **Second-hand:** third-party power supplies as a "common cause of failure"; "under a minute" to remove a device; 2.4 GHz as the "most common reason"; sensors "fail rarely"; the E26 bulb claim (Australia uses E27/B22); the "three months to three weeks" battery example.
- **Rental lighting:** the 10A plug and heater advice; the "half-hour" reset; "lighting is a small slice" of the bill; the bond wording in the title.
- **Robot vacuum:** the L10s Ultra Gen2 is a different robot (Valetudo warns about it); "open the case on Dreame units" may mislead for the featured L10s Ultra; "number one cause" statements; "240 V".

On publish, `dateModified` is set to 24 Sep 2026 and `publishDate` to each post's original `publishedAt`.

---

## what-not-to-plug-into-a-smart-plug-australia

[VERIFY] tags: 7 → 0. Words: 1079 → 1264.

### Decisions and sources

| # | Original text (with tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "Australian general power outlets are rated to 10 amps, and Australian smart plugs are typically rated to match. [VERIFY]" | a | "Standard Australian power points are 10 amp outlets, and smart plugs sold here are generally rated to match — Tapo P110M AU spec lists a maximum load of 10A and 2300W." | https://www.tapo.com/au/product/smart-plug/tapo-p110m/ (AU spec: 220-240V, "10A, 2300W, 1/10HP Motor"); supporting: Meross MSS210 manual "up to 10A ... for the version AU" https://www.manualslib.com/manual/3757173/Meross-Mss210.html |
| 2 | Body: "Many heater manufacturers explicitly say not to run their product through a timer, a remote switch or an extension lead ... [VERIFY]" | a | Heater manuals commonly warn against it; Kmart AU 2000W fan heater and 2400W oil column heater manuals say not to use with a programmer, timer or device that switches it on automatically (fire risk); steer away from adaptors/power boards; check your manual. | https://www.kmart.com.au/wcsstore/Kmart/pdfs/43506712_Manual.pdf ; https://www.kmart.com.au/wcsstore/Kmart/pdfs/43230013_Manual.pdf |
| 3 | Body: "...fixed wiring — which is licensed electrician territory in every Australian state and territory. [VERIFY]" | c | "...a job for a licensed electrician. Regulators such as Energy Safe Victoria are clear that electrical work is not a DIY job; check your own state or territory's electrical safety regulator." (removed the all-jurisdictions legal claim) | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| 4 | Body: "Check the rating printed on the body against the appliance before you commit to it, whichever you buy. [VERIFY]" | b | Plugs here are generally 10A but max wattage and motor ratings differ by model (Tapo P110M AU: 1/10 HP motor, 2300W); check the plug's rating against the appliance's rating plate. | https://www.tapo.com/au/product/smart-plug/tapo-p110m/ |
| 5 | Body: "...fitting one is licensed electrical work in every Australian state and territory. [VERIFY]" | c | "...fitting one means working on fixed wiring, which is a job for a licensed electrician — Energy Safe Victoria warns even changing power points or switches is not DIY. Check your state or territory regulator." | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| 6 | FAQ 1449: "Many heater manufacturers specifically say not to use timers or remote switching. Check the appliance manual before you do it. [VERIFY]" | a | "Heater manuals sold in Australia commonly say not to use the heater with a programmer, timer or any other device that switches it on automatically, because of the fire risk if it is covered or positioned incorrectly. Check the manual..." (plain text, no link) | https://www.kmart.com.au/wcsstore/Kmart/pdfs/43506712_Manual.pdf ; https://www.kmart.com.au/wcsstore/Kmart/pdfs/43230013_Manual.pdf |
| 7 | FAQ 1453: "Standard Australian general power outlets are rated to 10 amps at 230 volts, and Australian smart plugs are typically rated to match. [VERIFY]" | a | "Standard Australian power points are 10 amp outlets on a nominal 230 volt supply, and smart plugs sold here are generally rated to 10 amps, though the maximum wattage differs between models." | https://cabinet.qld.gov.au/documents/2017/Sep/Voltage/Attachments/DecisionRIS.PDF (AS 60038 nominal 230 V, +10%/-6%); https://www.tapo.com/au/product/smart-plug/tapo-p110m/ |

Note on #1/#7: the "standard power points are 10 A" clause is the AS/NZS 3112 general-purpose outlet rating; the opened sources confirm it via AU plug specs (Tapo, Meross) rather than an official full-text page (regulator pages returned 403 or unreadable PDFs). Low risk, but an editor may wish to add an official citation.

Placeholders (TODO/TBD/lorem/template text): none found.

#### Consistency edits (untagged)

- None required. Excerpt and keyTakeaways make no claim affected by the corrections and contain no "legally required"-style statements; they are copied unchanged. The other FAQ answers (1450, 1451, 1452) are unchanged and remain consistent with the body.
- (The only FAQ changes are the two tagged answers, 1449 and 1453, listed above.)

#### Needs human legal review

- Body, motors section: "...in most cases it is fixed wiring — which is a job for a licensed electrician. Regulators such as Energy Safe Victoria are clear that electrical work is not a DIY job..." (electrical licensing; rules differ by state/territory).
- Body, products section: "...fitting one means working on fixed wiring, which is a job for a licensed electrician..." (electrical licensing, in-wall relay installation).
- Body, heaters paragraph citing Kmart manual warnings (electrical/fire safety; paraphrase of manufacturer warnings).
- Body, "The failure here is not subtle ... heat at a connection point is how electrical fires start." (fire safety claim, unsourced).
- Body, "Medical equipment. CPAP machines, oxygen concentrators ... Do not put a remotely switchable device in that path." (medical devices).
- Body, "Lamps and floor lighting, especially in rented homes where wiring is not an option" (tenancy).
- Body, "The arrangement to avoid entirely" section on power boards/extension leads and daisy-chaining (electrical safety; consistent with WA Government "Do not overload power boards by 'piggy backing'" https://www.wa.gov.au/government/multi-step-guides/electrical-safety-home/electrical-appliances).
- FAQ 1449 (heaters) and FAQ 1450 (power boards) answers (electrical safety).

#### Flagged untagged sentences (not changed)

- "And a relay switching a motor thousands of times may eventually fail, sometimes stuck closed, which means the plug reports 'off' while the appliance runs." (and FAQ 1452 "some relays fail closed over time") — plausible (relay contact welding) but unsourced safety claim; consider a manufacturer or standards source or softer wording.
- "High-output models draw current close to the rating of a standard plug" — consistent with the 2400W Kmart oil heater (about 10 A at 230 V), not changed.
- "Portable air conditioners ... a compressor that surges on start-up" / "Motors draw a surge when they start — well above their steady running draw" — general engineering claim, unsourced; Tapo's separate 1/10 HP motor rating supports the principle.
- "Clothes dryers ... not a smart plug load" — dryers are generally 10 A plug-in appliances in AU; reasonable but unsourced.

### Body diff

```diff
--- before
+++ after
@@
-A smart plug carries the full load of whatever is plugged into it. Australian general power outlets are rated to 10 amps, and Australian smart plugs are typically rated to match. [VERIFY] That figure is printed on the plug body and stated in its specifications, and it is a limit, not a target.
+A smart plug carries the full load of whatever is plugged into it. Standard Australian power points are 10 amp outlets, and smart plugs sold here are generally rated to match — the Australian specifications for TP-Link's Tapo P110M, for example, list a [maximum load of 10A and 2300W](https://www.tapo.com/au/product/smart-plug/tapo-p110m/). That figure is printed on the plug body and stated in its specifications, and it is a limit, not a target.
@@
-**Portable heaters.** Fan heaters, oil column heaters, radiant heaters. High-output models draw current close to the rating of a standard plug, and they do it continuously rather than in bursts. Many heater manufacturers explicitly say not to run their product through a timer, a remote switch or an extension lead — check the manual for the specific appliance, because this varies by model. [VERIFY]
+**Portable heaters.** Fan heaters, oil column heaters, radiant heaters. High-output models draw current close to the rating of a standard plug, and they do it continuously rather than in bursts. Heater manuals commonly warn against exactly this. The Australian manuals for Kmart's [2000W fan heater](https://www.kmart.com.au/wcsstore/Kmart/pdfs/43506712_Manual.pdf) and [2400W oil column heater](https://www.kmart.com.au/wcsstore/Kmart/pdfs/43230013_Manual.pdf) both say not to use the heater with a programmer, timer or any other device that switches it on automatically, because of the fire risk if it is covered or positioned incorrectly, and both steer you away from running it through anything other than the wall socket (one rules out external adaptors and extension leads; the other says power boards are not rated for high-wattage appliances). Check the manual for the specific appliance, because the wording varies by model.
@@
-If you want to switch a large motor load on a schedule, that is a job for properly rated equipment, and in most cases it is fixed wiring — which is licensed electrician territory in every Australian state and territory. [VERIFY]
+If you want to switch a large motor load on a schedule, that is a job for properly rated equipment, and in most cases it is fixed wiring — which is a job for a licensed electrician. Regulators such as [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) are clear that electrical work is not a DIY job; check your own state or territory's electrical safety regulator for the rules where you live.
@@
-For those jobs, a compact plug sold for the Australian market is all that is needed. Check the rating printed on the body against the appliance before you commit to it, whichever you buy. [VERIFY]
+For those jobs, a compact plug sold for the Australian market is all that is needed. Plugs sold here are generally rated to 10A, but the maximum wattage and any separate motor rating differ between models — the Tapo P110M's Australian specifications, for instance, list a [motor limit of 1/10 HP](https://www.tapo.com/au/product/smart-plug/tapo-p110m/) alongside its 2300W maximum. Check the rating printed on the body against the appliance's rating plate before you commit to it, whichever you buy.
@@
-For anything larger or permanently installed, the honest answer is that it is not a plug-in job at all. In-wall relays exist for exactly that, and fitting one is licensed electrical work in every Australian state and territory. [VERIFY]
+For anything larger or permanently installed, the honest answer is that it is not a plug-in job at all. In-wall relays exist for exactly that, and fitting one means working on fixed wiring, which is a job for a licensed electrician — [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) warns that even small jobs such as changing power points or light switches are not DIY. Check your state or territory's electrical safety regulator for the rules where you live.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 1 answer
  - before: It is the appliance most often warned against, for two reasons. High-output heaters draw current close to the limit of a standard 10 amp plug, and a heater that switches on remotely can come on in an empty room with something resting against it. Many heater manufacturers specifically say not to use timers or remote switching. Check the appliance manual before you do it. [VERIFY]
  - after: It is the appliance most often warned against, for two reasons. High-output heaters draw current close to the limit of a standard 10 amp plug, and a heater that switches on remotely can come on in an empty room with something resting against it. Heater manuals sold in Australia commonly say not to use the heater with a programmer, timer or any other device that switches it on automatically, because of the fire risk if it is covered or positioned incorrectly. Check the manual for your specific appliance before you do it.
- FAQ 5 answer
  - before: The principle is the same everywhere, but the numbers are ours. Standard Australian general power outlets are rated to 10 amps at 230 volts, and Australian smart plugs are typically rated to match. Advice written for 120 volt markets does not translate directly. [VERIFY]
  - after: The principle is the same everywhere, but the numbers are ours. Standard Australian power points are 10 amp outlets on a nominal 230 volt supply, and smart plugs sold here are generally rated to 10 amps, though the maximum wattage differs between models. Advice written for 120 volt markets does not translate directly.

---

## second-hand-smart-home-devices-australia

[VERIFY] tags: 7 → 0. Words: 1361 → 1521.

### Decisions and sources

7 [VERIFY] tags: 5 in the body, 2 in the FAQ. There were none in the excerpt or keyTakeaways. No placeholder text (TODO, TBD, lorem or template instructions) was found. No ::product: markers exist in the original, and none were added.

| # | Original text (short, with tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "Mains-powered electrical equipment sold in Australia is expected to carry the Regulatory Compliance Mark. [VERIFY]" | a (verified, scoped) | "in-scope electrical equipment must not be sold unless it is marked with the RCM"; how scope and second-hand sales work is referred to the state electrical safety regulator | https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ |
| 2 | Body: "Fixed wiring is licensed work in every state and territory. [VERIFY]" | a + c (verified for Vic; the "every state" claim removed) | Energy Safe Victoria says DIY electrical work is illegal, even for power points or light switches; "other states have their own licensing rules — check with your state's electrical safety regulator" | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| 3 | Body: "What counts as acceptable quality is assessed against the age, price and description of the item... [VERIFY]" | a | Consumer guarantees apply automatically when businesses sell goods, including second-hand dealers; acceptable quality takes into account the product's age and cost ("description" dropped because the source does not list it) | https://www.consumer.vic.gov.au/licensing-and-registration/second-hand-dealers-and-pawnbrokers/running-your-business/guarantees-and-product-safety ; https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees |
| 4 | Body: "Buying privately ... generally does not carry those guarantees. [VERIFY] ... very little recourse." | a | "most consumer guarantees don't apply to one-off sales between two people where the seller isn't running a business"; title, undisturbed possession and no hidden debts still apply; "very little recourse" softened to "likely to have far less recourse" | https://www.productsafety.gov.au/consumers/know-your-product-safety-rights/buy-safe-second-hand-products-online (also https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees) |
| 5 | Body: "Smoke alarms ... subject to specific requirements in Australian homes, including in rental properties. [VERIFY]" | a + b (NSW example; rules vary by state) | Rules are set state by state; in NSW, landlords must replace alarms within 10 years of manufacture, or earlier if the manufacturer specifies; readers are referred to their state fire service or tenancy authority | https://www.nsw.gov.au/housing-and-construction/rules/smoke-alarms-a-rental-property |
| 6 | FAQ 1507: "Private sales between individuals ... are generally not covered. [VERIFY]" | a (plain text, no link) | The ACCC says most consumer guarantees do not apply to private sales, but title, undisturbed possession and no hidden debts still do. "Check the ACCC or your state consumer affairs agency before relying on this." | https://www.productsafety.gov.au/consumers/know-your-product-safety-rights/buy-safe-second-hand-products-online ; https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees |
| 7 | FAQ 1508: "Second-hand devices bought privately or imported may never have carried one. [VERIFY]" | b (guidance, no unverified generalisation) | In-scope equipment is not meant to be sold here without an RCM, so a missing mark can be a sign the device was never supplied for the Australian market; the state electrical safety regulator can confirm how the rules apply to a particular item | https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ |

Sources opened: 6 distinct URLs (EESS, Energy Safe Victoria, Consumer Affairs Victoria, the ACCC consumer rights page, the ACCC Product Safety second-hand page and the NSW Government smoke alarms page).

#### Consistency edits (untagged)

1. **keyTakeaways**: "consumer guarantees generally follow the business sale and generally do not follow the private one" became "consumer guarantees generally follow the business sale, while most of them do not apply to a private one". This matches correction #4, since some guarantees still apply to private sales.
2. **FAQ 1507**: "Confirm the current position with the ACCC before relying on it" became "Check the ACCC or your state consumer affairs agency before relying on this". This matches the body's referral wording. (The rest of the private-sale sentence is covered by decision #6.)
3. **Excerpt**: no change needed. "your rights" does not state law as settled, and the excerpt contains no "legally required" wording.

#### Needs human legal review

- Body, "Buying from a business" paragraph: consumer guarantees on second-hand and refurbished goods, and acceptable quality judged against age and price (Australian Consumer Law).
- Body, "Buying privately" paragraph: most guarantees do not apply to private sales, and three guarantees still apply (Australian Consumer Law).
- Body, the unchanged "Confirm the current position with the ACCC..." paragraph (consumer law referral).
- Body, the compliance mark bullet: the RCM sale requirement for in-scope equipment (electrical safety).
- Body, "Anything electrical that will be wired..." paragraph: DIY electrical work is illegal in Victoria, and other states have their own licensing rules (electrical safety / licensing).
- Body, the "Plug and voltage" bullet: "a travel adaptor does not make it compliant" (electrical safety, untagged).
- Body, the "Smoke alarms" paragraph: the NSW 10-year replacement rule for landlords and variation between states (tenancy / fire safety law).
- keyTakeaways: business versus private sale guarantees (consumer law).
- FAQ 1507: the whole answer (consumer law).
- FAQ 1508: the RCM meaning and the sale requirement (electrical safety).
- The article never mentions checking recalls. The ACCC Product Safety page tells second-hand buyers to "check if the product has been recalled or banned". Consider adding this to the checklist (not added here, because that is out of scope for tag handling).

#### Flagged untagged sentences (not changed)

- "Original power supply included — third-party replacements are a common cause of failure": an unsourced causal claim about electrical safety. Soften it or source it.
- "In most apps this is a 'remove device'... option, and it takes under a minute": unsourced precision. The step varies by brand.
- "Most smart home devices connect only on 2.4 GHz... the most common reason a working used device appears dead on arrival": the "most common reason" claim is unsourced.
- "Sensors and bulbs... fail rarely... a factory reset genuinely returns them to new": an unsourced reliability claim. A reset does not always clear cloud or account binding, which the article itself notes for other device types.
- "Plenty of imported smart bulbs are E26": plausible but unsourced. Low risk.
- FAQ 1508, first sentence: "indicates electrical equipment meets Australian electrical safety and electromagnetic requirements". EESS describes the RCM as a supplier's mark of compliance with EESS and ACMA labelling requirements. "Meets" slightly overstates it (the mark is a claim of compliance). Consider "indicates the supplier declares compliance with...".
- "a device that once lasted three months may now last three weeks": presented as an illustrative example, not a statistic, but it has no source.

### Body diff

```diff
--- before
+++ after
@@
-- **The compliance mark.** Mains-powered electrical equipment sold in Australia is expected to carry the Regulatory Compliance Mark. [VERIFY] Its absence on a mains-powered device is a genuine reason to decline, not a formality.
+- **The compliance mark.** Under the national Electrical Equipment Safety System, [in-scope electrical equipment must not be sold unless it is marked with the Regulatory Compliance Mark](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/) (RCM). Which items are in scope, and how the rules apply to a second-hand sale, is a question for your state's electrical safety regulator — but the absence of an RCM on a mains-powered device is a genuine reason to decline, not a formality.
@@
-Anything electrical that will be wired into the house rather than plugged in is a separate matter. Fixed wiring is licensed work in every state and territory. [VERIFY] A second-hand smart switch is fine to own; installing it yourself is not a decision to make on the basis of a buying guide.
+Anything electrical that will be wired into the house rather than plugged in is a separate matter. Electrical safety regulators are blunt about this: Energy Safe Victoria says [DIY electrical work is illegal, even for small jobs such as changing power points or light switches](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself), and other states have their own licensing rules — check with your state's electrical safety regulator. A second-hand smart switch is fine to own; installing it yourself is not a decision to make on the basis of a buying guide.
@@
-**Buying from a business** — a retailer's refurbished stock, a registered eBay business seller, a manufacturer's own renewed programme — generally brings consumer guarantees with it, including on used and refurbished goods. What counts as acceptable quality is assessed against the age, price and description of the item, so a five-year-old hub is not held to the standard of a new one. [VERIFY]
+**Buying from a business** — a retailer's refurbished stock, a registered eBay business seller, a manufacturer's own renewed programme — generally brings consumer guarantees with it, including on used and refurbished goods; Consumer Affairs Victoria notes that [consumer guarantees apply automatically when businesses sell goods to consumers](https://www.consumer.vic.gov.au/licensing-and-registration/second-hand-dealers-and-pawnbrokers/running-your-business/guarantees-and-product-safety), including second-hand dealers. What counts as acceptable quality takes into account things like [how old the product is and how much it cost](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees), so a five-year-old hub is not held to the standard of a new one.
@@
-**Buying privately** — most Gumtree and Facebook Marketplace listings, and individual sellers on eBay — generally does not carry those guarantees. [VERIFY] If it stops working the following week, you have very little recourse.
+**Buying privately** — most Gumtree and Facebook Marketplace listings, and individual sellers on eBay — is different. According to the ACCC, [most consumer guarantees don't apply to one-off sales between two people where the seller isn't running a business](https://www.productsafety.gov.au/consumers/know-your-product-safety-rights/buy-safe-second-hand-products-online); only the guarantees about clear title, undisturbed possession and no hidden debts or charges still apply. If it stops working the following week, you are likely to have far less recourse.
@@
-**Smoke alarms.** These have a limited service life and are subject to specific requirements in Australian homes, including in rental properties. [VERIFY] A used one with an unknown history is a bad trade at any price.
+**Smoke alarms.** These have a limited service life, and the rules for homes and rentals are set state by state. In NSW, for example, landlords must [replace smoke alarms within 10 years of manufacture, or earlier if the manufacturer specifies](https://www.nsw.gov.au/housing-and-construction/rules/smoke-alarms-a-rental-property) — check your state's fire service or tenancy authority for the rules where you live. A used one with an unknown history is a bad trade at any price.
```

### Excerpt / key takeaways / FAQ changes

- keyTakeaways
  - before: Hubs, bulbs, plugs and sensors are usually safe buys second-hand. Cameras, doorbells, locks and robot vacuums are not, because they stay tied to the previous owner's account unless that person removes them before you pay. Buy from a business rather than a private seller wherever the device matters, because consumer guarantees generally follow the business sale and generally do not follow the private one.
  - after: Hubs, bulbs, plugs and sensors are usually safe buys second-hand. Cameras, doorbells, locks and robot vacuums are not, because they stay tied to the previous owner's account unless that person removes them before you pay. Buy from a business rather than a private seller wherever the device matters, because consumer guarantees generally follow the business sale, while most of them do not apply to a private one.
- FAQ 2 answer
  - before: Consumer guarantees generally apply when you buy from a business, including when the goods are used or refurbished, though what counts as acceptable quality is judged against the age and price of the item. Private sales between individuals — most Gumtree and Facebook Marketplace listings — are generally not covered. [VERIFY] Confirm the current position with the ACCC before relying on it.
  - after: Consumer guarantees generally apply when you buy from a business, including when the goods are used or refurbished, though what counts as acceptable quality is judged against the age and price of the item. For private sales between individuals — most Gumtree and Facebook Marketplace listings — the ACCC says most consumer guarantees do not apply, although guarantees about clear title, undisturbed possession and no hidden debts still do. Check the ACCC or your state consumer affairs agency before relying on this.
- FAQ 3 answer
  - before: The Regulatory Compliance Mark indicates electrical equipment meets Australian electrical safety and electromagnetic requirements. Second-hand devices bought privately or imported may never have carried one. [VERIFY] Treat an unmarked mains-powered device as a reason to walk away rather than a detail to overlook.
  - after: The Regulatory Compliance Mark indicates electrical equipment meets Australian electrical safety and electromagnetic requirements. In-scope electrical equipment is not meant to be sold in Australia without it, so a missing mark on a used device can be a sign it was never supplied for the Australian market. Your state's electrical safety regulator can confirm how the rules apply to a particular item. Treat an unmarked mains-powered device as a reason to walk away rather than a detail to overlook.

---

## smart-lighting-rental-australia-no-wiring

[VERIFY] tags: 7 → 0. Words: 1236 → 1403.

### Decisions and sources

| # | Original text (incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "…is work for a licensed electrician under AS/NZS 3000 wiring rules, and DIY mains work is illegal for unlicensed people in every state and territory [VERIFY]" | a (verified for NSW + VIC; national blanket claim softened) | Licensed-electrician work; NSW Govt calls DIY electrical work "dangerous and illegal" (globe changing is the exception); ESV names light switches; detail is in each state's laws — check your regulator. AS/NZS 3000 attribution removed (it is the wiring standard, not the licensing law). | https://www.nsw.gov.au/topics/electrical-safety/in-the-home ; https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| 2 | Body: "Budget roughly $15–$35 AUD for a decent colour smart globe and $10–$20 for a warm-white-only one… [VERIFY]" | b | Prices vary widely: Arlec Grid Connect colour B22 $14 at Bunnings when checked; single Philips Hue colour B22 costs several times that; compare current prices. | https://www.bunnings.com.au/arlec-grid-connect-smart-b22-led-830lm-rgb-cct-colour-mode-10w-globe_p0321372 ; https://www.philips-hue.com/en-au/p/hue-white-and-color-ambiance-a60-b22-smart-bulb-1100/8720169391758 (listed $104.95, sale banner shown) |
| 3 | Body: "Around $25–$50 AUD each [VERIFY]" (wireless buttons) | b | Prices vary by brand/ecosystem; Hue Dimmer Switch given as example (battery, adhesive or screws); check current prices. No figure given (Hue AU page showed $44.95 during a sale, so not a stable price). | https://www.philips-hue.com/en-au/p/hue-dimmer-switch--latest-model-/8719514274631 |
| 4 | Body: "Tenancy law differs by state and territory and is not settled on smart-home fittings [VERIFY]" | c | Rules differ by state: VIC lists LED bulbs not needing new fittings as no-consent changes (heritage exceptions); NSW needs lease allowance or written permission, minor changes not unreasonably refused; check your state's tenancy authority and lease. | https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property ; https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property |
| 5 | FAQ 1: "…licensed electrician work under AS/NZS 3000, and unlicensed DIY mains work is illegal across Australia [VERIFY]" | a (same as #1) | Licensed-electrician work; NSW Govt: DIY electrical work dangerous and illegal; ESV same warning; check your state regulator. | same as #1 |
| 6 | FAQ 2: "…costs roughly $25–$50 AUD each [VERIFY]" | b | "Prices vary by brand and ecosystem, so check current retailer prices." | same as #3 |
| 7 | FAQ 5: "…tenancy law varies by state and territory and isn't settled on smart-home fittings [VERIFY]" | c | "the rules differ by state and territory, so check your state's tenancy authority and your lease before any change." | same as #4 |

Excerpt and keyTakeaways contained no [VERIFY] tags. No placeholder text (TODO/TBD/lorem/template instructions) found in body or metadata.

#### Consistency edits (untagged)

- None required. The excerpt and keyTakeaways make no electrical-law, price or tenancy-law claims affected by the corrections; all three affected FAQ answers carried their own tags (rows 5–7). The AS/NZS 3000 attribution was removed in both body and FAQ 1 as part of the tagged rewrites.

#### Needs human legal review

- Body: "Screwing in a globe is not electrical work. Rewiring a fitting is." (electrical)
- Body: "These are *not* replaceable by you… Changing them is electrical work." (integrated downlights; electrical)
- Body: rewritten licensed-electrician paragraph (row #1) — confirm the NSW/VIC framing is acceptable for readers in other states.
- Body: "No tools, no landlord conversation, no risk." (globe swap; tenancy — VIC excludes heritage-listed homes from no-consent LED globes)
- Body: "Never remove or reposition a hardwired fixture… that's a repair request to the agent" (electrical/tenancy)
- Body: rewritten tenancy paragraph (row #4) and "Screw-in globes and plug-in devices are almost universally fine." (tenancy)
- Body: "Timestamped photos of the original state are the cheapest bond insurance going." (tenancy/bond)
- Body: smart plug paragraph — Type I / 240V / 10A rating, "don't run a heater or a dryer through one" (electrical safety / consumer)
- FAQ 1 (electrical), FAQ 3 (plug load rating), FAQ 5 (tenancy, incl. "almost universally fine").
- Title: "…Without … Losing Your Bond" (implied bond outcome).

#### Flagged untagged sentences (not changed)

- "Screw-in globes and plug-in devices are almost universally fine." (body + FAQ 5) — unsourced tenancy generalisation; VIC's no-consent LED globe permission excludes heritage-listed homes and requires no new fittings. Suggest softening.
- "No tools, no landlord conversation, no risk." — same issue; "no landlord conversation" is not universal.
- "a plug rated for a 10A general outlet is fine for lamps, but don't run a heater or a dryer through one" (body + FAQ 3) — safety guidance with no source; check against the specific plug's manual (e.g. Tapo P100 rating) before relying on it.
- "your move-out reset is a half-hour job" / keyTakeaways "takes about half an hour" — unsourced time estimate presented as fact; low risk but not verified.
- "Lighting is a small slice of an Australian power bill" — unsourced energy claim.

### Body diff

```diff
--- before
+++ after
@@
-The single highest-impact change in a rental is swapping the globe. No tools, no landlord conversation, no risk.
+The single highest-impact change in a rental is swapping the globe. No tools, and in most rentals no landlord conversation needed (heritage-listed homes can be an exception — see below).
@@
-That last point matters. In Australia, altering fixed wiring — including swapping a hardwired downlight or replacing a wall switch — is work for a licensed electrician under AS/NZS 3000 wiring rules, and DIY mains work is illegal for unlicensed people in every state and territory [VERIFY]. Screwing in a globe is not electrical work. Rewiring a fitting is.
+That last point matters. In Australia, altering fixed wiring — including swapping a hardwired downlight or replacing a wall switch — is work for a licensed electrician. The [NSW Government](https://www.nsw.gov.au/topics/electrical-safety/in-the-home) describes DIY electrical work as "dangerous and illegal" and names changing a light globe as the only electrical maintenance non-electricians can do, while [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) specifically lists changing light switches as a job that isn't DIY. The detail sits in each state and territory's electrical safety laws, so check with your local electrical safety regulator if you're unsure. Screwing in a globe is not electrical work. Rewiring a fitting is.
@@
-Budget roughly $15–$35 AUD for a decent colour smart globe and $10–$20 for a warm-white-only one at Bunnings, Officeworks, JB Hi-Fi or Amazon AU [VERIFY]. Buy one, live with it for a week, then scale up. Colour is fun for about a fortnight; **tunable white** — cool and energising in the morning, warm at night — is the feature you'll still be using in a year.
+Smart globe prices vary widely by brand and features: when we checked, Bunnings listed an [Arlec Grid Connect colour B22 globe](https://www.bunnings.com.au/arlec-grid-connect-smart-b22-led-830lm-rgb-cct-colour-mode-10w-globe_p0321372) at $14, while a single [Philips Hue White and Colour Ambiance B22 globe](https://www.philips-hue.com/en-au/p/hue-white-and-color-ambiance-a60-b22-smart-bulb-1100/8720169391758) costs several times that. Compare current prices at Bunnings, Officeworks, JB Hi-Fi or Amazon AU before you buy. Buy one, live with it for a week, then scale up. Colour is fun for about a fortnight; **tunable white** — cool and energising in the morning, warm at night — is the feature you'll still be using in a year.
@@
-1. **Battery-powered wireless wall buttons.** Zigbee or Thread scene switches that mount with 3M adhesive strips or a single small screw. They don't switch mains at all — they send a radio command to the globe. Stick one beside the real switch and train the household to use it. Around $25–$50 AUD each [VERIFY].
+1. **Battery-powered wireless wall buttons.** Zigbee or Thread scene switches that mount with 3M adhesive strips or a single small screw. They don't switch mains at all — they send a radio command to the globe. Stick one beside the real switch and train the household to use it. Prices vary by brand and ecosystem — the [Philips Hue Dimmer Switch](https://www.philips-hue.com/en-au/p/hue-dimmer-switch--latest-model-/8719514274631), for example, is battery powered and mounts with adhesive or screws — so check current retailer prices.
@@
-One more thing worth raising with your agent in writing: some leases include clauses about "alterations or additions", and whether a stuck-on switch counts is genuinely arguable. Tenancy law differs by state and territory and is not settled on smart-home fittings [VERIFY]. A short email asking permission for anything adhesive costs nothing and gives you a paper trail. Screw-in globes and plug-in devices are almost universally fine.
+One more thing worth raising with your agent in writing: some leases include clauses about "alterations or additions", and whether a stuck-on switch counts is genuinely arguable. Rules differ by state and territory — for example, [Consumer Affairs Victoria](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property) lists LED light bulbs that don't need new light fittings among changes renters can make without consent (with exceptions such as heritage-listed homes), while in [NSW](https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property) you need your lease to allow a change or your landlord's written permission, and landlords can't unreasonably refuse certain minor changes. Check your state's tenancy authority and your lease before any change. A short email asking permission for anything adhesive costs nothing and gives you a paper trail. Screw-in globes and plug-in devices that don't touch the fixed wiring are generally the lowest-risk changes.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 1 answer
  - before: No — integrated LED downlights combine the LED, driver and housing into one hardwired unit, so swapping them means altering fixed wiring. That's licensed electrician work under AS/NZS 3000, and unlicensed DIY mains work is illegal across Australia [VERIFY]. Screwing in a globe is fine; rewiring a fitting is not.
  - after: No — integrated LED downlights combine the LED, driver and housing into one hardwired unit, so swapping them means altering fixed wiring. That's work for a licensed electrician — the NSW Government describes DIY electrical work as dangerous and illegal, and Energy Safe Victoria gives the same warning. Check your state's electrical safety regulator for the detail. Screwing in a globe is fine; rewiring a fitting is not.
- FAQ 2 answer
  - before: Stick a battery-powered Zigbee or Thread wireless button beside the existing switch so people press that instead — it sends a radio command rather than cutting mains, and costs roughly $25–$50 AUD each [VERIFY]. Cheaper options are a plastic switch guard or gaffer tape over the switch, or just a remote on the coffee table.
  - after: Stick a battery-powered Zigbee or Thread wireless button beside the existing switch so people press that instead — it sends a radio command rather than cutting mains. Prices vary by brand and ecosystem, so check current retailer prices. Cheaper options are a plastic switch guard or gaffer tape over the switch, or just a remote on the coffee table.
- FAQ 5 answer
  - before: Adhesive mounting sits in a grey area — some leases have "alterations or additions" clauses, and tenancy law varies by state and territory and isn't settled on smart-home fittings [VERIFY]. A short email to the agent asking permission costs nothing and creates a paper trail; screw-in globes and plug-in devices are almost universally fine.
  - after: Adhesive mounting sits in a grey area — some leases have "alterations or additions" clauses, and the rules differ by state and territory, so check your state's tenancy authority and your lease before any change. A short email to the agent asking permission costs nothing and creates a paper trail; screw-in globes and plug-in devices that don't touch the fixed wiring are generally the lowest-risk changes.

---

## robot-vacuum-local-home-assistant-no-cloud

[VERIFY] tags: 7 → 0. Words: 1277 → 1429.

### Decisions and sources

| # | Original text (with tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "whether Valetudo's supported-devices page lists a working method for that combination [VERIFY — support status changes with each vendor firmware release]" | b | Links Valetudo's supported robots page; support is per model and can hinge on firmware version, hardware revision or manufacturing date, so check again right before buying | https://valetudo.cloud/pages/general/supported-robots |
| 2 | Body: "rooting almost certainly voids the manufacturer warranty. Your Australian Consumer Law rights ... not one to assume either way [VERIFY — seek advice for your situation]" | c | "modifying the firmware may affect the manufacturer's warranty, so check the manufacturer's warranty terms"; consumer guarantees are separate from a warranty (ACCC link); how they apply to a modified device isn't something to assume; seek advice | https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees |
| 3 | Body: "the single highest-value $30-odd [VERIFY pricing]" | b | "one of the cheapest, highest-value purchases ... Prices vary by retailer and model, so check current listings." The dollar figure has been removed. AU listings seen at about A$23–25 but prices change, so no figure is given. | https://www.ozbargain.com.au/node/708239 (search result only; Core Electronics fetch was blocked) |
| 4 | Body: "start, stop, return to dock, basic run modes. No maps, no room selection, no zone cleaning, no mop pad state [VERIFY against current spec revision]" | a | Matter 1.2: remote start, progress notifications, cleaning modes, brush, error and charging status. Room/zone cleaning came with service areas in Matter 1.4, and Home Assistant added initial support in 2026.3. No live maps. Features depend on vendor and controller, so check the HA Matter page. The "no room selection / no zone cleaning" claim was **wrong** and has been corrected. | https://csa-iot.org/newsroom/matter-1-2-arrives-with-nine-new-device-types-improvements-across-the-board/ ; https://www.matteralpha.com/news/home-assistant-2026-3-beta-adds-initial-support-for-matter-rvc-service-areas ; https://www.home-assistant.io/integrations/matter/ |
| 5 | FAQ 1 (id 1697): "Rooting almost certainly voids ... [VERIFY - seek advice for your situation]" | c | Check the manufacturer's warranty terms. Consumer guarantees are separate and the ACCC website explains them. Don't assume how they apply to a modified device; seek advice | https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees |
| 6 | FAQ 3 (id 1699): "no maps, room selection, zone cleaning or mop pad state [VERIFY against current spec revision]" | a | Same correction as #4: service areas came in Matter 1.4 and HA added initial support in 2026.3. No live maps. "reliable local control of the basics" | as #4 |
| 7 | FAQ 4 (id 1700): "whether Valetudo's supported-devices page lists ... [VERIFY - support status changes with each vendor firmware release]" | b | Support is per model and can hinge on firmware, hardware revision or manufacturing date, so check again right before buying | https://valetudo.cloud/pages/general/supported-robots |

Totals: a = 2, b = 3, c = 2. The excerpt and keyTakeaways had no tags. No placeholders (TODO/TBD/lorem/template text) were found.

#### Consistency edits (untagged)

- Body, Matter section: "So Matter gets you a reliable local on/off switch" changed to "So Matter gets you reliable local control of the basics". This follows from the service-area correction (#4).
- Body, Matter section: an inline source link was added to the existing, verified sentence "Matter 1.2 added a robot vacuum device type" (CSA 1.2 announcement). The wording is unchanged.
- FAQ 3: "It's a reliable local on/off switch" changed to "It's reliable local control of the basics", to match the body.
- FAQ 1 and FAQ 4: rewritten to match body #2 and #1 (these carried their own tags; see rows 5 and 7).
- Excerpt and keyTakeaways: unchanged. Neither conflicts with the corrections.

#### Needs human legal review

- Body and FAQ 1: the rewritten warranty and ACL paragraph (rooting vs manufacturer warranty and consumer guarantees).
- Body, intro: "the command goes to a server (often in China, sometimes Singapore or the US)". This is a privacy/data-location claim with no source. Check each vendor's AU privacy policy.
- Body, final paragraph: "Nothing here involves mains wiring ... no licensed electrician required ... a dedicated outlet ... that's a licensed electrician's job under AS/NZS 3000." This is an electrical-licensing law claim.
- Body, Valetudo section: "On many Dreame units it means opening the case, shorting test pads ... flashing a patched image". This is a safety and security consideration.
- Body, cloud mitigation: the IoT VLAN/guest network advice is security guidance and is reasonable.

#### Flagged untagged sentences (not changed)

- **"Some brands simply don't have a local path. Ecovacs is the clearest example"** (plus Tier 1 and FAQ 2 "everything relays through the internet"). The official HA Ecovacs docs say "During setup, you can choose to use a self-hosted instance over the cloud servers" (Bumper), with the integration class "Cloud Push". The claim is overstated and should be reworded to mention the self-hosted Bumper option and its limitations. Source: https://www.home-assistant.io/integrations/ecovacs/
- "the L10s Ultra generation is well documented in the project's device list". Valetudo lists the L10s Ultra (fastboot via breakout PCB, and it says warranty seals stay intact) but warns that the **L10s Ultra Gen2 "is a completely different robot"**. Consider adding this caveat next to the Dreame product box, and confirm which variant the catalogue slug is.
- "On many Dreame units it means opening the case, shorting test pads..." For the featured L10s Ultra, Valetudo describes rooting as relatively easy with warranty seals intact, so this line may mislead readers about that specific model.
- "Buying a unit and finding it shipped with patched firmware is the most common disappointment" (body and FAQ 4). This is an unsourced superlative.
- "the 2.4 GHz interference is real and it's the number one cause of flaky Zigbee networks" (body and FAQ 5). This is an unsourced superlative. Suggest "a common cause".
- "a standard Type I 240 V outlet". Australia's nominal supply voltage is 230 V. Suggest "230 V".
- Excerpt: "how local control actually works in 2024-25". This date is stale for a September 2026 article.
- "If the vacuum is a $1,500 appliance". Illustrative only and not a product price, but check it isn't read as a price claim.

### Body diff

```diff
--- before
+++ after
@@
-Before you buy anything specifically to root it, check three things: the exact model number (regional variants differ), the firmware version it ships with, and whether Valetudo's supported-devices page lists a working method for that combination [VERIFY — support status changes with each vendor firmware release]. Buying a unit and finding it shipped with patched firmware is the most common disappointment.
+Before you buy anything specifically to root it, check three things: the exact model number (regional variants differ), the firmware version it ships with, and whether [Valetudo's supported robots page](https://valetudo.cloud/pages/general/supported-robots) lists a working method for that combination. Support is listed model by model, and the notes on that page show rootability can hinge on the firmware version and even the hardware revision or manufacturing date, so check it again right before you buy. Buying a unit and finding it shipped with patched firmware is the most common disappointment.
@@
-And be clear-eyed: rooting almost certainly voids the manufacturer warranty. Your Australian Consumer Law rights for a major failure unrelated to the modification are a separate question and not one to assume either way [VERIFY — seek advice for your situation]. If the vacuum is a $1,500 appliance you can't afford to brick, this isn't the hobby for you.
+And be clear-eyed about warranty: modifying the firmware may affect the manufacturer's warranty, so check the manufacturer's warranty terms before you start. Your consumer guarantees under the Australian Consumer Law are separate from a manufacturer's warranty (the [ACCC explains consumer guarantees](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees)), but how they apply to a modified device isn't something to assume either way. Seek advice for your situation. If the vacuum is a $1,500 appliance you can't afford to brick, this isn't the hobby for you.
@@
-Some brands simply don't have a local path. Ecovacs is the clearest example — the Home Assistant integration authenticates to Ecovacs' servers and relays everything through them. It works well and exposes plenty of controls, but pull the WAN cable and your automations stop.
+Some brands offer no easy local path. Ecovacs is the clearest example — by default the Home Assistant integration authenticates to Ecovacs' servers and relays everything through them. It exposes plenty of controls, but pull the WAN cable and your automations stop. The [Home Assistant integration](https://www.home-assistant.io/integrations/ecovacs/) does let you choose a self-hosted server instead of the cloud during setup (based on the community Bumper project), but that comes with its own requirements and limitations, and device support relies on reverse engineering.
@@
-A USB Zigbee coordinator plugged into whatever runs Home Assistant is the cheapest way in, and it's the single highest-value $30-odd [VERIFY pricing] you'll spend on a local-first setup.
+A USB Zigbee coordinator plugged into whatever runs Home Assistant is the cheapest way in, and it's one of the cheapest, highest-value purchases you'll make for a local-first setup. Prices vary by retailer and model, so check current listings.
@@
-Matter 1.2 added a robot vacuum device type, and Matter is local by design — commands travel over your LAN, not a vendor server. On paper that solves everything.
+[Matter 1.2 added a robot vacuum device type](https://csa-iot.org/newsroom/matter-1-2-arrives-with-nine-new-device-types-improvements-across-the-board/), and Matter is local by design — commands travel over your LAN, not a vendor server. On paper that solves everything.
@@
-In practice, as of writing, Matter's vacuum support covers a fairly thin slice: start, stop, return to dock, basic run modes. No maps, no room selection, no zone cleaning, no mop pad state [VERIFY against current spec revision]. Vendors that support it typically keep the rich features in their own app. So Matter gets you a reliable local on/off switch, which is genuinely useful for automations, but it isn't a replacement for Valetudo or a full local integration today.
+In practice, Matter's vacuum support is still a fairly thin slice compared with a vendor app. Matter 1.2 covered remote start, progress notifications, cleaning modes (dry vacuuming vs wet mopping) and status details such as brush status, errors and charging. Cleaning by room or zone came later, as the service area feature in Matter 1.4, and Home Assistant only added [initial support for Matter service areas](https://www.matteralpha.com/news/home-assistant-2026-3-beta-adds-initial-support-for-matter-rvc-service-areas) in 2026.3. Don't expect live maps. Vendors that support Matter typically keep the rich features in their own app, and what you actually get depends on the vendor's firmware and your controller, so check the [Home Assistant Matter integration page](https://www.home-assistant.io/integrations/matter/) for current support. So Matter gets you reliable local control of the basics, which is genuinely useful for automations, but it isn't a replacement for Valetudo or a full local integration today.
```

### Excerpt / key takeaways / FAQ changes

- excerpt
  - before: Some robot vacuums will talk to Home Assistant entirely over your own LAN, others refuse to move without a server overseas. Here's how local control actually works in 2024-25, which brands are realistic, what rooting involves, and how to automate cleaning even when the vacuum itself stays cloud-tethered.
  - after: Some robot vacuums will talk to Home Assistant entirely over your own LAN, others refuse to move without a server overseas. Here's how local control actually works, which brands are realistic, what rooting involves, and how to automate cleaning even when the vacuum itself stays cloud-tethered.
- FAQ 1 answer
  - before: Rooting almost certainly voids the manufacturer's warranty. Whether your Australian Consumer Law rights still apply to a major failure unrelated to the modification is a separate question and not one to assume either way [VERIFY - seek advice for your situation]. If it's an expensive appliance you can't afford to brick, it's not worth the risk.
  - after: Check the manufacturer's warranty terms before you root: modifying the firmware may affect the manufacturer's warranty. Your consumer guarantees under the Australian Consumer Law are separate from a manufacturer's warranty (the ACCC website explains them), but how they apply to a modified device isn't something to assume either way - seek advice for your situation. If it's an expensive appliance you can't afford to brick, it's not worth the risk.
- FAQ 2 answer
  - before: Yes. The Home Assistant integration authenticates to Ecovacs' servers and exposes plenty of controls, but everything relays through the internet, so automations stop if your WAN drops. Isolate it on an IoT VLAN or guest network and build automations that degrade gracefully rather than hanging on a vacuum.start call.
  - after: Yes. By default the Home Assistant integration authenticates to Ecovacs' servers and exposes plenty of controls, but everything relays through the internet, so automations stop if your WAN drops. The integration also offers a self-hosted server option during setup, based on the community Bumper project, which has its own requirements and limitations. Isolate it on an IoT VLAN or guest network and build automations that degrade gracefully rather than hanging on a vacuum.start call.
- FAQ 3 answer
  - before: Not yet. Matter 1.2 added a robot vacuum device type and is local by design, but current support covers only a thin slice - start, stop, return to dock and basic run modes, with no maps, room selection, zone cleaning or mop pad state [VERIFY against current spec revision]. It's a reliable local on/off switch, not a Valetudo replacement.
  - after: Not yet. Matter 1.2 added a robot vacuum device type and is local by design, but support is still a thin slice compared with vendor apps - Matter 1.2 covered start, progress notifications, cleaning modes and status details, cleaning by room or zone (service areas) came with Matter 1.4, and Home Assistant only added initial support for that in 2026.3. Don't expect live maps, and what you get depends on the vendor and your controller. It's reliable local control of the basics, not a Valetudo replacement.
- FAQ 4 answer
  - before: Check the exact model number (regional and AU variants differ from EU listings), the firmware version it ships with, and whether Valetudo's supported-devices page lists a working rooting method for that exact combination [VERIFY - support status changes with each vendor firmware release]. Units shipping with patched firmware are the most common disappointment.
  - after: Check the exact model number (regional and AU variants differ from EU listings), the firmware version it ships with, and whether Valetudo's supported robots page lists a working rooting method for that exact combination. Support is listed model by model, and rootability can hinge on the firmware version and even the hardware revision or manufacturing date, so check again right before you buy. Units shipping with patched firmware are the most common disappointment.
