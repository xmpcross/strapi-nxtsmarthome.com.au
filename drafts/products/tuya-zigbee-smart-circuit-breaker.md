---
name: 'ZigBee Smart Circuit Breaker'
brand: 'TUYA'
bestFor: 'Australian homeowners with an existing Zigbee hub seeking licensed-electrician-installed DIN-rail switching and monitoring for dedicated electrical circuits.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Draft: gemini-3.8-flash with Google Search grounding, 2026-10-06. Review before publishing.
match:
  - 'TUYA ZigBee Smart Circuit Breaker'
  - 'ZigBee Smart Circuit Breaker'
identifiers:
  model: ''
  asin: ''
  ebayEpid: ''
pros:
  - 'According to Tuya, it mounts directly onto standard DIN rails in electrical enclosures and distribution boards.'
  - 'Uses Zigbee communication, which avoids crowding 2.4GHz Wi-Fi networks when paired with an appropriate gateway.'
  - 'According to manufacturer specifications, it supports remote switching, timers, and energy monitoring via Tuya apps.'
  - 'Can be integrated into third-party smart home platforms such as Home Assistant via compatible Zigbee coordinators.'
cons:
  - 'Requires a separate Tuya Zigbee gateway or coordinator for connectivity, as it lacks direct Wi-Fi capability.'
  - 'Not a DIY install: switchboard work is generally work for a licensed electrician, so check your state''s electrical safety regulator.'
  - 'Often acts as an automated switch relay rather than a certified protective circuit breaker with physical overload tripping.'
  - 'Generic online marketplace units often lack documented Australian RCM electrical safety certification.'
---

The Tuya Zigbee Smart Circuit Breaker is a DIN-rail switch designed to integrate into smart home setups using the Zigbee wireless communication standard. According to Tuya, the unit mounts inside an electrical enclosure or switchboard to provide automated switching, remote on and off control, and energy monitoring capabilities through the Tuya Smart or Smart Life applications. Because it communicates over Zigbee rather than Wi-Fi, it requires a compatible Tuya Zigbee gateway or a Zigbee coordinator to bridge into home automation platforms such as Home Assistant.

## Who it suits

This unit suits smart home enthusiasts and automation hobbyists who manage an established Zigbee mesh network and want circuit-level load switching or energy tracking. It is aimed at users managing dedicated sub-circuits, contactor controls, or secondary equipment such as pumps, pool filters, or outbuilding supplies. However, it is not suitable for renters, nor is it designed for direct DIY switchboard fitting. It also does not suit homeowners looking for plug-and-play smart plugs that do not require switchboard modification.

## Australian notes

Mains electrical safety and switchboard regulations are critical considerations for this device in Australia. Switchboard work and hardwired 230V cabling are generally work for a licensed electrician; check your state's electrical safety regulator for what applies where you live.

Buyers should note that despite the "circuit breaker" name used in online marketing, community teardowns and electrical guides emphasise that many Tuya DIN units are smart relays or contactors rather than certified miniature circuit breakers (MCBs) or residual current devices (RCDs). As a result, they cannot replace safety-rated protective devices and should be wired downstream of an approved circuit breaker.

Furthermore, electrical devices connected to Australian mains power must comply with local safety standards and the Electrical Equipment Safety System (EESS), marked by the Regulatory Compliance Mark (RCM). Generic Tuya devices sourced from online marketplaces often arrive without Australian compliance certification or local warranty backing. Before purchasing, verify whether the specific unit carries documented Australian certification and whether your electrical contractor is willing to install it; check your state's electrical safety regulator before proceeding.

## Sources

- https://community.home-assistant.io/t/zigbee-switch-for-din-rail/792462
- https://solution.tuya.com/projects/CMa4sdudso0x8n
- https://www.youtube.com/watch?v=y__lKXPdVn0
- https://www.facebook.com/groups/1626477214195480/posts/2016654741844390/
- https://manuals.plus/ae/1005004598950096
- https://community.smartthings.com/t/tuya-zigbee-smart-circuit-breaker/270588
- https://community.homey.app/t/experience-with-tuya-zigbee-smart-circuit-breaker/88766
- https://arklyfe.com.au/blogs/news/saa-certified-smart-switches-australia
- https://www.u-buy.com.au/product/JGREFDRVE-tuya-zigbee-smart-circuit-breaker-power-metering-1p-63a-din-rail-for-smart-home-wireless-remote-control-smart-switch-white-no-metering-zigbee-10a
