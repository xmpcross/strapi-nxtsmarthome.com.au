---
title: 'What You Should Never Plug Into a Smart Plug'
description: 'Smart plugs are cheap, useful and occasionally a genuinely bad idea. The appliances to keep off them, why the current rating matters more than anything else, and where the real risk sits.'
category: energy
coverLead: 'Energy and running costs'
coverMain: 'What not to plug in'
coverSub: 'Smart plug limits, honestly'
type: explainer
date: '2026-08-05'
keyTakeaway: 'Two kinds of appliance do not belong on a smart plug: anything that draws close to the plug is rated for, and anything where an unexpected switch-off causes a problem. A heater is the first. A freezer or a medical device is the second.'
tags:
  - Energy
  - Smart plugs
  - Safety
  - Buying advice
faq:
  - q: Can I run a portable heater from a smart plug?
    a: It is the appliance most often warned against, for two reasons. High-output heaters draw current close to the limit of a standard 10 amp plug, and a heater that switches on remotely can come on in an empty room with something resting against it. Many heater manufacturers specifically say not to use timers or remote switching. Check the appliance manual before you do it. [VERIFY]
  - q: Is it safe to plug a power board into a smart plug?
    a: It defeats the point of the plug's rating. The smart plug is rated for a single load, and a power board invites several. It is also the arrangement most likely to end up overloaded quietly, because nobody adds up what is connected. Plug appliances directly.
  - q: What about a fridge or freezer?
    a: The risk is not electrical, it is silent failure. A plug that drops off the network, gets switched off by an automation, or loses power during setup takes the appliance with it, and you may not notice until food has spoiled. If you want to monitor a fridge, use an energy monitor that reports without switching.
  - q: Can smart plugs handle motors and pumps?
    a: Motors draw a surge of current when they start, well above their running draw. Some plugs handle it, some do not, and some relays fail closed over time under repeated switching. Check the manufacturer's guidance for the specific plug and appliance rather than assuming.
  - q: Is any of this different in Australia?
    a: The principle is the same everywhere, but the numbers are ours. Standard Australian general power outlets are rated to 10 amps at 230 volts, and Australian smart plugs are typically rated to match. Advice written for 120 volt markets does not translate directly. [VERIFY]
---

Smart plugs are the least glamorous and most useful thing in most smart homes. They are also the device most often used in a way the manufacturer did not intend, because they cost very little and look like they will run anything.

They will not. There are two categories of appliance to keep off them, and they fail in completely different ways.

## Everything starts with the current rating

A smart plug carries the full load of whatever is plugged into it. Australian general power outlets are rated to 10 amps, and Australian smart plugs are typically rated to match. [VERIFY] That figure is printed on the plug body and stated in its specifications, and it is a limit, not a target.

Most household electronics are nowhere near it. A television, a lamp, a phone charger, a router, a fan — all trivial loads.

The appliances that get close are the ones that make heat or turn a motor. That is the whole list worth worrying about, and it is where the rest of this article sits.

## Category one: anything that draws near the limit

**Portable heaters.** Fan heaters, oil column heaters, radiant heaters. High-output models draw current close to the rating of a standard plug, and they do it continuously rather than in bursts. Many heater manufacturers explicitly say not to run their product through a timer, a remote switch or an extension lead — check the manual for the specific appliance, because this varies by model. [VERIFY]

**Portable air conditioners.** Same problem, plus a compressor that surges on start-up.

**Kettles, toasters and portable cooktops.** Short duty cycles, but high draw while running. There is also very little reason to automate them.

**Clothes dryers and anything similar.** If it heats a room-sized volume of air, it is not a smart plug load.

The failure here is not subtle. An undersized or marginal connection carrying a heavy load generates heat at the connection point, and heat at a connection point is how electrical fires start. This is the part of the article worth taking literally.

## Category two: anything that must not switch off unexpectedly

This second group is not about current at all. These appliances may draw almost nothing. The problem is that a smart plug introduces a new way for them to lose power — a firmware update, a dropped network, a mistyped automation, a voice command misheard in another room.

**Fridges and freezers.** The classic example. Nothing dramatic happens when the power goes; you simply find out days later.

**Medical equipment.** CPAP machines, oxygen concentrators, anything a household depends on. Do not put a remotely switchable device in that path.

**Aquarium and pond pumps, reptile heat lamps.** Living things on a timer that can silently fail.

**Anything mid-cycle.** A dishwasher, a washing machine or a 3D printer cut off partway through does not resume gracefully.

**Network gear you rely on.** There is an argument for putting a router on a smart plug so it can be power-cycled remotely. Think it through first: if the router is down, the plug that controls it is unreachable too, unless it is Zigbee or Z-Wave on a hub with its own connection.

## The arrangement to avoid entirely

Do not plug a power board or an extension lead into a smart plug.

The plug is rated for one load. A power board is an invitation to connect several, and nobody adds up the total. It is the single easiest way to exceed a rating without noticing, and it is worse because the smart plug is doing the switching — repeatedly making and breaking a connection under a load it was never specified for.

Daisy-chaining a smart plug into another smart plug is the same mistake with extra steps.

## Motors deserve their own note

Motors draw a surge when they start — well above their steady running draw. A pool pump, a compressor, a workshop tool.

Some plugs cope with this. Some do not. And a relay switching a motor thousands of times may eventually fail, sometimes stuck closed, which means the plug reports "off" while the appliance runs. That is a failure mode worth knowing about before you rely on a plug to turn something off.

If you want to switch a large motor load on a schedule, that is a job for properly rated equipment, and in most cases it is fixed wiring — which is licensed electrician territory in every Australian state and territory. [VERIFY]

## What smart plugs are genuinely good for

The list is long and boring, which is the point:

- Lamps and floor lighting, especially in rented homes where wiring is not an option
- Televisions, media gear and consoles with meaningful standby draw
- Fans and air purifiers
- Christmas lights and anything seasonal that would otherwise stay on
- Chargers you would rather not leave live all day
- Measuring what an appliance actually uses, before deciding whether to do something about it

That covers almost everything people want a smart plug for. The exceptions above are exceptions precisely because they are unusual.

For those jobs, a compact plug sold for the Australian market is all that is needed. Check the rating printed on the body against the appliance before you commit to it, whichever you buy. [VERIFY]

::product:meross-smart-wi-fi-plug-mini-au-mss210::

If part of the reason is finding out what an appliance actually costs to run, a plug with energy monitoring answers that question directly — and it is a far better use of a plug than switching something that should never be switched.

::product:tp-link-tapo-p110-smart-plug-with-energy-monitoring::

For anything larger or permanently installed, the honest answer is that it is not a plug-in job at all. In-wall relays exist for exactly that, and fitting one is licensed electrical work in every Australian state and territory. [VERIFY]

::product:shelly-1pm-gen3-wi-fi-power-relay::

## If you are unsure

Check three things, in this order:

1. **The appliance manual.** If it says do not use a timer or remote switch, that settles it.
2. **The plug's rating**, against the appliance's draw. If it is close, do not.
3. **What happens if it switches off at the worst moment.** If the answer is "spoiled food", "an unheated aquarium" or "a medical device stops", the plug is the wrong tool regardless of the electrical maths.

None of this makes smart plugs a risky product. It makes them a product with a specified limit, sold at a price that encourages people to ignore it.
