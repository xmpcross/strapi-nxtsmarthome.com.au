/**
 * Pillar content for the two guide categories, Buying Guides and Setup Guides.
 *
 * Each category page reads as one long guide: sections that explain part of the
 * subject, each followed by the category's own posts that go deeper. Only posts
 * in that category are listed; any post not placed in a section here appears
 * under "More guides" at the end, so a new post is never hidden.
 *
 * Editorial rules apply (CLAUDE.md, PRODUCT.md): Australian English, no invented
 * figures or test claims, and legal or safety points direct readers to the
 * regulator rather than stating the law.
 */
export interface PillarSection {
  id: string;
  heading: string;
  paragraphs: string[];
  /** A short, scannable list after the prose. */
  checklist?: { title: string; items: string[] };
  /** Post slugs in this category, in reading order. */
  posts: string[];
}

export interface GuidePillar {
  /** Opening paragraphs under the H1, after the category intro. */
  lead: string[];
  sections: PillarSection[];
  /** Common questions, answered briefly, each pointing to the guide that goes further. */
  faq?: { q: string; a: string }[];
}

export const guidePillars: Record<string, GuidePillar> = {
  'buying-guides': {
    lead: [
      'This page is the map. Each section below covers one part of buying smart home gear in Australia, explains what matters, and lists the guides that go into it properly.',
      'Every guide here is research-based. We work from manufacturer documentation, published specifications, Australian standards and regulator guidance rather than lab testing, and we say which is which.',
    ],
    sections: [
      {
        id: 'start-here',
        heading: 'Start here: your first purchases',
        paragraphs: [
          'A smart plug, a smart bulb or a smart speaker is a sensible first purchase. Each is inexpensive, plugs or screws in without touching the wiring, and shows you how the app and voice assistant behave before you commit to more.',
          'Before you buy anything else, decide which platform the home will be built around: Apple Home, Google Home, Amazon Alexa or Home Assistant. That choice decides which devices work together, so it is worth making once and early.',
          'Start with a problem rather than a product. A lamp you switch on every evening, a heater you forget to turn off, a front door you want to check from work: each points to one device that earns its place. Buying a box of gadgets first and looking for uses later is an easy way to end up with a drawer of unused gear.',
          'Keep the first purchase cheap and reversible. If you end up disliking the app or the voice assistant, a smart plug can be moved, repurposed or given away. A hardwired switch cannot.',
        ],
        checklist: {
          title: 'Before your first purchase',
          items: [
            'Pick the platform you will use: Apple Home, Google Home, Alexa or Home Assistant.',
            'Check the box or listing says it works with that platform, or with Matter.',
            'Check how it connects: Wi-Fi, Bluetooth, or a hub using Zigbee or Thread.',
            'Buy from a retailer with a clear returns policy.',
          ],
        },
        posts: ['smart-home-starter-guide-beginners-australia', 'smart-home-devices-under-50-australia'],
      },
      {
        id: 'how-you-live',
        heading: 'Buying for how you live',
        paragraphs: [
          'The right device depends on who lives in the home and how long they will stay. A renter needs gear that installs without drilling or rewiring. A share house needs devices that housemates can share, or take with them when they move. An older relative needs something simple that keeps working when an app or account does not.',
          'Renters should favour plug-in, screw-in, stick-on and free-standing gear, and talk to the landlord or agent before fixing anything to walls or doors. Your state or territory’s tenancy authority explains the rules on changes to a rental.',
          'If several people share the home, think about accounts before you buy. Shared devices work best on a household account or a platform that supports several users, so nobody is locked out when one person moves out or changes their phone.',
          'For an older relative, simplicity and reliability matter more than features: a device that works by voice or a physical button, keeps working through an internet outage, and can be managed by a family member from another home.',
        ],
        checklist: {
          title: 'Questions to answer first',
          items: [
            'How long will you live here, and can the device move with you?',
            'Who needs to control it, and from which phone or voice assistant?',
            'Does it need permission from a landlord or owners corporation?',
            'What happens to it if the internet or the app goes down?',
          ],
        },
        posts: [
          'smart-home-for-renters-australia',
          'smart-home-devices-students-share-houses',
          'smart-home-devices-home-office',
          'smart-home-devices-older-australians',
          'smart-home-holiday-house-australia',
        ],
      },
      {
        id: 'where-to-buy',
        heading: 'Where and how to buy in Australia',
        paragraphs: [
          'Where you buy affects more than the price. Australian retailers stock different slices of the smart home market and run their own returns and price-match policies, while an imported or second-hand device can arrive with a different plug, a radio frequency that is not used here, or an account lock from its last owner.',
          'Compare like with like. The same product can be sold under slightly different model numbers by different retailers, and a cheaper marketplace listing may be a different regional version. Check the model number, the plug and the supported frequencies, not just the product name.',
          'Look for the RCM mark on mains-powered gear. When you buy from an Australian business, Australian Consumer Law gives you consumer guarantees; the ACCC explains what they cover and how to make a claim.',
          'Keep the receipt and the box until you are sure the device works in your home. A returns window is the cheapest way to find out that something does not suit you.',
        ],
        checklist: {
          title: 'Before you pay',
          items: [
            'The RCM mark on anything that plugs into the mains.',
            'An Australian plug and power supply.',
            'A model number that matches the Australian version.',
            'A seller you can return it to, with the returns and warranty terms understood.',
          ],
        },
        posts: [
          'where-to-buy-smart-home-australia',
          'overseas-smart-home-devices-australia',
          'second-hand-smart-home-devices-australia',
        ],
      },
      {
        id: 'buy-to-last',
        heading: 'Buying gear that lasts',
        paragraphs: [
          'Smart devices often stop working because a company retires an app or a cloud service, not because the hardware fails. Devices that support an open standard such as Matter, or that keep working locally without the internet, carry less of that risk.',
          'Look at who makes the device and how they have treated earlier models. A brand that keeps publishing updates for older products is a safer bet than an unknown name selling similar hardware for less.',
          'Prefer devices that work locally. If a switch or sensor needs a company’s server to respond, it stops being smart when that server goes away. One that works through a local hub or Matter controller keeps going.',
          'A hub can tie different brands together and keep automations running without the cloud, but not every home needs one. Work out what you want to connect before you buy a hub.',
        ],
        checklist: {
          title: 'Signs a device will last',
          items: [
            'Supports Matter, or works with a local hub.',
            'Its basic functions work without an internet connection.',
            'The maker publishes firmware updates and a support policy.',
            'It works with more than one platform.',
          ],
        },
        posts: ['future-proof-smart-home-devices-australia', 'smart-home-hub-buying-guide-australia'],
      },
    ],
    faq: [
      {
        q: 'Do I need a smart home hub?',
        a: 'Not always. Many Wi-Fi and Matter devices work without one. A hub becomes useful when you add Zigbee or Thread sensors, want automations to run without the cloud, or mix brands that do not otherwise talk to each other. The hub buying guide covers when one is worth it.',
      },
      {
        q: 'Can I use smart home devices bought overseas?',
        a: 'Not automatically. Power supplies, plugs and radio frequencies can all differ from the Australian versions. Look for the RCM mark and an Australian plug, and read the guide to overseas devices before importing.',
      },
      {
        q: 'Is second-hand smart home gear worth buying?',
        a: 'It can be, if the device can be reset and moved to your account, is still supported by its maker, and comes with its power supply. The second-hand guide lists what to check before you pay.',
      },
      {
        q: 'Why don’t these guides give star ratings?',
        a: 'Because a score implies hands-on testing, and these guides are research-based. They explain the trade-offs instead, so you can decide what suits your home.',
      },
    ],
  },
  'setup-guides': {
    lead: [
      'This page follows the order most setups go in: the network first, then coverage, then the routines and dashboards that make the gear useful. Each section explains what matters and links the guides that walk through it step by step.',
      'Most of these guides need nothing more than a phone and access to your router’s settings. Where a job involves your home’s wiring, we say so and point you to a licensed electrician.',
    ],
    sections: [
      {
        id: 'network-first',
        heading: 'Get the Wi-Fi right first',
        paragraphs: [
          'Many setup problems trace back to the home network. Plenty of smart plugs, cameras and doorbells only connect on the 2.4GHz band, and a crowded network can drop devices that worked fine on day one.',
          'Before you start, find your router’s admin address and login, and check whether your provider’s modem lets you split or rename the 2.4GHz and 5GHz bands. Some provider-supplied modems hide these settings.',
          'Pair each device close to the router first, then move it into place. If a device works next to the router but drops out in its final spot, the problem is coverage, not the device.',
          'Sorting the network out before adding more devices saves troubleshooting later: find the right band, consider a separate network for smart devices, and know how to diagnose a device that keeps going offline.',
        ],
        checklist: {
          title: 'Before you pair a new device',
          items: [
            'Your phone is on the Wi-Fi band the device needs.',
            'The router’s admin login is to hand.',
            'The device’s app is installed and up to date.',
            'The device is near the router for its first pairing.',
          ],
        },
        posts: [
          'connect-smart-devices-2-4ghz-wifi',
          'separate-wifi-network-smart-devices',
          'fix-smart-home-wifi-dropouts',
        ],
      },
      {
        id: 'coverage',
        heading: 'Reaching every corner of the house',
        paragraphs: [
          'Australian construction can be hard on wireless signals. Double brick, foil insulation and metal-clad garages all block radio. Zigbee and Thread devices form a mesh through mains-powered devices, so where you put the coordinator and the repeaters decides how far the network reaches.',
          'Battery sensors do not pass the signal on; mains-powered devices such as smart plugs and many bulbs do. Place a few of those between the hub and the far end of the house before adding sensors out there.',
          'For Wi-Fi itself, a mesh system with a node near the garage or granny flat often works better than a single, stronger router.',
        ],
        checklist: {
          title: 'Planning coverage',
          items: [
            'Put the hub or coordinator somewhere central, away from the Wi-Fi router.',
            'Add mains-powered repeaters before battery sensors.',
            'Test each room before mounting anything permanently.',
          ],
        },
        posts: ['zigbee-mesh-garage-granny-flat-double-brick-home'],
      },
      {
        id: 'automations',
        heading: 'Automations and voice control',
        paragraphs: [
          'Once devices are connected, a handful of simple routines does most of the work: lights that follow the time of day, an away mode, appliances on a schedule.',
          'Start with routines that save you something you do every day, and keep each one simple: one trigger, one or two actions. A complicated routine is hard to fix when it stops working.',
          'Name devices by room and what they are, such as “Kitchen bench light”, and avoid names that sound alike. Clear, consistent names for devices and rooms make voice commands more dependable, and they cost nothing to fix.',
        ],
        checklist: {
          title: 'First routines to try',
          items: ['Morning lighting', 'Away mode', 'Appliance scheduling', 'Wind-down', 'Security check'],
        },
        posts: ['smart-home-automation-routines-beginners', 'name-smart-devices-voice-commands'],
      },
      {
        id: 'energy',
        heading: 'Energy and solar dashboards',
        paragraphs: [
          'With rooftop solar and time-of-use tariffs, the useful question is when you use power, not just how much. Home Assistant can separate solar export from grid import and price each against your tariff.',
          'You do not need Home Assistant to start. Many inverters and energy retailers already have apps that show generation and usage. A dashboard earns its place when you want to act on the numbers, such as running the dishwasher while solar is exporting.',
          'Check your tariff with your retailer before you build anything. Time-of-use windows and feed-in rates vary by retailer and state, and a dashboard is only as accurate as the rates you give it.',
        ],
        posts: ['home-assistant-energy-dashboard-solar-export-time-of-use-tariffs'],
      },
      {
        id: 'electrical-work',
        heading: 'Know where DIY stops',
        paragraphs: [
          'Work on your home’s fixed wiring is regulated in every state and territory and usually needs a licensed electrician. Plug-in, battery and screw-in devices avoid the question entirely.',
          'Before installing anything that connects to the wiring, check with your state or territory’s electrical safety regulator. They set the rules, and they are the authority on what you can do yourself.',
          'A licensed electrician can fit smart switches, dimmers and in-wall relays, and can tell you whether your switch boxes have the neutral wire many smart switches need. Ask what paperwork your state requires for the job, and keep a copy.',
        ],
        posts: ['smart-home-electrical-work-australia-legal'],
      },
    ],
    faq: [
      {
        q: 'Why won’t my smart device connect to Wi-Fi?',
        a: 'Common reasons are a device that needs 2.4GHz while your phone is on 5GHz, a Wi-Fi password the device does not accept, or a weak signal where the device sits. The 2.4GHz and dropout guides walk through each.',
      },
      {
        q: 'Do I need Home Assistant?',
        a: 'No. Apple Home, Google Home and Alexa suit most homes. Home Assistant suits people who want local control, mixed brands and detailed automations, and are happy to tinker.',
      },
      {
        q: 'Can I install a smart light switch myself?',
        a: 'A light switch is part of the fixed wiring, which in Australia is generally work for a licensed electrician. Check with your state or territory’s electrical safety regulator, and read the guide to where DIY stops. Plug-in and battery alternatives avoid the wiring entirely.',
      },
      {
        q: 'Why does my voice assistant control the wrong device?',
        a: 'Usually two devices or rooms have similar names, or a device sits in the wrong room in the app. Rename them with distinct, room-first names; the naming guide shows how.',
      },
    ],
  },
};
