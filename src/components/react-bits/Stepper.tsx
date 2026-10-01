import { motion, AnimatePresence } from 'motion/react'
import { Check } from 'lucide-react'

type StepperProps = {
  steps: string[]
  /** 0-indexed */
  currentStep: number
}

// Adapted from React Bits' Stepper (reactbits.dev) — numbered circle
// indicators connected by a line that fills in as steps complete, each
// circle popping into a checkmark once passed. The original is a fully
// self-contained, uncontrolled wizard that owns its own Step children plus
// Next/Back buttons; this site's booking flow already owns step state and
// per-step validation (see booking/BookingStepper.tsx, which has its own
// gating logic and a non-standard final step), so this keeps only Stepper's
// visual signature — the indicator row — as a controlled component driven
// by an external `currentStep` instead.
export const Stepper = ({ steps, currentStep }: StepperProps) => (
  <ol className="rb-stepper" aria-label="Booking progress">
    {steps.map((label, index) => {
      const isDone = index < currentStep
      const isActive = index === currentStep
      return (
        <li key={label} className={`rb-stepper__item ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}>
          {index > 0 && (
            <span className="rb-stepper__connector" aria-hidden="true">
              <motion.span
                className="rb-stepper__connector-fill"
                initial={false}
                animate={{ scaleX: index <= currentStep ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </span>
          )}
          <span className="rb-stepper__circle">
            <AnimatePresence mode="wait" initial={false}>
              {isDone ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Check aria-hidden="true" size={14} />
                </motion.span>
              ) : (
                <motion.span
                  key="number"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  0{index + 1}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <span className="rb-stepper__label">{label}</span>
        </li>
      )
    })}
  </ol>
)
