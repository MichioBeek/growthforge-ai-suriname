import { Check } from 'lucide-react'

const STEPS = [
  { id: 'category', label: 'Bedrijf' },
  { id: 'name', label: 'Naam' },
  { id: 'results', label: 'Pakket' },
  { id: 'request', label: 'Aanvraag' },
]

export default function PakketStepper({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.id === current)

  return (
    <div className="pk-stepper" role="list" aria-label="Voortgang">
      {STEPS.map((step, i) => {
        const state = i < currentIndex ? 'is-done' : i === currentIndex ? 'is-active' : 'is-upcoming'
        return (
          <div key={step.id} className={`pk-stepper-item ${state}`} role="listitem">
            <span className="pk-stepper-node">
              {state === 'is-done' ? (
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              ) : (
                <span className="pk-stepper-dot" aria-hidden="true" />
              )}
            </span>
            <span className="pk-stepper-label mono-label">{step.label}</span>
            {i < STEPS.length - 1 && <span className="pk-stepper-line" aria-hidden="true" />}
          </div>
        )
      })}
    </div>
  )
}
