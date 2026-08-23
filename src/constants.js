// Shared config used across all sections — keep single source of truth so
// every CTA / contact point stays consistent and is easy to swap later.

// Every "Plan een gratis demo" / "Gratis demo" CTA scrolls here — the
// in-page contact section (#boeken), not an external URL.
export const DEMO_URL = '#boeken'

export const WHATSAPP_NUMBER = '+597 7422735'
export const WHATSAPP_LINK = 'https://wa.me/5977422735'
export const CONTACT_EMAIL = 'hello@growthforgeai.org'

// $50 website launch offer (first 10 spots, then $150-200) — the WebsiteOffer
// section on the live site. Update WEBSITE_OFFER_SPOTS_REMAINING by hand
// every time a spot closes, same discipline as the Meta Ads campaign copy —
// this number is a real scarcity claim, not decorative, so it has to stay
// accurate against the Financials log, not just leads in progress.
export const WEBSITE_OFFER_TOTAL_SPOTS = 10
export const WEBSITE_OFFER_SPOTS_REMAINING = 8
export const WEBSITE_OFFER_NEXT_PRICE = '$150–200'
export const WEBSITE_OFFER_WHATSAPP_LINK =
  'https://wa.me/5977422735?text=' + encodeURIComponent('Hoi Michio, ik wil de $50 website actie zien')

// "Vind uw pakket" quiz is the site's landing page (root) — every visitor
// hits this first now. The original marketing homepage (hero, $50 offer,
// diensten, reviews, etc.) moved to /home, reachable via a "Home" button.
// Routes live here (not hardcoded in App.jsx/Navbar.jsx/pages) so every
// reference stays in sync if a path ever changes.
export const PAKKET_ROUTE = '/'
export const HOME_ROUTE = '/home'

// Builds a per-tier WhatsApp CTA link for the /pakket quiz results, reusing
// the same prefilled-message pattern as WEBSITE_OFFER_WHATSAPP_LINK.
export function buildPakketWhatsAppLink({ businessName, industryLabel, tierName }) {
  const message =
    `Hoi Michio, ik heb de pakkettest gedaan voor ${businessName} (${industryLabel}) ` +
    `en wil graag meer weten over het ${tierName} pakket.`
  return 'https://wa.me/5977422735?text=' + encodeURIComponent(message)
}

// Fallback for a visitor on /pakket whose business doesn't fit any category
// yet — routes straight to WhatsApp instead of a made-up package quote.
export const PAKKET_OTHER_BUSINESS_WHATSAPP_LINK =
  'https://wa.me/5977422735?text=' +
  encodeURIComponent('Hoi Michio, ik heb de pakkettest gedaan maar mijn type bedrijf stond niet in de lijst — kunnen we praten?')

// Fires alongside the WhatsApp CTA (never replaces it — see project memory
// on wedge-offer/WhatsApp-first sales) so a quiz completion lands in the
// "Pakket Quiz Leads" Google Sheet even if the visitor never actually sends
// the WhatsApp message. Make.com scenario "Pakket Quiz - Lead Capture"
// (id 6028072) -> Google Sheets addRow, plus (only when `phone` is set) an
// email to Michio so he can personally reach out on WhatsApp — a bot can't
// message someone who hasn't messaged first without an approved WhatsApp
// message template, which this project doesn't have, so this is a manual
// human follow-up by design, not automation. Fire-and-forget: never throws,
// never blocks the UI — losing a sheet row is fine, losing the WhatsApp
// handoff isn't.
const PAKKET_LEAD_WEBHOOK_URL = 'https://hook.us2.make.com/k2c9cfyqfvxaqrzyxewhghs888x18m8y'

export function capturePakketLead({ businessName, category, stage, tier = '', phone = '' }) {
  fetch(PAKKET_LEAD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ businessName, category, stage, tier, phone }),
  }).catch(() => {})
}
