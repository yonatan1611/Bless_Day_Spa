import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Button } from '../components/ui/Button'
import { BlurText } from '../components/react-bits/BlurText'
import { ClickSpark } from '../components/react-bits/ClickSpark'
import { GradientText } from '../components/react-bits/GradientText'
import { BentoCard } from '../components/react-bits/BentoCard'
import { SpotlightCard } from '../components/react-bits/SpotlightCard'
import { ShinyText } from '../components/react-bits/ShinyText'
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
          <SectionHeading
            level={1}
            eyebrow="Visit & contact"
            title={<BlurText text="Find a little time for yourself." tag="span" direction="top" />}
          >
            <p className="body-lg">{business.name} is in {business.areaDescription} in {business.city}.</p>
          </SectionHeading>
        </PageContainer>
      </Section>

      <Section aria-labelledby="contact-map-title">
        <PageContainer narrow className="contact-map-heading">
          <p className="eyebrow"><GradientText>Find us</GradientText></p>
          <h2 id="contact-map-title" className="display-md"><ShinyText text={`${business.landmark}.`} /></h2>
        </PageContainer>
        <PageContainer>
          <SpotlightCard className="contact-map">
            <iframe
              title={`Map showing the approximate location of ${business.name}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </SpotlightCard>
        </PageContainer>
      </Section>

      <Section padding="bottom">
        <PageContainer>
          <div className="contact-layout">
            <BentoCard className="contact-route">
              <p className="eyebrow"><GradientText>Appointments</GradientText></p>
              <h2 className="display-md">Message the spa directly.</h2>
              <p className="body">Ask about current treatment availability and a convenient appointment time.</p>
              <ClickSpark>
                <Button href={business.messengerUrl} variant="primary" arrow="up-right">Message on Facebook</Button>
              </ClickSpark>
              <p className="body-sm contact-route__fine-print">Opens the public {business.name} Messenger contact.</p>
            </BentoCard>

            <BentoCard className="contact-details">
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
            </BentoCard>
          </div>
        </PageContainer>
      </Section>

      <Section className="section--inverse contact-cta" aria-labelledby="contact-cta-title">
        <PageContainer narrow>
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-cta-title" className="display-lg">Book your visit.</h2>
          <p className="body-lg">Send {business.name} a message to ask about an available time.</p>
          <ClickSpark>
            <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
          </ClickSpark>
        </PageContainer>
      </Section>
    </main>
  )
}
