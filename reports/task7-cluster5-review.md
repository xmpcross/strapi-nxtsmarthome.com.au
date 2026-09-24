# Task 7 review: cluster 5, smart home for renters

**Nothing has been written to Strapi.** Reply **approve** to publish the merged article and add the redirect. Then unpublish the MERGE post in the Strapi admin.

| | Slug | Title | Words | [VERIFY] | Product boxes |
|---|---|---|---|---|---|
| **KEEP** | smart-home-for-renters-australia | Smart Home for Renters: What You Can Install Without Losing Your Bond | 1020 | 0 | 0 |
| MERGE | renter-smart-home-devices-no-drilling | Smart Home Devices Renters Can Install Without Drilling | 885 | 3 | 0 |

## What happens on approve

1. **KEEP updated in Strapi:** body, excerpt, keyTakeaways and FAQ from the draft below. Title "Smart Home for Renters: What You Can Install Without Drilling or Rewiring"; seoTitle "Smart Home for Renters: No-Drill Devices and the Rules"; seoDescription "Build a smart home in a rental: plug-in, adhesive and free-standing devices, what needs permission, and how tenancy rules differ between states.". Slug and `publishDate` (9 Jul 2026) kept; `dateModified` set to today.
2. **KEEP gains 3 product boxes** (it had none, which broke rule 8): Tapo P100 smart plug, Tapo T315 temperature and humidity monitor, and Philips Hue dimmer switch V2. All three have curated verdicts and are discussed where they appear. The Aqara Hub M3 was considered and not used.
3. **301** `/buying-guides/renter-smart-home-devices-no-drilling/` → `/buying-guides/smart-home-for-renters-australia/` added to `data/redirects-adsense.json` (already live via `data/merged-articles.json`).
4. **Internal links to the MERGE URL:** none.
5. **You unpublish the MERGE post** in the Strapi admin.
6. Build, audit, changelog.

Backups: `exports/strapi-backup/<slug>-2026-09-24T10-16-37-366Z.json`.

The title no longer promises "without losing your bond": that outcome depends on the lease and the state, so the new title describes the method instead.

---

# Merge: renter-smart-home-devices-no-drilling → smart-home-for-renters-australia

## Section map (MERGE → KEEP)

| MERGE item | Status | Where in merged KEEP |
| --- | --- | --- |
| Intro: most advice assumes cable/switch/screws; grouped by how it attaches | UNIQUE (the framing) | Intro para 2; "What usually needs no permission" is now split into H3s by attachment |
| Link to broader renters guide | Dropped (self-link after merge) | n/a |
| Inline cover image `renter-smart-home-devices-no-drilling-inline.webp` | Dropped | n/a (flag: add to KEEP only if an editor wants it) |
| H2 Plugs into a socket: smart plugs most useful | COVERED | KEEP "Smart plugs" (strengthened with "single most useful") |
| AU plugs chunky, may block second socket; some angled to avoid | UNIQUE | "Plugs into a socket" > Smart plugs (AS/NZS 3112 reference dropped, see decisions) |
| Smart speakers/displays on a shelf | COVERED | KEEP speakers |
| Plug-in sensors and repeaters | COVERED (mesh nodes/hubs) | Hubs line + Wi-Fi mesh |
| H2 Sticks on with adhesive: door/window sensors | COVERED | KEEP "Battery sensors" → now own bullet |
| Motion sensors: mount matters, bookshelf vs cornice | UNIQUE (tip) | Motion sensors bullet |
| Leak sensors: placement (sink, washing machine, hot water), sit on floor, highest value for renters | UNIQUE (placement + rationale) | Leak sensors bullet; also in buy-first order |
| Smart buttons/scene controllers beside a doorway | UNIQUE | Smart buttons bullet (+ Hue Dimmer marker) |
| Adhesive: stretch-release strips vs permanent foam tape; "$30 sensor → paint repair" | UNIQUE (partly covered by KEEP "Prefer adhesive") | "On adhesive" paragraph; price removed |
| H2 Sits on a surface: weighted indoor cameras + privacy link | COVERED (cameras) / UNIQUE (privacy link) | "Sits on a surface" |
| Air quality/climate sensors on shelf | COVERED (KEEP battery temp/humidity sensors) | Temperature and humidity bullet |
| Hubs/border routers beside router | COVERED | Hubs bullet |
| H2 Screws into what is already there: retrofit locks reusing screw holes | COVERED (KEEP smart locks) + UNIQUE detail (reuses original screw holes) | "What needs a conversation" > Smart locks |
| Smart blind retrofits clipping onto roller | UNIQUE | "What needs a conversation" > Smart blind retrofits |
| [VERIFY] tenancy rules differ by state | UNIQUE (as a flagged claim) | Resolved in "The rule of thumb" with VIC/NSW/WA/QLD examples |
| H2 What to leave alone: hardwired switches (electrical not lease) + link | COVERED (KEEP smart switches) / UNIQUE (internal link, "electrical not lease" framing) | Rule of thumb + Smart switches |
| Outdoor cameras and doorbells: drilling into brick/render, wiring | COVERED (KEEP doorbells) / UNIQUE (outdoor cameras as own item) | Video doorbells; Outdoor cameras |
| Full smart lock replacements | COVERED | Smart locks |
| H2 The practical order (plug, leak sensors, door sensor, speaker last) | COVERED (KEEP "What to buy first") / UNIQUE (leak sensors, speaker-last logic) | Merged into one 5-step list |
| Closing: moves in a shoebox | COVERED | KEEP close |
| HTML maintenance comment | Dropped (not reader-facing; its no-brands policy superseded by CLAUDE.md rule 8) | n/a |
| FAQ 1474 adhesive paint | UNIQUE | FAQ 5 (no id) |
| FAQ 1475 smart lock no drilling [VERIFY] | COVERED by KEEP 1470 | Merged into FAQ 1470 |
| FAQ 1476 most useful no-drill device | COVERED in body (Smart plugs) | Dropped from FAQ |
| FAQ 1477 do I need a hub | UNIQUE | FAQ 6 (no id); also Hubs bullet |

## Decisions (claims resolved)

| # | Original | a/b/c | New | Sources |
| --- | --- | --- | --- | --- |
| 1 | KEEP: fixed electrical work must be performed by a licensed electrician "regardless of who owns the property", "not negotiable" | a | Licensed electrician for fixed wiring, quoting ESV and NSW Govt; readers told to check their state regulator | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself ; https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/avoiding-electrical-accidents |
| 2 | KEEP: plug-in/stick-on items "yours to install freely", "no permission at all" | b | "usually low-risk"; H2 "What usually needs no permission"; state examples + "check your lease and tenancy authority" | CAV, NSW, WA, QLD RTA pages below |
| 3 | MERGE [VERIFY] 1: tenancy rules differ by state; retrofit lock/blinds need written permission | a | VIC/NSW/WA/QLD examples with links; pointer to own state's authority; "not legal advice" | https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property ; https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property ; https://www.consumerprotection.wa.gov.au/making-changes-rental-home ; https://www.rta.qld.gov.au/during-a-tenancy/living-in-the-property/fixtures-and-structural-changes |
| 4 | MERGE [VERIFY] 2 (FAQ 1475): verify your tenancy agreement for retrofit locks | b | FAQ 1470 says most leases treat it as an alteration; ask first, get it in writing | as #3 |
| 5 | MERGE [VERIFY] 3 (HTML comment): tenancy claims general and flagged | c | Comment removed; claims now sourced per #3 | n/a |
| 6 | KEEP: hardwired smoke alarms owner's legal responsibility, varies by state | a | NSW example: landlord must ensure working, cannot delegate; hardwired alarms by licensed electrician; varies by state | https://www.nsw.gov.au/housing-and-construction/rules/smoke-alarms-a-rental-property |
| 7 | KEEP: strata by-laws; camera on common areas frequently needs approval | a/b | NSW: tenants follow by-laws, cannot modify common property; WA: strata rule is a refusal ground; camera approval kept as "often" | https://www.nsw.gov.au/housing-and-construction/renting-a-place-to-live/renting-strata ; https://www.consumerprotection.wa.gov.au/making-changes-rental-home |
| 8 | KEEP: wired doorbell transformer = electrician work; battery doorbells "sidestep this entirely" | a/b | Mains transformer = electrician (general, per #1); VIC lists wireless doorbell as no-consent; mounting may still need drilling | ESV page (#1); CAV page (#3) |
| 9 | KEEP: smart lock retrofit "completely reversible" | b | "far more reversible", still an alteration | n/a (absolute removed) |
| 10 | KEEP: "how to keep your bond" (intro, title) | b | "leave the place as you found it"; title no longer promises bond outcome | n/a |
| 11 | KEEP: battery sensors "run for a year or more on a coin cell" | c | Removed; battery claims now only in product-specific text (T315 two AAA) | https://www.tp-link.com/au/smart-home/smart-sensor/tapo-t315/ |
| 12 | KEEP: B22 common in older rentals; "many imported ranges do not offer it" | b | "both are common in Australian homes, and not every smart bulb range is sold in both" | general guidance, no figure |
| 13 | KEEP: channels 1, 6, 11 | a | Linked TP-Link explanation (non-interfering at 20 MHz) | https://www.tp-link.com/us/support/faq/4309/ |
| 14 | KEEP: dedicated 2.4 GHz network "solves most setup failures and a good share of dropouts" | b | "can make setup and troubleshooting easier"; P100 2.4 GHz-only verified | https://www.tp-link.com/au/home-networking/smart-plug/tapo-p100/ |
| 15 | KEEP: adhesive strips "come off cleanly" | b | "designed to come off cleanly, though older or poorly prepared paint can still lift" | n/a |
| 16 | MERGE: AS/NZS 3112 plug standard | c | Standard number removed; kept the socket-blocking tip, sourced via P100 | https://www.tp-link.com/au/home-networking/smart-plug/tapo-p100/ |
| 17 | MERGE: "$30 sensor turns into a paint repair" | c | Price removed ("a small sensor") | n/a |
| 18 | KEEP: router yours if internet in your name | b | Kept as "usually/generally" guidance | n/a |
| 19 | NEW: WA/VIC restoration at end of tenancy | a | WA remove + repair unless landlord keeps; VIC renters must typically restore | CAV and WA pages (#3) |
| 20 | NEW: Hue Dimmer no rewiring, adhesive/screws, 10 lights without Bridge, Bridge to customise | a | As stated | https://www.philips-hue.com/en-au/p/hue-dimmer-switch-latest-model/8719514274631 |
| 21 | NEW: T315 hub requirement, 3M adhesive, AAA | a | As stated | https://www.tp-link.com/au/smart-home/smart-sensor/tapo-t315/ |

FAQ sources (answers carry no links): FAQ 1470 → #3/#9; 1471 → CAV page; 1472 → CAV, NSW making-changes, NSW strata pages; 1473 → none (general guidance); adhesive → WA page (repair damage); hub → P100 and T315 AU pages.

## Product markers chosen and why

- `tp-link-tapo-p100-mini-smart-wi-fi-socket-plug` — after the smart plugs paragraph, which discusses it directly; its curated file's bestFor names renters, and its "sized to avoid blocking the neighbouring socket" pro matches MERGE's unique socket-blocking tip. Chosen over P110 because the article does not discuss energy monitoring.
- `tp-link-tapo-smart-temperature-humidity-monitor` — after the temperature/humidity sensor paragraph; adhesive-or-desk mounting fits the no-drill theme, and the paragraph states its hub caveat (matches the file's cons).
- `philips-hue-smart-dimmer-switch-v2` — after the smart buttons paragraph (unique MERGE item); file's bestFor explicitly names renters, battery/no rewiring; text states the Hue-only and Bridge caveats.
- Not used: aqara-hub-m3 (curated file is thin, model number unverified, own notes suggest unpublishing); philips-hue-bridge (not discussed enough); P110 (energy not a topic).
- No ratings, no prices anywhere.

## Needs human legal review

1. State tenancy examples (VIC no-consent list, NSW "cannot unreasonably refuse" list, WA 14-day/Form 26 process and restoration duty, QLD 28-day written response): paraphrased from official pages opened 24 Sep 2026; QLD reforms were in flux in 2025–26, so re-check the RTA page before publishing.
2. NSW outdoor camera "subject to Surveillance Devices Act 2007" and general surveillance/privacy statements in body and FAQ 1472.
3. Electrical licensing: body says fixed wiring needs a licensed electrician (VIC/NSW sourced); a doorbell mains transformer is treated as licensed work (ESV page lists changing power points/switches, not transformers specifically; secondary sources name transformers).
4. Smoke alarms: NSW-only example; other states differ.
5. Strata: "camera covering common areas often needs approval" is general guidance, sourced only for NSW/WA.

## Flagged, not changed

- MERGE's inline cover image dropped; KEEP has none inline. Editor may add one.
- KEEP FAQ "Can I put up cameras?" retitled "Can I put up cameras in a rental?" (same id 1472).
- Internal link to `/hubs-and-platforms/zigbee-vs-zwave-vs-thread-vs-wifi/` added (article exists, category hubs-and-platforms).
- The Tapo P100 page URL on tp-link.com/au rendered imperial dimensions to the fetcher; the article quotes only the "avoid blocking adjacent sockets" phrase.
- TP-Link channel FAQ is the US page (channel plan 1/6/11 is phrased for the US); AU uses the same 2.4 GHz channel numbering, but an AU-specific source would be better.
- After publishing, the MERGE slug needs a 301 to `/buying-guides/smart-home-for-renters-australia/`, and MERGE FAQ ids 1474–1477 will be orphaned.


---

## Merged article: meta

- **title:** Smart Home for Renters: What You Can Install Without Losing Your Bond → **Smart Home for Renters: What You Can Install Without Drilling or Rewiring**
- **seoTitle:** Smart Home for Renters: No-Drill Devices and the Rules
- **seoDescription:** Build a smart home in a rental: plug-in, adhesive and free-standing devices, what needs permission, and how tenancy rules differ between states.
- **excerpt:** Plug-in, screw-in, stick-on and free-standing devices cover most of a smart home. Here is what usually needs no permission, what needs a conversation first, and how to take it all with you when you move.
- **keyTakeaways:** Plug-in devices, smart bulbs, adhesive-mounted battery sensors and free-standing cameras cover most of what a smart home does, and they pack into a box on moving day. Fixed wiring always needs a licensed electrician and the owner's permission. Rules for anything in between, from adhesive mounts to outdoor cameras and retrofit locks, differ by state and territory, so check your lease and your state's tenancy authority and get permission in writing.

### FAQ (6)

**Can I install a smart lock in a rental?** (KEEP #1470)

Usually not without the owner's permission, because it changes the door hardware and can affect the owner's and agent's key access. Some retrofit smart locks fit over the inside of an existing deadbolt or deadlatch, reusing the original screw holes and leaving the outside of the door and the key untouched. That is an easier conversation to have with a property manager, but most leases still treat it as an alteration, so ask first and get permission in writing.

**Will smart bulbs damage the light fittings?** (KEEP #1471)

Swapping a globe into an existing fitting is not rewiring, and changing it back when you leave takes a minute. In Victoria, LED bulbs that don't need new light fittings are on the official list of changes renters can make without consent; elsewhere, check your lease. Confirm whether your fittings are B22 bayonet or E27 screw before buying, and keep the original globes in a box.

**Can I put up cameras in a rental?** (KEEP #1472)

It depends on the camera and your state. Free-standing indoor cameras need no mounting. Victoria lets renters install security cameras that are not hardwired, are easily removed and do not impact neighbours' privacy without consent, while NSW treats a wireless removable outdoor camera as a change a landlord cannot unreasonably refuse, but you still need permission. Anything that needs drilling needs permission, surveillance and privacy laws apply regardless of your lease, and in an apartment strata by-laws may also restrict cameras on or covering common property.

**Can I replace the router my landlord supplied?** (KEEP #1473)

If the internet service is in your name, the router is generally yours to change. If one was supplied with the property, keep it safe and put it back when you leave. A better router or a mesh system is often the highest-impact smart home upgrade a renter can make.

**Will adhesive mounts damage the paint when I take them down?** (new)

They can, particularly on older or poorly prepared paint. Removable stretch-release strips are much safer than permanent foam tape, and warming the adhesive gently before removal helps. Test on an inconspicuous spot first, and take devices down before they have been up for years. In some states you are expected to repair any damage caused by a modification when you leave.

**Do I need a hub for renter-friendly devices?** (new)

Not for Wi-Fi devices such as most smart plugs, which connect straight to your router. Battery sensors that run on Zigbee, Thread or a brand's own radio usually need a hub or border router, which simply sits beside the router. Check what each device needs before you buy, so you do not end up with a sensor that does nothing without an extra box.

## Body diff against the current KEEP post

```diff
--- KEEP now
+++ merged
@@
-There is a persistent assumption that smart homes are for homeowners. It is wrong. The overwhelming majority of smart home functionality needs no wiring, no drilling and no permission — and it all comes with you when you move.
+There is a persistent assumption that smart homes are for homeowners. It is wrong. Most smart home functionality needs no wiring and no drilling, and it all comes with you when you move.
@@
-Here is what works, what does not, and how to keep your bond.
+Here is what works in a rental, what needs a conversation first, and how to leave the place as you found it. Devices are grouped by how they attach, because that is the constraint that matters when the walls are not yours.
@@
-If it **plugs in, screws in, sticks on or sits on a shelf**, it is yours to install freely.
+If it **plugs in, screws into an existing fitting, sticks on or sits on a shelf**, it is usually low-risk in a rental.
@@
-If it involves **fixed wiring**, it needs the owner's permission and a licensed electrician — and in Australia that is not negotiable, because fixed electrical work must be performed by a licensed electrician regardless of who owns the property.
+If it involves **fixed wiring**, it needs the owner's permission and a licensed electrician. That is not a lease question, it is an electrical one: [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) warns that unqualified electrical work is illegal and that it "isn't a DIY job, even for small jobs such as changing power points or light switches", and the [NSW Government](https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/avoiding-electrical-accidents) says that by law electrical installation work must be done by a licensed electrician. Other states have their own regulator, so check yours, and see our guide to [what electrical work you can legally do yourself](/setup-guides/smart-home-electrical-work-australia-legal/).
@@
-That single distinction covers nearly every decision.
+Between those two ends sits everything that touches the property without touching the wiring: an adhesive strip, a screw into a door frame, a camera on the balcony. Here the rules depend on your state or territory, and they differ in the detail. Three examples:
@@
-## What you can install with no permission at all
+- **Victoria.** [Consumer Affairs Victoria](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property) lists changes renters can make without consent, including LED light bulbs that don't need new light fittings, a wireless doorbell, and alarm systems or security cameras that are not hardwired, can easily be removed and do not impact the privacy of neighbours. Anything beyond that list needs written consent.
+- **New South Wales.** The [NSW Government](https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property) lists minor changes a landlord cannot unreasonably refuse, including a wireless removable outdoor security camera and changes that do not penetrate or permanently modify a surface, fixture or the structure. You still need the lease to allow it or the landlord's written permission.
+- **Western Australia.** [Consumer Protection WA](https://www.consumerprotection.wa.gov.au/making-changes-rental-home) says tenants ask first using a minor modification request form, the landlord has 14 days to respond, and at the end of the tenancy the tenant removes the modification and repairs any damage unless the landlord agrees to keep it.
@@
-**Smart bulbs.** Swap the globe, keep the original in a cupboard, swap it back when you leave. Check whether your fittings are B22 bayonet or E27 Edison screw before ordering — B22 is common in older Australian rentals and many imported ranges do not offer it.
+In Queensland, the [RTA](https://www.rta.qld.gov.au/during-a-tenancy/living-in-the-property/fixtures-and-structural-changes) says tenants must ask permission to attach a fixture, and the owner or manager has 28 days to reply in writing. Elsewhere, check your own state or territory's tenancy authority. And whatever the law allows, read your lease: it is the document your final inspection will be measured against. Nothing on this page is legal advice.
@@
-**Smart plugs.** Nothing to install. Excellent for lamps, heaters, fans, towel rails and anything else you forget to turn off.
+## What usually needs no permission
@@
-**Battery sensors.** Contact sensors for doors and windows, motion sensors, temperature and humidity sensors, water leak sensors. All mount with adhesive strips and run for a year or more on a coin cell.
+### Plugs into a socket
@@
-**Battery cameras.** Indoor cameras that sit on a shelf need nothing. Outdoor battery cameras with adhesive or clamp mounts avoid drilling.
+**Smart plugs.** The single most useful device for a renter. A lamp, fan, heater, towel rail or phone charger becomes schedulable, and nothing is attached to the building at all. Australian smart plugs can be chunky, so check whether one will block the second socket on a double power point. Some are designed specifically to avoid that.
@@
-**Smart speakers and displays.** Plug in and go.
+The TP-Link Tapo P100 is a good example of the renter-friendly kind. TP-Link Australia says it is ["built smaller to avoid blocking adjacent sockets"](https://www.tp-link.com/au/home-networking/smart-plug/tapo-p100/), needs no separate hub, and offers schedules plus an Away Mode that switches plugged-in devices on and off so the place looks occupied. It is 2.4 GHz Wi-Fi only, and it does not measure energy use.
@@
-**Hubs and bridges.** Zigbee hubs, Thread border routers, a Home Assistant box. All just sit on a shelf.
+::product:tp-link-tapo-p100-mini-smart-wi-fi-socket-plug::
@@
-**Robot vacuums.** No installation at all, and genuinely useful in a small space.
+**Smart speakers and displays.** They sit on a shelf and plug in. That is the whole installation.
@@
-**Smart TV devices and streaming boxes.** Plug into HDMI.
+**Hubs, bridges and border routers.** They sit beside the router. Wi-Fi devices connect straight to the router and need none of this; battery sensors on Zigbee or Thread usually do. Our [Zigbee, Z-Wave, Thread and Wi-Fi explainer](/hubs-and-platforms/zigbee-vs-zwave-vs-thread-vs-wifi/) covers the trade-off.
@@
-That list covers lighting, security monitoring, climate sensing, energy monitoring, voice control and automation. It is most of a smart home.
+### Swaps into an existing fitting
+
+**Smart bulbs.** Swap the globe, keep the original in a cupboard, swap it back when you leave. Consumer Affairs Victoria specifically lists LED bulbs that don't need new light fittings among the changes Victorian renters can make without consent. Check whether your fittings are B22 bayonet or E27 Edison screw before ordering; both are common in Australian homes, and not every smart bulb range is sold in both.
+
+### Sticks on with adhesive
+
+This is where most of the no-drilling range lives, and where a little care pays off at the end of the lease.
+
+**Door and window sensors.** Two small blocks, one on the frame and one on the door, held on with adhesive strips. Battery-powered and easy to overlook.
+
+**Motion sensors.** Corner-mounted or shelf-standing. The mount matters less than the aim: a sensor on a bookshelf pointed down a hallway can do the same job as one screwed into a cornice.
+
+**Leak sensors.** Under the sink, behind the washing machine, next to the hot water unit. These do not mount at all; they sit on the floor. For a renter they are arguably the most valuable sensor here, because a leak caught early is less likely to turn into water damage and a dispute about who pays for it.
+
+**Temperature and humidity sensors.** Useful for mould-prone bathrooms and hot bedrooms. The Tapo T315 is one example that suits a rental: TP-Link Australia says it [sits on a desk or mounts with the included 3M adhesive](https://www.tp-link.com/au/smart-home/smart-sensor/tapo-t315/), runs on two AAA batteries, and shows readings on an e-ink screen. The catch is that TP-Link says a Tapo hub is required for remote monitoring, automations and data export, so without one it is essentially a desk display.
+
+::product:tp-link-tapo-smart-temperature-humidity-monitor::
+
+**Smart buttons and scene controllers.** A wireless button stuck beside a doorway does what a wall switch does, without touching the wall switch. If you already use Philips Hue bulbs, the Hue Dimmer Switch is built for exactly this: Philips Hue describes it as ["battery powered and wireless, so you won't have to do any rewiring"](https://www.philips-hue.com/en-au/p/hue-dimmer-switch-latest-model/8719514274631), and the wall plate attaches with included adhesive or screws. It can pair with up to 10 Hue lights without a Bridge, but Philips Hue says a Bridge is needed to customise what the buttons do. It is built for Hue lights, so it is not the answer if your bulbs are another brand.
+
+::product:philips-hue-smart-dimmer-switch-v2::
+
+**On adhesive.** Where a device is light enough, use removable stretch-release strips rather than permanent foam tape. They cost a little more and are designed to come off cleanly, though older or poorly prepared paint can still lift. Test on an inconspicuous spot first, warm the adhesive gently before removal, and do not leave a device up for years before finding out. Permanent tape on a rental wall is how a small sensor turns into a paint repair.
+
+### Sits on a surface
+
+**Indoor cameras.** Free-standing models with a weighted base need no mounting. Cameras carry privacy obligations that go beyond your lease, so read [what Australian privacy law says about home cameras](/security-and-cameras/smart-home-privacy-cameras-australia-law/) before pointing one anywhere shared.
+
+That is most of a smart home.
@@
-**Smart switches.** These replace the wall switch and require both owner permission and a licensed electrician. In most rentals it is not worth pursuing — smart bulbs achieve most of the same result.
+**Smart switches.** These replace the wall switch, which means fixed wiring: owner permission and a licensed electrician. In most rentals it is not worth pursuing when smart bulbs and a wireless button achieve most of the same result.
@@
-**Wired video doorbells.** If there is existing doorbell wiring you may be able to swap the button, but anything involving the transformer is electrician work. Battery doorbells sidestep this entirely and are the standard renter answer.
+**Video doorbells.** A wired doorbell is usually drilling plus wiring, and anything involving a mains-powered transformer is a job for an electrician. Battery doorbells sidestep the wiring, and Consumer Affairs Victoria lists a wireless doorbell among the changes Victorian renters can make without consent. Mounting one can still mean screws into brick or render, so check your lease and your state's rules before you drill.
@@
-**Smart locks.** Replacing a lock modifies the property and affects the owner's and agent's key access. Some retrofit models fit over the inside of an existing deadlatch, leaving the exterior hardware and keyway untouched — that is a far easier proposal, and completely reversible. Ask first regardless.
+**Outdoor cameras.** Almost always a bracket screwed into brick or render. In NSW a wireless removable outdoor security camera is on the list of minor changes a landlord cannot unreasonably refuse, but you still need permission, and surveillance law applies regardless of what your lease says.
@@
-**Anything requiring drilling.** Outdoor camera brackets, wall-mounted panels, permanent mounts. Depending on your lease and jurisdiction, minor fixings may be permitted with permission, but get it in writing.
+**Smart locks.** Replacing a lock changes the door hardware and the keying, and affects the owner's and agent's key access. Some retrofit models fit over the inside of an existing deadbolt or deadlatch, reusing the original screw holes and leaving the exterior hardware and the key untouched. That is a much easier proposal and far more reversible, but most leases still treat it as an alteration. Ask first and get the answer in writing.
@@
-**Hardwired smoke alarms.** Not yours to touch. Smoke alarm compliance is the owner's legal responsibility, and requirements vary by state and territory.
+**Smart blind retrofits.** Motors that clip onto an existing roller mechanism reuse the hardware already there, but like retrofit locks they are still an alteration under most leases. Get permission in writing.
+
+**Anything requiring drilling.** Wall-mounted panels, permanent mounts, new fixing points. Depending on your state and your lease, some minor fixings may be allowed or may be hard for a landlord to refuse, but get it in writing.
+
+**Hardwired smoke alarms.** Not yours to touch. In NSW, for example, the [NSW Government](https://www.nsw.gov.au/housing-and-construction/rules/smoke-alarms-a-rental-property) says landlords must ensure smoke alarms are working and cannot hand that responsibility to tenants, and hardwired alarms must be repaired or replaced by a licensed electrician. Requirements vary between states and territories.
@@
-If you rent in an apartment, there is a second layer beyond your lease: the owners corporation and its by-laws.
+If you rent in an apartment or townhouse, there is a second layer beyond your lease: the owners corporation and its by-laws. The [NSW Government's guide to renting in strata](https://www.nsw.gov.au/housing-and-construction/renting-a-place-to-live/renting-strata) says tenants need to follow the by-laws that apply to all residents, and that tenants cannot make modifications to common property. In WA, [Consumer Protection](https://www.consumerprotection.wa.gov.au/making-changes-rental-home) lists a strata rule that prevents a change as one of the grounds a landlord can rely on to refuse it.
@@
-Anything attached to **common property** — external walls, balconies in some schemes, corridors, entry doors — is usually governed by by-laws, and installing a camera covering common areas frequently needs approval. This is true even if your landlord is fine with it.
+Anything attached to common property, such as external walls, corridors and entry doors, is usually governed by the by-laws, and a camera covering common areas often needs approval even if your landlord is happy with it.
@@
-Practically, keep cameras inside your own lot, pointed at your own space. A camera in a window looking at your own balcony is a very different proposition from one mounted in a shared corridor.
+Practically, keep cameras inside your own space, pointed at your own space. A camera in a window looking at your own balcony is a very different proposition from one mounted in a shared corridor.
@@
-If the internet account is in your name, the router usually is too — and replacing it is often the single highest-impact change you can make.
+If the internet account is in your name, the router usually is too, and replacing it is often the single highest-impact change you can make.
@@
-Rentals present specific Wi-Fi challenges. The modem is wherever the wall socket happens to be, often in a hallway or a corner. Older buildings have double brick or rendered walls that eat 2.4 GHz. Apartment buildings have severe channel congestion from dozens of overlapping networks.
+Rentals are hard on Wi-Fi. The modem sits wherever the wall socket is, older double brick or rendered walls weaken the signal, and apartment buildings are crowded with overlapping networks.
@@
-1. **A mesh system.** Additional nodes placed on power points, no cabling required.
-2. **A dedicated 2.4 GHz network for smart devices.** Solves most setup failures and a good share of dropouts.
-3. **Manual channel selection.** In a crowded building, choosing the quietest of channels 1, 6 and 11 beats leaving it on auto.
+1. **A mesh system.** Extra nodes plug into power points, with no cabling required.
+2. **A dedicated 2.4 GHz network for smart devices.** Many smart plugs and sensors, including the Tapo P100, only work on 2.4 GHz, and a separate network can make setup and troubleshooting easier.
+3. **Manual channel selection.** In a crowded building, choosing the quietest of channels 1, 6 and 11, which [TP-Link explains](https://www.tp-link.com/us/support/faq/4309/) do not interfere with each other at 20 MHz width, can beat leaving it on auto.
@@
-If you were supplied a router with the property, keep it in a cupboard and reinstate it when you leave.
+If a router came with the property, keep it in a cupboard and reinstate it when you leave.
@@
-The thing that separates a renter's smart home from a homeowner's is that yours has to be portable. A few habits make moving painless.
+A renter's smart home has to be portable. A few habits make moving painless.
@@
-**Prefer adhesive over anything permanent.** Removable adhesive strips hold sensors and small cameras fine and come off cleanly with heat and patience.
+**Prefer adhesive and free-standing over anything permanent.** In WA, for example, tenants are expected to remove modifications and repair any damage at the end of the tenancy unless the landlord agrees to keep them, and Consumer Affairs Victoria says renters must typically restore the property to its previous condition unless the rental provider agrees otherwise. The less you fix to the walls, the less there is to undo.
@@
-**Avoid location-specific naming.** Naming a device "Hallway Motion" is fine; building automations that hard-code the layout of this particular flat is not. Keep automations simple enough to rebuild in an afternoon.
+**Photograph the fittings before you change anything.** Cheap insurance for the final inspection, alongside your entry condition report.
@@
-**Favour cloud-free where practical.** Not for privacy reasons here, but because a system that does not depend on a specific network configuration is easier to move.
-
-**Photograph the fittings before you change anything.** Cheap insurance for the final inspection.
+**Avoid location-specific automations.** Naming a device "Hallway Motion" is fine; building automations that hard-code the layout of this particular flat is not. Keep them simple enough to rebuild in an afternoon.
@@
-Realistically:
+If you are starting from nothing, this order gets you a useful smart home for the least commitment:
@@
-1. **A smart speaker** matching your household's phones.
-2. **Smart bulbs** in the room you use most — check the fitting type.
-3. **Two smart plugs** for whatever you keep forgetting to switch off.
-4. **A motion sensor** for a hallway or bathroom light automation.
+1. **One or two smart plugs**, on whatever you switch on and off most or keep forgetting.
+2. **Leak sensors**, under the sink and behind the washing machine (these need a compatible hub if they run on Zigbee or Thread).
+3. **Smart bulbs** in the room you use most. Check the fitting type first.
+4. **A door or motion sensor** for the entry or a hallway light automation.
+5. **A smart speaker or display** matching your household's phones, once you have enough devices for voice control to be worth it.
@@
-That is a capable setup, installs in an evening, and fits in a shoebox.
-
-Add a battery doorbell and a couple of contact sensors once you know how you use it, and you have most of what a homeowner gets — minus the switches, and minus the electrician's bill.
+That is a capable setup that installs in an evening and fits in a shoebox. Add a battery doorbell and a few contact sensors once you know how you use it (after checking the rules where you live), and you have most of what a homeowner gets, minus the switches and minus the electrician's bill.
@@
+
```

## Full merged body

There is a persistent assumption that smart homes are for homeowners. It is wrong. Most smart home functionality needs no wiring and no drilling, and it all comes with you when you move.

Here is what works in a rental, what needs a conversation first, and how to leave the place as you found it. Devices are grouped by how they attach, because that is the constraint that matters when the walls are not yours.

## The rule of thumb

If it **plugs in, screws into an existing fitting, sticks on or sits on a shelf**, it is usually low-risk in a rental.

If it involves **fixed wiring**, it needs the owner's permission and a licensed electrician. That is not a lease question, it is an electrical one: [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) warns that unqualified electrical work is illegal and that it "isn't a DIY job, even for small jobs such as changing power points or light switches", and the [NSW Government](https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/avoiding-electrical-accidents) says that by law electrical installation work must be done by a licensed electrician. Other states have their own regulator, so check yours, and see our guide to [what electrical work you can legally do yourself](/setup-guides/smart-home-electrical-work-australia-legal/).

Between those two ends sits everything that touches the property without touching the wiring: an adhesive strip, a screw into a door frame, a camera on the balcony. Here the rules depend on your state or territory, and they differ in the detail. Three examples:

- **Victoria.** [Consumer Affairs Victoria](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property) lists changes renters can make without consent, including LED light bulbs that don't need new light fittings, a wireless doorbell, and alarm systems or security cameras that are not hardwired, can easily be removed and do not impact the privacy of neighbours. Anything beyond that list needs written consent.
- **New South Wales.** The [NSW Government](https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property) lists minor changes a landlord cannot unreasonably refuse, including a wireless removable outdoor security camera and changes that do not penetrate or permanently modify a surface, fixture or the structure. You still need the lease to allow it or the landlord's written permission.
- **Western Australia.** [Consumer Protection WA](https://www.consumerprotection.wa.gov.au/making-changes-rental-home) says tenants ask first using a minor modification request form, the landlord has 14 days to respond, and at the end of the tenancy the tenant removes the modification and repairs any damage unless the landlord agrees to keep it.

In Queensland, the [RTA](https://www.rta.qld.gov.au/during-a-tenancy/living-in-the-property/fixtures-and-structural-changes) says tenants must ask permission to attach a fixture, and the owner or manager has 28 days to reply in writing. Elsewhere, check your own state or territory's tenancy authority. And whatever the law allows, read your lease: it is the document your final inspection will be measured against. Nothing on this page is legal advice.

## What usually needs no permission

### Plugs into a socket

**Smart plugs.** The single most useful device for a renter. A lamp, fan, heater, towel rail or phone charger becomes schedulable, and nothing is attached to the building at all. Australian smart plugs can be chunky, so check whether one will block the second socket on a double power point. Some are designed specifically to avoid that.

The TP-Link Tapo P100 is a good example of the renter-friendly kind. TP-Link Australia says it is ["built smaller to avoid blocking adjacent sockets"](https://www.tp-link.com/au/home-networking/smart-plug/tapo-p100/), needs no separate hub, and offers schedules plus an Away Mode that switches plugged-in devices on and off so the place looks occupied. It is 2.4 GHz Wi-Fi only, and it does not measure energy use.

::product:tp-link-tapo-p100-mini-smart-wi-fi-socket-plug::

**Smart speakers and displays.** They sit on a shelf and plug in. That is the whole installation.

**Hubs, bridges and border routers.** They sit beside the router. Wi-Fi devices connect straight to the router and need none of this; battery sensors on Zigbee or Thread usually do. Our [Zigbee, Z-Wave, Thread and Wi-Fi explainer](/hubs-and-platforms/zigbee-vs-zwave-vs-thread-vs-wifi/) covers the trade-off.

### Swaps into an existing fitting

**Smart bulbs.** Swap the globe, keep the original in a cupboard, swap it back when you leave. Consumer Affairs Victoria specifically lists LED bulbs that don't need new light fittings among the changes Victorian renters can make without consent. Check whether your fittings are B22 bayonet or E27 Edison screw before ordering; both are common in Australian homes, and not every smart bulb range is sold in both.

### Sticks on with adhesive

This is where most of the no-drilling range lives, and where a little care pays off at the end of the lease.

**Door and window sensors.** Two small blocks, one on the frame and one on the door, held on with adhesive strips. Battery-powered and easy to overlook.

**Motion sensors.** Corner-mounted or shelf-standing. The mount matters less than the aim: a sensor on a bookshelf pointed down a hallway can do the same job as one screwed into a cornice.

**Leak sensors.** Under the sink, behind the washing machine, next to the hot water unit. These do not mount at all; they sit on the floor. For a renter they are arguably the most valuable sensor here, because a leak caught early is less likely to turn into water damage and a dispute about who pays for it.

**Temperature and humidity sensors.** Useful for mould-prone bathrooms and hot bedrooms. The Tapo T315 is one example that suits a rental: TP-Link Australia says it [sits on a desk or mounts with the included 3M adhesive](https://www.tp-link.com/au/smart-home/smart-sensor/tapo-t315/), runs on two AAA batteries, and shows readings on an e-ink screen. The catch is that TP-Link says a Tapo hub is required for remote monitoring, automations and data export, so without one it is essentially a desk display.

::product:tp-link-tapo-smart-temperature-humidity-monitor::

**Smart buttons and scene controllers.** A wireless button stuck beside a doorway does what a wall switch does, without touching the wall switch. If you already use Philips Hue bulbs, the Hue Dimmer Switch is built for exactly this: Philips Hue describes it as ["battery powered and wireless, so you won't have to do any rewiring"](https://www.philips-hue.com/en-au/p/hue-dimmer-switch-latest-model/8719514274631), and the wall plate attaches with included adhesive or screws. It can pair with up to 10 Hue lights without a Bridge, but Philips Hue says a Bridge is needed to customise what the buttons do. It is built for Hue lights, so it is not the answer if your bulbs are another brand.

::product:philips-hue-smart-dimmer-switch-v2::

**On adhesive.** Where a device is light enough, use removable stretch-release strips rather than permanent foam tape. They cost a little more and are designed to come off cleanly, though older or poorly prepared paint can still lift. Test on an inconspicuous spot first, warm the adhesive gently before removal, and do not leave a device up for years before finding out. Permanent tape on a rental wall is how a small sensor turns into a paint repair.

### Sits on a surface

**Indoor cameras.** Free-standing models with a weighted base need no mounting. Cameras carry privacy obligations that go beyond your lease, so read [what Australian privacy law says about home cameras](/security-and-cameras/smart-home-privacy-cameras-australia-law/) before pointing one anywhere shared.

That is most of a smart home.

## What needs a conversation

**Smart switches.** These replace the wall switch, which means fixed wiring: owner permission and a licensed electrician. In most rentals it is not worth pursuing when smart bulbs and a wireless button achieve most of the same result.

**Video doorbells.** A wired doorbell is usually drilling plus wiring, and anything involving a mains-powered transformer is a job for an electrician. Battery doorbells sidestep the wiring, and Consumer Affairs Victoria lists a wireless doorbell among the changes Victorian renters can make without consent. Mounting one can still mean screws into brick or render, so check your lease and your state's rules before you drill.

**Outdoor cameras.** Almost always a bracket screwed into brick or render. In NSW a wireless removable outdoor security camera is on the list of minor changes a landlord cannot unreasonably refuse, but you still need permission, and surveillance law applies regardless of what your lease says.

**Smart locks.** Replacing a lock changes the door hardware and the keying, and affects the owner's and agent's key access. Some retrofit models fit over the inside of an existing deadbolt or deadlatch, reusing the original screw holes and leaving the exterior hardware and the key untouched. That is a much easier proposal and far more reversible, but most leases still treat it as an alteration. Ask first and get the answer in writing.

**Smart blind retrofits.** Motors that clip onto an existing roller mechanism reuse the hardware already there, but like retrofit locks they are still an alteration under most leases. Get permission in writing.

**Anything requiring drilling.** Wall-mounted panels, permanent mounts, new fixing points. Depending on your state and your lease, some minor fixings may be allowed or may be hard for a landlord to refuse, but get it in writing.

**Hardwired smoke alarms.** Not yours to touch. In NSW, for example, the [NSW Government](https://www.nsw.gov.au/housing-and-construction/rules/smoke-alarms-a-rental-property) says landlords must ensure smoke alarms are working and cannot hand that responsibility to tenants, and hardwired alarms must be repaired or replaced by a licensed electrician. Requirements vary between states and territories.

## Apartments and strata

If you rent in an apartment or townhouse, there is a second layer beyond your lease: the owners corporation and its by-laws. The [NSW Government's guide to renting in strata](https://www.nsw.gov.au/housing-and-construction/renting-a-place-to-live/renting-strata) says tenants need to follow the by-laws that apply to all residents, and that tenants cannot make modifications to common property. In WA, [Consumer Protection](https://www.consumerprotection.wa.gov.au/making-changes-rental-home) lists a strata rule that prevents a change as one of the grounds a landlord can rely on to refuse it.

Anything attached to common property, such as external walls, corridors and entry doors, is usually governed by the by-laws, and a camera covering common areas often needs approval even if your landlord is happy with it.

Practically, keep cameras inside your own space, pointed at your own space. A camera in a window looking at your own balcony is a very different proposition from one mounted in a shared corridor.

## Wi-Fi: the upgrade renters most often need

If the internet account is in your name, the router usually is too, and replacing it is often the single highest-impact change you can make.

Rentals are hard on Wi-Fi. The modem sits wherever the wall socket is, older double brick or rendered walls weaken the signal, and apartment buildings are crowded with overlapping networks.

Three things that help without any modification:

1. **A mesh system.** Extra nodes plug into power points, with no cabling required.
2. **A dedicated 2.4 GHz network for smart devices.** Many smart plugs and sensors, including the Tapo P100, only work on 2.4 GHz, and a separate network can make setup and troubleshooting easier.
3. **Manual channel selection.** In a crowded building, choosing the quietest of channels 1, 6 and 11, which [TP-Link explains](https://www.tp-link.com/us/support/faq/4309/) do not interfere with each other at 20 MHz width, can beat leaving it on auto.

If a router came with the property, keep it in a cupboard and reinstate it when you leave.

## Designing for the move

A renter's smart home has to be portable. A few habits make moving painless.

**Keep the boxes and the originals.** Original globes, the supplied router, any hardware you swapped. One box in the top of a wardrobe.

**Prefer adhesive and free-standing over anything permanent.** In WA, for example, tenants are expected to remove modifications and repair any damage at the end of the tenancy unless the landlord agrees to keep them, and Consumer Affairs Victoria says renters must typically restore the property to its previous condition unless the rental provider agrees otherwise. The less you fix to the walls, the less there is to undo.

**Photograph the fittings before you change anything.** Cheap insurance for the final inspection, alongside your entry condition report.

**Avoid location-specific automations.** Naming a device "Hallway Motion" is fine; building automations that hard-code the layout of this particular flat is not. Keep them simple enough to rebuild in an afternoon.

## What to buy first as a renter

If you are starting from nothing, this order gets you a useful smart home for the least commitment:

1. **One or two smart plugs**, on whatever you switch on and off most or keep forgetting.
2. **Leak sensors**, under the sink and behind the washing machine (these need a compatible hub if they run on Zigbee or Thread).
3. **Smart bulbs** in the room you use most. Check the fitting type first.
4. **A door or motion sensor** for the entry or a hallway light automation.
5. **A smart speaker or display** matching your household's phones, once you have enough devices for voice control to be worth it.

That is a capable setup that installs in an evening and fits in a shoebox. Add a battery doorbell and a few contact sensors once you know how you use it (after checking the rules where you live), and you have most of what a homeowner gets, minus the switches and minus the electrician's bill.

If you are new to all of this, our [beginner's guide](/buying-guides/smart-home-starter-guide-beginners-australia/) covers how to sequence purchases so you do not overbuy.
