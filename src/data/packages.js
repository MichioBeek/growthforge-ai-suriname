// Visitors pick a CATEGORY, not an individual business type — businesses in
// the same category all get the exact same offer, so there's no need (and
// no plan) to ever list individual business types out one by one. Only add
// a new category (with its own entry in PACKAGE_TIERS_BY_CATEGORY) when a
// niche's automation priorities genuinely differ — grounded in
// SOP - AI Automation Menu by Niche (Obsidian vault), which sets, per
// niche, which automation solves the most real pain first.
//
// Pricing (rebuilt 2026-10-01): synced 1:1 with SOP - Prijskaart Q4 2026
// (Obsidian vault) — THE single source of truth; the lead bot and the
// prijskaart artifact quote the same numbers. The three cards are now the
// three Q4 Automatiseringspakketten: 1) Website + Review AI, 2) Alles-in-één
// (middle, highlighted — "de meeste klanten pakken alles-in-één"),
// 3) WhatsApp-bot + Review AI. Card slots keep the old starter/groei/premium
// ids because PakketResultaat.jsx keys icons + accent styling on them.
// Q4 rules baked in: no "vanaf" — every price is an exact computed total
// (pakketprijs = met Basic website; Medium +$250, Pro +$600); opzetkosten
// and maandprijs always shown separately with their breakdown; hosting
// $15/mnd standard on every website; bot monthly = volumetier (new clients
// start on Rustig $75, tot ~300 gesprekken/mnd) + review AI $20; the bot
// niveau differs per niche (booking/creative/makelaar = niveau 3 boekingen,
// restaurant = niveau 4 bestellingen → P2 $335→$485, P3 $475→$625).
// Change prices HERE only after the Q4 SOP changes, never the other way.

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

// Builds the three Q4 pakket-cards for one niche. `bot` describes what the
// bot does in that niche's own words; prices come straight from the Q4
// matrix for that bot niveau.
const q4Cards = ({ botFeature, reviewFeature, p2Setup, p3Setup, extraP1Features = [] }) => [
  {
    id: 'starter',
    name: 'Website + Review AI',
    setupPrice: '$199',
    monthlyPrice: '$35/mnd',
    tagline: 'Professioneel online + automatisch meer Google reviews',
    features: [
      'Complete website — prijs is met Basic; Medium +$250, Pro +$600',
      reviewFeature,
      'Maandprijs: review AI $20 + hosting $15',
      'Alleen een website? Basic $150 eenmalig + $15/mnd hosting',
      ...extraP1Features,
    ],
    highlight: false,
  },
  {
    id: 'groei',
    name: 'Alles-in-één',
    setupPrice: p3Setup,
    monthlyPrice: '$110/mnd',
    tagline: 'Website, WhatsApp-bot en review AI in één systeem',
    features: [
      'Complete website — prijs is met Basic; Medium +$250, Pro +$600',
      botFeature,
      reviewFeature,
      'Maandprijs: bot $75 (Rustig, tot ±300 gesprekken/mnd) + review AI $20 + hosting $15',
    ],
    highlight: true,
  },
  {
    id: 'premium',
    name: 'WhatsApp-bot + Review AI',
    setupPrice: p2Setup,
    monthlyPrice: '$95/mnd',
    tagline: 'Al een website? Dan alleen de automatisering',
    features: [
      botFeature,
      reviewFeature,
      'Maandprijs: bot $75 (Rustig, tot ±300 gesprekken/mnd) + review AI $20',
    ],
    highlight: false,
  },
]

export const PACKAGE_TIERS_BY_CATEGORY = {
  // Booking-type businesses (kapper/salon/nagelstudio/lash studio): bot
  // niveau 3 (boekingen maken) — P2 $335, P3 $475 per the Q4 matrix. The
  // goedkope statische boekingskalender wordt hier ook genoemd (Q4-regel:
  // altijd beide boekingsvormen noemen, klant kiest op budget).
  booking: q4Cards({
    botFeature: 'WhatsApp boekingsbot — plant afspraken in én beantwoordt vragen, 24/7',
    reviewFeature: 'Google review AI — vraagt na elke afspraak automatisch om een review',
    p2Setup: '$335',
    p3Setup: '$475',
    extraP1Features: ['Boekingskalender erbij? +$75 eenmalig + $30/mnd'],
  }),

  // Fotografen/videografen: zelfde niveau 3 boekingsbot, maar dan voor
  // shoots — vangt "wat kost het" op terwijl u zelf aan het schieten bent.
  creative: q4Cards({
    botFeature: 'WhatsApp boekingsbot — plant shoots in en beantwoordt prijsvragen, ook tijdens uw shoots',
    reviewFeature: 'Google review AI — vraagt na elke levering automatisch om een review',
    p2Setup: '$335',
    p3Setup: '$475',
    extraP1Features: ['Boekingskalender erbij? +$75 eenmalig + $30/mnd'],
  }),

  // Makelaars: speed-to-lead is de grootste hefboom — niveau 3 bot reageert
  // direct op elke lead en plant bezichtigingen in.
  makelaar: q4Cards({
    botFeature: 'WhatsApp-bot — reageert direct op elke lead en plant bezichtigingen in',
    reviewFeature: 'Google review AI — vraagt na elke deal automatisch om een review',
    p2Setup: '$335',
    p3Setup: '$475',
  }),

  // Restaurants/catering: niveau 4 bot (bestellingen aannemen) — P2 $485,
  // P3 $625 per de Q4-matrix.
  restaurant: q4Cards({
    botFeature: 'WhatsApp-bot — neemt reserveringen én bestellingen aan, ook buiten openingstijd',
    reviewFeature: 'Google review AI — vraagt na elk bezoek automatisch om een review',
    p2Setup: '$485',
    p3Setup: '$625',
  }),
}
