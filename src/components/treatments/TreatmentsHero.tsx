import { PageContainer } from '../layout/Primitives'
import { ImageFrame } from '../ui/ImageFrame'
import { treatmentImages } from '../../content/images'

// A distinct composition from the homepage hero: a tall editorial portrait
// beside oversized type, rather than a full-bleed cinematic image with text
// layered on top. Meant to feel like opening the spa's treatment catalogue.
export const TreatmentsHero = () => (
  <section className="treatments-hero" aria-labelledby="treatments-hero-title">
    <PageContainer className="treatments-hero__row">
      <div className="treatments-hero__copy">
        <p className="eyebrow">The treatment catalogue</p>
        <h1 id="treatments-hero-title" className="treatments-hero__title">
          Time, set aside <em>with care</em>.
        </h1>
        <p className="body-lg">Four rituals, browsable below, with pricing in the full menu.</p>
      </div>
      <div className="treatments-hero__media">
        <ImageFrame
          variant="hero"
          aspectRatio="portrait"
          src={treatmentImages.landingHero}
          priority
          alt="A treatment room at Bless Day Spa, with three loungers and warm curtain light"
        />
      </div>
    </PageContainer>
  </section>
)
