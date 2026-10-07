// Shared config used across all sections — keep single source of truth so
// every CTA / contact point stays consistent and is easy to swap later.

// Every "Plan een gratis demo" / "Gratis demo" CTA scrolls here — the
// in-page contact section (#boeken), not an external URL.
export const DEMO_URL = '#boeken'

export const WHATSAPP_NUMBER = '+597 7422735'
export const WHATSAPP_LINK = 'https://wa.me/5977422735'
export const CONTACT_EMAIL = 'hello@growthforgeai.org'

// Q4 2026 website tiers — synced 2026-10-01 with SOP - Prijskaart Q4 2026
// (Obsidian vault), the single source of truth that the lead bot and the
// /pakket quiz also quote. The old $50 launch actie (spots-teller) is dood
// sinds 2026-09-19 en is hier verwijderd. Hosting is standaard $15/mnd bij
// élke website — altijd meteen bij de prijs noemen, geen verrassing achteraf.
export const WEBSITE_TIERS = [
  {
    name: 'Basic',
    price: '$150',
    features: ['1–3 pagina’s', 'Uw eigen content en foto’s', 'Gratis subdomain'],
  },
  {
    name: 'Medium',
    price: '$400',
    features: [
      'Meerdere pagina’s',
      'Custom design en branding',
      'Galerij + contactformulier',
      'Basis SEO',
    ],
  },
  {
    name: 'Pro',
    price: '$750',
    features: [
      'Volledig maatwerk design',
      'Onbeperkt pagina’s',
      'Prioriteit: oplevering binnen 24 uur',
      '1 jaar eigen domeinnaam inbegrepen',
    ],
  },
]
export const WEBSITE_HOSTING_MONTHLY = '$15/mnd'
export const WEBSITE_OFFER_WHATSAPP_LINK =
  'https://wa.me/5977422735?text=' +
  encodeURIComponent('Hoi Michio, ik wil een website laten maken — wat zijn de mogelijkheden?')

// The marketing homepage (hero, website-aanbod, diensten, reviews, etc.) is the
// site root again — a visitor who clicks the link lands there, not on the
// quiz. The "Vind uw pakket" quiz lives at /pakket, reachable from the
// Navbar. Routes live here (not hardcoded in App.jsx/Navbar.jsx/pages) so
// every reference stays in sync if a path ever changes.
export const HOME_ROUTE = '/'
export const PAKKET_ROUTE = '/pakket'
export const START_ROUTE = '/start'
// $25 korting funnel switch: code + follow-ups go by WhatsApp template (the
// omzetto_korting_* ladder in the lead bot). false hides the popup + /korting form.
export const KORTING_LIVE = true

export const KORTING_ROUTE = '/korting'

// "$25 korting" sign-up funnel (Okt 2026). Same-origin path, proxied in
// netlify.toml to the lead bot (growthforge-lead-bot), which sends the code by
// WhatsApp template and runs the follow-up ladder. localStorage key remembers
// "signed-up" or a snooze-until timestamp so the popup doesn't nag.
export const SIGNUP_API = '/api/signup'
// Newsletter for visitors who are just looking (same lead bot, see netlify.toml).
export const NEWSLETTER_API = '/api/newsletter'
export const KORTING_STORAGE_KEY = 'omzetto-korting'

// Raw digits-only WhatsApp number (no +, no spaces) for wa.me links.
const WHATSAPP_NUMBER_RAW = '5977422735'

// Builds a wa.me deep link with a pre-filled message. Used by /start (the
// qualification landing page — see Start.jsx) to bake a visitor's answers
// straight into the opening WhatsApp message, so the lead bot starts the
// conversation with full context instead of a generic "meer info" opener.
export function buildWhatsAppLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(text)}`
}

// Fallback for a visitor on /pakket whose business doesn't fit any category
// yet — routes straight to WhatsApp instead of a made-up package quote.
export const PAKKET_OTHER_BUSINESS_WHATSAPP_LINK =
  'https://wa.me/5977422735?text=' +
  encodeURIComponent('Hoi Michio, ik heb de pakkettest gedaan maar mijn type bedrijf stond niet in de lijst — kunnen we praten?')

// Captures every meaningful moment in the /pakket flow into the "Pakket
// Quiz Leads" Google Sheet, even when the visitor never sends a WhatsApp
// message themselves. Make.com scenario "Pakket Quiz - Lead Capture"
// (id 6028072) -> Google Sheets addRow, then routes on `stage`:
//   - 'Bekeken'  (quiz completed, saw pricing) -> row only
//   - 'Telefoon' (left a number, no tier picked yet) -> row + email to Michio
//   - 'Aanvraag' (full request form submitted) -> row + email to Michio with
//     every field + a confirmation email to the lead's own address
// No automated outbound WhatsApp send anywhere in this: the existing bot
// can only free-text someone who has already messaged first (no approved
// WhatsApp message template), so anything past "Telefoon"/"Aanvraag" is a
// manual, personal follow-up by Michio, by design.
// Fire-and-forget: never throws, never blocks the UI — losing a sheet row
// is fine, losing the on-screen confirmation isn't.
const PAKKET_LEAD_WEBHOOK_URL = 'https://hook.us2.make.com/k2c9cfyqfvxaqrzyxewhghs888x18m8y'

export function capturePakketLead(payload) {
  fetch(PAKKET_LEAD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {})
}
