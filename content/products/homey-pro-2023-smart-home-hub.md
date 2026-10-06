---
name: 'Pro (2023) Smart Home Hub'
brand: 'Homey'
bestFor: 'Multi-ecosystem smart home setups requiring centralised local automation across Zigbee, Z-Wave, Matter, Thread, and legacy 433 MHz devices.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Homey Pro (2023) Smart Home Hub'
  - 'Pro (2023) Smart Home Hub'
identifiers:
  model: 'HOMEY-PRO'
  asin: ''
  ebayEpid: ''
pros:
  - 'Athom integrates eight wireless technologies, including Zigbee, Z-Wave Plus, 433 MHz, Infrared, Matter, and Thread.'
  - 'Automations and Flow routines run locally on the hub, maintaining function during internet dropouts.'
  - 'Includes access to visual Advanced Flows without ongoing software subscription fees.'
  - 'Features dual-band Wi-Fi (2.4 GHz and 5 GHz) and provides built-in free local backups to a computer.'
cons:
  - 'Lacks an onboard RJ45 Ethernet port, requiring a separate proprietary USB-C adapter for wired networking.'
  - 'Community app ecosystem and multi-protocol setups require more configuration time than plug-and-play voice assistant hubs.'
  - 'Automated cloud backups require an optional paid subscription, though local backups remain free.'
---

The Homey Pro (2023) is a multi-protocol smart home hub created by Athom to unite devices from competing brands into a single local-first operating system. Rather than locking homes into one standard, the puck-shaped hub incorporates radios for Zigbee, Z-Wave Plus (700 series), 433 MHz RF, Infrared, Bluetooth Low Energy, and dual-band Wi-Fi (2.4 GHz and 5 GHz). It also functions as a Matter controller and Thread Border Router. Athom reports compatibility with more than 50,000 products across 1,000 brands using downloadable integrations from the Homey App Store. Automations run locally via Homey Flow and the web-based Advanced Flow canvas, keeping routines operating on-premises without relying on external cloud servers.

## Who it suits

Homey Pro suits smart home enthusiasts and households managing a broad collection of wireless hardware across different generations. If your home mixes 433 MHz window blinds, infrared air conditioners, Australian Z-Wave wall switches, and newer Zigbee or Matter lighting, this hub coordinates them without requiring multiple separate vendor bridges. It is especially appealing for users who want multi-branch automation logic and local processing, but do not want to build or manage an open-source home server.

Households running a modest setup focused exclusively on standard Wi-Fi or Matter accessories should skip the Homey Pro, as free native ecosystems from Apple, Google, or Amazon can manage those devices without a dedicated hub investment. Additionally, users who require a hardwired network connection straight out of the box will need to factor in the separate official USB-C Ethernet adapter, as the hub does not include an integrated RJ45 jack.

## Australian notes

The Homey Pro is powered via a 5V/2A USB-C connection. Athom notes that the internal Z-Wave radio automatically configures to the Australian and New Zealand 921.4 MHz frequency during geographic setup, ensuring compliance and compatibility with locally certified Z-Wave sensors and relays. 

If you plan to use Homey Pro to automate hardwired smart switches, dimmers or in-wall relays, installing those is generally work for a licensed electrician; check your state's electrical safety regulator for what applies. The hub connects to Google Assistant, Amazon Alexa, and Apple Siri Shortcuts for hands-free voice control. Standard remote access and local PC or Mac backups are included at no extra charge, with cloud backups offered as an optional paid add-on.

## Sources

- https://homey.app/en-au/homey-pro/
- https://www.smarthome.com.au/an-introduction-to-homey/
- https://support.homey.app/hc/en-us/articles/360015447093-Homey-Pro-models-compared
- https://files.bbystatic.com/NDktHG9Aar5dCDnksCaRTw%3D%3D/Spec%2BSheet
- https://www.cryovex.com/homey-pro-2023-smart-home-hub-review/
- https://support.homey.app/hc/en-us/articles/27220202512412-Homey-Pro-Early-2019-and-Homey-Pro-2023-2026-compared
- https://homey.app/en-au/wiki/how-z-wave-works-technical-deep-dive/
- https://trade.smarthome.com.au/product/homey-pro-2023/
- https://community.homey.app/t/manual-z-wave-frequency-selection-for-homey-2023/91042
- https://efobasen.no/produkt/4500787/Produktblad
