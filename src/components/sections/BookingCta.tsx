import { PageContainer, Section } from '../layout/Primitives'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { AmbientPaths } from '../kokonut/AmbientPaths'
import { business } from '../../content/business'

const steps = [
  { number: '01', label: 'Choose your experience' },
  { number: '02', label: 'Tell us your preferred time' },
  { number: '03', label: 'Send it — we confirm by message' },
]

// A preview of the booking flow's own steps (see the real stepper on
// BookPage.tsx) rather than a plain "book now" box — and rather than
// reusing the hero photo, which is saved for FinalCta's closing bookend.
export const BookingCta = () => (
  <Section className="booking-cta section--inverse" aria-labelledby="booking-cta-title">
    <AmbientPaths className="booking-cta__paths" />
    <PageContainer narrow>
      <Reveal className="booking-cta__body">
        <p className="eyebrow">Appointments</p>
        <h2 id="booking-cta-title" className="display-lg">Ready when you are.</h2>
        <p className="body-lg">Send {business.name} a message to ask about an available time and treatment.</p>

        <ol className="booking-cta__steps">
          {steps.map((step) => (
            <li key={step.number}>
              <span className="booking-cta__step-number">{step.number}</span>
              <span>{step.label}</span>
            </li>
          ))}
        </ol>

        <div className="booking-cta__actions">
          <Button to="/book" variant="primary" arrow="down-right">Start your request</Button>
          <Button href={business.messengerUrl} variant="secondary" arrow="up-right">Message on Facebook</Button>
        </div>
      </Reveal>
    </PageContainer>
  </Section>
)
