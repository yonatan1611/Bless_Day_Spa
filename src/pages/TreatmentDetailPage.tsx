import { Link, Navigate, useParams } from 'react-router-dom'
import { PageContainer, Section } from '../components/layout/Primitives'
import { ImageFrame } from '../components/ui/ImageFrame'
import { Button } from '../components/ui/Button'
import { getService, services } from '../content/services'
import { treatmentImages, demoServiceSlugs } from '../content/images'
import { business } from '../content/business'
import { usePageTitle } from '../hooks/usePageTitle'

const imageByService: Record<string, string> = {
  massage: treatmentImages.massage,
  'moroccan-bath': treatmentImages.moroccanBath,
  'steam-sauna': treatmentImages.steamSauna,
  'hair-salon': treatmentImages.hairSalon,
}

export const TreatmentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const service = getService(slug)

  usePageTitle(service ? service.title : 'Treatment not found')

  if (!service) return <Navigate to="/treatments" replace />

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <main id="main-content">
      <section className="detail-hero" aria-labelledby="detail-title">
        <PageContainer>
          <div className="detail-hero__grid">
            <div className="detail-hero__media">
              <ImageFrame
                variant="hero"
                aspectRatio="portrait"
                src={imageByService[service.slug]}
                demo={demoServiceSlugs.has(service.slug)}
                priority
                alt={
                  demoServiceSlugs.has(service.slug)
                    ? `Demonstration ${service.title.toLowerCase()} photography`
                    : `${service.title} at Bless Day Spa`
                }
              />
              <div className="detail-hero__accent">
                <ImageFrame variant="thumbnail" aspectRatio="square" src={treatmentImages.detailTexture} demo alt="Demonstration ritual detail" />
              </div>
            </div>

            <div className="detail-hero__copy">
              <p className="eyebrow">Bless Day Spa · Treatments</p>
              <h1 id="detail-title" className="display-xl">{service.title}</h1>
              <p className="body-lg">{service.description}</p>

              <dl className="detail-hero__meta">
                <div>
                  <dt className="eyebrow">Duration &amp; price</dt>
                  <dd className="body-sm">Confirmed directly with the spa</dd>
                </div>
              </dl>

              <Button to={`/book?service=${service.slug}`} variant="primary" arrow="down-right">Book Appointment</Button>
            </div>
          </div>
        </PageContainer>
      </section>

      <Section aria-label="Treatment details">
        <PageContainer narrow>
          <p className="eyebrow">In detail</p>
          <p className="body-lg">{service.detail}</p>
          <div className="service-detail__note">
            <span className="eyebrow">Important information</span>
            <p className="body-sm">{service.note}</p>
          </div>
        </PageContainer>
      </Section>

      {related.length > 0 && (
        <Section aria-labelledby="related-title">
          <PageContainer>
            <p className="eyebrow">Explore more</p>
            <h2 id="related-title" className="display-md">Other ways to spend your time.</h2>
            <div className="related-treatments">
              {related.map((item) => (
                <Link key={item.slug} to={`/treatments/${item.slug}`} className="related-treatments__item">
                  <ImageFrame
                    variant="thumbnail"
                    aspectRatio="square"
                    src={imageByService[item.slug]}
                    demo={demoServiceSlugs.has(item.slug)}
                    alt={
                      demoServiceSlugs.has(item.slug)
                        ? `Demonstration ${item.title.toLowerCase()} photography`
                        : `${item.title} at Bless Day Spa`
                    }
                  />
                  <span className="related-treatments__name">
                    {item.title}
                    <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              ))}
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
            <Button to={`/book?service=${service.slug}`} variant="primary" arrow="down-right">Book Appointment</Button>
            <Button href={business.messengerUrl} variant="secondary" arrow="up-right">Message on Facebook</Button>
          </div>
        </PageContainer>
      </Section>
    </main>
  )
}
