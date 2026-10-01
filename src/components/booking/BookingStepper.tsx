import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '../ui/Button'
import { ClickSpark } from '../react-bits/ClickSpark'
import { GradientText } from '../react-bits/GradientText'
import { Stepper } from '../react-bits/Stepper'
import { services } from '../../content/services'
import { packages } from '../../content/packages'
import { business } from '../../content/business'

type Choice = { kind: 'service' | 'package'; slug: string; label: string }

const serviceChoices: Choice[] = services.map((service) => ({ kind: 'service' as const, slug: service.slug, label: service.title }))
const packageChoices: Choice[] = packages.map((pkg) => ({ kind: 'package' as const, slug: pkg.slug, label: pkg.name }))

const steps = ['Experience', 'Preferred time', 'Your details', 'Review & send']

// A genuine multi-step interface, but honest about what it is: there's no
// live availability or backend to confirm against (see docs/neon-prisma-setup.md
// and BookPage.tsx's existing note) — the last step still ends in the same
// message-the-spa pattern used across the site, just now with a clear
// recap of what was chosen instead of the visitor re-typing it.
export const BookingStepper = ({ initialChoice }: { initialChoice?: Choice }) => {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [choice, setChoice] = useState<Choice | undefined>(initialChoice)
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1)
    setStep(Math.max(0, Math.min(steps.length - 1, next)))
  }

  const canAdvance = [Boolean(choice), true, true, true][step]

  return (
    <div className="booking-stepper">
      <Stepper steps={steps} currentStep={step} />

      <div className="booking-stepper__stage">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            className="booking-stepper__panel"
            custom={direction}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -32 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div className="booking-stepper__choice-groups">
                <fieldset className="booking-stepper__choices">
                  <legend className="eyebrow">Treatments</legend>
                  {serviceChoices.map((option) => (
                    <ClickSpark key={`${option.kind}-${option.slug}`}>
                      <button
                        type="button"
                        className={`booking-stepper__choice ${choice?.slug === option.slug ? 'is-selected' : ''}`}
                        onClick={() => setChoice(option)}
                      >
                        {option.label}
                      </button>
                    </ClickSpark>
                  ))}
                </fieldset>
                {packageChoices.length > 0 && (
                  <fieldset className="booking-stepper__choices">
                    <legend className="eyebrow">Packages</legend>
                    {packageChoices.map((option) => (
                      <ClickSpark key={`${option.kind}-${option.slug}`}>
                        <button
                          type="button"
                          className={`booking-stepper__choice ${choice?.slug === option.slug ? 'is-selected' : ''}`}
                          onClick={() => setChoice(option)}
                        >
                          {option.label}
                        </button>
                      </ClickSpark>
                    ))}
                  </fieldset>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="booking-stepper__fields">
                <p className="body-sm booking-stepper__hint">
                  A preference, not a live booking — {business.name} confirms the actual time by message.
                </p>
                <label className="booking-stepper__field">
                  <span>Preferred date</span>
                  <input type="date" value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} />
                </label>
                <label className="booking-stepper__field">
                  <span>Preferred time</span>
                  <input type="time" value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="booking-stepper__fields">
                <label className="booking-stepper__field">
                  <span>Your name</span>
                  <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" />
                </label>
                <label className="booking-stepper__field">
                  <span>Best way to reach you</span>
                  <input type="text" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Phone or Facebook name" />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="booking-stepper__summary">
                <p className="eyebrow"><GradientText>Your request</GradientText></p>
                <ul>
                  <li><strong>Experience:</strong> {choice?.label ?? 'Not selected'}</li>
                  <li><strong>Preferred time:</strong> {preferredDate || preferredTime ? `${preferredDate} ${preferredTime}`.trim() : 'Not specified'}</li>
                  <li><strong>Name:</strong> {name || 'Not specified'}</li>
                  <li><strong>Contact:</strong> {contact || 'Not specified'}</li>
                </ul>
                <p className="body-sm">
                  This isn't sent automatically — click below to message {business.name} on Facebook and
                  mention these details so they can confirm a time.
                </p>
                <ClickSpark>
                  <Button href={business.messengerUrl} variant="primary" arrow="up-right">Message on Facebook</Button>
                </ClickSpark>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="booking-stepper__nav">
        <Button variant="secondary" onClick={() => go(step - 1)} className={step === 0 ? 'is-hidden' : ''}>
          Back
        </Button>
        {step < steps.length - 1 && (
          <ClickSpark>
            <Button variant="primary" onClick={() => go(step + 1)} disabled={!canAdvance} arrow="down-right">
              Continue
            </Button>
          </ClickSpark>
        )}
      </div>
    </div>
  )
}
