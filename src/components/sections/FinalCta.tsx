import { PageContainer, Section } from '../layout/Primitives'
import { BlurText } from '../react-bits/BlurText'
import { Button } from '../ui/Button'
import { homepageImages } from '../../content/images'

// Closes the homepage by reusing the hero photo, darkened — the visual
// rhyme BookingCta used to carry, moved here so it bookends the page
// instead of appearing twice.
export const FinalCta = () => (
  <Section className="final-cta section--inverse" aria-labelledby="final-cta-title">
    <div className="final-cta__media" style={{ backgroundImage: `url(${homepageImages.hero})` }} aria-hidden="true" />
    <PageContainer narrow className="final-cta__body">
      <h2 id="final-cta-title" className="final-cta__line display-lg">
        <BlurText text="Make room for a blessed day." />
      </h2>
      <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
    </PageContainer>
  </Section>
)
