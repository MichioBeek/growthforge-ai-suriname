// Shared config used across all sections — keep single source of truth so
// every CTA / contact point stays consistent and is easy to swap later.

// Every "Plan een gratis demo" / "Gratis demo" CTA scrolls here — the
// in-page booking section (#boeken), not an external URL.
export const DEMO_URL = '#boeken'

// GoHighLevel "Kennismaking — GrowthForge AI" calendar (15 min), permanent
// booking-widget link — stable regardless of the calendar's slug.
// Leave empty to show the BookingSection's fallback (WhatsApp/email) state.
export const GHL_CALENDAR_URL = 'https://api.leadconnectorhq.com/widget/booking/6Tu3uqXDk1SvHNoekGSp'

export const WHATSAPP_NUMBER = '+597 7422735'
export const WHATSAPP_LINK = 'https://wa.me/5977422735'
export const CONTACT_EMAIL = 'hello@growthforgeai.org'
