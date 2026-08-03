---
name: Hue Bridge
brand: Philips
bestFor: Running Hue bulbs on Zigbee and exposing them to Apple Home, Google Home and Alexa
# No `rating` — this device has not been hands-on tested. See CLAUDE.md rule 5.
match:
  - Philips Hue Bridge
  - Hue Bridge
identifiers:
  model: '' # [VERIFY] confirm the current model before publishing a model number
  asin: ''
  ebayEpid: ''
pros:
  - One of the standard Zigbee coordinators, alongside a SmartThings hub, an Aqara hub or a USB Zigbee stick in Home Assistant
  - It is the piece that connects Hue bulbs to Apple, Google and Amazon
cons:
  - Zigbee shares the 2.4 GHz band with Wi-Fi, Bluetooth and microwaves, so it can get flaky in apartment buildings with many overlapping networks
  - Zigbee interoperability is looser than the marketing suggests — a device from an obscure brand may behave oddly on another brand's hub
retailers:
  - name: Amazon AU
    url: https://www.amazon.com.au/s?k=Philips%20Hue%20Bridge
    primary: true
  - name: eBay AU
    url: https://www.ebay.com.au/sch/i.html?_nkw=Philips%20Hue%20Bridge
    primary: true
  - name: JB Hi-Fi
    url: https://www.jbhifi.com.au/search?query=Philips%20Hue%20Bridge
  - name: The Good Guys
    url: https://www.thegoodguys.com.au/SearchDisplay?searchTerm=Philips%20Hue%20Bridge
  - name: Officeworks
    url: https://www.officeworks.com.au/shop/officeworks/search?q=Philips%20Hue%20Bridge
  - name: Bunnings
    url: https://www.bunnings.com.au/search/products?q=Philips%20Hue%20Bridge
  - name: Harvey Norman
    url: https://www.harveynorman.com.au/catalogsearch/result/?q=Philips%20Hue%20Bridge
---

Zigbee needs a coordinator, and for Hue bulbs the Bridge is it. It is also what lets
Apple Home, Google Home and Alexa see those bulbs at all.

<!--
PROVENANCE — not hands-on tested.
Every claim above is drawn from this site's own articles:
  zigbee-vs-zwave-vs-thread-vs-wifi  — "It needs a coordinator: a Hue Bridge, a
    SmartThings hub, an Aqara hub, or a USB Zigbee stick"; the 2.4 GHz congestion
    and interoperability caveats.
  what-is-matter-smart-home-australia — "A Philips Hue bulb spoke Zigbee to a Hue
    Bridge, which spoke a proprietary API to Apple, Google and Amazon."
Earlier claims about Bluetooth-vs-Zigbee range, HomeKit being required, reliability
and a five-bulb threshold were removed: nothing on this site supports them.
-->
