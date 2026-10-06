---
name: 'Hub M3 Matter & Zigbee Coordinator'
brand: 'Aqara'
bestFor: 'Smart-home owners wanting a multi-protocol hub to link Aqara Zigbee sensors and Matter accessories locally across Apple Home, Google Home, or Home Assistant.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Aqara Hub M3 Matter & Zigbee Coordinator'
  - 'Hub M3 Matter & Zigbee Coordinator'
identifiers:
  model: 'HM-G01D'
  asin: ''
  ebayEpid: ''
pros:
  - 'Operates as a Matter Controller, Matter Bridge, Thread Border Router, and Zigbee 3.0 coordinator according to Aqara specifications.'
  - 'Features 8 GB of encrypted local eMMC storage and a dual-core processor to run automations locally without requiring a subscription.'
  - 'Supports both dual-band Wi-Fi (2.4 GHz and 5 GHz) and wired Ethernet with Power over Ethernet (PoE 802.3af).'
  - 'Includes a 360-degree infrared transceiver with air conditioner status detection and a built-in 95 dB speaker.'
cons:
  - 'Direct Zigbee child-device pairing is restricted strictly to Aqara-branded accessories.'
  - 'Does not include an Australian USB wall power adapter in the retail packaging.'
  - 'Lacks hardware support for Z-Wave devices.'
  - 'Cloud connection is still required for remote push notifications, weather triggers, and geofencing.'
---

The Aqara Hub M3 (model HM-G01D) is a central smart-home gateway designed to connect and bridge multiple protocols. According to Aqara's technical documentation, the hub functions as a Matter Controller, Matter Bridge, Thread Border Router, and Zigbee 3.0 coordinator. It is powered by a 1 GHz dual-core ARM Cortex-A7 processor and 8 GB of encrypted eMMC storage, which the manufacturer states handles local edge processing and automation execution without a subscription fee. Network connectivity is supported through dual-band Wi-Fi (2.4 GHz and 5 GHz with WPA3) or a wired RJ45 Ethernet connection, alongside Bluetooth 5.1, an integrated 95 dB speaker, and a 360-degree infrared transceiver capable of learning air conditioner remote commands.

## Who it suits

This hub suits households that utilise Aqara Zigbee sensors and want to integrate them alongside newer Thread and Matter accessories across platforms like Apple Home, Google Home, Amazon Alexa, SmartThings, and Home Assistant. Because it acts as both a Matter Controller and a Thread Border Router, it works well for users aiming to keep automations local rather than relying entirely on cloud services. It is also useful for homes with split-system air conditioners or audiovisual equipment that can be controlled via infrared. Conversely, Aqara specifies that third-party sub-devices cannot pair directly over Zigbee, as direct Zigbee pairing is restricted to Aqara accessories. Households with existing Z-Wave hardware should also skip this model, as it contains no Z-Wave radio.

## Australian notes

Australian listings from retailers including Officeworks, Mobileciti, and Apple Store Australia confirm that the Hub M3 is covered by a 12-month manufacturer warranty. The unit is powered via a 5V 2A USB-C port or 48V Power over Ethernet (PoE 802.3af). Aqara includes a one-metre USB-A to USB-C cable in the box, but no wall power adapter is supplied. Australian buyers must provide their own standard 5V 2A USB power plug or connect the hub to an active PoE switch. For wireless setups, the presence of 5 GHz Wi-Fi assists in busy residential areas where the 2.4 GHz band is crowded. If you intend to run in-wall Ethernet cabling to use the hub's PoE capability, verify licensing requirements with your state's electrical safety regulator before undertaking permanent cabling work.

## Sources

- https://www.aqara.com/en/product/hub-m3-specs/
- https://www.aqarastore.com.au/pages/aftersales
- https://www.apple.com/au/shop/product/hs9j2zm/a/aqara-hub-m3-router
- https://www.officeworks.com.au/shop/officeworks/p/aqara-hub-m3-aqhmg01d
- https://www.mobileciti.com.au/aqara-hub-m3-hm-g01d-black
- https://us.aqara.com/products/hub-m3
- https://www.home-assistant.io/blog/2024/09/03/aqara-joins-works-with-home-assistant/
- https://www.reddit.com/r/Aqara/comments/1cpi1aw/official_ama_aqara_m3_thirdparty_device_support/
- https://forum.aqara.com/t/from-zigbee-to-matter-part-2/156672
- https://www.aqarahome.nz/Products/Hub_M3.html
