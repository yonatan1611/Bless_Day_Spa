import { Section } from '../layout/Primitives'
import { business } from '../../content/business'
import { reviews } from '../../content/reviews'

// Every line here is traceable to docs/research.md or content/reviews.ts —
// no service quality, experience level, or award claims are made.
const points = [
  'Massage, Moroccan bath, steam & sauna, hair salon, facials, and nail care — six rituals, one visit',
  business.servesDescription,
  `Open ${business.hours.label}`,
  `"${reviews[1].quote}" — ${reviews[1].attribution}`,
  business.areaDescription,
]

const Group = ({ hidden = false }: { hidden?: boolean }) => (
  <div className="trust-strip__group" aria-hidden={hidden}>
    {points.map((point) => (
      <span key={point} className="trust-strip__item">
        {point}
        <span className="trust-strip__dot" aria-hidden="true">✦</span>
      </span>
    ))}
  </div>
)

export const TrustStrip = () => (
  <Section padding="none" className="trust-strip section--accent" aria-label="At the spa">
    <div className="trust-strip__track">
      <Group />
      <Group hidden />
    </div>
  </Section>
)
