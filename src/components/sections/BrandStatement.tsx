import { PageContainer, Section } from '../layout/Primitives'
import { Button } from '../ui/Button'
import { BlurText } from '../react-bits/BlurText'
import { business } from '../../content/business'
import { homepageImages } from '../../content/images'

// The spa's own wall sign, darkened behind the statement — replaces the
// earlier ambient line texture now that real signage photography exists.
export const BrandStatement = () => (
  <Section aria-labelledby="brand-statement-title" className="brand-statement section--inverse">
    <div
      className="brand-statement__media"
      style={{ backgroundImage: `url(${homepageImages.brandSign})` }}
      aria-hidden="true"
    />
    <PageContainer narrow className="brand-statement__container">
      <h2 id="brand-statement-title">
        <BlurText text="A pause in the city, made practical." className="brand-statement__line" />
      </h2>
      <p className="body-lg brand-statement__lead">
        Set just off Ethio-China Road, {business.name} brings together massage, Moroccan bath, steam,
        sauna, and facial care, so your time can be spent in one calm place.
      </p>
      <div className="brand-statement__footer">
        <span className="body-sm brand-statement__where">{business.areaDescription}, {business.city}</span>
        <Button to="/about" variant="text" arrow="down-right">Learn more about the spa</Button>
      </div>
    </PageContainer>
  </Section>
)
