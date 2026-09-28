import { PageContainer, Section } from '../layout/Primitives'
import { ImageFrame } from '../ui/ImageFrame'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { getService } from '../../content/services'
import { homepageImages } from '../../content/images'

// Moroccan bath is the most visually and culturally distinct offering among
// the four listed categories, so it carries the editorial spotlight here —
// this is a design choice, not a claim about popularity or quality.
export const SignatureExperience = () => {
  const service = getService('moroccan-bath')
  if (!service) return null

  return (
    <Section className="signature" aria-labelledby="signature-title">
      <PageContainer>
        <Reveal className="signature__frame">
          <ImageFrame
            variant="hero"
            src={homepageImages.moroccanBath}
            alt="The Moroccan bath room at Bless Day Spa"
          />
          <div className="signature__overlay">
            <p className="eyebrow signature__eyebrow">A closer look</p>
            <h2 id="signature-title" className="signature__title">{service.title}</h2>
          </div>
        </Reveal>

        <Reveal delay={140} className="signature__detail">
          <p className="body-lg">{service.detail}</p>
          <div className="signature__note">
            <span className="eyebrow">Important information</span>
            <p className="body-sm">{service.note}</p>
          </div>
          <Button to={`/treatments/${service.slug}`} variant="primary" arrow="down-right">Ask about this treatment</Button>
        </Reveal>
      </PageContainer>
    </Section>
  )
}
