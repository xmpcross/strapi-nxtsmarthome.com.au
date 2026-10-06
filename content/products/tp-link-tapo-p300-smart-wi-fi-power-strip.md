---
name: 'Tapo P300 Smart Wi-Fi Power Strip'
brand: 'TP-Link'
bestFor: 'Australians wanting individually controlled smart power outlets compatible with Apple Home, Google Home, and Alexa without requiring a separate smart hub.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'TP-Link Tapo P300 Smart Wi-Fi Power Strip'
  - 'Tapo P300 Smart Wi-Fi Power Strip'
identifiers:
  model: 'Tapo P300'
  asin: ''
  ebayEpid: ''
pros:
  - 'Three AC outlets can be controlled individually via the Tapo app, voice assistants, or dedicated physical buttons.'
  - 'Native platform support for Apple Home, Google Home, and Amazon Alexa out of the box without needing a bridge.'
  - 'Includes one USB-C and two USB-A fast-charging ports supporting up to 18W when used individually.'
  - 'Equipped with built-in surge, overload, and overheat protection alongside Australian RCM certification.'
cons:
  - 'The three USB ports are always on and cannot be switched off, scheduled, or automated in the app.'
  - 'Does not include energy monitoring to track appliance power usage or electricity costs.'
  - 'Lacks Matter support and is limited strictly to 2.4 GHz Wi-Fi networks.'
  - 'Shared USB power drops to 15W total across all ports when multiple USB devices are connected at once.'
---

The TP-Link Tapo P300 is a Wi-Fi power strip featuring three individually controlled Australian mains sockets and three fast-charging USB ports (one USB-C and two USB-A). According to TP-Link Australia, the unit connects directly to your home network without requiring an external hardware bridge. Each AC outlet features its own physical power button and LED indicator, backed by internal surge, overcurrent, and overload safety mechanisms.

## Who it suits

This board suits users looking to independently schedule desk equipment, bedside electronics, or home entertainment appliances. Because TP-Link provides native compatibility with Apple Home, Google Home, and Amazon Alexa, mixed-ecosystem households can integrate the strip into their chosen assistant. Samsung SmartThings connects via Tapo cloud integration, while Home Assistant works through community integrations. Renters also benefit from a completely portable setup that requires no permanent installation.

It is less suitable for users hoping to automate small USB-powered items such as LED light strips or USB desk fans. TP-Link documentation notes that all three USB ports remain permanently on and cannot be toggled via software or schedules. Households looking to monitor power draw or calculate running costs should also consider alternative hardware, as the P300 does not include energy monitoring features. Furthermore, the unit lacks Matter support, relying instead on direct platform integrations.

## Australian notes

TP-Link equips the Tapo P300 with an Australian standard Type I plug, a 1.5-metre cord, and Regulatory Compliance Mark (RCM) certification. The board is rated for 230–240 V at 50/60 Hz, with a maximum combined load of 10 A (2400 W). If you intend to connect high-draw appliances such as portable heaters, check your state's electrical safety regulator guidance regarding board loading to confirm you do not exceed the 10 A maximum capacity.

Networking is restricted to 2.4 GHz Wi-Fi (IEEE 802.11b/g/n), using Bluetooth strictly for initial onboarding in the Tapo app. For out-of-home control via Apple Home, TP-Link notes an Apple Home hub (such as an Apple TV or HomePod) is required. Core automations and remote access through the Tapo app do not require a paid subscription. In Australia, TP-Link backs the P300 with a two-year manufacturer warranty under its standard Smart Power policy.

## Sources

- https://www.tp-link.com/au/home-networking/smart-plug/tapo-p300/
- https://au.store.tapo.com/products/smart-wi-fi-power-strip-tapo-p300
- https://www.bunnings.com.au/tp-link-tapo-3-outlet-smart-wi-fi-power-strip-with-usb-outlets_p0531447
- https://www.jbhifi.com.au/products/tp-link-tapo-smart-wi-fi-power-strip
- https://www.officeworks.com.au/shop/officeworks/p/tp-link-tapo-3-outlet-smart-wifi-power-strip-tptapp300
- https://www.thegoodguys.com.au/tp-link-tapo-smart-wi-fi-power-strip-tapo-p300
- https://www.binglee.com.au/products/smart-wi-fi-power-strip-3-outlets-tapo-p300
- https://www.bigw.com.au/product/tp-link-tapo-3-outlet-smart-wi-fi-power-strip-with-usb-white-1-5m-tapo-p300/p/9903757581
- https://www.tp-link.com/au/document/41856/
- https://www.tapo.com/au/product/smart-plug/tapo-p300/
- https://www.tapo.com/au/faq/120/
- https://www.home-assistant.io/integrations/tplink/
