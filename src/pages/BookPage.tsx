import { useSearchParams } from 'react-router-dom'
import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Button } from '../components/ui/Button'
import { business } from '../content/business'
import { getService } from '../content/services'
import { packages } from '../content/packages'
import { usePageTitle } from '../hooks/usePageTitle'

// A full multi-step, database-backed booking flow is a later phase (it needs the
// Vite app to move onto a server framework before prisma/schema.prisma's Appointment
// model can be written to — see docs/neon-prisma-setup.md). This page keeps the
// same honest, non-confirming request pattern already used across the site, but
// still respects a `?service=<slug>` or `?package=<slug>` handed to it from a
// treatment or package page so the visitor never has to say what they want twice.
export const BookPage = () => {
  usePageTitle('Book Appointment')
  const [searchParams] = useSearchParams()
  const service = getService(searchParams.get('service') ?? undefined)
  const pkg = packages.find((item) => item.slug === searchParams.get('package'))
  const requested = service?.title ?? pkg?.name

  return (
    <main id="main-content">
      <Section padding="top" className="page-intro">
        <PageContainer narrow>
          <SectionHeading level={1} eyebrow="Appointments" title="Ready when you are.">
            <p className="body-lg">
              Send {business.name} a message to ask about an available time and treatment.
              This is a request, not a confirmed booking.
            </p>
          </SectionHeading>
        </PageContainer>
      </Section>

      <Section padding="bottom">
        <PageContainer narrow>
          <div className="information-note">
            {requested && (
              <p className="eyebrow book-page__preselected">You're asking about: {requested}</p>
            )}
            <p className="eyebrow">How to request an appointment</p>
            <p className="body-sm">
              Online self-scheduling isn't available yet. For now, message the spa directly
              {requested ? ` and mention ${requested}` : ''} — they'll confirm a time that works.
            </p>
            <Button href={business.messengerUrl} variant="primary" arrow="up-right">Message on Facebook</Button>
          </div>
        </PageContainer>
      </Section>
    </main>
  )
}
