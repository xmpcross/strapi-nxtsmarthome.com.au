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
  /** Post slugs in this category, in reading order. */
  posts: string[];
}

export interface GuidePillar {
  /** Opening paragraphs under the H1, after the category intro. */
  lead: string[];
  sections: PillarSection[];
}

export const guidePillars: Record<string, GuidePillar> = {
  'buying-guides': {
    lead: [
      'This page is the map. Each section below covers one part of buying smart home gear in Australia, and lists the guides that go into it properly.',
    ],
    sections: [
      {
        id: 'start-here',
        heading: 'Start here: your first purchases',
        paragraphs: [
          'A smart plug, a smart bulb or a smart speaker is a sensible first purchase. Each is inexpensive, plugs or screws in without touching the wiring, and shows you how the app and voice assistant behave before you commit to more.',
          'Before you buy anything else, decide which platform the home will be built around: Apple Home, Google Home, Amazon Alexa or Home Assistant. That choice decides which devices work together, so it is worth making once and early.',
        ],
        posts: ['smart-home-starter-guide-beginners-australia', 'smart-home-devices-under-50-australia'],
      },
      {
        id: 'how-you-live',
        heading: 'Buying for how you live',
        paragraphs: [
          'The right device depends on who lives in the home and how long they will stay. A renter needs gear that installs without drilling or rewiring. A share house needs devices that housemates can share, or take with them when they move. An older relative needs something simple that keeps working when an app or account does not.',
          'These guides start from the situation rather than the product, so you can skip the gear that does not fit your home.',
        ],
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
          'Look for the RCM mark on mains-powered gear. When you buy from an Australian business, Australian Consumer Law gives you consumer guarantees; the ACCC explains what they cover and how to make a claim.',
        ],
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
          'A hub can tie different brands together and keep automations running without the cloud, but not every home needs one. Work out what you want to connect before you buy a hub.',
        ],
        posts: ['future-proof-smart-home-devices-australia', 'smart-home-hub-buying-guide-australia'],
      },
    ],
  },
  'setup-guides': {
    lead: [
      'This page follows the order most setups go in: the network first, then coverage, then the routines and dashboards that make the gear useful. Each section links the guides that walk through it step by step.',
    ],
    sections: [
      {
        id: 'network-first',
        heading: 'Get the Wi-Fi right first',
        paragraphs: [
          'Many setup problems trace back to the home network. Plenty of smart plugs, cameras and doorbells only connect on the 2.4GHz band, and a crowded network can drop devices that worked fine on day one.',
          'Sorting the network out before adding more devices saves troubleshooting later: find the right band, consider a separate network for smart devices, and know how to diagnose a device that keeps going offline.',
        ],
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
        ],
        posts: ['zigbee-mesh-garage-granny-flat-double-brick-home'],
      },
      {
        id: 'automations',
        heading: 'Automations and voice control',
        paragraphs: [
          'Once devices are connected, a handful of simple routines does most of the work: lights that follow the time of day, an away mode, appliances on a schedule.',
          'Clear, consistent names for devices and rooms make voice commands more dependable, and they cost nothing to fix.',
        ],
        posts: ['smart-home-automation-routines-beginners', 'name-smart-devices-voice-commands'],
      },
      {
        id: 'energy',
        heading: 'Energy and solar dashboards',
        paragraphs: [
          'With rooftop solar and time-of-use tariffs, the useful question is when you use power, not just how much. Home Assistant can separate solar export from grid import and price each against your tariff.',
        ],
        posts: ['home-assistant-energy-dashboard-solar-export-time-of-use-tariffs'],
      },
      {
        id: 'electrical-work',
        heading: 'Know where DIY stops',
        paragraphs: [
          'Work on your home’s fixed wiring is regulated in every state and territory and usually needs a licensed electrician. Plug-in, battery and screw-in devices avoid the question entirely.',
          'Before installing anything that connects to the wiring, check with your state or territory’s electrical safety regulator. They set the rules, and they are the authority on what you can do yourself.',
        ],
        posts: ['smart-home-electrical-work-australia-legal'],
      },
    ],
  },
};
