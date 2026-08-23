// Visitors pick a CATEGORY, not an individual business type — businesses in
// the same category all get the exact same offer, so there's no need (and
// no plan) to ever list individual business types out one by one. Only add
// a new category (with its own entry in PACKAGE_TIERS_BY_CATEGORY) when a
// niche's automation priorities genuinely differ — grounded in
// SOP - AI Automation Menu by Niche (Obsidian vault), which sets, per
// niche, which automation solves the most real pain first.
//
// Pricing (updated 2026-08-22 after Michio repriced the base booking system
// ($95/$45, was $50/$25) and appointment-type WhatsApp chatbot ($150/$50,
// was $100/$40) on SOP - Pricing & Packages — the old sums felt too cheap
// for what's actually being built). Groei tiers are now a plain sum of
// those two services (no markup, no discount) — since the base rates are
// now cost-accurate, the sum alone reflects real build effort. That's also
// why every non-booking category's Groei is identical: they're all the
// same 2 services applied to a different business type. Premium tiers are
// priced on VALUE, not cost-plus, same logic the Pricing SOP already uses
// for the booking category's own Premium bundle ("being the only one doing
// this locally is a legitimate pricing argument, not just a marketing
// line") — scaled per niche by how much a missed lead/booking actually
// costs that business (real estate commission > restaurant no-show).
// The 'booking' category's own Groei/Premium bundle was reconciled to the
// new base rates on 2026-08-23, then its 3rd service was swapped same-day
// from lead reactivation to review automation to actually match this
// niche's SOP menu (Groei $180/$75 → $295/$110; Premium $600–800/$250–350
// → $750–950/$300–400, bumped to preserve the gap to Groei) — see the
// vault SOP.

export const QUIZ_CATEGORIES = [
  {
    id: 'booking',
    label: 'Dienstverlening op afspraak',
    description: 'Kapper, schoonheidssalon, nagelstudio, lash studio en vergelijkbare bedrijven waar klanten een afspraak boeken',
  },
  {
    id: 'creative',
    label: 'Fotografie & video',
    description: 'Fotografen, videografen en vergelijkbare creatieve dienstverleners die shoots boeken',
  },
  {
    id: 'makelaar',
    label: 'Vastgoedmakelaars',
    description: 'Makelaars en vergelijkbare bedrijven met veel inkomende leads die snel opgevolgd moeten worden',
  },
  {
    id: 'restaurant',
    label: 'Restaurants & catering',
    description: 'Restaurants, catering en vergelijkbare bedrijven met reserveringen en bestellingen',
  },
]

const WEBSITE_TIER = {
  id: 'starter',
  name: 'Starter',
  setupPrice: '$50',
  monthlyPrice: null,
  tagline: 'Eenmalig — uw eerste stap online',
  features: [
    'Complete website met uw eigen info, foto’s en contactgegevens',
    'Live binnen enkele dagen na betaling',
  ],
  highlight: false,
}

// Every Premium tier ends with these 3 lines — kept identical across
// categories on purpose so the Premium tier reads consistently sitewide.
const PREMIUM_EXTRAS = [
  'Gratis eigen domeinnaam (1 jaar, normaal $20/jaar)',
  'Prioriteit levering',
  'Rechtstreeks lijntje met Michio — geen supportqueue',
]

export const PACKAGE_TIERS_BY_CATEGORY = {
  // Booking-type businesses (kapper/salon/nagelstudio/lash studio — the
  // "Nail Studios / Lash Studios / Aesthetic Beauty" niche in
  // SOP - AI Automation Menu by Niche): booking is the #1 pain, then
  // chatbot, then REVIEW AUTOMATION — that SOP's menu for this niche never
  // includes lead reactivation, it's Instagram/review-driven growth
  // instead. Swapped 2026-08-23 (was reactivation, which fits restaurants/
  // photographers better, not this niche) per Michio's call.
  // Groei = plain sum of booking ($95/$45) + appointment chatbot ($150/$50)
  // + review automation ($50/$15) at current base rates = $295/$110.
  // Premium bumped 2026-08-23 to preserve a clear gap above Groei; still
  // value-priced, not a strict multiple.
  booking: [
    WEBSITE_TIER,
    {
      id: 'groei',
      name: 'Groei',
      setupPrice: '$295',
      monthlyPrice: '$110/mnd',
      tagline: 'Onze meest gekozen combinatie',
      features: [
        'Online boekingssysteem',
        'AI Chatbot via WhatsApp',
        'Automatisch reviewverzoek na afspraak',
      ],
      highlight: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      setupPrice: '$750–950',
      monthlyPrice: '$300–400/mnd',
      tagline: 'Voor wie maximaal wil opschalen',
      features: [
        'Online boekingssysteem',
        'AI Chatbot via WhatsApp',
        'Automatisch reviewverzoek na afspraak',
        ...PREMIUM_EXTRAS,
      ],
      highlight: false,
    },
  ],

  // Fotografen/videografen: SOP zegt booking+aanbetaling (voorkomt no-shows)
  // en chatbot (vangt "wat kost het" op tijdens een shoot) eerst, dan
  // reviews (net na levering is het beste moment) en reactivatie.
  creative: [
    WEBSITE_TIER,
    {
      id: 'groei',
      name: 'Groei',
      setupPrice: '$245',
      monthlyPrice: '$95/mnd',
      tagline: 'Voorkomt no-shows en gemiste leads tijdens een shoot',
      features: [
        'Boekingssysteem met aanbetaling',
        'AI Chatbot via WhatsApp',
      ],
      highlight: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      setupPrice: '$750',
      monthlyPrice: '$300/mnd',
      tagline: 'Volledige groei-stack — nooit meer een gemiste boeking',
      features: [
        'Boekingssysteem met aanbetaling',
        'AI Chatbot via WhatsApp',
        'Automatisch reviewverzoek na levering',
        'Automatische klant-reactivatie',
        ...PREMIUM_EXTRAS,
      ],
      highlight: false,
    },
  ],

  // Makelaars: SOP zegt speed-to-lead is verreweg de grootste hefboom
  // (gemiste lead = gemiste commissie), dus chatbot eerst voor snelle
  // opvolging, Voice AI in Premium voor wie echt veel leadvolume heeft.
  makelaar: [
    WEBSITE_TIER,
    {
      id: 'groei',
      name: 'Groei',
      setupPrice: '$245',
      monthlyPrice: '$95/mnd',
      tagline: 'Reageer direct op elke lead, boek bezichtigingen automatisch',
      features: [
        'AI Chatbot via WhatsApp',
        'Online boekingssysteem voor bezichtigingen',
      ],
      highlight: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      setupPrice: '$1.200',
      monthlyPrice: '$500/mnd',
      tagline: 'Voor makelaars met veel leads — geen gemiste lead, ooit',
      features: [
        'AI Chatbot via WhatsApp',
        'Online boekingssysteem voor bezichtigingen',
        'Voice AI agent — neemt en kwalificeert inkomende telefoontjes',
        'Automatische klant-reactivatie',
        ...PREMIUM_EXTRAS,
      ],
      highlight: false,
    },
  ],

  // Restaurants/catering: SOP zegt reserveringen/no-shows eerst, dan
  // chatbot voor bestellingen buiten openingstijd, dan reviews na bezoek.
  restaurant: [
    WEBSITE_TIER,
    {
      id: 'groei',
      name: 'Groei',
      setupPrice: '$245',
      monthlyPrice: '$95/mnd',
      tagline: 'Minder gemiste reserveringen en bestellingen buiten openingstijd',
      features: [
        'Online reserveringssysteem',
        'AI Chatbot via WhatsApp',
      ],
      highlight: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      setupPrice: '$450',
      monthlyPrice: '$175/mnd',
      tagline: 'Volledige stack inclusief automatische reviews',
      features: [
        'Online reserveringssysteem',
        'AI Chatbot via WhatsApp',
        'Automatisch reviewverzoek na bezoek',
        ...PREMIUM_EXTRAS,
      ],
      highlight: false,
    },
  ],
}
