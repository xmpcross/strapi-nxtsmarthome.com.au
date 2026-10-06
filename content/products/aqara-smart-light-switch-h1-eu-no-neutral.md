---
name: 'Smart Light Switch H1 EU (No Neutral)'
brand: 'Aqara'
bestFor: 'Homeowners with EU-compatible square wall boxes seeking a dual-rocker Zigbee switch for lighting circuits without a neutral wire.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Aqara Smart Light Switch H1 EU (No Neutral)'
  - 'Smart Light Switch H1 EU (No Neutral)'
identifiers:
  model: 'WS-EUK02'
  asin: ''
  ebayEpid: ''
pros:
  - 'Operates on two-wire lighting circuits without requiring a neutral wire at the switch box.'
  - 'Supports Apple Home, Amazon Alexa, and Google Assistant when paired with a compatible Aqara Zigbee hub.'
  - 'Physical rockers can be switched to decoupled mode to act as smart scene controllers without cutting power to globes.'
  - 'Communicates over Zigbee 3.0 for local automation and compatibility with platforms such as Home Assistant.'
cons:
  - 'Square 86 mm profile does not fit standard Australian rectangular flush boxes or plaster brackets.'
  - 'Requires a separate Zigbee 3.0 hub to connect to home networks and voice assistants.'
  - 'Omits the energy monitoring and overload protection features available on the neutral-wire H1 version.'
---

The Aqara Smart Light Switch H1 EU (No Neutral, Double Rocker) is an in-wall smart switch that operates over Zigbee 3.0 to manage two lighting circuits. Rated for 100–250V AC up to an 8A resistive load, it powers its internal electronics directly through the lighting circuit, eliminating the need for a neutral conductor in the wall cavity. According to Aqara's technical documentation, the switch features built-in overheat protection and includes a decoupled function. This decoupled mode separates the physical button action from the internal relay, allowing the rocker to trigger automation scenes while maintaining continuous power to smart light globes.

## Who it suits

This switch suits smart-home users living in older residences where lighting switch boxes only carry active and switched-active wiring. It is especially useful for homes built around Aqara or Zigbee coordinators like Home Assistant, as well as setups with smart globes that must remain powered at all times to accept automations and voice commands.

Conversely, it is unsuitable for renters and anyone looking for a direct drop-in replacement for standard Australian wall plates. Because the physical hardware uses a square European form factor, it will not attach to existing standard Australian wall brackets. Users with very low-wattage LED circuits may experience ghosting or flickering without a bypass load, and those who require real-time electrical metering will need to look at neutral-wire alternatives.

## Australian notes

Permanent 240V mains wiring is generally work for a licensed electrician; check your state or territory's electrical safety regulator for what applies where you live.

The most important consideration for Australian buyers is the mounting geometry. Standard Australian domestic light switches use rectangular wall plates measuring approximately 115 mm by 75 mm with standard 84 mm mounting centres. The Aqara H1 EU measures 85.8 mm by 86 mm and is shaped for square or round European backboxes. It will not mount onto standard plaster C-clips or stud brackets without modifying the plasterboard or installing specialised square wall boxes.

In terms of connectivity, the switch requires a compatible Zigbee 3.0 hub, such as an Aqara Hub, to connect to 2.4 GHz Wi-Fi and link to Apple Home, Google Home, or Amazon Alexa. Before arranging installation with your electrician, confirm the unit carries the Regulatory Compliance Mark (RCM).

## Sources

- https://www.aqara.com/en/product/smart-wall-switch-h1-eu-no-neutral/specs/
- https://www.chytrobot.cz/download/aqara-smart-wall-switch-h1-eu-no-neutral-single-rocker-specification-en.pdf/
- https://www.aqara.com/en/product/smart-wall-switch-h1-eu-no-neutral/
- https://www.vesternet.com/fi-eu/blogs/alykas-koti/aqara-smart-wall-switch-h1-vs-aqara-light-switch-h2-which-double-rocker-delivers-better-smart-control
- https://www.reddit.com/r/homeassistant/comments/1aukwk4/aqara_smart_wall_switch_h1_eu_no_neutral_any/
- https://www.aqara.com/en/security-certifications/
