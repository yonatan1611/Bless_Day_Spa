import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { TreatmentsHero } from '../components/treatments/TreatmentsHero'
import { CatalogueExplorer } from '../components/treatments/CatalogueExplorer'
import { TreatmentIndexRow } from '../components/treatments/TreatmentIndexRow'
import { TreatmentMenu } from '../components/treatments/TreatmentMenu'
import { services } from '../content/services'
import { treatmentImages, demoServiceSlugs } from '../content/images'
import { usePageTitle } from '../hooks/usePageTitle'

const imageByService: Record<string, string> = {
  massage: treatmentImages.massage,
  'moroccan-bath': treatmentImages.moroccanBath,
  'steam-sauna': treatmentImages.steamSauna,
  'hair-salon': treatmentImages.hairSalon,
}

export const TreatmentsPage = () => {
  usePageTitle('Treatments')

  return (
    <main id="main-content">
      <TreatmentsHero />

      <Section aria-label="Browse treatments">
        <Reveal>
          <CatalogueExplorer />
        </Reveal>
      </Section>

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
              See the full menu below for individual treatments and pricing. For anything not
              listed there, message the spa to discuss what you need.
            </p>
            <Button to="#menu" variant="text" arrow="down-right">See the full menu</Button>
          </aside>
        </PageContainer>
      </Section>

      <TreatmentMenu />
    </main>
  )
}
