---
title: 'How to Make Your Split System Air Conditioner Smart (Without Replacing It)'
description: 'Australian homes run on split systems, not central HVAC. Here is how to add app and voice control to the one you already have, and which approach suits your setup.'
# The full title runs to 73 characters, which the cover fitter has to shrink to
# about half the size used on every other cover. These set a short main line so
# the type matches the rest of the set; the article title itself is unchanged.
coverMain: 'MAKE YOUR SPLIT SYSTEM SMART'
coverSub: 'WITHOUT REPLACING THE AIR CONDITIONER'
category: climate
type: how-to
date: '2026-05-28'
updated: '2026-08-01'
keyTakeaway: 'An infrared bridge is the cheapest way to control an existing split system and works with almost any unit, but it cannot tell whether the aircon is actually on. A dedicated Wi-Fi module from the manufacturer gives real two-way status and is worth the extra if your unit supports one.'
tags:
  - Air conditioning
  - Climate
  - Automation
  - Setup
faq:
  - q: Why does my smart home say the aircon is on when it is off?
    a: Because infrared controllers are one-way. They send the same signal your remote does, and then assume the command worked. If someone used the physical remote, or the signal was blocked, the smart home's idea of the state drifts out of sync with reality. A temperature sensor or a power sensor solves this.
  - q: Will a smart controller void my air conditioner warranty?
    a: An infrared bridge sits outside the unit entirely and simply mimics your remote, so it presents no warranty issue. A wired module that connects into the indoor unit is different — use the manufacturer's own module where possible, and have it installed by a qualified technician if it involves opening the unit.
  - q: Can I control a ducted system this way?
    a: Ducted systems usually use a wall controller rather than an infrared remote, so an IR bridge will not work. Most ducted manufacturers offer their own Wi-Fi module or app-capable controller, and there are third-party controllers designed specifically for ducted zoning. This is generally an installer job.
  - q: Is it worth automating air conditioning at all?
    a: Yes — it is one of the largest loads in an Australian home. Pre-cooling before you get home, shutting down when nobody is there, and running during solar surplus rather than peak tariff periods all produce real savings on a genuinely large number.
---

Most smart home content about climate control is written around American central heating and cooling with a single wall thermostat. That is not how Australian homes work.

We run split systems — one or more wall-mounted indoor units, each with its own infrared remote — or ducted systems with a wall controller. The advice for one does not transfer to the other, which is why so much of what you read online is unhelpful here.

Here is what actually works.

## Why bother

Heating and cooling is one of the largest electricity loads in an Australian home. Automating it has real financial upside, not just convenience:

- **Pre-conditioning.** Start cooling twenty minutes before you arrive, rather than running all afternoon on an empty house.
- **Occupancy shutdown.** Turn off when everyone leaves. This is the single biggest saving, because "left the aircon on all day" is a very common and very expensive mistake.
- **Tariff and solar awareness.** Run harder during solar surplus or cheap tariff periods, ease off during peak.
- **Room-by-room logic.** Cool the bedrooms in the evening and the living area during the day, rather than everything at once.
- **Bushfire smoke response.** Switching to recirculate and closing up the house automatically when air quality drops is genuinely useful in a bad summer.

## Option 1: an infrared bridge

**Best for:** almost anyone with a split system and an infrared remote.

An IR bridge is a small device that sits in the room and mimics your remote control. Your phone or voice assistant tells the bridge what to do, and it blasts the same infrared code your remote would.

**Advantages:** cheap, works with essentially any unit regardless of brand or age, no wiring, no installer, and renters can use it freely. If your aircon is fifteen years old and has no smart capability whatsoever, this still works.

**The critical limitation:** infrared is one-way. The bridge sends a command and assumes it worked. It has no idea what the unit is actually doing.

That produces the classic failure mode: someone uses the physical remote to turn the aircon off, the smart home still believes it is on, and your automations start making decisions based on a false picture. Or the bridge sends "off" to a unit that was already off, and toggles it on.

**Practical requirements:**

- **Line of sight.** IR does not go through walls or around corners. The bridge needs to see the indoor unit. One bridge per room with an aircon.
- **Codeset support.** The bridge needs the code library for your brand. Major Australian brands are well supported; obscure units sometimes are not. Check before buying.
- **State correction.** Pair the bridge with a temperature sensor in the room, or a power monitor on the aircon circuit, so the system can infer the real state. This turns a frustrating setup into a reliable one, and it is the step most people skip.

## Option 2: the manufacturer's Wi-Fi module

**Best for:** anyone whose unit supports one.

Most major air conditioning brands sell a Wi-Fi adapter for their systems — sometimes built into newer units, sometimes an add-on module that plugs into a port inside the indoor unit.

**Advantages:** genuine two-way communication. The system knows the real mode, real setpoint, real fan speed and often the actual room temperature as read by the unit's own sensor. Automations become dependable rather than hopeful. Some modules also report energy consumption.

**Disadvantages:** more expensive, brand-specific, and often needs a technician to fit if it involves opening the indoor unit. Vendor apps range from decent to genuinely poor, and smart home integration quality varies enormously between brands — some integrate cleanly with Apple, Google and Alexa, others only work in their own app.

**Before buying:** check that the module actually integrates with your chosen platform, not just with the manufacturer's app. This catches people out regularly.

## Option 3: a third-party wired controller

**Best for:** ducted systems, multi-head systems, and anyone wanting serious control.

Several companies make controllers that wire into the indoor unit's control bus, giving full two-way control independent of the manufacturer's own ecosystem. For ducted systems with zoning, there are controllers designed specifically to manage zones intelligently.

**Advantages:** the most capable option, works where IR cannot reach, often better smart home integration than the manufacturer's own module.

**Disadvantages:** most expensive, requires professional installation, and compatibility is unit-specific. This is a considered purchase, not an impulse one.

## Making it actually reliable

Whichever route you take, a few things separate a setup that works from one you turn off after a month.

**Add a real temperature sensor.** The aircon's own sensor is at the indoor unit, near the ceiling, which is the warmest part of the room. A separate sensor at seated height in the middle of the room gives you a number that reflects how the room actually feels. Automate against that.

**Add humidity, especially in Queensland and northern NSW.** Twenty-six degrees at 45% humidity and twenty-six degrees at 80% humidity are entirely different experiences. Humidity-aware automation is far more comfortable than temperature alone.

**Do not over-automate at first.** Start with two rules: turn off when everyone leaves, and pre-condition before someone arrives. Those two capture most of the value. Add complexity later, once you trust it.

**Give people a manual override.** If the automation fights the occupants, the occupants win and the automation gets deleted. Make sure using the remote does something sensible, and that automations back off for a while after manual intervention.

## A note on running costs

Automating your air conditioner will make it more convenient, and it can make it cheaper — but the biggest savings come from *not running it* rather than running it smarter.

The highest-value automations are the boring ones: turn it off when the house is empty, do not cool rooms nobody is in, and shift what you can into solar-surplus hours instead of peak tariff periods. Fancy predictive setpoint logic is fun to build and marginal in effect by comparison.

If you want to understand the tariff side of this properly, our guide to [whether smart plugs actually save money](/energy-and-solar/smart-plugs-energy-monitoring-australia/) covers how load shifting works on Australian tariffs.
