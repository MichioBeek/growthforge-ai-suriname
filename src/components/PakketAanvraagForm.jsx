import { useState } from 'react'
import { Check, User, Phone, Mail, Globe, MessageSquare } from 'lucide-react'

const TIMING_OPTIONS = ['Zo snel mogelijk', 'Binnen 2 weken', 'Deze maand', 'Ik oriënteer me nog']

// Required fields deliberately outnumber the quiz's earlier 2 steps — per
// Michio's own call, a longer form here is a feature, not friction: it
// doubles as a qualification filter (who bothers to fill in a real message
// and pick a timing is a more serious buyer), and gives him everything he
// needs to open the WhatsApp follow-up with actual context instead of a
// generic template.
export default function PakketAanvraagForm({ tier, businessName, categoryLabel, onSubmit }) {
  const [contactName, setContactName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [timing, setTiming] = useState(TIMING_OPTIONS[0])
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = contactName.trim() && phone.trim() && email.trim() && message.trim()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({
      contactName: contactName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      website: website.trim(),
      timing,
      message: message.trim(),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="glow-ion-lg relative overflow-hidden rounded-[3rem] bg-carbon/40 px-6 py-16 text-center ring-1 ring-ion/20 md:px-14 md:py-20">
        <div className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        <div className="relative">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ion/10 text-ion">
            <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-sora text-2xl font-bold tracking-[-0.02em] text-ice md:text-3xl">
            Bedankt, <span className="pakket-accent">{contactName}</span>!
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-platinum opacity-90">
            We hebben uw aanvraag voor het {tier.name} pakket ontvangen. Michio neemt zo snel
            mogelijk persoonlijk contact met u op via WhatsApp of e-mail — u ontvangt ook een
            bevestiging in uw inbox.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glow-ion-lg relative overflow-hidden rounded-[3rem] bg-carbon/40 px-6 py-14 ring-1 ring-ion/20 md:px-14 md:py-16">
      <div className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div className="relative">
        <div className="text-center">
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-ion/25 bg-ion/10 px-4 py-1.5 text-[11px] text-ion">
            {tier.name} pakket &middot; {tier.setupPrice}
            {tier.monthlyPrice ? ` + ${tier.monthlyPrice}` : ''}
          </span>
          <h1 className="mt-5 font-sora text-3xl font-bold tracking-[-0.02em] text-ice md:text-4xl">
            Vraag het {tier.name} pakket <span className="pakket-accent">aan</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-platinum opacity-90 md:text-base">
            Voor {businessName} ({categoryLabel}). Vul uw gegevens in — Michio neemt persoonlijk
            contact met u op.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative">
              <User
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50"
                aria-hidden="true"
              />
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Uw naam"
                required
                className="w-full rounded-2xl border border-platinum/20 bg-void py-3.5 pl-11 pr-4 font-sora text-[14px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none"
              />
            </div>

            <div className="relative">
              <Phone
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50"
                aria-hidden="true"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp-nummer"
                required
                className="w-full rounded-2xl border border-platinum/20 bg-void py-3.5 pl-11 pr-4 font-sora text-[14px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50"
                aria-hidden="true"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full rounded-2xl border border-platinum/20 bg-void py-3.5 pl-11 pr-4 font-sora text-[14px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none"
              />
            </div>

            <div className="relative">
              <Globe
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50"
                aria-hidden="true"
              />
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Bestaande website (optioneel)"
                className="w-full rounded-2xl border border-platinum/20 bg-void py-3.5 pl-11 pr-4 font-sora text-[14px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none"
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block text-[13px] font-medium text-platinum opacity-90">
              Wanneer wilt u starten?
            </span>
            <div className="flex flex-wrap gap-2">
              {TIMING_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTiming(option)}
                  className={[
                    'rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200',
                    timing === option
                      ? 'border-ion bg-ion/10 text-ion'
                      : 'border-platinum/20 bg-void text-platinum hover:border-ion/40',
                  ].join(' ')}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <MessageSquare
              className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-platinum/50"
              aria-hidden="true"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Vertel ons kort over uw bedrijf en wat u zoekt"
              required
              rows={3}
              className="w-full resize-none rounded-2xl border border-platinum/20 bg-void py-3.5 pl-11 pr-4 font-sora text-[14px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-magnetic relative glow-ion mt-2 flex w-full items-center justify-center rounded-full bg-ion px-6 py-4 text-ice disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="btn-wipe" />
            <span className="btn-label font-sora text-[15px] font-semibold">Verstuur aanvraag</span>
          </button>
        </form>
      </div>
    </div>
  )
}
