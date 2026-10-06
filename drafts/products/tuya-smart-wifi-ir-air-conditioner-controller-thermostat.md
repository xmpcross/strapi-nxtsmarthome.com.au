---
name: 'Smart Wifi IR Air Conditioner Controller Thermostat'
brand: 'Tuya'
bestFor: 'Australians wanting app and voice control for a split-system or portable air conditioner using standard 2.4 GHz Wi-Fi, without paying for a cloud subscription.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Draft: gemini-3.8-flash with Google Search grounding, 2026-10-06. Review before publishing.
match:
  - 'Tuya Smart Wifi IR Air Conditioner Controller Thermostat'
  - 'Smart Wifi IR Air Conditioner Controller Thermostat'
identifiers:
  model: 'S16 / TOL-H46235'
  asin: ''
  ebayEpid: ''
pros:
  - 'According to retail listings, it includes a touchscreen LCD with proximity-sensing backlight and integrated temperature and humidity sensors.'
  - 'Tuya product specifications confirm it requires no recurring subscription fees for remote access, scheduling, or app controls.'
  - 'Marketplace documentation states it supports five operational modes and four fan speeds over a 10-metre infrared range.'
  - 'Retail specifications confirm compatibility with Amazon Alexa and Google Assistant voice platforms.'
cons:
  - 'Tuya platform documentation confirms IR communication is one-way, meaning it loses state synchronisation if the original remote is used.'
  - 'Product listings confirm the unit requires continuous USB power, has no battery, and does not include a USB-A wall adapter.'
  - 'Retail specifications state it does not support 5 GHz Wi-Fi, Apple Home, Matter, or SmartThings platforms.'
---

The Tuya Smart Wifi IR Air Conditioner Controller Thermostat (OEM model S16, retail SKU TOL-H46235) is an infrared bridge designed to bring voice and mobile automation to traditional mini-split and portable air conditioners. According to Australian marketplace listings on Kogan and Dick Smith, the compact 80 mm square unit features a touchscreen LCD display with a proximity-sensing backlight, as well as integrated sensors that monitor ambient room temperature and relative humidity.

## Who it suits
This controller suits homeowners and renters seeking scheduled automation or voice control for an infrared-controlled air conditioner without replacing the cooling unit. Retail data confirms compatibility with Amazon Alexa and Google Assistant, allowing users to adjust temperature presets, change fan speeds, and toggle between heating and cooling modes via the Tuya Smart or Smart Life mobile applications without paying ongoing subscription fees.

It is less suited to households invested in Apple Home, Matter, or Samsung SmartThings ecosystems, as documentation confirms none of these platforms are supported. Enthusiasts using Home Assistant should also take note: community documentation indicates that the official Tuya integration does not natively expose Tuya IR climate sub-devices, necessitating complex workarounds. Furthermore, Tuya's specifications note that infrared communication is strictly one-way. If someone adjusts the air conditioner using its original handheld remote, the controller cannot detect the change, resulting in out-of-sync status reporting in the application.

## Australian notes
In Australia, the controller requires connection to a 2.4 GHz Wi-Fi network; retail specifications confirm that 5 GHz Wi-Fi frequencies are unsupported, which may require separating network bands on standard Australian NBN routers. The unit is powered by a continuous DC 5V / 1A connection via an included 1.5-metre USB cable. However, product manuals state that an Australian USB-A wall charger is not supplied in the box, meaning users must supply their own standard plug adapter.

Because the hardware runs on low-voltage USB power and uses line-of-sight infrared, it requires no fixed electrical work or tenancy modifications. If you have questions regarding rental modifications, check your state or territory residential tenancy authority. With Tuya operating as an OEM technology platform rather than a direct consumer brand, warranty claims and support are handled through retail marketplace sellers under Australian Consumer Law and respective retailer customer charters.

## Sources

- https://solution.tuya.com/projects/CMa8f7dk0e3sb7
- https://www.kogan.com/au/buy/toolsestore-tuya-smart-wifi-ir-air-conditioner-controller-thermostat-with-lcd-display-app-control-temperature-humidity-sensor-monitor-compatible-with-alexa-google-home-for-mini-split-portable-ac-h46235/
- https://www.dicksmith.com.au/da/buy/toolsestore-tuya-smart-wifi-ir-air-conditioner-controller-thermostat-with-lcd-display-app-control-temperature-humidity-sensor-monitor-compatible-with-alexa-google-home-for-mini-split-portable-ac-h46235/
- https://tuya-smarthome.co.za/shop/smart-air-conditioner-control-thermostat-wifi-tuya-smart-life/
- https://moeshouse.com/products/wifi-ir-thermostat-with-ac-remote-and-sensor
- https://m.banggood.com/S16-Pro-Tuya-WiFi-AC-Thermostat-with-LCD-Display-Universal-Air-Conditioner-IR-Remote-Controller-Smart-Life-Temperature-Thermostat-Built-in-Temperature-Humidity-Sensor-p-2026233.html
- https://manuals.plus/asin/B0DX28ZBC3
