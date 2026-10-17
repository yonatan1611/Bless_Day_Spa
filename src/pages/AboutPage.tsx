import { ArrowRight } from 'lucide-react'
import { PageContainer, Section } from '../components/layout/Primitives'
import { EditorialSplit } from '../components/layout/EditorialSplit'
import { ImageFrame } from '../components/ui/ImageFrame'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { BlurText } from '../components/react-bits/BlurText'
import { TrueFocus } from '../components/react-bits/TrueFocus'
import { business } from '../content/business'
import { reviews } from '../content/reviews'
import { aboutImages } from '../content/images'
import { usePageTitle } from '../hooks/usePageTitle'

// Real facts only, traced to content/business.ts.
const expectFacts = [
  {
    title: 'Four rituals',
    subtitle: 'One visit, four ways to unwind',
    description: 'Massage, Moroccan bath, steam & sauna, and facials, together in Wollo Sefer.',
    features: ['Massage', 'Moroccan bath', 'Steam & sauna', 'Facials'],
  },
  {
    title: business.yearsExperience,
    subtitle: 'years of experience',
    description: 'Massage, Moroccan bath, steam, sauna, and facial care, in one place.',
    features: [business.hours.label, business.servesDescription],
  },
  {
    title: 'Wollo Sefer',
    subtitle: business.landmark,
    description: `${business.areaDescription}, ${business.city}.`,
    features: [business.areaDescription, business.city],
  },
]

export const AboutPage = () => {
  usePageTitle('About')

  return (
    <main id="main-content">
      <Section padding="top" className="about-hero">
        <PageContainer narrow>
          <p className="eyebrow">About {business.name}</p>
          <h1 className="about-hero__title">
            <BlurText text="A day spa in Wollo Sefer." tag="span" direction="top" />
          </h1>
          <p className="body-lg">
            {business.servesDescription} {business.yearsExperience} years of care in {business.areaDescription}, {business.city}.
          </p>
        </PageContainer>
      </Section>

      <Section aria-labelledby="about-intro-title">
        <PageContainer>
          <Reveal>
            <EditorialSplit
              media={<ImageFrame variant="editorial" aspectRatio="portrait" src={aboutImages.hallway} alt="The Bless Day Spa building entrance in Wollo Sefer" />}
              mediaSide="right"
            >
              <h2 id="about-intro-title" className="display-md">One spa. Every treatment you need.</h2>
              <p className="body">Full pricing for every treatment is on the treatments page.</p>
              <Button to="/treatments" variant="text" arrow="down-right">Browse treatments</Button>
            </EditorialSplit>
          </Reveal>
        </PageContainer>
      </Section>

      <Section aria-label="What's on offer" className="about-philosophy">
        <PageContainer narrow>
          <Reveal>
            <p className="eyebrow">All in one visit</p>
            <TrueFocus sentence="Massage Moroccan bath steam sauna and facials." />
          </Reveal>
        </PageContainer>
      </Section>

      <Section aria-labelledby="expect-title">
        <PageContainer>
          <Reveal>
            <h2 id="expect-title" className="display-md">The essentials, before you book.</h2>
          </Reveal>
          <Reveal delay={120} className="about-expect">
            {expectFacts.map((fact) => (
              <div key={fact.title} className="panel about-expect__tile">
                <span className="about-expect__title display-sm">{fact.title}</span>
                <p className="body-sm about-expect__subtitle">{fact.subtitle}</p>
                <p className="body-sm">{fact.description}</p>
                <ul className="about-expect__features">
                  {fact.features.map((feature) => (
                    <li key={feature}>
                      <ArrowRight aria-hidden="true" className="about-expect__feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </PageContainer>
      </Section>

      <Section className="section--accent about-atmosphere" aria-labelledby="atmosphere-title">
        <PageContainer narrow>
          <Reveal className="about-atmosphere__grid">
            <div className="about-atmosphere__media">
              <ImageFrame variant="gallery" aspectRatio="square" src={aboutImages.towels} alt="Rolled towels and rose petals on a treatment bed at Bless Day Spa" />
            </div>
            <div>
              <h2 id="atmosphere-title" className="display-md">What guests notice.</h2>
              <blockquote className="about-atmosphere__quote">
                <p>&ldquo;{reviews[1].quote}&rdquo;</p>
                <footer className="body-sm">{reviews[1].attribution}</footer>
              </blockquote>
            </div>
          </Reveal>
        </PageContainer>
      </Section>

      <Section aria-labelledby="storytelling-title">
        <PageContainer>
          <Reveal>
            <h2 id="storytelling-title" className="display-md">The setting, in detail.</h2>
          </Reveal>
          <Reveal delay={120} className="about-mosaic">
            <ImageFrame variant="editorial" aspectRatio="landscape" className="about-mosaic__large" src={aboutImages.curtain} alt="Curtain fabric in a treatment room at Bless Day Spa" />
            <ImageFrame variant="gallery" src={aboutImages.woodGrain} alt="Herringbone parquet flooring at Bless Day Spa" />
          </Reveal>
        </PageContainer>
      </Section>

      <Section className="section--surface" aria-labelledby="confirm-title">
        <PageContainer narrow>
          <Reveal className="information-note">
            <h2 className="h3" id="confirm-title">What we can confirm</h2>
            <p className="body-sm">
              Details beyond the service categories and location shown on this site, including
              opening year, ownership, and certifications, have not yet been confirmed by the
              business. This page will be updated as soon as they are.
            </p>
            <Button to="/contact" variant="text" arrow="down-right">Visit &amp; contact details</Button>
          </Reveal>
        </PageContainer>
      </Section>

      <Section className="section--inverse about-cta" aria-labelledby="about-cta-title">
        <PageContainer narrow>
          <h2 id="about-cta-title" className="display-lg">Plan your visit.</h2>
          <p className="body-lg">Send {business.name} a message to ask about an available time.</p>
          <Button href={business.whatsappUrl} variant="primary" arrow="down-right">Message on WhatsApp</Button>
        </PageContainer>
      </Section>
    </main>
  )
}
