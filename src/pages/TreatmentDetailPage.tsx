import { Navigate, useParams } from 'react-router-dom'
import { PageContainer, Section } from '../components/layout/Primitives'
import { ImageFrame } from '../components/ui/ImageFrame'
import { Button } from '../components/ui/Button'
import { TiltedCard } from '../components/react-bits/TiltedCard'
import { BlurText } from '../components/react-bits/BlurText'
import { ScrollReveal } from '../components/react-bits/ScrollReveal'
import { CardSwap, SwapCard } from '../components/react-bits/CardSwap'
import { ClickSpark } from '../components/react-bits/ClickSpark'
import { getService, services } from '../content/services'
import { treatmentImages, demoServiceSlugs } from '../content/images'
import { business } from '../content/business'
import { usePageTitle } from '../hooks/usePageTitle'

const imageByService: Record<string, string> = {
  massage: treatmentImages.massage,
  'moroccan-bath': treatmentImages.moroccanBath,
  'steam-sauna': treatmentImages.steamSauna,
  'hair-salon': treatmentImages.hairSalon,
  facials: treatmentImages.facials,
  'nail-care': treatmentImages.nailCare,
}

export const TreatmentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const service = getService(slug)

  usePageTitle(service ? service.title : 'Treatment not found')

  if (!service) return <Navigate to="/treatments" replace />

  // Capped at 3: CardSwap stacks each extra card higher above the front one,
  // and with 6 services now (up from the original 4), showing all 5 others
  // stacked that high overlaps the heading above the stage.
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <main id="main-content">
      <section className="detail-hero" aria-labelledby="detail-title">
        <PageContainer>
          <div className="detail-hero__grid">
            <div className="detail-hero__media">
              <TiltedCard
                imageSrc={imageByService[service.slug]}
                altText={
                  demoServiceSlugs.has(service.slug)
                    ? `Demonstration ${service.title.toLowerCase()} photography`
                    : `${service.title} at Bless Day Spa`
                }
                captionText={service.title}
              />
            </div>

            <div className="detail-hero__copy">
              <p className="eyebrow">Bless Day Spa · Treatments</p>
              <h1 id="detail-title" className="display-xl">
                <BlurText text={service.title} tag="span" direction="top" />
              </h1>
              <p className="body-lg">{service.description}</p>

              <dl className="detail-hero__meta">
                <div>
                  <dt className="eyebrow">Duration &amp; price</dt>
                  <dd className="body-sm">Confirmed directly with the spa</dd>
                </div>
              </dl>

              <ClickSpark>
                <Button to={`/book?service=${service.slug}`} variant="primary" arrow="down-right">Book Appointment</Button>
              </ClickSpark>
            </div>
          </div>
        </PageContainer>
      </section>

      <Section aria-label="Treatment details">
        <PageContainer narrow>
          <p className="eyebrow">In detail</p>
          <ScrollReveal className="service-detail__lead">{service.detail}</ScrollReveal>
          <div className="service-detail__note">
            <span className="eyebrow">Important information</span>
            <p className="body-sm">{service.note}</p>
          </div>
        </PageContainer>
      </Section>

      {related.length > 0 && (
        <Section aria-labelledby="related-title" className="related-treatments-section">
          <PageContainer>
            <p className="eyebrow">Explore more</p>
            <h2 id="related-title" className="display-md">Other ways to spend your time.</h2>
            <p className="body-sm related-treatments-section__hint">Drag a card away to see the next one.</p>
            <div className="related-treatments-section__stage">
              <CardSwap width={280} height={340} delay={4500}>
                {related.map((item) => (
                  <SwapCard key={item.slug} className="related-treatments-section__card">
                    <ImageFrame
                      variant="thumbnail"
                      aspectRatio="portrait"
                      src={imageByService[item.slug]}
                      demo={demoServiceSlugs.has(item.slug)}
                      alt={
                        demoServiceSlugs.has(item.slug)
                          ? `Demonstration ${item.title.toLowerCase()} photography`
                          : `${item.title} at Bless Day Spa`
                      }
                    />
                    <Button to={`/treatments/${item.slug}`} variant="text" arrow="up-right" className="related-treatments-section__link">
                      {item.title}
                    </Button>
                  </SwapCard>
                ))}
              </CardSwap>
            </div>
          </PageContainer>
        </Section>
      )}

      <Section className="section--inverse detail-cta" aria-labelledby="detail-cta-title">
        <PageContainer narrow>
          <p className="eyebrow">Ready?</p>
          <h2 id="detail-cta-title" className="display-lg">Book your {service.title.toLowerCase()}.</h2>
          <p className="body-lg">Send {business.name} a message to ask about an available time.</p>
          <div className="detail-cta__actions">
            <ClickSpark>
              <Button to={`/book?service=${service.slug}`} variant="primary" arrow="down-right">Book Appointment</Button>
            </ClickSpark>
            <Button href={business.messengerUrl} variant="secondary" arrow="up-right">Message on Facebook</Button>
          </div>
        </PageContainer>
      </Section>
    </main>
  )
}
