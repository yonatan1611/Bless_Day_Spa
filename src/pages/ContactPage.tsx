import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Button } from '../components/ui/Button'
import { BlurText } from '../components/react-bits/BlurText'
import { business } from '../content/business'
import { usePageTitle } from '../hooks/usePageTitle'

// Same search query the existing "Open in Google Maps" link already uses,
// just embedded, rather than asserting a precise pin that can't be verified.
const mapQuery = encodeURIComponent(`${business.name}, ${business.city}`)

const details = [
  { label: 'Location', value: `${business.areaDescription}, ${business.landmark}, ${business.city}` },
  { label: 'Hours', value: business.hours.label, note: business.hours.note },
  { label: 'Phone', value: business.phoneDisplay, href: `tel:${business.phone}` },
  { label: 'Office', value: business.officePhoneDisplay, href: `tel:${business.officePhone}` },
]

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
          <h2 id="contact-map-title" className="display-md">{business.landmark}.</h2>
        </PageContainer>
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
            <div className="panel contact-route">
              <h2 className="display-md">Message the spa directly.</h2>
              <p className="body">Ask about current treatment availability and a convenient appointment time.</p>
              <div className="contact-route__actions">
                <Button href={business.messengerUrl} variant="primary" arrow="up-right">Message on Facebook</Button>
                <Button href={business.whatsappUrl} variant="secondary" arrow="up-right">Message on WhatsApp</Button>
                <Button href={`tel:${business.phone}`} variant="secondary">Call {business.phoneDisplay}</Button>
              </div>
              <p className="body-sm contact-route__fine-print">Opens the public {business.name} Messenger contact, WhatsApp chat, or phone dialer.</p>
            </div>

            <div className="panel contact-details">
              <dl className="contact-details__list">
                {details.map((item) => (
                  <div key={item.label} className="contact-details__row">
                    <dt>{item.label}</dt>
                    <dd>
                      {item.href ? <a className="text-link" href={item.href}>{item.value}</a> : item.value}
                      {item.note && <small className="body-sm contact-details__note">{item.note}</small>}
                    </dd>
                  </div>
                ))}
              </dl>
              <a className="text-link" href={business.mapUrl} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
              <div className="contact-details__social-links">
                <a className="text-link" href={business.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
                <a className="text-link" href={business.facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
                <a className="text-link" href={business.tiktokUrl} target="_blank" rel="noreferrer">TikTok</a>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      <Section className="section--inverse contact-cta" aria-labelledby="contact-cta-title">
        <PageContainer narrow>
          <h2 id="contact-cta-title" className="display-lg">Book your visit.</h2>
          <p className="body-lg">Send {business.name} a message to ask about an available time.</p>
          <Button href={business.whatsappUrl} variant="primary" arrow="down-right">Message on WhatsApp</Button>
        </PageContainer>
      </Section>
    </main>
  )
}
