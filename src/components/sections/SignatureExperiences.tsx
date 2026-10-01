import { PageContainer, Section } from '../layout/Primitives'
import { SectionHeading } from '../layout/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { BentoCard } from '../react-bits/BentoCard'
import { packages } from '../../content/packages'

// Packages promoted into an asymmetric bento grid (inspired by React Bits'
// MagicBento — see BentoCard.tsx) instead of the small teaser row this slot
// used to hold. Real packages/prices only, from content/packages.ts.
export const SignatureExperiences = () => {
  if (packages.length === 0) return null

  return (
    <Section aria-labelledby="signature-experiences-title" className="signature-experiences">
      <PageContainer>
        <Reveal>
          <SectionHeading eyebrow="Signature experiences" title="Two ways to go further." id="signature-experiences-title">
            <p className="body-lg">Real packages, combining treatments into one visit.</p>
          </SectionHeading>
        </Reveal>

        <Reveal delay={120} className="signature-experiences__grid">
          {packages.map((pkg, index) => (
            <BentoCard key={pkg.slug} className={`signature-experiences__tile ${index === 0 ? 'signature-experiences__tile--large' : ''}`}>
              <img src={pkg.image} alt={pkg.alt} className="signature-experiences__image" />
              <div className="signature-experiences__scrim" aria-hidden="true" />
              <div className="signature-experiences__body">
                <span className="signature-experiences__number">0{index + 1}</span>
                <h3 className="display-md">{pkg.name}</h3>
                <p className="body-sm">{pkg.description}</p>
                <div className="signature-experiences__footer">
                  <span className="signature-experiences__price">{pkg.price}</span>
                  <Button to={`/book?package=${pkg.slug}`} variant="secondary" arrow="down-right">Book this</Button>
                </div>
              </div>
            </BentoCard>
          ))}
        </Reveal>
      </PageContainer>
    </Section>
  )
}
