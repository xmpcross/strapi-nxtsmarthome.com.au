---
name: 'Pro 4PM 4-Channel DIN Rail Relay'
brand: 'Shelly'
bestFor: 'Homeowners wanting switchboard-level automation and individual power metering for up to four single-phase circuits via Home Assistant, Wi-Fi, or Ethernet.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Shelly Pro 4PM 4-Channel DIN Rail Relay'
  - 'Pro 4PM 4-Channel DIN Rail Relay'
identifiers:
  model: 'SPSW-004PE16EU / SPSW-104PE16EU'
  asin: ''
  ebayEpid: ''
pros:
  - 'Independent real-time power metering across four channels, supporting up to 16 A per channel and 40 A total device capacity.'
  - 'Flexible connectivity featuring 2.4 GHz Wi-Fi, wired Ethernet (RJ45), and Bluetooth 4.2.'
  - 'Integrated 1.8-inch colour display with navigation buttons for direct local monitoring and manual control.'
  - 'Extensive local control capabilities, including native Home Assistant integration, local web server, webhooks, MQTT, and custom mjS scripting.'
  - 'Operates without any subscription fees for cloud access, schedules, or local automations.'
cons:
  - 'Strictly limited to single-phase mains power; all four channels must share the same phase.'
  - 'Outputs switch line voltage directly with no potential-free (dry) contacts.'
  - 'Inductive loads (such as exhaust fans or LED drivers) require an external RC snubber to prevent switch damage.'
  - 'Lacks native out-of-the-box support for Apple Home and Matter.'
---

The Shelly Pro 4PM is a four-channel smart relay module designed to mount directly onto a standard DIN rail inside an electrical switchboard. According to Shelly Europe, it features a switching capacity of up to 16 A per channel, with an overall device maximum of 40 A. Unlike standard in-wall relays, the unit incorporates a 1.8-inch colour graphic display and three physical navigation buttons on its faceplate, allowing users to inspect circuit status, view real-time electricity consumption, and manually toggle circuits without opening an app. It connects to home networks using 2.4 GHz Wi-Fi or a hardwired RJ45 Ethernet port, while Bluetooth 4.2 aids initial inclusion. Shelly lists built-in safety mechanisms including overvoltage, overpower, overcurrent, and overheating protection.

## Who it suits

This unit suits homeowners and smart home enthusiasts seeking circuit-level power monitoring and automated switching directly from the main board or sub-board. With native support for Google Home, Amazon Alexa, Samsung SmartThings, and local Home Assistant integration via MQTT or Shelly's native API, it fits complex automations without forcing reliance on proprietary hubs. It also serves households wanting the reliability of wired Ethernet inside metal distribution boxes where wireless signals struggle.

However, it is not suitable for multi-phase distribution; Shelly specifies that all four switched channels must be wired to the same electrical phase. Furthermore, because the relay lacks dry contacts, it cannot control low-voltage circuits directly without external contactors. Renters should also skip this unit, as it alters fixed switchboard wiring.

## Australian notes

The Shelly Pro 4PM operates on 110–240 V AC at 50/60 Hz, matching standard Australian 230 V single-phase mains. Because it installs inside a mains distribution board, it is generally work for a licensed electrician; check your state or territory electrical safety regulator.

When connecting inductive loads common in Australian homes, such as ceiling sweep fans, bathroom exhaust fans, or commercial LED drivers, Shelly documentation mandates fitting an external RC snubber across the load to protect the internal relays from voltage spikes. Shelly also notes that the RJ45 network cable must only be connected or disconnected while the unit is completely powered down. Australian retailers such as Oz Smart Things and SmartHome Australia supply the unit with local 1-year or 2-year warranties, alongside Shelly's global 5-year Pro warranty when dealing directly with the manufacturer.

## Sources

- https://www.shelly.com/products/shelly-pro-4pm
- https://www.shelly.com/blogs/documentation/shelly-pro-4pm
- https://www.scorptec.com.au/product/smart-home/smart-home-automation/104849-sh-shelly4pmpro
- https://www.smarthome.com.au/product/shelly-pro-4pm-relay-switch/
- https://synced.com.au/switches/relays/shelly-pro-4pm
- https://www.blui.com.au/products/shelly-pro-4pm
- https://www.ozsmartthings.com.au/products/shelly-pro-4pm
- https://www.youtube.com/watch?v=Mk2fG1FX98Q
