# Task 7 review: cluster 6, making a split system air conditioner smart

**Nothing has been written to Strapi.** Reply **approve** to publish the merged article, update one internal link and add the redirect. Then unpublish the MERGE post in the Strapi admin.

| | Slug | Title | Words | [VERIFY] | Product boxes |
|---|---|---|---|---|---|
| **KEEP** | climate-and-comfort/make-split-system-aircon-smart-australia | How to Make Your Split System Air Conditioner Smart (Without Replacing It) | 1032 | 0 | 0 |
| MERGE | setup-guides/reverse-cycle-split-system-voice-app-control-without-replacing | Setting Up Your Reverse-Cycle Split System for Voice and App Control Without Replacing the Unit | 1368 | 6 | 3 |

## What happens on approve

1. **KEEP updated in Strapi:** body, excerpt, keyTakeaways and FAQ from the draft below. Title kept ("How to Make Your Split System Air Conditioner Smart (Without Replacing It)"); new seoTitle "Make Your Split System Smart Without Replacing It" and seoDescription "Add app and voice control to an existing Australian split system: IR controllers vs Wi-Fi adaptors, placement, setup and when to call an installer.". Slug and `publishDate` (28 May 2026) kept; `dateModified` set to today.
2. **KEEP gains 2 product boxes** (it had none): Sensibo Air and Aircon Off. The MERGE post's Tuya IR controller box is not carried over, because that product has no verdict; generic Tuya/Smart Life IR blasters are still discussed in prose.
3. **Internal link updated in Strapi, in `smart-home-automation-routines-beginners`** (the only post linking to the MERGE URL). The sentence stays, only the link changes:
   - before: …see [setting up voice and app control for a reverse-cycle split system](https://nxtsmarthome.com.au/setup-guides/reverse-cycle-split-system-voice-app-control-without-replacing) for the setup process without replacing the unit.
   - after: …see [how to make your split system air conditioner smart](https://nxtsmarthome.com.au/climate-and-comfort/make-split-system-aircon-smart-australia/) for the setup process without replacing the unit.
4. **301** `/setup-guides/reverse-cycle-split-system-voice-app-control-without-replacing/` → `/climate-and-comfort/make-split-system-aircon-smart-australia/` added to `data/redirects-adsense.json` (already live via `data/merged-articles.json`).
5. **You unpublish the MERGE post** in the Strapi admin.
6. Build, audit, changelog.

Backups: `exports/strapi-backup/<slug>-2026-09-24T10-40-12-894Z.json` (all three posts).

## Correction worth knowing

- **Aircon Off was misdescribed in the MERGE post** as a sensor-led smart controller. Per airconoff.com.au it is a tamper-proof universal remote with preset limits and no Wi-Fi, app or voice control. The merged article describes it accurately in its own short section. Its catalogue `bestFor` ("Split-system air conditioner owners wanting to manage energy") is fine, but the product page is worth a look later.

---

# Section map: reverse-cycle-split-system-voice-app-control-without-replacing (MERGE) → make-split-system-aircon-smart-australia (KEEP)

## MERGE items → COVERED / UNIQUE

| # | MERGE item | Status | Where it lands in merged.md |
|---|---|---|---|
| 1 | Intro: remote lost in couch; no need to replace unit | COVERED (KEEP intro) + flavour | Intro para 2–3 |
| 2 | H2 How a smart IR controller works: remote sends full state burst | UNIQUE | Option 1 > How it works |
| 3 | One-way; app guesses state; physical remote desync | COVERED (KEEP "critical limitation") | Option 1 > The one-way problem |
| 4 | Fix: onboard temp sensor + IR *receiver* detecting remote presses | UNIQUE (KEEP only had external sensor/power monitor) | The one-way problem para 2 |
| 5 | "$30 puck vs $170 device" | UNIQUE, price removed | — |
| 6 | H2 Choosing a controller: three tiers | UNIQUE (KEEP had no tiers) | Option 1 > Budget blaster or sensor-led controller (collapsed to 2 tiers) |
| 7 | Budget Tuya/Smart Life, $20–45 [VERIFY], code library, cloud dependence | UNIQUE | same; price removed |
| 8 | Tuya product marker | UNIQUE, dropped per brief (no verdict) | — |
| 9 | Mid-range tier described via Aircon Off (temp/humidity sensor, follow-me) | UNIQUE but factually wrong for Aircon Off (no Wi-Fi/app/sensor) | Rewritten as new section "Not after an app? A locked-down replacement remote" |
| 10 | Sensibo Air features (sensor, remote-press detection, geofencing, GH/Alexa/Apple/HA), $150–220 [VERIFY] | UNIQUE | Budget blaster or sensor-led; features verified; price removed |
| 11 | "Remote you can shout at" vs connected climate device | UNIQUE | same section |
| 12 | H2 Where to mount it | UNIQUE (KEEP had one line-of-sight bullet) | "Where to put an IR controller" |
| 13 | Range 6–8 m | UNIQUE | Replaced with Sensibo's stated "up to 6 m" |
| 14 | Bounce off walls; test before tape | UNIQUE | Placement bullet |
| 15 | Avoid sunlight/halogen downlights | UNIQUE | Softened to "bright sunlight" |
| 16 | 5V USB, Type I outlet, no electrical work | UNIQUE | Placement bullet (Sensibo spec) |
| 17 | 2.4GHz only; merged SSID | UNIQUE | Setup step 2 + FAQ |
| 18 | L-shaped room → second controller | COVERED partly (KEEP "one bridge per room") | Placement bullet 5 |
| 19 | H2 Step-by-step setup (6 steps) | UNIQUE | "Setting up an IR controller" |
| 20 | Remote model number drives code library | UNIQUE | Step 1 |
| 21 | Verify every function; swing mis-mapping | UNIQUE | Step 5 |
| 22 | Voice linking in Google Home / Alexa; rooms; display name | UNIQUE | Steps 6–7 |
| 23 | Codeset support check | COVERED (KEEP "Codeset support") | folded into Step 4 |
| 24 | H2 Automations: geofenced off | COVERED (KEEP occupancy shutdown) | Automations list |
| 25 | Pre-conditioning 20 min | COVERED (KEEP) | Automations list ("short time") |
| 26 | Open-window contact sensor shutoff | UNIQUE | Automations list |
| 27 | Overnight setpoint profiles | UNIQUE | Automations list |
| 28 | Solar-aware cooling | COVERED (KEEP tariff/solar) | Automations list |
| 29 | "Pays for the device over a winter" | UNIQUE, removed (unsupported) | — |
| 30 | Home Assistant: Sensibo first-party; Tuya/LocalTuya fiddly [VERIFY] | UNIQUE | "Home Assistant and local control" |
| 31 | H2 What it won't do: no compressor/error/filter/power data | UNIQUE | Final section |
| 32 | Can't do ducted wall controller / hard-wired remote | COVERED (KEEP FAQ ducted) | Final section + FAQ |
| 33 | Mitsubishi/Daikin/Fujitsu/Panasonic Wi-Fi kits | UNIQUE brand detail (KEEP generic) | Option 2 |
| 34 | Licensed electrician/refrigeration tech; AS/NZS wiring rules [VERIFY] | UNIQUE | Final section, rewritten |
| 35 | Get a quote; factory module price close to IR | UNIQUE | Option 2 "Before buying", price comparison removed |
| 36 | Savings come from not running it | COVERED (KEEP running costs) | Running costs |
| FAQ 1727 | App shows running after physical remote off | COVERED (KEEP FAQ 1420) | FAQ 1420, adapted with IR receiver |
| FAQ 1728 | Need an electrician? | UNIQUE | FAQ (new, no id) |
| FAQ 1729 | How far away? | UNIQUE | Body placement only (FAQ cap) |
| FAQ 1730 | Wi-Fi won't connect / 2.4GHz | UNIQUE | FAQ (new, no id) |
| FAQ 1731 | Ducted with wall controller | COVERED (KEEP FAQ 1422) | FAQ 1422 |
| Meta keyTakeaways | Budget from ~$30 [VERIFY] | UNIQUE | Price removed |

## Decisions (a = verified + link, b = range/guidance, c = removed / pointed to authority)

| # | Original claim | a/b/c | New | Sources |
|---|---|---|---|---|
| 1 | KEEP: heating/cooling "one of the largest loads" | a | 20–50% of home energy by climate zone; 5–10% per degree | https://www.energy.gov.au/households/heating-and-cooling (also yourhome.gov.au/energy/heating-and-cooling: ~40%) |
| 2 | KEEP: IR bridge works with "essentially any unit", renters "use it freely" | b | "most units"; generally suits renters, check lease/state tenancy authority before adhesive | guidance only |
| 3 | MERGE: Budget Tuya $20–45 [VERIFY] | c | Price removed | — |
| 4 | MERGE: Sensibo $150–220 [VERIFY]; "$30 puck vs $170 device" | c | Prices removed | — |
| 5 | MERGE: Sensibo sensor, remote-press detection, geofencing, platforms | a | Temp+humidity sensor, universal IR receiver, geofencing, Alexa/Google/HomeKit/SmartThings | https://sensibo.com/products/sensibo-air |
| 6 | MERGE: Aircon Off as mid-range sensor/follow-me controller | c→a | Rewritten: tamper-resistant universal remote, no Wi-Fi/app; Basic preset 21–30°C cool / 17–23°C heat; Pro code lock + two timers | https://www.airconoff.com.au/air-conditioner-universal-remote-control-smart-remote-save-power-save-electricity-save-money ; https://www.airconoff.com.au/Aircon-Off-Smart-Remote-PRO ; https://www.airconoff.com.au/ |
| 7 | MERGE: range 6–8 m | a | Sensibo: line of sight up to 6 m; check your model | https://support.sensibo.com/products/air/ |
| 8 | MERGE: sunlight and halogens swamp receiver | b | "Bright sunlight can interfere" (halogens dropped) | general guidance |
| 9 | MERGE: 5V USB, Type I outlet | a | Sensibo Air 5V micro USB adaptor | https://sensibo.com/products/sensibo-air |
| 10 | MERGE: "almost all" 2.4GHz only | a/b | "Many, including the Sensibo Air"; band-steering exception wording softened | https://support.sensibo.com/products/air/ |
| 11 | MERGE: HA Tuya/LocalTuya IR not clean climate entities [VERIFY] | a | Official Tuya integration cloud-based and does not support remote platform; check community reports; LocalTuya named dropped | https://www.home-assistant.io/integrations/tuya/ |
| 12 | MERGE: Sensibo first-party HA integration | a | Core integration, climate entity, cloud polling | https://www.home-assistant.io/integrations/sensibo/ |
| 13 | MERGE/KEEP: brand Wi-Fi modules (Mitsubishi, Daikin, Fujitsu, Panasonic) | a (3) / b (Panasonic) | Daikin BRP072C42; GENERAL anywAiR Wi-Fi adaptor II plug-in; Mitsubishi MAC-568IF-E control board, authorised installer, post-Jan 2015 M/P/CITY MULTI, Alexa+Google; Panasonic unlinked (site 403) | https://www.daikin.com.au/products/commercial/system-controllers/daikin-mobile-controller ; https://www.generalairstage.com.au/anywair/wi-fi-adaptor ; https://www.mitsubishielectric.com.au/wi-fi/wi-fi-air-conditioning-control/ |
| 14 | KEEP: modules "often report energy consumption" | c | Removed | — |
| 15 | MERGE: licensed electrician/refrigeration tech; not DIY under AS/NZS wiring rules [VERIFY] | a/c | Installer the manufacturer specifies; QLD ESO quote on hard-wired appliances; rules differ by state → regulator. AS/NZS reference removed | https://www.electricalsafety.qld.gov.au/ddiy ; Mitsubishi page above |
| 16 | MERGE: opening head unit risks warranty | b | "may affect your warranty"; check warranty terms | guidance |
| 17 | KEEP FAQ 1421: IR bridge "presents no warranty issue" | b | Softened: does not involve opening the unit | guidance |
| 18 | MERGE: factory module "not far off" IR price | c | Replaced with "compare installed cost" | — |
| 19 | KEEP: bushfire smoke → recirculate automatically | c | Removed (split systems generally recirculate; outside-air behaviour is system-specific) | — |
| 20 | KEEP: third-party controllers "often better integration" | b | "some integrate … better" | — |
| 21 | MERGE: device "pays for itself over a winter" | c | Removed | — |
| 22 | MERGE: "pre-conditioning 20 minutes" | b | "a short time before" | — |
| 23 | KEEP: humidity advice "Queensland and northern NSW" | b | "humid climates" | — |

FAQ sources: 1420 — sensibo.com/products/sensibo-air (IR receiver); electrician FAQ — mitsubishielectric.com.au wi-fi page, electricalsafety.qld.gov.au/ddiy; 1421 — guidance; 1422 — Mitsubishi/Daikin/GENERAL pages; Wi-Fi FAQ — support.sensibo.com/products/air/; 1423 — energy.gov.au/households/heating-and-cooling.

## Needs human legal review

- Final section: "Electrical work is regulated by each state and territory" + QLD ESO quote on hard-wired appliances, and "may affect your warranty" for opening the unit.
- Option 1 renters line: plug-in IR controller "generally suits renters"; adhesive → check lease/state tenancy authority.
- FAQ "Do I need an electrician?" and FAQ 1421 (warranty) wording.

## Flagged, not changed

- Catalogue entry `aircon-off-universal-air-conditioner-smart-remote` is a non-smart replacement remote in the Smart AC Controllers category; MERGE post mis-described it as a sensor-led smart controller. Article now describes it accurately; consider whether it belongs in "Smart AC Controllers".
- Both catalogue products lack `pros`; only `bestFor` is set (enough for link-products.mjs).
- Panasonic AU pages returned 403; Panasonic mentioned without link — confirm CZ-TACG1 / Comfort Cloud AU page if a link is wanted.
- Daikin link is on Daikin AU's commercial controllers path (split/multi compatibility stated there).
- Internal link /energy-and-solar/smart-plugs-energy-monitoring-australia/ carried from KEEP, not checked.
- Body ~2,090–2,130 words, near the top of the range.


---

## Merged article: meta

- **title:** How to Make Your Split System Air Conditioner Smart (Without Replacing It)
- **seoTitle:** Make Your Split System Smart Without Replacing It
- **seoDescription:** Add app and voice control to an existing Australian split system: IR controllers vs Wi-Fi adaptors, placement, setup and when to call an installer.
- **excerpt:** You rarely need a new air conditioner to get app, voice and geofenced control. Here is how smart IR controllers, manufacturer Wi-Fi adaptors and wired controllers compare for Australian split systems, where to put an IR controller, how to set it up, and when the job needs an installer.
- **keyTakeaways:** A smart infrared controller placed in line of sight of the indoor unit copies your existing remote and adds app, voice and geofenced control with no wiring, but basic models cannot tell whether the aircon is actually on. Sensor-led controllers such as the Sensibo Air add room temperature and humidity readings and watch for remote presses, while a manufacturer Wi-Fi adaptor gives true two-way status on compatible units and some must be fitted by an authorised installer.

### FAQ (6)

**Why does my smart home say the aircon is on when it is off?** (KEEP #1420)

Because infrared controllers are one-way. They send the same signal your remote does and assume the command worked. If someone used the physical remote, or the signal was blocked, the app's idea of the state drifts out of sync. Controllers with an IR receiver watch for remote presses and update themselves, and a room temperature sensor or power monitor helps a basic blaster infer the real state.

**Do I need an electrician to add app control to my split system?** (new)

Not for a plug-in infrared controller, which runs from a USB power supply and does not touch the air conditioner. Manufacturer Wi-Fi adaptors that connect to the indoor unit's control board are different: some manufacturers say they should only be fitted by an authorised installer, and electrical work is regulated by each state and territory. Check with the manufacturer, your installer and your state's electrical safety regulator.

**Will a smart controller void my air conditioner warranty?** (KEEP #1421)

A plug-in infrared controller sits outside the unit and simply mimics your remote, so it does not involve opening the air conditioner. An adaptor that connects inside the indoor unit is different: use the manufacturer's own adaptor where possible, have it fitted by the installer the manufacturer specifies, and check your warranty terms before anyone opens the unit.

**Can I control a ducted system this way?** (KEEP #1422)

Usually not with an infrared controller, because ducted systems generally use a wall controller rather than an infrared remote. Many ducted manufacturers offer their own Wi-Fi adaptor or app-capable controller, and there are third-party controllers designed for ducted zoning. Treat it as a job for your installer.

**Why won't my IR controller connect to my Wi-Fi?** (new)

Many of these controllers, including the Sensibo Air, connect on 2.4GHz only. If your router combines 2.4GHz and 5GHz under one network name and pairing fails, check your router settings for a way to separate the bands during setup, and make sure the controller is within good Wi-Fi range.

**Is it worth automating air conditioning at all?** (KEEP #1423)

For many homes, yes. Government energy advice puts heating and cooling at roughly 20 to 50 per cent of home energy use depending on climate zone. Most of the benefit comes from not running the aircon when nobody is home, pre-conditioning instead of running all afternoon, and sensible setpoints, rather than from the device itself.

## Body diff against the current KEEP post

```diff
--- KEEP now
+++ merged
@@
-Most smart home content about climate control is written around American central heating and cooling with a single wall thermostat. That is not how Australian homes work.
+Most smart home advice about climate control is written for American central heating and cooling with a single wall thermostat. That is not how most Australian homes work.
@@
-We run split systems — one or more wall-mounted indoor units, each with its own infrared remote — or ducted systems with a wall controller. The advice for one does not transfer to the other, which is why so much of what you read online is unhelpful here.
+We mostly run reverse-cycle split systems — one or more wall-mounted indoor units, each with its own infrared remote that lives somewhere between the couch cushions — or ducted systems with a wall controller. The advice for one does not transfer to the other, which is why so much of what you read online is unhelpful here.
@@
-Here is what actually works.
+The good news: you rarely need to replace a working split system to get app control, scheduling and voice commands. Here is what actually works, what each approach can and cannot do, and when you need a professional.
@@
-Heating and cooling is one of the largest electricity loads in an Australian home. Automating it has real financial upside, not just convenience:
+Heating and cooling is a big part of the power bill. The federal government's energy advice site says that, depending on climate zone, it can [account for 20% to 50% of the energy used in Australian homes](https://www.energy.gov.au/households/heating-and-cooling), and that each extra degree of heating in winter or cooling in summer increases energy use by between 5% and 10%. Automation will not change the physics, but it does make the money-saving habits happen without anyone having to remember them — above all, not running the aircon in an empty house.
@@
-- **Pre-conditioning.** Start cooling twenty minutes before you arrive, rather than running all afternoon on an empty house.
-- **Occupancy shutdown.** Turn off when everyone leaves. This is the single biggest saving, because "left the aircon on all day" is a very common and very expensive mistake.
-- **Tariff and solar awareness.** Run harder during solar surplus or cheap tariff periods, ease off during peak.
-- **Room-by-room logic.** Cool the bedrooms in the evening and the living area during the day, rather than everything at once.
-- **Bushfire smoke response.** Switching to recirculate and closing up the house automatically when air quality drops is genuinely useful in a bad summer.
+## Option 1: a smart infrared controller
@@
-## Option 1: an infrared bridge
+**Best for:** almost anyone with a split system and an infrared remote, including renters.
@@
-**Best for:** almost anyone with a split system and an infrared remote.
+### How it works
@@
-An IR bridge is a small device that sits in the room and mimics your remote control. Your phone or voice assistant tells the bridge what to do, and it blasts the same infrared code your remote would.
+Your remote is not a thermostat. When you press "22 degrees, cool, fan auto", it transmits the entire settings state as one infrared burst. The indoor unit receives it, acts on it and beeps. It has no way to report back.
@@
-**Advantages:** cheap, works with essentially any unit regardless of brand or age, no wiring, no installer, and renters can use it freely. If your aircon is fifteen years old and has no smart capability whatsoever, this still works.
+A smart IR controller (also called an IR bridge or blaster) sits in the room and replicates that burst on demand. You tell the app or your voice assistant "22, cool, auto", the controller fires the matching IR code across the room, and the split system obeys exactly as if you had used the remote.
@@
-**The critical limitation:** infrared is one-way. The bridge sends a command and assumes it worked. It has no idea what the unit is actually doing.
+**Advantages:** it works with most units regardless of brand or age, needs no wiring and no installer, and nothing inside the air conditioner is touched. It plugs into a USB power supply and sits on a shelf, so it generally suits renters too — if you want to stick it to a wall, check your lease or your state's tenancy authority before using adhesive on the property.
@@
-That produces the classic failure mode: someone uses the physical remote to turn the aircon off, the smart home still believes it is on, and your automations start making decisions based on a false picture. Or the bridge sends "off" to a unit that was already off, and toggles it on.
+### The one-way problem
@@
-**Practical requirements:**
+Infrared is one-way. The controller sends a command and assumes it worked, so the app is guessing at the current state. The classic failure: someone turns the aircon off with the physical remote, the smart home still believes it is on, and your automations start making decisions based on a false picture. Or an "off" command goes to a unit that was already off and toggles it on.
@@
-- **Line of sight.** IR does not go through walls or around corners. The bridge needs to see the indoor unit. One bridge per room with an aircon.
-- **Codeset support.** The bridge needs the code library for your brand. Major Australian brands are well supported; obscure units sometimes are not. Check before buying.
-- **State correction.** Pair the bridge with a temperature sensor in the room, or a power monitor on the aircon circuit, so the system can infer the real state. This turns a frustrating setup into a reliable one, and it is the step most people skip.
+Better controllers work around this in two ways: a built-in temperature sensor, so the app knows the real room conditions, and an IR *receiver* that watches for presses on the original remote and updates its own state to match. That second feature is the biggest practical difference between a basic blaster and a better controller, and it is worth having in a busy household.
@@
-## Option 2: the manufacturer's Wi-Fi module
+### Budget blaster or sensor-led controller
@@
-**Best for:** anyone whose unit supports one.
+**Budget Tuya / Smart Life IR blasters**, sold widely on Amazon AU, eBay AU and Kogan, do the core job. You pick your aircon brand from a code library, test code sets until the unit responds, and link the app to Google Home or Alexa. Expect basic scheduling, cloud dependence and little or no state feedback.
@@
-Most major air conditioning brands sell a Wi-Fi adapter for their systems — sometimes built into newer units, sometimes an add-on module that plugs into a port inside the indoor unit.
+**Sensor-led controllers** behave more like a genuine thermostat. The Sensibo Air is the best-known example. Sensibo lists [a temperature and humidity sensor, a "universal IR receiver", geofencing that switches on before you arrive and off when the last person leaves, and support for Alexa, Google Assistant, Apple HomeKit and SmartThings](https://sensibo.com/products/sensibo-air). A budget blaster turns your split system into a remote you can talk to; a sensor-led controller turns it into something closer to a connected climate device. Both are legitimate — buy the one that matches what you actually want.
@@
-**Advantages:** genuine two-way communication. The system knows the real mode, real setpoint, real fan speed and often the actual room temperature as read by the unit's own sensor. Automations become dependable rather than hopeful. Some modules also report energy consumption.
+::product:sensibo-air-smart-air-conditioner-controller::
@@
-**Disadvantages:** more expensive, brand-specific, and often needs a technician to fit if it involves opening the indoor unit. Vendor apps range from decent to genuinely poor, and smart home integration quality varies enormously between brands — some integrate cleanly with Apple, Google and Alexa, others only work in their own app.
+## Option 2: the manufacturer's Wi-Fi adaptor
@@
-**Before buying:** check that the module actually integrates with your chosen platform, not just with the manufacturer's app. This catches people out regularly.
+**Best for:** owners of a unit that supports one.
+
+Many major brands sell a Wi-Fi adaptor for at least some of their indoor units. Daikin's Mobile Controller app, for example, [works with split and multi indoor units fitted with its BRP072C42 wireless LAN adaptor](https://www.daikin.com.au/products/commercial/system-controllers/daikin-mobile-controller), one adaptor per indoor unit. GENERAL (formerly Fujitsu General) describes its [anywAiR Wi-Fi adaptor II as a plug-in option for wall-mounted models such as the Lifestyle range](https://www.generalairstage.com.au/anywair/wi-fi-adaptor). Mitsubishi Electric's adaptor [connects to the air conditioner's control board and "should only be installed by an authorised installer"](https://www.mitsubishielectric.com.au/wi-fi/wi-fi-air-conditioning-control/); it is listed for M Series, P Series and CITY MULTI indoor units made after January 2015 and supports Alexa and Google Assistant. Panasonic and others offer adaptors for some models too — check your brand's Australian website with your indoor unit's model number.
+
+**Advantages:** genuine two-way communication. The app knows the real mode, setpoint and fan speed, so automations become dependable rather than hopeful.
+
+**Disadvantages:** brand-specific, only for compatible models, and some need a technician to fit. App quality and smart home integration vary a lot between brands.
+
+**Before buying:** confirm the adaptor works with *your* platform — Google Home, Alexa, Apple Home or Home Assistant — not just the manufacturer's own app. This catches people out regularly. It is also worth comparing the adaptor's installed cost with an IR controller before assuming the IR route is cheaper.
@@
-**Best for:** ducted systems, multi-head systems, and anyone wanting serious control.
+**Best for:** ducted systems, multi-head systems and anyone wanting serious control.
@@
-Several companies make controllers that wire into the indoor unit's control bus, giving full two-way control independent of the manufacturer's own ecosystem. For ducted systems with zoning, there are controllers designed specifically to manage zones intelligently.
+Several companies make controllers that connect to the indoor unit's control wiring, giving full two-way control independent of the manufacturer's ecosystem. For ducted systems with zoning, there are controllers designed specifically to manage zones.
@@
-**Advantages:** the most capable option, works where IR cannot reach, often better smart home integration than the manufacturer's own module.
+**Advantages:** the most capable option, works where IR cannot, and some integrate with smart home platforms better than the manufacturer's own adaptor.
@@
-**Disadvantages:** most expensive, requires professional installation, and compatibility is unit-specific. This is a considered purchase, not an impulse one.
+**Disadvantages:** usually the most expensive route, professionally installed, and compatibility is unit-specific. This is a considered purchase, not an impulse one.
@@
-## Making it actually reliable
+## Not after an app? A locked-down replacement remote
@@
-Whichever route you take, a few things separate a setup that works from one you turn off after a month.
+If your real goal is stopping people setting the aircon to 16 degrees, you may not need smart control at all. A universal replacement remote such as the Aircon Off Smart Remote swaps in for your existing remote and limits the temperatures it will send. Aircon Off says the Basic model is [preset to 21–30°C for cooling and 17–23°C for heating, fully adjustable](https://www.airconoff.com.au/air-conditioner-universal-remote-control-smart-remote-save-power-save-electricity-save-money), and it is marketed as compatible with any split system. The [Pro model](https://www.airconoff.com.au/Aircon-Off-Smart-Remote-PRO) adds programmable limits locked behind an access code, plus two optional timers. Neither is described as having Wi-Fi, app or voice control — it is a tamper-resistant remote, not a smart home device — but for a household or rental where overcooling is the problem, that may be exactly the point.
@@
-**Add a real temperature sensor.** The aircon's own sensor is at the indoor unit, near the ceiling, which is the warmest part of the room. A separate sensor at seated height in the middle of the room gives you a number that reflects how the room actually feels. Automate against that.
+::product:aircon-off-universal-air-conditioner-smart-remote::
@@
-**Add humidity, especially in Queensland and northern NSW.** Twenty-six degrees at 45% humidity and twenty-six degrees at 80% humidity are entirely different experiences. Humidity-aware automation is far more comfortable than temperature alone.
+## Where to put an IR controller
@@
-**Do not over-automate at first.** Start with two rules: turn off when everyone leaves, and pre-condition before someone arrives. Those two capture most of the value. Add complexity later, once you trust it.
+IR is line of sight — not "roughly in the direction of". The controller needs a clear path to the receiver window on the indoor unit.
+
+- **Stay within the stated range.** Sensibo, for example, specifies [line of sight to the AC unit up to 6 metres](https://support.sensibo.com/products/air/); check the figure for your model.
+- **Bounce is real but unreliable.** Signals can reflect off pale walls and ceilings, so an angled spot sometimes works. Test before you commit to double-sided tape.
+- **Avoid strong light on the sensor window.** Bright sunlight can interfere with infrared reception.
+- **Keep it near power.** The Sensibo Air runs from a 5V micro USB adaptor, so a USB plug in a nearby power point is all it needs — no electrical work.
+- **One controller per room.** IR does not go through walls. If the unit sits above a doorway on the far side of an L-shaped room, you may need a second controller rather than fighting the physics.
+
+## Setting up an IR controller
+
+1. **Note your aircon brand and remote model.** The model number on the remote is often what code libraries are organised by.
+2. **Check your Wi-Fi band.** Many controllers, including the Sensibo Air, connect on 2.4GHz only. If your router combines 2.4GHz and 5GHz under one network name and pairing fails, check the router's settings for a way to separate them during setup.
+3. **Pair the controller** using the vendor app.
+4. **Run the code-matching wizard** with the controller pointed at the indoor unit. Some brands match first try; older or less common units can take several attempts.
+5. **Test every function you care about** — cool, heat, dry, fan speed, swing and exact temperature. A code set can get power and temperature right but map swing incorrectly.
+6. **Link your voice assistant** by connecting the vendor's account in the Google Home or Alexa app, and assign the device to a room.
+7. **Use a name you would actually say.** "Lounge aircon" beats a default device ID every time.
+
+## Automations worth setting up
+
+- **Off when everyone leaves.** Geofencing or an "away" routine. This is the single biggest saving, because leaving the aircon on all day is a very common and expensive mistake.
+- **Pre-conditioning.** Start heating or cooling a short time before someone usually gets home, rather than running all afternoon.
+- **Open-door shutoff.** Pair with a contact sensor so the unit stops when a door or window is left open.
+- **Room-by-room logic.** Cool bedrooms in the evening and the living area during the day, rather than everything at once.
+- **Solar and tariff awareness.** If you monitor your solar system, run harder during surplus and ease off during peak tariff periods.
+- **Overnight profiles.** Step the setpoint gently through the night rather than holding one temperature.
+
+## Making it reliable
+
+**Add a room sensor.** The aircon's own sensor is in the indoor unit, usually high on the wall where the air is warmest. A separate sensor at seated height in the middle of the room gives a number that reflects how the room actually feels — automate against that. With a basic blaster, a temperature sensor or a power monitor on the aircon also lets the system infer whether the unit is really running.
+
+**Add humidity, especially in humid climates.** Twenty-six degrees at 45% humidity and at 80% humidity are very different experiences, and humidity-aware automation is more comfortable than temperature alone.
+
+**Start small.** Begin with two rules — off when everyone leaves, pre-condition before someone arrives. Those capture most of the value. Add complexity once you trust it.
@@
+## Home Assistant and local control
+
+Home Assistant's [Sensibo integration](https://www.home-assistant.io/integrations/sensibo/) is part of core and exposes a climate entity, but it is cloud polling rather than local. Tuya-based blasters are less straightforward: the official [Tuya integration](https://www.home-assistant.io/integrations/tuya/) is cloud-based and does not support the remote platform, so IR blasters may not appear as clean climate devices. If local-only control is a hard requirement, check current community reports for your exact model before buying.
+
+## What an IR controller won't do, and when to call a professional
+
+An IR controller cannot read the compressor, error codes, filter status or the unit's own energy use. It also cannot run ducted systems that use a wall controller, or units with a hard-wired remote. For those, look at the manufacturer's Wi-Fi adaptor or a third-party wired controller.
+
+Anything that involves opening the indoor unit or connecting to its control board is a job for the installer the manufacturer specifies, and doing it yourself may affect your warranty. Electrical work is regulated by each state and territory. Queensland's Electrical Safety Office, for instance, says [appliances that need to be hard-wired "must be connected by a licensed electrician"](https://www.electricalsafety.qld.gov.au/ddiy). Rules differ between states, so check with your installer, the manufacturer and your state's electrical safety regulator before anyone opens the unit.
+
@@
-Automating your air conditioner will make it more convenient, and it can make it cheaper — but the biggest savings come from *not running it* rather than running it smarter.
+Smart control makes an air conditioner more convenient, and it can make it cheaper — but the savings come from *not running it* when nobody needs it, not from the gadget itself. The highest-value automations are the boring ones: off when the house is empty, no cooling rooms nobody is in, and sensible setpoints. Set up the geofence and schedule properly and the benefit is real. Use it only as a voice remote and you have bought convenience, which is fine — just go in with clear eyes.
@@
-The highest-value automations are the boring ones: turn it off when the house is empty, do not cool rooms nobody is in, and shift what you can into solar-surplus hours instead of peak tariff periods. Fancy predictive setpoint logic is fun to build and marginal in effect by comparison.
+For the tariff side, our guide to [whether smart plugs actually save money](/energy-and-solar/smart-plugs-energy-monitoring-australia/) covers how load shifting works on Australian tariffs.
@@
-If you want to understand the tariff side of this properly, our guide to [whether smart plugs actually save money](/energy-and-solar/smart-plugs-energy-monitoring-australia/) covers how load shifting works on Australian tariffs.
```

## Full merged body

Most smart home advice about climate control is written for American central heating and cooling with a single wall thermostat. That is not how most Australian homes work.

We mostly run reverse-cycle split systems — one or more wall-mounted indoor units, each with its own infrared remote that lives somewhere between the couch cushions — or ducted systems with a wall controller. The advice for one does not transfer to the other, which is why so much of what you read online is unhelpful here.

The good news: you rarely need to replace a working split system to get app control, scheduling and voice commands. Here is what actually works, what each approach can and cannot do, and when you need a professional.

## Why bother

Heating and cooling is a big part of the power bill. The federal government's energy advice site says that, depending on climate zone, it can [account for 20% to 50% of the energy used in Australian homes](https://www.energy.gov.au/households/heating-and-cooling), and that each extra degree of heating in winter or cooling in summer increases energy use by between 5% and 10%. Automation will not change the physics, but it does make the money-saving habits happen without anyone having to remember them — above all, not running the aircon in an empty house.

## Option 1: a smart infrared controller

**Best for:** almost anyone with a split system and an infrared remote, including renters.

### How it works

Your remote is not a thermostat. When you press "22 degrees, cool, fan auto", it transmits the entire settings state as one infrared burst. The indoor unit receives it, acts on it and beeps. It has no way to report back.

A smart IR controller (also called an IR bridge or blaster) sits in the room and replicates that burst on demand. You tell the app or your voice assistant "22, cool, auto", the controller fires the matching IR code across the room, and the split system obeys exactly as if you had used the remote.

**Advantages:** it works with most units regardless of brand or age, needs no wiring and no installer, and nothing inside the air conditioner is touched. It plugs into a USB power supply and sits on a shelf, so it generally suits renters too — if you want to stick it to a wall, check your lease or your state's tenancy authority before using adhesive on the property.

### The one-way problem

Infrared is one-way. The controller sends a command and assumes it worked, so the app is guessing at the current state. The classic failure: someone turns the aircon off with the physical remote, the smart home still believes it is on, and your automations start making decisions based on a false picture. Or an "off" command goes to a unit that was already off and toggles it on.

Better controllers work around this in two ways: a built-in temperature sensor, so the app knows the real room conditions, and an IR *receiver* that watches for presses on the original remote and updates its own state to match. That second feature is the biggest practical difference between a basic blaster and a better controller, and it is worth having in a busy household.

### Budget blaster or sensor-led controller

**Budget Tuya / Smart Life IR blasters**, sold widely on Amazon AU, eBay AU and Kogan, do the core job. You pick your aircon brand from a code library, test code sets until the unit responds, and link the app to Google Home or Alexa. Expect basic scheduling, cloud dependence and little or no state feedback.

**Sensor-led controllers** behave more like a genuine thermostat. The Sensibo Air is the best-known example. Sensibo lists [a temperature and humidity sensor, a "universal IR receiver", geofencing that switches on before you arrive and off when the last person leaves, and support for Alexa, Google Assistant, Apple HomeKit and SmartThings](https://sensibo.com/products/sensibo-air). A budget blaster turns your split system into a remote you can talk to; a sensor-led controller turns it into something closer to a connected climate device. Both are legitimate — buy the one that matches what you actually want.

::product:sensibo-air-smart-air-conditioner-controller::

## Option 2: the manufacturer's Wi-Fi adaptor

**Best for:** owners of a unit that supports one.

Many major brands sell a Wi-Fi adaptor for at least some of their indoor units. Daikin's Mobile Controller app, for example, [works with split and multi indoor units fitted with its BRP072C42 wireless LAN adaptor](https://www.daikin.com.au/products/commercial/system-controllers/daikin-mobile-controller), one adaptor per indoor unit. GENERAL (formerly Fujitsu General) describes its [anywAiR Wi-Fi adaptor II as a plug-in option for wall-mounted models such as the Lifestyle range](https://www.generalairstage.com.au/anywair/wi-fi-adaptor). Mitsubishi Electric's adaptor [connects to the air conditioner's control board and "should only be installed by an authorised installer"](https://www.mitsubishielectric.com.au/wi-fi/wi-fi-air-conditioning-control/); it is listed for M Series, P Series and CITY MULTI indoor units made after January 2015 and supports Alexa and Google Assistant. Panasonic and others offer adaptors for some models too — check your brand's Australian website with your indoor unit's model number.

**Advantages:** genuine two-way communication. The app knows the real mode, setpoint and fan speed, so automations become dependable rather than hopeful.

**Disadvantages:** brand-specific, only for compatible models, and some need a technician to fit. App quality and smart home integration vary a lot between brands.

**Before buying:** confirm the adaptor works with *your* platform — Google Home, Alexa, Apple Home or Home Assistant — not just the manufacturer's own app. This catches people out regularly. It is also worth comparing the adaptor's installed cost with an IR controller before assuming the IR route is cheaper.

## Option 3: a third-party wired controller

**Best for:** ducted systems, multi-head systems and anyone wanting serious control.

Several companies make controllers that connect to the indoor unit's control wiring, giving full two-way control independent of the manufacturer's ecosystem. For ducted systems with zoning, there are controllers designed specifically to manage zones.

**Advantages:** the most capable option, works where IR cannot, and some integrate with smart home platforms better than the manufacturer's own adaptor.

**Disadvantages:** usually the most expensive route, professionally installed, and compatibility is unit-specific. This is a considered purchase, not an impulse one.

## Not after an app? A locked-down replacement remote

If your real goal is stopping people setting the aircon to 16 degrees, you may not need smart control at all. A universal replacement remote such as the Aircon Off Smart Remote swaps in for your existing remote and limits the temperatures it will send. Aircon Off says the Basic model is [preset to 21–30°C for cooling and 17–23°C for heating, fully adjustable](https://www.airconoff.com.au/air-conditioner-universal-remote-control-smart-remote-save-power-save-electricity-save-money), and it is marketed as compatible with any split system. The [Pro model](https://www.airconoff.com.au/Aircon-Off-Smart-Remote-PRO) adds programmable limits locked behind an access code, plus two optional timers. Neither is described as having Wi-Fi, app or voice control — it is a tamper-resistant remote, not a smart home device — but for a household or rental where overcooling is the problem, that may be exactly the point.

::product:aircon-off-universal-air-conditioner-smart-remote::

## Where to put an IR controller

IR is line of sight — not "roughly in the direction of". The controller needs a clear path to the receiver window on the indoor unit.

- **Stay within the stated range.** Sensibo, for example, specifies [line of sight to the AC unit up to 6 metres](https://support.sensibo.com/products/air/); check the figure for your model.
- **Bounce is real but unreliable.** Signals can reflect off pale walls and ceilings, so an angled spot sometimes works. Test before you commit to double-sided tape.
- **Avoid strong light on the sensor window.** Bright sunlight can interfere with infrared reception.
- **Keep it near power.** The Sensibo Air runs from a 5V micro USB adaptor, so a USB plug in a nearby power point is all it needs — no electrical work.
- **One controller per room.** IR does not go through walls. If the unit sits above a doorway on the far side of an L-shaped room, you may need a second controller rather than fighting the physics.

## Setting up an IR controller

1. **Note your aircon brand and remote model.** The model number on the remote is often what code libraries are organised by.
2. **Check your Wi-Fi band.** Many controllers, including the Sensibo Air, connect on 2.4GHz only. If your router combines 2.4GHz and 5GHz under one network name and pairing fails, check the router's settings for a way to separate them during setup.
3. **Pair the controller** using the vendor app.
4. **Run the code-matching wizard** with the controller pointed at the indoor unit. Some brands match first try; older or less common units can take several attempts.
5. **Test every function you care about** — cool, heat, dry, fan speed, swing and exact temperature. A code set can get power and temperature right but map swing incorrectly.
6. **Link your voice assistant** by connecting the vendor's account in the Google Home or Alexa app, and assign the device to a room.
7. **Use a name you would actually say.** "Lounge aircon" beats a default device ID every time.

## Automations worth setting up

- **Off when everyone leaves.** Geofencing or an "away" routine. This is the single biggest saving, because leaving the aircon on all day is a very common and expensive mistake.
- **Pre-conditioning.** Start heating or cooling a short time before someone usually gets home, rather than running all afternoon.
- **Open-door shutoff.** Pair with a contact sensor so the unit stops when a door or window is left open.
- **Room-by-room logic.** Cool bedrooms in the evening and the living area during the day, rather than everything at once.
- **Solar and tariff awareness.** If you monitor your solar system, run harder during surplus and ease off during peak tariff periods.
- **Overnight profiles.** Step the setpoint gently through the night rather than holding one temperature.

## Making it reliable

**Add a room sensor.** The aircon's own sensor is in the indoor unit, usually high on the wall where the air is warmest. A separate sensor at seated height in the middle of the room gives a number that reflects how the room actually feels — automate against that. With a basic blaster, a temperature sensor or a power monitor on the aircon also lets the system infer whether the unit is really running.

**Add humidity, especially in humid climates.** Twenty-six degrees at 45% humidity and at 80% humidity are very different experiences, and humidity-aware automation is more comfortable than temperature alone.

**Start small.** Begin with two rules — off when everyone leaves, pre-condition before someone arrives. Those capture most of the value. Add complexity once you trust it.

**Give people a manual override.** If the automation fights the occupants, the occupants win and the automation gets deleted. Make sure using the remote does something sensible, and that automations back off for a while after manual intervention.

## Home Assistant and local control

Home Assistant's [Sensibo integration](https://www.home-assistant.io/integrations/sensibo/) is part of core and exposes a climate entity, but it is cloud polling rather than local. Tuya-based blasters are less straightforward: the official [Tuya integration](https://www.home-assistant.io/integrations/tuya/) is cloud-based and does not support the remote platform, so IR blasters may not appear as clean climate devices. If local-only control is a hard requirement, check current community reports for your exact model before buying.

## What an IR controller won't do, and when to call a professional

An IR controller cannot read the compressor, error codes, filter status or the unit's own energy use. It also cannot run ducted systems that use a wall controller, or units with a hard-wired remote. For those, look at the manufacturer's Wi-Fi adaptor or a third-party wired controller.

Anything that involves opening the indoor unit or connecting to its control board is a job for the installer the manufacturer specifies, and doing it yourself may affect your warranty. Electrical work is regulated by each state and territory. Queensland's Electrical Safety Office, for instance, says [appliances that need to be hard-wired "must be connected by a licensed electrician"](https://www.electricalsafety.qld.gov.au/ddiy). Rules differ between states, so check with your installer, the manufacturer and your state's electrical safety regulator before anyone opens the unit.

## A note on running costs

Smart control makes an air conditioner more convenient, and it can make it cheaper — but the savings come from *not running it* when nobody needs it, not from the gadget itself. The highest-value automations are the boring ones: off when the house is empty, no cooling rooms nobody is in, and sensible setpoints. Set up the geofence and schedule properly and the benefit is real. Use it only as a voice remote and you have bought convenience, which is fine — just go in with clear eyes.

For the tariff side, our guide to [whether smart plugs actually save money](/energy-and-solar/smart-plugs-energy-monitoring-australia/) covers how load shifting works on Australian tariffs.
