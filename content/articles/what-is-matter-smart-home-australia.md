---
title: 'What Is Matter? The Smart Home Standard Explained for Australians'
description: 'Matter promised to make every smart home device work together. Here is what it actually delivers in 2026, what it still does not fix, and whether it should change what you buy in Australia.'
category: hubs-and-platforms
type: explainer
date: '2026-01-14'
coverBg: '#e2c5be'
coverText: false
coverProduct: right
updated: '2026-08-01'
featured: true
keyTakeaway: 'Matter is a common language that lets devices from different brands work in Apple Home, Google Home, Alexa and SmartThings without a bridge. It is worth buying into, but it standardises basic control only — advanced features still live in the manufacturer''s own app.'
tags:
  - Matter
  - Thread
  - Interoperability
  - Buying advice
faq:
  - q: Do I need a hub to use Matter?
    a: For Wi-Fi Matter devices, no hub is strictly required to control them from a phone on the same network. But to use them in a smart home platform, to control them remotely, or to include them in automations, you need a controller — an Apple TV or HomePod, a Google Nest speaker or display, an Echo device, or a SmartThings hub. Matter devices that use Thread additionally need a Thread border router.
  - q: Will Matter work with my existing Zigbee and Z-Wave devices?
    a: Not directly, because Matter does not run on Zigbee or Z-Wave radios. However, many hubs bridge those devices into Matter. A SmartThings hub or Home Assistant, for example, can expose your existing Zigbee devices to Apple Home or Google Home as if they were Matter devices.
  - q: Is Matter better than the manufacturer's own app?
    a: It is more portable, not more capable. Matter standardises the common functions — on/off, brightness, colour, temperature, lock state. Manufacturer-specific features such as advanced camera analytics, firmware updates or unusual sensor modes usually still require the vendor's own app.
  - q: Does Matter work the same in Australia as overseas?
    a: Yes. Matter runs over Wi-Fi, Ethernet and Thread, all of which are identical here. This is a genuine advantage over Z-Wave, which uses a different radio frequency in Australia and New Zealand than in the US, making imported Z-Wave devices incompatible.
---

If you have shopped for smart home gear in the last couple of years, you have seen the Matter logo on boxes. The marketing promise is simple and appealing: buy anything with this logo and it will work with whatever you already own.

The reality is more nuanced. Matter genuinely solves a real problem, and it should influence what you buy. It also does not do several things people assume it does. Here is the honest version.

## The problem Matter was built to solve

For a decade, smart home devices spoke incompatible languages. A Philips Hue bulb spoke Zigbee to a Hue Bridge, which spoke a proprietary API to Apple, Google and Amazon. A Kasa plug spoke a Wi-Fi protocol of TP-Link's own design. If a manufacturer decided not to support Apple Home, you were out of luck forever.

That produced two bad outcomes. Buying anything meant checking a compatibility matrix. And switching platforms — say, moving from Google to Apple — meant potentially rebuying your entire house.

Matter is the industry's answer. It was developed by the Connectivity Standards Alliance, the same body behind Zigbee, with Apple, Google, Amazon and Samsung all contributing. Version 1.0 landed in late 2022.

::product:philips-hue-bridge::

## What Matter actually is

Matter is an **application layer** — a shared vocabulary for describing devices and their capabilities. It is not a radio protocol. That distinction is the source of most of the confusion.

Matter runs on top of three existing network types:

- **Wi-Fi** — for mains-powered devices with reasonable power budgets: plugs, cameras, appliances, TVs.
- **Ethernet** — for anything wired.
- **Thread** — a low-power mesh network for battery devices: sensors, locks, buttons, some bulbs.

Bluetooth LE is used during setup to get a new device onto the network, then steps out of the way.

Because Matter defines the vocabulary rather than the radio, a Matter light bulb and a Matter door sensor can describe themselves to any Matter controller in terms that controller already understands. Apple Home does not need to know anything about the manufacturer. It just needs to know it is talking to a dimmable light.

### Device types Matter now covers

The initial 1.0 release was conservative — lights, plugs, switches, locks, blinds, thermostats, sensors, media devices. Later releases expanded it considerably: fridges, dishwashers, washing machines, robot vacuums and air purifiers arrived in 1.2; energy management, water heaters and EV charging in 1.3; and 1.4 added more serious HVAC, solar and home battery support.

That last group matters a great deal in Australia, where rooftop solar and home batteries are far more common than in most markets.

## What Matter does not do

This is where expectations need managing.

**It does not standardise advanced features.** Matter defines the common denominator. A camera with clever person-detection, a robot vacuum with room-specific cleaning maps, a lock with rotating guest codes — those capabilities largely still live in the vendor's app. You will find yourself running the manufacturer app alongside your platform app more often than the marketing suggests.

**It does not make old devices Matter devices.** Some products received Matter through a firmware update — Philips Hue did this at the bridge level, for instance. Many did not, and never will. Matter compatibility is not something you can add to hardware that lacks it.

**It does not remove the cloud.** Matter itself operates locally on your network, which is a real benefit for speed and for reliability when the NBN drops out. But a manufacturer is free to keep its own features cloud-dependent, and many do.

**It does not eliminate the platform decision.** You still choose Apple, Google, Amazon, SmartThings or Home Assistant. Matter means that decision no longer determines what hardware you may buy — but the automation engine, the voice assistant and the app experience are all still platform-specific, and they differ a lot.

## Thread: the part people get wrong

Thread deserves its own explanation because it is where most Matter confusion starts.

Thread is a low-power wireless mesh built on the same 802.15.4 radio standard as Zigbee. Battery-powered devices use it because it sips power — a Thread door sensor can run for years on a coin cell, which a Wi-Fi sensor never could.

Thread devices need a **border router** to reach the rest of your network. You very likely already own one without knowing it. Apple HomePod mini, Apple TV 4K (later models), Google Nest Hub (2nd gen), Nest Wifi Pro, several Amazon Echo models and the SmartThings hub all act as Thread border routers.

Two practical implications:

1. **If you have no border router, Thread devices will not work** — even though the box says Matter. This is the single most common cause of "my new Matter sensor won't set up".
2. **Mains-powered Thread devices extend the mesh.** Battery devices generally do not. A house with several mains-powered Thread devices spread through it has a far more reliable mesh than one with a single border router at one end.

::product:apple-homepod::

## Should this change what you buy in Australia?

Broadly, yes — with a few local notes.

**Matter is a genuine advantage over Z-Wave here.** Z-Wave operates on different radio frequencies in different regions; the Australia/New Zealand allocation sits around 921.42 MHz, while North America uses roughly 908.42 MHz. A Z-Wave device bought from a US retailer simply will not talk to an Australian Z-Wave hub. It is not a settings problem — the radios cannot hear each other. Matter has no such regional split, because Wi-Fi and Thread are the same everywhere.

**It reduces the parallel-import risk, but does not eliminate it.** A Matter device bought overseas will function here, since the protocol is identical. What you lose is local warranty support and, for anything mains-powered, the certainty that the plug and power supply are approved for Australian conditions. For low-voltage USB-powered sensors that is a manageable risk. For anything that plugs into a wall socket, buy locally.

**Check for the logo, not the press release.** Plenty of products were announced with Matter support that shipped without it or received it late. The certification logo on the box is the thing that counts.

## A sensible buying rule

If you are starting from scratch: prefer Matter, and prefer Thread for anything battery-powered.

If you already own a lot of Zigbee or Z-Wave gear: do not rip it out. Bridge it. A SmartThings hub or a Home Assistant install can expose existing devices to Matter controllers, letting you keep what works while buying Matter going forward.

If a particular product is clearly the best in its category and does not support Matter, buy it anyway. Matter is a tiebreaker, not a veto. A superb non-Matter camera beats a mediocre Matter one, and you can always bridge it later.

## Where to next

Once you understand Matter, the next decision is which platform to run it on — that choice affects your daily experience far more than the protocol does. Our [platform comparison](/hubs-and-platforms/best-smart-home-platform-australia/) walks through Apple, Google, Alexa, SmartThings and Home Assistant with Australian availability in mind. If you want to understand the radios underneath, start with [Zigbee vs Z-Wave vs Thread vs Wi-Fi](/hubs-and-platforms/zigbee-vs-zwave-vs-thread-vs-wifi/).
