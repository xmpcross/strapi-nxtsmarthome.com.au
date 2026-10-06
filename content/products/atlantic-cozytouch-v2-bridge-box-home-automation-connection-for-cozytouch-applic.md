---
name: 'cozytouch V2 Bridge box home automation connection for cozytouch application'
brand: 'Atlantic'
bestFor: 'Owners of imported Groupe Atlantic, Thermor, or Sauter heating and hot water appliances seeking mobile app management and Google Assistant voice control.'
# No `rating` — research-based, not hands-on tested. See CLAUDE.md rule 5.
# Researched with gemini-3.8-flash and Google Search (2026-10-06); [VERIFY] claims rewritten to point to the official source. Sources below.
match:
  - 'Atlantic cozytouch V2 Bridge box home automation connection for cozytouch application'
  - 'cozytouch V2 Bridge box home automation connection for cozytouch application'
identifiers:
  model: '500109'
  asin: ''
  ebayEpid: ''
pros:
  - 'Manages up to 20 compatible Groupe Atlantic appliances across 10 zones via the Cozytouch app, according to manufacturer documentation.'
  - 'Requires no ongoing software subscription fees for mobile application or cloud access.'
  - 'Supports Google Assistant voice control natively and Home Assistant unofficially via the Overkiz cloud integration.'
cons:
  - 'Lacks official Australian retail distribution, local warranty backing, and an Australian wall plug.'
  - 'Restricted to the proprietary io-homecontrol protocol, with no native support for Apple Home, Amazon Alexa, SmartThings, or Matter.'
  - 'Requires a 2.4 GHz Wi-Fi connection and remains reliant on Groupe Atlantic cloud servers for remote app operations.'
---

The Atlantic Cozytouch V2 Bridge (reference 500109) is a dedicated hardware gateway designed to link Groupe Atlantic climate and water heating appliances to a local network. According to Atlantic documentation, the bridge uses the proprietary io-homecontrol wireless protocol to communicate with up to 20 compatible Atlantic, Thermor, or Sauter devices across up to 10 zones. It connects to home networks over 2.4 GHz Wi-Fi, allowing users to monitor energy usage, alter zone temperatures, and adjust heating schedules using the Atlantic Cozytouch mobile application. The hardware is powered via a supplied USB cable alongside an included 100–240 V mains power adapter.

## Who it suits

This bridge suits households that already operate compatible Groupe Atlantic appliances—such as specific Atlantic heat pumps, panel heaters, or hot water units—that feature io-homecontrol capability. It serves users who want direct smartphone control or Google Assistant voice commands without ongoing subscription costs. It is also an option for home automation enthusiasts using Home Assistant, which supports the bridge unofficially through its community-documented Overkiz cloud integration.

Conversely, this device does not suit general smart-home setups. Because it communicates only over the proprietary io-homecontrol frequency, it cannot pair directly with standard Zigbee, Z-Wave, or Bluetooth devices. Households built around Apple Home, Amazon Alexa, or Samsung SmartThings should look elsewhere, as Atlantic does not provide native integration for these ecosystems, nor does the hardware support Matter.

## Australian notes

Australian buyers should note that the Atlantic Cozytouch V2 Bridge is primarily distributed in Europe and is not officially stocked by Australian retailers. As a consequence, there is no official Australian manufacturer warranty or domestic support channel documented for the unit.

The included mains power adapter is fitted with a European two-pin plug. While the power adapter operates across 100–240 V at 50/60 Hz—aligning with Australian mains voltage—you will need an adapter plug or a separate Australian-approved USB power supply to connect it to local wall sockets. Check your state's electrical safety regulator regarding the compliance and use of imported power supplies.

Network setup requires a standard 2.4 GHz Wi-Fi network, as 5 GHz bands are unsupported. Atlantic documentation advises against operating the bridge over 3G, 4G, or 5G mobile routers, as well as satellite internet services. Because device control relies on Groupe Atlantic cloud servers, an uninterrupted internet connection is required for remote app interactions.

## Sources

- https://www.sockunique.com.au/products/cozy-touch-men-s-coral-fleece-lounge-socks-2-pairs
- https://www.gstore.com.au/atlantic-solius-wifi-electric-panel
- https://www.atlantic.fr/Climatiser-le-logement/Climatisation-reversible-pour-une-seule-piece/Accessoires-de-climatisation-reversible/Cozytouch
- https://medias.groupe-samse.fr/Fiche_technique/Fiche_technique_1609707.pdf
- https://www.cedeo.fr/p/chauffage-et-climatisation/bridge-cozytouch-v2-pour-connecter-en-wifi-les-produits-compatibles-ref-002449-A4653023
- https://www.123elec.com/atlantic-bridge-2-cozytouch-box-domotique-pour-radiateur-connecte-500109.html
- https://www.comptoirdespros.com/media/NOTICE-INSTALLATION-BRIDGE-500109.pdf
- https://toutelaclim.com/produit/bridge-cozytouch-v2-atlantic-002449-wifi/
- https://assistance.thermor.fr/hc/fr/community/posts/17671209320860-Cozytouch-V2-Diff%C3%A9rence-bridge-V1-et-V2
- https://assistance.thermor.fr/hc/fr/community/posts/360006468099-Apple-HomeKit
- https://www.casam-pro.com/p/test-du-bridge-cozytouch-et-son-application-notre-avis-sur-le-systeme-connecte-des-marques-atlantic-thermor-sauter
