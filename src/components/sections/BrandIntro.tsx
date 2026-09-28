import { PageContainer, Section } from '../layout/Primitives'
import { EditorialSplit } from '../layout/EditorialSplit'
import { ImageFrame } from '../ui/ImageFrame'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { business } from '../../content/business'
import { homepageImages } from '../../content/images'

export const BrandIntro = () => (
  <Section aria-labelledby="brand-intro-title" className="brand-intro">
    <PageContainer>
      <Reveal>
        <EditorialSplit
          media={
            <div className="brand-intro__media">
              <ImageFrame variant="editorial" src={homepageImages.brandStory} demo alt="Demonstration spa lounge photography" />
            </div>
          }
        >
          <p className="eyebrow">{business.name}</p>
          <h2 id="brand-intro-title" className="display-lg">A pause in the city, made practical.</h2>
          <p className="brand-intro__lead body-lg">
            Set just off Ethio-China Road, {business.name} brings together massage, Moroccan bath,
            steam and sauna, and hair salon care — so your time can be spent in one calm place.
          </p>
          <p className="body">{business.servesDescription}</p>
          <div className="brand-intro__detail">
            <span className="eyebrow">Where</span>
            <p className="body-sm">{business.areaDescription}, {business.city}</p>
          </div>
          <Button to="/about" variant="text" arrow="down-right">Learn more about the spa</Button>
        </EditorialSplit>
      </Reveal>
    </PageContainer>
  </Section>
)
