# Task 6 review: batch 7, final (5 articles)

Proposed fixes for the last 9 `[VERIFY]` tags on the live site. **Nothing has been written to Strapi.** Reply **approve** to publish all five.

This batch was small enough to research directly (no research agents). Backups are in `exports/strapi-backup/<slug>-2026-09-24T08-28-48-837Z.json`. All five already have a `publishDate` (3-4 Aug 2026), which the write keeps. `dateModified` is set to 24 Sep 2026.

## Decisions

| # | Article | Original (short, incl. tag) | Decision | New text (short) | Source |
|---|---|---|---|---|---|
| 1 | older-australians (body) | "fixed wiring, which is licensed work in every state and territory. [VERIFY]" | c | "a job for a licensed electrician"; ESV example; "rules are set by each state and territory, so check with your regulator" | https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers |
| 2 | older-australians (body) | "surveillance and listening device laws vary… recording in private spaces is regulated. [VERIFY]" | c | state/territory laws; the OAIC says the Privacy Act generally doesn't cover private individuals' cameras; check your state's rules | https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras |
| 3 | older-australians (body) | "Some assistive technology can be funded through Australian aged care programmes… [VERIFY]" | a | Support at Home's AT-HM scheme; needs an aged care assessment approving you; complex items may need a health professional's prescription | https://www.myagedcare.gov.au/aged-care-programs/assistive-technology-and-home-modifications-scheme ; https://www.health.gov.au/our-work/support-at-home/delivering-services-for-support-at-home/assistive-technology-and-home-modifications-at-hm-scheme |
| 4 | older-australians (FAQ 1511) | "…depends on the assessed need and the specific item… [VERIFY]" | a | same as #3, plain text | as #3 |
| 5 | future-proof (body) | "…not limited to a manufacturer's stated warranty period. [VERIFY]" | a | the ACCC: guarantees apply for a reasonable period given the product and price, "which might be longer than any… warranty" | https://www.accc.gov.au/media-release/broken-but-out-of-warranty-your-consumer-guarantee-rights-may-still-apply |
| 6-7 | without-internet (HTML maintenance comment, 2 tags) | "…the kind readers notice. [VERIFY]" / "[VERIFY] before strengthening it." | b | note kept, the tag became "Re-check before…". The reader-facing text is already hedged ("some brands", "generally") | — (editor note, not reader-facing) |
| 8 | thread-vs-matter (HTML comment) | "…verified hands-on. [VERIFY] before strengthening it." | b | "Re-check before strengthening it." Reader text already says "has improved" | — |
| 9 | where-to-buy (HTML comment) | "…without re-checking. [VERIFY]" | b | tag removed; the note already says re-check | — |

## Reviewer edits beyond the tags (approve or drop)

1. **Older Australians: "Home Care Package" is out of date (body and FAQ 1511 question and answer).** Home Care Packages were replaced by the Support at Home program. The body now says "Support at Home provider", and the FAQ question "Will Home Care Package funding pay…" becomes "Will aged care funding pay…".
2. **Older Australians: unsourced claim removed.** "approval before purchase is considerably easier than reimbursement afterwards" (body) and "reimbursement after the fact is far harder" (FAQ) had no source. Both now say to talk to the provider or coordinator before buying. The official pages say funding follows assessment and approval, and the provider sources items.

## Not part of Task 6

- **None of these five articles has `::product:` boxes** (CLAUDE.md rule 8). With the four from batches 5 and 6, that makes **9 live articles without product boxes**.

---

## smart-home-devices-older-australians

### Body diff

```diff
--- before
+++ after
@@
-Two practical notes for Australian homes. Bulb fittings here are both B22 bayonet and E27 screw, so check which the fitting takes before ordering. And a smart bulb is only smart while it has power — if someone turns the wall switch off, it stops responding to everything, which is a common source of confusion. Smart switches avoid that but involve fixed wiring, which is licensed work in every state and territory. [VERIFY]
+Two practical notes for Australian homes. Bulb fittings here are both B22 bayonet and E27 screw, so check which the fitting takes before ordering. And a smart bulb is only smart while it has power — if someone turns the wall switch off, it stops responding to everything, which is a common source of confusion. Smart switches avoid that but involve fixed wiring, which is a job for a licensed electrician — [Energy Safe Victoria](https://www.energysafe.vic.gov.au/community-safety/working-tradespeople/electrical-workers), for example, warns that doing your own electrical work is illegal, and rules are set by each state and territory, so check with your regulator.
@@
-Australian surveillance and listening device laws vary by state and territory, and recording in private spaces is regulated. [VERIFY] Beyond the legal position, there is a practical one: a camera in a living area changes how someone feels in their own home, and that cost is easy to underestimate from outside it.
+Surveillance and listening device laws are set by each state and territory, and the [OAIC notes](https://www.oaic.gov.au/privacy/your-privacy-rights/surveillance-and-monitoring/security-cameras) that the federal Privacy Act generally does not cover cameras run by individuals in a private capacity, while state or territory laws may apply — check your state's rules before putting a camera or microphone in someone's home. Beyond the legal position, there is a practical one: a camera in a living area changes how someone feels in their own home, and that cost is easy to underestimate from outside it.
@@
-Some assistive technology can be funded through Australian aged care programmes, depending on assessed need and the specific item. [VERIFY] The important practical point is sequencing: approval before purchase is considerably easier than reimbursement afterwards. Speak to the Home Care Package provider or care coordinator first, and get the position in writing.
+Some assistive technology can be funded through the Support at Home program's [Assistive Technology and Home Modifications (AT-HM) scheme](https://www.myagedcare.gov.au/aged-care-programs/assistive-technology-and-home-modifications-scheme). To get that funding you need an aged care assessment that approves you for the scheme, and more complex items may need a prescription from a health professional ([Department of Health, Disability and Ageing](https://www.health.gov.au/our-work/support-at-home/delivering-services-for-support-at-home/assistive-technology-and-home-modifications-at-hm-scheme)). Whether a particular smart home device qualifies depends on the assessed need, not on how the product is marketed. The practical point is sequencing: talk to the Support at Home provider or care coordinator before buying anything, and get the position in writing.
```

### FAQ changes

- FAQ 2 question
  - before: Will Home Care Package funding pay for smart home devices?
  - after: Will aged care funding pay for smart home devices?
- FAQ 2 answer
  - before: Some assistive technology can be funded through aged care programmes, but eligibility depends on the assessed need and the specific item rather than on the product being marketed as helpful. [VERIFY] Speak to the package provider or care coordinator before buying, because reimbursement after the fact is far harder than approval before it.
  - after: Some assistive technology can be funded through the Support at Home program's Assistive Technology and Home Modifications (AT-HM) scheme. You need an aged care assessment that approves you for the scheme, and more complex items may need a prescription from a health professional. Whether a particular device qualifies depends on the assessed need, not on the product being marketed as helpful. Speak to the Support at Home provider or care coordinator before buying anything.

---

## future-proof-smart-home-devices-australia

### Body diff

```diff
--- before
+++ after
@@
-**Australian Consumer Law is a genuine backstop.** Consumer guarantees require goods to be of acceptable quality and to last a reasonable time given the price and description — and that obligation is not limited to a manufacturer's stated warranty period. [VERIFY] A premium device that stops working after two years because a server was retired is at least arguable ground. It is worth knowing this exists before accepting a shrug.
+**Australian Consumer Law is a genuine backstop.** Consumer guarantees require goods to be of acceptable quality, and the [ACCC explains](https://www.accc.gov.au/media-release/broken-but-out-of-warranty-your-consumer-guarantee-rights-may-still-apply) that they apply for a period that is reasonable given the nature of the product and the price paid, which might be longer than any retailer's or manufacturer's warranty. A premium device that stops working after two years because a server was retired is at least arguable ground. It is worth knowing this exists before accepting a shrug.
```

---

## smart-home-devices-without-internet

### Body diff

```diff
--- before
+++ after
@@
-    releases and a wrong claim here is the kind readers notice. [VERIFY]
+    releases and a wrong claim here is the kind readers notice. Re-check before naming any.
@@
-    "generally" for the same reason. [VERIFY] before strengthening it.
+    "generally" for the same reason. Re-check before strengthening it.
```

---

## thread-vs-matter-difference

### Body diff

```diff
--- before
+++ after
@@
-    something we have verified hands-on. [VERIFY] before strengthening it.
+    something we have verified hands-on. Re-check before strengthening it.
```

---

## where-to-buy-smart-home-australia

### Body diff

```diff
--- before
+++ after
@@
-    without re-checking. [VERIFY]
+    without re-checking.
```
