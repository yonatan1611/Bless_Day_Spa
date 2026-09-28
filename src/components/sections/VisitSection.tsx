import { PageContainer, Section } from '../layout/Primitives'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { business } from '../../content/business'

export const VisitSection = () => (
  <Section aria-labelledby="visit-title">
    <PageContainer>
      <Reveal className="visit-panel">
        <div className="visit-panel__intro">
          <p className="eyebrow">Visit {business.name}</p>
          <h2 id="visit-title" className="display-lg">{business.areaDescription}.</h2>
        </div>
        <div className="visit-panel__detail">
          <p className="body-lg">
            {business.landmark}
            <br />
            {business.city}
          </p>
          <Button href={business.mapUrl} variant="secondary" arrow="up-right">Open in Google Maps</Button>
          <p className="visit-panel__hours"><span className="eyebrow">Listed hours</span>{business.hours.label}</p>
          <p className="body-sm">{business.hours.note}</p>
        </div>
      </Reveal>
    </PageContainer>
  </Section>
)
