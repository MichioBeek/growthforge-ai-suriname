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
