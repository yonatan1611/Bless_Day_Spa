import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Button } from '../components/ui/Button'
import { business } from '../content/business'
import { usePageTitle } from '../hooks/usePageTitle'

// Same search query the existing "Open in Google Maps" link already uses —
// this just embeds it, rather than asserting a precise pin we can't verify.
const mapQuery = encodeURIComponent(`${business.name}, ${business.city}`)

export const ContactPage = () => {
  usePageTitle('Contact')

  return (
    <main id="main-content">
      <Section padding="top" className="page-intro">
        <PageContainer narrow>
          <SectionHeading level={1} eyebrow="Visit & contact" title="Find a little time for yourself.">
            <p className="body-lg">{business.name} is in {business.areaDescription} in {business.city}.</p>
          </SectionHeading>
        </PageContainer>
      </Section>

      <Section padding="bottom">
        <PageContainer>
          <div className="contact-map">
            <iframe
              title={`Map showing the approximate location of ${business.name}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </PageContainer>
      </Section>

      <Section padding="bottom">
        <PageContainer>
          <div className="contact-layout">
            <div className="contact-route">
              <p className="eyebrow">Appointments</p>
              <h2 className="display-md">Message the spa directly.</h2>
              <p className="body">Ask about current treatment availability and a convenient appointment time.</p>
              <Button href={business.messengerUrl} variant="primary" arrow="up-right">Message on Facebook</Button>
              <p className="body-sm contact-route__fine-print">Opens the public {business.name} Messenger contact.</p>
            </div>

            <div className="contact-details">
              <div>
                <span className="eyebrow">Location</span>
                <p className="body">
                  {business.areaDescription}
                  <br />
                  {business.landmark}
                  <br />
                  {business.city}
                </p>
              </div>
              <div>
                <span className="eyebrow">Hours listed</span>
                <p className="body">{business.hours.label}</p>
                <small className="body-sm">{business.hours.note}</small>
              </div>
              <a className="text-link" href={business.mapUrl} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </div>
          </div>
        </PageContainer>
      </Section>

      <Section className="section--inverse contact-cta" aria-labelledby="contact-cta-title">
        <PageContainer narrow>
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-cta-title" className="display-lg">Book your visit.</h2>
          <p className="body-lg">Send {business.name} a message to ask about an available time.</p>
          <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
        </PageContainer>
      </Section>
    </main>
  )
}
