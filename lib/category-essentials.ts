/**
 * "Start with these" picks for each topic category page, keyed by category slug.
 *
 * An editorial choice: the few guides a reader new to the topic should read
 * first, in order. Each `why` says what the guide helps with — it restates the
 * guide's own scope and makes no claim the guide does not.
 *
 * Slugs that are not published (renamed, merged, held by the editorial guard)
 * are skipped at render time, and the page tops the list up from the topic's
 * buying guides and comparisons, so a stale entry never leaves a gap.
 */
export interface Essential {
  slug: string;
  why: string;
}

/**
 * For a topic with nothing published yet: titles elsewhere on the site that
 * cover it, so the empty page still leads somewhere useful.
 */
export const crossTopicMatch: Record<string, RegExp> = {
  'smart-door-locks': /\b(smart )?locks?\b/i,
};

export const categoryEssentials: Record<string, Essential[]> = {
  'security-and-cameras': [
    { slug: 'video-doorbell-buying-guide-australia', why: 'What matters in a doorbell before you buy one.' },
    { slug: 'wired-vs-battery-security-cameras-australia', why: 'The first choice for any camera: how it gets power.' },
    {
      slug: 'local-recording-vs-cloud-subscriptions-security-cameras-australia',
      why: 'Where your footage lives, and what that costs over time.',
    },
    { slug: 'smart-home-privacy-cameras-australia-law', why: 'What to check before a camera can see past your boundary.' },
  ],
  lighting: [
    { slug: 'smart-bulbs-vs-smart-switches-australia', why: 'The first decision: change the bulb or the switch.' },
    { slug: 'smart-lighting-rental-australia-no-wiring', why: 'Smart lighting a renter can set up without touching wiring.' },
    {
      slug: 'smart-light-switches-neutral-wire-older-australian-homes',
      why: 'Switch options for older homes without a neutral wire.',
    },
    {
      slug: 'smart-downlights-australian-ceilings-insulation-clearance-rules',
      why: 'Downlights and ceiling insulation clearances, explained.',
    },
  ],
  'energy-and-solar': [
    { slug: 'smart-plug-buying-guide-australia', why: 'Choosing a smart plug for Australian sockets.' },
    { slug: 'smart-energy-monitors-australia', why: 'Monitors that show where your power actually goes.' },
    { slug: 'what-not-to-plug-into-a-smart-plug-australia', why: 'The appliances that should stay off a smart plug.' },
    { slug: 'standby-power-costs-appliances-australia', why: 'What appliances on standby add to your bill.' },
  ],
  'entertainment-and-audio': [
    { slug: 'smart-speakers-multiroom-audio-australia', why: 'Picking speakers that play together in every room.' },
    { slug: 'wireless-home-theatre-setup-australia', why: 'Setting up home theatre sound without running cables.' },
    { slug: 'streaming-box-australia-free-to-air-catch-up-tv', why: 'Streaming boxes and Australian free-to-air catch-up.' },
    { slug: 'echo-show-vs-nest-hub', why: 'The two smart displays, side by side.' },
  ],
  'climate-and-comfort': [
    { slug: 'make-split-system-aircon-smart-australia', why: 'Adding smart control to the split system you already have.' },
    {
      slug: 'smart-thermostat-gas-ducted-hydronic-heating-australia',
      why: 'Smart thermostats for gas, ducted and hydronic heating.',
    },
    { slug: 'smart-zoning-ducted-air-conditioning-cost-australia', why: 'What zoning a ducted system involves and costs.' },
    { slug: 'best-smart-fans-australia', why: 'Smart fans for Australian summers.' },
  ],
  'hubs-and-platforms': [
    { slug: 'best-smart-home-platform-australia', why: 'Apple Home, Google Home, Alexa or Home Assistant: where to start.' },
    { slug: 'what-is-matter-smart-home-australia', why: 'What Matter is and what it changes when you buy.' },
    { slug: 'zigbee-vs-zwave-vs-thread-vs-wifi', why: 'The wireless protocols behind smart devices, compared.' },
    { slug: 'smart-home-devices-without-internet', why: 'What keeps working when the internet drops.' },
  ],
  'robot-vacuums': [
    { slug: 'robot-vacuum-buying-guide-australia', why: 'What matters in a robot vacuum before you buy.' },
    { slug: 'roborock-vs-ecovacs-vs-dreame-australia', why: 'The three big brands, compared.' },
    { slug: 'robot-vacuum-running-costs-australia', why: 'Running costs beyond the purchase price.' },
    { slug: 'robot-vacuum-keeps-getting-stuck', why: 'Fixing a robot that keeps getting stuck.' },
  ],
};
