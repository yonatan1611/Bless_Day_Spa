import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { BlurText } from '../components/react-bits/BlurText'
import { TiltedCard } from '../components/react-bits/TiltedCard'
import { ClickSpark } from '../components/react-bits/ClickSpark'
import { onSpotlightPointerMove } from '../lib/spotlight'
import { packages } from '../content/packages'
import { services } from '../content/services'
import { business } from '../content/business'
import { usePageTitle } from '../hooks/usePageTitle'

export const PackagesPage = () => {
  usePageTitle('Packages')

  return (
    <main id="main-content">
      <Section padding="top" className="page-intro">
        <PageContainer narrow>
          <SectionHeading
            level={1}
            eyebrow="Packages"
            title={<BlurText text="Grouped visits, ready to book." tag="span" direction="top" />}
          >
            <p className="body-lg">
              Two treatments combined into a single visit. Prices are shown as listed by Bless Day
              Spa — please confirm current rates when you book.
            </p>
          </SectionHeading>
        </PageContainer>
      </Section>

      {packages.length > 0 ? (
        <Section aria-label="Packages">
          <PageContainer>
            <div className="package-stack">
              {packages.map((item, index) => (
                <Reveal key={item.slug}>
                  <article
                    className={`package-panel ${index % 2 === 1 ? 'package-panel--reverse' : ''}`}
                    onMouseMove={onSpotlightPointerMove}
                  >
                    <span className="package-panel__spotlight" aria-hidden="true" />
                    <div className="package-panel__media">
                      <TiltedCard imageSrc={item.image} altText={item.alt} captionText={item.name} />
                    </div>
                    <div className="package-panel__body">
                      <span className="package-panel__number" aria-hidden="true">0{index + 1}</span>
                      <h2 className="display-lg">{item.name}</h2>
                      <span className="package-panel__price">{item.price}</span>
                      <p className="body-lg">{item.description}</p>
                      <ClickSpark>
                        <Button to={`/book?package=${item.slug}`} variant="primary" arrow="down-right">Book this package</Button>
                      </ClickSpark>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </PageContainer>
        </Section>
      ) : (
        <>
          <Section aria-labelledby="how-title">
            <PageContainer narrow>
              <Reveal>
                <p className="eyebrow">How packages will work</p>
                <h2 id="how-title" className="display-md">Two or more treatments, one visit.</h2>
                <p className="body-lg packages-how__intro">
                  A package brings together two or more of the spa&rsquo;s existing treatments into a
                  single, longer visit. Until fixed combinations are published, every one of the
                  treatments below can still be requested together directly with the spa.
                </p>
                <ul className="packages-how__list">
                  {services.map((service) => (
                    <li key={service.slug}>{service.title}</li>
                  ))}
                </ul>
              </Reveal>
            </PageContainer>
          </Section>

          <Section className="section--surface" aria-labelledby="empty-title">
            <PageContainer narrow>
              <Reveal className="packages-empty">
                <p className="eyebrow">Before your visit</p>
                <h2 id="empty-title" className="display-md">No packages are confirmed at this time.</h2>
                <p className="body-lg">
                  Message the spa directly to ask about combining treatments — and check back here
                  once fixed packages and pricing are published.
                </p>
                <Button href={business.messengerUrl} variant="secondary" arrow="up-right">Ask the spa directly</Button>
              </Reveal>
            </PageContainer>
          </Section>
        </>
      )}

      <Section className="section--inverse packages-cta" aria-labelledby="packages-cta-title">
        <PageContainer narrow>
          <p className="eyebrow">Ready when you are</p>
          <h2 id="packages-cta-title" className="display-lg">Ask about your visit.</h2>
          <p className="body-lg">Send {business.name} a message to talk through what you need.</p>
          <div className="packages-cta__actions">
            <ClickSpark>
              <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
            </ClickSpark>
            <Button to="/treatments" variant="secondary" arrow="down-right">Explore Treatments</Button>
          </div>
        </PageContainer>
      </Section>
    </main>
  )
}
