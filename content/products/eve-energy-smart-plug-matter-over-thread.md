---
name: 'Energy Smart Plug (Matter over Thread)'
brand: 'Eve'
bestFor: 'Australian smart home setups using Matter and Thread looking for local energy monitoring without account registrations or cloud dependencies.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Eve Energy Smart Plug (Matter over Thread)'
  - 'Energy Smart Plug (Matter over Thread)'
identifiers:
  model: '20ECF6001'
  asin: ''
  ebayEpid: ''
pros:
  - 'Operates over Thread and acts as a Full Thread Device router node to extend mesh network range, according to Eve.'
  - 'Native Matter support enables local control across Apple Home, Google Home, Amazon Alexa, Samsung SmartThings, and Home Assistant.'
  - 'Provides real-time power consumption tracking with no cloud account or subscription required, per retailer and manufacturer specifications.'
  - 'Features a standard Australian 3-pin plug rated for 240 V and up to 2,500 W (11 A), confirmed by Australian retailer listings.'
cons:
  - 'Requires a separate Matter Controller and Thread Border Router, as confirmed by Eve, and cannot connect directly to standard Wi-Fi.'
  - 'Historical energy tracking and cost calculations require specific platforms like the Eve app or Home Assistant rather than standard third-party Matter interfaces, according to Eve.'
  - 'Restricted to indoor use with an operating temperature threshold between 0 °C and 35 °C, per retailer documentation.'
---

Eve Energy (model 20ECF6001) is a single-outlet smart plug that connects using Matter over Thread rather than standard Wi-Fi. According to manufacturer specifications from Eve, the device operates as a Full Thread Device, functioning as a router node to extend your home's Thread mesh network while keeping standby power consumption below 1 W. It provides physical push-button control with an integrated LED indicator, on-device autonomous scheduling, and built-in energy monitoring to measure real-time power draw on connected household appliances.

## Who it suits

This plug suits homeowners and renters invested in cross-platform smart homes using Matter. According to Eve and Australian retailer listings from JB Hi-Fi and the Apple Store, the unit integrates with Apple Home, Google Home, Amazon Alexa, Samsung SmartThings, and is certified for Home Assistant. Because communication is local, it suits users who prefer not to create proprietary cloud accounts or pay subscriptions.

However, it does not suit households relying solely on standard Wi-Fi routers for their smart home accessories. Eve states that the smart plug requires an ecosystem hub that doubles as a Matter Controller and Thread Border Router (such as an Apple HomePod, Apple TV 4K, Google Nest Hub 2nd gen, or compatible SmartThings hub). Buyers looking for outdoor switching should also pass, as Australian retailer specifications restrict the unit to indoor use between 0 °C and 35 °C. Additionally, Eve notes that detailed historical energy tracking graphs depend on specific software, such as the Eve app or Home Assistant, rather than every basic Matter dashboard.

## Australian notes

Retailer listings from Cartridge World Australia and Apple confirm the local model uses a standard Australian 3-pin plug (Type I / AS/NZS 3112). It is rated for Australian mains power at AC 240 V, 50 Hz, handling a maximum load of 11 A or 2,500 W with an internal 12.5 A fuse. While older or generic catalogue listings might mention foreign plug formats, the Australian model matches domestic wall sockets directly. If you plan to connect high-draw heating or cooling appliances, check appliance specifications against the 2,500 W limit, and consult your state's electrical safety regulator if you have questions regarding circuits or loads. JB Hi-Fi confirms a 1-year manufacturer warranty, which applies alongside consumer protections under the Australian Consumer Law.

## Sources

- https://www.evehome.com/en/eve-energy
- https://www.evehome.com/en/identify-your-eve-accessory
- https://www.apple.com/au/shop/product/hqeq2ll/a/eve-energy-matter-smart-plug-power-meter-2-pack
- https://cartridgeworld.com.au/eve-energy-matter/
- https://www.jbhifi.com.au/products/eve-energy-matter
- https://www.evehome.com/en/eve-energy-outdoor
- https://www.evehome.com/en/eve-energy-works-with-home-assistant
- https://www.matteralpha.com/evehome/eve-energy-australia-p177
