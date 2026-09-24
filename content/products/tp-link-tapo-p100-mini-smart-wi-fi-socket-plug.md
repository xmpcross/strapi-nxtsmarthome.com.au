---
name: Tapo P100 Mini Smart Wi-Fi Socket Plug
brand: TP-Link
bestFor: Renters and first-time smart home buyers who want simple app, Alexa or Google Assistant control of a lamp or fan without buying a hub
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
match:
  - TP-Link Tapo P100 Mini Smart Wi-Fi Socket Plug
  - Tapo P100
identifiers:
  model: 'Tapo P100'
  asin: ''
  ebayEpid: ''
pros:
  - Connects straight to home Wi-Fi, so no hub or bridge is needed (TP-Link AU, The Good Guys)
  - Compact 76.5 x 43.5 x 42 mm body that TP-Link says is sized to avoid blocking the neighbouring socket
  - Schedules, countdown timers and an Away Mode that switches devices on and off to simulate someone being home
  - Works with Alexa, Google Assistant and Samsung SmartThings, per TP-Link Australia
  - Listed as supported by Home Assistant's local TP-Link integration
cons:
  - 2.4 GHz Wi-Fi only; The Good Guys notes it does not support 5 GHz
  - No energy monitoring listed, unlike TP-Link's P110-series plugs
  - No Matter or Apple Home support mentioned on TP-Link's AU product page
  - Home Assistant setup still asks for your TP-Link cloud account credentials
---

The Tapo P100 is TP-Link's basic mini smart plug: it sits between a wall socket and an appliance and lets you switch that appliance on and off from the Tapo app, by voice, or on a schedule. TP-Link's Australian product page lists remote on/off control, schedules and timers, scenes, family sharing and an Away Mode that turns connected devices on and off at random to make the house look occupied. It does not measure power use, so it is a switch rather than an energy monitor.

## Who it suits

It suits people who want to put a lamp, fan or string of lights on a schedule, or switch it by voice, without an electrician or a hub. Because it simply plugs into an existing socket, it needs no changes to your wiring, which matters in a rental. Skip it if you want to track what an appliance costs to run, if your home is built around Apple Home or Matter, or if your router only offers a 5 GHz network, since The Good Guys lists the plug as 2.4 GHz only.

## Australian notes and compatibility

TP-Link Australia sells the P100 in one-, two- and four-packs and rates it at 220–240 V, 50/60 Hz, with a maximum load of 2300 W / 10 A. Its spec page lists RCM among the certifications and a flame-retardant (UL 94-V0) housing, plus an operating temperature range of 0–35 °C. TP-Link's Australian warranty table puts smart power products on a two-year warranty, and The Good Guys lists a two-year manufacturer's warranty too; TP-Link notes this sits alongside, and does not limit, your rights under the Australian Consumer Law. We saw it listed at The Good Guys (two-pack), Bunnings and Amazon Australia.

Setup uses Bluetooth for pairing, then the plug joins your 2.4 GHz Wi-Fi. TP-Link lists Alexa, Google Assistant and Samsung SmartThings as compatible, and its page mentions local control when the internet is down. For Home Assistant users, the official TP-Link integration lists the P100 as supported and says it talks to devices locally rather than through TP-Link's cloud, but it still asks for your TP-Link account email and password, and some firmware needs third-party access switched on under Tapo Lab in the app.

Running costs: neither TP-Link's product page nor the retailer listings we checked mention a subscription for the plug's features.

## Alternatives in our catalogue

- **TP-Link Tapo P110M Mini Smart Wi-Fi Plug** — another Tapo mini Wi-Fi plug that runs in the same Tapo app.
- **Meross Smart Wi-Fi Plug Mini AU (MSS210)** — a compact Wi-Fi smart plug in an AU-plug version.
- **Eve Energy Smart Plug (Matter over Thread)** — a Matter-over-Thread plug, for homes that would rather avoid Wi-Fi plugs and already run a Thread network.

## Sources

- https://www.tp-link.com/au/home-networking/smart-plug/tapo-p100/
- https://www.tp-link.com/au/support/download/tapo-p100/
- https://www.tp-link.com/au/support/replacement-warranty/
- https://www.thegoodguys.com.au/tp-link-tapo-mini-smart-wi-fi-plug-2-pack-tapo-p1002-pack
- https://www.bunnings.com.au/tp-link-tapo-p100-mini-wi-fi-smart-plug_p0367694
- https://www.amazon.com.au/TP-Link-Tapo-Smart-Wi-Fi-Socket/dp/B08SJ7MLRR
- https://www.home-assistant.io/integrations/tplink/
