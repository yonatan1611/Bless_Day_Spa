import { useSearchParams } from 'react-router-dom'
import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { BookingStepper } from '../components/booking/BookingStepper'
import { BlurText } from '../components/react-bits/BlurText'
import { business } from '../content/business'
import { getService } from '../content/services'
import { packages } from '../content/packages'
import { usePageTitle } from '../hooks/usePageTitle'

// A real multi-step interface (BookingStepper), but still honest about what
// it is: there's no online-scheduling backend yet (a later phase — see
// docs/neon-prisma-setup.md), so the last step ends in the same
// message-the-spa request pattern used across the site, just with a clear
// recap of what was chosen instead of the visitor re-typing it.
export const BookPage = () => {
  usePageTitle('Book Appointment')
  const [searchParams] = useSearchParams()
  const service = getService(searchParams.get('service') ?? undefined)
  const pkg = packages.find((item) => item.slug === searchParams.get('package'))

  const initialChoice = service
    ? { kind: 'service' as const, slug: service.slug, label: service.title }
    : pkg
      ? { kind: 'package' as const, slug: pkg.slug, label: pkg.name }
      : undefined

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
          <BookingStepper initialChoice={initialChoice} />
        </PageContainer>
      </Section>
    </main>
  )
}
