---
name: 'WEM3050T WiFi Energy Meter'
brand: 'IAMMETER'
bestFor: 'Australian homeowners and solar owners seeking bidirectional three-phase energy tracking with local network integration for platforms like Home Assistant without mandatory subscription fees.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Draft: gemini-3.8-flash with Google Search grounding, 2026-10-06. Review before publishing.
match:
  - 'IAMMETER WEM3050T WiFi Energy Meter'
  - 'WEM3050T WiFi Energy Meter'
identifiers:
  model: 'WEM3050T'
  asin: ''
  ebayEpid: ''
pros:
  - 'Supports local control without mandatory cloud services via local REST API, MQTT, and Modbus/TCP, according to IAMMETER.'
  - 'Features bidirectional monitoring with Class 1 active energy measurement accuracy and includes three 150A split-core current transformers.'
  - 'Includes native Home Assistant integration alongside Amazon Alexa cloud support, according to the manufacturer.'
  - 'Compact two-pole DIN-rail mounting form factor designed for switchboard enclosures.'
cons:
  - 'Requires a neutral wire connection and cannot be installed on three-phase Delta wiring configurations, according to IAMMETER.'
  - 'Operates strictly on 2.4 GHz Wi-Fi with no RJ45 Ethernet port provided.'
  - 'Monitoring both three-phase grid consumption and three-phase solar generation simultaneously requires purchasing two separate meters.'
  - 'Lacks support for Apple Home, Google Home, Matter, and SmartThings.'
---

The IAMMETER WEM3050T is a Wi-Fi-enabled, bidirectional energy meter designed to monitor electricity consumption and solar generation. According to IAMMETER, the device mounts onto a standard two-pole DIN rail inside a switchboard and connects using three supplied 150 A split-core current transformers. It measures active energy to Class 1 accuracy (IEC62053-21) and provides operational data over local REST API, MQTT, or Modbus/TCP protocols. Power is drawn directly from the monitored mains lines across an operating phase voltage range of 80 V to 277 V AC, using a four-wire WYE configuration that requires a neutral connection.

## Who it suits
This meter suits homeowners with three-phase or single-phase electrical supplies who want detailed, local energy monitoring. Because IAMMETER provides open local APIs and native Home Assistant integration, it is particularly suitable for users running local home automation setups who prefer not to depend on third-party cloud services. IAMMETER also includes free lifetime access to its basic cloud tier and supports Amazon Alexa for basic cloud-connected monitoring.

Conversely, renters should skip this device because it requires physical integration into a switchboard. Households operating three-phase systems without a neutral wire (Delta configurations) cannot use the WEM3050T, according to manufacturer documentation. If your setup requires simultaneously monitoring both a three-phase grid intake and a three-phase solar inverter, IAMMETER notes you will need two separate WEM3050T meters, as each unit only accommodates three current clamps. Anyone looking for direct compatibility with Apple Home, Google Home, or Matter will also need to look elsewhere.

## Australian notes
Mains-connected switchboard equipment is generally work for a licensed electrician; check your state or territory's electrical safety regulator for local wiring rules. The meter operates within 80 V to 277 V phase voltage (140 V to 480 V line voltage), matching Australia's standard 230 V single-phase and 400 V three-phase supply.

Network communication relies solely on 2.4 GHz Wi-Fi (802.11b/g/n) via an external SMA antenna; there is no RJ45 Ethernet port, so your switchboard location must have adequate 2.4 GHz wireless coverage. IAMMETER does not operate a dedicated Australian website, and specific Australian warranty periods are not stated on the global specification sheet, meaning buyers on Amazon Australia or through authorised agents such as Alt-Tech should check retailer documentation to confirm warranty terms.

## Sources

- https://www.youtube.com/watch?v=6AO0hzK0nVc
- https://www.iammeter.com/docs/wem3050t-datasheet
- https://www.iammeter.com/newsshow/solar-monitoring-australia-save-electricity
- https://community.home-assistant.io/t/recommendation-for-solar-in-australia/994462
- https://www.desertcart.com.au/products/706055121-wem3050t-3-phase-split-phase-1-phase-wifi-energy-meter-150a-split-core-cts-real-time-power-monitoring-solar-pv-grid-energy-tracking-home-assistant-mqtt-support-cloud-local-monitor
- https://www.iammeter.com/contact
- https://www.iammeter.com/newsshow/3050t-promotion-202502
- https://www.iammeter.com/blog/wem3050t-home-energy-management-meter
- https://www.iammeter.com/newsshow/christmas-2025-firmware-gpt-update
- https://www.iammeter.com/sitemap
- https://www.desertcart.com.au/products/609497958-wem3050t-wifi-energy-meter-smart-home-energy-monitor-for-solar-power-monitoring-real-time-electricity-usage-compatible-with-alexa-multi-phase-support
- https://www.iammeter.com/quickstart/wem3050t-quickstart
