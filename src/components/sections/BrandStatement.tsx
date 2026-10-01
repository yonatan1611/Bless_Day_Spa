import { PageContainer, Section } from '../layout/Primitives'
import { Button } from '../ui/Button'
import { BlurText } from '../react-bits/BlurText'
import { AmbientPaths } from '../kokonut/AmbientPaths'
import { business } from '../../content/business'

// Replaces BrandIntro's image+text split with a pure typography moment —
// no photo, the statement itself is the visual. Ambient line texture
// (Kokonut UI's background-paths, muted) stands in for the image.
export const BrandStatement = () => (
  <Section aria-labelledby="brand-statement-title" className="brand-statement">
    <AmbientPaths />
    <PageContainer narrow className="brand-statement__container">
      <p className="eyebrow">{business.name}</p>
      <h2 id="brand-statement-title">
        <BlurText text="A pause in the city, made practical." className="brand-statement__line" />
      </h2>
      <p className="body-lg brand-statement__lead">
        Set just off Ethio-China Road, {business.name} brings together massage, Moroccan bath, steam
        and sauna, and hair salon care — so your time can be spent in one calm place.
      </p>
      <div className="brand-statement__footer">
        <span className="body-sm brand-statement__where">{business.areaDescription}, {business.city}</span>
        <Button to="/about" variant="text" arrow="down-right">Learn more about the spa</Button>
      </div>
    </PageContainer>
  </Section>
)
