# Task 6 review: batch 3 (4 articles)

Proposed fixes for every `[VERIFY]` tag in these four published articles. **Nothing has been written to Strapi.** Reply **approve** to publish all four, or name the articles or rows to change.

Decisions: **a** = verified, rewritten with the fact and an inline source link; **b** = varies, rewritten as a range or as guidance; **c** = unverifiable or legal, the claim removed and readers pointed to the authority.

Backups of each full Strapi record (draft and published) are in `exports/strapi-backup/<slug>-2026-09-24T07-31-02-572Z.json`.

## Reviewer edits beyond the tags (approve or drop them separately)

1. **Smart downlights, insulation classifications (body list, key takeaways, excerpt, FAQ 1).** Checked against Table ZD1 of AS/NZS 60598.2.2:2016 ([Standards Australia statement and Appendix ZD](https://www.redilight.com.au/wp-content/uploads/2019/03/IC-4-Publication-of-AS-NZS-60598-2-2.pdf)). **Non-IC** said "insulation must be kept clear… there is a required separation distance". The standard says Non-IC is for commercial and industrial use only, not for homes, so the bullet now says that. A new **Do-Not-Cover** bullet carries the manufacturer-clearance rule. **IC** now says it may be abutted as well as covered. **IC-4** now says it may be abutted and covered, and is also sealed against air transfer. The unlisted "CA80" is removed; the list now names CA90 and CA135 (CA135 is New Zealand only). The key takeaways, excerpt and FAQ 1 repeated the old errors and now match the body.
2. **Smart downlights, excerpt.** "where a licensed electrician is legally required" now reads "where you need a licensed electrician", so it does not state the law as settled.
3. **Video doorbell, key takeaways.** "Plug-in transformers are DIY-friendly; anything hard-wired to 240V is licensed electrical work in every Australian state" contradicted the corrected body, where Ring AU says a licensed electrician must install its doorbells. It now says mains work is a job for a licensed electrician and that low-voltage rules differ by state, and points readers to their state's electrical safety regulator.
4. **Video doorbell, key takeaways and excerpt.** "expect North American 16-24V AC" was wrong for Ring's Video Doorbell Wired, which takes 8-24V AC. Both now say many doorbells need more voltage and VA than an old bell circuit supplies, and tell readers to check their model's figures on the maker's support page.

## Worth knowing

- **Prices with a date.** The security camera article now quotes Arlo's Australian plan prices ($7.99 a month for one camera; $12.99-$17.99 for unlimited cameras) and Officeworks' price for SanDisk's 128GB High Endurance microSD card ($98), each "at the time of writing" with a link. The old $25-$40 card price was wrong. The downlights article corrects the Hue price to $59.95 and $104.95 each. Say if you'd rather have no prices in articles at all.
- **Home Assistant energy dashboard.** The YAML example still uses a 2pm-8pm peak, while the text now cites Ausgrid's 3pm-9pm. The code is labelled as illustrative and tells readers to use their own bill. "Those figures are placeholders" (template-like text) was rewritten. The IAMMETER WEM3050T is now correctly described as a three-phase meter.

## Flagged by the researchers but NOT changed (your call)

- **Smart downlights:** "roof space can exceed 50°C in a Perth or Brisbane summer" (body and FAQ); "electrolytic capacitors are the usual failure point"; "often Ta 40°C or Ta 45°C"; "most modules need a neutral, which older homes frequently lack"; the halogen clearance history; and the GU10 brand list. None of these has a source.
- **Security cameras:** "2-4Mbps per camera" and "features locked behind subscriptions" have no source. The "32GB-256GB" card range is dated. PoE cabling advice doesn't mention that fixed data cabling usually needs a registered cabler (ACMA).
- **Home Assistant energy:** "highest rooftop solar uptake in the world" has no source. The "trapezoidal" advice conflicts with the Home Assistant docs, which recommend the left method for loads that step. "percent or two", "few percent" and "twenty percent" look invented. The `total_increasing`-only claim and "supply charge sits outside" are unconfirmed.
- **Video doorbell:** "plenty of local plug packs are DC", the electronic chime/diode generalisation, "15 metres or more" and "battery chimes common in the last 20 years" have no source. "240V" is used throughout; the nominal supply is 230V.

On publish, `dateModified` is set to 24 Sep 2026 and `publishDate` to each post's original `publishedAt` (a REST update resets `publishedAt`).

---

## smart-downlights-australian-ceilings-insulation-clearance-rules

[VERIFY] tags: 12 → 0. Words: 1190 → 1466.

### Decisions and sources

Checked 24 Sep 2026. Nothing was written to Strapi or the site. Placeholders (TODO/TBD/lorem/template text): none found.

Standards Australia source note: the 29 Feb 2016 Standards Australia media statement, with AS/NZS 60598.2.2:2016 Appendix ZD (Table ZD1) attached, is hosted as a PDF on a manufacturer's site (redilight.com.au). The text was extracted and read. The URL is abbreviated below as STD = https://www.redilight.com.au/wp-content/uploads/2019/03/IC-4-Publication-of-AS-NZS-60598-2-2.pdf

| # | Original text (with tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "roughly $15–$25 for budget Wi-Fi and $50–$70 each for Hue [VERIFY]" | a (dated prices) | Prices when checked in Sep 2026: Arlec Grid Connect GU10 $18.55 (Bunnings); Hue White Ambiance GU10 $59.95, White and Colour Ambiance GU10 $104.95 (Hue AU). "Prices move often." The original Hue range of $50–$70 was wrong for colour GU10s. | https://www.bunnings.com.au/arlec-grid-connect-smart-gu10-led-420lm-rgb-cct-colour-mode-5-5w-globe_p0329569 ; https://www.philips-hue.com/en-au/p/hue-white-ambiance-gu10-smart-spotlight/8720169247109 ; https://www.philips-hue.com/en-au/p/hue-white-and-color-ambiance-gu10-smart-spotlight/8720169247086 |
| 2 | Body: "This is hardwired work — a licensed electrician is required [VERIFY]." | a | ESV: even changing light switches is not a DIY job. NSW: do not install or replace lights and switches unless licensed. Check your state regulator. | https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself ; https://www.nsw.gov.au/housing-and-construction/safety-home/electrical-safety/electrical-safety-home |
| 3 | Body: "Since AS/NZS 60598.2.2:2016, recessed luminaires sold here carry a classification marking … [VERIFY]" | a | Standard published Feb 2016. Luminaires are classified and labelled for insulation. Unmarked fittings are not verified as compliant. | STD |
| 4 | Body: "CA80 / CA135 … The number relates to a temperature rating in degrees Celsius [VERIFY]." | a (corrected) | Label changed to "CA90 / CA135 (older CA80 marking)". The number is the luminaire's surface temperature limit in °C. CA135 is listed as NZ-only and not permitted in Australia. | STD ; https://thelightingcentre.co.nz/downlightstandard/ (shows the CA80 label is still in use) |
| 5 | Body: "covered by AS/NZS 3000 and related standards, and compliance is the installing electrician's call, not a retailer's [VERIFY]." | a | Installation is governed by AS/NZS 3000, the luminaire standard and the fitting's instructions, which set the clearances. Installation work and certifying compliance are the licensed electrician's job. | STD (Table ZD1 cites AS/NZS 3000 and the manufacturer's clearance instructions) ; https://www.nsw.gov.au/housing-and-construction/safety-home/electrical-safety/electrical-safety-home (licensed electrician and CCEW) |
| 6 | Body: "their life roughly halves for every 10°C rise [VERIFY — general electronics rule of thumb…]" | a | Nippon Chemi-Con gives this as a rule of thumb. Framed as an approximation for the component, not for any particular downlight. | https://www.chemi-con.co.jp/en/faq/detail.php?id=alLifetime |
| 7 | Body: "you would generally need written landlord consent even for reversible work [VERIFY — check your state's residential tenancies authority]" | c | Claim about written consent removed. Rules differ by state and territory: check your residential tenancies authority, talk to your landlord, and hardwired work needs a licensed electrician anyway. | — (points to state authority) |
| 8 | Body: "cut-outs are commonly 90mm, but 70mm, 100mm and 120mm all exist [VERIFY]" | b | Cut-outs vary by product. One AU retailer guide lists 70/75/90mm as common. Compare the new fitting's specified cut-out with your existing holes. The 100mm and 120mm figures were dropped. | https://www.sparkydirect.com.au/lighting/downlights/ |
| 9 | FAQ 1597: "get an electrician to look at the clearances [VERIFY]." | a | Get a licensed electrician to check the markings and clearances. Your Home says old halogen and incandescent downlights cannot be covered with insulation and recommends replacing them with IC-4 LEDs. | https://www.yourhome.gov.au/passive-design/insulation |
| 10 | FAQ 1598: "Both are hardwired work, so a licensed electrician is required [VERIFY]." | a | ESV and NSW Government guidance: light switch work is not DIY and must be done by a licensed electrician. Check your state's rules. | same as #2 |
| 11 | FAQ 1599: "electrolytic capacitors in the driver are the usual failure point [VERIFY — general electronics rule of thumb]." | a | Added the capacitor makers' rule of thumb that life roughly halves per 10°C rise, framed as an approximation. | same as #6 |
| 12 | FAQ 1600: "written landlord consent is generally needed even for reversible work [VERIFY — …]" | c | Rules differ by state and territory. Check your tenancies authority and talk to your landlord. | — |

The excerpt and keyTakeaways had no tags and are copied unchanged (see the flags below).

#### Needs human legal review

- Body, option 2: licensed electrician required for dimmer modules (rewritten with ESV and NSW sources). Only VIC and NSW were checked, not every state.
- Body, option 3: "Again, licensed electrician" for smart wall switches (untagged).
- Body, markings section: the rewritten CA90/CA135 bullet, including "CA135 not permitted for use in Australia" (based on the 2016 text; Amendments 1 (2017) and 2 (2021) were not checked).
- Body: the rewritten AS/NZS 3000 / electrician-certifies-compliance sentence.
- Body: the "Renting? Do not touch the ceiling" section (tenancy) and FAQ 1600.
- Body, closing line: "All hardwired lighting work in Australia must be carried out by a licensed electrician. Changing a globe is DIY; anything upstream of the lampholder is not." (untagged legal statement; consistent with ESV and NSW but stated nationally).
- Body, question 5: "Certificate of Electrical Safety or the equivalent" (the name and requirement vary by state; NSW uses a CCEW).
- Intro: "void the fitting's warranty … genuine fire risk" (fire safety / warranty claim).
- keyTakeaways and excerpt: "where a licensed electrician is legally required", "must be done by a licensed electrician".
- FAQ 1597 and 1598 (electrical work / fire safety).

#### Flagged untagged sentences (not changed)

- **Non-IC bullet** (body): "insulation must be kept clear of the fitting. There is a required separation distance…". Per Table ZD1 of the 2016 standard, Non-IC is "Not for residential use" (commercial/industrial only). Manufacturer clearance distances apply to the separate "Do-Not-Cover" class, which the article omits. This is a safety inaccuracy and should be corrected.
- **IC bullet** (body): "IC — insulation may be *covered*". Per Table ZD1, IC may be both abutted and covered. IC-4 differs mainly in being sealed against air transfer and having restricted access to hot parts. The IC-4 line "may be both covered and abutted" implies IC cannot be abutted.
- **keyTakeaways**: "non-IC must be kept clear of insulation, CA80/CA135 may be abutted but not covered". This repeats the Non-IC error and names CA80/CA135 (the 2016 classes are CA90/CA135, and CA135 is NZ-only). It should be updated to match the body.
- **Excerpt**: lists "(IC, IC-4, CA135, non-IC)". CA135 is not permitted in Australia per the 2016 standard, so consider "CA90".
- **Heat section**: "roof space that can exceed 50°C in a Perth or Brisbane summer" (also in FAQ 1599). No source was checked. It is plausible but unsourced.
- **Heat section**: "Electrolytic capacitors in the driver are the usual failure point" (body and FAQ) is unsourced.
- **Heat section**: "often Ta 40°C or Ta 45°C" is unsourced.
- **Option 2**: "Most modules need a neutral at the switch, which older Australian homes frequently do not have" is unsourced.
- **Halogen paragraph**: "Older halogen installations were typically installed with generous clearances and sometimes physical barriers or covers" is unsourced. Your Home says halogen downlights cannot be covered and should be replaced with IC-4 LEDs, which supports the "professional look" advice.
- **Option 1**: the GU10 brand list (Nanoleaf, Mirabella Genio availability) was not checked.

### Body diff

```diff
--- before
+++ after
@@
-**1. Swap the globe.** Only works if your downlights take a replaceable lamp — usually a GU10 or MR16 fitting, or an E27 in a decorative recessed can. Smart GU10 globes from Philips Hue, Nanoleaf, Arlec Grid Connect and Mirabella Genio are all sold locally, roughly $15–$25 for budget Wi-Fi and $50–$70 each for Hue [VERIFY]. No electrician needed for the globe change itself, but note MR16 fittings run on 12V through a transformer and many smart lamps will not work with an old halogen transformer. Check compatibility before you buy six.
+**1. Swap the globe.** Only works if your downlights take a replaceable lamp — usually a GU10 or MR16 fitting, or an E27 in a decorative recessed can. Smart GU10 globes from Philips Hue, Nanoleaf, Arlec Grid Connect and Mirabella Genio are all sold locally. As a price guide when checked in September 2026, Bunnings listed an [Arlec Grid Connect smart GU10](https://www.bunnings.com.au/arlec-grid-connect-smart-gu10-led-420lm-rgb-cct-colour-mode-5-5w-globe_p0329569) at $18.55, while Philips Hue's AU store listed its [White Ambiance GU10](https://www.philips-hue.com/en-au/p/hue-white-ambiance-gu10-smart-spotlight/8720169247109) at $59.95 and its [White and Colour Ambiance GU10](https://www.philips-hue.com/en-au/p/hue-white-and-color-ambiance-gu10-smart-spotlight/8720169247086) at $104.95 each. Prices move often, so check before you buy. No electrician needed for the globe change itself, but note MR16 fittings run on 12V through a transformer and many smart lamps will not work with an old halogen transformer. Check compatibility before you buy six.
@@
-**2. Smart dimmer module behind the wall switch.** A Zigbee or Wi-Fi dimmer module (Shelly, Aqara, Zemismart, Sonoff) fits into the switch mechanism or the ceiling rose and dims the whole circuit. This keeps your existing downlights and gives you one point of control per circuit rather than per light. Most modules need a neutral at the switch, which older Australian homes frequently do not have. This is hardwired work — a licensed electrician is required [VERIFY].
+**2. Smart dimmer module behind the wall switch.** A Zigbee or Wi-Fi dimmer module (Shelly, Aqara, Zemismart, Sonoff) fits into the switch mechanism or the ceiling rose and dims the whole circuit. This keeps your existing downlights and gives you one point of control per circuit rather than per light. Most modules need a neutral at the switch, which older Australian homes frequently do not have. This is hardwired work, and state regulators say it is a job for a licensed electrician: [Energy Safe Victoria](https://www.energysafe.vic.gov.au/electrical-ddiy-dont-do-it-yourself) says even changing light switches is not a DIY job, and [NSW Government guidance](https://www.nsw.gov.au/housing-and-construction/safety-home/electrical-safety/electrical-safety-home) says not to install or replace lights and switches unless you are a licensed electrician. Check your own state's electrical safety regulator.
@@
-Since AS/NZS 60598.2.2:2016, recessed luminaires sold here carry a classification marking that tells you how insulation may sit around them [VERIFY]. In plain terms:
+Since AS/NZS 60598.2.2:2016 (published by Standards Australia in February 2016), recessed luminaires are classified and labelled to show how building insulation may sit around them — the standard's guidance table notes that a fitting with no marking is not verified as compliant ([Standards Australia statement and Appendix ZD](https://www.redilight.com.au/wp-content/uploads/2019/03/IC-4-Publication-of-AS-NZS-60598-2-2.pdf)). In plain terms:
@@
-- **Non-IC** — insulation must be kept clear of the fitting. There is a required separation distance, and the fitting cannot be covered or abutted.
-- **CA80 / CA135** — insulation may be *abutted* (butted up against the side) but not laid over the top. The number relates to a temperature rating in degrees Celsius [VERIFY].
-- **IC** — insulation may be *covered* over the fitting.
-- **IC-4** — may be both covered and abutted, and is generally the marking you want if your roof space is fully batted.
+- **Non-IC** — not tested for use with building insulation, and intended for commercial and industrial use only. The standard's guidance says these are not for homes or anywhere insulation may be installed, now or in the future ([Standards Australia, Appendix ZD](https://www.redilight.com.au/wp-content/uploads/2019/03/IC-4-Publication-of-AS-NZS-60598-2-2.pdf)).
+- **Do-Not-Cover** — may be used where insulation is present, but must not be covered or abutted: the manufacturer's installation instructions give the clearances to keep, to the sides and above the fitting.
+- **CA90 / CA135** — insulation may be *abutted* (butted up against the side) but not laid over the top. In the 2016 standard the number is the luminaire's surface temperature limit in degrees Celsius, and CA135 fittings are listed as New Zealand only, not permitted for use in Australia ([Standards Australia, Appendix ZD](https://www.redilight.com.au/wp-content/uploads/2019/03/IC-4-Publication-of-AS-NZS-60598-2-2.pdf)).
+- **IC** — insulation may be abutted and *covered* over the fitting.
+- **IC-4** — may also be abutted and covered, and is additionally sealed so no air passes between the room and the roof space. It is generally the marking you want if your roof space is fully batted.
@@
-Older halogen installations were typically installed with generous clearances and sometimes physical barriers or covers. If your home still has halogens and the insulation has since been topped up, that is worth a professional look regardless of whether you go smart. Installation requirements for recessed luminaires are covered by AS/NZS 3000 and related standards, and compliance is the installing electrician's call, not a retailer's [VERIFY].
+Older halogen installations were typically installed with generous clearances and sometimes physical barriers or covers. If your home still has halogens and the insulation has since been topped up, that is worth a professional look regardless of whether you go smart. How recessed luminaires are installed is governed by the Wiring Rules (AS/NZS 3000) together with the luminaire standard and the fitting's own instructions, which set any clearances ([Standards Australia, Appendix ZD](https://www.redilight.com.au/wp-content/uploads/2019/03/IC-4-Publication-of-AS-NZS-60598-2-2.pdf)). Electrical installation work, and certifying that it complies, is the licensed electrician's job, not a retailer's ([NSW Government](https://www.nsw.gov.au/housing-and-construction/safety-home/electrical-safety/electrical-safety-home)).
@@
-A smart downlight contains a radio, a microcontroller and a driver, all sitting in a plasterboard hole in an Australian roof space that can exceed 50°C in a Perth or Brisbane summer. Electrolytic capacitors in the driver are the usual failure point, and their life roughly halves for every 10°C rise [VERIFY — general electronics rule of thumb, not a manufacturer figure].
+A smart downlight contains a radio, a microcontroller and a driver, all sitting in a plasterboard hole in an Australian roof space that can exceed 50°C in a Perth or Brisbane summer. Electrolytic capacitors in the driver are the usual failure point, and capacitor maker [Nippon Chemi-Con](https://www.chemi-con.co.jp/en/faq/detail.php?id=alLifetime) gives the rule of thumb that their expected life roughly halves for every 10°C rise in ambient temperature. That is a general approximation for the component, not a figure for any particular downlight.
@@
-If you rent, hardwired changes are out — that includes dimmer modules and switch replacements. Tenancy rules on fixtures vary by state and you would generally need written landlord consent even for reversible work [VERIFY — check your state's residential tenancies authority].
+If you rent, hardwired changes are out — that includes dimmer modules and switch replacements. Rules on alterations to fixtures differ between states and territories, so check with your state's residential tenancies authority and talk to your landlord before changing anything — and any hardwired change is electrical work for a licensed electrician in any case.
@@
-Question 4 catches people out constantly. Australian downlight cut-outs are commonly 90mm, but 70mm, 100mm and 120mm all exist [VERIFY]. A 10mm mismatch means patching plasterboard across every room.
+Question 4 catches people out constantly. Cut-out sizes vary by product — one Australian electrical retailer's guide lists [70mm, 75mm and 90mm as common sizes](https://www.sparkydirect.com.au/lighting/downlights/) — so compare the new fitting's specified cut-out with your existing holes before you buy. A 10mm mismatch means patching plasterboard across every room.
```

### Excerpt / key takeaways / FAQ changes

- excerpt
  - before: Retrofit globe, smart dimmer module, smart switch or full replacement downlight? Here is how each option works in a typical Australian ceiling, what the AS/NZS abutment and coverage markings (IC, IC-4, CA135, non-IC) actually mean, and where a licensed electrician is legally required.
  - after: Retrofit globe, smart dimmer module, smart switch or full replacement downlight? Here is how each option works in a typical Australian ceiling, what the AS/NZS abutment and coverage markings (IC, IC-4, CA90, Do-Not-Cover, non-IC) actually mean, and where you need a licensed electrician.
- keyTakeaways
  - before: Before buying smart downlights, check the classification marking on the fitting: non-IC must be kept clear of insulation, CA80/CA135 may be abutted but not covered, and IC-4 may be both covered and abutted. Globe swaps are DIY, but any hardwired dimmer module, smart switch or full downlight replacement must be done by a licensed electrician.
  - after: Before buying smart downlights, check the classification marking on the fitting: non-IC fittings are not for homes, Do-Not-Cover fittings need the clearances in their instructions, CA90 may be abutted but not covered, and IC and IC-4 may be both abutted and covered. Globe swaps are DIY, but any hardwired dimmer module, smart switch or full downlight replacement must be done by a licensed electrician.
- FAQ 1 answer
  - before: Only if the housing itself is rated for that insulation arrangement — the classification marking (non-IC, CA80/CA135, IC or IC-4) belongs to the luminaire, not the lamp inside it. Swapping in a smart globe does not change what the fitting is rated for. If insulation has been topped up since the fittings went in, get an electrician to look at the clearances [VERIFY].
  - after: Only if the housing itself is rated for that insulation arrangement — the classification marking (for example non-IC, Do-Not-Cover, CA90, IC or IC-4) belongs to the luminaire, not the lamp inside it. Swapping in a smart globe does not change what the fitting is rated for. If insulation has been topped up since the fittings went in, get a licensed electrician to check the fittings' markings and clearances. The federal Your Home guide says older halogen and incandescent downlights cannot be covered with insulation and recommends replacing them with IC-4 rated LEDs.
- FAQ 2 answer
  - before: If the downlights can't take a replaceable globe, a smart dimmer module behind the switch or a smart wall switch is usually far cheaper than replacing every fitting. Both give you one control point per circuit rather than per light. Both are hardwired work, so a licensed electrician is required [VERIFY].
  - after: If the downlights can't take a replaceable globe, a smart dimmer module behind the switch or a smart wall switch is usually far cheaper than replacing every fitting. Both give you one control point per circuit rather than per light. Both are hardwired work: official guidance from Energy Safe Victoria and the NSW Government says light switch work is not DIY and must be done by a licensed electrician, so check your own state's rules.
- FAQ 3 answer
  - before: The driver, radio and microcontroller all sit in a plasterboard hole in a roof space that can exceed 50°C in a Perth or Brisbane summer, and electrolytic capacitors in the driver are the usual failure point [VERIFY — general electronics rule of thumb]. Brands that publish an L70 figure and an ambient rating such as Ta 40°C or Ta 45°C at least tell you what the fitting is specified for. Keeping the smarts in a wall cavity instead of the ceiling avoids the problem entirely.
  - after: The driver, radio and microcontroller all sit in a plasterboard hole in a roof space that can exceed 50°C in a Perth or Brisbane summer, and electrolytic capacitors in the driver are the usual failure point. Capacitor makers' rule of thumb is that their expected life roughly halves for every 10°C rise in ambient temperature — a general approximation, not a figure for any particular downlight. Brands that publish an L70 figure and an ambient rating such as Ta 40°C or Ta 45°C at least tell you what the fitting is specified for. Keeping the smarts in a wall cavity instead of the ceiling avoids the problem entirely.
- FAQ 4 answer
  - before: Stick to replaceable smart globes if your downlights take them, plus floor and table lamps on smart plugs. Hardwired changes, including dimmer modules and switch replacements, are out. Tenancy rules on fixtures vary by state and written landlord consent is generally needed even for reversible work [VERIFY — check your state's residential tenancies authority].
  - after: Stick to replaceable smart globes if your downlights take them, plus floor and table lamps on smart plugs. Hardwired changes, including dimmer modules and switch replacements, are out. Rules on alterations to fixtures differ between states and territories, so check with your state's residential tenancies authority and talk to your landlord before changing anything.

---

## local-recording-vs-cloud-subscriptions-security-cameras-australia

[VERIFY] tags: 12 → 0. Words: 1258 → 1405.

### Decisions and sources

12 [VERIFY] tags (7 body, 0 excerpt, 0 keyTakeaways, 5 FAQ). Placeholders (TODO/TBD/lorem/template text): none found.

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | "single-camera cloud plan ... around $5–$15 per month ... $15–$30 range [VERIFY — check current AUD pricing ...]" | b | Pricing varies and changes; at time of writing Arlo AU lists $7.99/mo single-camera, $12.99–$17.99/mo unlimited (billed monthly); check each brand's current plan page | https://au.arlo.com/pages/arlo-secure |
| 2 | "128GB microSD card ... roughly $25–$40 [VERIFY]" | a | At time of writing Officeworks lists SanDisk 128GB High Endurance at $98; prices vary (original range not supported by the retailer page opened) | https://www.officeworks.com.au/shop/officeworks/p/sandisk-128gb-high-endurance-microsdxc-memory-card-sdsqqnr128 |
| 3 | "Extended warranty or theft replacement on some plans [VERIFY per brand]" | a | "Extra support perks on some plans, such as the Priority Care & Support included with Arlo Secure Plus — check each plan's terms". Extended-warranty claim dropped: Arlo's Secure Plus extended warranty appears Europe-only; Ring AU's current plan pages (Solo/Multi/Pro) don't mention warranty | https://au.arlo.com/products/asc119912-200aul ; checked https://ring.com/au/en/support/articles/v5hc7/introducing-ring-plans |
| 4 | "common 50/20 plan ... entry-level 25/5 or 12/1 ... [VERIFY current plan tiers with your RSP]" | a | Per nbn wholesale tiers: 50Mbps gives up to 20Mbps up (5Mbps on FTTN/B); 25Mbps and 12Mbps tiers top out at 10 and 1Mbps up; check your plan with your provider | https://www.nbnco.com.au/residential/speed-plans |
| 5 | "Some brands store Australian customer data offshore [VERIFY per vendor]" | a | eufy's AU privacy policy says personal data may be transferred to countries including China, the EEA, UK and US | https://www.eufy.com/au/policies/privacy-policy |
| 6 | "Privacy Act's household exemption, state ... Surveillance Devices ... [VERIFY — laws differ by state ...]" | c | OAIC: Privacy Act doesn't cover cameras operated by individuals in a private capacity; state/territory laws, body corporate and council rules may apply; check state legislation or legal aid; seek advice | https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras |
| 7 | "audio recording (it is treated more strictly than video in several jurisdictions [VERIFY])" | c | "more strictly" claim removed (SA treats listening and optical devices in parallel); now: listening devices covered by state/territory laws that differ; SA example linked | https://www.lawhandbook.sa.gov.au/ch34s01s04.php |
| 8 | FAQ 1: "128GB high-endurance card is a one-off $25–$40 [VERIFY]" | a | "one-off purchase (around $100 at full retail at the time of writing, and prices vary by retailer)" | Officeworks URL as #2 |
| 9 | FAQ 2: "[VERIFY your plan tier with your RSP]" | b | "Check your plan's upload speed with your internet provider." | https://www.nbnco.com.au/residential/speed-plans |
| 10 | FAQ 4: "written landlord permission before drilling [VERIFY — tenancy rules differ by state]" | c | Check state tenancy rules; Victoria example: removable non-hard-wired cameras need no permission, hard-wired system needs rental provider consent; other states differ (also applied to the matching untagged body sentence) | https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property |
| 11 | FAQ 5: "Privacy Act's household exemption ... [VERIFY; seek legal advice ...]" | c | OAIC position + state laws/council/body corporate may apply; check state legislation or legal aid; seek advice | OAIC URL as #6 |
| 12 | FAQ 5: "Audio is treated more strictly than video in several jurisdictions [VERIFY]" | c | "Audio recording falls under listening-device rules that differ between states" | Law Handbook SA URL as #7 |

Totals: a = 5 (#2, 3, 4, 5, 8), b = 2 (#1, 9), c = 5 (#6, 7, 10, 11, 12). Sources opened: 8 (+1 Ring AU page checked, not cited).

#### Needs human legal review

- Body, Privacy section: OAIC / Privacy Act does not cover individuals' cameras; state/territory laws, council and body corporate rules may apply (privacy/surveillance law).
- Body: "be careful with audio recording (listening devices are covered by state and territory surveillance laws ...)" (surveillance law).
- Body: "point cameras at your own property, avoid capturing a neighbour's windows or a shared internal corridor ... talk to neighbours" (privacy guidance).
- Body + FAQ 4: renters / Victoria consent rules for removable vs hard-wired cameras (tenancy law).
- Body + FAQ 4: "any camera requiring hard-wiring to 240V mains must be installed by a licensed electrician under AS/NZS wiring rules — a plug-in Type I unit is fine to install yourself" (electrical work).
- Body: eufy AU privacy policy cross-border transfer statement (privacy).
- FAQ 5: Privacy Act / state laws / audio answer (privacy/surveillance law).

#### Flagged untagged sentences (not changed)

- "A single 2K camera streaming events may use 2–4Mbps while uploading" (body and FAQ 2) — unsourced bitrate figure; bitrates vary by model/settings.
- Electrician sentence (above) omits that PoE/data cabling run through walls generally needs an ACMA-registered cabler, while the article recommends PoE NVRs — consider adding or softening; not verified here.
- "Several brands gate person detection, vehicle detection, package alerts, activity zones and even rich notifications behind a paid plan" — plausible but unsourced.
- "Typically 32GB to 256GB depending on what the camera supports" — some current cameras support 512GB cards; unsourced.
- "usually 30 days on consumer plans" — consistent with Arlo AU (30-day history) but other tiers differ (e.g. longer history on premium plans); left as is.
- "A $12/month plan ... over $700 across five years" — arithmetic OK but $12 is an illustrative figure, not a quoted plan price.
- Excerpt promises "subscription costs in AUD"; body now gives only Arlo's AUD prices plus guidance to check plan pages.

### Body diff

```diff
--- before
+++ after
@@
-A single-camera cloud plan in Australia generally sits somewhere around $5–$15 per month, with multi-camera household plans in the $15–$30 range [VERIFY — check current AUD pricing directly with Arlo, Ring, Google and Eufy, as these change regularly].
+Cloud plan pricing in Australia varies by brand and changes regularly. At the time of writing, [Arlo's Australian plan page](https://au.arlo.com/pages/arlo-secure) lists a single-camera plan at $7.99 a month and unlimited-camera plans at $12.99–$17.99 a month when billed monthly. Check each brand's current plan page — Ring, Google, eufy and others — before you buy.
@@
-Run that out. A $12/month plan is roughly $144 a year, or over $700 across five years — frequently more than the cameras themselves cost. A 128GB microSD card from Officeworks or Amazon AU is a one-off spend of roughly $25–$40 [VERIFY].
+Run that out. A $12/month plan is roughly $144 a year, or over $700 across five years — frequently more than the cameras themselves cost. A 128GB high-endurance microSD card is a one-off spend — at the time of writing Officeworks lists [SanDisk's 128GB High Endurance card at $98](https://www.officeworks.com.au/shop/officeworks/p/sandisk-128gb-high-endurance-microsdxc-memory-card-sdsqqnr128), and prices vary by retailer and brand.
@@
-- Extended warranty or theft replacement on some plans [VERIFY per brand]
+- Extra support perks on some plans, such as the Priority Care & Support included with [Arlo Secure Plus](https://au.arlo.com/products/asc119912-200aul) — check each plan's terms for exactly what is included
@@
-This is the Australian-specific catch that overseas reviews skip. Cloud cameras upload, and most NBN plans are heavily asymmetric — a common 50/20 plan gives 20Mbps up, and entry-level 25/5 or 12/1 connections give far less [VERIFY current plan tiers with your RSP].
+This is the Australian-specific catch that overseas reviews skip. Cloud cameras upload, and most NBN plans are heavily asymmetric — according to [nbn's wholesale speed tiers](https://www.nbnco.com.au/residential/speed-plans), a 50Mbps plan gives up to 20Mbps up (as little as 5Mbps on FTTN/FTTB), while the entry-level 25Mbps and 12Mbps tiers top out at 10Mbps and 1Mbps up. Check the upload speed of your actual plan with your internet provider.
@@
-Cloud storage means a third party holds video of your household. Where those servers are located, how long deleted footage is retained, and who can be compelled to hand it over are all worth reading the privacy policy for. Some brands store Australian customer data offshore [VERIFY per vendor].
+Cloud storage means a third party holds video of your household. Where those servers are located, how long deleted footage is retained, and who can be compelled to hand it over are all worth reading the privacy policy for. Data may leave Australia: [eufy's Australian privacy policy](https://www.eufy.com/au/policies/privacy-policy), for example, says personal data may be transferred to countries including China, the EEA, the UK and the US.
@@
-Australian privacy and surveillance rules are not a single national rulebook. The Privacy Act's household exemption, state and territory Surveillance Devices and listening-device legislation, and body corporate rules can all apply differently depending on where you live and what your camera can see or hear [VERIFY — laws differ by state and change; seek legal advice for anything contentious].
+Australian privacy and surveillance rules are not a single national rulebook. The [OAIC says](https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras) the Privacy Act doesn't cover a security camera operated by an individual acting in a private capacity, but state or territory laws may apply — and body corporate rules and local council requirements can matter too. Surveillance devices laws differ by state and change over time, so check your state's legislation or a legal-aid service, and seek legal advice for anything contentious.
@@
-Practical guidance that holds up regardless: point cameras at your own property, avoid capturing a neighbour's windows or a shared internal corridor, be careful with audio recording (it is treated more strictly than video in several jurisdictions [VERIFY]), and talk to neighbours before installing anything that overlooks their yard. Renters should get written landlord permission before drilling, and note that any camera requiring hard-wiring to 240V mains must be installed by a licensed electrician under AS/NZS wiring rules — a plug-in Type I unit is fine to install yourself, a hard-wired one is not.
+Practical guidance that holds up regardless: point cameras at your own property, avoid capturing a neighbour's windows or a shared internal corridor, be careful with audio recording (listening devices are covered by state and territory surveillance laws that differ between jurisdictions — South Australia's rules, for example, are summarised in the [Law Handbook](https://www.lawhandbook.sa.gov.au/ch34s01s04.php)), and talk to neighbours before installing anything that overlooks their yard. Renters should check their state's tenancy rules before drilling or hard-wiring anything — in [Victoria](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property), for example, removable cameras that aren't hard-wired can be installed without permission, while a hard-wired security system needs the rental provider's consent. Note that any camera requiring hard-wiring to 240V mains must be installed by a licensed electrician under AS/NZS wiring rules — a plug-in Type I unit is fine to install yourself, a hard-wired one is not.
```

### Excerpt / key takeaways / FAQ changes

- FAQ 1 answer
  - before: Over five years, usually not on price alone — a $12/month plan works out to roughly $700, while a 128GB high-endurance card is a one-off $25–$40 [VERIFY]. What the subscription buys is off-site retention, longer history and server-side detection, so the comparison is about what you get, not just dollars. Check current AUD pricing directly with the brand, as plans change regularly.
  - after: Over five years, usually not on price alone — a $12/month plan works out to roughly $700, while a 128GB high-endurance card is a one-off purchase (around $100 at full retail at the time of writing, and prices vary by retailer). What the subscription buys is off-site retention, longer history and server-side detection, so the comparison is about what you get, not just dollars. Check current AUD pricing directly with the brand, as plans change regularly.
- FAQ 2 answer
  - before: They can, if they upload to the cloud. A single 2K camera streaming events may use 2–4Mbps, so four triggering at once on a 5Mbps upload will drop frames, delay notifications and make video calls stutter [VERIFY your plan tier with your RSP]. Local recording avoids this because footage only crosses the network when you open the app.
  - after: They can, if they upload to the cloud. A single 2K camera streaming events may use 2–4Mbps, so four triggering at once on a 5Mbps upload will drop frames, delay notifications and make video calls stutter. Check your plan's upload speed with your internet provider. Local recording avoids this because footage only crosses the network when you open the app.
- FAQ 4 answer
  - before: A plug-in camera using a standard Type I outlet is fine to install yourself. Anything hard-wired to 240V mains must be installed by a licensed electrician under AS/NZS wiring rules. Renters should also get written landlord permission before drilling [VERIFY — tenancy rules differ by state].
  - after: A plug-in camera using a standard Type I outlet is fine to install yourself. Anything hard-wired to 240V mains must be installed by a licensed electrician under AS/NZS wiring rules. Renters should also check their state's tenancy rules before drilling or hard-wiring — in Victoria, for example, removable cameras that aren't hard-wired can go in without permission, but a hard-wired system needs the rental provider's consent, and other states differ.
- FAQ 5 answer
  - before: Australian rules are not one national rulebook — the Privacy Act's household exemption, state and territory Surveillance Devices legislation and body corporate rules can all apply differently [VERIFY; seek legal advice for anything contentious]. Audio is treated more strictly than video in several jurisdictions [VERIFY]. Practically, point cameras at your own property, avoid neighbours' windows and shared corridors, and talk to neighbours first.
  - after: Australian rules are not one national rulebook — the OAIC says the Privacy Act doesn't cover security cameras operated by individuals in a private capacity, but state and territory surveillance devices laws, council requirements and body corporate rules may apply. Audio recording falls under listening-device rules that differ between states, so check your state's legislation or a legal-aid service, and seek legal advice for anything contentious. Practically, point cameras at your own property, avoid neighbours' windows and shared corridors, and talk to neighbours first.

---

## home-assistant-energy-dashboard-solar-export-time-of-use-tariffs

[VERIFY] tags: 11 → 0. Words: 1386 → 1666.

### Decisions and sources

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body: "…integrations for Fronius, SMA, Enphase Envoy, SolarEdge, GoodWe, Sungrow (via Modbus TCP), Huawei SUN2000 and Tesla Powerwall [VERIFY current integration status for your specific model]" | a | Fronius, SMA, Enphase Envoy, GoodWe and Powerwall are built-in and poll locally; SolarEdge is built-in but polls the cloud; Huawei (HACS custom integration) and Sungrow (Modbus YAML package) are community projects; Powerwall 3 exposes fewer entities than Powerwall 2; check your exact model | https://www.home-assistant.io/integrations/fronius/ ; https://www.home-assistant.io/integrations/sma/ ; https://www.home-assistant.io/integrations/enphase_envoy/ ; https://www.home-assistant.io/integrations/goodwe/ ; https://www.home-assistant.io/integrations/powerwall/ ; https://www.home-assistant.io/integrations/solaredge/ ; https://github.com/wlcrs/huawei_solar ; https://github.com/mkaiser/Sungrow-SHx-Inverter-Modbus-Home-Assistant |
| 2 | Body: "…this class of device does single-phase bidirectional measurement… Modbus TCP or MQTT… [VERIFY model-specific protocol support and three-phase variants]" | a (and corrected) | The WEM3050T is a **three-phase** meter that also covers single and split phase; it measures import and export and talks Modbus/TCP, MQTT and a local HTTP API, with Home Assistant support; WEM3080 is IAMMETER's single-phase model and WEM3080T another three-phase one | https://www.iammeter.com/products/3phase-meter-3050t |
| 3 | Body: "…must be carried out by a licensed electrician under AS/NZS 3000… [VERIFY current requirements with your state's electrical regulator]" | c | Working inside the switchboard is a job for a licensed electrician; rules vary by state, so check your state regulator (Energy Safe Victoria given as an example). The claim about what the law requires under AS/NZS 3000 was removed | https://www.energysafe.vic.gov.au/certificates-electrical-safety/obligations-and-guidelines/prescribed-and-non-prescribed-work |
| 4 | Body: "…devices that read the meter's optical or Zigbee port exist in the AU market [VERIFY availability and retailer support in your distribution zone]" | b | Some Victorian distributors let you connect an in-home display to the smart meter (Jemena mentions it); whether you can get a live local feed depends on your meter, metering provider and distributor, so ask first. The claim about optical and Zigbee reader devices was removed | https://www.jemena.com.au/electricity/existing-connections/usage-and-costs/my-smart-meter/ |
| 5 | Body: "A typical NSW-style… peak 2pm–8pm weekdays… [VERIFY your tariff periods… many distributors have shifted peak windows…]" | a | At the time of writing, Ausgrid's residential time-of-use network peak is 3pm–9pm every day in Jun–Aug and Nov–Mar, off-peak at all other times; retailers may use different periods; read your own bill or BPID. The unsourced claim that "many distributors have shifted" was removed | https://www.ausgrid.com.au/your-energy-use/smarter-energy-use/understanding-network-tariffs/time-of-use-pricing ; https://www.energymadeeasy.gov.au/article/electricity-tariffs |
| 6 | Body: "Those figures are placeholders [VERIFY against your own retail plan…]" | b | Illustrative rates and times, not real prices: replace them with the figures from your own bill. Compare plans on Energy Made Easy or Victorian Energy Compare | https://www.energymadeeasy.gov.au/article/electricity-tariffs ; https://compare.energy.vic.gov.au/ |
| 7 | Body: "Most FiTs are now a flat single figure… growing number… wholesale-exposed plans change every five or thirty minutes… [VERIFY plan specifics]" | a | Per energy.gov.au, most feed-in tariffs pay a single rate, but some retailers in some areas offer variable ones such as time-of-use feed-in tariffs (lower midday, higher evening); check your plan. Removed "growing number" and the "five or thirty minutes" figures (neither was sourced) | https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs |
| 8 | Body: "…look for the metering variant in the same family [VERIFY current model availability and pricing at Officeworks, JB Hi-Fi and Amazon AU]" | a | TP-Link Australia lists the Tapo P110 and P110M as energy-monitoring plugs; Home Assistant's TP-Link integration controls them locally and creates consumption sensors for the Energy dashboard; check stock and pricing with your retailer. The retailer availability claim was dropped | https://www.tapo.com/au/product/smart-plug/tapo-p110/ ; https://www.tapo.com/au/product/smart-plug/tapo-p110m/ ; https://www.tapo.com/au/product/smart-plug/tapo-p100/ ; https://www.home-assistant.io/integrations/tplink/ |
| 9 | Body: "…difference between your import rate and your feed-in rate — often 25–35c [VERIFY against your plan]" | b | Removed the 25–35c figure. Per energy.gov.au, the feed-in tariff for newer solar owners is much lower than the retail rate; work out your own gap from your bill; gross-metering early adopters are the exception | https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs |
| 10 | FAQ 2 (id 1748): "…must be done by a licensed electrician under AS/NZS 3000… [VERIFY current requirements with your state's electrical regulator]" | c | "It's not a DIY job… a job for a licensed electrician… rules differ by state and territory, so check with your local electrical safety regulator." (plain text, no link) | https://www.energysafe.vic.gov.au/certificates-electrical-safety/obligations-and-guidelines/prescribed-and-non-prescribed-work |
| 11 | FAQ 4 (id 1750): "…energy-metering variant in the same family [VERIFY current model availability and pricing at Officeworks, JB Hi-Fi and Amazon AU]" | a | Names the Tapo P110 and P110M as energy-monitoring models that Home Assistant's TP-Link integration can feed into the Energy dashboard; check stock and pricing with your retailer (plain text) | https://www.tapo.com/au/product/smart-plug/tapo-p110/ ; https://www.tapo.com/au/product/smart-plug/tapo-p110m/ ; https://www.home-assistant.io/integrations/tplink/ |

The excerpt and keyTakeaways had no tags and are copied unchanged. FAQs 1, 3 and 5 are unchanged.

**Placeholders fixed:** 1. "Those figures are placeholders" became "illustrative examples, not real prices" plus guidance on where to find real rates (#6). There was no TODO, TBD or lorem text.

#### Needs human legal review

- Body, "Electrical warning" paragraph (#3): CT clamps and switchboard work should be done by a licensed electrician, and state regulators set the rules.
- FAQ 2 (#10): "It's not a DIY job… a job for a licensed electrician… check with your local electrical safety regulator."
- Body, the no-touch alternative (#4): pairing devices with distributor smart meters and access to metering data. This may touch on privacy and metering rules.
- Body, "The catch… consumption CT fitted at the switchboard" (untagged, unchanged): this implies switchboard work, and the electrician caveat only follows later.

#### Flagged untagged sentences (not changed)

- "Australia has the highest rooftop solar uptake in the world": an unsourced superlative. Source it or soften it.
- "set to the trapezoidal method" (body and FAQ 1): the [Home Assistant integration docs](https://www.home-assistant.io/integrations/integration/) say trapezoidal is the default and most accurate only if the source updates often. They recommend the **left** method for power that jumps and holds (such as resistive loads). Worth revising.
- "expect it to drift a percent or two from your retailer's meter" (body and FAQ 1), "A few percent variance is normal" and "A twenty percent gap means something structural": figures that look invented, with no source.
- "it needs cumulative kWh sensors with `state_class: total_increasing`": Home Assistant also accepts `state_class: total` energy sensors. Check this against the current Energy docs.
- "The Energy dashboard costs energy only; the daily fixed charge sits outside it" (body and FAQ 5): I couldn't confirm this on the Home Assistant pages I opened. It needs checking.
- The YAML price example still uses a 2pm–8pm weekday peak (`14 <= h < 20`), which no longer matches the Ausgrid 3pm–9pm example now in the text. It is labelled illustrative, but consider aligning it.
- "Zigbee devices generally report energy as a cumulative total already — no integration helper required": a generalisation that depends on the device.
- The product marker `::product:tp-link-tapo-p100-...::` embeds a non-metering plug in a metering section. The text explains this, but a P110 product may suit the section better.

### Body diff

```diff
--- before
+++ after
@@
-Start with your inverter. Home Assistant has first-party or well-maintained community integrations for **Fronius, SMA, Enphase Envoy, SolarEdge, GoodWe, Sungrow (via Modbus TCP), Huawei SUN2000 and Tesla Powerwall** [VERIFY current integration status for your specific model]. Local polling over your LAN is always preferable to a cloud API — it survives internet outages and won't get rate-limited.
+Start with your inverter. Home Assistant has built-in integrations for **[Fronius](https://www.home-assistant.io/integrations/fronius/), [SMA](https://www.home-assistant.io/integrations/sma/), [Enphase Envoy](https://www.home-assistant.io/integrations/enphase_envoy/), [GoodWe](https://www.home-assistant.io/integrations/goodwe/) and [Tesla Powerwall](https://www.home-assistant.io/integrations/powerwall/)**, all of which poll locally, plus a built-in **[SolarEdge](https://www.home-assistant.io/integrations/solaredge/)** integration that polls SolarEdge's cloud. **Huawei SUN2000** and **Sungrow** inverters are covered by community projects rather than the core install — the [Huawei Solar](https://github.com/wlcrs/huawei_solar) custom integration (installed via HACS) and a [Modbus YAML package for Sungrow](https://github.com/mkaiser/Sungrow-SHx-Inverter-Modbus-Home-Assistant). Support differs between models and firmware versions (Powerwall 3, for example, exposes fewer entities than Powerwall 2), so check the integration page for your exact model before you buy anything. Local polling over your LAN is always preferable to a cloud API — it survives internet outages and won't get rate-limited.
@@
-On specification, this class of device does single-phase bidirectional measurement and publishes over WiFi via Modbus TCP or MQTT, which is exactly what a local Home Assistant install wants [VERIFY model-specific protocol support and three-phase variants].
+According to [IAMMETER's product page](https://www.iammeter.com/products/3phase-meter-3050t), the WEM3050T is a three-phase meter that also covers single-phase and split-phase installs, measures import and export separately, and publishes locally over Modbus/TCP, MQTT or an HTTP API, with Home Assistant support — exactly what a local Home Assistant install wants. IAMMETER lists the WEM3080 as its single-phase model and the WEM3080T as another three-phase option.
@@
-**Electrical warning, plainly stated:** installing CT clamps around main conductors inside a switchboard is electrical work. In Australia this must be carried out by a licensed electrician under AS/NZS 3000 — it is not a DIY job, regardless of what an overseas YouTube video shows [VERIFY current requirements with your state's electrical regulator]. Budget for a sparky call-out on top of the hardware cost.
+**Electrical warning, plainly stated:** fitting CT clamps around the main conductors means working inside your switchboard — treat it as a job for a licensed electrician, not a DIY project, regardless of what an overseas YouTube video shows. Licensing and certification rules are set state by state, so check with your state or territory's electrical safety regulator (in Victoria, for example, [Energy Safe Victoria](https://www.energysafe.vic.gov.au/certificates-electrical-safety/obligations-and-guidelines/prescribed-and-non-prescribed-work) covers switchboard work and certificates of electrical safety). Budget for a sparky call-out on top of the hardware cost.
@@
-A no-touch alternative: some retailers and smart meter providers expose a data feed you can pull, and devices that read the meter's optical or Zigbee port exist in the AU market [VERIFY availability and retailer support in your distribution zone].
+A no-touch alternative may exist, depending on where you live. Some Victorian distributors let you connect an in-home display to your smart meter ([Jemena's smart meter page](https://www.jemena.com.au/electricity/existing-connections/usage-and-costs/my-smart-meter/) mentions this option), and some retailers and metering providers offer usage-data portals. Whether you can get a live local feed at all depends on your meter, your metering provider and your distributor, so ask them before you buy a meter-reading gadget.
@@
-Build a template sensor that returns the right rate for the current time. A typical NSW-style residential ToU structure looks something like peak 2pm–8pm weekdays, shoulder either side, off-peak overnight — but **your windows and rates are set by your distributor and retailer and will differ**, so read your own bill rather than copying mine [VERIFY your tariff periods, and note that many distributors have shifted peak windows to the late afternoon/evening to reflect solar soak].
+Build a template sensor that returns the right rate for the current time. As one example, at the time of writing Ausgrid's residential [time-of-use network tariff](https://www.ausgrid.com.au/your-energy-use/smarter-energy-use/understanding-network-tariffs/time-of-use-pricing) has a peak from 3pm to 9pm every day in June–August and November–March, and off-peak at all other times. Ausgrid itself notes that retailers can apply different periods, and [Energy Made Easy](https://www.energymadeeasy.gov.au/article/electricity-tariffs) points out that some plans add shoulder periods or more — so **your windows and rates are set by your distributor and retailer and will differ**. Read your own bill or your plan's Basic Plan Information Document rather than copying mine. The times in the example below are illustrative only.
@@
-Those figures are placeholders [VERIFY against your own retail plan — rates vary widely by state, distributor and plan].
+Those rates and times are illustrative examples, not real prices — replace them with the figures from your own bill or plan. Rates vary widely by state, distributor and plan; you can look up and compare plans on [Energy Made Easy](https://www.energymadeeasy.gov.au/article/electricity-tariffs), or on [Victorian Energy Compare](https://compare.energy.vic.gov.au/) in Victoria.
@@
-Do the same for your **feed-in tariff** and attach it to the "Return to grid" source. Most FiTs are now a flat single figure, but a growing number of retailers offer time-varying export rates, and wholesale-exposed plans change every five or thirty minutes — in which case an integration that pulls live pricing is a better fit than a hardcoded template [VERIFY plan specifics].
+Do the same for your **feed-in tariff** and attach it to the "Return to grid" source. According to [energy.gov.au](https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs), most feed-in tariffs pay a single rate, but some retailers in some areas offer variable ones — such as time-of-use feed-in tariffs, typically lower in the middle of the day and higher in the evening. Check which type your plan has. If you're on a wholesale-linked plan whose price moves through the day, an integration that pulls live pricing is a better fit than a hardcoded template.
@@
-The P100 is a switching-only plug — useful for *shifting* a load into your solar window or off-peak period via automation, but it won't contribute a kWh figure to the dashboard. If you need the measurement as well, look for the metering variant in the same family [VERIFY current model availability and pricing at Officeworks, JB Hi-Fi and Amazon AU].
+The P100 is a switching-only plug — useful for *shifting* a load into your solar window or off-peak period via automation, but it won't contribute a kWh figure to the dashboard. If you need the measurement as well, look for the energy-monitoring variants in the same family: TP-Link Australia lists the [Tapo P110](https://www.tapo.com/au/product/smart-plug/tapo-p110/) and P110M as energy-monitoring plugs. Home Assistant's [TP-Link integration](https://www.home-assistant.io/integrations/tplink/) controls them locally and creates consumption sensors that can feed the Energy dashboard. Check current stock and pricing with your retailer.
@@
-The highest-value automation here is usually the dumbest one: trigger the pool pump, dishwasher or hot water element when solar export exceeds a threshold for a sustained period, and stop when it drops. Every kilowatt-hour you self-consume is worth the difference between your import rate and your feed-in rate — often 25–35c [VERIFY against your plan].
+The highest-value automation here is usually the dumbest one: trigger the pool pump, dishwasher or hot water element when solar export exceeds a threshold for a sustained period, and stop when it drops. Every kilowatt-hour you self-consume is worth the difference between your import rate and your feed-in rate. For most newer solar owners the feed-in tariff is much lower than the retail rate, as [energy.gov.au](https://www.energy.gov.au/solar/financial-benefits-solar/electricity-pricing-plans-and-tariffs) notes, so the gap is usually worth chasing — work out your own figure from the rates on your bill. (Early adopters on gross-metering arrangements are the exception: self-consumption doesn't carry the same benefit there.)
```

### Excerpt / key takeaways / FAQ changes

- FAQ 2 answer
  - before: No. Installing CT clamps around main conductors inside a switchboard is electrical work, and in Australia it must be done by a licensed electrician under AS/NZS 3000, regardless of what overseas DIY videos show [VERIFY current requirements with your state's electrical regulator]. Budget for a sparky call-out on top of the hardware cost.
  - after: It's not a DIY job. Fitting CT clamps around the main conductors means working inside your switchboard, which is a job for a licensed electrician, regardless of what overseas DIY videos show. Licensing and certification rules differ by state and territory, so check with your local electrical safety regulator. Budget for a sparky call-out on top of the hardware cost.
- FAQ 4 answer
  - before: No — the P100 is a switching-only plug, so it won't contribute a kWh figure. It's still useful for shifting a load such as a pool pump or dishwasher into your solar window or off-peak period via automation. If you want measurement too, look for the energy-metering variant in the same family [VERIFY current model availability and pricing at Officeworks, JB Hi-Fi and Amazon AU].
  - after: No — the P100 is a switching-only plug, so it won't contribute a kWh figure. It's still useful for shifting a load such as a pool pump or dishwasher into your solar window or off-peak period via automation. If you want measurement too, look for an energy-monitoring model in the same family, such as the Tapo P110 or P110M, which Home Assistant's TP-Link integration can feed into the Energy dashboard. Check current stock and pricing with your retailer.

---

## wiring-video-doorbell-australian-chime-transformer

[VERIFY] tags: 11 → 0. Words: 1316 → 1507.

### Decisions and sources

11 [VERIFY] tags: 7 in the body, 4 in the FAQ (none in the excerpt or keyTakeaways). No placeholder text (TODO/TBD/lorem/template) found.

| # | Original text (short, incl. tag) | Decision | New text (short) | Source URL(s) |
|---|---|---|---|---|
| 1 | Body, plug pack: "8V AC, 12V AC and 12V DC are all common in Australia [VERIFY]." | b | "the label should show the output voltage, AC or DC, and a VA or amp rating. Older chime plug packs vary widely, so read the label rather than assuming." | None. No authoritative data on how common each rating is |
| 2 | Body: "Ring's wired models and Nest's wired doorbell both publish minimum VA ratings… [VERIFY current model specs…]" | a | Ring AU: Video Doorbell Wired 8-24V AC, 8-40VA; Pro/wired variants 16-24V AC, 10-40VA. Google: Nest Doorbell (wired, 2nd/3rd gen) 16-24V AC, 10-40VA. Check the page for your exact model. | https://ring.com/au/en/support/articles/ae586/Checking-if-your-existing-doorbell-wiring-is-compatible-with-Ring-Video-Doorbells ; https://support.google.com/googlehome/answer/12153643?hl=en |
| 3 | Body: "Any 240V-connected equipment… should carry the RCM mark… [VERIFY approval requirements…]" | a | "in-scope electrical equipment must not be sold in Australia unless it carries the RCM (EESS). Ask the seller to confirm a plug pack is RCM-marked…" | https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ |
| 4 | Body: "fixed electrical wiring work on the 240V side is licensed work in every state and territory… [VERIFY… rules and penalties differ]" | c | "Anything connected to 240V mains is a licensed electrician's job… what counts as licensed electrical work, and the penalties, differ between states and territories, so check with your state's electrical safety regulator." | Regulator referral (no single national source) |
| 5 | Body, ELV: "connecting a doorbell to existing ELV bell wire is the kind of task many homeowners undertake… AS/NZS 3000… [VERIFY]" | c | ELV rules "differ by state"; Ring AU says installation and wiring must be done by a licensed electrician in AU/NZ; check your regulator and install guide; stay out of cavities shared with mains. Removed the homeowner-DIY and AS/NZS 3000 claims. | https://ring.com/au/en/support/articles/ae586/Checking-if-your-existing-doorbell-wiring-is-compatible-with-Ring-Video-Doorbells |
| 6 | Body, renters: "drilling… usually an alteration requiring the lessor's written consent… [VERIFY with your state tenancy authority]" | a (legal, see review) | VIC: a wireless doorbell needs no consent; cameras need no consent only if removable and not hard-wired; fixings into exposed brick need consent. NSW: written permission needed unless the lease allows it. Other states: check your tenancy authority. | https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property ; https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property |
| 7 | Body: "Ring ships a Pro Power Kit for exactly this… [VERIFY what's in the box…]" | a | Ring says the Wired Doorbell Plus and Pro must use the Pro Power Kit, which fits inside the chime and can bypass it; the Plus originally came with a Pro Power Cable and now ships with the Pro Power Kit v2; check the box contents for your model. | https://ring.com/support/articles/1tztz/Installing-Pro-Power-Kit-to-Bypass-Your-Doorbell-Chime ; https://ring.com/support/articles/43lwi/Pro-Power-Cable-Pro-Power-Kit-v2-Ring-Wired-Doorbell-Plus |
| 8 | FAQ 1: "Check the transformer's VA figure… [VERIFY current model specs…]" | b | "…against the published requirement for your exact doorbell model, as specs change between generations." | Same as #2 (plain text, no link) |
| 9 | FAQ 2: "should carry the RCM mark… [VERIFY approval requirements…]" | a | Same content as #3, in plain text. | https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/ |
| 10 | FAQ 3: "ELV… commonly homeowner territory… AS/NZS 3000… [VERIFY with your state's electrical regulator]" | c | Same content as #4 and #5, in plain text: mains is a sparkie's job; ELV rules differ by state; Ring AU requires a licensed electrician; check your regulator. | Ring AU URL as in #5 |
| 11 | FAQ 5: "drilling a door frame… lessor's written consent… [VERIFY with your state tenancy authority]" | a (legal, see review) | Same content as #6, in plain text. | CAV and NSW URLs as in #6 |

Totals: a = 6 (#2, 3, 6, 7, 9, 11), b = 2 (#1, 8), c = 3 (#4, 5, 10). 7 distinct sources opened.

#### Needs human legal review

- Body and FAQ 3: "Anything connected to 240V mains is a licensed electrician's job…" (electrical licensing).
- Body and FAQ 3: the ELV paragraph, including the report that Ring AU requires a licensed electrician for installation and wiring in AU/NZ (electrical licensing).
- Body bullet list (untouched): "Use a plug-in transformer… plugged into an existing socket", "ask for the certificate of electrical safety or equivalent paperwork for your state", "Isolate at the switchboard before touching a transformer".
- Body and FAQ 2: RCM/EESS sale requirement (product safety and consumer law).
- Body and FAQ 5: renters' consent rules for VIC and NSW (tenancy).
- Body: "a rental you can't modify" in the wire-free section (tenancy).

#### Flagged untagged sentences (not changed)

- **keyTakeaways: "Plug-in transformers are DIY-friendly; anything hard-wired to 240V is licensed electrical work in every Australian state."** This conflicts with Ring AU, which says installation and wiring must be done by a licensed electrician in AU/NZ. It also states law as settled. Recommend rewording to match the body.
- **Excerpt: "designed around American 16-24V AC transformers" and keyTakeaways: "most video doorbells expect North American 16-24V AC supplies".** Partly wrong: Ring lists 8-24V AC for its Video Doorbell Wired and battery models. Suggest "many wired video doorbells expect 16-24V AC".
- **Body, "AC versus DC": "Plenty of local plug packs are DC" (also FAQ 4).** Unsourced prevalence claim. The warning itself is supported: Ring's AU page says its doorbells need AC.
- **Body: "Electronic chimes… usually need a bypass module or diode kit."** Unsourced generalisation. Ring's pages do not tie the kit to chime type.
- **Body and FAQ 1: "Older Australian bell wire… may run 15 metres or more"** and **"Very common in homes built or renovated in the last 20 years"** (battery chimes). These are unsourced specifics.
- **"240V" is used throughout.** The Australian nominal mains voltage is 230V. This is not changed, for consistency with the article's voice.
- **Arlo section: "ongoing cloud subscription costs apply to most brands"** and the battery-life claim. These are unsourced generalisations and lower risk.

### Body diff

```diff
--- before
+++ after
@@
-**Plug-pack transformer.** A small unit plugged into a Type I socket in a cupboard, laundry or roof space, with bell wire running to the door. Look for a label: 8V AC, 12V AC and 12V DC are all common in Australia [VERIFY].
+**Plug-pack transformer.** A small unit plugged into a Type I socket in a cupboard, laundry or roof space, with bell wire running to the door. Look for a label: it should show the output voltage, whether the output is AC or DC, and a VA or amp rating. Older chime plug packs vary widely, so read the label rather than assuming.
@@
-Most mains-powered video doorbells specify something in the range of 8-24V AC, and many draw meaningfully more than an old mechanical bell button ever did. Ring's wired models and Nest's wired doorbell both publish minimum VA ratings as well as voltage ranges — the VA figure is the one people ignore, and it is usually what causes reboot loops [VERIFY current model specs before buying, as they change between generations].
+Most mains-powered video doorbells specify something in the range of 8-24V AC, and many draw meaningfully more than an old mechanical bell button ever did. Ring's wired models and Nest's wired doorbell both publish minimum VA ratings as well as voltage ranges. Ring's Australian support site lists 8-24V AC at 8-40VA for the Ring Video Doorbell Wired and 16-24V AC at 10-40VA for its Pro and wired-variant models ([Ring AU](https://ring.com/au/en/support/articles/ae586/Checking-if-your-existing-doorbell-wiring-is-compatible-with-Ring-Video-Doorbells)), while Google asks for a transformer rated 16-24V AC, 10-40VA for the Nest Doorbell (wired, 2nd and 3rd gen) ([Google Nest Help](https://support.google.com/googlehome/answer/12153643?hl=en)). The VA figure is the one people ignore, and it is usually what causes reboot loops. These specs change between generations, so check the page for your exact model before buying.
@@
-**Imported transformers.** A 16V AC transformer bought from a US seller will have the wrong plug and may not carry Australian approvals. Any 240V-connected equipment sold or installed here should carry the RCM mark and meet the relevant AS/NZS standards; using a travel adaptor as a permanent fix is not an acceptable substitute [VERIFY approval requirements for your specific product with the supplier].
+**Imported transformers.** A 16V AC transformer bought from a US seller will have the wrong plug and may not carry Australian approvals. Under the national Electrical Equipment Safety System, in-scope electrical equipment must not be sold in Australia unless it carries the RCM ([EESS](https://www.eess.gov.au/rcm/regulatory-compliance-mark-rcm-general/)). Ask the seller to confirm that a plug pack is RCM-marked before you buy, and don't treat a travel adaptor as a permanent fix.
@@
-This is the part worth being blunt about. In Australia, fixed electrical wiring work on the 240V side is licensed work in every state and territory. That includes installing or replacing a transformer that is hard-wired into a meter box or switchboard, running new mains cabling, or altering an existing hard-wired chime circuit. Do not do it yourself, regardless of what a YouTube tutorial from Ohio shows [VERIFY the specific requirements with your state's electrical regulator — rules and penalties differ by jurisdiction].
+This is the part worth being blunt about. Anything connected to 240V mains is a licensed electrician's job. That includes installing or replacing a transformer that is hard-wired into a meter box or switchboard, running new mains cabling, or altering an existing hard-wired chime circuit. Do not do it yourself, regardless of what a YouTube tutorial from Ohio shows. The detail of what counts as licensed electrical work, and the penalties, differ between states and territories, so check with your state's electrical safety regulator.
@@
-The extra-low voltage side — the bell wire between the transformer output and the door button, typically 8-24V — is generally treated differently, and connecting a doorbell to existing ELV bell wire is the kind of task many homeowners undertake. That said, ELV wiring that forms part of a fixed installation can still fall under AS/NZS 3000 requirements in some circumstances, and if the wiring shares a cavity or enclosure with mains cabling you should not be in there [VERIFY].
+The extra-low voltage side — the bell wire between the transformer output and the door button, typically 8-24V — is where the rules get less clear-cut. How extra-low-voltage work is treated differs by state, and manufacturers set their own conditions: Ring's Australian support page says installation and wiring of its video doorbells must be performed by a licensed electrician in Australia and New Zealand ([Ring AU](https://ring.com/au/en/support/articles/ae586/Checking-if-your-existing-doorbell-wiring-is-compatible-with-Ring-Video-Doorbells)). Check your state's electrical safety regulator and your doorbell's install guide before touching the bell wire yourself, and if the wiring shares a cavity or enclosure with mains cabling you should not be in there.
@@
-Renters have an extra layer: drilling the front door frame or brickwork is usually an alteration requiring the lessor's written consent, and rules vary considerably between states and between fixed and modification-free mounts [VERIFY with your state tenancy authority].
+Renters have an extra layer. In Victoria, Consumer Affairs Victoria lists a wireless doorbell among the changes renters can make without consent, but security cameras only qualify if they are easily removable and not hard-wired, and fixing hardware to exposed brick needs consent ([Consumer Affairs Victoria](https://www.consumer.vic.gov.au/housing/renting/repairs-alterations-safety-and-pets/renters-making-changes-to-the-property)). In NSW, you can make changes only if your lease allows it or your landlord gives written permission ([NSW Government](https://www.nsw.gov.au/housing-and-construction/rules/making-changes-to-a-rental-property)). Rules differ in other states, so check with your state tenancy authority before drilling anything.
@@
-**Electronic chimes** (a speaker playing a tone) usually need a bypass module or diode kit. Ring ships a Pro Power Kit for exactly this; other brands have equivalents [VERIFY what's in the box for your model, as some ship it only in certain regions].
+**Electronic chimes** (a speaker playing a tone) usually need a bypass module or diode kit. Ring says its Wired Doorbell Plus and Pro must be used with its Pro Power Kit, which fits inside the existing chime and can also be wired to bypass it ([Ring](https://ring.com/support/articles/1tztz/Installing-Pro-Power-Kit-to-Bypass-Your-Doorbell-Chime)); other brands have their own adaptors. What's in the box changes between generations — Ring notes the Wired Doorbell Plus originally came with a Pro Power Cable and now ships with the Pro Power Kit v2 ([Ring](https://ring.com/support/articles/43lwi/Pro-Power-Cable-Pro-Power-Kit-v2-Ring-Wired-Doorbell-Plus)) — so check the box contents listed for your exact model.
```

### Excerpt / key takeaways / FAQ changes

- excerpt
  - before: Most video doorbells are designed around American 16-24V AC transformers, not the 8V plug packs and battery chimes common in Australian homes. Here's how to work out what you've got, what a licensed electrician has to do, and when going wire-free is the better call.
  - after: Many video doorbells need more voltage and power than the 8V plug packs and battery chimes common in Australian homes. Here's how to work out what you've got, what a licensed electrician has to do, and when going wire-free is the better call.
- keyTakeaways
  - before: Check whether your existing setup is an 8-12V plug pack, a switchboard-mounted transformer or a battery chime before you buy, because most video doorbells expect North American 16-24V AC supplies. Plug-in transformers are DIY-friendly; anything hard-wired to 240V is licensed electrical work in every Australian state.
  - after: Check whether your existing setup is an 8-12V plug pack, a switchboard-mounted transformer or a battery chime before you buy, because many video doorbells need a higher voltage and VA rating than an old bell circuit supplies - check the exact figures for your model on the maker's support page. Anything connected to mains power is a job for a licensed electrician, and rules on low-voltage work differ by state, so check with your state's electrical safety regulator.
- FAQ 1 answer
  - before: That's the classic symptom of not enough power reaching the unit, and it's usually the transformer's VA rating or voltage drop along the bell wire rather than your Wi-Fi. Older Australian bell wire is often very fine gauge and can run 15 metres or more from a cupboard to the front door, which can pull a 12V supply below the doorbell's minimum under load. Check the transformer's VA figure against the doorbell's published requirement [VERIFY current model specs before buying, as they change between generations].
  - after: That's the classic symptom of not enough power reaching the unit, and it's usually the transformer's VA rating or voltage drop along the bell wire rather than your Wi-Fi. Older Australian bell wire is often very fine gauge and can run 15 metres or more from a cupboard to the front door, which can pull a 12V supply below the doorbell's minimum under load. Check the transformer's VA figure against the published requirement for your exact doorbell model, as specs change between generations.
- FAQ 2 answer
  - before: It's not a sound permanent solution. Equipment connected to 240V and sold or installed in Australia should carry the RCM mark and meet the relevant AS/NZS standards, and a travel adaptor isn't an acceptable substitute for a properly approved plug pack [VERIFY approval requirements for your specific product with the supplier]. Use a plug-in transformer supplied with, or approved for, your doorbell instead.
  - after: It's not a sound permanent solution. Under the national Electrical Equipment Safety System, in-scope electrical equipment must carry the RCM before it can be sold in Australia, so ask the seller to confirm a plug pack is RCM-marked, and don't treat a travel adaptor as a substitute for a properly approved plug pack. Use a plug-in transformer supplied with, or approved for, your doorbell instead.
- FAQ 3 answer
  - before: Fixed 240V wiring work is licensed work in every Australian state and territory, so installing or replacing a hard-wired transformer in a meter box or switchboard, or altering a hard-wired chime circuit, must go to a licensed electrician. The extra-low voltage bell wire between the transformer output and the button is generally treated differently and is commonly homeowner territory, though ELV forming part of a fixed installation can still fall under AS/NZS 3000 in some circumstances, and you should stay out of any cavity shared with mains cabling [VERIFY with your state's electrical regulator].
  - after: Anything connected to 240V mains is a licensed electrician's job, so installing or replacing a hard-wired transformer in a meter box or switchboard, or altering a hard-wired chime circuit, must go to a sparkie. Rules on the extra-low voltage bell wire between the transformer output and the button differ by state, and some manufacturers set their own conditions: Ring's Australian support site says its doorbells must be installed and wired by a licensed electrician in Australia and New Zealand. Check your state's electrical safety regulator and your doorbell's install guide first, and stay out of any cavity shared with mains cabling.
- FAQ 5 answer
  - before: A battery-powered doorbell or camera sidesteps the electrical work entirely; you trade a recharge every few months for no transformer, no bell wire and no electrician. Be aware that drilling a door frame or brickwork is usually an alteration needing the lessor's written consent, and the rules differ between states and between fixed and modification-free mounts [VERIFY with your state tenancy authority].
  - after: A battery-powered doorbell or camera sidesteps the electrical work entirely; you trade a recharge every few months for no transformer, no bell wire and no electrician. Rules on alterations differ between states. In Victoria, Consumer Affairs Victoria lists a wireless doorbell among the changes renters can make without consent, while hard-wired devices and fixings into exposed brick need approval; in NSW, changes need your landlord's written permission unless your lease allows them. Check with your state tenancy authority before drilling anything.
