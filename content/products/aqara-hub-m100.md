---
name: 'Hub M100'
brand: 'Aqara'
bestFor: 'Australians wanting a compact USB-powered Thread Border Router and Zigbee bridge to run local Aqara automations across Apple Home, Google Home, or Home Assistant.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Aqara Hub M100'
  - 'Hub M100'
identifiers:
  model: 'HM-G02D'
  asin: ''
  ebayEpid: ''
pros:
  - 'Operates as both a Matter Bridge and Matter Controller, alongside Thread Border Router functionality.'
  - 'Aqara states that automations for connected Zigbee and Thread sub-devices execute locally across your LAN without active internet.'
  - 'Compact USB stick design with a rotating hinge that draws power from any standard 5V USB-A port.'
  - 'Exposes supported Aqara devices to Apple Home, Google Home, Amazon Alexa, SmartThings, and Home Assistant via Matter.'
cons:
  - 'According to the Aqara Help Center, it pairs only with Aqara Zigbee sub-devices and rejects third-party Zigbee hardware.'
  - 'Limited to a maximum capacity of 40 child devices, with an upper limit of 20 Zigbee accessories.'
  - 'Lacks 5 GHz Wi-Fi support and does not include a standalone AC wall plug in the box.'
---

The Aqara Hub M100 (model HM-G02D) is a compact smart home coordinator built in a USB dongle form factor with a 210-degree adjustable hinge. According to Aqara, the device functions simultaneously as a Matter Bridge, Matter Controller, and Thread Border Router or mesh extender. Hardware radios include Zigbee 3.0, Thread, Bluetooth Low Energy 5.2, and 2.4 GHz Wi-Fi 6 with WPA3 encryption. Aqara notes that connected Zigbee and Thread accessories can execute automation rules locally across the local area network (LAN) without cloud servers, though push alerts still require an active internet connection.

## Who it suits

This hub suits Australian households looking to integrate Aqara sensors and accessories into broader multi-platform systems. Because it operates as a Matter Bridge, connected sub-devices can be passed through to Apple Home, Google Home, Amazon Alexa, Samsung SmartThings, and Home Assistant. It also suits renters or homeowners who prefer a low-profile installation, as it plugs directly into an existing USB-A port on a power board, router, or wall charger rather than taking up a full Australian double power point. However, households with larger installations should consider the capacity ceiling. Aqara documentation and Officeworks listings confirm the M100 supports a maximum of 40 child devices, with a limit of up to 20 Zigbee devices. Anyone planning to expand beyond that volume, or hoping to pair third-party Zigbee accessories from other brands, should look elsewhere because the hub only communicates with proprietary Aqara Zigbee hardware.

## Australian notes

The Aqara Hub M100 does not include a standalone Australian AC power plug. The product manual specifies that it requires 5V ⎓ 0.5A power via its integrated male USB-A connector, meaning buyers must supply a standard USB-A wall charger or plug it into a powered USB port on existing household equipment. For networking, the hub connects exclusively over 2.4 GHz Wi-Fi; it does not support 5 GHz Wi-Fi bands, and Aqara documentation notes it does not operate as a Wi-Fi repeater like the previous Hub E1. Local retailer listings, including Officeworks and Mobileciti, list the product with a 12-month manufacturer warranty. Bridging accessories into third-party ecosystems like Google Home or Apple Home still requires an active Matter controller compatible with that respective platform.

## Sources

- https://www.matteralpha.com/aqara/aqara-hub-m100-p2150
- https://www.aqarastore.com.au/products/aqara-hub-m100
- https://www.officeworks.com.au/shop/officeworks/p/aqara-hub-m100-aqhmg02d
- https://www.bunnings.com.au/aqara-white-smart-home-matter-zigbee-hub-m100_p0995127
- https://www.mobileciti.com.au/aqara-hub-m100
- https://www.mwave.com.au/products/aqara-m100-usba-smart-home-hub-ac90871
- https://www.bigw.com.au/product/aqara-all-in-one-hub-m100-white-white/p/9901000885
- https://store-support.aqara.com/products/hub-m100
