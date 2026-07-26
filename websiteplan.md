# GrowthForge AI — Website Build & Design Plan
### Cinematic landing page · Dutch language · Suriname-first · "Neural Chrome" theme

> **How to read this doc:** The *plan* is in English so it's fast to scan and hand to a builder (you or an AI agent). All **actual website copy** is written in **Dutch**, ready to paste. Where a decision is yours to make, it's flagged `⟶ DECIDE`.

---

## 0. TL;DR — What we're building

A single-page, custom-coded cinematic landing page (React/Vite + GSAP) for **GrowthForge AI**, positioning it as an AI automation agency for **local, appointment-based businesses in Suriname**. It sells four productized services and drives every visitor to **one action: book a free demo.** Visual direction: **Neural Chrome** — futuristic, premium, machine-grade.

The four services:
1. **AI Telefoniste** (Voice Receptionist) — picks up missed / after-hours calls and books the caller in.
2. **Google Review AI** — texts every client after a visit, routes happy ones to leave a Google review. ($75)
3. **Reactivatie AI** — automatically wins back past clients with a personal offer.
4. **AI Chatbot** — answers visitor questions on your website / WhatsApp 24/7 and books them in.

---

## 1. Strategy & Positioning

| Item | Decision |
|---|---|
| **Audience** | Local appointment-based businesses in Suriname (auto detailing, salons, clinics, barbers, dentists, garages). Owner-operators who lose money to missed calls, few reviews, and no follow-up. |
| **Language / tone** | Dutch, formal **"u"** form (respectful B2B, standard in Suriname). Plain, confident, no jargon. Aim Hemingway grade 5–7. |
| **Core promise** | *"Nooit meer een gemiste klant."* AI that answers your phone, brings in reviews, and revives old customers — 24/7. |
| **Primary CTA** | **Plan een gratis demo** (books a call / opens your existing buildmyagent.io demo). Everything funnels here. |
| **Pricing on-page** | None. Price is named on the demo call. The site sells the value and books the call. |
| **Payment reality** | Whop → PayPal → card. No Stripe. Keep checkout off-site; the site only books the demo. |

### Suriname localization — READ THIS, it changes the build
- **WhatsApp, not SMS.** In Suriname/SR, business↔customer messaging runs on WhatsApp. Build the Review AI and Reactivatie AI flows (and the copy on the site) around **WhatsApp**, not "sms/text." This is a real trust/conversion factor — a US-style "we'll text them" reads foreign. `⟶ DECIDE: confirm WhatsApp as the channel.`
- **Phone format:** +597 XXXXXX. Show a local WhatsApp number in the footer.
- **Currency:** You price in USD ($75). Locally, buyers think in **SRD**. Either (a) keep USD and let the demo call handle price, or (b) show "vanaf US$ 75 p/m" + note "betaling in SRD mogelijk." `⟶ DECIDE.`
- **Trust signals:** local businesses buy from people they trust. Add a founder line ("Gebouwd in Suriname, voor Surinaamse ondernemers") and, once you have one, a local case result.
- **Rebrand note:** you've floated a unique Dutch name instead of "GrowthForge AI." This plan uses GrowthForge AI; if you rebrand, only the logo text + a few copy lines change. Don't let this block the build. `⟶ DECIDE later.`

---

## 2. Design System — "Neural Chrome" (LOCKED)

A custom scheme built for a futuristic, premium AI-agency feel. It replaces the master prompt's four presets. The premium comes from **restraint**: the page is mostly Void + Platinum + Ice, with Ion Cyan used sparingly as the single electric accent and Plasma reserved for glows only. That's the line between "premium machine" and "gaming keyboard."

### Palette
| Token | Hex | Role |
|---|---|---|
| **Void** | `#080B14` | Background / canvas — a deep blue-black, not pure black (reads "deep space / machine"). |
| **Ion Cyan** | `#3DE7DE` | Primary electric accent — CTAs, key words, active states, glows. Use sparingly. |
| **Plasma** | `#7C6BFF` | Secondary accent — **glows and gradients only**, never as a fill behind text. Adds neural-network depth. |
| **Platinum** | `#CBD5E1` | Metallic secondary — subheadings, borders, secondary text, chrome details. The premium anchor. |
| **Ice** | `#EAF2FB` | Primary text — cool white. |
| *(Carbon)* | `#12161F` | Optional raised-surface tint for cards, one step above Void. |

### Type Stack
- **Headings:** *Sora* (geometric, futuristic), tight tracking (`-0.02em`).
- **Drama:** *Instrument Serif* Italic — the massive serif lines. More modern than Playfair; pairs with the tech feel.
- **Data / labels:** *JetBrains Mono* — chosen for legibility (see rule below).

### Image direction
Dark machine-grade imagery, heavily dimmed under a Void gradient: server-room bokeh, brushed/liquid metal, circuit-board macro, deep-blue abstract light, chrome surfaces. No warm tones. Unsplash, real URLs only.

### ⚠️ Small-text legibility rule (non-negotiable — you asked for this)
Dark themes fail when small type goes dim. Enforce all of the following:
- **Color:** all small text (mono labels, captions, sub-labels, descriptors, footer links) is **Ice `#EAF2FB`** or **Platinum `#CBD5E1`** — never a dim grey and never low-opacity text on Void.
- **Opacity floor:** no text below `opacity: 0.85`. Body/descriptor text sits at `0.9`–`1.0`. (Glows and decorative lines can be dimmer — text cannot.)
- **Size floor:** body/descriptor ≥ `15px`; mono labels/captions ≥ `13px` desktop, ≥ `12px` mobile. Never below 12px anywhere.
- **Mono tracking:** give `JetBrains Mono` labels `letter-spacing: 0.12em` and uppercase only for short labels — spaced-out mono reads far better than tight uppercase.
- **Contrast target:** ≥ 4.5:1 against Void. Ice, Platinum, and Ion Cyan all clear this easily. **Plasma `#7C6BFF` fails as text on Void — never use it for readable text, glow only.**
- **Weight:** small text minimum `font-weight: 400`; prefer `500` for mono labels so thin strokes don't disappear.

### Global rules (apply everywhere, no exceptions)
- **Texture:** inline SVG `<feTurbulence>` noise @ `0.05` opacity across the page, plus an optional faint circuit/grid line pattern @ very low opacity for the tech feel. Kills flat digital gradients.
- **Glow (new, on-brand):** primary CTAs and active accents get a soft Ion Cyan glow (`box-shadow: 0 0 20px rgba(61,231,222,0.35)`). Use on interactive/accent elements only — never behind body text.
- **Radii:** everything `rounded-[2rem]` → `rounded-[3rem]`. No sharp corners anywhere.
- **Buttons:** magnetic `scale(1.03)` on hover, `cubic-bezier(0.25,0.46,0.45,0.94)`; `overflow-hidden` with a sliding Ion-Cyan background `<span>` for the color wipe; glow intensifies on hover.
- **Links/interactives:** `translateY(-1px)` lift on hover; accent underline/glow in Ion Cyan.
- **GSAP:** wrap in `gsap.context()` inside `useEffect`, clean up with `ctx.revert()`. Entrance `power3.out`, morph `power2.inOut`. Stagger `0.08` text / `0.15` cards.

---

## 3. Section-by-Section Build + Dutch Copy Deck

Structure is fixed (from the master prompt). Content below is final Dutch copy — paste-ready.

### A. Navbar — "The Floating Island"
Fixed centered pill. Transparent + Ice text over hero; on scroll-out morphs to `bg-void/60 backdrop-blur-xl` + Ion-Cyan accents + subtle Platinum border.

- **Logo:** `GrowthForge AI`
- **Links (Platinum, ≥14px):** `Diensten` · `Werkwijze` · `Contact`
- **CTA button (Ion Cyan, Void text, cyan glow):** `Gratis demo`

### B. Hero — "The Opening Shot"
Full-bleed `100dvh`, dark machine/circuit Unsplash image under a heavy Void→black `bg-gradient-to-t`. Content bottom-left third. GSAP stagger fade-up (`y:40→0`).

> The master prompt's hero pattern is an English idiom ("X meets Y") that doesn't translate cleanly. I've adapted it to a two-line Dutch contrast that keeps the *bold-sans + massive-serif-italic* structure and converts better. Recommended primary below, with alternates.

**Primary:**
- Label (mono, Ion Cyan, ≥13px, `letter-spacing:0.12em`, with a small pulsing cyan dot): `AI-AUTOMATISERING · SURINAME`
- Line 1 (Sora, Ice): `Nooit meer een`
- Line 2 (massive Instrument Serif italic, 3–5× line 1, Platinum with Ion-Cyan accent word): `gemiste *klant.*`
- Subline (Ice, `opacity:0.9`, ~1 sentence): `GrowthForge AI installeert slimme assistenten die uw telefoon opnemen, reviews binnenhalen en oude klanten terugbrengen — dag en nacht, volautomatisch.`
- CTA (Ion Cyan, glow): `Plan een gratis demo`

**Alternates (`⟶ DECIDE`):**
- `Uw bedrijf werkt hard.` / *`Laat AI meewerken.`*
- `Elke oproep.` / *`Elke klant. Opgevangen.`*

### C. Features — "Interactive Functional Artifacts"
Four cards that read as *working software micro-UIs*, not marketing tiles. `bg-carbon` surface · subtle Platinum border · `rounded-[2rem]` · soft cyan edge-glow on hover · Sora heading (Ice) + short Platinum descriptor.

> **Layout deviation from the master spec:** the spec fixes this at three cards. Four services means a **2×2 grid on desktop** (stacks to one column on mobile). Keep the card *styling* and animation rigor identical to the spec — only the grid count changes.

> **Card→service mapping (reordered for best fit — do this, don't follow raw order):** each animation pattern should demo the service it actually resembles.

**Card 1 — Diagnostic Shuffler → Reactivatie AI**
Three overlapping client cards cycling vertically every 3s (`array.unshift(array.pop())`, spring ease `cubic-bezier(0.34,1.56,0.64,1)`).
- Heading: `Reactivatie AI`
- Descriptor: `Brengt oude klanten automatisch terug met een persoonlijk aanbod.`
- 3 cycling sub-labels (Ice/Platinum, ≥13px):
  - `Laatste bezoek · 3 mnd geleden`
  - `Aanbod verstuurd · 10% korting`
  - `Nieuwe afspraak · geboekt ✓`

**Card 2 — Telemetry Typewriter → Google Review AI**
Monospace live-feed typing messages char-by-char, blinking Ion-Cyan cursor, "Live" label + pulsing dot. Type the *actual* WhatsApp exchange:
- Heading: `Google Review AI`
- Descriptor: `Stuurt na elke afspraak automatisch een bericht en haalt zo meer 5-sterren reviews binnen.`
- Live-feed lines (Ice mono, ≥13px, loop):
  - `→ Bedankt voor uw bezoek! Was u tevreden met het resultaat?`
  - `← Ja, super!`
  - `→ Wat fijn! Wilt u ons helpen met een korte review? ⭐`
  - `→ [Google review link verstuurd]`

**Card 3 — Cursor Protocol Scheduler → AI Telefoniste**
Weekly `Z M D W D V Z` grid; animated SVG cursor enters, clicks a day (`scale(0.95)` press), highlights it Ion Cyan, moves to a "Boek" button, fades out.
- Heading: `AI Telefoniste`
- Descriptor: `Neemt gemiste en na-uur oproepen aan en boekt de beller direct in.`
- Grid label: `Beschikbare tijden` · button: `Boek`

> Dutch weekday initials for the grid: **Z M D W D V Z** (Zo Ma Di Wo Do Vr Za).

**Card 4 — Conversational Bubble Stream → AI Chatbot** *(new pattern)*
A live chat window: a visitor question bubble slides in (right), a typing indicator (three pulsing dots) appears, then the bot reply types in (left, char-by-char), ending with two quick-reply chips. Loops. This is the most literal micro-UI of the set — it *is* the product.
- Heading: `AI Chatbot`
- Descriptor: `Beantwoordt vragen op uw website of WhatsApp — dag en nacht — en boekt bezoekers direct in.`
- Scripted exchange (loop):
  - Bezoeker: `Zijn jullie zaterdag open?`
  - Bot: `Ja! Zaterdag van 9:00 tot 15:00. Wilt u een afspraak maken?`
  - Quick-reply chips (Ion Cyan outline): `[Ja, graag]` `[Meer info]`

### D. Philosophy — "The Manifesto"
Full-width on Void. Parallaxing circuit/metal texture @ low opacity behind copy. GSAP line-by-line fade-up on ScrollTrigger.
- Small (Platinum, `opacity:0.9`): `De meeste bedrijven verliezen klanten aan drie dingen: gemiste telefoontjes, vergeten reviews, en stilte na het eerste bezoek.`
- Massive Instrument Serif italic, Ion-Cyan keyword: `*Wij vangen ze* **allemaal** *op — met AI die nooit slaapt.*`

### E. Protocol — "Sticky Stacking Archive"
Three full-screen cards that pin & stack on scroll (GSAP ScrollTrigger `pin:true`; card beneath → `scale(0.9)`, `blur(20px)`, `opacity 0.5`). Mono step number (Ion Cyan) · Sora title (Ice) · 2-line Platinum desc · unique canvas/SVG motif each (render motifs in Ion Cyan / Plasma line-art).

1. **`01 · Analyse`** — motif: slowly rotating concentric circles.
   `We bekijken uw bedrijf: gemiste oproepen, aantal reviews en terugkerende klanten. U ziet precies waar u omzet laat liggen.`
2. **`02 · Installatie`** — motif: scanning laser line over a dot grid.
   `We installeren en trainen uw AI-assistenten op úw bedrijf. Live binnen enkele dagen, zonder gedoe.`
3. **`03 · Groei`** — motif: pulsing EKG waveform (`stroke-dashoffset`).
   `De AI draait dag en nacht. U ziet meer boekingen, meer reviews en meer herhaalklanten — automatisch.`

### F. Slot-CTA — "The Closing Shot" (no pricing)
No pricing on the site — the master spec explicitly allows converting this slot into **one large-format CTA block**, which is the better move here: it keeps price off the page (you close on the demo call) and removes the #1 thing that makes local owners hesitate before they've seen the value.

Full-width on Void with a subtle Ion-Cyan ring + soft glow, `rounded-[3rem]`, noise overlay. Big centered statement + single button. GSAP fade-up on ScrollTrigger.
- Overline (mono, Ion Cyan, ≥13px): `KLAAR OM TE STARTEN?`
- Headline (massive Instrument Serif italic, Ice): `*Laat uw AI het werk doen.*`
- Subline (Ice, `opacity:0.9`): `In een gratis demo van 15 minuten laten we live zien wat de AI voor úw bedrijf kan doen. Geen verplichtingen.`
- Button (Ion Cyan, glow): `Plan een gratis demo`

> Prices stay off-page entirely. When someone asks, the demo call is where you name the setup + monthly. The only public number, if you want one anywhere, is the Google Review AI at US$ 75 — but you can keep even that for the call.

### G. Footer
Deep Void, `rounded-t-[4rem]`. Grid: brand + tagline · nav columns · legal. All footer text Platinum/Ice, ≥13px (legibility rule applies here most — footers are where dim text hides).
- Tagline: `AI-automatisering voor Surinaamse ondernemers.`
- Status badge (mono, pulsing green dot): `Systeem Operationeel`
- Contact: `hello@growthforgeai.org` · WhatsApp `+597 …` `⟶ ADD`
- Legal: `Privacy` · `Voorwaarden`

---

## 4. Technical Build Plan

**Stack (non-negotiable per master prompt):** React 19 · Tailwind v3.4.17 · GSAP 3 + ScrollTrigger · Lucide React. Fonts via Google Fonts `<link>` in `index.html`, scoped to Neural Chrome: **Sora**, **Instrument Serif**, **JetBrains Mono**.

**Files:**
- `index.html` — font links + root.
- `App.jsx` — single file; split into components only if it passes ~600 lines (e.g. `Hero.jsx`, `Features.jsx`, `Protocol.jsx`).
- `index.css` — Tailwind directives, the `feTurbulence` noise overlay, circuit-grid pattern, cyan-glow utility, custom utilities, keyframes.

**Design tokens (Tailwind config):** `void #080B14`, `ion #3DE7DE`, `plasma #7C6BFF`, `platinum #CBD5E1`, `ice #EAF2FB`, `carbon #12161F`.

**Images:** real Unsplash URLs matching Neural Chrome (dark server room, brushed/liquid metal, circuit macro, deep-blue abstract light). No placeholders, ever. Pre-pick 3–4 and hardcode.

**Demo CTA wiring:** every `Plan een gratis demo` / `Gratis demo` button → your booking calendar anchor (the one feeding buildmyagent.io) or a section with the embedded agent. One destination, consistent everywhere.

**Responsive:** mobile-first. Cards stack vertically; hero type scales down (`clamp()`); navbar collapses to logo + single CTA. **Re-check the small-text legibility rule at mobile sizes — nothing drops below 12px.**

**Quality bar:** no stubs. Every card animates, every interaction responds, every image resolves. Test all GSAP triggers on scroll up *and* down. **Contrast-check every text element against Void (≥4.5:1) before shipping.**

---

## 5. Build Sequence (do it in this order)

1. **Scaffold** — `npm create vite@latest` (React) → install Tailwind 3.4.17, GSAP, lucide-react. Wire `index.css` + fonts (Sora / Instrument Serif / JetBrains Mono).
2. **Design tokens** — drop the Neural Chrome palette/fonts into Tailwind config as named tokens; add noise overlay, circuit-grid, cyan-glow + button/link utilities. Get the *feel* right before content.
3. **Hero** — image, Void gradient, stagger animation, CTA. This sells the whole page; nail it first.
4. **Navbar** — floating pill + scroll morph (IntersectionObserver on hero).
5. **Features** — build the 4 micro-UI cards (Shuffler / Typewriter / Scheduler / Chat) in a 2×2 grid with the mapped Dutch content.
6. **Philosophy** — parallax texture + line-by-line reveal.
7. **Protocol** — sticky stacking + the 3 canvas/SVG motifs (cyan/plasma line-art).
8. **Slot-CTA + Footer** — large closing CTA block, status badge, contact.
9. **Localize + QA** — confirm WhatsApp channel wording, +597 number, currency line; test mobile; verify every CTA lands on the demo booking; run the legibility + contrast pass.
10. **Ship** — deploy to growthforgeai.org (or a Dutch-name domain if you rebrand first).

---

## 6. Open decisions to lock before building
- [ ] Confirm **Neural Chrome** as the theme (locked in this doc; say the word to change the accent — e.g. electric blue instead of cyan).
- [ ] Confirm **WhatsApp** as the client-messaging channel (affects Features + Philosophy copy).
- [ ] WhatsApp number for the footer.
- [ ] Keep "GrowthForge AI" or rebrand to the Dutch name now (only affects logo + a few strings).
- [ ] Hero headline: primary vs an alternate.

---

## 7. Ready-to-use master build prompt
Once the decisions above are locked, feed a builder this one-liner plus the sections: *"Build the GrowthForge AI landing page per this plan. Theme: Neural Chrome — Void #080B14, Ion Cyan #3DE7DE, Plasma #7C6BFF (glow only), Platinum #CBD5E1, Ice #EAF2FB; fonts Sora / Instrument Serif italic / JetBrains Mono. Dutch, formal 'u'. Enforce the small-text legibility rule (no text below 12px, no opacity below 0.85, Ice/Platinum text on Void, ≥4.5:1 contrast). Use the exact copy in Section 3. Map Features as a 2×2 grid: Shuffler→Reactivatie AI, Typewriter→Google Review AI, Scheduler→AI Telefoniste, Chat-stream→AI Chatbot. Every CTA links to the demo booking. Follow the Global Design System and Technical Baseline from the Cinematic Landing Page Builder spec exactly."*
