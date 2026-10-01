import { PageContainer } from '../layout/Primitives'
import { ImageFrame } from '../ui/ImageFrame'
import { Button } from '../ui/Button'
import { BlurText } from '../react-bits/BlurText'
import { treatmentImages } from '../../content/images'
import { business } from '../../content/business'

// A distinct composition from the homepage hero: a tall editorial portrait
// beside oversized type, rather than a full-bleed cinematic image with text
// layered on top. Meant to feel like opening the spa's treatment catalogue.
export const TreatmentsHero = () => (
  <section className="treatments-hero" aria-labelledby="treatments-hero-title">
    <PageContainer className="treatments-hero__row">
      <div className="treatments-hero__copy">
        <p className="eyebrow">The treatment catalogue</p>
        <h1 id="treatments-hero-title" className="treatments-hero__title">
          <BlurText text="Time, set aside" tag="span" className="treatments-hero__blur" /> <em>with care</em>.
        </h1>
        <p className="body-lg">
          Six rituals — massage, Moroccan bath, steam &amp; sauna, hair salon, facials, and nail
          care — each browsable below, with full pricing in the menu.
        </p>
        <p className="body treatments-hero__note">
          {business.servesDescription} {business.yearsExperience} years in {business.areaDescription}.
          Open {business.hours.label.toLowerCase()}.
        </p>
        <Button href="#menu" variant="text" arrow="down-right">See the full menu</Button>
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
