# Task 7 review: cluster 3, smart light switches without a neutral wire

**Nothing has been written to Strapi.** Reply **approve** to publish the merged article, update the one internal link and add the redirect. Then unpublish the MERGE post in the Strapi admin, as in cluster 1.

| | Slug | Title | Words | [VERIFY] |
|---|---|---|---|---|
| **KEEP** | smart-light-switches-neutral-wire-older-australian-homes | Smart Light Switches and the Neutral Wire Problem in Older Australian Homes | 1502 | 0 |
| MERGE | smart-light-switches-no-neutral-wire-australia | Retrofitting Smart Light Switches in Australian Homes Without a Neutral Wire | 1295 | 9 |

Survivor chosen by the user: the current survivor. The live 301 already points here.

## What happens on approve

1. **KEEP updated in Strapi:** body, excerpt, keyTakeaways and FAQ from the draft below. Title "Smart Light Switches Without a Neutral Wire: Options for Older Australian Homes"; seoTitle "Smart Light Switches Without a Neutral Wire (Australia)" (unchanged); seoDescription "No neutral at your light switch? Five ways Australian homeowners and renters can get smart lighting in older homes, and what needs an electrician.". Slug and `publishDate` (23 Aug 2026) kept; `dateModified` set to today.
2. **Internal link updated in Strapi, in `smart-lighting-kids-rooms`** (the only published post linking to the MERGE URL). The sentence linked both posts; after the merge both would go to the same page, so it becomes one link:
   - before: …our articles on the [neutral wire problem in older Australian homes](https://nxtsmarthome.com.au/lighting/smart-light-switches-neutral-wire-older-australian-homes) and [retrofitting smart switches without a neutral wire](https://nxtsmarthome.com.au/lighting/smart-light-switches-no-neutral-wire-australia) are useful background…
   - after: …our guide to [smart light switches and the neutral wire problem in older Australian homes](https://nxtsmarthome.com.au/lighting/smart-light-switches-neutral-wire-older-australian-homes/) is useful background…
3. **301** `/lighting/smart-light-switches-no-neutral-wire-australia/` → `/lighting/smart-light-switches-neutral-wire-older-australian-homes/` added to `data/redirects-adsense.json`. It is already live via `data/merged-articles.json`.
4. **You unpublish the MERGE post** in the Strapi admin (Unpublish, not Delete).
5. Build, `npm run audit:thin`, log in ADSENSE_CHANGES.md.

Backups: `exports/strapi-backup/<slug>-2026-09-24T09-05-25-484Z.json` (KEEP, MERGE and smart-lighting-kids-rooms).

## My edits on top of the researcher's draft

- **Two product markers removed: Mirabella Genio powerboard and Zemismart hub.** Both were already in the live KEEP post, but neither product has a verdict (no bestFor or pros). The site already hides them, and the live page shows only the Tapo P100 and Sonoff boxes. The merged article keeps those two, which meets the minimum of two. The prose that mentions the products is unchanged.
- **Voltage.** The researcher changed "240 V" to "230 V nominal", citing a component supplier's page. I kept the correction but removed that link, because a supplier page is not an authority for this; it now reads "a nominal 230 V".

---

# Section map: smart-light-switches-no-neutral-wire-australia (MERGE) into smart-light-switches-neutral-wire-older-australian-homes (KEEP)

## Section map

| # | MERGE item | Status | Where it went / why dropped |
|---|---|---|---|
| 1 | Intro: pre-2000s homes, red/brown actives, no neutral behind the plate | COVERED | KEEP intro and "Why so many..." (sourced 1990s–early 2000s range). Wire colours dropped (unsourced, not needed) |
| 2 | H2 "Why Australian switch boxes usually lack a neutral": loop-at-the-light | COVERED | KEEP "Why so many Australian switches have no neutral" (switch loop) |
| 3 | Smart switch needs a permanent circuit for radio/relay | COVERED | KEEP same section, para 2 |
| 4 | Wall box depth, shallow plaster brackets, bulging plate [VERIFY] | COVERED | KEEP depth para (sourced link). MERGE version dropped |
| 5 | US Decora switches don't fit AU blocks / 84 mm plate standard | UNIQUE | Dropped (c): no official source found; KEEP's "fits an Australian plate and mounting bracket" check covers the practical advice |
| 6 | Compliance with AS/NZS 3000 | UNIQUE | Added to "First, work out what you actually have" as what the electrician works to (decision 4); not stated as a legal mandate |
| 7 | RCM marking, grey imports may lack it [VERIFY] | COVERED | KEEP Option 2 RCM bullet (EESS link) |
| 8 | Licensed electrician in every state, not legal DIY [VERIFY] | COVERED | KEEP ESV + NSW sourced wording; MERGE absolute "every state" wording dropped |
| 9 | H2 "How no-neutral smart switches work": trickle current, 60 W vs 5 W LED glow | COVERED | KEEP Option 2 para 1 |
| 10 | Bypass capacitor across A and N at fitting | COVERED | KEEP Option 2 |
| 11 | "Most brands ship a bypass in the box" | UNIQUE | Rewritten (decision 2): Shelly 1L Gen3 as a sourced example; others vary |
| 12 | Bypass is installed at ceiling so electrician works there too | UNIQUE (minor) | One sentence added to Option 2 |
| 13 | Minimum load, "often 3–20W" [VERIFY] | UNIQUE | Figure removed; rewritten as guidance + Shelly example (decision 1); total-wattage-per-switch point added to checklist |
| 14 | Dimming compatibility: trailing-edge, non-dimmable downlights | UNIQUE | Added as checklist bullet in Option 2 (decision 3) |
| 15 | "Workaround, not a clean solution; can't tell until installed" | UNIQUE | Short paragraph at end of Option 2 (softened) |
| 16 | H2 "Check the ceiling first": neutral lives at ceiling, in-ceiling relay modules | COVERED | KEEP Option 3 |
| 17 | Wall switch becomes low-signal input; works when internet drops | COVERED | KEEP Option 3 para 2 |
| 18 | Benefit: no leakage current, no glow/flicker | UNIQUE | Added to Option 3 (follows from KEEP's own sourced explanation) |
| 19 | Benefit: no shallow-box problem; keep Clipsal/HPM/Iconic plates | COVERED | KEEP Option 3 ("plate never changes", "nothing behind a shallow bracket") |
| 20 | One module can cover a whole lighting circuit | UNIQUE | Rewritten (decision 5): lights on the same switch leg, within rated load |
| 21 | Catch: ceiling access (slab, cathedral, insulation); quote both ways | UNIQUE (partly) | New para in Option 3; KEEP only discussed access for running a neutral |
| 22 | H2 "Zigbee versus Wi-Fi" | COVERED | KEEP "Choose the protocol before you choose the switch" |
| 23 | Zigbee's lower power draw suits no-neutral devices | UNIQUE | Dropped (decision 9): unsourced technical claim |
| 24 | Wi-Fi switches clog router client list | UNIQUE (minor) | Half-sentence in protocol section |
| 25 | Zigbee needs a coordinator; Matter hub for Google/Apple Home | COVERED | KEEP protocol section + zemismart marker |
| 26 | Zigbee2MQTT / ZHA with USB coordinator | UNIQUE (minor) | One sentence before sonoff marker (supported by the catalogue product file's sources) |
| 27 | Coordinator placement: away from router and USB 3.0, extension lead, 2.4 GHz | UNIQUE | New para in protocol section (decision 6) |
| 28 | H2 "Renting, or not ready to call an electrician" | COVERED | KEEP Option 4 |
| 29 | B22 bayonet and E27 screw both available | UNIQUE | Added to Option 4 smart-globes bullet (decision 7) |
| 30 | Label the switch / childproof switch guard | UNIQUE (minor) | "label the switch" added; switch guard dropped (no product in catalogue, adds little) |
| 31 | Battery Zigbee remotes (Aqara, Philips Hue) pair directly to globes | PARTLY COVERED | Wireless button COVERED by KEEP; Hue direct pairing added (decision 8); Aqara claim dropped |
| 32 | Smart plugs for lamps/LED strips; bond risk | COVERED | KEEP Option 4 + tapo marker |
| 33 | Tenancy caution: written note to agent, fixed wiring needs consent, rules differ [VERIFY] | COVERED | KEEP Option 4 (Consumer Affairs Victoria link) |
| 34 | H2 "The questions to ask before you buy" Q1 neutral at switch | COVERED | KEEP "First, work out..." / order of attack step 2 |
| 35 | Q2 loop-at-light → price ceiling modules | COVERED | KEEP order of attack step 4; plus new "quote both ways" |
| 36 | Q3 dimmable downlights, total wattage vs min load | UNIQUE | Merged into Option 2 checklist (items 13, 14) |
| 37 | Q4 RCM + 240V/50Hz [VERIFY per product] | COVERED | KEEP RCM bullet; voltage corrected to 230 V nominal (decision 10) |
| 38 | Q5 still works as a plain switch when internet is down | UNIQUE (as a buying check) | New checklist bullet in Option 2 |
| 39 | Budget $40–$120 per mech, $150–$300 first hour [VERIFY] | UNIQUE | Removed (decision 11); KEEP's "prices vary, get two quotes" stands |
| 40 | Additional points cheaper in the same visit | UNIQUE | Rewritten as guidance in Option 1 (decision 12) |
| 41 | Closing: the neutral is at the ceiling | COVERED | KEEP Option 3 opening |
| F1 | FAQ: LED glow after no-neutral switch | COVERED | KEEP FAQ 3434 (Shelly bypass example appended) |
| F2 | FAQ: swap switch myself? [VERIFY] | COVERED | KEEP FAQ 3433 |
| F3 | FAQ: renter options [VERIFY] | COVERED | KEEP FAQ 3436 (B22/E27 and Hue pairing appended) |
| F4 | FAQ: ceiling module vs no-neutral switch | PARTLY COVERED | KEEP FAQ 3435 adapted to this comparison question |
| F5 | FAQ: Zigbee vs Wi-Fi | UNIQUE | New FAQ 6 (no id); power-draw claim dropped |

All 9 MERGE [VERIFY] tags (items 4, 7-certification, 8, 13, 33, 37, 39, F2, F3) are either covered by KEEP's sourced text or resolved below.

## Decisions for researched claims

| # | Original text (MERGE) | a/b/c | New text | Source URLs |
|---|---|---|---|---|
| 1 | "Many no-neutral switches specify a minimum connected load, often in the 3–20W region... [VERIFY]" | b | Check min/max load and total wattage per switch; single low-wattage LED is the likeliest to fall short; read the manual for the exact model | https://kb.shelly.cloud/knowledge-base/shelly-1l-gen3 (example only) |
| 2 | "Most no-neutral switch brands ship one [bypass] in the box" | a | Shelly's 1L Gen3 documentation says its bypass is required for all LED lights and is included; other brands vary | https://kb.shelly.cloud/knowledge-base/shelly-1l-gen3 |
| 3 | "Even where a switch claims trailing-edge dimming... If your downlights aren't marked dimmable, no smart switch will fix that." | a | Smart dimmer can't make non-dimmable downlight dim; Schneider/Clipsal C-Bus guidance: LEDs need a dedicated driver supporting the dimmer type, bench-test fittings | https://www.se.com/au/en/faqs/FAQ000196803 |
| 4 | "anything wired into fixed installation should... comply with AS/NZS 3000 requirements" | a (softened) | Electrician works to the Wiring Rules AS/NZS 3000, described by Standards Australia as helping electricians design, construct and verify installations | https://www.standards.org.au/flagship-projects/wiring-rules |
| 5 | "One module can cover a whole lighting circuit rather than one switch per room" | b | A module switches everything on that switch leg, within its rated load on the spec sheet | (guidance; no figure) |
| 6 | "mount the coordinator away from your Wi-Fi router and USB 3.0 ports, and use the supplied extension lead" | a | Zigbee2MQTT guide: keep adapter away from Wi-Fi router, SSD, USB 3/HDMI ports; ~50 cm USB extension or USB 2 port | https://www.zigbee2mqtt.io/advanced/zigbee/02_improve_network_range_and_stability.html |
| 7 | "B22 bayonet and E27 Edison screw are both widely available here" | a | Check B22 vs E27 base; Hue AU says they are not interchangeable | https://www.philips-hue.com/en-au/explore-hue/blog/bulb-size-guide |
| 8 | "Zigbee remotes from brands like Aqara or Philips Hue send commands directly to smart globes" | a (Hue) / c (Aqara) | Hue dimmer switch can pair with up to 10 bulbs without a Bridge | https://www.philips-hue.com/en-au/support/connect-hue-product/accessories/dimmer-switch |
| 9 | "Zigbee tends to be the better technical fit: lower power draw suits the tight energy budget of a no-neutral device" | c | Removed | — |
| 10 | "rated for 240V/50Hz Australian installation [VERIFY per product]" (and KEEP's "240 V") | a | Australian mains is 230 V nominal under AS 60038; labels commonly read 220–240 V, 50 Hz | https://www.australianrectifiers.com.au/regulatory/ac-supply-voltage-ratings-in-australia-have-been-lowered/ ; https://kb.shelly.cloud/knowledge-base/shelly-1l-gen3 (220-240 V~ 50Hz label example) |
| 11 | "$40–$120 per smart mech or module... $150–$300 for the first hour in metro areas [VERIFY current pricing]" | c | Removed; KEEP's "prices vary, compare listings, get two quotes" stands | — |
| 12 | "additional points cheaper if they're done in the same visit" | b | Ask for several positions to be quoted and done in one visit to avoid a callout fee each | (guidance; no figure) |
| 13 | "In every Australian state and territory that means a licensed electrician — it is not a legal DIY job [VERIFY]" (body + FAQ) | c | Replaced by KEEP's sourced ESV/NSW wording and "check your state regulator" | KEEP links (energysafe.vic.gov.au, nsw.gov.au) |
| 14 | Tenancy: "anything involving fixed wiring almost certainly needs the owner's consent. Rules differ by state. [VERIFY]" (body + FAQ) | c | Replaced by KEEP's Consumer Affairs Victoria example + "check your state tenancy authority" | KEEP link (consumer.vic.gov.au) |

Counts: a = 7 (2, 3, 4, 6, 7, 8, 10), b = 3 (1, 5, 12), c = 4 (9, 11, 13, 14). Item 8 is split: the Aqara part was removed.

### FAQ answer sources (plain-text answers, no links)

- 3433: energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself; nsw.gov.au/topics/electrical-safety/in-the-home (unchanged from KEEP)
- 3434: KEEP sources + https://kb.shelly.cloud/knowledge-base/shelly-1l-gen3
- 3435: nsw.gov.au/topics/electrical-safety/in-the-home (KEEP); "quote both ways" is guidance
- 3436: consumer.vic.gov.au renters-making-changes page (KEEP); https://www.philips-hue.com/en-au/explore-hue/blog/bulb-size-guide ; https://www.philips-hue.com/en-au/support/connect-hue-product/accessories/dimmer-switch
- 3437: eess.gov.au RCM page (KEEP); australianrectifiers.com.au AS 60038 page
- Zigbee vs Wi-Fi (new, no id): https://www.zigbee2mqtt.io/advanced/zigbee/02_improve_network_range_and_stability.html ; Zigbee2MQTT/ZHA support per content/products/sonoff-zigbee-3-0-usb-dongle.md sources

## Needs human legal review

- The licensed-electrician statements (unchanged KEEP wording: ESV "even for small jobs such as changing... light switches"; NSW "DIY electrical work is illegal and can void your insurance"). Correctly scoped to VIC/NSW with "check your own state", but confirm a reviewer is comfortable with the closing line "All fixed-wiring options in that list require a licensed electrician" and FAQ 3433 starting with a flat "No."
- New AS/NZS 3000 sentence: deliberately does not say compliance is legally mandated (Standards Australia's page does not say so; that sits in state legislation).
- Tenancy: only the Victorian example is sourced; other states are pointed to their tenancy authority.

## Flagged, not changed

- Voltage: KEEP said "240 V" in the checklist and FAQ 3437; changed to 230 V nominal per the task brief. The source is an industry supplier page citing AS 60038, not a regulator. If a regulator or Standards Australia page is preferred, swap the link.
- Two KEEP product markers have no verdict in `public/data/products.json`: `zemismart-matter-zigbee-thread-smart-home-hub` and `smart-mirabella-genio-wi-fi-powerboard` (no `bestFor`/`pros`, and no curated file in `content/products/`). `scripts/link-products.mjs` refuses such products under CLAUDE.md rule 3. Kept as instructed; they need a curated product file or replacing before republishing.
- The "at least five workable paths" line in the intro and seoDescription is KEEP's wording. The article has four numbered options plus the protocol choice, so the count is arguable.
- The KEEP depth link goes to a retailer blog (asthome.com.au), not an official source. It was fact-checked today, so left alone.
- No new product markers came over from MERGE. All three MERGE markers (zemismart hub, sonoff dongle, tapo P100) were already in KEEP.
- A Clipsal dimmer page (clipsal.com) returned 403. The dimming point uses the Schneider Electric AU FAQ, which covers C-Bus dimmers specifically, and the text says so.


---

## Merged article: meta

- **title:** Smart Light Switches and the Neutral Wire Problem in Older Australian Homes → **Smart Light Switches Without a Neutral Wire: Options for Older Australian Homes**
- **seoTitle:** Smart Light Switches Without a Neutral Wire (Australia)
- **seoDescription:** No neutral at your light switch? Five ways Australian homeowners and renters can get smart lighting in older homes, and what needs an electrician.
- **excerpt:** unchanged
- **keyTakeaways:** Many older Australian homes use a switch loop, so there is no neutral at the wall plate and standard smart switches will not work. Your realistic options are to have a licensed electrician run a neutral, use a no-neutral switch with a bypass capacitor, fit a relay module at the ceiling where the neutral already is (often the tidier fix, with no LED glow from trickle current), or skip wiring entirely with smart globes and plugs.

### FAQ (6)

**Can I just swap a light switch for a smart one myself if I'm careful?** (KEEP #3433)

No. Replacing a light switch is electrical work for a licensed electrician. Energy Safe Victoria says electrical work isn't a DIY job even for small jobs such as changing light switches, and the NSW Government warns DIY electrical work is illegal and can void your insurance. Rules are set by each state and territory, so check your local electrical safety regulator. Ask your sparkie to pull one plate and photograph it next time they're on site; it settles the neutral question at no extra cost.

**Why does my LED globe glow faintly or flash after installing a no-neutral switch?** (KEEP #3434)

No-neutral switches keep their electronics alive by trickling a small current through the light fitting itself. That was invisible with a 60 W incandescent, but with a 5 W LED it can cause a faint glow, a flash every few seconds, or a lamp that won't turn fully off. The usual remedy is a bypass capacitor wired in parallel at the fitting, which is again licensed electrician work and needs physical room inside the canopy or ceiling rose. How much bypass a product needs varies: Shelly, for example, says the bypass for its 1L Gen3 is required for all LED lights and includes one with the device, so check the manual for your exact model.

**Is a ceiling relay module better than a no-neutral switch?** (KEEP #3435)

It often is where the fitting has room. A compact relay module (Shelly, Sonoff and similar Zigbee or Wi-Fi micro-modules) installs at the light fitting, where active, neutral and switched active all meet, so it does not need to trickle current through the lamp the way a no-neutral switch does. The existing rocker becomes an input to the module, so the plate never changes and nothing has to squeeze behind a shallow bracket. Concrete slabs, raked ceilings or cramped canopies make it harder, so ask your electrician to quote both ways. Installation is still fixed-wiring work requiring a licensed electrician, and you should confirm the specific module is approved for sale and installation in Australia.

**I'm renting — what are my options?** (KEEP #3436)

Smart globes in existing fittings, with the wall switch left permanently on and a battery-powered wireless button stuck beside the plate so guests don't cut power, plus smart plugs for lamps. Check whether your fittings take bayonet (B22) or screw (E27) globes, as the two are not interchangeable. Some remotes pair directly with globes; Philips Hue says its dimmer switch can pair with up to 10 bulbs without a Bridge. Both approaches are reversible, cost a fraction of rewiring and don't touch fixed wiring. Check your lease and your state or territory tenancy authority before changing anything — in Victoria, for example, renters can fit LED globes that don't need new fittings without consent, but most other changes need the rental provider's written approval.

**How much should I budget for a no-neutral smart switch in Australia?** (KEEP #3437)

Prices vary widely by brand, gang count and whether a bypass is included, so compare current listings at local retailers rather than relying on a rule of thumb, and get at least two electrician quotes; grouping several switch positions into one visit avoids paying a callout fee for each. Before buying, check the LED load ratings, whether a bypass is included or sold separately, that the product is rated for Australian mains (230 V nominal), and that it carries an RCM mark — grey imports may not, so ask the supplier for its compliance documentation and check the public EESS equipment register.

**Should I choose Zigbee or Wi-Fi for smart light switches?** (new, from MERGE)

Wi-Fi is simplest for one or two switch positions, but each device adds another client to your router. Past about six devices a mesh protocol such as Zigbee tends to behave better, and mains-powered switches act as Zigbee repeaters. Zigbee needs a coordinator: a Matter-capable hub suits Apple Home, Google Home or Alexa users, while a USB dongle with Zigbee2MQTT or Home Assistant's ZHA suits Home Assistant setups. Keep a USB coordinator away from the Wi-Fi router and USB 3 ports; the Zigbee2MQTT project recommends a USB extension cable of around 50 cm to reduce interference.

## Body diff against the current KEEP post

```diff
--- KEEP now
+++ merged
@@
-Do not open the switch yourself. Replacing a light switch is electrical work for a licensed electrician: [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says electrical work isn't a DIY job "even for small jobs such as changing power points or light switches", and the [NSW Government](https://www.nsw.gov.au/topics/electrical-safety/in-the-home) warns that DIY electrical work is illegal and can void your insurance policy. Rules are set state by state, so check your own state or territory's electrical safety regulator.
+Do not open the switch yourself. Replacing a light switch is electrical work for a licensed electrician: [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says electrical work isn't a DIY job "even for small jobs such as changing power points or light switches", and the [NSW Government](https://www.nsw.gov.au/topics/electrical-safety/in-the-home) warns that DIY electrical work is illegal and can void your insurance policy. Rules are set state by state, so check your own state or territory's electrical safety regulator. Your electrician will also be working to the Wiring Rules, [AS/NZS 3000](https://www.standards.org.au/flagship-projects/wiring-rules), the technical rules Standards Australia describes as helping electricians design, construct and verify electrical installations.
@@
-Cost depends almost entirely on access. A single switch position under an accessible roof space is a modest job; a downstairs switch in a double-storey home with a plasterboard ceiling above it may mean patching and painting. Budget a callout fee plus labour, expect quotes to vary widely by location and access, and get at least two.
+Cost depends almost entirely on access. A single switch position under an accessible roof space is a modest job; a downstairs switch in a double-storey home with a plasterboard ceiling above it may mean patching and painting. Budget a callout fee plus labour, expect quotes to vary widely by location and access, and get at least two. If you have several switch positions in mind, ask for them to be quoted and done in one visit so you are not paying a callout fee for each.
@@
-The standard fix is a **bypass capacitor** wired in parallel at the light fitting — again, a job for a licensed electrician, and it needs somewhere to physically live inside the canopy or ceiling rose.
+The standard fix is a **bypass capacitor** wired in parallel at the light fitting — again, a job for a licensed electrician, and it needs somewhere to physically live inside the canopy or ceiling rose. Because the bypass sits at the light, your electrician will be working at the ceiling as well as the wall plate.
+
+How much bypass you need depends on the product. As one example, Shelly's documentation for its [1L Gen3 no-neutral relay](https://kb.shelly.cloud/knowledge-base/shelly-1l-gen3) says its bypass is required for all LED lights (not for incandescent globes) and that one is included with the device. Other brands set their own minimum loads or sell the bypass separately, so read the installation manual for the exact model rather than assuming.
@@
-- Minimum and maximum load ratings for LED, stated in watts, at 240 V.
+- Minimum and maximum load ratings for LED, stated in watts, and the total wattage of the lights on that switch. A single low-wattage LED on its own switch is the case most likely to fall under a minimum load.
@@
+- Dimming, if you want it. A smart dimmer cannot make a non-dimmable downlight dim, and even dimmable LEDs need a driver that supports the dimmer type — Schneider Electric's [guidance for Clipsal C-Bus dimmers](https://www.se.com/au/en/faqs/FAQ000196803) is to use LEDs with a dedicated driver that supports your dimmer, and to have fittings bench-tested for compatibility.
+- What happens when the internet or hub is down. The switch should still turn the light on and off locally.
@@
-- That the product carries an **RCM mark** and is legally sold for use on 240 V Australian circuits. Grey imports from overseas marketplaces may not, so ask the supplier for its compliance documentation — the [RCM](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/) shows the product meets Australia's electrical safety (EESS) and ACMA labelling requirements, and EESS runs a public equipment register you can search.
+- That the product carries an **RCM mark** and is legally sold for use on Australian mains, which is a nominal 230 V (product labels commonly read 220–240 V, 50 Hz). Grey imports from overseas marketplaces may not, so ask the supplier for its compliance documentation — the [RCM](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/) shows the product meets Australia's electrical safety (EESS) and ACMA labelling requirements, and EESS runs a public equipment register you can search.
@@
+
+Be realistic about what you are buying: a no-neutral switch is a workaround rather than a clean fix. Whether it behaves depends on the specific globes, fittings and bypass, and that is hard to predict until it is installed.
@@
-The existing dumb rocker becomes an input to the module rather than a direct load switch, so the wall plate never changes, the family keeps using the switch they already know, and nothing needs to fit behind a shallow bracket.
+The existing dumb rocker becomes an input to the module rather than a direct load switch, so the wall plate never changes, the family keeps using the switch they already know, and nothing needs to fit behind a shallow bracket. Because the module has a proper neutral, it also avoids the trickle-current trick a no-neutral switch relies on, which is where LED glow and flicker come from. A module switches everything on that switch leg, so if several lights share one switch, a single module may cover them — provided the combined load is within its rating on the specification sheet.
+
+The catch is access. A flat concrete slab, a raked or cathedral ceiling, or a crowded canopy makes the job harder and the labour dearer. Ask your electrician to quote both a ceiling module and a no-neutral switch for the same position, then compare.
@@
-- **Smart globes** in existing fittings, with the wall switch left permanently on. Add a battery-powered wireless button stuck over or beside the switch plate so guests do not kill power to the globe.
+- **Smart globes** in existing fittings, with the wall switch left permanently on. Check whether each fitting takes a bayonet (B22) or Edison screw (E27) base first — Philips Hue's [bulb size guide](https://www.philips-hue.com/en-au/explore-hue/blog/bulb-size-guide) notes the two are not interchangeable. Add a battery-powered wireless button stuck over or beside the switch plate, and label the switch, so guests do not kill power to the globe. Some remotes pair straight to the globes: Hue's [dimmer switch setup guide](https://www.philips-hue.com/en-au/support/connect-hue-product/accessories/dimmer-switch) describes pairing one with up to 10 bulbs without a Bridge.
@@
-::product:smart-mirabella-genio-wi-fi-powerboard::
-
@@
-Whatever route you pick, decide early between Wi‑Fi and Zigbee/Thread. Wi‑Fi switches are simplest for one or two positions. Once you are past about six devices, a mesh protocol behaves better — mains-powered switches make excellent Zigbee repeaters, which is a genuine bonus of the in-wall approach.
+Whatever route you pick, decide early between Wi‑Fi and Zigbee/Thread. Wi‑Fi switches are simplest for one or two positions, though every one adds another client to your router. Once you are past about six devices, a mesh protocol behaves better — mains-powered switches make excellent Zigbee repeaters, which is a genuine bonus of the in-wall approach.
@@
-::product:zemismart-matter-zigbee-thread-smart-home-hub::
-
-And if you are running Home Assistant on a mini PC or Raspberry Pi, a USB coordinator keeps your lighting local and working during an internet outage — which is the whole point of putting the intelligence in the wall in the first place.
+And if you are running Home Assistant on a mini PC or Raspberry Pi, a USB coordinator keeps your lighting local and working during an internet outage — which is the whole point of putting the intelligence in the wall in the first place. Zigbee2MQTT and Home Assistant's built-in ZHA integration both work with coordinators of this kind.
@@
+
+Placement matters more than people expect. Zigbee shares the 2.4 GHz band with Wi‑Fi, and the Zigbee2MQTT project's [network stability guide](https://www.zigbee2mqtt.io/advanced/zigbee/02_improve_network_range_and_stability.html) warns against putting the adapter close to a Wi‑Fi router, an SSD, or USB 3 and HDMI ports. It suggests a USB extension cable of around 50 cm, or a USB 2 port, to reduce interference.
```

## Full merged body

If you have ever opened a smart switch box, seen "neutral wire required" on the back of the packet, and quietly put it back in the drawer, you are in very good company. It is probably the single most common reason an Australian smart lighting project stalls before it starts.

The good news: there are at least five workable paths, and only two of them involve rewiring anything.

## Why so many Australian switches have no neutral

In a traditional Australian light circuit, the active and neutral both go to the ceiling — to the batten holder, ceiling rose or junction box. From there, a **switch loop** drops a single pair down the wall: active down, switched active back up. The neutral never leaves the ceiling.

That wiring style was cheap, compliant and completely sensible for a mechanical rocker, which only needs to break one conductor. It becomes a problem when you want the wall plate to contain a Wi‑Fi or Zigbee radio, because that radio needs a continuous small supply — an active *and* a neutral — even when the light is off.

As a rough guide, the older the wiring, the more likely it is to be a switch loop with no neutral at the plate — sources put the cut-off anywhere from the 1990s to the early 2000s, and practice varied by builder and electrician. The only reliable answer is an inspection. Renovated rooms in old houses are a genuine coin toss.

There is a second, less discussed obstacle: **depth**. Australian wall plates typically mount to a shallow plaster bracket or mounting block rather than a deep gang box, so usable space behind the plate varies and can be very tight — some older timber-framed homes have cavities too shallow for a smart module and switch mechanism together, which is why [measuring the depth first](https://asthome.com.au/blogs/news/retrofitting-smart-switches-in-australian-homes-the-2026-expert-guide) matters. Plenty of imported smart mechanisms simply will not fold in behind a standard plate.

## First, work out what you actually have

Do not open the switch yourself. Replacing a light switch is electrical work for a licensed electrician: [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says electrical work isn't a DIY job "even for small jobs such as changing power points or light switches", and the [NSW Government](https://www.nsw.gov.au/topics/electrical-safety/in-the-home) warns that DIY electrical work is illegal and can void your insurance policy. Rules are set state by state, so check your own state or territory's electrical safety regulator. Your electrician will also be working to the Wiring Rules, [AS/NZS 3000](https://www.standards.org.au/flagship-projects/wiring-rules), the technical rules Standards Australia describes as helping electricians design, construct and verify electrical installations.

What you *can* do before you call anyone:

- **Check the age of the switchboard.** Ceramic rewireable fuses and no RCDs usually signal older wiring and a switch-loop layout.
- **Look at the ceiling fittings.** If your lights are on old batten holders rather than downlights, the original wiring is probably untouched.
- **Ask about ceiling access.** A crawlable roof space over the room makes running a neutral dramatically cheaper than a slab-ceiling apartment.
- **Count the gangs.** A four-gang plate controlling hallway, porch, stairs and pantry is where smart switches earn their money — and also where depth problems bite.

When the sparkie is on site for something else, ask them to pull one plate and photograph it. It costs you nothing extra and settles the question.

## Option 1: Have a neutral run to the switch

This is the clean answer. You get a full-featured smart switch, no flicker workarounds, and a wiring layout the next owner's electrician will understand instantly.

Cost depends almost entirely on access. A single switch position under an accessible roof space is a modest job; a downstairs switch in a double-storey home with a plasterboard ceiling above it may mean patching and painting. Budget a callout fee plus labour, expect quotes to vary widely by location and access, and get at least two. If you have several switch positions in mind, ask for them to be quoted and done in one visit so you are not paying a callout fee for each.

Worth doing when you are already renovating, re-lighting a room, or replacing a switchboard. Rarely worth it for one switch in isolation.

## Option 2: No-neutral smart switches, and why they flicker

No-neutral (sometimes "single-live" or "2-wire") smart switches solve the problem by trickling a tiny current *through the light fitting itself* to keep their electronics alive. With a 60 W incandescent globe, that current was invisible. With a 5 W LED, it can be enough to make the lamp glow faintly, flash every few seconds, or refuse to turn fully off.

The standard fix is a **bypass capacitor** wired in parallel at the light fitting — again, a job for a licensed electrician, and it needs somewhere to physically live inside the canopy or ceiling rose. Because the bypass sits at the light, your electrician will be working at the ceiling as well as the wall plate.

How much bypass you need depends on the product. As one example, Shelly's documentation for its [1L Gen3 no-neutral relay](https://kb.shelly.cloud/knowledge-base/shelly-1l-gen3) says its bypass is required for all LED lights (not for incandescent globes) and that one is included with the device. Other brands set their own minimum loads or sell the bypass separately, so read the installation manual for the exact model rather than assuming.

Things to check before buying:

- Minimum and maximum load ratings for LED, stated in watts, and the total wattage of the lights on that switch. A single low-wattage LED on its own switch is the case most likely to fall under a minimum load.
- Whether a bypass is included in the box or sold separately.
- Dimming, if you want it. A smart dimmer cannot make a non-dimmable downlight dim, and even dimmable LEDs need a driver that supports the dimmer type — Schneider Electric's [guidance for Clipsal C-Bus dimmers](https://www.se.com/au/en/faqs/FAQ000196803) is to use LEDs with a dedicated driver that supports your dimmer, and to have fittings bench-tested for compatibility.
- What happens when the internet or hub is down. The switch should still turn the light on and off locally.
- Whether the mechanism fits an Australian plate and mounting bracket, and whether the plate style matches the rest of your house.
- That the product carries an **RCM mark** and is legally sold for use on Australian mains, which is a nominal 230 V (product labels commonly read 220–240 V, 50 Hz). Grey imports from overseas marketplaces may not, so ask the supplier for its compliance documentation — the [RCM](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/) shows the product meets Australia's electrical safety (EESS) and ACMA labelling requirements, and EESS runs a public equipment register you can search.

Prices vary widely by brand, gang count and whether a bypass is included, so compare current listings at local retailers such as Bunnings and specialist automation stores rather than relying on a rule of thumb.

Be realistic about what you are buying: a no-neutral switch is a workaround rather than a clean fix. Whether it behaves depends on the specific globes, fittings and bypass, and that is hard to predict until it is installed.

## Option 3: Put the smarts in the ceiling instead

Here is the elegant trick: the neutral you are missing is sitting right there at the light fitting. Compact relay modules (Shelly, Sonoff and similar Zigbee or Wi‑Fi micro-modules) install *at the ceiling* where active, neutral and switched active all meet.

The existing dumb rocker becomes an input to the module rather than a direct load switch, so the wall plate never changes, the family keeps using the switch they already know, and nothing needs to fit behind a shallow bracket. Because the module has a proper neutral, it also avoids the trickle-current trick a no-neutral switch relies on, which is where LED glow and flicker come from. A module switches everything on that switch leg, so if several lights share one switch, a single module may cover them — provided the combined load is within its rating on the specification sheet.

The catch is access. A flat concrete slab, a raked or cathedral ceiling, or a crowded canopy makes the job harder and the labour dearer. Ask your electrician to quote both a ceiling module and a no-neutral switch for the same position, then compare.

Caveats: the module has to physically fit in the canopy, the fitting must not run hot around it, and installation is fixed-wiring work for a licensed electrician — the [NSW Government](https://www.nsw.gov.au/topics/electrical-safety/in-the-home) lists installing, replacing or moving lights and switches among the jobs you should never attempt unless you are qualified, and your own state's regulator will have equivalent rules. Also confirm the specific module is approved for sale and installation in Australia; the specification sheet, not the marketplace listing, is what matters.

## Option 4: Don't touch the wiring at all

For renters, heritage homes and anyone who would rather not book a sparkie, plug-in and bulb-based approaches remain the fastest route:

- **Smart globes** in existing fittings, with the wall switch left permanently on. Check whether each fitting takes a bayonet (B22) or Edison screw (E27) base first — Philips Hue's [bulb size guide](https://www.philips-hue.com/en-au/explore-hue/blog/bulb-size-guide) notes the two are not interchangeable. Add a battery-powered wireless button stuck over or beside the switch plate, and label the switch, so guests do not kill power to the globe. Some remotes pair straight to the globes: Hue's [dimmer switch setup guide](https://www.philips-hue.com/en-au/support/connect-hue-product/accessories/dimmer-switch) describes pairing one with up to 10 bulbs without a Bridge.
- **Smart plugs** for lamps, which cover a surprising share of everyday lighting in living areas and bedrooms.

::product:tp-link-tapo-p100-mini-smart-wi-fi-socket-plug::

On specification, a mini plug like this suits a floor lamp or bedside light comfortably; check the stated maximum load before putting anything with a heating element on it. For a media unit or a desk with several devices, a smart powerboard with individually switched outlets does more work per Type I socket used.

Neither approach gives you the tactile satisfaction of a wall switch, but both are reversible and cost a fraction of rewiring. Renters should still check their lease and their state's tenancy authority before changing anything — in Victoria, for example, [renters can fit LED globes that don't need new fittings without consent](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property), while most other changes need the rental provider's written approval.

## Choose the protocol before you choose the switch

Whatever route you pick, decide early between Wi‑Fi and Zigbee/Thread. Wi‑Fi switches are simplest for one or two positions, though every one adds another client to your router. Once you are past about six devices, a mesh protocol behaves better — mains-powered switches make excellent Zigbee repeaters, which is a genuine bonus of the in-wall approach.

For a hub-based Zigbee or Thread setup that also speaks Matter to Apple Home, Google Home and Alexa:

And if you are running Home Assistant on a mini PC or Raspberry Pi, a USB coordinator keeps your lighting local and working during an internet outage — which is the whole point of putting the intelligence in the wall in the first place. Zigbee2MQTT and Home Assistant's built-in ZHA integration both work with coordinators of this kind.

::product:sonoff-zigbee-3-0-usb-dongle::

Placement matters more than people expect. Zigbee shares the 2.4 GHz band with Wi‑Fi, and the Zigbee2MQTT project's [network stability guide](https://www.zigbee2mqtt.io/advanced/zigbee/02_improve_network_range_and_stability.html) warns against putting the adapter close to a Wi‑Fi router, an SSD, or USB 3 and HDMI ports. It suggests a USB extension cable of around 50 cm, or a USB 2 port, to reduce interference.

## The practical order of attack

1. Try smart globes plus a wireless button in one room. Live with it for a month.
2. If you want the real wall-switch experience, get an electrician to inspect one switch position and tell you whether a neutral is present.
3. If there is a neutral, buy a standard smart switch and be done.
4. If there is not, choose between running a neutral (best long-term), a ceiling relay module (best value where the fitting has room) or a no-neutral switch with a bypass (fastest, most flicker risk).

All fixed-wiring options in that list require a licensed electrician. Nothing about a smart switch changes that.