import { Navigate, useParams } from 'react-router-dom'
import { PageContainer, Section } from '../components/layout/Primitives'
import { ImageFrame } from '../components/ui/ImageFrame'
import { Button } from '../components/ui/Button'
import { BlurText } from '../components/react-bits/BlurText'
import { Carousel } from '../components/react-bits/Carousel'
import { getService, services } from '../content/services'
import { treatmentImages, demoServiceSlugs } from '../content/images'
import { business } from '../content/business'
import { usePageTitle } from '../hooks/usePageTitle'

const imageByService: Record<string, string> = {
  massage: treatmentImages.massage,
  'moroccan-bath': treatmentImages.moroccanBath,
  'steam-sauna': treatmentImages.steamSauna,
  facials: treatmentImages.facials,
}

export const TreatmentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const service = getService(slug)

  usePageTitle(service ? service.title : 'Treatment not found')

  if (!service) return <Navigate to="/treatments" replace />

  const related = services.filter((item) => item.slug !== service.slug)

  return (
    <main id="main-content">
      <section className="detail-hero" aria-labelledby="detail-title">
        <PageContainer>
          <div className="detail-hero__grid">
            <div className="detail-hero__media">
              <ImageFrame
                aspectRatio="portrait"
                variant="editorial"
                priority
                src={imageByService[service.slug]}
                alt={
                  demoServiceSlugs.has(service.slug)
                    ? `Demonstration ${service.title.toLowerCase()} photography`
                    : `${service.title} at Bless Day Spa`
                }
              />
            </div>

            <div className="detail-hero__copy">
              <h1 id="detail-title" className="display-xl">
                <BlurText text={service.title} tag="span" direction="top" />
              </h1>
              <p className="body-lg">{service.description}</p>

              <p className="detail-hero__price body-sm">Duration and price are confirmed directly with the spa.</p>

              <div className="detail-hero__actions">
                <Button href={business.whatsappUrlFor(service.title)} variant="primary" arrow="down-right">Message on WhatsApp</Button>
                <Button to="/treatments#menu" variant="text" arrow="down-right">See the full menu</Button>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <Section aria-label="Treatment details">
        <PageContainer narrow>
          <p className="service-detail__lead">{service.detail}</p>
          <div className="service-detail__note">
            <p className="body-sm">{service.note}</p>
          </div>
        </PageContainer>
      </Section>

      {related.length > 0 && (
        <Section aria-labelledby="related-title" className="related-treatments-section">
          <PageContainer>
            <h2 id="related-title" className="display-md">Other ways to spend your time.</h2>
            <p className="body-sm related-treatments-section__hint">Swipe or use the arrows to browse.</p>
            <div className="related-treatments-section__stage">
              <Carousel
                ariaLabel="Other treatments"
                items={related.map((item) => (
                  <div key={item.slug} className="related-treatments-section__card">
                    <ImageFrame
                      variant="editorial"
                      aspectRatio="landscape"
                      src={imageByService[item.slug]}
                      demo={demoServiceSlugs.has(item.slug)}
                      alt={
                        demoServiceSlugs.has(item.slug)
                          ? `Demonstration ${item.title.toLowerCase()} photography`
                          : `${item.title} at Bless Day Spa`
                      }
                    />
                    <div className="related-treatments-section__body">
                      <h3 className="display-sm">{item.title}</h3>
                      <p className="body-sm">{item.description}</p>
                      <Button to={`/treatments/${item.slug}`} variant="text" arrow="up-right" className="related-treatments-section__link">
                        View treatment
                      </Button>
                    </div>
                  </div>
                ))}
              />
            </div>
          </PageContainer>
        </Section>
      )}

      <Section className="section--inverse detail-cta" aria-labelledby="detail-cta-title">
        <PageContainer narrow>
          <h2 id="detail-cta-title" className="display-lg">Book your {service.title}.</h2>
          <p className="body-lg">Send {business.name} a message to ask about an available time.</p>
          <div className="detail-cta__actions">
            <Button href={business.whatsappUrlFor(service.title)} variant="primary" arrow="down-right">Message on WhatsApp</Button>
            <Button href={business.messengerUrl} variant="secondary" arrow="up-right">Message on Facebook</Button>
          </div>
        </PageContainer>
      </Section>
    </main>
  )
}
