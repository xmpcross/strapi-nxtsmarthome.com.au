---
name: 'Smart AC Control V3+'
brand: 'Tado'
bestFor: 'Australian homeowners and renters wanting to add app and voice control to split-system air conditioning without modifying fixed electrical wiring.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Tado Smart AC Control V3+'
  - 'Smart AC Control V3+'
identifiers:
  model: 'SAC V3+ / 104179'
  asin: ''
  ebayEpid: ''
pros:
  - 'Integrates natively with Apple Home, Google Home, and Amazon Alexa, with local HomeKit pairing supported in Home Assistant.'
  - 'Onboard hardware sensors track room temperature, humidity, ambient light, and noise levels.'
  - 'Powered via a standard 5V USB connection, eliminating the need for hardwired electrical trades.'
  - 'Includes weather adaptation and scheduled timer settings within the free base app.'
cons:
  - 'Requires a paid Auto-Assist subscription for automated geofencing and open-window switching; unpaid tiers only send push prompts.'
  - 'Requires direct line of sight to the air conditioner and cannot synchronise status if the original physical remote is used.'
  - 'Incompatible with 5 GHz Wi-Fi networks and remotes lacking a full-state LCD screen.'
  - 'Lacks native Matter support and native Samsung SmartThings integration.'
---

The tado° Smart AC Control V3+ is an infrared-based controller designed to manage split-system air conditioners and heat pumps through a smartphone application or voice assistant. According to tado°, the unit measures 100 × 100 × 15 mm, weighs 73 g, and features a capacitive touch display with an LED matrix. Internally, it includes sensors for temperature, humidity, ambient light, and ambient noise. Rather than hardwiring into the heating and cooling equipment, the device emits infrared signals directly to the air conditioner's receiver, mimicking a handheld remote. It is powered via an included 1,850 mm USB cable connected to a 5V power adapter.

## Who it suits

This controller suits households wanting remote climate scheduling or voice management across Apple Home, Google Home, and Amazon Alexa ecosystems. Because it relies on external line-of-sight infrared commands rather than internal control board connections, it is particularly relevant for renters seeking a non-invasive upgrade. According to the tado° Help Center, compatibility is restricted to air conditioning units whose original remotes feature a full-state LCD screen displaying current modes and target temperatures. Households considering this device should be aware of several operational limitations. Automated geofencing and automated open-window shutoff require an optional paid Auto-Assist subscription; without it, the app only delivers push notifications prompting manual adjustment. Furthermore, each unit controls only a single air conditioner, and the system cannot detect status changes made using the manufacturer's physical remote control, which can leave displayed states out of sync.

## Australian notes

In Australia, the Smart AC Control V3+ connects to regular mains power points using the supplied 5V USB power adapter. Renters considering mounting the unit to a wall should check their tenancy agreement before installing adhesive strips or brackets. The device operates exclusively on 2.4 GHz Wi-Fi bands (IEEE 802.11 b/g/n), meaning Australian dual-band routers must have an active 2.4 GHz network available. Local stockists include retailers such as Harvey Norman and Domotic Australia, and purchases made through authorised Australian retailers carry a 2-year limited manufacturer warranty supported by Australian Consumer Law. Note that the V3+ does not support Matter or native Samsung SmartThings connectivity, though local integration remains possible via Home Assistant's HomeKit Device integration.

## Sources

- https://shop.tado.com/en/products/smart-ac-control-v3
- https://www.nimbullsmarthome.com.au/products/tado-smart-ac-control-v3
- https://www.shanethegamer.com/news/tado%E0%A5%A6-launches-smart-ac-control-v3-in-anz/
- https://www.harveynorman.com.au/tado-smart-ac-control-v3.html
- https://www.domotic.com.au/product-page/tado-smart-ac-control-v3
- https://groupsumi.be/en/climate-control/air-conditioning/air-conditioning-accessories/tado-v3-universal-wifi-controller-for-air-conditioner-sac-v3
- https://www.u-buy.com.au/productde/IDVKWCFY4-tado-smart-air-conditioning-control-v3-with-stand-control-air-conditioning-digitally-via-app-optimal-indoor-climate-save-energy-easy
- https://support.tado.com/en/articles/3454907-which-air-conditioners-are-supported-by-the-smart-ac-control
- https://www.reddit.com/r/HomeKit/comments/1do4816/tado_smart_ac_control_v3/
- https://shop.tado.com/en-row/products/smart-thermostat-x-starter-kit-1
- https://apps.apple.com/hk/app/tado/id574418486?l=en-GB&platform=ipad
