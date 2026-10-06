---
name: 'Temperature and Humidity Sensor T1'
brand: 'Aqara'
bestFor: 'Smart home users with an existing Aqara hub or Zigbee setup wanting precise indoor climate monitoring and automated climate control without recurring subscription fees.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Draft: gemini-3.8-flash with Google Search grounding, 2026-10-06. Review before publishing.
match:
  - 'Aqara Temperature and Humidity Sensor T1'
  - 'Temperature and Humidity Sensor T1'
identifiers:
  model: 'TH-S02D'
  asin: ''
  ebayEpid: ''
pros:
  - 'Measures temperature, relative humidity, and atmospheric pressure using an industrial-grade Sensirion sensor.'
  - 'Operates on a replaceable CR2032 coin cell battery rated for two or more years of life.'
  - 'Integrates with Apple Home, Google Home, Amazon Alexa, and Matter via an Aqara hub, or Home Assistant via Zigbee.'
  - 'Provides real-time tracking, threshold alerts, and historical data logging without a paid subscription.'
cons:
  - 'Requires a compatible Aqara hub or third-party Zigbee 3.0 coordinator to function; does not connect directly via Wi-Fi.'
  - 'Lacks an integrated display screen, requiring a smartphone app or smart display to check readings.'
  - 'Designed strictly for indoor, non-condensing environments and carries no water-resistance rating.'
---

The Aqara Temperature and Humidity Sensor T1 (model TH-S02D) is a compact wireless climate monitor designed for indoor residential spaces. Measuring 36 × 36 × 9 mm and weighing 12 grams, the device monitors ambient temperature, relative humidity, and atmospheric pressure. According to Aqara and Australian retailer Officeworks, the unit uses an industrial-grade Sensirion sensor capable of detecting temperatures from -20 °C to 50 °C (with ±0.3 °C accuracy) and humidity levels between 0 and 100% RH (with ±3% accuracy). The sensor communicates over Zigbee 3.0, records historical readings to the Aqara Home app without an ongoing subscription, and supports over-the-air firmware updates.

## Who it suits
This sensor suits Australian households looking to automate heating, cooling, or ventilation around specific environmental triggers. For instance, Aqara notes that the sensor can trigger exhaust fans when humidity spikes, provided the environment remains non-condensing. It is well suited to renters and homeowners who already use an Aqara hub or a Zigbee 3.0 coordinator like Home Assistant, as it mounts with adhesive tape and requires no hardwiring. It will not suit users seeking a standalone gadget with direct Wi-Fi pairing, nor those who prefer a physical on-device display to view room conditions at a glance.

## Australian notes
Because the T1 runs entirely on an included CR2032 button cell battery—rated by Aqara for up to two years of life—it does not require Australian 230V mains power or an AC adapter. However, the device has no built-in Wi-Fi hardware and cannot communicate directly with a standard home router. Australian retailers like Officeworks and SmartHome Australia note that operating the T1 requires a compatible Zigbee 3.0 bridge. When paired with a Matter-enabled Aqara hub, it bridges into Matter, Apple Home, Google Home, and Amazon Alexa ecosystems. Third-party Zigbee setups, including Home Assistant, are also supported per retailer documentation. The sensor is backed by a 12-month manufacturer warranty from local retailers, alongside standard statutory protections under Australian Consumer Law. Because the unit lacks water resistance and is rated only for non-condensing indoor conditions, it should not be installed outdoors or directly exposed to shower spray.

## Sources

- https://www.aqara.com/en/product/temperature-and-humidity-sensor-t1/
- https://www.aqarastore.com.au/products/temperature-and-humidity-sensor
- https://www.officeworks.com.au/shop/officeworks/p/aqara-smart-temperature-and-humidity-sensor-t1-aqths02d
- https://www.smarthome.com.au/product/aqara-zigbee-temperature-humidity-sensor-t1/
- https://www.aqara.com/en/product/temperature-and-humidity-sensor-t1/temperature-and-humidity-sensor-t1-specs/
- https://www.bestbuy.com/product/t1-temperature-and-humidity-sensor-requires-aqara-hub-supports-apple-homekit-alexa-google-smartthings-white/JJ8RHCJC7R
- https://forum.aqara.com/t/aqara-temperature-and-humidity-sensor-t1-in-stock/316559
- https://www.aqarastore.com.au/pages/aftersales
