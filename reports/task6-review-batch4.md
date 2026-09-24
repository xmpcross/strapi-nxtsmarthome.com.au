# Task 6 review: batch 4 (4 articles)

Proposed fixes for every `[VERIFY]` tag in these four published articles. **Nothing has been written to Strapi.** Reply **approve** to publish all four, or name the articles or rows to change.

Decisions: **a** = verified, rewritten with the fact and an inline source link; **b** = varies, rewritten as a range or as guidance; **c** = unverifiable or legal, the claim removed and readers pointed to the authority.

Backups of each full Strapi record (draft and published) are in `exports/strapi-backup/<slug>-2026-09-24T07-47-41-669Z.json`.

This batch the researchers also kept the excerpt, key takeaways and FAQ consistent with body corrections; each article's **Consistency edits** section lists those untagged changes.

## Reviewer edits beyond the tags (approve or drop them separately)

1. **Smart light switches, excerpt.** "no neutral at the wall plate, which is exactly what a smart switch wants" said the opposite of what was meant. It now reads "no neutral at the wall plate - and a neutral is exactly what most smart switches need".
2. **Smart light switches, excerpt.** "where a licensed electrician is legally required" now reads "where you need a licensed electrician", so it does not state the law as settled (as in batch 3).

## Errors in the originals that the researchers corrected

- **Blackout cameras:** on FTTC the in-home connection box powers the service; the article said the street equipment has its own power. The 500Wh ÷ 25W runtime was given as 17 hours; it is 20 hours on paper, before losses. nbn stopped offering FTTP battery back-up units in June 2024, and they were meant for voice, not data.
- **Bathroom humidity:** the 40-60% "healthy" humidity band had no support. The National Asthma Council says 30-50%, with mould possible above 55%.
- **Smart light switches:** the "before the 1990s" cut-off became a range. The 25-35mm depth and $35-90 price figures were removed. "Future sale obligations" was dropped because no source supports it.
- **Movie-night lighting:** the $120-$250 budget and $25-$40 button price were removed. The Hue Smart Button is now listed at $54.95 (Hue AU) and $49 (JB Hi-Fi), both "at the time of writing".

## Flagged by the researchers but NOT changed (your call)

- **Blackout cameras:** "240V" (the nominal supply is 230V); "covers almost any suburban outage"; "a handful of watts"; the Arlo local-recording and Tapo P100 power-on-state claims (not checked); "battery cameras go dark", which conflicts with the later microSD point.
- **Smart light switches:** "only two involve rewiring" understates it; "costs you nothing extra" (body and FAQ); "about six devices"; the fuses/RCD age heuristic.
- **Bathroom humidity:** "almost all fans are hardwired" and the roof-cavity venting claims; the city and 68%/45% examples; the trigger numbers in the body, key takeaways and FAQs 1, 3 and 4 (the NCC run-on is 10 minutes); placement distances; the "E-ink" display (T315 vs T310); Zigbee battery claims; call-out costs. The renters section has no pointer to a tenancy authority.
- **Movie-night lighting:** "240V"; "Only" in the key takeaways; whether Sonos Ray TV audio shows as `playing` in Home Assistant; the Tapo P100 platform support (not re-checked).

On publish, `dateModified` is set to 24 Sep 2026 and `publishDate` to each post's original `publishedAt` (a REST update resets `publishedAt`).

---

## keep-security-cameras-running-blackout-nbn-outage

[VERIFY] tags: 16 → 0. Words: 1248 → 1553.

### Decisions and sources

16 [VERIFY] tags (11 body, 5 FAQ; none in excerpt or keyTakeaways). No placeholder text (TODO/TBD/lorem/template instructions) found.

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "FTTP ... optional battery backup unit ... intended to support the phone port rather than data [VERIFY]" | a | FTTP box needs mains power; nbn stopped offering new battery back-up units from June 2024; the feature was designed for voice services in an outage | https://www.nbnco.com.au/learn/what-happens-in-a-power-blackout ; https://www.nbnco.com.au/learn/network-technology/fibre-to-the-premises-explained-fttp/battery-back-up-information ; https://www.nbnco.com.au/content/dam/nbn/documents/sell/wba/2023/notification-of-product-feature-withdrawal-uni-v-and-battery-backup-for-ethernet-fibre-20230526.pdf.coredownload.pdf |
| 2 | Body: "On FTTN and FTTC, the street-side equipment has its own power and battery arrangements [VERIFY]" | a (corrected) | Original was wrong for FTTC: the in-home connection box powers the FTTC service. FTTN/FTTB/HFC/fixed wireless fail during a power outage in nbn's network or at your premises | https://www.nbnco.com.au/learn/network-technology/fibre-to-the-curb-explained-fttc ; https://www.nbnco.com.au/learn/what-happens-in-a-power-blackout |
| 3 | Body: "modem-plus-router pair draws roughly 15–30W combined [VERIFY]" | b | Depends on models; measure with a plug-in energy meter or UPS display; adapter rating is a maximum | (method; no figure stated) |
| 4 | Body: "PoE switch with three or four cameras ... perhaps 40–60W [VERIFY]" | b | Measure the PoE switch plus cameras too; the total rises per camera and with night IR/spotlight | (method; no figure stated) |
| 5 | Body: "650–1000VA ... roughly $130–$300 ... Officeworks, JB Hi-Fi and Amazon AU [VERIFY]" | a | At time of writing: CyberPower 650VA $129 (JB Hi-Fi, Officeworks), CyberPower 1000VA $259 (JB Hi-Fi); "prices change". Amazon AU dropped (not checked) | https://www.jbhifi.com.au/products/cyberpower-ut-series-650va-360w-backup-ups-system ; https://www.jbhifi.com.au/products/cyberpower-vp1000elcd-1000va-550w-backup-ups-systems ; https://www.officeworks.com.au/shop/officeworks/p/cyberpower-650va-backup-utility-powerboard-ups-in3229148 |
| 6 | Body: "runtime on a 25W network load is often in the one-to-three-hour range [VERIFY]" | b | Runtime depends on measured load, battery size and age; use the maker's runtime chart; CyberPower says published runtimes are approximate | https://www.cyberpower.com/au/en/blog/how-much-runtime-do-i-really-need |
| 7 | Body: "Network gear and camera power supplies usually tolerate [simulated sine] fine [VERIFY]" | a | Simulated sine confirmed on the CyberPower 1000VA model; CyberPower says active-PFC supplies need pure sine; check PSU specs or buy pure sine. Unsourced "usually tolerate fine" removed | https://www.jbhifi.com.au/products/cyberpower-vp1000elcd-1000va-550w-backup-ups-systems ; https://www.cyberpower.com/global/en/product/series/pfc_sinewave_gen._1 |
| 8 | Body: "500Wh ... 25W ... roughly 17 hours before losses, so call it 14 [VERIFY]" | b | Arithmetic was wrong (500/25 = 20 h, not 17). Now: 20 h on paper, shorter in practice; losses vary by model, check the maker's efficiency/runtime figure. The unsourced "about 15%" loss figure was removed | (arithmetic; no source needed) |
| 9 | Body: "automatic switchover ... [VERIFY on the specific model — many power stations switch over in tens of milliseconds...]" | a | Check the spec sheet: EcoFlow lists <10 ms for RIVER 3 (UPS); EcoFlow notes many "UPS" power stations are 30 ms or more; some lack the feature | https://www.ecoflow.com/au/river-3-ups-portable-power-station ; https://www.ecoflow.com/us/blog/use-portable-power-station-as-ups-power-supply |
| 10 | Body: "licensed electrician territory under AS/NZS wiring rules ... [VERIFY current requirements with your electrician]" | c | Wiring changes are licensed-electrician work; cites Energy Safe Victoria as an example (wiring changes, generator back-feed); rules differ by state, check your regulator. AS/NZS claim removed | https://www.energysafe.vic.gov.au/community-safety/emergencies/using-generator-safely |
| 11 | Body: "UPS batteries typically need replacing every three to five years [VERIFY against your model's documentation]" | a | Schneider Electric (APC): VRLA 3–5 years, lithium-ion 8–10, shortened by heat and power quality | https://www.se.com/us/en/faqs/FAQ000265093/ |
| 12 | FAQ 1607: "draws roughly 15-30W combined [VERIFY]" | b | Measure actual draw with an energy meter / UPS display | (method) |
| 13 | FAQ 1607: "one-to-three-hour range on a 25W load [VERIFY]" | b | Look up measured load on the maker's runtime chart; runtimes approximate and fall with battery age; test it | https://www.cyberpower.com/au/en/blog/how-much-runtime-do-i-really-need |
| 14 | FAQ 1609: "around $130-$300 from ... Officeworks, JB Hi-Fi and Amazon AU [VERIFY]" | a | $129 (650VA, JB Hi-Fi/Officeworks) to $259 (1000VA, JB Hi-Fi) at time of writing; prices change | same as #5 |
| 15 | FAQ 1609: "every three to five years [VERIFY against your model's documentation]" | a | Schneider Electric: sealed lead-acid 3–5 years, less in heat; check your documentation | https://www.se.com/us/en/faqs/FAQ000265093/ |
| 16 | FAQ 1610: "fast enough that your gear doesn't reboot [VERIFY on the specific model]" | b | Switchover times differ and some models lack the feature; check the exact model's spec sheet | https://www.ecoflow.com/au/river-3-ups-portable-power-station ; https://www.ecoflow.com/us/blog/use-portable-power-station-as-ups-power-supply |

Totals: a = 8 (#1, 2, 5, 7, 9, 11, 14, 15), b = 7 (#3, 4, 6, 8, 12, 13, 16), c = 1 (#10). 12 unique source URLs opened.

#### Consistency edits (untagged)

1. **keyTakeaways**: removed "A small 650–1000VA UPS typically covers a 25W network load for one to three hours." (unverified runtime, see #6) and replaced it with "Measure your network gear's actual load and check it against the UPS maker's runtime chart, rather than relying on the VA rating, to see how long it will last."
2. **FAQ 1607**: added "Published runtimes are approximate and fall as the battery ages, so time a real test by unplugging the UPS", to match the body's runtime guidance and checklist.
3. **Body checklist**: the battery-life sentence now also mentions lithium-ion (8–10 years) and heat, to match source #11.
4. The excerpt needed no change. FAQ 1608 and 1611 are unchanged.

#### Needs human legal review

- Body: "Anything involving new circuits, hardwired camera power, or a permanently installed backup supply means changes to your household wiring, and that is work for a licensed electrician ... Energy Safe Victoria ... back-feed risk. Rules differ between states ..." (electrical work, generators).
- Body (untagged, unchanged): "All of this runs on standard 240V Type I outlets." (electrical claim; see flagged list).
- Body (untagged, unchanged): "Mobile-connected cameras. Some models take their own SIM." Also the 4G/5G failover bullet. These are not legal as such, but they touch telco plans and consumer claims ("costs very little to keep active").
- Body (untagged, unchanged): "the only realistic option for renters, since there's no cabling and no drilling into someone else's walls". This touches tenancy rules: renters may need landlord consent for any mounting.
- Body (untagged, unchanged): Home Assistant/NVR recording and camera placement. There is no mention of privacy or surveillance-device law. A human should decide whether a line on recording neighbours or public areas is needed.

#### Flagged untagged sentences (not changed)

- "All of this runs on standard 240V Type I outlets." Australia's nominal supply is 230V under AS 60038, though 240V is common colloquially. Consider "230V".
- "That covers almost any suburban outage." This is an unsourced generalisation about outage length.
- "The specification implies a camera like this will keep detecting and recording locally to its hub for as long as the battery lasts". This is an inference about the Arlo Ultra 2 that was not checked. Its local storage depends on a SmartHub/base station with storage, and that hub also needs power.
- "Some smart plugs also have a configurable power-on state". It sits right after the Tapo P100 marker, and the P100 support for this was not checked.
- "a camera setup only draws a handful of watts". This is unsourced. It is plausible for a single camera but conflicts with PoE multi-camera loads, so consider softening it.
- "Even battery cameras go dark in practice, because the Wi-Fi they talk to is gone". This is broadly true, but some cameras record locally to microSD without Wi-Fi. The article says so later, so there is a slight internal tension.

### Body diff

```diff
--- before
+++ after
@@
-**Partial NBN failures.** On FTTP, the network termination device in your house needs mains power; some installations include an optional battery backup unit, and where fitted it is generally intended to support the phone port rather than data [VERIFY]. On FTTN and FTTC, the street-side equipment has its own power and battery arrangements you can't control [VERIFY]. Either way, assume your connection is down the moment your house is.
+**Partial NBN failures.** On FTTP, the nbn connection box in your house [needs mains power to work](https://www.nbnco.com.au/learn/what-happens-in-a-power-blackout). Some older installations have a battery back-up unit, but nbn [stopped offering new ones from June 2024](https://www.nbnco.com.au/learn/network-technology/fibre-to-the-premises-explained-fttp/battery-back-up-information), and the feature was designed around keeping [voice services running in a power outage](https://www.nbnco.com.au/content/dam/nbn/documents/sell/wba/2023/notification-of-product-feature-withdrawal-uni-v-and-battery-backup-for-ethernet-fibre-20230526.pdf.coredownload.pdf) rather than your home network. On FTTC, the connection box inside your home [powers the service](https://www.nbnco.com.au/learn/network-technology/fibre-to-the-curb-explained-fttc), so it drops out with your power. On FTTN, FTTB, HFC and fixed wireless, nbn says services [won't work during a power outage in its network or at your premises](https://www.nbnco.com.au/learn/what-happens-in-a-power-blackout), so a street-level or tower outage you can't control can take you offline too. Either way, assume your connection is down the moment your house is.
@@
-A typical modem-plus-router pair draws roughly 15–30W combined [VERIFY]. Add a small PoE switch with three or four cameras and you're perhaps 40–60W [VERIFY]. That's a modest load, which is why a small UPS goes a surprisingly long way.
+How much a modem-plus-router pair draws depends entirely on the models, so measure it rather than guess: a plug-in energy meter or the UPS's own load display will show the real figure, and the rating printed on each power adapter is a maximum, not typical draw. Do the same with a PoE switch and its cameras, since the total climbs with every camera and any infrared or spotlight in use at night. Network gear is usually a modest load, which is why a small UPS can go a surprisingly long way.
@@
-A consumer line-interactive UPS in the 650–1000VA class sells for roughly $130–$300 in Australia at retailers like Officeworks, JB Hi-Fi and Amazon AU [VERIFY]. Realistic runtime on a 25W network load is often in the one-to-three-hour range, depending on battery health and model [VERIFY]. Check the manufacturer's runtime chart rather than the VA number on the box — VA is a headline figure, not a promise of hours.
+Consumer UPS units in the 650–1000VA class are widely stocked in Australia; at the time of writing, for example, JB Hi-Fi listed a [CyberPower 650VA line-interactive unit at $129](https://www.jbhifi.com.au/products/cyberpower-ut-series-650va-360w-backup-ups-system) and a [CyberPower 1000VA line-interactive unit at $259](https://www.jbhifi.com.au/products/cyberpower-vp1000elcd-1000va-550w-backup-ups-systems), and Officeworks listed a [CyberPower 650VA unit at $129](https://www.officeworks.com.au/shop/officeworks/p/cyberpower-650va-backup-utility-powerboard-ups-in3229148). Prices change, so check before you buy. Runtime depends on your measured load, the battery's size and its age: find your load on the manufacturer's runtime chart rather than relying on the VA number on the box — VA is a headline figure, not a promise of hours. CyberPower itself notes its published runtimes are [approximate and vary with battery age, charge level and environment](https://www.cyberpower.com/au/en/blog/how-much-runtime-do-i-really-need), so test yours (see the checklist below).
@@
-One caveat worth knowing: many cheaper UPS units output a stepped (simulated) sine wave on battery. Network gear and camera power supplies usually tolerate this fine, but it's worth confirming compatibility with anything sensitive [VERIFY].
+One caveat worth knowing: many cheaper UPS units output a stepped (simulated) sine wave on battery — the [CyberPower 1000VA model above](https://www.jbhifi.com.au/products/cyberpower-vp1000elcd-1000va-550w-backup-ups-systems) is one. CyberPower says equipment with an [active power factor correction (PFC) power supply requires a pure sine wave source](https://www.cyberpower.com/global/en/product/series/pfc_sinewave_gen._1), so check the power supply specs of anything you plan to connect, or choose a pure sine wave UPS if you're unsure.
@@
-The practical maths is simple. Divide usable watt-hours by your load in watts, then knock about 15% off for inverter losses. A 500Wh unit running a 25W modem and router works out at roughly 17 hours before losses, so call it 14 [VERIFY]. That covers almost any suburban outage.
+The practical maths is simple. Divide the unit's usable watt-hours by your measured load in watts, then allow for inverter losses and the unit's own consumption, which vary by model — check the manufacturer's stated efficiency or runtime estimate. As a worked example, a 500Wh unit running a 25W load gives 20 hours on paper (500 ÷ 25), and real-world runtime will be shorter once those losses are counted. That covers almost any suburban outage.
@@
-Two things to check before you rely on one as backup: whether it supports pass-through charging so it can sit permanently plugged in with the router connected, and whether it has a UPS-style automatic switchover fast enough that your gear doesn't reboot [VERIFY on the specific model — many power stations switch over in tens of milliseconds, which is fine for routers, but not all models advertise it]. If it can't switch automatically, you'll be plugging things in by torchlight.
+Two things to check before you rely on one as backup: whether it supports pass-through charging so it can sit permanently plugged in with the router connected, and whether it has a UPS-style automatic switchover fast enough that your gear doesn't reboot. Check the spec sheet for the exact model: EcoFlow, for example, lists a [switchover of under 10 ms for its RIVER 3 (UPS)](https://www.ecoflow.com/au/river-3-ups-portable-power-station), but the same company notes that [many power stations advertised for UPS use switch over in 30 ms or more](https://www.ecoflow.com/us/blog/use-portable-power-station-as-ups-power-supply), and some don't offer the feature at all. If it can't switch automatically, you'll be plugging things in by torchlight.
@@
-All of this runs on standard 240V Type I outlets. Anything involving new circuits, hardwired camera power, or a permanently installed backup supply is licensed electrician territory under AS/NZS wiring rules — don't improvise it [VERIFY current requirements with your electrician].
+All of this runs on standard 240V Type I outlets. Anything involving new circuits, hardwired camera power, or a permanently installed backup supply means changes to your household wiring, and that is work for a licensed electrician — don't improvise it. Energy Safe Victoria, for example, says [any changes to household wiring must be carried out by a licensed electrician](https://www.energysafe.vic.gov.au/community-safety/emergencies/using-generator-safely) and warns against connecting a generator into a wall socket or switchboard because of the back-feed risk. Rules differ between states, so check with your electrician and your state's electrical safety regulator.
@@
-- Twice a year, pull the plug on the UPS and time how long the network stays up. UPS batteries typically need replacing every three to five years [VERIFY against your model's documentation].
+- Twice a year, pull the plug on the UPS and time how long the network stays up. Schneider Electric (APC) puts the typical life of sealed lead-acid (VRLA) UPS batteries at [three to five years, and lithium-ion at eight to ten](https://www.se.com/us/en/faqs/FAQ000265093/), with heat and power quality shortening it — check your model's documentation.
```

### Excerpt / key takeaways / FAQ changes

- keyTakeaways
  - before: Put your NBN box, modem and router on a UPS or power station first — cameras are useless if the network is dead — then enable local recording and add 4G/5G failover so alerts still reach your phone. A small 650–1000VA UPS typically covers a 25W network load for one to three hours.
  - after: Put your NBN box, modem and router on a UPS or power station first — cameras are useless if the network is dead — then enable local recording and add 4G/5G failover so alerts still reach your phone. Measure your network gear's actual load and check it against the UPS maker's runtime chart, rather than relying on the VA rating, to see how long it will last.
- FAQ 1 answer
  - before: A typical modem-and-router pair draws roughly 15-30W combined [VERIFY], and a consumer line-interactive UPS in the 650-1000VA class often delivers somewhere in the one-to-three-hour range on a 25W load [VERIFY]. Check the manufacturer's runtime chart for your model rather than trusting the VA number printed on the box, since VA is a headline figure, not a guarantee of hours.
  - after: It depends on your gear and the UPS. Measure what your modem and router actually draw with a plug-in energy meter or the UPS's load display, then look that load up on the manufacturer's runtime chart for your model rather than trusting the VA number printed on the box, since VA is a headline figure, not a guarantee of hours. Published runtimes are approximate and fall as the battery ages, so time a real test by unplugging the UPS.
- FAQ 3 answer
  - before: A consumer line-interactive UPS in the 650-1000VA class typically sells for around $130-$300 from retailers such as Officeworks, JB Hi-Fi and Amazon AU [VERIFY]. Budget for battery replacement too, as UPS batteries generally need replacing every three to five years [VERIFY against your model's documentation].
  - after: At the time of writing, 650-1000VA line-interactive units from CyberPower were listed from $129 (650VA, at JB Hi-Fi and Officeworks) to $259 (1000VA, at JB Hi-Fi); prices change, so check before you buy. Budget for battery replacement too: Schneider Electric (APC) puts typical sealed lead-acid UPS battery life at three to five years, less in hot conditions, so check your model's documentation.
- FAQ 4 answer
  - before: Yes, and it gives far more headroom for multi-hour outages. Check two things first: whether the unit supports pass-through charging so it can stay permanently plugged in, and whether it has a UPS-style automatic switchover fast enough that your gear doesn't reboot [VERIFY on the specific model].
  - after: Yes, and it gives far more headroom for multi-hour outages. Check two things first: whether the unit supports pass-through charging so it can stay permanently plugged in, and whether it has a UPS-style automatic switchover fast enough that your gear doesn't reboot. Switchover times differ between models and some don't offer the feature, so check the spec sheet for the exact model.

---

## smart-light-switches-neutral-wire-older-australian-homes

[VERIFY] tags: 12 → 0. Words: 1358 → 1502.

### Decisions and sources

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "homes wired from the 1990s onward are more likely to have a neutral … [VERIFY — practice varied by state, builder and era …]" | b | "the older the wiring, the more likely it is a switch loop … sources put the cut-off anywhere from the 1990s to the early 2000s … only reliable answer is an inspection" | https://asthome.com.au/blogs/news/retrofitting-smart-switches-in-australian-homes-the-2026-expert-guide (says "before the early 2000s"; other sources say pre-1990s, so a range) |
| 2 | Body: "only 25–35 mm of usable space behind the plate [VERIFY]" | b | mm figure removed; "usable space varies and can be very tight — some older timber-framed homes have cavities too shallow … measure the depth first" (linked) | https://asthome.com.au/blogs/news/retrofitting-smart-switches-in-australian-homes-the-2026-expert-guide |
| 3 | Body: "In every Australian state and territory … restricted to a licensed electrician, and DIY work can affect insurance and future sale obligations [VERIFY with your state …regulator]" | a | ESV quote ("even for small jobs such as changing power points or light switches") + NSW Govt (DIY illegal, can void insurance), linked; "future sale obligations" removed (not found); "check your own state or territory's regulator" | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself ; https://www.nsw.gov.au/topics/electrical-safety/in-the-home |
| 4 | Body: "expect a real quote to vary widely by location [VERIFY — get at least two quotes]" | b | "expect quotes to vary widely by location and access, and get at least two" | — (guidance, no figure) |
| 5 | Body: "Grey imports … frequently do not [VERIFY — check the supplier's compliance documentation]" | a | "may not, so ask the supplier for its compliance documentation — the RCM shows EESS + ACMA compliance, and EESS runs a public equipment register" (linked) | https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ |
| 6 | Body: "$35–$90 range per gang … [VERIFY current pricing at Bunnings, Amazon AU …]" | b | "Prices vary widely by brand, gang count and whether a bypass is included … compare current listings" | Checked https://www.bunnings.com.au/deta-grid-connect-smart-switch-mechanism_p0346912 ($58.35, neutral requirement not stated) and https://www.smarthome.com.au/product/sonoff-zigbee-smart-relay-switch-no-neutral/ ($24, a relay not a wall switch) — neither supports a per-gang no-neutral range |
| 7 | Body (Option 3): "licensed electrician, no exceptions [VERIFY with your state regulator]" | a | "fixed-wiring work for a licensed electrician — NSW Government lists installing, replacing or moving lights and switches … your own state's regulator will have equivalent rules" (linked) | https://www.nsw.gov.au/topics/electrical-safety/in-the-home |
| 8 | Body: "reversible, tenancy-friendly … [VERIFY your lease terms before making any permanent changes]" | a | "check their lease and their state's tenancy authority … in Victoria, renters can fit LED globes that don't need new fittings without consent (linked); most other changes need written approval" | https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property |
| 9 | FAQ 1557: same legal sentence as #3 "[VERIFY with your state or territory electrical safety regulator]" | a | Same as #3 in plain text; "future sale obligations" removed | ESV + NSW URLs as #3 |
| 10 | FAQ 1560: "Check your lease terms before making any permanent changes [VERIFY]." | a | Same as #8 in plain text | CAV URL as #8 |
| 11 | FAQ 1561: "roughly $35–$90 per gang … [VERIFY current pricing …]" | b | "Prices vary widely by brand, gang count and whether a bypass is included …" | As #6 |
| 12 | FAQ 1561: "grey imports frequently do not [VERIFY the supplier's compliance documentation]" | a | "grey imports may not, so ask the supplier for its compliance documentation and check the public EESS equipment register" | https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ |

Totals: a = 7, b = 5, c = 0. Placeholders (TODO/TBD/lorem/template text): none found.

#### Consistency edits (untagged)

1. excerpt: "Most Australian homes built before the 1990s run a switch loop" -> "Many older Australian homes run a switch loop" (era claim softened per #1).
2. excerpt: "what each one costs" -> "what drives the cost" (article no longer gives a price range, per #6).
3. keyTakeaways: "Most Australian homes wired before the 1990s use a switch loop" -> "Many older Australian homes use a switch loop" (per #1).

#### Needs human legal review

- Body "First, work out what you actually have": replacing a light switch is licensed electrical work; ESV/NSW quotes; DIY can void insurance (NSW); "check your own state or territory's regulator".
- Body Option 2: bypass capacitor "again, a job for a licensed electrician".
- Body Option 2: RCM / EESS / ACMA compliance statement and "legally sold for use on 240 V Australian circuits".
- Body Option 3: relay module installation is licensed fixed-wiring work; "approved for sale and installation in Australia".
- Body Option 4: renters' consent rules (Victoria example; other states differ).
- Body closing: "All fixed-wiring options in that list require a licensed electrician."
- excerpt: "where a licensed electrician is legally required".
- FAQ 1557 (legal/insurance), 1558 (bypass = licensed work), 1559 (module = licensed work, approval for sale), 1560 (tenancy consent), 1561 (RCM/grey imports).

#### Flagged untagged sentences (not changed)

- "only two of them involve rewiring anything" — Options 1, 2 (switch swap + bypass) and 3 all involve licensed fixed-wiring work; the count reads as understating it.
- "When the sparkie is on site … It costs you nothing extra" (and FAQ 1557 "at no extra cost") — a pricing claim about third-party electricians; many charge for extra time.
- "Once you are past about six devices, a mesh protocol behaves better" — unsourced specific threshold.
- "Ceramic rewireable fuses and no RCDs usually signal older wiring and a switch-loop layout" — plausible but unsourced; switchboard age does not reliably indicate lighting wiring.
- "In a traditional Australian light circuit … That wiring style was cheap, compliant" — consistent with sources (loop at light), but "compliant" is a legal characterisation without a source.
- excerpt "no neutral at the wall plate, which is exactly what a smart switch wants" — reads as the opposite of intended (a smart switch *needs* the neutral); wording left as-is.
- Option 2 "60 W incandescent … 5 W LED" flicker explanation — general, unsourced to a manufacturer manual (no tag).

### Body diff

```diff
--- before
+++ after
@@
-Roughly speaking, homes wired from the 1990s onward are more likely to have a neutral run to switch positions, and newer builds more likely again [VERIFY — practice varied by state, builder and era; the only reliable answer is an inspection]. Renovated rooms in old houses are a genuine coin toss.
+As a rough guide, the older the wiring, the more likely it is to be a switch loop with no neutral at the plate — sources put the cut-off anywhere from the 1990s to the early 2000s, and practice varied by builder and electrician. The only reliable answer is an inspection. Renovated rooms in old houses are a genuine coin toss.
@@
-There is a second, less discussed obstacle: **depth**. Australian wall plates typically mount to a shallow plaster bracket or mounting block rather than a deep gang box, so there may be only 25–35 mm of usable space behind the plate [VERIFY]. Plenty of imported smart mechanisms simply will not fold in behind a standard plate.
+There is a second, less discussed obstacle: **depth**. Australian wall plates typically mount to a shallow plaster bracket or mounting block rather than a deep gang box, so usable space behind the plate varies and can be very tight — some older timber-framed homes have cavities too shallow for a smart module and switch mechanism together, which is why [measuring the depth first](https://asthome.com.au/blogs/news/retrofitting-smart-switches-in-australian-homes-the-2026-expert-guide) matters. Plenty of imported smart mechanisms simply will not fold in behind a standard plate.
@@
-Do not open the switch yourself. In every Australian state and territory, work on fixed wiring — including swapping a light switch — is restricted to a licensed electrician, and DIY work can affect insurance and future sale obligations [VERIFY with your state or territory electrical safety regulator].
+Do not open the switch yourself. Replacing a light switch is electrical work for a licensed electrician: [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says electrical work isn't a DIY job "even for small jobs such as changing power points or light switches", and the [NSW Government](https://www.nsw.gov.au/topics/electrical-safety/in-the-home) warns that DIY electrical work is illegal and can void your insurance policy. Rules are set state by state, so check your own state or territory's electrical safety regulator.
@@
-Cost depends almost entirely on access. A single switch position under an accessible roof space is a modest job; a downstairs switch in a double-storey home with a plasterboard ceiling above it may mean patching and painting. Budget a callout fee plus labour, and expect a real quote to vary widely by location [VERIFY — get at least two quotes].
+Cost depends almost entirely on access. A single switch position under an accessible roof space is a modest job; a downstairs switch in a double-storey home with a plasterboard ceiling above it may mean patching and painting. Budget a callout fee plus labour, expect quotes to vary widely by location and access, and get at least two.
@@
-- That the product carries an **RCM mark** and is legally sold for use on 240 V Australian circuits. Grey imports from overseas marketplaces frequently do not [VERIFY — check the supplier's compliance documentation].
+- That the product carries an **RCM mark** and is legally sold for use on 240 V Australian circuits. Grey imports from overseas marketplaces may not, so ask the supplier for its compliance documentation — the [RCM](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/) shows the product meets Australia's electrical safety (EESS) and ACMA labelling requirements, and EESS runs a public equipment register you can search.
@@
-Expect somewhere in the $35–$90 range per gang for reputable no-neutral models sold locally [VERIFY current pricing at Bunnings, Amazon AU, eBay AU and specialist automation retailers].
+Prices vary widely by brand, gang count and whether a bypass is included, so compare current listings at local retailers such as Bunnings and specialist automation stores rather than relying on a rule of thumb.
@@
-Caveats: the module has to physically fit in the canopy, the fitting must not run hot around it, and installation is fixed-wiring work — licensed electrician, no exceptions [VERIFY with your state regulator]. Also confirm the specific module is approved for sale and installation in Australia; the specification sheet, not the marketplace listing, is what matters.
+Caveats: the module has to physically fit in the canopy, the fitting must not run hot around it, and installation is fixed-wiring work for a licensed electrician — the [NSW Government](https://www.nsw.gov.au/topics/electrical-safety/in-the-home) lists installing, replacing or moving lights and switches among the jobs you should never attempt unless you are qualified, and your own state's regulator will have equivalent rules. Also confirm the specific module is approved for sale and installation in Australia; the specification sheet, not the marketplace listing, is what matters.
@@
-Neither approach gives you the tactile satisfaction of a wall switch, but both are reversible, tenancy-friendly and cost a fraction of rewiring [VERIFY your lease terms before making any permanent changes].
+Neither approach gives you the tactile satisfaction of a wall switch, but both are reversible and cost a fraction of rewiring. Renters should still check their lease and their state's tenancy authority before changing anything — in Victoria, for example, [renters can fit LED globes that don't need new fittings without consent](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property), while most other changes need the rental provider's written approval.
```

### Excerpt / key takeaways / FAQ changes

- excerpt
  - before: Most Australian homes built before the 1990s run a switch loop with no neutral at the wall plate, which is exactly what a smart switch wants. Here are the five realistic ways around it, what each one costs, where flicker comes from, and where a licensed electrician is legally required.
  - after: Many older Australian homes run a switch loop with no neutral at the wall plate - and a neutral is exactly what most smart switches need. Here are the five realistic ways around it, what drives the cost, where flicker comes from, and where you need a licensed electrician.
- keyTakeaways
  - before: Most Australian homes wired before the 1990s use a switch loop, so there is no neutral at the wall plate and standard smart switches will not work. Your realistic options are to have a licensed electrician run a neutral, use a no-neutral switch with a bypass capacitor, fit a relay module at the ceiling where the neutral already is, or skip wiring entirely with smart globes and plugs.
  - after: Many older Australian homes use a switch loop, so there is no neutral at the wall plate and standard smart switches will not work. Your realistic options are to have a licensed electrician run a neutral, use a no-neutral switch with a bypass capacitor, fit a relay module at the ceiling where the neutral already is, or skip wiring entirely with smart globes and plugs.
- FAQ 1 answer
  - before: No. In every Australian state and territory, work on fixed wiring — including swapping a light switch — is restricted to a licensed electrician, and DIY work can affect insurance and future sale obligations [VERIFY with your state or territory electrical safety regulator]. Ask your sparkie to pull one plate and photograph it next time they're on site; it settles the neutral question at no extra cost.
  - after: No. Replacing a light switch is electrical work for a licensed electrician. Energy Safe Victoria says electrical work isn't a DIY job even for small jobs such as changing light switches, and the NSW Government warns DIY electrical work is illegal and can void your insurance. Rules are set by each state and territory, so check your local electrical safety regulator. Ask your sparkie to pull one plate and photograph it next time they're on site; it settles the neutral question at no extra cost.
- FAQ 4 answer
  - before: Smart globes in existing fittings, with the wall switch left permanently on and a battery-powered wireless button stuck beside the plate so guests don't cut power, plus smart plugs for lamps. Both are reversible, cost a fraction of rewiring and don't touch fixed wiring. Check your lease terms before making any permanent changes [VERIFY].
  - after: Smart globes in existing fittings, with the wall switch left permanently on and a battery-powered wireless button stuck beside the plate so guests don't cut power, plus smart plugs for lamps. Both are reversible, cost a fraction of rewiring and don't touch fixed wiring. Check your lease and your state or territory tenancy authority before changing anything — in Victoria, for example, renters can fit LED globes that don't need new fittings without consent, but most other changes need the rental provider's written approval.
- FAQ 5 answer
  - before: Expect roughly $35–$90 per gang for reputable no-neutral models sold locally [VERIFY current pricing at Bunnings, Amazon AU, eBay AU and specialist automation retailers]. Before buying, check the LED load ratings at 240 V, whether a bypass is included or sold separately, and that the product carries an RCM mark — grey imports frequently do not [VERIFY the supplier's compliance documentation].
  - after: Prices vary widely by brand, gang count and whether a bypass is included, so compare current listings at local retailers rather than relying on a rule of thumb. Before buying, check the LED load ratings at 240 V, whether a bypass is included or sold separately, and that the product carries an RCM mark — grey imports may not, so ask the supplier for its compliance documentation and check the public EESS equipment register.

---

## bathroom-humidity-sensor-exhaust-fan-automation-australia

[VERIFY] tags: 9 → 0. Words: 1429 → 1520.

### Decisions and sources

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "...ducting terminates at an eave or roof vent [VERIFY: depends on your build and applicable AS/NZS ventilation requirements]" | a (hedged) | Kept the check advice; added that current NCC housing provisions call for bathroom exhaust to discharge to outdoor air; what applies to an existing home should be checked with a builder, certifier or state building authority | https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management |
| 2 | Body: "between roughly 40% and 60% is the commonly cited comfort and health band ... above 60% [VERIFY — guidance varies...]" | b | "Recommended ranges vary between sources"; National Asthma Council suggests 30–50% where possible, mould can grow above 55%, ~70% ideal for mould. The unsupported 40–60% band was removed | https://www.nationalasthma.org.au/resources/indoor-humidity-levels |
| 3 | Body: "(often well under $30 [VERIFY])" | b | "usually cheap enough (prices vary by retailer and model)" (no price figure) | none (no price source; figure removed) |
| 4 | Body: "fixed wiring work must be carried out by a licensed electrician ... [VERIFY — licensing requirements are set state by state...]" | a | Licensed-electrician work; licensing is regulated state by state, check your state regulator; ESV example quote on switches | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| 5 | Body: "zone restrictions ... under AS/NZS 3000 [VERIFY]" | c | "Bathrooms also carry wiring-rule restrictions on where switches and other accessories can go; your electrician works to these, and your state regulator can answer questions" (the standard is paywalled; no official or regulator summary opened) | none: points to electrician/state regulator |
| 6 | Body: "small smart plugs have real limits [VERIFY the specific current rating on the model you buy]" | a | TP-Link lists AU Tapo P100 at max 10A / 2300W, recommends continuous loads at or below 80%; check the rating of any other model | https://www.tp-link.com/au/home-networking/smart-plug/tapo-p100/ ; https://www.tp-link.com/au/support/faq/4324/ |
| 7 | FAQ 2: "...fitting an in-wall relay [VERIFY: licensing requirements are set state by state...]" | a | Same as #4, in plain text (no link) | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| 8 | FAQ 2: "zone restrictions ... under AS/NZS 3000 [VERIFY]" | c | Same as #5: "wiring-rule restrictions ... which your electrician works to" | none: points to electrician |
| 9 | FAQ 5: "check the plug's rated current against the appliance first [VERIFY the rating on the specific model]" | a | P100 10A / 2300W max, 80% for continuous loads, other models differ | https://www.tp-link.com/au/home-networking/smart-plug/tapo-p100/ ; https://www.tp-link.com/au/support/faq/4324/ |

Placeholders (TODO/TBD/lorem/template instructions): none found.

#### Consistency edits (untagged)

- None needed. Excerpt and keyTakeaways contain no tags and nothing that contradicts the corrections, so they are unchanged. The humidity-band correction (#2) is not repeated in the metadata. FAQ 2 and FAQ 5 only changed where tags were handled (#7–#9).

#### Needs human legal review

- Body, "Start Here": "switching it automatically means a licensed electrician installs a smart relay or a smart switch ... That is not a DIY job in Australia." (electrical licensing, stated nationally)
- Body, rewritten #4/#5 paragraph on licensed work and bathroom wiring-rule restrictions (electrical).
- Body, rewritten #1 sentence on NCC exhaust discharge to outdoor air (building code; NCC 2022 10.8.2 also has flow-rate and run-on/interlock provisions not mentioned).
- Body: "Ask the electrician to confirm the fan is rated for extended run times and that the duct discharges outside." (electrical/building)
- FAQ 2 answer (electrical licensing and wiring rules).
- Body/FAQ 5: dehumidifier on a smart plug, and P100 load rating (electrical product safety).
- Body, humidity/mould paragraph (#2) and "You can still cut mould risk substantially without touching the wiring" (health).
- Renting section / FAQ 5: gives renters no tenancy context; mould repair obligations sit with state tenancy authorities (tenancy law). Consider a pointer to the state tenancy authority.

#### Flagged untagged sentences (not changed)

- "If your fan is hardwired (almost all Australian bathroom fans are)": unsourced generalisation.
- "a lot of older Australian housing stock has an exhaust fan that vents into the roof cavity ... can cause insulation and framing issues": unsourced.
- "Melbourne, Hobart, Canberra and the Adelaide Hills see this badly"; "A Sydney bathroom might sit at 68% ... and 45%" (also in FAQ 3): illustrative figures with no source.
- Trigger numbers "8 to 12 percentage points", "within about 3 points", "30 to 40 minutes", and the 15–20 min run-on (body, keyTakeaways, FAQ 3/4): these read as invented precision and have no source. Note that the NCC run-on provision for new work is 10 minutes after the light switch goes off.
- Placement rules "1.5m high, at least 1m from the shower screen" (body, keyTakeaways, FAQ 1): editorial rules with no source.
- "the E-ink style display" on the Tapo monitor: confirm which model the product slug maps to (T315 has e-ink; T310 does not).
- "Zigbee sensors typically report faster and last longer on a coin cell": unsourced generalisation.
- "replacing it with a higher-flow model at the same time is usually cheaper than two separate call-outs": unsourced cost claim.

### Body diff

```diff
--- before
+++ after
@@
-The other factor is that a lot of older Australian housing stock has an exhaust fan that vents into the roof cavity rather than outside. That moves the problem rather than solving it, and it can cause insulation and framing issues over time. If you're unsure where yours discharges, that's worth checking before you automate anything — an electrician or handyperson can confirm whether the ducting terminates at an eave or roof vent [VERIFY: depends on your build and applicable AS/NZS ventilation requirements].
+The other factor is that a lot of older Australian housing stock has an exhaust fan that vents into the roof cavity rather than outside. That moves the problem rather than solving it, and it can cause insulation and framing issues over time. If you're unsure where yours discharges, that's worth checking before you automate anything — an electrician or handyperson can confirm whether the ducting terminates at an eave or roof vent. The current National Construction Code housing provisions call for bathroom exhaust to [discharge to outdoor air](https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management), but what applies to an existing home depends on when it was built and on any new work — check with a builder, building certifier or your state building authority rather than assuming.
@@
-Indoor relative humidity between roughly 40% and 60% is the commonly cited comfort and health band, with mould risk rising as you sit above 60% for extended periods [VERIFY — guidance varies between health authorities and building sources]. But absolute thresholds make poor automation triggers in a bathroom, for two reasons.
+Recommended indoor humidity ranges vary between sources. The National Asthma Council, for example, suggests [keeping indoor relative humidity between 30% and 50% where possible](https://www.nationalasthma.org.au/resources/indoor-humidity-levels), noting that mould can grow above 55% and that around 70% is ideal for it. But absolute thresholds make poor automation triggers in a bathroom, for two reasons.
@@
-Budget Tuya/Smart Life sensors are cheap enough (often well under $30 [VERIFY]) that you can put one in the bathroom and one in the hallway for a baseline comparison. If you run Home Assistant, check before buying whether the model exposes local control or is cloud-only — that determines whether your automation still works when the NBN drops out.
+Budget Tuya/Smart Life sensors are usually cheap enough (prices vary by retailer and model) that you can put one in the bathroom and one in the hallway for a baseline comparison. If you run Home Assistant, check before buying whether the model exposes local control or is cloud-only — that determines whether your automation still works when the NBN drops out.
@@
-In Australia, fixed wiring work must be carried out by a licensed electrician, and that includes replacing a bathroom fan switch with a smart switch or installing an in-wall relay behind the existing plate [VERIFY — licensing requirements are set state by state; confirm with your state's electrical regulator]. Bathrooms also have zone restrictions around where switchgear and accessories can be located under AS/NZS 3000 [VERIFY]. Please don't take the plate off and have a go.
+Replacing a bathroom fan switch with a smart switch or installing an in-wall relay behind the existing plate is fixed wiring work for a licensed electrician. Licensing is regulated state by state, so check with your state's electrical safety regulator — Energy Safe Victoria, for example, says [electrical work isn't a DIY job, even for small jobs such as changing power points or light switches](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself). Bathrooms also carry wiring-rule restrictions on where switches and other accessories can go; your electrician works to these, and your state regulator can answer questions about them. Please don't take the plate off and have a go.
@@
-A compact 240V smart plug like the Tapo P100 lets you run the dehumidifier only when the bathroom is genuinely damp, rather than leaving it running and paying for it. Check the plug's rated load against the appliance before you commit — dehumidifiers and heaters draw far more than a lamp, and small smart plugs have real limits [VERIFY the specific current rating on the model you buy].
+A compact 240V smart plug like the Tapo P100 lets you run the dehumidifier only when the bathroom is genuinely damp, rather than leaving it running and paying for it. Check the plug's rated load against the appliance before you commit — dehumidifiers and heaters draw far more than a lamp, and small smart plugs have real limits. TP-Link lists the AU Tapo P100 at a [maximum load of 10A / 2300W](https://www.tp-link.com/au/home-networking/smart-plug/tapo-p100/) and recommends [keeping continuous loads at 80% or less of that](https://www.tp-link.com/au/support/faq/4324/); check the rating on whichever model you buy.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 2 answer
  - before: No — fixed wiring work in Australia must be done by a licensed electrician, and that includes swapping a fan switch for a smart switch or fitting an in-wall relay [VERIFY: licensing requirements are set state by state; confirm with your state's electrical regulator]. Bathrooms also have zone restrictions on where switchgear can sit under AS/NZS 3000 [VERIFY]. Get a quote for a relay module that keeps the manual switch working.
  - after: No — swapping a fan switch for a smart switch or fitting an in-wall relay is fixed wiring work for a licensed electrician. Licensing is regulated state by state, so check with your state's electrical safety regulator; Energy Safe Victoria, for example, says even changing a light switch isn't a DIY job. Bathrooms also carry wiring-rule restrictions on where switches and accessories can go, which your electrician works to. Get a quote for a relay module that keeps the manual switch working.
- FAQ 5 answer
  - before: Use a battery humidity sensor to trigger phone notifications — one telling you to switch the fan on, another 20 minutes later saying you can switch it off. Better still, put a plug-in dehumidifier on a 240V smart plug controlled by the humidity reading, but check the plug's rated current against the appliance first [VERIFY the rating on the specific model]. Leaving the shower screen open, squeegeeing the walls and propping the door ajar all help and cost nothing.
  - after: Use a battery humidity sensor to trigger phone notifications — one telling you to switch the fan on, another 20 minutes later saying you can switch it off. Better still, put a plug-in dehumidifier on a 240V smart plug controlled by the humidity reading, but check the plug's rated load against the appliance first — TP-Link lists the AU Tapo P100 at 10A / 2300W maximum and recommends keeping continuous loads to 80% or less of that, and other models differ. Leaving the shower screen open, squeegeeing the walls and propping the door ajar all help and cost nothing.

---

## movie-night-lighting-scenes-you-can-build-without-touching-the-switchboard

[VERIFY] tags: 8 → 0. Words: 1208 → 1371.

### Decisions and sources

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body intro: "Budget roughly $120-$250 for a small lounge room [VERIFY]" | b | "What it costs depends on how many lamps you convert and which ecosystem... price ... from current product pages" | No source supports a total budget figure; removed the number |
| 2 | Body: "Under AS/NZS wiring rules, fixed electrical work is licensed work in every state and territory ... [VERIFY]" | c | "Electrical licensing is set by each state and territory, so check your local electrical safety regulator; in Victoria, for example, Energy Safe Victoria says unqualified electrical work is illegal, even small jobs like changing light switches." (AS/NZS attribution and "every state" claim removed) | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| 3 | Body: "though tenancy rules differ by state [VERIFY]" | c | "...differ by state and territory - check with your local tenancy authority (e.g. Consumer Affairs Victoria or Qld RTA) before changing anything fixed." | https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property ; https://www.rta.qld.gov.au/during-a-tenancy/living-in-the-property/fixtures-and-structural-changes |
| 4 | Body: "never daisy-chain powerboards, and keep total load well under the board's rating [VERIFY]" | a | "plug the board straight into the wall rather than into another board or a piggybacked adaptor (ESV advises avoiding piggybacking adaptors in favour of a power board with a built-in safety device), and keep the total load within the rating marked on the board." | https://www.energysafe.vic.gov.au/safety-education/electrical-safety-at-home/using-electricity-safely |
| 5 | Body: "button ... costs around $25-$40 [VERIFY]" | b | "varies a lot in price by brand and by whether it needs a hub (e.g. Philips Hue Smart Button: Bluetooth + Zigbee, needs a Hue Bridge for some features), so check the current product page" | https://www.philips-hue.com/en-au/p/hue-smart-button/8719514342682 (listed AUD $54.95 when checked); https://www.jbhifi.com.au/products/philips-hue-smart-button ($49 when checked). Both above the claimed $25-$40 range |
| 6 | Body: "Confirm current app and platform support before buying on that basis [VERIFY]" | a | "Home Assistant's Sonos integration exposes Sonos speakers as media players, and `playing` is one of the standard media player states. Support in other platforms' routines varies, so confirm..." | https://www.home-assistant.io/integrations/sonos/ ; https://www.home-assistant.io/integrations/media_player/ |
| 7 | FAQ 1: "tenancy rules on alterations differ by state [VERIFY]" | c | "tenancy rules on alterations and electrical licensing are set by each state and territory, so check with your local tenancy authority and electrical safety regulator." | Same as #2 and #3 (plain text, no links) |
| 8 | FAQ 5: "button ... costs roughly $25-$40 [VERIFY]" | b | "varies in price by brand and by whether it needs a hub, so check the current product page" | Same as #5 |

#### Consistency edits (untagged)

- Excerpt: "nothing your landlord can object to" changed to "nothing fixed to the property". The body now says tenancy rules vary and points readers to tenancy authorities (#3), so the excerpt should not make an absolute claim about what landlords can object to.
- FAQ 1 answer: added "and electrical licensing" to the tagged sentence so it matches the body change (#2): licensing is set by each state and territory, not a single AS/NZS rule.
- keyTakeaways: not changed. It has no price or tenancy claim that conflicts with the corrections (see the flag below).

#### Needs human legal review

- Body: "Requires a licensed electrician in Australia: replacing a wall switch with a smart dimmer, installing an in-ceiling relay module, changing hardwired downlights, or anything at the switchboard." (national statement; only Victoria's regulator was cited)
- Body (rewritten, #2): the sentence on state licensing that cites Energy Safe Victoria.
- Body (rewritten, #3): "If you rent, plug-in gear also avoids the whole 'do I need written permission to alter the premises' conversation..." plus the pointer to tenancy authorities.
- Body: "Anything that plugs into a socket or screws into an existing lamp holder is yours to play with. Anything behind a wall plate is not." and the "Safe to DIY" list.
- Body (rewritten, #4): the powerboard and load-rating caution.
- Excerpt: "no wiring, no electrician, and nothing fixed to the property".
- keyTakeaways: "Only hardwired dimmers, ceiling modules and switchboard work require a licensed electrician."
- FAQ 1 answer as a whole (rental plus electrician).

#### Flagged untagged sentences (not changed)

- "standard Australian 240V Type I sockets": the nominal supply is 230V under current standards (240V is common in practice). Consider saying "230V".
- keyTakeaways "Only hardwired dimmers, ceiling modules and switchboard work require a licensed electrician": "Only" is an absolute legal statement, and regulators say any fixed electrical work needs a licence. Consider "Hardwired ... and any other fixed wiring work".
- Sonos Ray paragraph: the Ray connects to the TV by optical. I did not verify that TV audio (as opposed to streamed music) reports `playing` in Home Assistant. Check this before promising that TV playback triggers the scene.
- "Voice ... works with any assistant-linked bulb" and "Zigbee or Thread bulbs with a hub ... switch in unison": general claims with no source.
- Tapo P100 paragraph: "handles scheduling and scene membership through its own app plus Google Home and Alexa" is not tagged and was not re-checked against the TP-Link AU page.

### Body diff

```diff
--- before
+++ after
@@
-**Practical takeaway:** build the scene around lamps you already own. Swap the bulbs for smart ones (or put a dumb lamp on a smart plug), add a USB-powered backlight behind the screen, then group the whole lot into one scene in your app. Budget roughly $120-$250 for a small lounge room [VERIFY], and you can take every piece of it with you when you move.
+**Practical takeaway:** build the scene around lamps you already own. Swap the bulbs for smart ones (or put a dumb lamp on a smart plug), add a USB-powered backlight behind the screen, then group the whole lot into one scene in your app. What it costs depends on how many lamps you convert and which ecosystem you buy into, so price the bulbs, plugs and strip from current product pages before you start - and you can take every piece of it with you when you move.
@@
-Requires a licensed electrician in Australia: replacing a wall switch with a smart dimmer, installing an in-ceiling relay module, changing hardwired downlights, or anything at the switchboard. Under AS/NZS wiring rules, fixed electrical work is licensed work in every state and territory - don't treat a smart dimmer module as a weekend job [VERIFY]. If you rent, plug-in gear also avoids the whole "do I need written permission to alter the premises" conversation, though tenancy rules differ by state [VERIFY].
+Requires a licensed electrician in Australia: replacing a wall switch with a smart dimmer, installing an in-ceiling relay module, changing hardwired downlights, or anything at the switchboard. Electrical licensing is set by each state and territory, so check your local electrical safety regulator; in Victoria, for example, [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says unqualified electrical work is illegal, even small jobs like changing light switches. Don't treat a smart dimmer module as a weekend job. If you rent, plug-in gear also avoids the whole "do I need written permission to alter the premises" conversation, though tenancy rules differ by state and territory - check with your local tenancy authority (for example [Consumer Affairs Victoria](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property) or Queensland's [Residential Tenancies Authority](https://www.rta.qld.gov.au/during-a-tenancy/living-in-the-property/fixtures-and-structural-changes)) before changing anything fixed.
@@
-A board with independently controlled outlets lets your scene switch the backlight and, say, a side lamp while leaving the TV and modem untouched. Two cautions: never daisy-chain powerboards, and keep total load well under the board's rating [VERIFY].
+A board with independently controlled outlets lets your scene switch the backlight and, say, a side lamp while leaving the TV and modem untouched. Two cautions: plug the board straight into the wall rather than into another board or a piggybacked adaptor ([Energy Safe Victoria](https://www.energysafe.vic.gov.au/safety-education/electrical-safety-at-home/using-electricity-safely) advises avoiding piggybacking adaptors in favour of a power board with a built-in safety device), and keep the total load within the rating marked on the board.
@@
-- **A physical button.** A battery-powered Zigbee or Bluetooth button stuck to the coffee table costs around $25-$40 [VERIFY] and is the most spouse-friendly option in the house.
+- **A physical button.** A battery-powered Zigbee or Bluetooth button stuck to the coffee table varies a lot in price by brand and by whether it needs a hub (the [Philips Hue Smart Button](https://www.philips-hue.com/en-au/p/hue-smart-button/8719514342682), for example, supports both Bluetooth and Zigbee but needs a Hue Bridge for some features), so check the current product page - and it is the most spouse-friendly option in the house.
@@
-In Home Assistant, a Sonos media player entity changing to `playing` is a perfectly good automation trigger - add a condition for after sunset so an afternoon podcast doesn't black out the lounge room. Confirm current app and platform support before buying on that basis [VERIFY].
+In Home Assistant, a Sonos media player entity changing to `playing` is a perfectly good automation trigger - add a condition for after sunset so an afternoon podcast doesn't black out the lounge room. Home Assistant's [Sonos integration](https://www.home-assistant.io/integrations/sonos/) exposes Sonos speakers as media players, and `playing` is one of the standard [media player states](https://www.home-assistant.io/integrations/media_player/). Support in other platforms' routines varies, so confirm it on the current app and platform pages before buying on that basis.
```

### Excerpt / key takeaways / FAQ changes

- excerpt
  - before: Plug-in lamps, a couple of smart bulbs and a backlight strip are enough to build a proper cinema scene in an Australian lounge room - no wiring, no electrician, and nothing your landlord can object to. Here's how to lay it out, dim it and trigger it.
  - after: Plug-in lamps, a couple of smart bulbs and a backlight strip are enough to build a proper cinema scene in an Australian lounge room - no wiring, no electrician, and nothing fixed to the property. Here's how to lay it out, dim it and trigger it.
- FAQ 1 answer
  - before: Not for plug-in gear. Smart bulbs in existing lamps or batten fittings, smart plugs and powerboards, and USB or low-voltage LED strips are all yours to install and take with you. A licensed electrician is required for anything fixed - replacing a wall switch with a smart dimmer, in-ceiling relay modules, hardwired downlights or switchboard work - and tenancy rules on alterations differ by state [VERIFY].
  - after: Not for plug-in gear. Smart bulbs in existing lamps or batten fittings, smart plugs and powerboards, and USB or low-voltage LED strips are all yours to install and take with you. A licensed electrician is required for anything fixed - replacing a wall switch with a smart dimmer, in-ceiling relay modules, hardwired downlights or switchboard work - and tenancy rules on alterations and electrical licensing are set by each state and territory, so check with your local tenancy authority and electrical safety regulator.
- FAQ 5 answer
  - before: Voice is the free option - "Hey Google, movie night" works with any assistant-linked bulb. A battery-powered Zigbee or Bluetooth button on the coffee table costs roughly $25-$40 [VERIFY] and is the most household-friendly. If your streamer or soundbar reports playback state, playback starting can trigger the dim automatically - add an after-sunset condition so an afternoon podcast doesn't black out the room.
  - after: Voice is the free option - "Hey Google, movie night" works with any assistant-linked bulb. A battery-powered Zigbee or Bluetooth button on the coffee table varies in price by brand and by whether it needs a hub, so check the current product page, and it is the most household-friendly. If your streamer or soundbar reports playback state, playback starting can trigger the dim automatically - add an after-sunset condition so an afternoon podcast doesn't black out the room.
