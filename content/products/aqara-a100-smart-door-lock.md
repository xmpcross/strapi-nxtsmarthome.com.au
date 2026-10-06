---
name: 'A100 Smart Door Lock'
brand: 'Aqara'
bestFor: 'Homeowners and Apple Home users wanting multiple entry methods, including Apple Home Key and fingerprint unlocking, for sheltered entrance doors.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Aqara A100 Smart Door Lock'
  - 'A100 Smart Door Lock'
identifiers:
  model: 'ZNMS02ES'
  asin: ''
  ebayEpid: ''
pros:
  - 'Supports Apple Home Key directly alongside fingerprint, keypad, NFC, and physical key entry.'
  - 'Aqara claims up to 18 months of battery life from eight AA batteries, backed by an external USB-C emergency port.'
  - 'Operates locally without recurring subscription fees for access management or temporary codes.'
  - 'Stores up to 50 fingerprints, 50 PIN codes, and 25 NFC credentials according to the manufacturer specifications.'
cons:
  - 'Lacks onboard Wi-Fi, requiring a separate Aqara Zigbee 3.0 hub for remote unlocking and Google Assistant integration.'
  - 'Carries an IP53 weather rating and no fire-resistance rating, making it unsuitable for unsheltered doorways exposed to heavy rain.'
  - 'Requires a minimum door thickness of 40 mm, which does not fit standard 35 mm doors without modification.'
---

The Aqara A100 (model ZNMS02ES) is a mortise smart door lock designed for keyless access using Zigbee 3.0, Bluetooth 5.0, and NFC. According to Aqara, the lock features nine entry methods, including a handle-mounted fingerprint reader, backlit keypad PIN codes, physical mechanical keys, NFC cards, and native Apple Home Key integration. Because the hardware does not contain onboard Wi-Fi, it communicates locally over Bluetooth or pairs with an Aqara Zigbee 3.0 hub to connect to home networks and smart platforms. The unit operates on eight AA batteries, which Aqara estimates will last up to 18 months under standard use, and features a hidden external USB-C port for emergency power input.

## Who it suits
The A100 suits Apple Home users looking for Apple Home Key functionality, allowing an iPhone or Apple Watch to unlock the door with a tap. It also serves households wanting flexible local access management without ongoing monthly fees, supporting up to 50 individual fingerprints, 50 PIN codes, and 25 NFC devices. The Aqara Home app allows owners to configure permanent, periodic, or one-time temporary codes for visitors and trades.

However, this lock is not suitable for doors exposed directly to the elements. With an IP53 water-resistance rating and no fire rating according to Aqara Australia, it requires an undercover entryway or porch. Buyers relying on Amazon Alexa or Samsung SmartThings should look elsewhere, as official documentation does not confirm support for those ecosystems. Furthermore, remote operation and Google Assistant voice control depend entirely on purchasing a separate Aqara Zigbee 3.0 hub.

## Australian notes
Before purchasing in Australia, verify your door dimensions. Retailer listings specify a backset of 60 mm and a supported door thickness between 40 mm and 80 mm. Standard external doors in Australia often measure 35 mm to 38 mm thick, meaning thinner doors will require modifications or packer plates to install correctly. Renters should talk to their landlord and check their state or territory tenancy authority before making permanent changes to existing door locks.

For smart home connectivity, the lack of native Wi-Fi means no 2.4GHz network configuration is needed out of the box, keeping local Bluetooth operation functional without router dependencies. Aqara Australia backs the lock with a 12-month manufacturer warranty through local retailers including Bunnings, JB Hi-Fi, and Officeworks.

## Sources

- https://www.aqarastore.com.au/collections/smart-door-lock
- https://www.aqarastore.com.au/products/aqara-smart-door-lock-a100
- https://www.bunnings.com.au/aqara-a100-smart-door-lock_p0670905
- https://www.jbhifi.com.au/products/aqara-smart-door-lock-a100
- https://www.officeworks.com.au/shop/officeworks/p/aqara-smart-lock-a100-black-opznms02es
- https://www.binglee.com.au/products/smart-door-lock-a100-znms02es
- https://www.mobileciti.com.au/aqara-smart-door-lock-a100-znms02es
- https://www.aqara.com/en/product/smart-door-lock-a100-zigbee/
- https://www.reddit.com/r/homeassistant/comments/1l5fpz8/aqara_a100_support_added_for_home_assistant/
- https://community.home-assistant.io/t/aqara-a100-via-matter-with-m3-hub/897129
- https://neon.ninja/2023/03/smart-lock-first-impressions-of-aqara-a100/
