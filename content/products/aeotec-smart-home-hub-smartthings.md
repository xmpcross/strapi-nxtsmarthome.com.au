---
name: 'Smart Home Hub (SmartThings)'
brand: 'Aeotec'
bestFor: 'Australians using the SmartThings ecosystem who want a single hub to manage Zigbee, Thread, Matter, and local Australian-frequency Z-Wave devices without a subscription.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Aeotec Smart Home Hub (SmartThings)'
  - 'Smart Home Hub (SmartThings)'
identifiers:
  model: 'GP-AEOHUBV3AN'
  asin: ''
  ebayEpid: ''
pros:
  - 'Supports multiple protocols including Zigbee 3.0, Thread, Matter, and Australian-frequency (921.4 MHz) Z-Wave Plus.'
  - 'Requires no ongoing mandatory subscription fees to use the hub or SmartThings platform.'
  - 'Includes both 2.4 GHz Wi-Fi and a 10/100 Mbps Ethernet port for flexible placement near your home router.'
  - 'Works directly with Amazon Alexa and Google Home via SmartThings cloud integrations.'
cons:
  - 'Wi-Fi connectivity is strictly limited to 2.4 GHz bands with no 5 GHz support.'
  - 'Does not natively expose connected Zigbee or Z-Wave devices outbound to Apple Home via Matter.'
  - 'Relies on Samsung''s cloud infrastructure for initial setup, general app controls, and remote management.'
  - 'Uses a DC barrel jack connector instead of a modern USB-C power input.'
---

The Aeotec Smart Home Hub is a multi-protocol hardware controller powered by the Samsung SmartThings platform. According to Aeotec, it acts as a central coordinator for wireless smart hardware, packing Zigbee 3.0, Thread, Matter controller capabilities, and Z-Wave Plus into a compact unit. It allows you to build home automations, monitor sensors, and control compatible gear through the SmartThings app for Android and iOS. For network connectivity, the hub provides both a 10/100 Mbps Fast Ethernet port and 2.4 GHz Wi-Fi, drawing power from an included AC adapter with a DC barrel jack.

## Who it suits

This hub suits Australian households already invested in Samsung SmartThings, or those who want to run automated routines across mixed Zigbee and Z-Wave accessories without managing separate bridges. It is also well matched to users introducing Matter and Thread accessories into a SmartThings setup, as Aeotec notes the hub functions as both a Matter controller and a Thread Border Router. It integrates with Google Assistant and Amazon Alexa for voice control, and according to third-party documentation, it can be linked into Home Assistant via cloud or Matter integrations.

However, it is not suited to households built strictly around Apple Home, as it lacks native Apple HomeKit integration and does not bridge non-Matter devices into the Apple ecosystem. Buyers looking for an entirely offline or local-only setup may also want to skip it, as initial setup and overall management remain tied to Samsung's cloud.

## Australian notes

When buying this hub locally, ensure you purchase the official Australian and New Zealand variant (model GP-AEOHUBV3AN). Aeotec's technical specifications confirm this model broadcasts on the 921.4 MHz frequency required for Australian Z-Wave Plus compliance. Importing a hub from North America or Europe will result in incompatible Z-Wave frequencies that will not pair with Australian Z-Wave wall switches or sensors.

Australian retailers, including JW Computers, supply the hub with a compliant Australian wall plug adapter, rated for 100–240 V AC at 50/60 Hz. The Wi-Fi radio operates solely on 2.4 GHz (WPA2), meaning dual-band Australian home routers must have a 2.4 GHz SSID available for wireless pairing. Warranty coverage includes a standard 12-month manufacturer warranty, with select local specialists like SmartHome Australia advertising extended store coverage.

## Sources

- https://aeotec.com/products/aeotec-smartthings-hub/
- https://aeotec.freshdesk.com/support/solutions/articles/6000240466-smart-home-hub-technical-specifications
- https://www.jw.com.au/product/aeotec-smart-things-hub
- https://www.smarthome.com.au/introducing-smartthings-map-view/
- https://www.diyhomeautomation.com.au/
- https://synced.com.au/learn/ecosystems/smartthings
- https://synced.com.au/learn/ecosystems/smartthings-vs-home-assistant
- https://www.pcworld.com/article/579806/aeotec-smart-home-hub-review.html
- https://www.smarthome.com.au/product/aeotec-smart-motion-sensor/
