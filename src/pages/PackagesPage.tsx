import { PageContainer, Section } from '../components/layout/Primitives'
import { ImageFrame } from '../components/ui/ImageFrame'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { packages } from '../content/packages'
import { services } from '../content/services'
import { business } from '../content/business'
import { packagesImage } from '../content/images'
import { usePageTitle } from '../hooks/usePageTitle'

export const PackagesPage = () => {
  usePageTitle('Packages')

  return (
    <main id="main-content">
      <section className="packages-hero" aria-labelledby="packages-hero-title">
        <div className="packages-hero__media">
          <ImageFrame
            variant="hero"
            src={packagesImage}
            priority
            alt="A private treatment room at Bless Day Spa, lit lattice divider and rose petals"
          />
        </div>
        <div className="packages-hero__copy">
          <p className="eyebrow packages-hero__eyebrow">Packages</p>
          <h1 id="packages-hero-title" className="packages-hero__title">Grouped visits, ready to book.</h1>
          <p className="body-lg packages-hero__intro">
            Two treatments combined into a single visit. Prices are shown as listed by Bless Day
            Spa — please confirm current rates when you book.
          </p>
        </div>
      </section>

      {packages.length > 0 ? (
        <Section aria-label="Packages">
          <PageContainer>
            <div className="package-grid">
              {packages.map((item) => (
                <article key={item.slug} className="package-card">
                  <ImageFrame variant="editorial" aspectRatio="landscape" src={item.image} alt={item.alt} />
                  <div className="package-card__body">
                    <div className="package-card__heading">
                      <h2 className="h3">{item.name}</h2>
                      <span className="package-card__price">{item.price}</span>
                    </div>
                    <p className="body-sm">{item.description}</p>
                    <Button to={`/book?package=${item.slug}`} variant="secondary" arrow="down-right">Book this package</Button>
                  </div>
                </article>
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
            <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
            <Button to="/treatments" variant="secondary" arrow="down-right">Explore Treatments</Button>
          </div>
        </PageContainer>
      </Section>
    </main>
  )
}
