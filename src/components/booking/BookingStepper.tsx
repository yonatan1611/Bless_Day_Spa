import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Button } from '../ui/Button'
import { ClickSpark } from '../react-bits/ClickSpark'
import { GradientText } from '../react-bits/GradientText'
import { Stepper } from '../react-bits/Stepper'
import { SpotlightCard } from '../react-bits/SpotlightCard'
import { menuCategories, type MenuCategory } from '../../content/menu'
import { packages } from '../../content/packages'
import { business } from '../../content/business'

type Choice = { kind: 'treatment' | 'package'; key: string; label: string }
type Group = { key: string; title: string; image: string; choices: Choice[] }
type SendState = 'idle' | 'sending' | 'sent' | 'error'

// A service slug (from TreatmentExplorer/TreatmentIndexRow/TreatmentDetailPage
// "Book appointment" links, e.g. /book?service=hair-salon) maps to the menu
// category it's priced under — see the identical mapping in
// src/components/sections/TreatmentExplorer.tsx. Only hair-salon's slug
// actually differs from its menu category (hair-and-beauty).
const menuSlugByServiceSlug: Record<string, string> = {
  massage: 'massage',
  'moroccan-bath': 'moroccan-bath',
  'steam-sauna': 'steam-sauna',
  'hair-salon': 'hair-and-beauty',
  facials: 'facials',
  'nail-care': 'nail-care',
}

// One choice per specific menu item (e.g. "Swedish massage"), plus — for any
// category with more than one item — a leading "any type" choice for a
// visitor who wants that treatment but hasn't picked a specific style yet.
const choicesForCategory = (category: MenuCategory): Choice[] => [
  ...(category.items.length > 1
    ? [{ kind: 'treatment' as const, key: category.slug, label: `${category.title} (any type)` }]
    : []),
  ...category.items.map((item) => ({
    kind: 'treatment' as const,
    key: `${category.slug}::${item.name}`,
    label: item.price ? `${item.name} — ${item.price}` : item.name,
  })),
]

const treatmentGroups: Group[] = menuCategories.map((category) => ({
  key: category.slug,
  title: category.title,
  image: category.image,
  choices: choicesForCategory(category),
}))
const packageChoices: Choice[] = packages.map((pkg) => ({ kind: 'package' as const, key: pkg.slug, label: pkg.name }))
const allGroups: Group[] = [
  ...treatmentGroups,
  ...(packageChoices.length > 0
    ? [{ key: 'packages', title: 'Packages', image: packages[0]?.image ?? '', choices: packageChoices }]
    : []),
]

const steps = ['Experience', 'Preferred time', 'Your details', 'Review & send']

// A genuine multi-step interface. There's no live availability to confirm
// against (no calendar, no admin system — see docs/booking-email-setup.md
// for why that's a deliberate choice, not a gap), but the final step now
// actually sends the request: a POST to api/book.ts emails it to the spa.
// Messenger/phone stay as a visible fallback in case that email fails or
// isn't configured yet.
type BookingStepperProps = { initialServiceSlug?: string; initialPackageSlug?: string }

export const BookingStepper = ({ initialServiceSlug, initialPackageSlug }: BookingStepperProps) => {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [selections, setSelections] = useState<Choice[]>(() => {
    const initial: Choice[] = []
    if (initialServiceSlug) {
      const menuSlug = menuSlugByServiceSlug[initialServiceSlug] ?? initialServiceSlug
      const category = menuCategories.find((item) => item.slug === menuSlug)
      const first = category && choicesForCategory(category)[0]
      if (first) initial.push(first)
    }
    if (initialPackageSlug) {
      const pkg = packages.find((item) => item.slug === initialPackageSlug)
      if (pkg) initial.push({ kind: 'package', key: pkg.slug, label: pkg.name })
    }
    return initial
  })
  // Which group's item list is expanded — browsing one category at a time
  // instead of showing all ~30 treatments as one wall of pills. Opens
  // whichever group a pre-selection (from a "Book appointment" link
  // elsewhere) landed in, so that choice is visible right away.
  const [openGroup, setOpenGroup] = useState<string | null>(() => {
    if (initialPackageSlug && packages.some((item) => item.slug === initialPackageSlug)) return 'packages'
    if (initialServiceSlug) {
      const menuSlug = menuSlugByServiceSlug[initialServiceSlug] ?? initialServiceSlug
      if (menuCategories.some((item) => item.slug === menuSlug)) return menuSlug
    }
    return null
  })
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [sendState, setSendState] = useState<SendState>('idle')

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1)
    setStep(Math.max(0, Math.min(steps.length - 1, next)))
  }

  const toggleChoice = (option: Choice) => {
    setSelections((current) =>
      current.some((item) => item.key === option.key)
        ? current.filter((item) => item.key !== option.key)
        : [...current, option],
    )
  }

  const canAdvance = [selections.length > 0, true, true, true][step]
  const canSend = Boolean(name.trim()) && Boolean(contact.trim())

  const sendRequest = async () => {
    setSendState('sending')
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experience: selections.map((item) => item.label).join(', '),
          preferredDate,
          preferredTime,
          name,
          contact,
        }),
      })
      if (!response.ok) throw new Error('request failed')
      setSendState('sent')
    } catch {
      setSendState('error')
    }
  }

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
                <p className="body-sm booking-stepper__hint">
                  Tap a category to browse its treatments — choose as many as you'd like.
                </p>

                {selections.length > 0 && (
                  <div className="booking-stepper__selected">
                    {selections.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        className="booking-stepper__selected-chip"
                        onClick={() => toggleChoice(item)}
                      >
                        {item.label}
                        <span aria-hidden="true">×</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="booking-stepper__accordion">
                  {allGroups.map((group) => {
                    const isOpen = openGroup === group.key
                    const selectedCount = group.choices.filter((option) =>
                      selections.some((item) => item.key === option.key),
                    ).length
                    return (
                      <SpotlightCard className="booking-stepper__accordion-item" key={group.key} spotlightColor="rgba(169, 124, 99, 0.14)">
                        <button
                          type="button"
                          className="booking-stepper__accordion-trigger"
                          aria-expanded={isOpen}
                          onClick={() => setOpenGroup(isOpen ? null : group.key)}
                        >
                          {group.image && (
                            <img src={group.image} alt="" aria-hidden="true" loading="lazy" className="booking-stepper__accordion-thumb" />
                          )}
                          <span className="booking-stepper__accordion-title">{group.title}</span>
                          {selectedCount > 0 && (
                            <span className="booking-stepper__accordion-count">
                              {selectedCount} selected
                            </span>
                          )}
                          <ChevronDown
                            aria-hidden="true"
                            size={18}
                            className={`booking-stepper__accordion-icon ${isOpen ? 'is-open' : ''}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              style={{ overflow: 'hidden' }}
                            >
                              <fieldset className="booking-stepper__choices">
                                <legend className="sr-only">{group.title}</legend>
                                {group.choices.map((option) => (
                                  <ClickSpark key={option.key}>
                                    <button
                                      type="button"
                                      className={`booking-stepper__choice ${selections.some((item) => item.key === option.key) ? 'is-selected' : ''}`}
                                      onClick={() => toggleChoice(option)}
                                    >
                                      {option.label}
                                    </button>
                                  </ClickSpark>
                                ))}
                              </fieldset>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </SpotlightCard>
                    )
                  })}
                </div>
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
                  <li><strong>Experience:</strong> {selections.length > 0 ? selections.map((item) => item.label).join(', ') : 'Not selected'}</li>
                  <li><strong>Preferred time:</strong> {preferredDate || preferredTime ? `${preferredDate} ${preferredTime}`.trim() : 'Not specified'}</li>
                  <li><strong>Name:</strong> {name || 'Not specified'}</li>
                  <li><strong>Contact:</strong> {contact || 'Not specified'}</li>
                </ul>

                {sendState === 'sent' ? (
                  <p className="body booking-stepper__sent">
                    Sent — {business.name} will confirm by message or call soon.
                  </p>
                ) : (
                  <>
                    <p className="body-sm">
                      {sendState === 'error'
                        ? "That didn't go through. Please message or call the spa directly instead:"
                        : `Send this to ${business.name} directly, or reach out yourself:`}
                    </p>
                    <div className="booking-stepper__send-actions">
                      {sendState !== 'error' && (
                        <ClickSpark>
                          <Button
                            variant="primary"
                            arrow="down-right"
                            onClick={sendRequest}
                            disabled={!canSend || sendState === 'sending'}
                          >
                            {sendState === 'sending' ? 'Sending…' : 'Send request'}
                          </Button>
                        </ClickSpark>
                      )}
                      <Button href={business.messengerUrl} variant="secondary" arrow="up-right">Message on Facebook</Button>
                      <Button href={`tel:${business.phone}`} variant="secondary">Call {business.phoneDisplay}</Button>
                    </div>
                  </>
                )}
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
