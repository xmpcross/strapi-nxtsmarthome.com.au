---
name: 'Wall Plug Z-Wave Plus (AU Plug)'
brand: 'Fibaro'
bestFor: 'Australians should skip this device, as Fibaro never manufactured a native Type I Australian plug version for standard domestic wall sockets.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Draft: gemini-3.8-flash with Google Search grounding, 2026-10-06. Review before publishing.
match:
  - 'Fibaro Wall Plug Z-Wave Plus (AU Plug)'
  - 'Wall Plug Z-Wave Plus (AU Plug)'
identifiers:
  model: ''
  asin: ''
  ebayEpid: ''
pros:
  - 'Monitors real-time active power draw and cumulative energy consumption, according to Fibaro.'
  - 'Integrated LED ring changes colour to visually display current electrical load.'
  - 'Functions locally as a Z-Wave Plus mesh repeater with S0 and S2 encryption support.'
  - 'Operates entirely locally through a compatible Z-Wave controller with no mandatory subscription.'
cons:
  - 'Fibaro does not manufacture a native Australian Type I plug for standard wall outlets.'
  - 'Requires a separate Z-Wave controller or hub, offering no direct Wi-Fi connectivity.'
  - 'Does not support Matter or direct Apple Home integration on this Z-Wave Plus model.'
  - 'Overload protection automatically cuts power if initial motor startup surges exceed amperage limits.'
---

The Fibaro Wall Plug is a plug-in switch designed to provide appliance switching and energy monitoring across a Z-Wave Plus network. Fibaro states that the unit measures real-time active power draw in watts alongside cumulative energy usage in kilowatt-hours, accompanied by a built-in LED ring that alters its colour to reflect current power draw. Operating on 230V mains with a rated continuous resistive load of up to 2,500W (11A), it also serves as an in-line mesh repeater supporting S0 and S2 encryption. However, while some retailer listings mention an Australian plug, Fibaro documentation confirms that an Australian hardware version was never manufactured.

## Who it suits
Australian homeowners and renters should generally skip this product. Because Fibaro never manufactured a native Australian Type I plug, standard households cannot use it in domestic wall outlets.

This device only suits users who have imported appliances or international socket installations (such as European Type E/F or UK Type G) within specialised test benches, paired with an established Z-Wave gateway. Platforms like Home Assistant (via a Z-Wave USB stick) and SmartThings can read its power metrics directly. If you require standard Wi-Fi connectivity, direct Apple Home pairing without extra bridges, Matter support, or standard Australian three-pin wall compatibility, this plug is not suitable.

## Australian notes
The primary issue for Australian purchasers is physical compatibility. Fibaro manufactures this plug exclusively in Type E/F, Type G, Type B, and Type A pin configurations. There is no official Australian Type I plug variant, meaning it cannot physically or safely connect to standard Australian AS/NZS 3112 power points without foreign socket adapters.

Using unapproved travel adaptors for permanent high-load appliances poses potential fire and electrical hazards. Always check your state's electrical safety regulator regarding appliance compliance, unapproved plug adapters, and equipment safety standards. Furthermore, because there is no official Australian release, you will not receive local Australian warranty coverage or an Australian Regulatory Compliance Mark (RCM).

Even though Fibaro's firmware includes technical frequency support for the Australia and New Zealand Z-Wave band (921.42 MHz and 919.8 MHz), the physical hardware mismatch makes it unviable for typical domestic applications. Australian buyers seeking smart energy monitoring should instead choose smart plugs that provide native Type I pins and local compliance certification.

## Sources

- https://www.fibaro.com/en/products/wall-plug/
- https://manuals.plus/fibaro/yh-001-smart-home-gateway-manual
- https://www.fibaro.com/us/where-to-buy/
- https://www.smarthome.com.au/brand/fibaro/
- https://www.smartliving.com.au/home-automation/smart-lighting-controls/relays
- https://www.smartliving.com.au/fibaro-z-wave-button.html
- https://forum.fibaro.com/topic/25310-solvedfibaro-wall-plug-fgwp102-trouble-maker/
- https://github.com/zwave-js/zwave-js/issues/1600
- https://manual.zwave.eu/backend/make.php?lang=en&sku=FIBEFGWPE-102&cert=ZC10-16035016
- https://media.adeo.com/mkp/658ed1b4b488ac571772b5532b5714cd/media.pdf
- https://cdn.adiglobaldistribution.us/pim/Original/10120/FBFGWPB121-Operating-Manual.pdf
- https://www.hellasdigital.gr/smartliving/fibaro/fibaro-wall-plug-fgwpf-102-zw5/?sl=en
