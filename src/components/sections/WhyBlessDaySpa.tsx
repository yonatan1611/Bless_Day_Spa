import { PageContainer, Section } from '../layout/Primitives'
import { SectionHeading } from '../layout/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { useCountUp } from '../../hooks/useCountUp'
import { business } from '../../content/business'
import { reviews } from '../../content/reviews'

// Every line here is traceable to docs/research.md (including its first-party
// addendum) or content/reviews.ts — no service quality or award claims are
// made. The middle card used to just restate business.servesDescription,
// which the hero already says — it's a stat instead now, so all three cards
// tell a visitor something new rather than repeating the homepage.
const YearsStat = () => {
  const { ref, value } = useCountUp(20)
  return (
    <article className="why__item why__item--stat">
      <span className="why__stat" ref={ref} aria-hidden="true">{value}+</span>
      <h3 className="display-md">
        <span className="sr-only">{business.yearsExperience} </span>
        Years of experience
      </h3>
      <p className="body">Full-service spa care, from massage to hair styling, in one place.</p>
    </article>
  )
}

export const WhyBlessDaySpa = () => (
  <Section aria-labelledby="why-title" className="why">
    <PageContainer>
      <Reveal>
        <SectionHeading eyebrow="Why Bless Day Spa" title="What guests notice." id="why-title" />
      </Reveal>

      <Reveal delay={120} className="why__row">
        <article className="why__item">
          <span className="why__number" aria-hidden="true">01</span>
          <h3 className="display-md">One place, four rituals</h3>
          <p className="body">Massage, Moroccan bath, steam &amp; sauna, and hair salon — together in Wollo Sefer.</p>
        </article>

        <YearsStat />

        <article className="why__item why__item--quote">
          <span className="why__number" aria-hidden="true">03</span>
          <h3 className="display-md">Noticed by guests</h3>
          <p className="body">&ldquo;{reviews[0].quote}&rdquo;</p>
          <p className="body-sm why__attribution">{reviews[0].attribution}</p>
        </article>
      </Reveal>
    </PageContainer>
  </Section>
)
