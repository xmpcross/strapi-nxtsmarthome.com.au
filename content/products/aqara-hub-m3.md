---
name: Hub M3
brand: Aqara
bestFor: Giving Zigbee sensors and buttons a coordinator to join
# No `rating` — this device has not been hands-on tested. See CLAUDE.md rule 5.
# `match` drives automatic detection by scripts/link-products.mjs. Add every way
# an article might name this product. Matching is case-insensitive, whole-word.
match:
  - Aqara Hub M3
  - Aqara M3
  - Aqara hub
identifiers:
  model: '' # [VERIFY] model number not confirmed
  asin: ''
  ebayEpid: ''
pros:
  - One of the standard Zigbee coordinators, alongside a Hue Bridge, a SmartThings hub or a USB Zigbee stick in Home Assistant
cons:
  - Zigbee shares the 2.4 GHz band with Wi-Fi, Bluetooth and microwaves, so it can get flaky in apartment buildings with many overlapping networks
  - Zigbee interoperability is looser than the marketing suggests — a device from an obscure brand may behave oddly on another brand's hub
retailers:
  - name: Amazon AU
    url: https://www.amazon.com.au/s?k=Aqara%20Hub%20M3
    primary: true
  - name: eBay AU
    url: https://www.ebay.com.au/sch/i.html?_nkw=Aqara%20Hub%20M3
    primary: true
  - name: JB Hi-Fi
    url: https://www.jbhifi.com.au/search?query=Aqara%20Hub%20M3
  - name: The Good Guys
    url: https://www.thegoodguys.com.au/SearchDisplay?searchTerm=Aqara%20Hub%20M3
  - name: Officeworks
    url: https://www.officeworks.com.au/shop/officeworks/search?q=Aqara%20Hub%20M3
  - name: Bunnings
    url: https://www.bunnings.com.au/search/products?q=Aqara%20Hub%20M3
  - name: Harvey Norman
    url: https://www.harveynorman.com.au/catalogsearch/result/?q=Aqara%20Hub%20M3
---

Zigbee needs a coordinator before any sensor can join it. This is one of the options.

<!--
PROVENANCE — not hands-on tested, and THIN.
The only support in this site's own writing is a single passing mention in
zigbee-vs-zwave-vs-thread-vs-wifi: "It needs a coordinator: a Hue Bridge, a
SmartThings hub, an Aqara hub, or a USB Zigbee stick in a Home Assistant setup."
The 2.4 GHz and interoperability caveats come from the same article and describe
Zigbee generally, not this unit.

Removed as unsupported: Thread/Matter bridging, local automations surviving an
internet drop, wired ethernet on flaky NBN, and the Aqara app criticism. All were
plausible but unverified, and none appear anywhere on this site.

Because so little survives, consider unpublishing this entry until the M3 has
actually been used, or replacing it with a general "Zigbee hubs" explainer.
-->
