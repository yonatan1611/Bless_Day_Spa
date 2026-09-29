import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { TreatmentsHero } from '../components/treatments/TreatmentsHero'
import { TreatmentIndexRow } from '../components/treatments/TreatmentIndexRow'
import { TreatmentMenu } from '../components/treatments/TreatmentMenu'
import { TreatmentSearch, type SearchableItem } from '../components/kokonut/TreatmentSearch'
import { FlowingMenu } from '../components/react-bits/FlowingMenu'
import { TiltedCard } from '../components/react-bits/TiltedCard'
import { ScrollFloat } from '../components/react-bits/ScrollFloat'
import { getService, services } from '../content/services'
import { treatmentImages, demoServiceSlugs } from '../content/images'
import { menuCategories } from '../content/menu'
import { usePageTitle } from '../hooks/usePageTitle'

const searchableItems: SearchableItem[] = menuCategories.flatMap((category) =>
  category.items.map((item) => ({
    id: `${category.slug}-${item.name}`,
    label: item.name,
    category: category.title,
    price: item.price,
  })),
)

const onSelectTreatment = (item: SearchableItem) => {
  void item
  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const imageByService: Record<string, string> = {
  massage: treatmentImages.massage,
  'moroccan-bath': treatmentImages.moroccanBath,
  'steam-sauna': treatmentImages.steamSauna,
  'hair-salon': treatmentImages.hairSalon,
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

      <Section aria-label="Search treatments" className="treatments-search-section">
        <PageContainer>
          <TreatmentSearch items={searchableItems} onSelect={onSelectTreatment} />
        </PageContainer>
      </Section>

      <TreatmentMenu />

      {featured && (
        <Section aria-labelledby="featured-title" className="treatments-featured">
          <PageContainer className="treatments-featured__grid">
            <Reveal>
              <div className="treatments-featured__media">
                <TiltedCard
                  imageSrc={imageByService[featured.slug]}
                  altText={`${featured.title} at Bless Day Spa`}
                  captionText="A closer look"
                />
              </div>
            </Reveal>
            <Reveal delay={120} className="treatments-featured__copy">
              <p className="eyebrow">Featured ritual</p>
              <ScrollFloat id="featured-title" className="treatments-featured__title">{featured.title}</ScrollFloat>
              <p className="body-lg">{featured.detail}</p>
              <p className="body-sm treatments-featured__note">{featured.note}</p>
              <Button to={`/treatments/${featured.slug}`} variant="secondary" arrow="up-right">View treatment</Button>
            </Reveal>
          </PageContainer>
        </Section>
      )}

      <Section aria-labelledby="index-title">
        <PageContainer narrow>
          <SectionHeading eyebrow="Every treatment" title="A closer look at each one." id="index-title" />
        </PageContainer>
        <PageContainer>
          <div className="treatment-rows">
            {services.map((service, index) => (
              <TreatmentIndexRow
                key={service.slug}
                service={service}
                image={imageByService[service.slug]}
                demo={demoServiceSlugs.has(service.slug)}
                index={index}
                reversed={index % 2 === 1}
              />
            ))}
          </div>

          <aside className="information-note">
            <p className="eyebrow">Before your visit</p>
            <p className="body-sm">
              Prices are listed in the full menu above. For anything not listed there, message
              the spa to discuss what you need.
            </p>
            <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
          </aside>
        </PageContainer>
      </Section>
    </main>
  )
}
