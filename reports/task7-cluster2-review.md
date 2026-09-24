# Task 7 review: cluster 2, smart plugs and energy monitors

**Nothing has been written to Strapi.** Reply **approve** to publish the merged article, apply the six cross-links and add the redirect. Then unpublish the MERGE post in the Strapi admin.

Survivor chosen by the user: the current survivor (`…lower-power-bill-australia`). `smart-plugs-energy-monitoring-australia`, the smart plug buying guide and the what-not-to-plug safety post stay separate, as the prompt asks, and now cross-link.

| | Slug | Title | Words | Product boxes shown |
|---|---|---|---|---|
| **KEEP** | smart-plugs-energy-monitors-lower-power-bill-australia | How Smart Plugs and Energy Monitors Can Cut Your Australian Power Bill | 1077 | 3 of 5 markers render (5 → 3 after merge, all visible) |
| MERGE | smart-plugs-energy-monitors-cut-power-bill-australia | How Smart Plugs and Energy Monitors Can Cut Your Aussie Power Bill Without Solar | 977 | 0 |

## What happens on approve

1. **KEEP updated in Strapi:** body, excerpt, keyTakeaways and FAQ from the draft below. Title "How Smart Plugs and Energy Monitors Can Cut Your Australian Power Bill" (unchanged); seoTitle "Smart Plugs & Energy Monitors: Cut Power Bills in Australia"; seoDescription "How smart plugs and energy monitors help Australian homes cut standby waste, shift loads off peak tariffs and find costly appliances, no solar needed.". `publishDate` set to its creation date (24 Sep 2026, it had none); `dateModified` today. KEEP had not been fact-checked before; its claims were checked too (see decisions).
2. **Six cross-link sentences** added to the three separate posts, two each, applied by exact string replacement (before/after below). Nothing else in those posts changes.
3. **301** `/energy-and-solar/smart-plugs-energy-monitors-cut-power-bill-australia/` → `/energy-and-solar/smart-plugs-energy-monitors-lower-power-bill-australia/` added to `data/redirects-adsense.json` (already live via `data/merged-articles.json`). No published post links to the MERGE URL.
4. **You unpublish the MERGE post** in the Strapi admin.
5. Build, audit, changelog.

Backups: `exports/strapi-backup/<slug>-2026-09-24T10-59-37-548Z.json` (all five posts).

## Product boxes

- **Kept:** Tapo P110, Eve Energy, EcoFlow Delta 2. All three have a catalogue verdict and render on the live page.
- **Dropped:** Eve Energy Strip, because Eve's official page lists only EU and North American versions and the catalogue entry has no image. Shelly 1PM Gen3 is also dropped (my edit): it has a verdict, but the site hides its box as an empty listing, so the marker rendered nothing. The prose about the Shelly relay stays.

## Corrections worth knowing

- **Pool pumps removed as a plug load** in KEEP: the Tapo P110's AU spec lists a 1/10 HP motor limit.
- KEEP's internal links used `/energy/…` paths; fixed to `/energy-and-solar/…`.
- **Not changed, flagged:** the buying guide implies the Tapo P300 powerboard monitors energy; TP-Link's AU page lists no monitoring. The energy-monitoring post (not fact-checked, no product boxes) has unsourced claims and also suggests pool pumps on a plug, and its Safety section repeats the safety post; the recommendation is to cut it to a summary plus links. Both are separate follow-ups.

---

# Section map: MERGE → KEEP

MERGE: `smart-plugs-energy-monitors-cut-power-bill-australia` (unpublish, 301 to KEEP)
KEEP: `smart-plugs-energy-monitors-lower-power-bill-australia`

## Body

| MERGE item | Status | Where in merged KEEP |
| --- | --- | --- |
| Intro: find hidden drains and switch them off automatically; no solar or battery needed | COVERED + UNIQUE angle ("no solar") | Intro (now says it needs no solar or battery) and the closing "Getting Started Without Overspending" |
| H2 Where Your Power Bill Actually Goes: big appliances assumed, but small always-on devices add up | UNIQUE (framing) | New H2 "Where Your Power Bill Actually Goes", merged with KEEP's "Why Energy Monitoring Actually Saves Money" |
| H3 Standby Power and Phantom Loads: "phantom load" term, consoles/set-top boxes/chargers | COVERED (KEEP Standby Power Problem); "phantom load" term UNIQUE | H3 "Standby Power and Phantom Loads" |
| "one device might only cost a few dollars a year … ten or fifteen items" | UNIQUE, not supported | Removed (c). Replaced with the energy.gov.au figure (up to 3%, up to $100 a year) |
| H3 The Appliances Worth Watching: entertainment, bar fridges, pool pumps, heaters, air fryers, slow cookers | UNIQUE | H3 "The Appliances Worth Watching". Pool pumps moved to the tariff and in-wall sections because of the plug motor rating |
| Heating elements caution, with link to the safety post | COVERED (KEEP "Watch for Appliances That Shouldn't Be Automated") | Merged into "The Appliances Worth Watching" |
| H2 How Smart Plugs Help: a plug sits between the outlet and the appliance; many AU models include monitoring | COVERED (KEEP intro to the plug section, FAQ 3027) | H2 "Smart Plugs vs Energy Monitors: What Each Does" |
| H3 Scheduling and Automation: overnight, peak, outdoor lighting, garage fridge | COVERED in part (KEEP Set Realistic Schedules); outdoor lighting UNIQUE | H3 "Scheduling and Remote Switch-Off". Garage-fridge scheduling dropped: fridges should not be switched off |
| H3 Remote Switch-Off When You Forget (heater, hair straightener) | UNIQUE | H3 "Scheduling and Remote Switch-Off", with the examples changed to TV, console and lamp and a heating-element caveat (heater manuals warn against automatic switching) |
| H3 Whole-Home vs Plug-Level Monitors: switchboard needs an electrician; plug-level suits renters | UNIQUE | H3 "Plug-Level vs Whole-Home Monitoring", with a new pointer to retailer smart-meter apps (energy.gov.au) |
| Link to the "do smart plugs save money" post | COVERED | "Standby Power and Phantom Loads" |
| H3 Start With Your Biggest Suspects: monitor a week or two | COVERED (KEEP Getting Started) | H3 "Start With Your Biggest Suspects" |
| H3 Review, Adjust, Repeat | UNIQUE | H3 "Review, Adjust, Repeat" |
| H3 Compatibility and Load Ratings | COVERED in depth by the buying guide and the safety post | Cut to a one-line summary in "Before You Buy", plus a link |
| H3 App Ecosystem and Local Support: AU retailer, warranty | UNIQUE (short) | "Before You Buy", one sentence (retailer names dropped) |
| H2 Renters and Strata Considerations | COVERED (KEEP) | H2 "Renters and Strata" |

## FAQ

| MERGE FAQ | Status | Merged FAQ |
| --- | --- | --- |
| 3014 Do smart plugs really lower your bill? | COVERED by 3026 | 3026 (adapted) |
| 3015 Smart plug vs energy monitor | COVERED by 3027 | 3027 (adapted: "some combine both") |
| 3016 Can I install a whole-home monitor myself? | UNIQUE | Folded into 3030 |
| 3017 Are smart plugs safe with heaters? | UNIQUE here, but the safety post already answers it ("Can I run a portable heater from a smart plug?") | Not carried over, to avoid a duplicate across the cluster. The body links to the safety post |
| 3018 Will a smart plug work in a rental? | COVERED by 3028 | 3028 |
| 3019 How many smart plugs do I need? | UNIQUE | Folded into 3031 |

KEEP FAQ 3029 (power boards vs individual plugs) was dropped to stay within six FAQs. Its product (Eve Energy Strip) was also dropped. The one new FAQ is "How do I know if I'm on a time-of-use tariff?" (no id).

FAQ sources: 3026 (plug standby) links to the smart-plugs-energy-monitoring-australia post. The time-of-use FAQ draws on https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs and https://www.energy.gov.au/households/find-the-best-energy-deal. 3030 draws on https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself. 3027 draws on https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/.

# Decisions (claims in the merged text)

Every page listed was opened: energy.gov.au pages with curl (WebFetch timed out) and parsed for the quoted sentences; the others with WebFetch.

| Claim | Origin | Decision | Source |
| --- | --- | --- | --- |
| Standby can be up to 3% of household energy use and up to $100 a year; switch off at the wall or use smart-plug timers, except fridges, freezers and medical equipment | new | a | https://www.energy.gov.au/households/appliances |
| "one device costs a few dollars a year" | MERGE | c (removed) | — |
| Time-of-use: peak/off-peak/shoulder; peak usually weekday evenings, off-peak overnight and weekends; windows set by the retailer; demand charges | KEEP (expanded) | a | https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs |
| Tariff rates | — | b (not quoted; "check your bill / plan") | — |
| Controlled-load hot water | new | a | same tariffs page |
| Comparison services by state (Energy Made Easy; Victorian Energy Compare in Vic; WA/NT own) | new | a | https://www.energy.gov.au/households/find-the-best-energy-deal, https://www.energymadeeasy.gov.au/ |
| Retailer smart-meter apps show when you use most | new | a | https://www.energy.gov.au/households/smart-homes |
| Tapo P110: tracks energy, rate input for bill estimates, schedules, 10 A / 2300 W / 1/10 HP motor | KEEP | a | https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/ |
| Eve Energy: tracks consumption, no Eve cloud, Thread router node, needs a Thread + Matter hub | KEEP | a (the "Apple TV or HomePod mini" example was removed as unverified; Apple's support page did not confirm it) | https://www.evehome.com/en-us/eve-energy (the AU page 404s; an AU version is sold, per the Amazon AU listing) |
| Eve Energy Strip: surge protection, three outlets, total consumption | KEEP | c (product and marker dropped: Eve's official page lists only EU and North American versions, no AU plug, and the catalogue entry has no product image) | https://www.evehome.com/en/eve-energy-strip |
| Shelly 1PM Gen3: real-time power measurement; fits wall boxes behind sockets and switches | KEEP | a | https://kb.shelly.cloud/knowledge-base/shelly-1pm-gen3 |
| Shelly used for solar diversion | KEEP | c (removed; not in the manufacturer documentation opened) | — |
| Fixed-wiring work needs a licensed electrician; not DIY, even for small jobs | KEEP + MERGE | a (replaces the unverified "in line with AS/NZS wiring rules"; also points to the reader's state regulator) | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself |
| "240V" plug / powerpoint | KEEP + MERGE | c (voltage removed; not needed. Plug rating stated as 10 A from the TP-Link page) | — |
| EcoFlow Delta 2: 1024 Wh LiFePO4, 1800 W AC, home backup | KEEP | a (the price was on the page but not quoted) | https://au.ecoflow.com/products/delta-2-portable-power-station |
| "bushfire-season blackouts common in regional Australia" | KEEP | c (generalised to "a storm or other blackout") | — |
| Heater manuals warn against timers and automatic switching | MERGE (implied) | b (general "some heater manuals"; specific manuals are cited in the safety post) | via the what-not-to-plug post |
| Motor rating: some plugs list a much smaller motor limit (P110 1/10 HP) | new | a | TP-Link P110 AU page |
| Plug standby draw means it may not pay its way on low-standby devices | new (summary) | b (no figure; links to the "do smart plugs save money" post) | — |
| RCM / consumer guarantees in "Before You Buy" | summary | b (stated generally; the sources are cited in the buying guide, which is linked) | — |
| Tenancy / strata approval | KEEP + MERGE | b (hedged: "usually"; points to the lease, by-laws and state tenancy authority) | — |

# Products

| Marker | Verdict (products.json) | Discussed in text | Decision |
| --- | --- | --- | --- |
| tp-link-tapo-p110-smart-plug-with-energy-monitoring | bestFor ✓ | yes | kept |
| eve-energy-smart-plug-matter-over-thread | bestFor ✓ | yes | kept |
| shelly-1pm-gen3-wi-fi-power-relay | bestFor ✓ | yes | kept |
| ecoflow-delta-2-portable-power-station-1024wh | bestFor ✓ | yes | kept |
| eve-energy-strip-3-outlet-smart-power-board | bestFor ✓ | was | **dropped**: no AU version on the official page, no product image (og-default), search-only retailer links. Recommending it would contradict the article's own RCM/AU-approval advice. The text now gives generic power-board advice |

Also fixed: KEEP's internal links used `/energy/…` and now use `/energy-and-solar/…/`. KEEP's P110 link pointed to the site homepage and now points to TP-Link AU.

## Needs human legal review

- Renters and strata: "Plug-in smart plugs … don't touch the building's fixed wiring" and fixed-wiring work "will usually need the owner's or body corporate's approval". Tenancy law varies by state. The text is hedged and points to the state tenancy authority, but a human should confirm the wording (body section and FAQ 3028).
- Electrical work: "Fitting one means working on fixed wiring, and that is not a DIY job … Use a licensed electrician". This is sourced to Energy Safe Victoria only. Other states are covered by "check your own state or territory's electrical safety regulator", which a human should confirm is adequate.
- Consumer guarantees / warranty sentence in "Before You Buy". It is summary only; the sources are in the buying guide.

## Flagged, not changed

- **smart-plug-buying-guide-australia (fact-checked earlier)**: it presents the Tapo P300 power strip right after the energy-monitoring paragraph ("does the same job across three sockets"). TP-Link's AU P300 page (https://www.tp-link.com/au/home-networking/smart-plug/tapo-p300/) lists no energy monitoring. That reads as an inaccurate implication. Recommend rewording to "switches three sockets individually" or moving the marker.
- **smart-plugs-energy-monitoring-australia (not fact-checked)**: unsourced claims include "highest rate of rooftop solar per capita in the world", smart plug draw "between half a watt and two watts", modern standby "well under a watt", "typically rated to 10 amps", and the approval, pin and insulation claims. It also lists pool pumps as a smart-plug load; common plugs list small motor limits (P110: 1/10 HP), which conflicts with the safety post's motor section. It needs its own fact-check pass.
- **energy.gov.au smart-homes page** says the energy savings of smart devices "will generally exceed the additional energy they use". That is in tension with the "do smart plugs save money" post's net-loss claim for low-standby devices. The merged text avoids taking a side (it says a plug "may not pay its way").
- The merge's 301 (MERGE → KEEP) and unpublishing are for the caller to apply. Nothing was written to Strapi.


---

# Cross-link proposals (Part B)

Apply by exact string replacement; each `before` occurs exactly once in its post.

## smart-plugs-energy-monitoring-australia

**Why:** Section 3 is the diagnosis use case; KEEP is the practical how-to for it.

**Before:**

> The smart plug's value was in the diagnosis, not the control. That is a perfectly good return on a modest purchase.

**After:**

> The smart plug's value was in the diagnosis, not the control. That is a perfectly good return on a modest purchase. For a step-by-step approach to measuring appliances and acting on the data, see [how smart plugs and energy monitors can cut your Australian power bill](https://nxtsmarthome.com.au/energy-and-solar/smart-plugs-energy-monitors-lower-power-bill-australia/).

## smart-plugs-energy-monitoring-australia

**Why:** Safety section is a thin version of the dedicated safety post.

**Before:**

> **Do not daisy-chain.** A smart plug into a power board into another smart plug is a bad idea for the same reason any daisy chain is.

**After:**

> **Do not daisy-chain.** A smart plug into a power board into another smart plug is a bad idea for the same reason any daisy chain is. Which appliances to keep off smart plugs altogether is covered in [what you should never plug into a smart plug](https://nxtsmarthome.com.au/energy-and-solar/what-not-to-plug-into-a-smart-plug-australia/).

## smart-plug-buying-guide-australia

**Why:** Energy-monitoring section naturally leads to the bill-reduction guide.

**Before:**

> Treat the numbers as a guide to relative size and change over time, not as a bill you can audit.

**After:**

> Treat the numbers as a guide to relative size and change over time, not as a bill you can audit. For how to turn those readings into a lower bill, see [how smart plugs and energy monitors can cut your Australian power bill](https://nxtsmarthome.com.au/energy-and-solar/smart-plugs-energy-monitors-lower-power-bill-australia/).

## smart-plug-buying-guide-australia

**Why:** Load-rating section overlaps the safety post; link instead of expanding.

**Before:**

> For a lamp, a television, a phone charger or a fan, the rating is academic — those loads are nowhere near the limit.

**After:**

> For a lamp, a television, a phone charger or a fan, the rating is academic — those loads are nowhere near the limit. For the appliances that should stay off a smart plug entirely, and why, see [what not to plug into a smart plug](https://nxtsmarthome.com.au/energy-and-solar/what-not-to-plug-into-a-smart-plug-australia/).

## what-not-to-plug-into-a-smart-plug-australia

**Why:** Points readers wanting the energy-monitoring use to KEEP.

**Before:**

> If part of the reason is finding out what an appliance actually costs to run, a plug with energy monitoring answers that question directly — and it is a far better use of a plug than switching something that should never be switched.

**After:**

> If part of the reason is finding out what an appliance actually costs to run, a plug with energy monitoring answers that question directly — and it is a far better use of a plug than switching something that should never be switched. Our guide to [using smart plugs and energy monitors to cut your power bill](https://nxtsmarthome.com.au/energy-and-solar/smart-plugs-energy-monitors-lower-power-bill-australia/) covers what to measure first.

## what-not-to-plug-into-a-smart-plug-australia

**Why:** Rating check links to the buying guide's load-rating section.

**Before:**

> 2. **The plug's rating**, against the appliance's draw. If it is close, do not.

**After:**

> 2. **The plug's rating**, against the appliance's draw. If it is close, do not. Our [smart plug buying guide](https://nxtsmarthome.com.au/energy-and-solar/smart-plug-buying-guide-australia/) explains how to check ratings before you buy.

# Sections that substantially repeat another post in the cluster

| Post | Section | Repeats | Recommendation |
| --- | --- | --- | --- |
| smart-plugs-energy-monitoring-australia | Safety: the part worth taking seriously (load rating, Australian approval, daisy-chaining) | what-not-to-plug-into-a-smart-plug-australia (current rating, power boards/daisy-chain) and smart-plug-buying-guide-australia (Check for compliance) | Cut to two sentences plus links to the safety post and buying guide. This post has not been fact-checked: its "10 amps" and approval claims are unsourced. |
| smart-plug-buying-guide-australia | Start with the load, not the features | what-not-to-plug-into-a-smart-plug-australia: Everything starts with the current rating / Category one | Keep the buying-guide angle (check the rating on the listing), and leave the appliance-by-appliance list to the safety post. The proposed cross-link covers this. |
| smart-plug-buying-guide-australia | Energy monitoring: useful, not exact | smart-plugs-energy-monitoring-australia section 3 and KEEP (monitoring) | Different angle (accuracy, cumulative kWh), so light overlap only. Keep it and add the proposed link to KEEP. |
| what-not-to-plug-into-a-smart-plug-australia | What smart plugs are genuinely good for | KEEP "The Appliances Worth Watching" | Light overlap. No change needed beyond the proposed link. |
| smart-plugs-energy-monitoring-australia | 1. Shifting large loads to cheaper tariff periods | KEEP "Time-of-Use and Demand Tariffs" | Now reduced in KEEP to tariff mechanics plus pointers to official sources. No change is needed in either post, but see the pool-pump flag in section-map.md (Flagged, not changed). |


---

## Merged article: meta

- **title:** How Smart Plugs and Energy Monitors Can Cut Your Australian Power Bill
- **seoTitle:** Smart Plugs & Energy Monitors: Cut Power Bills in Australia
- **seoDescription:** How smart plugs and energy monitors help Australian homes cut standby waste, shift loads off peak tariffs and find costly appliances, no solar needed.
- **excerpt:** Smart plugs and energy monitors won't rewire your home, but they can show you where your electricity is going and help you cut waste from standby power, forgotten devices and peak-tariff usage — no solar or battery required.
- **keyTakeaways:** ["A smart plug doesn't save energy on its own; the savings come from acting on what monitoring shows you.", 'Standby power can account for up to 3% of household energy use, according to energy.gov.au — but fridges, freezers and medical equipment should stay on.', "On a time-of-use or demand tariff, moving flexible loads out of peak periods matters more than trimming standby; check your bill for your plan's windows.", "Check a plug's load and motor ratings before using it with anything that heats, cools or runs a motor.", 'Hardwired loads need an in-wall relay or switchboard monitor, fitted by a licensed electrician.', 'Start with two or three suspect appliances and a few weeks of data before buying more plugs.']

### FAQ (6)

**Do smart plugs really reduce electricity bills in Australia?** (KEEP #3026)

They can help, but the plug itself doesn't save energy. It shows you where energy is being used and lets you switch off or schedule devices that run unnecessarily. Savings depend on what you plug in: a plug on a modern low-standby device may use about as much as it saves, while finding an old second fridge or an entertainment unit left on around the clock can make a noticeable difference over a billing cycle.

**What's the difference between a smart plug and an energy monitor?** (KEEP #3027)

A basic smart plug only offers remote or scheduled on/off switching. An energy monitor measures how much electricity an appliance, or your whole home, uses over time. Some plugs combine both. For lowering your bill, choose a plug that specifically lists energy monitoring and reports cumulative kilowatt-hours.

**How do I know if I'm on a time-of-use tariff?** (new)

Check your electricity bill or your retailer's plan details, which list whether you pay peak, off-peak and shoulder rates and when each applies. The windows are set by your retailer and vary by state, so don't rely on general figures. Government comparison services such as Energy Made Easy, or Victorian Energy Compare in Victoria, can help you compare plans.

**Which appliances should I monitor first, and how many plugs do I need?** (KEEP #3031)

There's no fixed number. Most households start with two or three plugs on likely culprits such as an old fridge or freezer, an entertainment unit or a games console, monitor them for a week or two, then decide whether to replace, reschedule or leave each one. Use the plug to measure a fridge or freezer, not to switch it off.

**Do I need an electrician to install a smart plug or energy monitor?** (KEEP #3030)

Plug-in smart plugs and monitors connect to an existing powerpoint and don't need an electrician. In-wall relays and whole-home monitors that connect at the switchboard involve fixed wiring, which is a job for a licensed electrician. Check your state or territory's electrical safety regulator for the rules where you live.

**Can renters use smart plugs without landlord permission?** (KEEP #3028)

Plug-in smart plugs don't alter the property's fixed wiring and can be taken with you when you move, which makes them a common choice for renters. Anything involving fixed wiring is different and will usually need the owner's or body corporate's approval. Tenancy rules and strata by-laws vary by state, so check your lease, your by-laws or your state's tenancy authority if you're unsure.

## Body diff against the current KEEP post

```diff
--- KEEP now
+++ merged
@@
-Smart plugs and energy monitors cut your power bill by revealing which appliances actually cost the most to run, then letting you schedule, automate or switch them off remotely. The savings come from eliminating standby power, avoiding peak-tariff usage and catching faulty or forgotten devices before they quietly rack up charges.
+Smart plugs and energy monitors can help lower your power bill by showing which appliances actually cost the most to run, then letting you schedule, automate or switch them off remotely. The savings come from trimming standby power, moving flexible loads out of peak-tariff periods and catching faulty or forgotten devices before they quietly add to your bill — and none of it needs solar panels or a battery.
@@
-## Why Energy Monitoring Actually Saves Money
+## Where Your Power Bill Actually Goes
@@
-Most Australian households have a rough idea of their biggest power users, but rough ideas rarely translate into behaviour change. A smart plug with built-in energy monitoring shows real kilowatt-hour (kWh) figures for a single appliance, so you can see whether that old bar fridge in the garage, the pool pump, or the kids' gaming console is actually worth what it's costing.
+Most Australian households have a rough idea of their biggest power users — the air conditioner, the heater, the hot water system — and that is often right. But rough ideas rarely change behaviour, and a surprising share of usage can also come from smaller devices left running around the clock. A smart plug with built-in energy monitoring shows real kilowatt-hour (kWh) figures for a single appliance, so you can see whether that old bar fridge in the garage, the chest freezer or the kids' gaming console is worth what it costs to run.
@@
-### The Standby Power Problem
+### Standby Power and Phantom Loads
@@
-Many appliances draw power even when "off" — set-top boxes, game consoles, chargers left plugged in, and older televisions all sip electricity around the clock. Individually these draws seem trivial, but across a household running multiple devices 24/7, standby power can add up over a billing cycle. A monitoring smart plug lets you quantify this rather than guess, and then decide whether a scheduled cutoff makes sense.
+Set-top boxes, game consoles, microwaves, chargers left plugged in and stereos can keep drawing power while switched "off" — often called standby or phantom load. The Australian Government's energy advice site says [standby power can account for up to 3% of household energy use and cost up to $100 a year](https://www.energy.gov.au/households/appliances), and suggests switching appliances off at the wall or using smart plugs on timers — with the exception of fridges, freezers and critical medical equipment, which should stay on.
@@
-### Time-of-Use Tariffs and Peak Avoidance
+A monitoring smart plug lets you measure this rather than guess, and then decide whether a scheduled cut-off makes sense. Bear in mind the plug itself draws a little power to stay connected, so on a modern low-standby device it may not pay its way. We cover where that line sits in [whether smart plugs actually save money on Australian electricity](https://nxtsmarthome.com.au/energy-and-solar/smart-plugs-energy-monitoring-australia/).
@@
-If your retailer has you on a time-of-use or demand tariff, running heavy appliances like pool pumps, pool heaters or electric water heaters during peak pricing windows can be expensive. Energy monitors help you confirm when these loads actually run and shift them to off-peak periods using scheduling, without having to manually flick switches at odd hours.
+### The Appliances Worth Watching
+
+Good candidates for monitoring include entertainment systems, second fridges and bar fridges, chest freezers and countertop appliances such as air fryers or slow cookers. These tend either to run longer than needed or to get left on by accident. For fridges and freezers, use the plug to measure, never to switch them off.
+
+Appliances with heating elements, such as portable heaters, are worth understanding too — but many should not be switched by a smart plug at all, and some heater manuals specifically warn against timers or automatic switching. Before you automate anything that heats, cools or runs a motor, read [what you should never plug into a smart plug](https://nxtsmarthome.com.au/energy-and-solar/what-not-to-plug-into-a-smart-plug-australia/).
+
+### Time-of-Use and Demand Tariffs
+
+On a [time-of-use tariff](https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs), you pay a higher rate per kWh in the peak period and a lower rate off-peak, and some plans add a shoulder rate in between. Energy.gov.au notes that peak rates usually apply on weekday evenings and off-peak rates usually apply overnight and on weekends, but the exact windows are set by your retailer. Some plans also add a demand charge based on the highest amount of power you draw from the grid at one time — for example, when many appliances run at once.
+
+Rates and windows vary by retailer, distributor and state, so check your bill or your retailer's plan details rather than relying on a general figure. If you are on one of these plans, monitoring helps you confirm when heavy, flexible loads actually run, and scheduling lets you move them without flicking switches at odd hours. For motor loads such as pool pumps, check the plug's motor rating first — some plugs, such as the Tapo P110 below, list a far smaller motor limit than their headline wattage — or use the pump's own timer or properly rated fixed equipment. One exception: electric hot water is often already on a separately metered controlled-load circuit that only runs at set times, in which case leave it alone.
+
+If you are unsure whether you are on the right plan at all, comparing offers is free. Energy.gov.au's [Switch to save](https://www.energy.gov.au/households/find-the-best-energy-deal) page points to the government comparison service for each state — [Energy Made Easy](https://www.energymadeeasy.gov.au/) in most of the country, Victorian Energy Compare in Victoria, and state government pricing information in Western Australia and the Northern Territory. A better plan can matter more than any device.
+
+## Smart Plugs vs Energy Monitors: What Each Does
+
+A smart plug sits between the powerpoint and your appliance, letting you control it from an app, a voice assistant or a schedule. An energy monitor measures how much electricity a device — or your whole home — uses. Many plugs now combine both, but plenty only switch and do not measure anything, so if lowering your bill is the goal, check that the listing specifically includes energy monitoring.
+
+### Scheduling and Remote Switch-Off
+
+Instead of relying on memory, you can schedule devices to turn off overnight or outside peak periods — useful for things like outdoor lighting or an entertainment unit that does not need to be on all day. Remote app control also helps when you leave the house and realise the TV, games console or lamp is still on. For anything with a heating element, check the appliance manual and our safety guide above before relying on a plug to switch it.
+
+### Plug-Level vs Whole-Home Monitoring
+
+Plug-level monitors are the simple option: plug the monitor into a standard powerpoint, then plug the appliance into the monitor, with no rewiring. They are the most accessible choice for renters and apartment dwellers.
+
+Whole-home energy monitors typically connect at the switchboard and give a household-wide view. Because that involves fixed wiring, installation is a job for a licensed electrician. Before buying one, check what you already have: if your home has a smart meter, [many energy retailers offer apps and online portals](https://www.energy.gov.au/households/smart-homes) that show when you use the most electricity, which can be enough of a whole-home picture to decide which appliances to monitor individually.
@@
-Not every smart plug reports power usage — some only offer remote on/off switching. If cutting your bill is the goal, you need a model that specifically measures consumption.
-
-The [TP-Link Tapo P110 Smart Plug with Energy Monitoring](https://nxtsmarthome.com.au) is built for exactly this job: it tracks power consumption in kWh so you can see the real running cost of an appliance against your electricity tariff. It suits single-appliance monitoring — a fridge, a heater, or an entertainment unit — where you want a straightforward reading without extra hub hardware. The trade-off is that, like most Wi-Fi plugs, it depends on your home network and the associated app for historical data.
+The [TP-Link Tapo P110](https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/) is built for this job. TP-Link's Australian page says it tracks the energy use of connected devices and lets you enter your electricity rate for bill estimates, alongside schedules, and lists a maximum load of 10 A, 2300 W and a 1/10 HP motor. It suits single-appliance monitoring — measuring a bar fridge, or monitoring and scheduling an entertainment unit — without extra hub hardware. Check any motor's rating against that figure before plugging it in. The trade-off is that, like most Wi-Fi plugs, it depends on your home network and the app for historical data.
@@
-For households wanting more control over privacy and local operation, the Eve Energy Smart Plug (Matter over Thread) is worth a look. It tracks energy locally rather than routing everything through a cloud service, and it also acts as a Thread Router, which can strengthen your home's Thread mesh for other Matter devices. This suits people already building a Matter/Thread smart home ecosystem, though it's a slightly different setup path than a plain Wi-Fi plug and works best alongside a Thread-compatible hub such as an Apple TV or HomePod mini.
+For households wanting more privacy and local operation, the Eve Energy (Matter over Thread) is worth a look. [Eve's product page](https://www.evehome.com/en-us/eve-energy) says it tracks power consumption without an Eve cloud or account, and that it can act as a router node in your Thread network, which can help other Thread devices. It needs a hub that supports both Thread and Matter, so it suits people already building a Matter smart home; it is a different setup path from a plain Wi-Fi plug.
@@
-If you're monitoring several devices in one spot — say a media unit, router and games console — a monitored power board can be more practical than juggling several individual plugs. The Eve Energy Strip 3-Outlet Smart Power Board offers surge protection alongside total energy consumption graphs across all three outlets, which is handy for tracking a cluster of devices as one load rather than checking three separate apps.
+If you want several devices in one spot measured together — a media unit, router and console — a monitored power board can be more practical than several single plugs. Not every smart power board measures energy, though, so check the specifications for consumption reporting before you buy.
@@
-::product:eve-energy-strip-3-outlet-smart-power-board::
+## When a Plug Isn't Enough: In-Wall Relays
@@
-## When a Plug Isn't Enough: In-Wall and Switchboard Options
+Smart plugs suit anything with a standard plug, but some loads — pool pumps, heat pumps or hardwired appliances — sit behind a wall switch or connect directly at the switchboard. These need a different category of device.
@@
-Smart plugs are ideal for anything with a standard 240V plug, but some loads — pool pumps, heat pumps, or hardwired appliances — sit behind a wall switch or connect directly at the switchboard. These need a different category of device, and any work involving fixed household wiring should be carried out by a licensed electrician in line with AS/NZS wiring rules.
+The Shelly 1PM Gen3 is an in-wall relay with power measurement. [Shelly's documentation](https://kb.shelly.cloud/knowledge-base/shelly-1pm-gen3) says it monitors the power consumption of connected appliances in real time and can be retrofitted into wall boxes, behind power sockets and light switches. That makes it suited to monitoring a hardwired circuit without a visible plug device.
@@
-### In-Wall Relays
-
-The Shelly 1PM Gen3 Wi-Fi Power Relay fits behind an existing switch plate and includes power measurement, making it suited to monitoring a hardwired circuit such as a pump or heater without a visible plug device. It's also used by some households for solar diversion, directing excess solar generation towards a suitable load. Because it sits behind the switch plate, installation should be handled by a licensed electrician rather than as a DIY job.
-
-::product:shelly-1pm-gen3-wi-fi-power-relay::
-
-### Renters and Strata Considerations
-
-If you're renting or living in a strata scheme, anything that requires opening a switch plate or altering fixed wiring will likely need permission and a qualified electrician regardless of the device itself. Plug-in monitors remain the easiest option for renters because they don't touch the building's electrical infrastructure and can be taken with you when you move. Our [smart plug buying guide for Australian homes](https://nxtsmarthome.com.au/energy/smart-plug-buying-guide-australia) covers what to check before buying, including plug type, load rating and app requirements.
+Fitting one means working on fixed wiring, and that is not a DIY job. [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says unqualified electrical work is dangerous and illegal, even for small jobs such as changing power points or light switches. Use a licensed electrician, and check your own state or territory's electrical safety regulator for the rules where you live.
@@
+### Start With Your Biggest Suspects
+
+You don't need to monitor every powerpoint at once. Start with two or three appliances you suspect are heavy users — an old fridge or freezer, an entertainment unit, a games console — and monitor them for a week or two before making changes, so you are working from real numbers rather than guesswork.
+
@@
-Once you know when an appliance genuinely needs to run, use scheduling rather than manual switching. A pool pump timed to run during cheaper off-peak windows, or a heater set to turn off overnight, removes the need to remember to do it yourself. This is also a good moment to check [whether smart plugs actually save money on Australian electricity](https://nxtsmarthome.com.au/energy/smart-plugs-energy-monitoring-australia), since the answer depends heavily on which appliances you monitor.
+Once you know when an appliance genuinely needs to run, use scheduling rather than manual switching. An entertainment unit that switches off overnight, or a washing machine's delay-start set to avoid peak times, removes the need to remember. Sometimes the answer is not automation at all: an old second fridge that turns out to be a heavy user may be better replaced or switched off for good.
@@
-### Watch for Appliances That Shouldn't Be Automated
+### Review, Adjust, Repeat
@@
-Not everything is suitable for a smart plug, particularly high-draw or safety-sensitive devices. It's worth reading up on [what you should never plug into a smart plug](https://nxtsmarthome.com.au/energy/what-not-to-plug-into-a-smart-plug-australia) before assuming every appliance in the house is a candidate for automation.
+Most apps show daily or weekly usage trends. Once you spot a pattern — an appliance running longer than expected, say — adjust the schedule and keep monitoring to confirm the change actually reduced usage. Small, iterative changes tend to stick better than trying to automate the whole house in one go.
+
+## Before You Buy
+
+Three checks matter most: the plug's load rating against the appliance's draw, whether it reports cumulative kWh rather than just instant watts, and whether it carries the Regulatory Compliance Mark (RCM) for Australian sale — cheap overseas marketplace stock is where that last check matters most. Buying from an Australian retailer you can go back to also makes warranty and consumer-guarantee claims more straightforward. Our [smart plug buying guide for Australian homes](https://nxtsmarthome.com.au/energy-and-solar/smart-plug-buying-guide-australia/) covers each of these, along with size, Wi-Fi versus Zigbee, Z-Wave and Matter, and what happens when the internet drops.
+
+## Renters and Strata
+
+Plug-in smart plugs and monitors don't touch the building's fixed wiring and go with you when you move, which makes them the easiest option for renters and apartment residents. Anything that means opening a switch plate or working at the switchboard is different: it needs a licensed electrician and, in a rental or strata property, will usually need the owner's or body corporate's approval first. Rules differ between states and territories, so check your lease, your strata by-laws or your state's tenancy authority if you are unsure.
@@
-Energy monitoring isn't only about trimming bills — it can also inform how you plan for outages or off-grid periods. The EcoFlow Delta 2 Portable Power Station 1024Wh uses a LiFePO4 battery and suits households wanting backup for outages or portable storage alongside solar panels. Pairing a monitored plug with a power station lets you see roughly how long stored energy might run a specific appliance, which is useful when planning for storms or bushfire-season blackouts common in parts of regional Australia.
+Energy monitoring can also help you plan for outages. The EcoFlow Delta 2 is a portable power station that [EcoFlow Australia lists](https://au.ecoflow.com/products/delta-2-portable-power-station) with 1024 Wh of LiFePO4 battery capacity and 1800 W of total AC output, for home backup, camping and off-grid use. Knowing an appliance's measured draw from a monitoring plug lets you estimate roughly how long stored energy might run it during a storm or other blackout — check EcoFlow's guidance on usable capacity, since real-world run time can be shorter than a simple division suggests.
@@
-You don't need to monitor every powerpoint in the house at once. Start with the two or three appliances you suspect are the biggest contributors — an old fridge, an electric heater, a pool pump — and monitor those first. Once you have a few weeks of data, you'll have a much clearer picture of whether the appliance is worth keeping, replacing, or simply scheduling more sensibly.
+You don't need solar, a battery or a smart plug on every powerpoint to start cutting waste. Check your tariff, pick the two or three appliances you suspect most, and monitor them for a few weeks. With real data in hand, you'll have a much clearer picture of whether each appliance is worth keeping, replacing or simply scheduling more sensibly.
```

## Full merged body

Smart plugs and energy monitors can help lower your power bill by showing which appliances actually cost the most to run, then letting you schedule, automate or switch them off remotely. The savings come from trimming standby power, moving flexible loads out of peak-tariff periods and catching faulty or forgotten devices before they quietly add to your bill — and none of it needs solar panels or a battery.

## Where Your Power Bill Actually Goes

Most Australian households have a rough idea of their biggest power users — the air conditioner, the heater, the hot water system — and that is often right. But rough ideas rarely change behaviour, and a surprising share of usage can also come from smaller devices left running around the clock. A smart plug with built-in energy monitoring shows real kilowatt-hour (kWh) figures for a single appliance, so you can see whether that old bar fridge in the garage, the chest freezer or the kids' gaming console is worth what it costs to run.

### Standby Power and Phantom Loads

Set-top boxes, game consoles, microwaves, chargers left plugged in and stereos can keep drawing power while switched "off" — often called standby or phantom load. The Australian Government's energy advice site says [standby power can account for up to 3% of household energy use and cost up to $100 a year](https://www.energy.gov.au/households/appliances), and suggests switching appliances off at the wall or using smart plugs on timers — with the exception of fridges, freezers and critical medical equipment, which should stay on.

A monitoring smart plug lets you measure this rather than guess, and then decide whether a scheduled cut-off makes sense. Bear in mind the plug itself draws a little power to stay connected, so on a modern low-standby device it may not pay its way. We cover where that line sits in [whether smart plugs actually save money on Australian electricity](https://nxtsmarthome.com.au/energy-and-solar/smart-plugs-energy-monitoring-australia/).

### The Appliances Worth Watching

Good candidates for monitoring include entertainment systems, second fridges and bar fridges, chest freezers and countertop appliances such as air fryers or slow cookers. These tend either to run longer than needed or to get left on by accident. For fridges and freezers, use the plug to measure, never to switch them off.

Appliances with heating elements, such as portable heaters, are worth understanding too — but many should not be switched by a smart plug at all, and some heater manuals specifically warn against timers or automatic switching. Before you automate anything that heats, cools or runs a motor, read [what you should never plug into a smart plug](https://nxtsmarthome.com.au/energy-and-solar/what-not-to-plug-into-a-smart-plug-australia/).

### Time-of-Use and Demand Tariffs

On a [time-of-use tariff](https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs), you pay a higher rate per kWh in the peak period and a lower rate off-peak, and some plans add a shoulder rate in between. Energy.gov.au notes that peak rates usually apply on weekday evenings and off-peak rates usually apply overnight and on weekends, but the exact windows are set by your retailer. Some plans also add a demand charge based on the highest amount of power you draw from the grid at one time — for example, when many appliances run at once.

Rates and windows vary by retailer, distributor and state, so check your bill or your retailer's plan details rather than relying on a general figure. If you are on one of these plans, monitoring helps you confirm when heavy, flexible loads actually run, and scheduling lets you move them without flicking switches at odd hours. For motor loads such as pool pumps, check the plug's motor rating first — some plugs, such as the Tapo P110 below, list a far smaller motor limit than their headline wattage — or use the pump's own timer or properly rated fixed equipment. One exception: electric hot water is often already on a separately metered controlled-load circuit that only runs at set times, in which case leave it alone.

If you are unsure whether you are on the right plan at all, comparing offers is free. Energy.gov.au's [Switch to save](https://www.energy.gov.au/households/find-the-best-energy-deal) page points to the government comparison service for each state — [Energy Made Easy](https://www.energymadeeasy.gov.au/) in most of the country, Victorian Energy Compare in Victoria, and state government pricing information in Western Australia and the Northern Territory. A better plan can matter more than any device.

## Smart Plugs vs Energy Monitors: What Each Does

A smart plug sits between the powerpoint and your appliance, letting you control it from an app, a voice assistant or a schedule. An energy monitor measures how much electricity a device — or your whole home — uses. Many plugs now combine both, but plenty only switch and do not measure anything, so if lowering your bill is the goal, check that the listing specifically includes energy monitoring.

### Scheduling and Remote Switch-Off

Instead of relying on memory, you can schedule devices to turn off overnight or outside peak periods — useful for things like outdoor lighting or an entertainment unit that does not need to be on all day. Remote app control also helps when you leave the house and realise the TV, games console or lamp is still on. For anything with a heating element, check the appliance manual and our safety guide above before relying on a plug to switch it.

### Plug-Level vs Whole-Home Monitoring

Plug-level monitors are the simple option: plug the monitor into a standard powerpoint, then plug the appliance into the monitor, with no rewiring. They are the most accessible choice for renters and apartment dwellers.

Whole-home energy monitors typically connect at the switchboard and give a household-wide view. Because that involves fixed wiring, installation is a job for a licensed electrician. Before buying one, check what you already have: if your home has a smart meter, [many energy retailers offer apps and online portals](https://www.energy.gov.au/households/smart-homes) that show when you use the most electricity, which can be enough of a whole-home picture to decide which appliances to monitor individually.

## Smart Plugs Worth Considering for Monitoring

The [TP-Link Tapo P110](https://www.tp-link.com/au/home-networking/smart-plug/tapo-p110/) is built for this job. TP-Link's Australian page says it tracks the energy use of connected devices and lets you enter your electricity rate for bill estimates, alongside schedules, and lists a maximum load of 10 A, 2300 W and a 1/10 HP motor. It suits single-appliance monitoring — measuring a bar fridge, or monitoring and scheduling an entertainment unit — without extra hub hardware. Check any motor's rating against that figure before plugging it in. The trade-off is that, like most Wi-Fi plugs, it depends on your home network and the app for historical data.

::product:tp-link-tapo-p110-smart-plug-with-energy-monitoring::

For households wanting more privacy and local operation, the Eve Energy (Matter over Thread) is worth a look. [Eve's product page](https://www.evehome.com/en-us/eve-energy) says it tracks power consumption without an Eve cloud or account, and that it can act as a router node in your Thread network, which can help other Thread devices. It needs a hub that supports both Thread and Matter, so it suits people already building a Matter smart home; it is a different setup path from a plain Wi-Fi plug.

::product:eve-energy-smart-plug-matter-over-thread::

If you want several devices in one spot measured together — a media unit, router and console — a monitored power board can be more practical than several single plugs. Not every smart power board measures energy, though, so check the specifications for consumption reporting before you buy.

## When a Plug Isn't Enough: In-Wall Relays

Smart plugs suit anything with a standard plug, but some loads — pool pumps, heat pumps or hardwired appliances — sit behind a wall switch or connect directly at the switchboard. These need a different category of device.

The Shelly 1PM Gen3 is an in-wall relay with power measurement. [Shelly's documentation](https://kb.shelly.cloud/knowledge-base/shelly-1pm-gen3) says it monitors the power consumption of connected appliances in real time and can be retrofitted into wall boxes, behind power sockets and light switches. That makes it suited to monitoring a hardwired circuit without a visible plug device.

Fitting one means working on fixed wiring, and that is not a DIY job. [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says unqualified electrical work is dangerous and illegal, even for small jobs such as changing power points or light switches. Use a licensed electrician, and check your own state or territory's electrical safety regulator for the rules where you live.

## Turning Data Into Savings

Buying a monitoring plug is only step one — the savings come from acting on what it shows you.

### Start With Your Biggest Suspects

You don't need to monitor every powerpoint at once. Start with two or three appliances you suspect are heavy users — an old fridge or freezer, an entertainment unit, a games console — and monitor them for a week or two before making changes, so you are working from real numbers rather than guesswork.

### Set Realistic Schedules

Once you know when an appliance genuinely needs to run, use scheduling rather than manual switching. An entertainment unit that switches off overnight, or a washing machine's delay-start set to avoid peak times, removes the need to remember. Sometimes the answer is not automation at all: an old second fridge that turns out to be a heavy user may be better replaced or switched off for good.

### Review, Adjust, Repeat

Most apps show daily or weekly usage trends. Once you spot a pattern — an appliance running longer than expected, say — adjust the schedule and keep monitoring to confirm the change actually reduced usage. Small, iterative changes tend to stick better than trying to automate the whole house in one go.

## Before You Buy

Three checks matter most: the plug's load rating against the appliance's draw, whether it reports cumulative kWh rather than just instant watts, and whether it carries the Regulatory Compliance Mark (RCM) for Australian sale — cheap overseas marketplace stock is where that last check matters most. Buying from an Australian retailer you can go back to also makes warranty and consumer-guarantee claims more straightforward. Our [smart plug buying guide for Australian homes](https://nxtsmarthome.com.au/energy-and-solar/smart-plug-buying-guide-australia/) covers each of these, along with size, Wi-Fi versus Zigbee, Z-Wave and Matter, and what happens when the internet drops.

## Renters and Strata

Plug-in smart plugs and monitors don't touch the building's fixed wiring and go with you when you move, which makes them the easiest option for renters and apartment residents. Anything that means opening a switch plate or working at the switchboard is different: it needs a licensed electrician and, in a rental or strata property, will usually need the owner's or body corporate's approval first. Rules differ between states and territories, so check your lease, your strata by-laws or your state's tenancy authority if you are unsure.

## Backup Power as Part of the Picture

Energy monitoring can also help you plan for outages. The EcoFlow Delta 2 is a portable power station that [EcoFlow Australia lists](https://au.ecoflow.com/products/delta-2-portable-power-station) with 1024 Wh of LiFePO4 battery capacity and 1800 W of total AC output, for home backup, camping and off-grid use. Knowing an appliance's measured draw from a monitoring plug lets you estimate roughly how long stored energy might run it during a storm or other blackout — check EcoFlow's guidance on usable capacity, since real-world run time can be shorter than a simple division suggests.

::product:ecoflow-delta-2-portable-power-station-1024wh::

## Getting Started Without Overspending

You don't need solar, a battery or a smart plug on every powerpoint to start cutting waste. Check your tariff, pick the two or three appliances you suspect most, and monitor them for a few weeks. With real data in hand, you'll have a much clearer picture of whether each appliance is worth keeping, replacing or simply scheduling more sensibly.
