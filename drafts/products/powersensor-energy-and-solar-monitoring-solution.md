---
name: 'Energy and Solar Monitoring Solution'
brand: 'Powersensor'
bestFor: 'Australian homeowners wanting DIY household and solar energy monitoring without hiring an electrician or paying ongoing subscription fees.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Draft: gemini-3.8-flash with Google Search grounding, 2026-10-06. Review before publishing.
match:
  - 'Powersensor Energy and Solar Monitoring Solution'
  - 'Energy and Solar Monitoring Solution'
identifiers:
  model: ''
  asin: ''
  ebayEpid: ''
pros:
  - 'Installs without tools, CT clamps, or direct electrical wiring using non-contact electromagnetic field sensing.'
  - 'Official Home Assistant integration available alongside an open REST API with OAuth 2.0.'
  - 'Operates without subscription fees or ongoing cloud access charges.'
  - 'Local Australian three-pin pass-through plug hardware backed by a two-year warranty.'
cons:
  - 'Does not support home battery storage systems.'
  - 'Lacks integration with Apple Home, Google Home, Amazon Alexa, SmartThings, and Matter.'
  - 'Limited Bluetooth wireless range (10 to 20 metres) between the switchboard sensor and gateway plug makes it unsuitable for most apartments.'
---

The Powersensor Energy and Solar Monitoring Solution is an Australian-designed energy monitor created by DiUS. Rather than relying on traditional current transformer (CT) clamps that require hardwiring, Powersensor uses non-contact electromagnetic field sensing. The system pairs switchboard-mounted sensors with an Australian pass-through plug gateway via Bluetooth, transmitting household consumption and solar export data to the cloud every 30 seconds.

## Who it suits

Powersensor suits single-phase and three-phase households wanting visibility over their grid consumption and solar generation without hiring a tradesperson. Because the hardware does not require hardwiring inside the electrical switchboard, it is also practical for renters seeking a non-invasive monitoring solution, provided they confirm meter box access rules with their rental provider. The system also appeals to local home automation users running Home Assistant, thanks to an official integration supported by DiUS and an open REST API.

Households with residential battery storage systems should skip this solution, as Powersensor documentation states that battery storage is not currently supported. Additionally, the Solar kit cannot monitor multi-inverter solar systems directly. It is also unsuitable for apartment complexes or multi-dwelling units where switchboards are situated in distant or locked communal meter rooms, as the sensors require a direct Bluetooth link of roughly 10 to 20 metres to the gateway plug.

## Australian notes

The gateway plug is designed for local power points, using a standard Australian and New Zealand three-pin pass-through design rated for 240 V AC, 50 Hz, and 10 A, with a power consumption of under 1 W. The gateway requires a 2.4 GHz Wi-Fi network to connect to the cloud. The external monitoring sensors are powered by internal rechargeable batteries lasting between one and two years per charge via a standard USB cable.

Per Australian retailer Reduction Revolution, the hardware comes with a two-year local warranty. Powersensor does not integrate with mainstream consumer platforms like Google Home, Apple Home, Amazon Alexa, or Matter, but single-phase and two- or three-phase setups are supported, with three-phase configurations using an optical pulse sensor on the digital meter.

## Sources

- https://www.powersensor.com.au/
- https://reductionrevolution.com.au/products/powersensor-solar
- https://reductionrevolution.com.au/products/powersensor-energy
- https://static1.squarespace.com/static/60349997e1c1c53c86d14309/t/6369bbc92f422e76f6df8830/1667873769181/Intro+to+Powersensor+-+Nov+2022+v1.0+-+General.pdf
- https://reductionrevolution.com.au/products/powersensor-plug
- https://help.powersensor.com.au/hc/en-au/articles/360003682375-How-does-Powersensor-work
- https://www.powersensor.com.au/platform/how-it-works
- https://www.powersensor.com.au/platform/open-api
- https://apps.apple.com/au/app/powersensor/id1327208438
