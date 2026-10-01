import { useSearchParams } from 'react-router-dom'
import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { BookingStepper } from '../components/booking/BookingStepper'
import { BlurText } from '../components/react-bits/BlurText'
import { business } from '../content/business'
import { usePageTitle } from '../hooks/usePageTitle'

// A real multi-step interface (BookingStepper) that emails the request to
// the spa (see docs/booking-email-setup.md) — still honest that it's a
// request, not a live-calendar confirmation, since there's no appointment
// system behind it. BookingStepper resolves ?service=/?package= itself
// (a service slug maps onto the menu category it's priced under).
export const BookPage = () => {
  usePageTitle('Book Appointment')
  const [searchParams] = useSearchParams()

  return (
    <main id="main-content">
      <Section padding="top" className="page-intro">
        <PageContainer narrow>
          <SectionHeading
            level={1}
            eyebrow="Appointments"
            title={<BlurText text="Ready when you are." tag="span" direction="top" />}
          >
            <p className="body-lg">
              Choose what you're after, and we'll help you put together a message to{' '}
              {business.name} — this is a request, not a confirmed booking.
            </p>
          </SectionHeading>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer narrow>
          <BookingStepper
            initialServiceSlug={searchParams.get('service') ?? undefined}
            initialPackageSlug={searchParams.get('package') ?? undefined}
          />
        </PageContainer>
      </Section>
    </main>
  )
}
