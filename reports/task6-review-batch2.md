# Task 6 review: batch 2 (4 articles)

Proposed fixes for every `[VERIFY]` tag in these four published articles. **Nothing has been written to Strapi.** Reply **approve** to publish all four, or name the articles or rows to change.

Decisions: **a** = verified, rewritten with the fact and an inline source link; **b** = varies, rewritten as a range or as guidance; **c** = unverifiable or legal, the claim removed and readers pointed to the authority.

Backups of each full Strapi record (draft and published) are in `exports/strapi-backup/<slug>-2026-09-24T07-08-26-197Z.json`.

## Reviewer edits beyond the tags (approve or drop them separately)

1. **Robot vacuum dock, extension leads (body, key takeaways, FAQ 2, FAQ 3).** The article said "One approved extension lead is fine". Queensland's Electrical Safety Office says extension leads should be used only temporarily, and to add power points instead. A dock stays plugged in permanently, so all four places now treat a lead as a temporary stop-gap and cite the ESO.
2. **Robot vacuum dock, invented statistic.** "Ninety per cent of 'my robot won't dock' complaints are geometry" now reads "A robot that won't dock is often a placement problem rather than a hardware fault."
3. **Zigbee mesh, transmit power.** "single-digit milliwatts" was likely wrong. It now says most devices transmit at low power, with the Zigbee2MQTT-sourced exception of amplified adapters that reach about 100 mW. The unsourced "two-year lifespans" became "run for a long time".

## Flagged by the researchers but NOT changed (your call)

- **Rooftop solar aircon:** "three to seven times that rate" (price ratio, no source); "4-6kWh" over four hours (estimate, no source); "dedicated 15A circuit" and "don't use a 10A smart plug on a split system" (electrical, no source); no caveat for households on gross metering; the heating-efficiency comparison is right in direction but has no source.
- **Zigbee mesh:** "every 6–10 metres" (body, key takeaways, FAQ 1), "three to five routers" and "10–15 minutes" have no source.
- **Robot vacuum dock:** power boards are meant for low-power items, but the Dreame manual lists 1000 W during emptying; "2.4 GHz only" has no source.
- **Streaming box:** "On a 25/5 plan… catch-up apps degrade first" (no source); "240V" (the nominal supply is 230V); Google TV coverage confirmed only for 10; "2GB RAM vs a $50 dongle" (no source); "still running iview in five years" (a forward-looking claim). The ABC iview quality help page returned 403 to the researcher, so check that link in a browser.

On publish, `dateModified` is set to 24 Sep 2026 and `publishDate` to each post's original `publishedAt` (a REST update resets `publishedAt`).

---

## reverse-cycle-air-conditioner-rooftop-solar-australia

[VERIFY] tags: 14 → 0. Words: 1253 → 1591.

### Decisions and sources

Checked 24 Sep 2026. 14 `[VERIFY]` tags: 9 in the body, 1 in keyTakeaways, 4 in the FAQ. The excerpt had none. The site renders FAQ answers and keyTakeaways as plain text (`components/Faq.tsx`), so the meta rewrites carry no markdown links. Their sources are listed here instead.

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body intro: "feed-in tariff that in many states has collapsed to single-digit cents per kilowatt-hour [VERIFY]" | a | "often only a few cents": IPART's NSW 2026-27 benchmark is 3.4-6.5c/kWh; Victoria has had no minimum FiT since 1 Jul 2025, and retailers can pay as little as zero | https://www.ipart.nsw.gov.au/sites/default/files/cm9_documents/Fact-Sheet-All-day-solar-feed-in-tariff-benchmark-tariff-2026-27.PDF ; https://www.esc.vic.gov.au/electricity-and-gas/electricity-and-gas-tariffs-and-benchmarks/minimum-feed-tariff |
| 2 | "As a rough guide for 2025: ... import rate ... 30-40c/kWh ... feed-in tariffs now sit between 2c and 8c/kWh [VERIFY]" | b | Rates vary, so take them from your bill; energy.gov.au says the FiT is much lower than the retail rate; NSW offers ranged 0-12c/kWh in May 2026; compare on Energy Made Easy / Victorian Energy Compare. The unsourced 30-40c import figure and the stale "2025" framing are removed | https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs ; IPART PDF above ; https://www.energymadeeasy.gov.au/ ; https://compare.energy.vic.gov.au/ |
| 3 | "worth roughly 25-35c [VERIFY]" | b | "worth the difference between the two", with a worked example clearly labelled hypothetical: 30c import - 5c export = 25c | (arithmetic on the labelled example; the 30c example matches the energy.gov.au example rate) |
| 4 | "draws ... around 1.8-2.2kW ... at full tilt ... [VERIFY - check your unit's nameplate and specification sheet]" | a | "typically rated at around 2kW input when cooling at rated capacity - Mitsubishi Electric's AP71 lists 2.01kW"; points to the spec sheet or Energy Rating Calculator. Note: "full tilt" was inaccurate because rated ≠ maximum (AP71 capacity range goes to 8.7kW) | https://www.mitsubishi-electric.co.nz/heatpump/i/69412B/ap71-classic-high-wall-heat-pump (manufacturer NZ site; the Daikin AU spec PDF returned 403) ; https://calculator.energyrating.gov.au/ |
| 5 | "saving roughly $1.20-$2.00 a day [VERIFY]" | b | "at the example 25c difference ... roughly $1.00-$1.50 a day" (4-6kWh × 25c) + "multiply your own kWh by your own rate gap" | (arithmetic on labelled example) |
| 6 | "must be done by a licensed electrician under AS/NZS 3000 [VERIFY current edition and your state's requirements]" | a | "a job for a licensed electrician, working to the Wiring Rules (AS/NZS 3000:2018, current edition at the time of writing) and your state's requirements - check with your state's electrical safety regulator" | https://www.standards.org.au/flagship-projects/wiring-rules |
| 7 | CT clamps: "installing them is electrical work and requires a licensed electrician ... [VERIFY with your state's electrical safety regulator]" | c | "means working inside the switchboard, so have a licensed electrician do it"; cites ESV's warning that DIY electrical work is illegal in Victoria; "rules differ between states, check with your regulator". The blanket national legal claim is removed | https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers |
| 8 | "Fronius, SolarEdge, Sungrow and Enphase all have integrations of varying maturity [VERIFY current support]" | a | Fronius: official, local, grid flow with smart meter. Enphase: official, local, net flow with consumption CT. SolarEdge: official, cloud, 15-min updates. Sungrow: no official integration, community Modbus/cloud only | https://www.home-assistant.io/integrations/fronius/ ; https://www.home-assistant.io/integrations/enphase_envoy/ ; https://www.home-assistant.io/integrations/solaredge/ ; https://github.com/mkaiser/Sungrow-SHx-Inverter-Modbus-Home-Assistant (community, confirms non-official status) |
| 9 | "some states have introduced minimum-export or curtailment rules [VERIFY with your DNSP]" | a | Distribution networks set export limits, some of them dynamic; in Victoria, the emergency backstop applies to new, upgraded and replacement systems ≤200kW from 1 Oct 2024; "check your connection agreement / installer / network". "Minimum-export" was wrong and is removed | https://www.energy.gov.au/solar/solar-system-design/size-your-solar-system ; https://www.ausnetservices.com.au/renewables/industry-solar/solar-emergency-backstop |
| 10 | keyTakeaways: "self-consume solar worth 30-40c/kWh ... [VERIFY your own rates]" | b | "instead of buying the same energy at your retailer's full import rate ... Check both rates on your bill - the gap between them is what you save" | energy.gov.au pricing page ; IPART PDF |
| 11 | FAQ 1667: "energy you'd otherwise buy at 30-40c/kWh [VERIFY]" | b | "at your retailer's full import rate, which is typically many times your feed-in tariff - check both on your bill" | energy.gov.au pricing page ; IPART PDF |
| 12 | FAQ 1668: "licensed electrician under AS/NZS 3000 [VERIFY current edition and your state's rules]" | c | "a job for a licensed electrician working to the Wiring Rules (AS/NZS 3000) - check your state's electrical safety regulator for what counts as electrical work where you live" | https://www.standards.org.au/flagship-projects/wiring-rules |
| 13 | FAQ 1669: "CT clamps require a licensed electrician [VERIFY with your state's electrical safety regulator]" | c | "fitting CT clamps means working inside the switchboard, which is a job for a licensed electrician - check with your state's electrical safety regulator" | ESV page above |
| 14 | FAQ 1671: "integrations of varying maturity [VERIFY current support]" | a | Same facts as #8, in plain text (no links, because FAQ renders as plain text) | Home Assistant integration pages above |

Totals: a = 6 (#1, 4, 6, 8, 9, 14), b = 5 (#2, 3, 5, 10, 11), c = 3 (#7, 12, 13). That makes 14 in all.

Placeholders: none found. There was no TODO, TBD, lorem or template instruction text. The stale "As a rough guide for 2025" framing was removed as part of #2.

`::product:` markers: all 4 kept unchanged. Excerpt: unchanged.

#### Needs human legal review

- Body: "Any change to hardwired circuits, isolators or dedicated aircon wiring is a job for a licensed electrician, working to the Wiring Rules (AS/NZS 3000:2018 ...)" (electrical work).
- Body: "Fitting them [CT clamps] means working inside the switchboard, so have a licensed electrician do it ... Energy Safe Victoria ... warns that doing your own electrical work is illegal" (electrical work; ESV statement is attributed and Victoria-only).
- Body: "don't try to control a split system with a standard 10A smart plug. Reverse cycle units are typically either hardwired or on a dedicated 15A circuit" (electrical safety; untagged, unsourced).
- Body: Victorian emergency backstop sentence, "applies to new, upgraded and replacement systems of 200kW or less from 1 October 2024" (regulatory; sourced to AusNet, one distributor).
- Body: "An IR bridge controller solves this without touching the wiring, which matters enormously if you're renting" (tenancy; implies no landlord consent needed).
- FAQ 1668: licensed electrician / AS/NZS 3000 answer (electrical work).
- FAQ 1669: "I'm renting - can I still do this without modifying anything? Yes..." plus the CT clamp electrician line (tenancy and electrical work).
- Sensibo/IR controllers with geofencing (untagged): location data. There is a privacy angle but no claim is made, so this is low priority.

#### Flagged untagged sentences (not changed)

1. Intro: "buying power back at three to seven times that rate". This is an unsourced price ratio. With Victorian FiTs at 0-1c, the real ratio can be much higher; with a 12c FiT it is lower. Suggest "many times that rate".
2. "Run it for four midday hours and you might consume 4-6kWh". This is an estimate, plausible from the ~2kW rated input, but unsourced.
3. "Reverse cycle units are typically either hardwired or on a dedicated 15A circuit". This is an unsourced electrical claim. The conservative direction is fine, but a reviewer should confirm it.
4. Missing caveat, suggested addition: energy.gov.au notes that early adopters on gross metering are paid for all generation, so self-consumption gives them less benefit. The article's premise does not hold for those readers.
5. "Heating at 1pm when it's 16°C outside costs meaningfully less ... than ... at 7am when it's 4°C". The direction is correct (heat pump COP falls with outdoor temperature), but it is unsourced.

### Body diff

```diff
--- before
+++ after
@@
-Most Australian homes with rooftop solar are quietly giving away their cheapest electricity. The panels peak between roughly 10am and 3pm, nobody's home, and the surplus goes to the grid for a feed-in tariff that in many states has collapsed to single-digit cents per kilowatt-hour [VERIFY]. Meanwhile the reverse cycle air conditioner - the single hungriest appliance in the house - gets switched on at 6pm when you're buying power back at three to seven times that rate.
+Most Australian homes with rooftop solar are quietly giving away their cheapest electricity. The panels peak between roughly 10am and 3pm, nobody's home, and the surplus goes to the grid for a feed-in tariff that is now often only a few cents per kilowatt-hour. In NSW, [IPART's benchmark for solar exports in 2026-27](https://www.ipart.nsw.gov.au/sites/default/files/cm9_documents/Fact-Sheet-All-day-solar-feed-in-tariff-benchmark-tariff-2026-27.PDF) is 3.4-6.5c/kWh, and in Victoria [the Essential Services Commission no longer sets a minimum feed-in tariff](https://www.esc.vic.gov.au/electricity-and-gas/electricity-and-gas-tariffs-and-benchmarks/minimum-feed-tariff) - since 1 July 2025 retailers set their own, which can be as low as zero. Meanwhile the reverse cycle air conditioner - the single hungriest appliance in the house - gets switched on at 6pm when you're buying power back at three to seven times that rate.
@@
-As a rough guide for 2025: a typical residential import rate sits somewhere around 30-40c/kWh depending on state, retailer and tariff type, while many feed-in tariffs now sit between 2c and 8c/kWh [VERIFY]. Every kilowatt-hour of solar you self-consume instead of export is therefore worth roughly 25-35c [VERIFY] - not the 5c the export would have earned.
+Both rates vary by state, retailer and tariff type, so take yours from your bill. As [energy.gov.au puts it](https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs), if you are new to solar your feed-in tariff will be much lower than the retail rate you pay to buy electricity. For a sense of the spread, [IPART's May 2026 survey of NSW offers](https://www.ipart.nsw.gov.au/sites/default/files/cm9_documents/Fact-Sheet-All-day-solar-feed-in-tariff-benchmark-tariff-2026-27.PDF) found solar feed-in tariffs ranging from 0c to 12c/kWh. You can compare plans and feed-in tariffs on [Energy Made Easy](https://www.energymadeeasy.gov.au/) (ACT, NSW, south-east Queensland, SA and Tasmania) or [Victorian Energy Compare](https://compare.energy.vic.gov.au/) in Victoria. Every kilowatt-hour of solar you self-consume instead of export is worth the difference between the two - for example, 25c on a plan that charges 30c/kWh to import and pays 5c/kWh for exports, not the 5c the export would have earned.
@@
-A 7.1kW (cooling capacity) split system usually draws somewhere around 1.8-2.2kW of electrical input at full tilt, and considerably less once it's reached setpoint and the inverter compressor throttles back [VERIFY - check your unit's nameplate and specification sheet]. Run it for four midday hours and you might consume 4-6kWh. Shift that from grid to solar and you're saving roughly $1.20-$2.00 a day [VERIFY], every day you'd have run it anyway.
+A 7.1kW (cooling capacity) split system is typically rated at around 2kW of electrical input when cooling at its rated capacity - [Mitsubishi Electric's AP71, for example, lists 2.01kW](https://www.mitsubishi-electric.co.nz/heatpump/i/69412B/ap71-classic-high-wall-heat-pump) - and draws considerably less once it's reached setpoint and the inverter compressor throttles back. Check your own unit's specification sheet or look it up in the [Energy Rating Calculator](https://calculator.energyrating.gov.au/). Run it for four midday hours and you might consume 4-6kWh. Shift that from grid to solar and, at the example 25c difference above, you're saving roughly $1.00-$1.50 a day, every day you'd have run it anyway. Multiply your own kilowatt-hours by your own rate gap for the real figure.
@@
-A note on plug-in smart switches: don't try to control a split system with a standard 10A smart plug. Reverse cycle units are typically either hardwired or on a dedicated 15A circuit, and cycling power at the plug is a poor way to control a compressor anyway. Any change to hardwired circuits, isolators or dedicated aircon wiring must be done by a licensed electrician under AS/NZS 3000 [VERIFY current edition and your state's requirements].
+A note on plug-in smart switches: don't try to control a split system with a standard 10A smart plug. Reverse cycle units are typically either hardwired or on a dedicated 15A circuit, and cycling power at the plug is a poor way to control a compressor anyway. Any change to hardwired circuits, isolators or dedicated aircon wiring is a job for a licensed electrician, working to the Wiring Rules ([AS/NZS 3000:2018](https://www.standards.org.au/flagship-projects/wiring-rules), the current edition at the time of writing) and your state's requirements - check with your state's electrical safety regulator if you're unsure what counts as electrical work where you live.
@@
-**Important:** CT clamps go around live conductors inside the switchboard. In Australia, installing them is electrical work and requires a licensed electrician - this is not a DIY job regardless of what an overseas installation video shows [VERIFY with your state's electrical safety regulator].
+**Important:** CT clamps go around live conductors inside the switchboard. Fitting them means working inside the switchboard, so have a licensed electrician do it - this is not a DIY job regardless of what an overseas installation video shows. [Energy Safe Victoria](https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers), for example, warns that doing your own electrical work is illegal and can be deadly; rules differ between states, so check with your state's electrical safety regulator.
@@
-If you have a hybrid inverter or battery system, check whether your inverter brand already exposes production and export data to Home Assistant. Fronius, SolarEdge, Sungrow and Enphase all have integrations of varying maturity [VERIFY current support], which can save you buying a separate meter.
+If you have a hybrid inverter or battery system, check whether your inverter brand already exposes production and export data to Home Assistant. Support varies by brand. Home Assistant's official [Fronius](https://www.home-assistant.io/integrations/fronius/) integration polls the inverter locally and reports grid import and export when a Fronius smart meter is fitted, and the official [Enphase Envoy](https://www.home-assistant.io/integrations/enphase_envoy/) integration reads the Envoy over your local network, with net grid flow available when it has a consumption CT. The official [SolarEdge](https://www.home-assistant.io/integrations/solaredge/) integration is cloud-based and updates only every 15 minutes, which is slow for export triggers. Sungrow has no official Home Assistant integration; community-built Modbus and cloud integrations exist. Any of these can save you buying a separate meter.
@@
-**Export limits apply.** Many networks now impose export limits or dynamic export control, and some states have introduced minimum-export or curtailment rules [VERIFY with your DNSP]. Self-consumption becomes more valuable, not less, under those conditions - which strengthens the case here.
+**Export limits apply.** In most areas your [local distribution network sets limits](https://www.energy.gov.au/solar/solar-system-design/size-your-solar-system) on how much your system can export, and some networks use dynamic export limits that only restrict exports when the grid is under pressure. Some states also require new and upgraded solar systems to support remote curtailment in an emergency - in Victoria, for example, the [solar emergency backstop](https://www.ausnetservices.com.au/renewables/industry-solar/solar-emergency-backstop) applies to new, upgraded and replacement systems of 200kW or less from 1 October 2024. Check your connection agreement, or ask your installer or distribution network, for the limits that apply to you. Self-consumption becomes more valuable, not less, under those conditions - which strengthens the case here.
```

### Excerpt / key takeaways / FAQ changes

- keyTakeaways
  - before: Yes - and the savings come from timing, not hardware. Pre-cool or pre-heat your home between roughly 10am and 3pm while your panels are producing, so you self-consume solar worth 30-40c/kWh instead of exporting it for a few cents [VERIFY your own rates]. An infrared aircon controller plus a simple schedule captures most of the benefit; export-triggered automation captures the rest.
  - after: Yes - and the savings come from timing, not hardware. Pre-cool or pre-heat your home between roughly 10am and 3pm while your panels are producing, so you use solar yourself instead of buying the same energy at your retailer's full import rate, rather than exporting it for a few cents. Check both rates on your bill - the gap between them is what you save. An infrared aircon controller plus a simple schedule captures most of the benefit; export-triggered automation captures the rest.
- FAQ 1 answer
  - before: No - the article's whole point is that timing, not storage, does most of the work. Running your split system during peak production hours turns solar you'd otherwise export for a few cents into energy you'd otherwise buy at 30-40c/kWh [VERIFY]. A well-sealed home effectively acts as a slow thermal battery for a few hours.
  - after: No - the article's whole point is that timing, not storage, does most of the work. Running your split system during peak production hours turns solar you'd otherwise export for a few cents into energy you'd otherwise buy at your retailer's full import rate, which is typically many times your feed-in tariff - check both on your bill. A well-sealed home effectively acts as a slow thermal battery for a few hours.
- FAQ 2 answer
  - before: No. Reverse cycle units are typically hardwired or on a dedicated 15A circuit, and cutting power at the plug is a poor way to control a compressor. Use an infrared bridge controller instead, and note that any change to hardwired circuits, isolators or dedicated aircon wiring must be done by a licensed electrician under AS/NZS 3000 [VERIFY current edition and your state's rules].
  - after: No. Reverse cycle units are typically hardwired or on a dedicated 15A circuit, and cutting power at the plug is a poor way to control a compressor. Use an infrared bridge controller instead, and note that any change to hardwired circuits, isolators or dedicated aircon wiring is a job for a licensed electrician working to the Wiring Rules (AS/NZS 3000) - check your state's electrical safety regulator for what counts as electrical work where you live.
- FAQ 3 answer
  - before: Yes, an IR bridge controller sits in line of sight of the indoor head unit and learns its remote commands, so no wiring is touched. That gets you scheduling, app control and automations. The switchboard-level monitoring step is the part you'd skip, since CT clamps require a licensed electrician [VERIFY with your state's electrical safety regulator].
  - after: Yes, an IR bridge controller sits in line of sight of the indoor head unit and learns its remote commands, so no wiring is touched. That gets you scheduling, app control and automations. The switchboard-level monitoring step is the part you'd skip, since fitting CT clamps means working inside the switchboard, which is a job for a licensed electrician - check with your state's electrical safety regulator.
- FAQ 5 answer
  - before: Possibly not. Check whether your inverter brand already exposes production and export figures to Home Assistant - Fronius, SolarEdge, Sungrow and Enphase all have integrations of varying maturity [VERIFY current support]. If the data is already available, you can build export-triggered automations without buying additional hardware.
  - after: Possibly not. Check whether your inverter brand already exposes production and export figures to Home Assistant - Fronius and Enphase have official Home Assistant integrations that read the system over your local network (grid export data needs a compatible meter or CT), SolarEdge's official integration is cloud-based and updates every 15 minutes, and Sungrow relies on community-built integrations. If the data is already available, you can build export-triggered automations without buying additional hardware.

---

## zigbee-mesh-garage-granny-flat-double-brick-home

[VERIFY] tags: 13 → 0. Words: 1489 → 1655.

### Decisions and sources

13 [VERIFY] tags: 9 in body, 4 in FAQ. None in the excerpt or keyTakeaways. No placeholder text (TODO/TBD/lorem/template instructions) found.

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | "commonly quoted around 10–15 dB per wall, more if it's rendered or damp [VERIFY]" | b | No figure given: attenuation depends on material and thickness (NIST also tested wet specimens); render, thickness or damp make it worse | https://www.nist.gov/publications/electromagnetic-signal-attenuation-construction-materials |
| 2 | "SMA antenna consistently outperform the PCB-antenna versions in reviews and community reports [VERIFY]" | b | ZHA docs suggest an external-antenna coordinator for more flexibility, and trying different orientations | https://www.home-assistant.io/integrations/zha/ |
| 3 | "Specifications suggest … will comfortably out-reach an all-in-one hub … [VERIFY]" | b | Main advantage is placement; actual reach depends on the model and your construction | (guidance, no claim needing a source) |
| 4 | "Older Xiaomi/Aqara sensors are famously fussy … fall off certain mains-powered devices [VERIFY]" | a | Xiaomi/Aqara fussy about routers; ZHA docs list incompatible router brands (Centralite, GE, Iris, Ledvance/OSRAM, Sylvania, Orvibo, PEQ, Securifi, SmartThings/Samsung) | https://www.home-assistant.io/integrations/zha/ |
| 5 | "must be installed by a licensed electrician under AS/NZS 3000 — DIY mains work is illegal in every Australian state and territory [VERIFY current rules in your state]" | c | Treat hardwired work as a job for a licensed electrician; rules differ by state, check your regulator; ESV (Vic) given as example | https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers |
| 6 | "15, 20 or 25 … (25 is the quietest but a handful of older devices don't support it) [VERIFY device support]" | a | ZHA recommends only 15/20/25; Z2M recommends ZLL channels 11/15/20/25; avoid 26. "25 is quietest" and "older devices don't support 25" dropped as unsourced | https://www.home-assistant.io/integrations/zha/ ; https://www.zigbee2mqtt.io/guide/configuration/zigbee-network.html |
| 7 | "Specifications indicate these multiprotocol gateways handle Zigbee and Thread simultaneously [VERIFY the exact model's …]" | b | Explains what a Matter bridge does (CSA); tells readers to check the exact model's spec sheet for Zigbee/Thread radios and Zigbee-to-Matter bridging | https://csa-iot.org/newsroom/why-bridging-matters/ |
| 8 | "tenancy and privacy obligations differ by state and change regularly [VERIFY with your state tenancy authority]" | c | Obligations differ by state and territory; check with your state or territory tenancy authority before installing | (points to authority) |
| 9 | "Anything consistently under ~50 is a marginal link … three or more weak hops … [VERIFY thresholds vary by stack]" | b | No universal LQI threshold; ZHA docs warn LQI/RSSI can mislead on their own; compare against the device's own history, look for long hop chains | https://www.home-assistant.io/integrations/zha/ |
| 10 | FAQ 2: "An external SMA antenna variant generally outperforms PCB-antenna sticks [VERIFY]." | b | ZHA docs suggest an external-antenna adapter for flexibility and trying orientations | https://www.home-assistant.io/integrations/zha/ |
| 11 | FAQ 3: "Channel 25 is usually quietest but some older devices don't support it [VERIFY device support]." | a | ZHA recommends only 15, 20 or 25; avoid 26 | https://www.home-assistant.io/integrations/zha/ |
| 12 | FAQ 4: "…licensed electrician under AS/NZS 3000, and DIY mains work is illegal across Australia [VERIFY current rules in your state]." | c | "Don't DIY it." Treat it as electrical work for a licensed electrician; rules differ by state, check your electrical safety regulator | https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers (body) |
| 13 | FAQ 5: "links consistently under about 50 are marginal … [VERIFY thresholds vary by stack]" | b | No universal threshold; LQI/RSSI can mislead; compare against history, watch hop chains | https://www.home-assistant.io/integrations/zha/ |

Totals: a = 3, b = 7, c = 3. Sources opened and cited: 5 (NIST, HA ZHA, Zigbee2MQTT zigbee-network, CSA "Why bridging matters", Energy Safe Victoria). The Zigbee2MQTT network range page (https://www.zigbee2mqtt.io/advanced/zigbee/02_improve_network_range_and_stability.html) was also opened: it supports the USB 2.0 port / extension cable advice already in the article.

#### Untagged sentences flagged (not changed)

- "Zigbee runs at 2.4 GHz with a transmit power measured in single-digit milliwatts — far lower than your Wi-Fi router." Risky/likely inaccurate: the Zigbee2MQTT adapters page says adapters whose chip name ends in "P" have power amplifiers supporting up to 20 dBm (100 mW), versus 5 dBm on others (https://www.zigbee2mqtt.io/guide/adapters/). Also touches radio power, so ACMA rules would apply. Suggest rewording or removing.
- "that's what gives battery sensors two-year lifespans": unsourced number.
- "build a chain of those routers roughly every 6–10 metres" (body, keyTakeaways and FAQ 1): unsourced distance. Distance through or around walls varies with construction. Suggest guidance-only wording.
- "Give each new router 10–15 minutes of settle time": unsourced timing (low risk).
- "Most double brick homes end up needing three to five well-placed mains-powered routers": unsourced generalisation.
- "a powerline adapter if the flat is on the same switchboard": depends on the electrical installation. Low risk, but it touches wiring.
- "Changing Zigbee channels after devices are paired can force a re-pair of some battery sensors": consistent with Zigbee2MQTT ("Some Zigbee devices do not support changing channels … you may have to re-pair it manually"). OK.

#### Needs human legal review

- Body, "Outdoor gear that isn't rated for it" bullet: hardwired relays, downlight drivers and new outdoor circuits as licensed-electrician work, and the state-regulator pointer (ESV example). Electrical work.
- FAQ 4 answer: "Don't DIY it…". Electrical work.
- Body, "When the Granny Flat Needs Its Own Hub": running a gateway over Ethernet or powerline to a detached building with its own meter box. May involve electrical or cabling work.
- Body, tenanted granny flat paragraph: hardwired devices, recording devices and control of the tenant's power. Tenancy and privacy law.
- Body, "Why Double Brick…": Zigbee transmit power compared with Wi-Fi (untagged, flagged above). Radio rules (ACMA).
- Body, channel section: advice to fix Wi-Fi and Zigbee channels in the 2.4 GHz band. Radio, low risk.
- Body, Tapo plug paragraph: rated load, and heaters or workshop machines on plugs. Electrical safety.

### Body diff

```diff
--- before
+++ after
@@
-Zigbee runs at 2.4 GHz with a transmit power measured in single-digit milliwatts — far lower than your Wi-Fi router. That's deliberate; it's what gives battery sensors two-year lifespans. It also means it has very little in reserve.
+Zigbee runs at 2.4 GHz, and most Zigbee devices transmit at low power (coordinator adapters with a power amplifier are the exception; Zigbee2MQTT lists [some that reach 20 dBm, about 100 mW](https://www.zigbee2mqtt.io/guide/adapters/)). Low power is deliberate; it's what lets battery sensors run for a long time. It also means it has very little in reserve.
@@
-- **Two skins of brick plus a cavity.** Each masonry wall can cost you an order of magnitude more attenuation than plasterboard — commonly quoted around 10–15 dB per wall, more if it's rendered or damp [VERIFY].
+- **Two skins of brick plus a cavity.** Each masonry wall costs far more signal than plasterboard, and there's no single reliable figure — [NIST measurements of construction materials](https://www.nist.gov/publications/electromagnetic-signal-attenuation-construction-materials) show attenuation depends on the material and its thickness, and they tested wet specimens too. Expect render, extra thickness or damp brick to make it worse.
@@
-3. Choose a stick with an **external antenna** if you have a choice. The variants with an SMA antenna consistently outperform the PCB-antenna versions in reviews and community reports [VERIFY].
+3. Choose a stick with an **external antenna** if you have a choice. [Home Assistant's ZHA documentation](https://www.home-assistant.io/integrations/zha/) suggests considering a coordinator with an external antenna for more flexibility, and trying different orientations of the adapter or its antenna.
@@
-This class of dongle is the standard choice for Home Assistant users running Zigbee2MQTT or ZHA. Specifications suggest a Zigbee 3.0 coordinator with an external antenna will comfortably out-reach an all-in-one hub with a hidden internal antenna [VERIFY], mostly because you can put it where you want it rather than where the power point and Ethernet port happen to be.
+This class of dongle is the standard choice for Home Assistant users running Zigbee2MQTT or ZHA. Its main advantage over an all-in-one hub with a hidden internal antenna is placement: on an extension lead you can put it where you want it rather than where the power point and Ethernet port happen to be. How far any coordinator reaches in your home depends on the model and your construction.
@@
-- **Mixing generations badly.** Older Xiaomi/Aqara sensors are famously fussy about which routers they'll stay bound to, and are known to fall off certain mains-powered devices [VERIFY].
-- **Outdoor gear that isn't rated for it.** An indoor smart plug in a carport is not weatherproof. Use IP-rated outdoor gear, and remember any **hardwired** relay, downlight driver or new outdoor circuit must be installed by a licensed electrician under AS/NZS 3000 — DIY mains work is illegal in every Australian state and territory [VERIFY current rules in your state].
+- **Mixing generations badly.** Xiaomi/Aqara devices are fussy about which routers they'll stay connected to — [Home Assistant's ZHA documentation](https://www.home-assistant.io/integrations/zha/) lists router brands they are known not to work with, including Centralite, GE, Iris, Ledvance/OSRAM, Sylvania, Orvibo, PEQ, Securifi and SmartThings/Samsung.
+- **Outdoor gear that isn't rated for it.** An indoor smart plug in a carport is not weatherproof. Use IP-rated outdoor gear, and treat any **hardwired** relay, downlight driver or new outdoor circuit as electrical work for a licensed electrician. Rules differ by state and territory, so check with your state's electrical safety regulator — in Victoria, for example, [Energy Safe Victoria](https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers) says to always engage a registered electrical contractor and not to do your own electrical work.
@@
-- Then set Zigbee to a channel that sits in the gaps: **15, 20 or 25** are the usual safe picks (25 is the quietest but a handful of older devices don't support it) [VERIFY device support].
+- Then set Zigbee to a channel that sits in the gaps: **15, 20 or 25** are the usual safe picks. [Home Assistant's ZHA documentation](https://www.home-assistant.io/integrations/zha/) recommends only those three to avoid interoperability problems, and [Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/configuration/zigbee-network.html) recommends sticking to the ZLL channels 11, 15, 20 or 25 — so avoid channel 26 even though it sits clear of Wi-Fi.
@@
-A Matter-capable Zigbee/Thread gateway is a sensible pick for a second building because it can expose its local devices to your main system over the network rather than over the air. Specifications indicate these multiprotocol gateways handle Zigbee and Thread simultaneously [VERIFY the exact model's supported protocols before buying, as marketing on these listings is inconsistent].
+A Matter-capable Zigbee/Thread gateway is a sensible pick for a second building because it can expose its local devices to your main system over the network rather than over the air. A [Matter bridge](https://csa-iot.org/newsroom/why-bridging-matters/) presents non-Matter devices, such as Zigbee sensors, as virtual Matter devices to the rest of your system. Listings for these multiprotocol gateways are inconsistent, so check the manufacturer's specifications for the exact model — which radios it has (Zigbee, Thread or both) and whether it bridges Zigbee devices into Matter — before buying.
@@
-If the flat is tenanted, be careful about what you install. Anything hardwired, anything that records, and anything that controls the tenant's power needs a conversation first — tenancy and privacy obligations differ by state and change regularly [VERIFY with your state tenancy authority].
+If the flat is tenanted, be careful about what you install. Anything hardwired, anything that records, and anything that controls the tenant's power needs a conversation first. Tenancy and privacy obligations differ by state and territory, so check with your state or territory's tenancy authority before installing.
@@
-- **Zigbee2MQTT / ZHA network map:** check LQI (link quality) values. Anything consistently under ~50 is a marginal link, and devices routing back to the coordinator over three or more weak hops will be unreliable [VERIFY thresholds vary by stack].
+- **Zigbee2MQTT / ZHA network map:** look for devices routing back to the coordinator over several hops, or through a single router. Treat LQI (link quality) numbers with care — there's no universal "bad" threshold, and [Home Assistant's ZHA documentation](https://www.home-assistant.io/integrations/zha/) warns that LQI and RSSI values can be misleading and shouldn't be judged on their own. Compare a device against its own history rather than a fixed number.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 2 answer
  - before: Move it before you buy anything: put the dongle on a 1–2 m USB 2.0 extension lead so it hangs clear of the chassis and any noisy USB 3.0 drives. Then mount it high and central, out of the metal comms cabinet. An external SMA antenna variant generally outperforms PCB-antenna sticks [VERIFY].
  - after: Move it before you buy anything: put the dongle on a 1–2 m USB 2.0 extension lead so it hangs clear of the chassis and any noisy USB 3.0 drives. Then mount it high and central, out of the metal comms cabinet. Home Assistant's ZHA documentation also suggests considering an adapter with an external antenna for more flexibility, and trying different orientations.
- FAQ 3 answer
  - before: Lock your 2.4 GHz Wi-Fi to channel 1, 6 or 11, then put Zigbee on 15, 20 or 25, which sit in the gaps. Channel 25 is usually quietest but some older devices don't support it [VERIFY device support]. Do this early — changing channels later can force a re-pair of some battery sensors.
  - after: Lock your 2.4 GHz Wi-Fi to channel 1, 6 or 11, then put Zigbee on 15, 20 or 25, which sit in the gaps. Home Assistant's ZHA documentation recommends only 15, 20 or 25 to avoid interoperability problems; avoid channel 26. Do this early — changing channels later can force a re-pair of some battery sensors.
- FAQ 4 answer
  - before: No. Any hardwired relay, downlight driver or new outdoor circuit must be installed by a licensed electrician under AS/NZS 3000, and DIY mains work is illegal across Australia [VERIFY current rules in your state]. Plug-in devices are fine, but use IP-rated gear outdoors — an indoor plug isn't weatherproof.
  - after: Don't DIY it. Treat it as electrical work for a licensed electrician: a hardwired relay, downlight driver or new outdoor circuit is fixed wiring, and rules differ by state and territory, so check with your state's electrical safety regulator. Plug-in devices are fine, but use IP-rated gear outdoors — an indoor plug isn't weatherproof.
- FAQ 5 answer
  - before: Check the LQI values on your Zigbee2MQTT or ZHA network map — links consistently under about 50 are marginal, and three or more weak hops back to the coordinator will be unreliable [VERIFY thresholds vary by stack]. Also watch for sensors that change parent every few hours, and test with the microwave and aircon running.
  - after: Check the LQI values on your Zigbee2MQTT or ZHA network map — but there's no universal threshold — Home Assistant warns LQI and RSSI can be misleading on their own, so compare each device against its own history and look for long chains of hops back to the coordinator. Also watch for sensors that change parent every few hours, and test with the microwave and aircon running.

---

## robot-vacuum-dock-placement-rental-apartment-no-new-wiring

[VERIFY] tags: 13 → 0. Words: 1226 → 1400.

### Decisions and sources

13 [VERIFY] tags: 9 in the body, 4 in the FAQ. There were none in the excerpt or keyTakeaways, which are unchanged. No placeholder text (TODO/TBD/lorem/template) was found.

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "…check the manual for your specific model [VERIFY — clearances vary by brand]:" | a | "clearances vary by brand and model… Roborock's Auto-Empty Dock Pure manual, for example, asks for at least 0.5 m either side, 1.5 m in front and 1 m above:" | https://www.manualslib.com/guide/3613083/roborock-auto-empty-dock-pure-manual.html (the DreameBot L10s Ultra manual on ManualsLib also gives 1.5 m in front and 0.5 m to the side) |
| 2 | Body: "Dock cords are commonly 1.5–1.8 m [VERIFY per model]." | b | "Cord lengths vary by model, so check the spec sheet or measure the cord before you settle on a spot." | None. Neither the Roborock nor the Dreame manual gives a cord length, so the range was removed. |
| 3 | Body: "outlets and appliances in wet areas are governed by AS/NZS 3000 clearance rules… [VERIFY with a licensed electrician if you are unsure]" | a | "where power points can sit around tubs and basins is set by the AS/NZS 3000 Wiring Rules, and Queensland's ESO advises against power boards or double adaptors in laundries… if unsure, ask a licensed electrician." | https://www.nsw.gov.au/housing-and-construction/compliance-and-regulation/electricians/electrical-standards-rules-and-notes/switches-and-sockets-wet-areas ; https://www.electricalsafety.qld.gov.au/sites/default/files/2022-07/electricity-in-the-home.pdf |
| 4 | Body: "Bunnings and Officeworks both stock suitable sheeting [VERIFY current stock and pricing]." | a | "Bunnings lists clear PVC mats for hard floors that can do the job; check stock and pricing at your local store." (Officeworks removed because it was not checked.) | https://www.bunnings.com.au/smart-home-products-basic-120-x-90cm-clear-pvc-chair-mat-for-hard-floors_p0498657 |
| 5 | Body: "In every Australian state and territory, fixed wiring work must be done by a licensed electrician… owner's agreement as well [VERIFY current rules in your state]." | c | "Electrical safety regulators are clear that installing a power point is work for a licensed electrician (NSW, Queensland)… in NSW, lease or landlord's written permission. Rules differ by state, so check your state's tenancy authority and your lease." | https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/avoiding-electrical-accidents ; https://www.electricalsafety.qld.gov.au/sites/default/files/2022-07/electricity-in-the-home.pdf ; https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property |
| 6 | Body: "Use a lead marked to AS/NZS 3112/3199 [VERIFY marking on the product]" | a | "Use a factory-made lead that carries the Regulatory Compliance Mark (RCM)" | https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ (the "factory-made" advice follows Energy Safe Victoria's guidance) |
| 7 | Body: "…and several manufacturers advise against it [VERIFY your model's manual]." | c | "…so check your model's manual before putting the dock on a switched plug." | None. The claim that manufacturers advise against smart plugs could not be confirmed and was removed. |
| 8 | Body: "often quoted in the 75–85 dB range [VERIFY per model]." | b | "noise figures differ between models (where a maker publishes one at all), so check your model's spec sheet." | None. No manufacturer figure was found; third-party blogs disagree (65–75 vs 70–80 dB). |
| 9 | Body: "drilling into a shared wall or drawing water from a common line is not [VERIFY with your strata manager]." | a | "…new wiring or power points… In NSW, wiring and power points count as minor renovations that need strata approval, and tenants must ask their landlord first. By-laws and state rules differ, so check yours and ask your strata manager." | https://www.nsw.gov.au/housing-and-construction/strata/living/renovations |
| 10 | FAQ 2 (id 1738): "No. Fixed wiring work must be… in every Australian state and territory… owner's agreement [VERIFY current rules in your state]." | c | "Not yourself. Electrical safety regulators such as NSW's and Queensland's are clear that installing a power point is work for a licensed electrician… Rules differ by state, check your tenancy authority and lease." (The flat "No." was changed to "Not yourself." because the tagged sentence was rewritten.) | Same as #5 |
| 11 | FAQ 3 (id 1739): "look for AS/NZS 3112/3199 marking [VERIFY marking on the product]" | a | "look for a factory-made lead carrying the Regulatory Compliance Mark (RCM)" | https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ |
| 12 | FAQ 4 (id 1740): "several manufacturers advise against it [VERIFY your model's manual]." | c | "so check your model's manual before putting the dock on a switched plug." | None |
| 13 | FAQ 5 (id 1741): "hard floor underneath [VERIFY clearances in your model's manual]." | a | "…those are the figures in Roborock's Auto-Empty Dock Pure manual, but clearances vary by brand, so check your model's manual." | https://www.manualslib.com/guide/3613083/roborock-auto-empty-dock-pure-manual.html |

Totals: a = 7, b = 2, c = 4. Links were added from 8 distinct sources that were actually opened. The Energy Safe Victoria and Dreame manual pages were also opened but are not linked.

#### Flagged untagged sentences (not changed)

1. **Extension lead as a permanent fix.** The body says "One approved extension lead is fine", the FAQ 3 answer says "One approved extension lead is generally fine", and keyTakeaways and FAQ 2 say "use one approved extension lead". This conflicts with Queensland ESO guidance: "Extension leads should only be used temporarily. If you need [more], consider asking your electrician to add more power points." The ESO also recommends "installing additional power points rather than… running extension leads from one area of the room to another." A dock stays plugged in permanently, so this needs an editorial and safety rethink. Source: https://www.electricalsafety.qld.gov.au/sites/default/files/2022-07/electricity-in-the-home.pdf
2. **Power boards and high-draw docks.** The same Queensland ESO guidance says to use power boards only with low-power items. The DreameBot L10s Ultra manual lists 1000 W during dust emptying. The article allows a dock on a lead or board without mentioning this.
3. **Laundry placement.** Queensland ESO says "Do not use power boards or double adaptors in wet areas such as laundries", and Energy Safe Victoria says not to use extension leads in wet areas unless they are designed for it. The "laundry nook" recommendation, read together with the extension-lead section, needs care.
4. **Invented statistic.** "Ninety per cent of 'my robot won't dock' complaints are geometry, not hardware." No source; this should be removed or softened.
5. **Unsourced technical claim, low risk.** "Nearly all robot vacuums join 2.4 GHz networks only." Some newer models support 5 GHz; worth checking.
6. **Unsourced 900 mm hallway figure.** "…a 900 mm hallway." Illustrative, low risk.

#### Needs human legal review

- Body, Power Without an Electrician: "You cannot add a new power point yourself. Electrical safety regulators are clear that installing a power point is work for a licensed electrician… in a rental any change generally needs the owner's permission… Rules differ by state." (electrical work, tenancy)
- Body, laundry: AS/NZS 3000 Wiring Rules and power boards/adaptors in laundries. (electrical safety)
- Body: "One approved extension lead is fine… factory-made lead that carries the RCM… Do not daisy-chain powerboards." (electrical safety; see flag 1)
- Body, strata: "In NSW, wiring and power points count as minor renovations that need strata approval, and tenants must ask their landlord first." (strata, tenancy)
- Body, Big Docks: "permanent water connections are a landlord conversation" (tenancy, plumbing)
- Body: "protects the floorboards you'd like your bond back on" / "completely bond-safe" (tenancy/bond; "completely bond-safe" is an absolute claim)
- Body: "Use adhesive cable clips, not screws… come off at the end of the lease." (tenancy; adhesive can damage paint)
- Body, noise: scheduling advice "rather than 6 am or after 10 pm" (local noise rules and by-laws differ; this is not stated as law, but check)
- FAQ 2: "Not yourself… owner's permission… Rules differ by state" (electrical work, tenancy)
- FAQ 3: extension lead / RCM / daisy-chaining (electrical safety)
- keyTakeaways: "Use one approved extension lead if you must, never daisy-chained powerboards" (electrical safety)
- Privacy: nothing in the article touches privacy, apart from a passing mention of camera-based navigation.

### Body diff

```diff
--- before
+++ after
@@
-Before you hunt for a spot, know the non-negotiables. Most manufacturers ask for something close to this, though you should check the manual for your specific model [VERIFY — clearances vary by brand]:
+Before you hunt for a spot, know the non-negotiables. Most manufacturers ask for something close to this, but clearances vary by brand and model, so check the manual for yours. Roborock's [Auto-Empty Dock Pure manual](https://www.manualslib.com/guide/3613083/roborock-auto-empty-dock-pure-manual.html), for example, asks for at least 0.5 m either side, 1.5 m in front and 1 m above:
@@
-- **Mains power within the cord length.** Dock cords are commonly 1.5–1.8 m [VERIFY per model].
+- **Mains power within the cord length.** Cord lengths vary by model, so check the spec sheet or measure the cord before you settle on a spot.
@@
-**The laundry or laundry nook.** Hard floor, a spare outlet for the dryer or iron, and a tap nearby if you have a mop dock that needs refilling. Keep it well away from the tub and any splash zone — outlets and appliances in wet areas are governed by AS/NZS 3000 clearance rules and this is not a place to improvise [VERIFY with a licensed electrician if you are unsure].
+**The laundry or laundry nook.** Hard floor, a spare outlet for the dryer or iron, and a tap nearby if you have a mop dock that needs refilling. Keep it well away from the tub and any splash zone — where power points can sit around tubs and basins is set by the [AS/NZS 3000 Wiring Rules](https://www.nsw.gov.au/housing-and-construction/compliance-and-regulation/electricians/electrical-standards-rules-and-notes/switches-and-sockets-wet-areas), and Queensland's Electrical Safety Office advises against using [power boards or double adaptors in laundries](https://www.electricalsafety.qld.gov.au/sites/default/files/2022-07/electricity-in-the-home.pdf). This is not a place to improvise — if you're unsure whether an outlet is suitable, ask a licensed electrician.
@@
-Practical tip: put a thin, hard mat or a cut-to-size sheet of clear PVC under a mopping dock. It catches drips, protects the floorboards you'd like your bond back on, and lifts out for cleaning. Bunnings and Officeworks both stock suitable sheeting [VERIFY current stock and pricing].
+Practical tip: put a thin, hard mat or a cut-to-size sheet of clear PVC under a mopping dock. It catches drips, protects the floorboards you'd like your bond back on, and lifts out for cleaning. Bunnings lists [clear PVC mats for hard floors](https://www.bunnings.com.au/smart-home-products-basic-120-x-90cm-clear-pvc-chair-mat-for-hard-floors_p0498657) that can do the job; check stock and pricing at your local store.
@@
-You cannot add a new power point yourself. In every Australian state and territory, fixed wiring work must be done by a licensed electrician, and in a rental it needs the owner's agreement as well [VERIFY current rules in your state]. What you can legally do is use the outlets you already have, sensibly.
+You cannot add a new power point yourself. Electrical safety regulators are clear that installing a power point is work for a licensed electrician (see guidance from [NSW](https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/avoiding-electrical-accidents) and [Queensland](https://www.electricalsafety.qld.gov.au/sites/default/files/2022-07/electricity-in-the-home.pdf)), and in a rental any change to the property generally needs the owner's permission — in NSW, for example, [your lease or the landlord's written permission](https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property). Rules differ by state, so check your state's tenancy authority and your lease before any change. What you can legally do is use the outlets you already have, sensibly.
@@
-- **One approved extension lead is fine.** Use a lead marked to AS/NZS 3112/3199 [VERIFY marking on the product], rated well above the dock's draw, and run it along a wall — not under a rug, where it can overheat and where it also blocks the robot.
+- **An extension lead is a stop-gap, not a fix.** Queensland's Electrical Safety Office advises using [extension leads only temporarily](https://www.electricalsafety.qld.gov.au/sites/default/files/2022-07/electricity-in-the-home.pdf) and asking an electrician about extra power points instead. If you use one in the meantime, choose a factory-made lead that carries the [Regulatory Compliance Mark (RCM)](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/), rated well above the dock's draw, and run it along a wall — not under a rug, where it can overheat and where it also blocks the robot.
@@
-- **Think twice about a smart plug.** Cutting power to a dock breaks charging, drying and self-empty cycles, and several manufacturers advise against it [VERIFY your model's manual]. Where a smart plug does earn its keep is energy monitoring on a nearby appliance, or switching a lamp so the robot has light for its camera-based navigation.
+- **Think twice about a smart plug.** Cutting power to a dock breaks charging, drying and self-empty cycles, so check your model's manual before putting the dock on a switched plug. Where a smart plug does earn its keep is energy monitoring on a nearby appliance, or switching a lamp so the robot has light for its camera-based navigation.
@@
-**Noise and neighbours.** Self-empty cycles are brief but genuinely loud, often quoted in the 75–85 dB range [VERIFY per model]. In a unit with shared walls, schedule cleaning for mid-morning rather than 6 am or after 10 pm.
+**Noise and neighbours.** Self-empty cycles are brief but genuinely loud, and noise figures differ between models (where a maker publishes one at all), so check your model's spec sheet. In a unit with shared walls, schedule cleaning for mid-morning rather than 6 am or after 10 pm.
@@
-**Strata and common property.** You are only ever placing a dock inside your own lot, so this is usually a non-issue — but anything involving drilling into a shared wall or drawing water from a common line is not [VERIFY with your strata manager].
+**Strata and common property.** You are only ever placing a dock inside your own lot, so this is usually a non-issue — but anything involving drilling into a shared wall, new wiring or power points, or drawing water from a common line is not. In NSW, for example, [wiring and power points count as minor renovations that need strata approval](https://www.nsw.gov.au/housing-and-construction/strata/living/renovations), and tenants must ask their landlord first. By-laws and state rules differ, so check yours and ask your strata manager before any work.
@@
-Before you commit to a spot, run this: set the dock down, send the robot out, then send it home three times from three different rooms. If it finds the dock every time and seats properly, you've found the place. If it hunts, nudges the dock out of position, or parks crooked, move it 300 mm along the wall and try again. Ninety per cent of "my robot won't dock" complaints are geometry, not hardware.
+Before you commit to a spot, run this: set the dock down, send the robot out, then send it home three times from three different rooms. If it finds the dock every time and seats properly, you've found the place. If it hunts, nudges the dock out of position, or parks crooked, move it 300 mm along the wall and try again. A robot that won't dock is often a placement problem rather than a hardware fault.
```

### Excerpt / key takeaways / FAQ changes

- keyTakeaways
  - before: Put the dock against a flat wall on hard floor within reach of an existing power point, with roughly half a metre clear each side and 1.5 m in front — a hallway, laundry nook or the end of a kitchen bench usually works best. Use one approved extension lead if you must, never daisy-chained powerboards, and leave the dock permanently switched on.
  - after: Put the dock against a flat wall on hard floor within reach of an existing power point, with roughly half a metre clear each side and 1.5 m in front — a hallway, laundry nook or the end of a kitchen bench usually works best. Treat an extension lead as a temporary stop-gap only, never daisy-chain powerboards, and leave the dock permanently switched on.
- FAQ 2 answer
  - before: No. Fixed wiring work must be carried out by a licensed electrician in every Australian state and territory, and in a rental you'd also need the owner's agreement [VERIFY current rules in your state]. The workaround is to use an existing 240V outlet, with one properly rated extension lead if you need the extra reach.
  - after: Not yourself. Electrical safety regulators such as [NSW's](https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/avoiding-electrical-accidents) and [Queensland's](https://www.electricalsafety.qld.gov.au/sites/default/files/2022-07/electricity-in-the-home.pdf) are clear that installing a power point is work for a licensed electrician, and in a rental you'd generally need the owner's permission as well — in NSW, for example, [the lease or the landlord's written permission](https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property). Rules differ by state, so check your state's tenancy authority and your lease first. The workaround is to place the dock near an existing outlet; an extension lead should only ever be a temporary measure.
- FAQ 3 answer
  - before: One approved extension lead is generally fine — look for AS/NZS 3112/3199 marking [VERIFY marking on the product], choose a rating well above the dock's draw, and run it along a wall rather than under a rug where it can overheat and block the robot. Don't daisy-chain powerboards or plug a board into a lead into another board; that's a real fire risk, not a technicality.
  - after: Only as a temporary measure: Queensland's [Electrical Safety Office](https://www.electricalsafety.qld.gov.au/sites/default/files/2022-07/electricity-in-the-home.pdf) advises using extension leads temporarily and adding power points instead. If you use one in the meantime, look for a factory-made lead carrying the [Regulatory Compliance Mark (RCM)](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/), choose a rating well above the dock's draw, and run it along a wall rather than under a rug where it can overheat and block the robot. Don't daisy-chain powerboards or plug a board into a lead into another board; that's a real fire risk, not a technicality.
- FAQ 4 answer
  - before: Probably not. Cutting power interrupts charging, mop-pad drying and self-empty cycles, and several manufacturers advise against it [VERIFY your model's manual]. A smart plug is better used elsewhere — for energy monitoring on another appliance, or switching on a lamp so a camera-navigating robot has light.
  - after: Probably not. Cutting power interrupts charging, mop-pad drying and self-empty cycles, so check your model's manual before putting the dock on a switched plug. A smart plug is better used elsewhere — for energy monitoring on another appliance, or switching on a lamp so a camera-navigating robot has light.
- FAQ 5 answer
  - before: Most of these problems are geometry rather than a faulty unit. Check you have roughly 0.5 m clear either side and 1.5 m clear in front, a solid wall behind, and hard floor underneath [VERIFY clearances in your model's manual]. Then send it home three times from three different rooms; if it still hunts, shift the dock 300 mm along the wall and repeat.
  - after: Most of these problems are geometry rather than a faulty unit. Check you have roughly 0.5 m clear either side and 1.5 m clear in front, a solid wall behind, and hard floor underneath — those are the figures in Roborock's [Auto-Empty Dock Pure manual](https://www.manualslib.com/guide/3613083/roborock-auto-empty-dock-pure-manual.html), but clearances vary by brand, so check your model's manual. Then send it home three times from three different rooms; if it still hunts, shift the dock 300 mm along the wall and repeat.

---

## streaming-box-australia-free-to-air-catch-up-tv

[VERIFY] tags: 12 → 0. Words: 1245 → 1424.

### Decisions and sources

12 [VERIFY] tags: 8 in the body, 4 in the FAQ (excerpt and keyTakeaways had none). No placeholder text (TODO, TBD, lorem, template instructions) was found.

| # | Original text | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | "any TV sold here in the last decade has a DVB-T tuner that covers the standard Australian broadcast channels [VERIFY]" | b | Tuner is in the TV; older MPEG-2-only sets show MPEG-4 channels (incl. HD) as blank; SBS explains the test; fix is a set-top box or a newer TV | https://www.sbs.com.au/aboutus/contact-us/transmission-information/ |
| 2 | "Broadly, as of writing [VERIFY]:" (+ the Apple TV bullet it covers) | a | "at the time of writing (check again before you buy…)"; Apple TV bullet now links all five apps' AU tvOS listings and notes the minimum tvOS versions | https://apps.apple.com/au/app/abc-iview-tv-movies/id401778175 ; https://apps.apple.com/au/app/sbs-on-demand/id542090992 ; https://apps.apple.com/au/app/7plus/id1119404646 ; https://apps.apple.com/au/app/id542088539 ; https://helpdesk.tenplay.com.au/support/solutions/articles/16000113662-10-supported-devices-watch-10-on-your-tv-phone-or-computer |
| 3 | "Fire TV … has historically had gaps in Australian broadcaster apps [VERIFY]" | b | Broadcasters support it (10 lists Fire OS 5+), but minimum versions differ, so check each app in the Amazon Appstore | https://helpdesk.tenplay.com.au/support/solutions/articles/16000113662-10-supported-devices-watch-10-on-your-tv-phone-or-computer |
| 4 | "Roku — a smaller presence in Australia and the local app catalogue reflects that [VERIFY]" | b | Don't assume all five apps are there; search the Roku Channel Store for each | none (sources conflicted: only forum posts and search snippets, no official Roku AU list) |
| 5 | "Most Australian catch-up content streams at 720p or 1080p, not 4K [VERIFY]" | c | Quality is set by each broadcaster and varies by app and program; links to ABC's iview video-quality help page | https://help.abc.net.au/hc/en-us/articles/8551355333519-What-is-the-video-quality-or-resolution-of-ABC-iview (returned 403 to the fetcher, so it is linked as a pointer only and no figure is quoted; confirm the link works in a browser) |
| 6 | "A 4K stream typically wants around 15–25Mbps sustained [VERIFY]" | a | "Netflix, for example, recommends 15Mbps or higher for a single 4K stream" | https://help.netflix.com/en/node/306 |
| 7 | "non-approved supplies can be a safety and warranty issue [VERIFY]" | a | ESV warns overseas equipment may lack the correct voltage rating or fail Australian Standards; check for the RCM | https://www.energysafe.vic.gov.au/community-safety/buying-safe-appliances/electrical-appliances/online-marketplace-buyers-guide |
| 8 | "…Harvey Norman if you want local warranty and Australian Consumer Law cover [VERIFY]" | a | Australian retailers make warranty claims simpler; ACCC: overseas businesses selling directly to Australians must also follow the ACL, but remedies can be hard to get in practice | https://www.accc.gov.au/consumers/buying-products-and-services/buying-online |
| 9 | FAQ 1628: "roughly 720p or 1080p rather than 4K [VERIFY]" | c | Quality is set by each broadcaster and varies (ABC publishes iview's quality on its help pages) | as #5 |
| 10 | FAQ 1630: "can be a safety and warranty issue [VERIFY]" | a | ESV warning plus RCM advice | as #7 |
| 11 | FAQ 1630: "keeps you covered by local warranty and Australian Consumer Law [VERIFY]" | a | Same rewrite as #8 | as #8 |
| 12 | FAQ 1631: "15–25Mbps sustained [VERIFY]" | a | "Netflix, for example, recommends 15Mbps or higher for a single 4K stream" | as #6 |

Totals: a = 7, b = 3, c = 2.

#### Flagged untagged sentences (left unchanged)

- "On a 25/5 plan with two people streaming, catch-up apps are usually the first to degrade." This also appears in FAQ 1631. It is an unsourced performance claim; consider softening it or removing it.
- "Anything sold locally should ship with a Type I plug and a 240V-rated supply." Type I is the correct plug type. Australia's nominal supply is standardised at 230V, so "rated for Australian mains (230–240V)" would be safer. This also appears in FAQ 1630.
- "Google TV / Android TV — also well covered … app parity is generally good." Only 10's page (Android TV OS 9+) was confirmed; the other four apps on Google TV were not.
- "A box with a modern chipset and at least 2GB RAM handles them far better than a $50 dongle." This is an unsourced performance comparison that includes a price.
- "A box on a well-supported platform will still be running iview in five years." This is a forward-looking claim.

#### Needs human legal review

- The ACL sentence (body "Power and plugs" paragraph and FAQ 1630): how the Australian Consumer Law applies to overseas sellers and marketplace sellers.
- The grey-import power supply / RCM sentence (body and FAQ 1630): electrical safety and approval requirements.
- "Anything sold locally should ship with a Type I plug and a 240V-rated supply": electrical safety.
- "If you're adding a new power point or data point … that's a licensed electrician's job under AS/NZS wiring rules — running cables inside a wall cavity is not a DIY task in Australia": electrical safety law. Cabling rules differ for data (ACMA cabling provider rules) and power, and between states.
- The MPEG-4 / tuner sentence and the Freeview-certified STB recommendation: broadcasting reception (low risk).

### Body diff

```diff
--- before
+++ after
@@
-Virtually every streaming box sold in Australia — Apple TV, Google TV/Chromecast, Fire TV, Android TV boxes — has no digital TV tuner inside. Plug an antenna cable into one and nothing happens. Free-to-air comes from the tuner already built into your television, and any TV sold here in the last decade has a DVB-T tuner that covers the standard Australian broadcast channels [VERIFY].
+Virtually every streaming box sold in Australia — Apple TV, Google TV/Chromecast, Fire TV, Android TV boxes — has no digital TV tuner inside. Plug an antenna cable into one and nothing happens. Free-to-air comes from the tuner already built into your television. One catch with older sets: broadcasters now send many channels, including their HD services, in MPEG-4, and a TV that only decodes the older MPEG-2 format will show those channels as blank or error screens. [SBS's transmission information](https://www.sbs.com.au/aboutus/contact-us/transmission-information/) explains how to test for this and suggests a digital set-top box or a newer TV if yours can't receive them.
@@
-Broadly, as of writing [VERIFY]:
+Broadly, at the time of writing (check again before you buy, because this list changes):
@@
-- **Apple TV (tvOS)** — the major Australian catch-up apps are all present, and the platform is well maintained here.
+- **Apple TV (tvOS)** — all five are listed for Apple TV in the Australian App Store ([ABC iview](https://apps.apple.com/au/app/abc-iview-tv-movies/id401778175), [SBS On Demand](https://apps.apple.com/au/app/sbs-on-demand/id542090992), [7plus](https://apps.apple.com/au/app/7plus/id1119404646), [9Now](https://apps.apple.com/au/app/id542088539)) and on [10's supported-devices page](https://helpdesk.tenplay.com.au/support/solutions/articles/16000113662-10-supported-devices-watch-10-on-your-tv-phone-or-computer), though each app sets its own minimum tvOS version, so older Apple TV models can drop off.
@@
-- **Amazon Fire TV** — coverage has improved but has historically had gaps in Australian broadcaster apps [VERIFY]. Worth checking each app individually.
-- **Roku** — a smaller presence in Australia and the local app catalogue reflects that [VERIFY].
+- **Amazon Fire TV** — the broadcasters do support it (10, for example, [lists Fire TV devices running Fire OS 5 or later](https://helpdesk.tenplay.com.au/support/solutions/articles/16000113662-10-supported-devices-watch-10-on-your-tv-phone-or-computer)), but minimum software versions differ from app to app. Check each app in the Amazon Appstore for your model.
+- **Roku** — don't assume all five broadcaster apps are available. Search the Roku Channel Store for each one you watch before you buy.
@@
-Also set expectations on quality. Most Australian catch-up content streams at 720p or 1080p, not 4K [VERIFY]. A 4K box won't make iview look sharper. Where 4K matters is Netflix, Disney+, Prime Video, Stan and Kayo.
+Also set expectations on quality. Catch-up picture quality is set by each broadcaster, not by the box, and it varies by app and program. ABC publishes the details for iview on its [help page about video quality](https://help.abc.net.au/hc/en-us/articles/8551355333519-What-is-the-video-quality-or-resolution-of-ABC-iview). A 4K box won't make iview look sharper. Where 4K matters is Netflix, Disney+, Prime Video, Stan and Kayo.
@@
-**Check your NBN plan.** A 4K stream typically wants around 15–25Mbps sustained [VERIFY]. On a 25/5 plan with two people streaming, catch-up apps are usually the first to degrade. A faster tier fixes more streaming complaints than a new box does.
+**Check your NBN plan.** Netflix, for example, [recommends 15Mbps or higher](https://help.netflix.com/en/node/306) for a single 4K stream. On a 25/5 plan with two people streaming, catch-up apps are usually the first to degrade. A faster tier fixes more streaming complaints than a new box does.
@@
-**Power and plugs.** Anything sold locally should ship with a Type I plug and a 240V-rated supply. Grey-import boxes from overseas marketplaces often arrive with a two-pin adapter or a supply that isn't approved for sale here — that's a real consideration, not a formality, and non-approved supplies can be a safety and warranty issue [VERIFY]. Buy from Amazon AU, eBay AU sellers shipping domestically, JB Hi-Fi, The Good Guys or Harvey Norman if you want local warranty and Australian Consumer Law cover [VERIFY].
+**Power and plugs.** Anything sold locally should ship with a Type I plug and a 240V-rated supply. Grey-import boxes from overseas marketplaces often arrive with a two-pin adapter or a supply that isn't approved for sale here — that's a real consideration, not a formality. [Energy Safe Victoria warns](https://www.energysafe.vic.gov.au/community-safety/buying-safe-appliances/electrical-appliances/online-marketplace-buyers-guide) that equipment from overseas sellers may not have the correct voltage rating or meet Australian Standards, and recommends checking that the product carries the Regulatory Compliance Mark (RCM). Buying from an Australian retailer such as Amazon AU, eBay AU sellers shipping domestically, JB Hi-Fi, The Good Guys or Harvey Norman generally makes warranty claims simpler. The [ACCC notes](https://www.accc.gov.au/consumers/buying-products-and-services/buying-online) that overseas businesses selling directly to Australian consumers must also follow the Australian Consumer Law, but that in practice it can be hard to get a repair, replacement or refund from them.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 2 answer
  - before: Not really. Most Australian catch-up content streams at roughly 720p or 1080p rather than 4K [VERIFY], so a 4K box won't add detail that was never in the stream. Where 4K does pay off is on Netflix, Disney+, Prime Video, Stan and Kayo.
  - after: Not really. Catch-up picture quality is set by each broadcaster and varies by app and program (ABC, for instance, publishes iview's stream quality on its help pages), so a 4K box won't add detail that was never in the stream. Where 4K does pay off is on Netflix, Disney+, Prime Video, Stan and Kayo.
- FAQ 4 answer
  - before: Grey imports often arrive with a two-pin adapter or a power supply that isn't approved for sale here, which can be a safety and warranty issue [VERIFY]. Anything sold locally should include a Type I plug and a 240V-rated supply. Buying from Amazon AU, eBay AU sellers shipping domestically, JB Hi-Fi, The Good Guys or Harvey Norman keeps you covered by local warranty and Australian Consumer Law [VERIFY].
  - after: Grey imports often arrive with a two-pin adapter or a power supply that isn't approved for sale here, and Energy Safe Victoria warns that equipment from overseas sellers may not have the correct voltage rating or meet Australian Standards. Look for the Regulatory Compliance Mark (RCM). Anything sold locally should include a Type I plug and a 240V-rated supply. Buying from an Australian retailer such as Amazon AU, eBay AU sellers shipping domestically, JB Hi-Fi, The Good Guys or Harvey Norman generally makes warranty claims simpler. The ACCC says overseas businesses selling directly to Australians must also follow the Australian Consumer Law, but getting a repair, replacement or refund from them can be difficult in practice.
- FAQ 5 answer
  - before: Often it's the connection rather than the hardware. Broadcaster apps are more sensitive to jitter than Netflix because they stitch in ad breaks, so use Ethernet if there's a data point behind the TV, or the 5GHz band otherwise. Also check your NBN tier — a 4K stream typically wants around 15–25Mbps sustained [VERIFY], and on a 25/5 plan with two people streaming, catch-up apps degrade first.
  - after: Often it's the connection rather than the hardware. Broadcaster apps are more sensitive to jitter than Netflix because they stitch in ad breaks, so use Ethernet if there's a data point behind the TV, or the 5GHz band otherwise. Also check your NBN tier — Netflix, for example, recommends 15Mbps or higher for a single 4K stream, and on a 25/5 plan with two people streaming, catch-up apps degrade first.
