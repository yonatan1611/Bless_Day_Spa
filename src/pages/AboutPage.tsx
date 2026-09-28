import { PageContainer, Section } from '../components/layout/Primitives'
import { EditorialSplit } from '../components/layout/EditorialSplit'
import { ImageFrame } from '../components/ui/ImageFrame'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { business } from '../content/business'
import { reviews } from '../content/reviews'
import { aboutImages } from '../content/images'
import { usePageTitle } from '../hooks/usePageTitle'

export const AboutPage = () => {
  usePageTitle('About')

  return (
    <main id="main-content">
      <Section padding="top" className="about-hero">
        <PageContainer narrow>
          <p className="eyebrow">About {business.name}</p>
          <h1 className="about-hero__title">A day spa in Wollo Sefer.</h1>
          <p className="body-lg">{business.servesDescription}</p>
        </PageContainer>
      </Section>

      <Section aria-labelledby="about-intro-title">
        <PageContainer>
          <Reveal>
            <EditorialSplit
              media={<ImageFrame variant="editorial" aspectRatio="portrait" src={aboutImages.hallway} alt="The Bless Day Spa building entrance in Wollo Sefer" />}
              mediaSide="right"
            >
              <p className="eyebrow">What it is</p>
              <h2 id="about-intro-title" className="display-md">Massage, Moroccan bath, steam &amp; sauna, and hair salon care.</h2>
              <p className="body">Full pricing for every treatment is on the treatments page.</p>
              <Button to="/treatments" variant="text" arrow="down-right">Browse treatments</Button>
            </EditorialSplit>
          </Reveal>
        </PageContainer>
      </Section>

      <Section className="section--accent about-atmosphere" aria-labelledby="atmosphere-title">
        <PageContainer narrow>
          <Reveal className="about-atmosphere__grid">
            <div className="about-atmosphere__media">
              <ImageFrame variant="gallery" aspectRatio="square" src={aboutImages.towels} demo alt="Demonstration linen photography" />
            </div>
            <div>
              <p className="eyebrow">The atmosphere</p>
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
            <p className="eyebrow">A closer look</p>
            <h2 id="storytelling-title" className="display-md">The setting, in detail.</h2>
          </Reveal>
          <Reveal delay={120} className="about-mosaic">
            <ImageFrame variant="editorial" aspectRatio="landscape" className="about-mosaic__large" src={aboutImages.curtain} demo alt="Demonstration light and linen detail" />
            <ImageFrame variant="gallery" src={aboutImages.woodGrain} demo alt="Demonstration natural wood detail" />
          </Reveal>
        </PageContainer>
      </Section>

      <Section className="section--surface" aria-labelledby="confirm-title">
        <PageContainer narrow>
          <Reveal className="information-note">
            <h2 className="eyebrow" id="confirm-title">What we can confirm</h2>
            <p className="body-sm">
              Details beyond the service categories and location shown on this site — including
              opening year, ownership, and certifications — have not yet been confirmed by the
              business. This page will be updated as soon as they are.
            </p>
            <Button to="/contact" variant="text" arrow="down-right">Visit &amp; contact details</Button>
          </Reveal>
        </PageContainer>
      </Section>

      <Section className="section--inverse about-cta" aria-labelledby="about-cta-title">
        <PageContainer narrow>
          <p className="eyebrow">Come visit</p>
          <h2 id="about-cta-title" className="display-lg">Plan your visit.</h2>
          <p className="body-lg">Send {business.name} a message to ask about an available time.</p>
          <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
        </PageContainer>
      </Section>
    </main>
  )
}
