// Tiny visitor beacon for Omzetto HQ (live "op de website" counter + website funnel).
// No cookies, no personal data: a random id per browser tab (sessionStorage) and the page path.
// Posts to /api/hit, which netlify.toml proxies to the lead bot.
const KEY = 'omz-sid'

function sid() {
  try {
    let v = sessionStorage.getItem(KEY)
    if (!v) { v = Math.random().toString(36).slice(2, 12) + Date.now().toString(36); sessionStorage.setItem(KEY, v) }
    return v
  } catch { return 'nosession' }
}

export function track(ev, p = window.location.pathname + window.location.hash) {
  if (/localhost|127\.0\.0\.1/.test(window.location.hostname) && !window.__omzTrackLocal) return
  const body = JSON.stringify({ sid: sid(), p, ev })
  try {
    if (navigator.sendBeacon) navigator.sendBeacon('/api/hit', new Blob([body], { type: 'application/json' }))
    else fetch('/api/hit', { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true })
  } catch { /* never break the site for analytics */ }
}

let pinging = false
export function startPing() {
  if (pinging) return
  pinging = true
  setInterval(() => { if (document.visibilityState === 'visible') track('ping') }, 30000)
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') track('ping') })
}
