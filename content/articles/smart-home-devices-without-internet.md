---
title: 'Do Smart Home Devices Still Work When the Internet Drops?'
description: 'Some smart home devices keep working during an outage and some become useless plastic. The difference is where the decision is made, not what the box says.'
category: hubs-and-platforms
type: explainer
date: '2026-08-03'
keyTakeaway: 'It depends entirely on whether the device thinks locally or asks a server. Zigbee, Z-Wave and Thread devices paired to a hub keep working with no internet at all. Most Wi-Fi devices that talk to a manufacturer cloud stop responding, including to their own wall switch in some cases.'
tags:
  - Local control
  - Reliability
  - Hubs
  - Matter
  - Australia
faq:
  - q: Will my smart lights still turn on if the internet goes down?
    a: If they are Zigbee, Z-Wave or Thread bulbs paired to a local hub, yes, including automations. If they are Wi-Fi bulbs that rely on a manufacturer cloud, usually no from the app, though some brands offer a limited local fallback on the same network. The physical wall switch always works if the bulb still has power.
  - q: Does Matter fix this?
    a: Largely, yes. Matter is designed around local control on your own network, so a Matter device controlled by a local hub generally keeps working without internet. You still lose remote access from outside the house, and any vendor feature that lives in the manufacturer app rather than in Matter.
  - q: What stops working first in an outage?
    a: Voice assistants, remote access and anything involving a cloud-to-cloud integration. Voice is the one people notice most, because the speaker needs to send your request away to be understood.
  - q: Is Home Assistant the answer?
    a: It is one answer. Running a local controller means the decision-making happens in your house, so automations survive an outage. It is more setup than most people want, and it introduces a single box you now depend on. A mainstream hub with local Zigbee or Thread gets most of the benefit for far less work.
---

Australian internet has its moments. An NBN fault, a router reboot, a storm through the local exchange — and suddenly the question is whether your house still works.

The answer is not the same for every device, and it has almost nothing to do with price or brand. It comes down to one thing: **where the decision gets made.**

## The only distinction that matters

When you tap a button, something has to decide what happens.

**Local control** means the decision is made inside your home. Your hub receives the command, works out which device to talk to, and sends it over a local radio. Nothing leaves the house. No internet required.

**Cloud control** means the command travels to a manufacturer's server, which decides what should happen and sends an instruction back to the device. That round trip may cross the Pacific twice before your light comes on.

Cloud control is not stupid. It makes devices cheap, setup simple, and remote access trivial. But it means an internet outage — or the vendor having a bad day — breaks control of hardware sitting three metres away from you.

## What keeps working

**Zigbee, Z-Wave and Thread devices paired to a local hub.** These protocols do not use your internet connection at all. The mesh runs on its own radio, the hub coordinates it, and automations continue firing. If your sensors and lights are on one of these, an outage is close to a non-event inside the house.

Our [protocol comparison](/hubs-and-platforms/zigbee-vs-zwave-vs-thread-vs-wifi/) covers how these differ if you are choosing.

**Matter devices with a local controller.** Matter was designed around local operation on your own network. A Matter light controlled by an Apple, Google or Amazon hub in the house generally keeps responding. See [what Matter actually delivers](/hubs-and-platforms/what-is-matter-smart-home-australia/) for the caveats.

**Anything physical.** Smart switches still work as switches. Smart bulbs still respond to the wall switch, provided the switch has not been permanently left on and hidden behind a wall plate. Smart locks still have a key or a keypad.

**Schedules already stored on a hub.** If the automation lives locally, the clock keeps running.

## What stops

**Wi-Fi devices tied to a manufacturer cloud.** This is the largest category in most homes: budget plugs, bulbs, cameras and sensors that connect straight to your router and talk to a vendor server. When the internet goes, the app usually cannot reach them, even though your phone and the device are on the same Wi-Fi.

Some brands include a local fallback that keeps same-network control alive. It is worth checking before you buy, and it is rarely advertised prominently.

**Voice assistants.** Almost universally cloud-dependent, because the speech recognition happens on a server. This is the outage people notice first — asking for the lights and getting silence.

**Remote access.** Obviously. Checking a camera from work needs a path to the internet by definition.

**Cloud-to-cloud integrations.** Anything of the form "when my doorbell sees someone, turn on my other brand's light" typically routes through two vendors' servers. Those break early and recover unpredictably.

## The failure mode nobody warns you about

There is a worse version of this than "the app does not work".

Some Wi-Fi devices, when they cannot reach their server, do not simply refuse commands. They sit in a retry loop, become slow to respond to anything, or drop off the network entirely and need a power cycle to come back once the connection returns.

That turns a thirty-minute outage into a job. It is also why an outage sometimes appears to "break" devices that were working fine — they did not break, they lost their conversation partner and handled it badly.

If your devices already drop off Wi-Fi regularly, that is a related problem worth fixing first. Our guide on [devices that keep dropping off Wi-Fi](/setup-guides/fix-smart-home-wifi-dropouts/) covers the usual causes.

## How to find out what you actually own

You do not need documentation. Test it.

1. Turn off the internet at the router — **not** the whole router, just the WAN connection, or unplug the NBN box. Your local Wi-Fi must stay up.
2. Wait a minute.
3. Try the app, try a wall switch, try an automation.

Whatever still responds is local. Whatever does not is cloud-dependent. Ten minutes tells you more than any spec sheet, and it costs nothing.

Worth doing before you expand a system rather than after.

## What to do with the answer

You do not need everything local. You need the right things local.

**Worth insisting on local control:** lights on circulation paths, door locks, anything security-related, heating and cooling, and any automation that matters when you are asleep or away.

**Fine to leave in the cloud:** novelties, seasonal lighting, anything you only ever operate deliberately while standing in front of it.

The practical middle path for most Australian homes is a hub that speaks Zigbee or Thread locally, with cloud devices layered on for the things that do not matter. That keeps the house functional during an outage without demanding you run a server.

If you want to go further than that, the end point is a house where every decision that matters is made locally and the cloud is a convenience rather than a dependency. That is a bigger build, and a separate decision from the one this article is about.

<!--
  Editorial maintenance notes (not reader-facing):
  - "Some brands include a local fallback" is deliberately unnamed. Name specific
    brands only after confirming current firmware behaviour — it changes between
    releases and a wrong claim here is the kind readers notice. [VERIFY]
  - The local-control claim for each major Matter controller is stated as
    "generally" for the same reason. [VERIFY] before strengthening it.
  - Pairs with local-only-smart-home-australia: this one answers the fear, that
    one is the build guide. Link them once that draft is published.
-->
