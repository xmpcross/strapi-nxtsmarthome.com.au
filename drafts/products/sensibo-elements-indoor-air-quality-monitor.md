---
name: 'Elements Indoor Air Quality Monitor'
brand: 'Sensibo'
bestFor: 'Australian households wanting to track indoor PM2.5, TVOC, and temperature alongside existing Sensibo climate gear.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Draft: gemini-3.8-flash with Google Search grounding, 2026-10-06. Review before publishing.
match:
  - 'Sensibo Elements Indoor Air Quality Monitor'
  - 'Elements Indoor Air Quality Monitor'
identifiers:
  model: 'SEN-ELM-01'
  asin: ''
  ebayEpid: ''
pros:
  - 'Monitors six indoor parameters: PM2.5, calculated CO2 equivalent, TVOC, ethanol equivalent, temperature, and humidity.'
  - 'Integrated multi-colour LED gives quick visual feedback on room air quality.'
  - 'Integrates with Google Home, Amazon Alexa, SmartThings, and Home Assistant via cloud API.'
  - 'Core functions operate without a mandatory paid subscription.'
cons:
  - 'Uses calculated CO2 equivalent (CO2e) rather than a dedicated NDIR sensor.'
  - 'Lacks native Apple HomeKit and Matter support out of the box.'
  - 'No infrared blaster built in, requiring a separate Sensibo Air or Sky unit to control air conditioners.'
  - 'Requires constant mains power over micro-USB with no internal battery.'
---

The Sensibo Elements (model SEN-ELM-01) is a dedicated indoor air quality monitor designed to measure environmental conditions within residential spaces. According to Sensibo, the device monitors six individual parameters: PM2.5 particulate matter, TVOC (Total Volatile Organic Compounds), ethanol (EtOH equivalent), calculated CO2 equivalent (CO2e), ambient temperature, and relative humidity. It features a multi-colour LED light on the chassis that provides immediate visual feedback regarding ambient conditions, while an overall Air Quality Score is aggregated inside the Sensibo mobile application. Measuring 115 mm by 115 mm by 29 mm and weighing 139 grams, it is powered via a 5V/1A micro-USB port that must remain plugged in, as it contains no rechargeable battery.

## Who it suits

This device suits users who want to monitor indoor particulate levels, humidity, and temperature variations without requiring a paid subscription for basic operations. Sensibo notes that live tracking, history, and alerts are fully available on the free tier. It also fits homes already using the Sensibo ecosystem, as it can link with Sensibo Pure purifiers or trigger automations across Sensibo AC controllers via their PureBoost platform.

However, it will not suit buyers who need direct air conditioner control from the monitor itself. The Elements does not contain an infrared transmitter, meaning it cannot send commands to a split-system air conditioner without a separate controller like the Sensibo Sky or Air. Users looking for laboratory-grade carbon dioxide tracking should note that the device uses an inferred CO2 equivalent calculation derived from gas sensors rather than an NDIR optical sensor. It is also unsuitable for direct Apple HomeKit or Matter networks, as native support is absent and requires workarounds like HomeBridge.

## Australian notes

When purchased through local retailers such as JB Hi-Fi or authorized Australian distributor AppliancePro, the package includes an Australian-compatible wall plug for its 110–240V micro-USB power adapter. The Elements operates solely on 2.4 GHz Wi-Fi (802.11 b/g/n) and uses Bluetooth Low Energy during initial pairing, so users will need a compatible 2.4 GHz band enabled on their home router. Sensibo provides a standard one-year limited warranty, which applies alongside consumer guarantees under the Australian Consumer Law. Note that Sensibo's optional extended warranty program explicitly excludes this specific model.

## Sources

- https://sensibo.com/products/sensibo-elements
- https://support.sensibo.com/products/elements/
- https://appliancepro.com.au/warranty/
- https://catalogue.jbhifi.com.au/2024/01/11-01-bts/index.html
- https://warehouse.ampleair.com.au/products/sensibo-elements
- https://www.yoursmartlifestore.com.au/products/sensibo-elements
- https://m.media-amazon.com/images/I/B1KG2U9BIXL.pdf?ref=dp_product_quick_view
- https://www.ubuy.co.tz/en/product/81604BRN2-sensibo-elements-smart-wifi-air-quality-monitor-humidity-meter-co-detector-air-pollution-indicator-co-monitor-temperature-sensor
- https://support.sensibo.com/products/sky/
- https://support.sensibo.com/community-integrations/homebridge-homekit/
