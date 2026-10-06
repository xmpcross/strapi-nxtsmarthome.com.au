---
name: 'Bridge Smart Home Automation Module'
brand: 'WiFi+RF'
bestFor: 'Australians wanting to connect basic 433 MHz fixed-code remote controls and sensors into app-based or voice-controlled smart systems.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Draft: gemini-3.8-flash with Google Search grounding, 2026-10-06. Review before publishing.
match:
  - 'WiFi+RF Bridge Smart Home Automation Module'
  - 'Bridge Smart Home Automation Module'
identifiers:
  model: 'RF BridgeR2'
  asin: ''
  ebayEpid: ''
pros:
  - 'Supports up to 16 RF devices with a maximum of 64 buttons or sensor alarms according to ITEAD Studio specifications'
  - 'Integrates with Google Home, Amazon Alexa, Samsung SmartThings, and Home Assistant via eWeLink platforms'
  - 'Provides onboard scheduling with support for up to 8 schedule, countdown, and loop timers'
  - 'Standard operation does not require a paid subscription, using the free eWeLink app'
cons:
  - 'Does not support rolling-code or dynamically encrypted 433 MHz equipment, excluding most modern automated garage doors'
  - 'Lacks bi-directional communication, meaning it cannot confirm the actual on or off status of connected RF appliances'
  - 'Requires a user-supplied 5V/1A USB power adapter and operates solely on 2.4 GHz Wi-Fi networks'
---

The SONOFF RF BridgeR2 (often catalogued as the WiFi+RF Bridge Smart Home Automation Module) is a compact bridge designed to translate 433.92 MHz radio frequency signals into Wi-Fi commands. Powered by a standard 5V Micro-USB connection, the bridge connects to a local 2.4 GHz Wi-Fi network to integrate legacy radio frequency remotes, passive infrared sensors, and door contacts into smart home platforms through the eWeLink app. According to manufacturer specifications from ITEAD Studio, the unit supports up to 16 sub-devices and can handle up to 64 individual buttons or sensor triggers. It also includes local scheduling logic, supporting up to 8 individual, countdown, or loop timers without requiring a paid subscription plan.

## Who it suits

This unit suits Australian homeowners and renters looking to bring older, non-smart 433 MHz hardware into modern app-based routines. If you have legacy fixed-code RF wall sockets, unencrypted basic alarm sensors, or standard RF remote controls using common chipsets such as PT2260 or EV1527, the bridge can capture and replicate those signals. It is also well suited to DIY enthusiasts who use platforms like Home Assistant, as it can connect via official eWeLink integrations or community add-ons. It is compatible with voice control via Google Home and Amazon Alexa, as well as Samsung SmartThings.

However, it is not suitable for properties relying on modern garage door openers or secure gate remotes. Manufacturer documentation confirms the hardware only recognises fixed-code transmissions and cannot decode or broadcast rolling codes. Buyers seeking two-way feedback will also need to look elsewhere, as simple 433 MHz signals do not report whether an appliance actually switched on or off.

## Australian notes

The bridge is powered via a standard DC 5V/1A Micro-USB port, but it does not ship with an Australian wall adapter. You will need to supply an existing standard USB charger. Because the device connects only via 2.4 GHz 802.11 b/g/n Wi-Fi, modern Australian dual-band or mesh routers must have a 2.4 GHz band enabled for initial pairing.

There is no dedicated Australian manufacturer portal, with stock primarily supplied through online marketplaces and importers. When buying from Australian retailers, consumer guarantees apply under Australian Consumer Law, but check the retailer's stated warranty return process before purchasing. Renters will appreciate that the unit is entirely standalone and does not require any fixed electrical wiring.

## Sources

- https://itead.cc/product/sonoff-rf-bridge-433/
- https://www.kogan.com/au/buy/dsport-sonoff-rf-bridger2-433mhz-rf-bridge-smart-gateway-with-app-control-smart-rf-hub-compatible-with-googlealexasmartthings-geek15566/
- https://endeavourtrades.com.au/products/sonoff-rf-bridge-wifi-smart-switch-replace-433mhz-remotes
- https://www.ebay.com.au/itm/236872522148
- https://www.ozbargain.com.au/node/336673
- https://neilturner.me.uk/2024/06/23/sonoff-wi-fi-rf-bridge-review/
- https://www.facebook.com/groups/ewelinkandsonoff/posts/1498809290685945/
