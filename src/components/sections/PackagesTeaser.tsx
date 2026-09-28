import { PageContainer, Section } from '../layout/Primitives'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { packages } from '../../content/packages'

// packages.ts is intentionally empty until the business confirms real
// package offerings — this stays an honest, structural placeholder rather
// than showing invented package cards.
export const PackagesTeaser = () => {
  if (packages.length > 0) return null

  return (
    <Section className="packages-teaser" aria-labelledby="packages-teaser-title">
      <PageContainer>
        <Reveal className="packages-teaser__panel">
          <div className="packages-teaser__lead">
            <p className="eyebrow">Packages</p>
            <h2 id="packages-teaser-title" className="display-lg">Grouped visits, when they're ready.</h2>
          </div>
          <div className="packages-teaser__body">
            <p className="body-lg">
              Bless Day Spa hasn't published treatment packages yet. This space is built and
              ready — it will list real packages the moment the spa confirms them.
            </p>
            <Button to="/packages" variant="secondary" arrow="down-right">See packages</Button>
          </div>
        </Reveal>
      </PageContainer>
    </Section>
  )
}
