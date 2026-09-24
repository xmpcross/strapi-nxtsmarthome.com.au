# Task 7 review: cluster 1, blackout / NBN outage cameras

**Nothing has been written to Strapi.** Reply **approve** to publish the merged article, unpublish the MERGE post and add the redirect.

| | Slug | Title | Words | [VERIFY] |
|---|---|---|---|---|
| **KEEP** | keep-security-cameras-running-blackout-nbn-outage | How to Keep Security Cameras Running Through a Blackout or NBN Outage | 1553 | 0 |
| MERGE | how-to-keep-security-cameras-running-through-a-blackout-or-nbn-outage | How to Keep Security Cameras Running Through a Blackout or NBN Outage | 1155 | 10 |

## What happens on approve

1. **KEEP post updated in Strapi:** body, excerpt, keyTakeaways and FAQ from the draft below; title "Keep Your Security Cameras Recording When the Power or NBN Goes Down"; seoTitle "Keep Security Cameras Running in a Blackout or NBN Outage"; seoDescription "How Australian homes can keep security cameras recording through a blackout or NBN outage: UPS and power station sizing, local storage and 4G failover.". Slug unchanged, `publishDate` kept (23 Aug 2026), `dateModified` set to today.
2. **MERGE post unpublished** (moved to draft, not deleted). Its identical title disappears from the site.
3. **301** `/security-and-cameras/how-to-keep-security-cameras-running-through-a-blackout-or-nbn-outage/` → `/security-and-cameras/keep-security-cameras-running-blackout-nbn-outage/`, added to `data/redirects-adsense.json`. It is already live through `data/merged-articles.json` (PR #12); `scripts/gen-redirects.mjs` now drops duplicate sources so nginx accepts both.
4. **Internal links to the MERGE URL:** none found in any published post, so nothing to update.
5. Build, `npm run audit:thin` (the DUPLICATE pair must be gone), log in ADSENSE_CHANGES.md.

Backups: `exports/strapi-backup/<slug>-2026-09-24T08-38-55-799Z.json` (both posts, draft and published).

Sources I checked myself: the Telstra 3-12 hour tower battery figure (quoted on the linked page); the ACMA cabling page loads.

---

# Section map: MERGE (how-to-keep-security-cameras-running-through-a-blackout-or-nbn-outage) into KEEP (keep-security-cameras-running-blackout-nbn-outage)

| # | MERGE item | Status | Where it went / why dropped |
| --- | --- | --- | --- |
| 1 | Intro: three stacked single points of failure (camera power, network power, NBN) | COVERED | KEEP intro + "First, work out which failure you're solving" |
| 2 | H2 "What actually fails when the power drops" | COVERED | KEEP H2 "First, work out which failure you're solving" |
| 3 | NTD on FTTP/HFC/fixed wireless runs on your power | COVERED | KEEP "Partial NBN failures" (sourced to nbn co; more precise) |
| 4 | FTTN/FTTC draw from a powered street node with limited battery | COVERED / dropped | KEEP covers FTTN/FTTC with nbn sources; MERGE's FTTC wording conflicts with nbn's own FTTC page cited in KEEP, so not brought over |
| 5 | FTTP battery backup unit is for voice, not data [VERIFY] | COVERED | KEEP "Partial NBN failures" (BBU withdrawn June 2024, voice-focused; sourced) |
| 6 | Router and mesh nodes die instantly | COVERED | KEEP "Mains power loss" + priority list |
| 7 | PoE cameras need NVR/PoE switch backed up; plug-in Wi-Fi cameras need their own outlet | COVERED | KEEP priority list items 3-4; plug-in camera point also folded into FAQ 3424 |
| 8 | NBN fault with power on: cloud-only cameras stop recording | COVERED | KEEP "Internet loss with power intact" |
| 9 | Power backup and internet backup are separate problems | COVERED | KEEP "they need different fixes" + mobile failover intro |
| 10 | H2 "Step one: put the network and recorder on a UPS" | COVERED | KEEP H2 "Back up the network before you back up the cameras" |
| 11 | Per-device draw figures (NTD 5-10 W, router 10-20 W, mesh 5-10 W, NVR 35-60 W; 60-100 W total) | UNIQUE, dropped (c) | Unsourced spec figures; KEEP deliberately says measure rather than guess |
| 12 | Runtime maths: Wh / load, minus 10-15% inverter losses; 600 Wh at 70 W = 6-7 h [VERIFY] | COVERED | KEEP power station worked example (500 Wh / 25 W, losses vary by model) |
| 13 | 650 VA desktop UPS often only 20-40 min at 60-100 W | UNIQUE (b) | Rewritten without figures as guidance in "Back up the network" (small UPS suits network gear; heavier NVR load shortens runtime; check runtime chart) |
| 14 | Switchover time matters | COVERED | KEEP power station section (EcoFlow sources) |
| 15 | Slow switchover: modem reboots and takes 2-3 min to resync, repeatedly in a flickering supply [VERIFY] | UNIQUE (b) | Power station section, figure removed: reboots on every dip in a flickering supply |
| 16 | Whether continuous pass-through use voids warranty | UNIQUE (b) | Power station section: check the manual and warranty terms for continuous pass-through use |
| 17 | Extension lead from a power station is fine | UNIQUE (b) | Electrical paragraph: plug gear into the power station's own outlets, leads in good condition and rated for the load |
| 18 | Hardwiring, new circuits, switchboard = licensed electrical work | COVERED | KEEP electrical paragraph (ESV sourced) |
| 19 | PoE cabling through walls = licensed electrical work under AS/NZS 3000 in every state [VERIFY] | UNIQUE (b) | Rewritten: data cabling is ACMA registered-cabler territory, not electrical wiring; "talk to a registered cabler" |
| 20 | H2 "Step two: record locally, not just to the cloud" | COVERED | KEEP H2 "Battery cameras and local recording keep working when the cloud doesn't" |
| 21 | NVR/DVR with internal HDD records with no internet; keep recorder on UPS | COVERED | KEEP local storage list (internal disk) + Home Assistant NVR-on-UPS paragraph; hub/recorder-on-backup sentence added |
| 22 | microSD common on Tapo/Reolink/Eufy | COVERED (brand list dropped) | KEEP lists microSD; brand claim unverified, not brought over |
| 23 | microSD card is stolen along with the camera | UNIQUE | Added to local recording section as a caveat |
| 24 | Hub with local backup storage | COVERED | KEEP "microSD, USB drive or an internal disk" |
| 25 | Battery cameras + hub on backup power survive a blackout end to end | COVERED (reinforced) | KEEP battery camera section; one sentence added tying hub to backup power |
| 26 | Local storage may depend on subscription tier [VERIFY] | UNIQUE (b) | Local recording section: check current plan inclusions for your model |
| 27 | H2 "Step three: add mobile data failover" | COVERED | KEEP H2 "Add a mobile failover path for alerts" |
| 28 | Router with SIM/USB modem failover | COVERED | KEEP bullet |
| 29 | Prepaid SIM on a different carrier; Telstra and Optus separate networks | UNIQUE, dropped (c) | Carrier-diversity reasoning muddled (nbn is its own network); KEEP's "confirm indoor coverage" covers the practical advice |
| 30 | Standalone 4G modem; no auto switch without dual WAN | UNIQUE | New bullet in mobile failover list |
| 31 | Phone hotspot is a manual fallback | COVERED | KEEP bullet |
| 32 | Mobile towers run on batteries for hours in a regional blackout [VERIFY] | UNIQUE (a) | Mobile failover section, Telstra source (3-12 hours typical) |
| 33 | H2 "Step four: know the moment it happens" (smart plug on non-backed-up outlet as blackout alert) | UNIQUE | Merged into KEEP H2, retitled "Know when the power goes out, and when it comes back" |
| 34 | Plug also tells you when power is restored (freezer) | COVERED | KEEP "When mains returns..." (fridge aside kept as guidance) |
| 35 | H2 "Test it before you need it" (quarterly unplug test) | COVERED | KEEP checklist (twice a year); kept KEEP's frequency |
| 36 | Confirm NVR/cameras keep recording during the test | UNIQUE | Added to KEEP checklist test bullet |
| 37 | Batteries degrade, firmware changes power behaviour | COVERED (partly) | KEEP battery life bullet (APC); firmware aside dropped as unsourced/minor |
| 38 | Surveillance/privacy legislation applies; differs by state and owner vs renter [VERIFY] | UNIQUE (b) | Local recording section, OAIC source; points readers to state/territory and tenancy authority; no claim about owner vs renter rules |
| F1 | FAQ 1577: Wi-Fi cameras if only modem/router on UPS | COVERED | Merged into KEEP FAQ 3424 (plug-in/PoE cameras point added) |
| F2 | FAQ 1578: power station size (draw figures) [VERIFY] | COVERED / dropped | KEEP FAQ 3423 + 3426 cover method; figures unsourced |
| F3 | FAQ 1579: is a 650 VA UPS enough [VERIFY] | COVERED / dropped | KEEP FAQ 3423 (runtime chart) + body item 13 |
| F4 | FAQ 1580: alert when power goes out | UNIQUE | Kept as FAQ 6 (no id) |
| F5 | FAQ 1581: electrician needed? AS/NZS 3000 [VERIFY] | COVERED / dropped | Body electrical paragraph covers it with ESV/ACMA sources; dropped as FAQ to stay at 6 and avoid an unsourced legal claim |

## Decisions (researched claims)

| # | Original text (MERGE) | a/b/c | New text | Source URLs |
| --- | --- | --- | --- | --- |
| D1 | "Rough draw ... NTD 5-10 W ... 60-100 W total" | c | Removed; KEEP's "measure it rather than guess" stands | n/a (no official per-device figures) |
| D2 | "600 Wh station running a 70 W load gives you roughly six to seven hours [VERIFY]" | c | Removed; KEEP's sourced worked method stands | n/a |
| D3 | "650 VA desktop UPS ... often only 20-40 minutes at that load" | b | "Add an NVR and a string of PoE cameras and the load climbs, so the same unit covers a much shorter outage ... If the runtime chart shows minutes rather than hours at your load, that's the case for a power station." | https://www.cyberpower.com/au/en/blog/how-much-runtime-do-i-really-need (already cited in KEEP) |
| D4 | "modem may reboot and take two to three minutes to resync [VERIFY]" | b | "a modem that reboots on every dip can spend more time reconnecting than online" (no figure) | n/a |
| D5 | "whether ... the manufacturer voiding warranty for pass-through use" | b | "read the manual and warranty terms ... Not every power station is designed or supported for continuous pass-through use" | n/a (guidance only) |
| D6 | "running an extension lead from a power station to your gear is fine" | b | "plug your network gear straight into the power station's own outlets, using leads in good condition and rated for the load" | https://www.energysafe.vic.gov.au/community-safety/emergencies/using-generator-safely (generator guidance: heavy-duty leads rated at least to the generator; applied by analogy, not quoted as power-station rule) |
| D7 | "installing PoE cabling through walls ... is licensed electrical work under AS/NZS 3000 in every Australian state and territory [VERIFY]" | b | "The ACMA lists data cabling for computers that connect to the telecommunications network, and security systems, among the work registered cablers do, so talk to a registered cabler before you start drilling" | https://www.acma.gov.au/cabling-your-home-or-office |
| D8 | "Hardwiring a backup supply, adding a new circuit ... touching your switchboard is licensed electrical work under AS/NZS 3000 in every ... state [VERIFY]" | c | Not brought over; KEEP's ESV-sourced paragraph ("rules differ between states") retained | https://www.energysafe.vic.gov.au/community-safety/emergencies/using-generator-safely (existing KEEP source) |
| D9 | "whether that's tied to a subscription tier [VERIFY current plan inclusions]" | b | "on some ecosystems, local or hub storage and the features around it depend on the subscription tier, which can change, so check the current plan inclusions for your model" | n/a (guidance) |
| D10 | "mobile towers run on their own batteries and typically hold for a matter of hours before generators are needed [VERIFY]" | a | "Telstra says most of its sites have batteries that typically provide between 3 and 12 hours of backup power, after which a site goes offline unless mains power returns or another power source is available" | https://www.telstra.com.au/exchange/-mobile-networks-explained--why-your-mobile-signal-and-coverage- |
| D11 | "Telstra and Optus have separate networks, so a fault on one doesn't necessarily hit the other" | c | Removed | n/a |
| D12 | "governed by state surveillance devices and privacy legislation ... differ between owners and renters [VERIFY]" | b | "The OAIC notes that the Privacy Act doesn't cover a security camera operated by an individual acting in a private capacity, but state or territory laws may apply ... check the rules with your state or territory, and if you rent, check your lease and your state's tenancy authority too." | https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras |
| D13 | "FTTP battery backup ... does not keep the data ports alive [VERIFY]" | c | Not brought over; KEEP's nbn-sourced wording retained | (KEEP's nbn co links) |
| D14 | "microSD ... Common on Tapo, Reolink, Eufy" | c | Brand list removed; generic microSD caveat kept | n/a |

Counts: a = 1, b = 7, c = 6.

FAQ sources (answers are plain text):
- 3423: https://www.cyberpower.com/au/en/blog/how-much-runtime-do-i-really-need
- 3424: https://www.nbnco.com.au/learn/what-happens-in-a-power-blackout
- 3425: https://www.jbhifi.com.au/products/cyberpower-ut-series-650va-360w-backup-ups-system ; https://www.jbhifi.com.au/products/cyberpower-vp1000elcd-1000va-550w-backup-ups-systems ; https://www.officeworks.com.au/shop/officeworks/p/cyberpower-650va-backup-utility-powerboard-ups-in3229148 ; https://www.se.com/us/en/faqs/FAQ000265093/
- 3426: https://www.ecoflow.com/au/river-3-ups-portable-power-station ; https://www.ecoflow.com/us/blog/use-portable-power-station-as-ups-power-supply
- 3427: https://www.telstra.com.au/exchange/-mobile-networks-explained--why-your-mobile-signal-and-coverage- (tower resilience context)
- New (power-out alert): no external claim; describes a general smart-plug automation, hedged ("some vendor apps").

## Needs human legal review

1. D7 — PoE/data cabling through walls pointed to ACMA registered cablers. ACMA's page frames it as "data cabling for computers that connect to the telecommunications network"; whether a standalone PoE camera LAN counts is not settled by that page. Wording avoids stating the law, but confirm.
2. D12 — privacy/surveillance note (OAIC: Privacy Act doesn't cover private individuals; state/territory laws may apply; renters check lease/tenancy authority).
3. Existing KEEP electrical paragraph (ESV quote applied to household wiring for backup supplies) — unchanged, already fact-checked, but it is the article's main electrical-law claim.
4. D6 — ESV guidance is for generators; applied by analogy to power station leads without citing it as a rule.

## Flagged, not changed

- KEEP's price figures (JB Hi-Fi / Officeworks CyberPower listings at $129 / $259) are dated "at the time of writing" — recheck at republish.
- KEEP's Schneider (APC) battery-life link is a US page (se.com/us); an AU equivalent would be preferable.
- KEEP's EcoFlow "30 ms or more" link is a US blog; AU page exists only for the RIVER 3 UPS figure.
- KEEP sentence "The specification implies a camera like this will keep detecting and recording locally to its hub..." — hedged but not linked to an Arlo AU spec page.
- Checklist test frequency: KEEP says twice a year, MERGE said quarterly; kept KEEP's.
- MERGE's FTTC description (street node battery) conflicts with KEEP's nbn-sourced FTTC description; KEEP's retained.


---

## Merged article: meta

- **title:** How to Keep Security Cameras Running Through a Blackout or NBN Outage → **Keep Your Security Cameras Recording When the Power or NBN Goes Down**
- **seoTitle:** Keep Security Cameras Running in a Blackout or NBN Outage
- **seoDescription:** How Australian homes can keep security cameras recording through a blackout or NBN outage: UPS and power station sizing, local storage and 4G failover.
- **excerpt:** unchanged
- **keyTakeaways:** unchanged

### FAQ (6)

**How long will a small UPS keep my modem and router running during a blackout?** (from KEEP #3423)

It depends on your gear and the UPS. Measure what your modem and router actually draw with a plug-in energy meter or the UPS's load display, then look that load up on the manufacturer's runtime chart for your model rather than trusting the VA number printed on the box, since VA is a headline figure, not a guarantee of hours. Published runtimes are approximate and fall as the battery ages, so time a real test by unplugging the UPS.

**Why do my cameras stop working in a blackout, even the ones with batteries?** (from KEEP #3424)

Plug-in Wi-Fi and PoE cameras lose power with the mains unless their outlet, PoE switch or recorder is on backup. Battery cameras keep power, but the Wi-Fi they talk to does not: once the router, mesh node and NBN connection box lose mains power, there's nothing to upload to and no way to view footage. That's why network gear should go on backup power before the cameras themselves.

**How much does a UPS for home network and camera gear cost in Australia?** (from KEEP #3425)

At the time of writing, 650-1000VA line-interactive units from CyberPower were listed from $129 (650VA, at JB Hi-Fi and Officeworks) to $259 (1000VA, at JB Hi-Fi); prices change, so check before you buy. Budget for battery replacement too: Schneider Electric (APC) puts typical sealed lead-acid UPS battery life at three to five years, less in hot conditions, so check your model's documentation.

**Can I use a portable power station instead of a UPS to keep cameras online?** (from KEEP #3426)

Yes, and it gives far more headroom for multi-hour outages. Check two things first: whether the unit supports pass-through charging so it can stay permanently plugged in, and whether it has a UPS-style automatic switchover fast enough that your gear doesn't reboot. Switchover times differ between models and some don't offer the feature, so check the spec sheet and the manual for the exact model.

**Will I still get alerts on my phone if the NBN drops out but the power is on?** (from KEEP #3427)

Not unless you have a second path to the internet. A router with automatic 4G/5G failover using a cheap prepaid data SIM is the most reliable option, with a phone hotspot as a manual fallback. Confirm your indoor mobile coverage too, since a storm that takes out the fixed line can also affect the local tower.

**Can I get an alert on my phone when the power goes out at home?** (new, from MERGE)

Yes, if your router is on backup power. Put a Wi-Fi smart plug on an ordinary outlet that isn't backed up and set a notification for when it goes offline: the plug dropping out while the network stays up signals a blackout, and it reports back online when power returns. Home Assistant can do this, and some vendor apps offer offline alerts.

## Body diff against the current KEEP post

```diff
--- KEEP now
+++ merged
@@
+A small desktop UPS is best suited to the network gear alone. Add an NVR and a string of PoE cameras and the load climbs, so the same unit covers a much shorter outage: fine for a flicker or a brief drop, less so for a long storm outage. If the runtime chart shows minutes rather than hours at your load, that's the case for a power station.
+
@@
-Two things to check before you rely on one as backup: whether it supports pass-through charging so it can sit permanently plugged in with the router connected, and whether it has a UPS-style automatic switchover fast enough that your gear doesn't reboot. Check the spec sheet for the exact model: EcoFlow, for example, lists a [switchover of under 10 ms for its RIVER 3 (UPS)](https://www.ecoflow.com/au/river-3-ups-portable-power-station), but the same company notes that [many power stations advertised for UPS use switch over in 30 ms or more](https://www.ecoflow.com/us/blog/use-portable-power-station-as-ups-power-supply), and some don't offer the feature at all. If it can't switch automatically, you'll be plugging things in by torchlight.
+Two things to check before you rely on one as backup: whether it supports pass-through charging so it can sit permanently plugged in with the router connected, and whether it has a UPS-style automatic switchover fast enough that your gear doesn't reboot. Check the spec sheet for the exact model: EcoFlow, for example, lists a [switchover of under 10 ms for its RIVER 3 (UPS)](https://www.ecoflow.com/au/river-3-ups-portable-power-station), but the same company notes that [many power stations advertised for UPS use switch over in 30 ms or more](https://www.ecoflow.com/us/blog/use-portable-power-station-as-ups-power-supply), and some don't offer the feature at all. If it can't switch automatically, you'll be plugging things in by torchlight. A slow changeover matters most during a flickering supply, when a modem that reboots on every dip can spend more time reconnecting than online.
@@
-All of this runs on standard 240V Type I outlets. Anything involving new circuits, hardwired camera power, or a permanently installed backup supply means changes to your household wiring, and that is work for a licensed electrician — don't improvise it. Energy Safe Victoria, for example, says [any changes to household wiring must be carried out by a licensed electrician](https://www.energysafe.vic.gov.au/community-safety/emergencies/using-generator-safely) and warns against connecting a generator into a wall socket or switchboard because of the back-feed risk. Rules differ between states, so check with your electrician and your state's electrical safety regulator.
+Also read the manual and warranty terms for how the maker expects the unit to be used while it sits permanently on charge with a load connected. Not every power station is designed or supported for continuous pass-through use, so confirm it before you make one your always-on backup.
+
+All of this runs on standard 240V Type I outlets. Anything involving new circuits, hardwired camera power, or a permanently installed backup supply means changes to your household wiring, and that is work for a licensed electrician — don't improvise it. Energy Safe Victoria, for example, says [any changes to household wiring must be carried out by a licensed electrician](https://www.energysafe.vic.gov.au/community-safety/emergencies/using-generator-safely) and warns against connecting a generator into a wall socket or switchboard because of the back-feed risk. Rules differ between states, so check with your electrician and your state's electrical safety regulator. The low-risk approach is to plug your network gear straight into the power station's own outlets, using leads in good condition and rated for the load.
+
+Running new data cable for PoE cameras through walls or ceilings is a separate question. The ACMA lists [data cabling for computers that connect to the telecommunications network, and security systems](https://www.acma.gov.au/cabling-your-home-or-office), among the work registered cablers do, so talk to a registered cabler before you start drilling rather than assuming it's a DIY job.
@@
+Two caveats. A microSD card inside the camera is cheap insurance, but it leaves with the camera if someone pulls it off the wall, so where you can, record to a hub or recorder kept somewhere less exposed and treat the card as a second copy. And on some ecosystems, local or hub storage and the features around it depend on the subscription tier, which can change, so check the current plan inclusions for your model before relying on it. Whichever you choose, the hub or recorder needs to be on backup power too; battery cameras paired with a backed-up hub are what survive a blackout end to end.
+
@@
+
+Local recording doesn't change what your cameras are allowed to capture. The OAIC notes that the Privacy Act [doesn't cover a security camera operated by an individual acting in a private capacity, but state or territory laws may apply](https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras). If a camera takes in a neighbour's property, shared areas or audio, check the rules with your state or territory, and if you rent, check your lease and your state's tenancy authority too.
@@
+- **A standalone 4G/5G modem.** Cheaper if your router has no SIM slot, but it won't take over automatically unless your router supports dual WAN failover; otherwise you're swapping cables by hand.
@@
-Also confirm your mobile coverage indoors. If the same storm has knocked out the local mobile tower's backhaul, no amount of failover helps.
+Also confirm your mobile coverage indoors. If the same storm has knocked out the local mobile tower's backhaul, no amount of failover helps. Towers have limited reserves of their own in a wide-area blackout, too: Telstra says most of its sites have batteries that [typically provide between 3 and 12 hours of backup power](https://www.telstra.com.au/exchange/-mobile-networks-explained--why-your-mobile-signal-and-coverage-), after which a site goes offline unless mains power returns or another power source is available. Beyond that point, local recording is what keeps your footage.
@@
-## Know when the power comes back
+## Know when the power goes out, and when it comes back
@@
-A small but genuinely useful addition: a smart plug on a non-critical circuit acts as a power sentinel. When mains returns, it reconnects and reports online, and you can automate a notification from that event in the vendor app or Home Assistant.
+A small but genuinely useful addition: a smart plug on a non-critical circuit acts as a power sentinel. Because your router is on backup power and the plug isn't, the plug dropping offline while the network stays up is a clear sign the mains has gone, and you can automate a notification from that event in Home Assistant, or in the vendor app if it offers offline alerts. When mains returns, it reconnects and reports online, so you also know how long the house was without power, which is handy if you're away and wondering about the fridge.
@@
-- Twice a year, pull the plug on the UPS and time how long the network stays up. Schneider Electric (APC) puts the typical life of sealed lead-acid (VRLA) UPS batteries at [three to five years, and lithium-ion at eight to ten](https://www.se.com/us/en/faqs/FAQ000265093/), with heat and power quality shortening it — check your model's documentation.
+- Twice a year, pull the plug on the UPS and time how long the network stays up, then check the recorder or hub actually kept recording through the test. Schneider Electric (APC) puts the typical life of sealed lead-acid (VRLA) UPS batteries at [three to five years, and lithium-ion at eight to ten](https://www.se.com/us/en/faqs/FAQ000265093/), with heat and power quality shortening it — check your model's documentation.
```

## Full merged body

When the power drops or the NBN falls over, most home camera systems quietly stop doing their job. The cameras lose power, the router loses power, and even if the cameras have their own batteries, the cloud upload has nowhere to go. Storms are exactly when you'd want the footage.

The good news is that a camera setup only draws a handful of watts. Keeping it alive through a typical outage is one of the cheaper resilience projects in a smart home — if you back up the right things in the right order.

## First, work out which failure you're solving

Blackouts and internet outages look similar from the app, but they need different fixes.

**Mains power loss.** Everything goes: cameras, PoE switch, NVR, modem, router, Wi-Fi mesh nodes. Even battery cameras go dark in practice, because the Wi-Fi they talk to is gone.

**Internet loss with power intact.** Cameras and local recording keep working. What you lose is remote viewing and push notifications — and, on cloud-only cameras, the recordings themselves.

**Partial NBN failures.** On FTTP, the nbn connection box in your house [needs mains power to work](https://www.nbnco.com.au/learn/what-happens-in-a-power-blackout). Some older installations have a battery back-up unit, but nbn [stopped offering new ones from June 2024](https://www.nbnco.com.au/learn/network-technology/fibre-to-the-premises-explained-fttp/battery-back-up-information), and the feature was designed around keeping [voice services running in a power outage](https://www.nbnco.com.au/content/dam/nbn/documents/sell/wba/2023/notification-of-product-feature-withdrawal-uni-v-and-battery-backup-for-ethernet-fibre-20230526.pdf.coredownload.pdf) rather than your home network. On FTTC, the connection box inside your home [powers the service](https://www.nbnco.com.au/learn/network-technology/fibre-to-the-curb-explained-fttc), so it drops out with your power. On FTTN, FTTB, HFC and fixed wireless, nbn says services [won't work during a power outage in its network or at your premises](https://www.nbnco.com.au/learn/what-happens-in-a-power-blackout), so a street-level or tower outage you can't control can take you offline too. Either way, assume your connection is down the moment your house is.

Work out which of these worries you most, because the answer changes what you buy.

## Back up the network before you back up the cameras

This is the step people skip. A camera with a charged battery and no working Wi-Fi is a camera that records nothing you can see.

The priority order for backup power is:

1. **NBN NTD / modem** — the box the line terminates in
2. **Router and any mesh node the cameras associate with**
3. **PoE switch and NVR**, if you run wired cameras
4. **The cameras themselves**, if they're mains or PoE powered

How much a modem-plus-router pair draws depends entirely on the models, so measure it rather than guess: a plug-in energy meter or the UPS's own load display will show the real figure, and the rating printed on each power adapter is a maximum, not typical draw. Do the same with a PoE switch and its cameras, since the total climbs with every camera and any infrared or spotlight in use at night. Network gear is usually a modest load, which is why a small UPS can go a surprisingly long way.

Consumer UPS units in the 650–1000VA class are widely stocked in Australia; at the time of writing, for example, JB Hi-Fi listed a [CyberPower 650VA line-interactive unit at $129](https://www.jbhifi.com.au/products/cyberpower-ut-series-650va-360w-backup-ups-system) and a [CyberPower 1000VA line-interactive unit at $259](https://www.jbhifi.com.au/products/cyberpower-vp1000elcd-1000va-550w-backup-ups-systems), and Officeworks listed a [CyberPower 650VA unit at $129](https://www.officeworks.com.au/shop/officeworks/p/cyberpower-650va-backup-utility-powerboard-ups-in3229148). Prices change, so check before you buy. Runtime depends on your measured load, the battery's size and its age: find your load on the manufacturer's runtime chart rather than relying on the VA number on the box — VA is a headline figure, not a promise of hours. CyberPower itself notes its published runtimes are [approximate and vary with battery age, charge level and environment](https://www.cyberpower.com/au/en/blog/how-much-runtime-do-i-really-need), so test yours (see the checklist below).

One caveat worth knowing: many cheaper UPS units output a stepped (simulated) sine wave on battery — the [CyberPower 1000VA model above](https://www.jbhifi.com.au/products/cyberpower-vp1000elcd-1000va-550w-backup-ups-systems) is one. CyberPower says equipment with an [active power factor correction (PFC) power supply requires a pure sine wave source](https://www.cyberpower.com/global/en/product/series/pfc_sinewave_gen._1), so check the power supply specs of anything you plan to connect, or choose a pure sine wave UPS if you're unsure.

A small desktop UPS is best suited to the network gear alone. Add an NVR and a string of PoE cameras and the load climbs, so the same unit covers a much shorter outage: fine for a flicker or a brief drop, less so for a long storm outage. If the runtime chart shows minutes rather than hours at your load, that's the case for a power station.

## Portable power stations: longer runtime, more flexibility

If your area cops multi-hour outages — bushfire season, storm season, rural feeders — a lithium power station gives far more headroom than a UPS, and you can use it for the fridge or phone charging once the cameras are sorted.

The practical maths is simple. Divide the unit's usable watt-hours by your measured load in watts, then allow for inverter losses and the unit's own consumption, which vary by model — check the manufacturer's stated efficiency or runtime estimate. As a worked example, a 500Wh unit running a 25W load gives 20 hours on paper (500 ÷ 25), and real-world runtime will be shorter once those losses are counted. That covers almost any suburban outage.

::product:voltx-e600-portable-power-station::

Two things to check before you rely on one as backup: whether it supports pass-through charging so it can sit permanently plugged in with the router connected, and whether it has a UPS-style automatic switchover fast enough that your gear doesn't reboot. Check the spec sheet for the exact model: EcoFlow, for example, lists a [switchover of under 10 ms for its RIVER 3 (UPS)](https://www.ecoflow.com/au/river-3-ups-portable-power-station), but the same company notes that [many power stations advertised for UPS use switch over in 30 ms or more](https://www.ecoflow.com/us/blog/use-portable-power-station-as-ups-power-supply), and some don't offer the feature at all. If it can't switch automatically, you'll be plugging things in by torchlight. A slow changeover matters most during a flickering supply, when a modem that reboots on every dip can spend more time reconnecting than online.

Also read the manual and warranty terms for how the maker expects the unit to be used while it sits permanently on charge with a load connected. Not every power station is designed or supported for continuous pass-through use, so confirm it before you make one your always-on backup.

All of this runs on standard 240V Type I outlets. Anything involving new circuits, hardwired camera power, or a permanently installed backup supply means changes to your household wiring, and that is work for a licensed electrician — don't improvise it. Energy Safe Victoria, for example, says [any changes to household wiring must be carried out by a licensed electrician](https://www.energysafe.vic.gov.au/community-safety/emergencies/using-generator-safely) and warns against connecting a generator into a wall socket or switchboard because of the back-feed risk. Rules differ between states, so check with your electrician and your state's electrical safety regulator. The low-risk approach is to plug your network gear straight into the power station's own outlets, using leads in good condition and rated for the load.

Running new data cable for PoE cameras through walls or ceilings is a separate question. The ACMA lists [data cabling for computers that connect to the telecommunications network, and security systems](https://www.acma.gov.au/cabling-your-home-or-office), among the work registered cablers do, so talk to a registered cabler before you start drilling rather than assuming it's a DIY job.

## Battery cameras and local recording keep working when the cloud doesn't

Battery-powered cameras solve the power half of the problem by design. They're also the only realistic option for renters, since there's no cabling and no drilling into someone else's walls.

::product:arlo-ultra-2-4k-spotlight-camera::

The specification implies a camera like this will keep detecting and recording locally to its hub for as long as the battery lasts, but the value of that depends entirely on where footage is stored. If your system is cloud-only, an internet outage means events are detected, uploaded to nothing, and in some cases discarded. Check whether your cameras or hub support local storage — microSD, USB drive or an internal disk — and turn it on. That single setting is often the difference between "we lost the night of the break-in" and a usable file.

Two caveats. A microSD card inside the camera is cheap insurance, but it leaves with the camera if someone pulls it off the wall, so where you can, record to a hub or recorder kept somewhere less exposed and treat the card as a second copy. And on some ecosystems, local or hub storage and the features around it depend on the subscription tier, which can change, so check the current plan inclusions for your model before relying on it. Whichever you choose, the hub or recorder needs to be on backup power too; battery cameras paired with a backed-up hub are what survive a blackout end to end.

Home Assistant users have an advantage here: an RTSP-capable camera recording to a local NVR (Frigate, Scrypted, Blue Iris or similar) on a UPS keeps recording regardless of what the NBN is doing. The internet only affects your ability to watch it from the pub.

Local recording doesn't change what your cameras are allowed to capture. The OAIC notes that the Privacy Act [doesn't cover a security camera operated by an individual acting in a private capacity, but state or territory laws may apply](https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras). If a camera takes in a neighbour's property, shared areas or audio, check the rules with your state or territory, and if you rent, check your lease and your state's tenancy authority too.

## Add a mobile failover path for alerts

Backup power keeps the gear alive; it doesn't restore your internet connection. For alerts to reach your phone during an NBN outage you need a second path.

- **Router with 4G/5G failover.** Many mid-range routers accept a SIM or a USB modem and switch automatically. A cheap prepaid data SIM costs very little to keep active, and camera alerts use minimal data — full-quality video streaming does not, so cap the quality while on mobile.
- **A standalone 4G/5G modem.** Cheaper if your router has no SIM slot, but it won't take over automatically unless your router supports dual WAN failover; otherwise you're swapping cables by hand.
- **A phone hotspot.** Free, manual, and requires you to be home and awake. Better than nothing.
- **Mobile-connected cameras.** Some models take their own SIM. Useful at sheds and rural properties with no fixed line.

Also confirm your mobile coverage indoors. If the same storm has knocked out the local mobile tower's backhaul, no amount of failover helps. Towers have limited reserves of their own in a wide-area blackout, too: Telstra says most of its sites have batteries that [typically provide between 3 and 12 hours of backup power](https://www.telstra.com.au/exchange/-mobile-networks-explained--why-your-mobile-signal-and-coverage-), after which a site goes offline unless mains power returns or another power source is available. Beyond that point, local recording is what keeps your footage.

## Know when the power goes out, and when it comes back

A small but genuinely useful addition: a smart plug on a non-critical circuit acts as a power sentinel. Because your router is on backup power and the plug isn't, the plug dropping offline while the network stays up is a clear sign the mains has gone, and you can automate a notification from that event in Home Assistant, or in the vendor app if it offers offline alerts. When mains returns, it reconnects and reports online, so you also know how long the house was without power, which is handy if you're away and wondering about the fridge.

::product:tp-link-tapo-p100-mini-smart-wi-fi-socket-plug::

Some smart plugs also have a configurable power-on state, which matters if you want a device to come back up automatically rather than staying off after an outage. Worth checking that setting on anything you rely on.

## A practical setup checklist

- Put the NTD, modem and router on the UPS or power station first, before the cameras.
- Measure the actual load with an energy meter or the UPS display, then calculate runtime honestly.
- Enable local recording on every camera or hub that supports it.
- Configure 4G/5G failover and test it by unplugging the WAN cable, not by assuming.
- Twice a year, pull the plug on the UPS and time how long the network stays up, then check the recorder or hub actually kept recording through the test. Schneider Electric (APC) puts the typical life of sealed lead-acid (VRLA) UPS batteries at [three to five years, and lithium-ion at eight to ten](https://www.se.com/us/en/faqs/FAQ000265093/), with heat and power quality shortening it — check your model's documentation.
- Note which cameras are cloud-dependent, and treat those as bonus coverage rather than your primary record.

Do those six things and a blackout becomes an inconvenience rather than a blind spot.