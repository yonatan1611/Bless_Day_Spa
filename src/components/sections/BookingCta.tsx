import { PageContainer, Section } from '../layout/Primitives'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { AmbientPaths } from '../kokonut/AmbientPaths'
import { business } from '../../content/business'

// Rather than reusing the hero photo, which is saved for FinalCta's
// closing bookend.
export const BookingCta = () => (
  <Section className="booking-cta section--inverse" aria-labelledby="booking-cta-title">
    <AmbientPaths className="booking-cta__paths" />
    <PageContainer narrow>
      <Reveal className="booking-cta__body">
        <p className="eyebrow">Get in Touch</p>
        <h2 id="booking-cta-title" className="display-lg">Ready when you are.</h2>
        <p className="body-lg">Send {business.name} a message to ask about an available time and treatment.</p>

        <div className="booking-cta__actions">
          <Button href={business.whatsappUrl} variant="primary" arrow="down-right">Message on WhatsApp</Button>
          <Button href={business.messengerUrl} variant="secondary" arrow="up-right">Message on Facebook</Button>
          <Button href={`tel:${business.phone}`} variant="secondary">Call {business.phoneDisplay}</Button>
        </div>
      </Reveal>
    </PageContainer>
  </Section>
)
