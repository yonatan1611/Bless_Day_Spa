import { PageContainer, Section } from '../components/layout/Primitives'
import { Reveal } from '../components/ui/Reveal'
import { ImageFrame } from '../components/ui/ImageFrame'
import { Button } from '../components/ui/Button'
import { TreatmentsHero } from '../components/treatments/TreatmentsHero'
import { TreatmentMenu } from '../components/treatments/TreatmentMenu'
import { FlowingMenu } from '../components/react-bits/FlowingMenu'
import { getService, services } from '../content/services'
import { treatmentImages } from '../content/images'
import { business } from '../content/business'
import { usePageTitle } from '../hooks/usePageTitle'

const imageByService: Record<string, string> = {
  massage: treatmentImages.massage,
  'moroccan-bath': treatmentImages.moroccanBath,
  'steam-sauna': treatmentImages.steamSauna,
  facials: treatmentImages.facials,
}

const featured = getService('moroccan-bath')

export const TreatmentsPage = () => {
  usePageTitle('Treatments')

  return (
    <main id="main-content">
      <TreatmentsHero />

      <Section aria-label="Browse by ritual" className="treatments-directory">
        <FlowingMenu
          items={services.map((service) => ({ to: `/treatments/${service.slug}`, label: service.title, image: imageByService[service.slug] }))}
        />
      </Section>

      <TreatmentMenu />

      {featured && (
        <Section aria-labelledby="featured-title" className="treatments-featured">
          <PageContainer className="treatments-featured__grid">
            <Reveal>
              <div className="treatments-featured__media">
                <ImageFrame
                  variant="editorial"
                  aspectRatio="portrait"
                  src={imageByService[featured.slug]}
                  alt={`${featured.title} at Bless Day Spa`}
                />
              </div>
            </Reveal>
            <Reveal delay={120} className="treatments-featured__copy">
              <p className="eyebrow">Featured ritual</p>
              <h2 id="featured-title" className="treatments-featured__title display-lg">{featured.title}</h2>
              <p className="body-lg">{featured.detail}</p>
              <p className="body-sm treatments-featured__note">{featured.note}</p>
              <Button to={`/treatments/${featured.slug}`} variant="secondary" arrow="up-right">View treatment</Button>
            </Reveal>
          </PageContainer>
        </Section>
      )}

      <Section aria-label="Before your visit" className="treatments-closing">
        <PageContainer narrow>
          <Reveal className="information-note">
            <p className="h3">Before your visit</p>
            <p className="body-sm">
              Prices are listed in the menu above. For anything not listed there, message
              the spa to discuss what you need.
            </p>
            <Button href={business.whatsappUrl} variant="primary" arrow="down-right">Message on WhatsApp</Button>
          </Reveal>
        </PageContainer>
      </Section>
    </main>
  )
}
