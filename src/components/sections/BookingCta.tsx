import { PageContainer, Section } from '../layout/Primitives'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { business } from '../../content/business'
import { homepageImages } from '../../content/images'

// Reuses the hero image, darkened — a deliberate closing rhyme with the
// section that opened the page.
export const BookingCta = () => (
  <Section className="booking-cta section--inverse" aria-labelledby="booking-cta-title">
    <div className="booking-cta__media" style={{ backgroundImage: `url(${homepageImages.hero})` }} aria-hidden="true" />
    <PageContainer narrow>
      <Reveal className="booking-cta__body">
        <p className="eyebrow">Appointments</p>
        <h2 id="booking-cta-title" className="display-lg">Ready when you are.</h2>
        <p className="body-lg">Send {business.name} a message to ask about an available time and treatment.</p>
        <div className="booking-cta__actions">
          <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
          <Button href={business.messengerUrl} variant="secondary" arrow="up-right">Message on Facebook</Button>
        </div>
      </Reveal>
    </PageContainer>
  </Section>
)
