---
name: Zigbee 3.0 USB Dongle
brand: SONOFF
bestFor: Home Assistant, Zigbee2MQTT or openHAB users who want one local Zigbee coordinator for mixed-brand devices instead of a brand-specific hub
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
match:
  - SONOFF Zigbee 3.0 USB Dongle Plus
  - ZBDongle-E
identifiers:
  model: 'ZBDongle-E'
  asin: ''
  ebayEpid: ''
pros:
  - Home Assistant's ZHA documentation lists the ZBDongle-E (EFR32MG21 variant) among its recommended EZSP adapters, and Zigbee2MQTT lists it under its EmberZNet adapters
  - ITEAD says it works with ZHA, Zigbee2MQTT, openHAB, ioBroker, Domoticz and Jeedom, so Zigbee devices can be controlled locally without a vendor cloud
  - Powered from a USB port (ITEAD lists DC 5V, 100mA max), so there is no extra power adapter or mains plug to find a spot for
  - ITEAD says it can be reflashed as a Zigbee router, and Sonoff's dongle guide says Thread (OpenThread RCP) firmware is another option
cons:
  - Not a standalone hub - it needs a computer or single-board machine running Home Assistant, Zigbee2MQTT or similar software
  - ITEAD quotes 30 direct child devices in coordinator mode, so larger networks lean on mains-powered Zigbee routers
  - Windows and macOS need a USB serial driver, according to ITEAD
  - Several similarly named Sonoff dongles exist, so it is easy to buy a different variant from the one a guide assumes
---

This is a USB stick that turns a computer running open-source home automation software into a Zigbee coordinator. The catalogue entry describes the Sonoff ZBDongle-E, which ITEAD sells as the "Zigbee 3.0 USB Dongle Plus". Plug it into a Raspberry Pi, mini PC or home server and, according to ITEAD, it can act as the Zigbee gateway for Home Assistant, openHAB, Zigbee2MQTT and other platforms. You can then pair sensors, switches and bulbs from different brands to one network rather than buying each brand's own hub.

## Which dongle is this?

The name is confusing because Sonoff has sold several versions under nearly the same title. ITEAD's product pages list the ZBDongle-P, built on a TI CC2652P chip, and the ZBDongle-E, built on a Silicon Labs EFR32MG21. Amazon also lists a newer "Dongle Plus MG24" on the EFR32MG24 chip. The Amazon Australia listing is titled "ZBDongle E", which matches our catalogue description, so this page covers the E model. ITEAD says the E comes with Zigbee coordinator firmware based on EmberZNet (EZNet 6.10.3) and supports 30 direct child devices, plus more through Zigbee routers. Check the model code before buying, because setup guides for one variant do not always apply to another.

## Who it suits, and Australian notes

It suits people already running Home Assistant (ZHA or Zigbee2MQTT) or openHAB who want local control and are comfortable with some setup. If you want an app-driven hub that works out of the box with Alexa or Google Home, skip it. It has no app of its own and does nothing without host software.

There is no mains plug to worry about. ITEAD lists the power input as DC 5V at 100mA maximum over USB, so it runs from any Australian computer or USB power source. Home Assistant's ZHA documentation recommends plugging Zigbee adapters into a USB 2.0 port on a shielded USB extension cable, away from USB 3.0 devices and other interference. That matters in a cramped comms cupboard or behind an NBN box. ITEAD lists a 24-month limited warranty, but none of the sources checked name an Australian distributor, so warranty claims may go through the seller. Of the Australian retailers we checked, Amazon Australia lists it.

Running costs are just the power drawn by whatever device hosts it. The dongle needs no subscription.

**Alternatives in our catalogue:** the Aqara Hub M3 Matter & Zigbee Coordinator is a self-contained Aqara hub for people who would rather not run their own server. The Aqara Hub M2 Multi-Protocol Hub is another Aqara hub for households standardising on Aqara's app and sensors. The Tuya Smart Home Bridge is an app-driven bridge for the Tuya ecosystem.

## Sources

- https://itead.cc/product/zigbee-3-0-usb-dongle/
- https://itead.cc/product/sonoff-zigbee-3-0-usb-dongle-plus/
- https://dongle.sonoff.tech/guide/zbdongle-e/introduction/
- https://www.amazon.com.au/Gateway-Universal-Assistant-Zigbee2MQTT-Wireless/dp/B0B6P22YJC
- https://www.amazon.com/SONOFF-EFR32MG24-Controller-Assistant-Zigbee2MQTT/dp/B0FMJD288B
- https://www.home-assistant.io/integrations/zha/
- https://www.zigbee2mqtt.io/guide/adapters/
