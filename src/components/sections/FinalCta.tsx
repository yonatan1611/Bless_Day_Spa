import { PageContainer, Section } from '../layout/Primitives'
import { ScrollReveal } from '../react-bits/ScrollReveal'
import { ParticleButton } from '../kokonut/ParticleButton'
import { business } from '../../content/business'
import { homepageImages } from '../../content/images'

// Closes the homepage by reusing the hero photo, darkened — the visual
// rhyme BookingCta used to carry, moved here so it bookends the page
// instead of appearing twice. The closing line itself scroll-scrubs into
// focus (React Bits' ScrollReveal) rather than just fading in.
export const FinalCta = () => (
  <Section className="final-cta section--inverse" aria-labelledby="final-cta-title">
    <div className="final-cta__media" style={{ backgroundImage: `url(${homepageImages.hero})` }} aria-hidden="true" />
    <PageContainer narrow className="final-cta__body">
      <p className="eyebrow" id="final-cta-title">{business.name}</p>
      <ScrollReveal className="final-cta__line">Make room for a blessed day.</ScrollReveal>
      <ParticleButton to="/book" variant="primary" arrow="down-right">Book Appointment</ParticleButton>
    </PageContainer>
  </Section>
)
