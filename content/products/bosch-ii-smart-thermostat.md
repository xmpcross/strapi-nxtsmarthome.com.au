---
name: 'Ii Smart Thermostat'
brand: 'Bosch'
bestFor: 'Smart home enthusiasts running Zigbee or Bosch ecosystems who manage European-style heating setups and need wall-mounted climate monitoring.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Bosch Ii Smart Thermostat'
  - 'Ii Smart Thermostat'
identifiers:
  model: 'BTH-RM / BTH-RM230Z'
  asin: ''
  ebayEpid: ''
pros:
  - 'Equipped with an LED matrix display and built-in sensors for temperature and relative humidity according to Bosch.'
  - 'Operates without subscription fees for schedules, automations, and app control per manufacturer specifications.'
  - 'Supports Matter, Apple Home, Google Assistant, and Alexa via the Bosch Smart Home Controller, as well as direct Zigbee integration with Home Assistant.'
  - 'Offered as a battery-powered model running on four standard AAA batteries or as a hardwired 230 V model.'
cons:
  - 'Not officially sold or supported by Bosch in Australia, leaving grey-market imports without local warranty support.'
  - 'Designed for European radiator and underfloor heating setups rather than standard Australian 24 V ducted or reverse-cycle HVAC systems.'
  - 'Lacks built-in Wi-Fi and requires a separate Bosch Smart Home Controller or Zigbee 3.0 coordinator to function.'
---

The Bosch Smart Home Thermostat II (models BTH-RM and BTH-RM230Z) is a wall-mounted climate interface fitted with internal temperature and humidity sensors. According to Bosch, the thermostat features an LED matrix display and an integrated status light band. It communicates via Zigbee 3.0 across 2.4 GHz rather than Wi-Fi. The device is produced in two distinct hardware versions: a standalone battery model powered by four AAA alkaline batteries, and a flush-mounted 230 V mains unit designed for wall-box installation. Both versions monitor room conditions and transmit data to a connected platform, though neither provides standalone smart features without a compatible controller or Zigbee hub.

## Who it suits

This device suits advanced smart home users who manage a Zigbee coordinator—such as Home Assistant via Zigbee2MQTT or ZHA—and want a clean, wall-mounted display for environmental data. It also suits Australian properties fitted with imported hydronic heating, European-style water underfloor heating, or radiator valves compatible with Bosch switching relays. If you already operate a Bosch Smart Home Controller II, the unit integrates into Apple Home, Amazon Alexa, Google Home, and Matter ecosystems.

Conversely, standard Australian households should skip this thermostat. Bosch states it is tailored for European heating systems, meaning it is not directly compatible with standard Australian 24 V multi-stage ducted systems or common reverse-cycle split-system air conditioners. Buyers who do not own a compatible Zigbee bridge or Bosch hub will also find the smart automations inaccessible.

## Australian notes

Bosch Australia does not officially distribute or market the Smart Home Thermostat II lineup locally. Mainstream Australian retailers do not stock the device, meaning units circulating locally are grey-market imports. Consequently, there is no official Australian manufacturer warranty available through local channels.

The wireless protocol uses Zigbee 3.0 on standard 2.4 GHz channels and does not connect directly to home Wi-Fi networks.

For anyone considering the mains-wired BTH-RM230Z version, Australian electrical compliance rules apply; check your state's electrical safety regulator regarding mandatory mains installation by a licensed electrician. Renters should opt against mains electrical modifications and review their local residential tenancy authority before affixing hardware to walls.

## Sources

- https://www.youtube.com/watch?v=zBArgQVfXcI
- https://www.bosch-smarthome.com/at/de/produkte/heizung/raumthermostat/
- https://www.desertcart.com.au/products/526325025-bosch-smart-home-room-thermostat-ii-for-controlling-smart-radiator-thermostats
- https://www.ebay.com.au/itm/298692781561
- https://www.bosch-smarthome.com/de/de/support/hilfe/hilfe-zum-produkt/hilfe-zum-raumthermostat-2/
- https://www.bosch-smarthome.com/res/web/produkt/raumthermostat2_230/pdf/8-750-002-893_RT_II_230V_OM_11L_V001_240205.pdf
- https://www.bosch-smarthome.com/gb/en/eu-data-act/
- https://www.reichelt.com/de/en/shop/product/room_thermostat_ii_230v-369237
- https://www.bosch-smarthome.com/gb/en/support/help/product-help/room-thermostat-2-help/
- https://tt-smarthome.resource.bosch.com/nrt/web/produkt/raumthermostat2_230/pdf/BOSCH_22_0026_Raumthermostat_II_230V_EN_V003_Web.pdf
- https://community.smartthings.com/t/bosch-roomthermostaat-ii-230-v/305850
- https://www.zigbee2mqtt.io/devices/BTH-RM230Z.html
