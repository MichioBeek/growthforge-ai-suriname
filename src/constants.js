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
export const WEBSITE_OFFER_SPOTS_REMAINING = 6
export const WEBSITE_OFFER_NEXT_PRICE = '$150–200'
export const WEBSITE_OFFER_WHATSAPP_LINK =
  'https://wa.me/5977422735?text=' + encodeURIComponent('Hoi Michio, ik wil de $50 website actie zien')

// The marketing homepage (hero, $50 offer, diensten, reviews, etc.) is the
// site root again — a visitor who clicks the link lands there, not on the
// quiz. The "Vind uw pakket" quiz lives at /pakket, reachable from the
// Navbar. Routes live here (not hardcoded in App.jsx/Navbar.jsx/pages) so
// every reference stays in sync if a path ever changes.
export const HOME_ROUTE = '/'
export const PAKKET_ROUTE = '/pakket'

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
