import { useEffect, useRef, useState, type ReactNode } from 'react'
import { PageContainer, Section } from '../layout/Primitives'
import { SectionHeading } from '../layout/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { ImageFrame } from '../ui/ImageFrame'
import { useCountUp } from '../../hooks/useCountUp'
import { business } from '../../content/business'
import { reviews } from '../../content/reviews'
import { homepageImages } from '../../content/images'

// A line brightens as it crosses the center of the viewport and dims once it
// passes — a continuous, scroll-linked focus rather than Reveal's one-time
// fade-in. Resolves to always-focused under prefers-reduced-motion, since
// there's no scroll position to track meaningfully there.
const BlessExperienceLine = ({ number, children }: { number: string; children: ReactNode }) => {
  const ref = useRef<HTMLLIElement>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFocused(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setFocused(entry.isIntersecting), {
      rootMargin: '-42% 0px -42% 0px',
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <li ref={ref} className={`bless-experience__line ${focused ? 'is-focused' : ''}`}>
      <span className="bless-experience__line-number" aria-hidden="true">{number}</span>
      <div className="bless-experience__line-body">{children}</div>
    </li>
  )
}

const YearsLine = () => {
  const { ref, value } = useCountUp(20)
  return (
    <BlessExperienceLine number="02">
      <p className="display-md">
        <span ref={ref} aria-hidden="true">{value}</span>+
        <span className="sr-only"> {business.yearsExperience}</span> years of experience
      </p>
      <p className="body">Full-service spa care, from massage to hair styling, in one place.</p>
    </BlessExperienceLine>
  )
}

export const BlessExperience = () => (
  <Section aria-labelledby="bless-experience-title" className="bless-experience">
    <PageContainer className="bless-experience__grid">
      <div className="bless-experience__media">
        <ImageFrame
          variant="editorial"
          aspectRatio="portrait"
          src={homepageImages.steamSauna}
          alt="The steam room at Bless Day Spa"
        />
      </div>

      <div className="bless-experience__copy">
        <Reveal>
          <SectionHeading eyebrow="The Bless experience" title="What guests notice." id="bless-experience-title" />
        </Reveal>

        <ul className="bless-experience__list">
          <BlessExperienceLine number="01">
            <p className="display-md">One place, six rituals</p>
            <p className="body">Massage, Moroccan bath, steam &amp; sauna, hair salon, facials, and nail care — together in one visit.</p>
          </BlessExperienceLine>

          <YearsLine />

          <BlessExperienceLine number="03">
            <p className="display-md">{business.areaDescription}</p>
            <p className="body">{business.landmark}, {business.city}.</p>
          </BlessExperienceLine>

          <BlessExperienceLine number="04">
            <p className="display-md">&ldquo;{reviews[0].quote}&rdquo;</p>
            <p className="body-sm bless-experience__attribution">{reviews[0].attribution}</p>
          </BlessExperienceLine>
        </ul>
      </div>
    </PageContainer>
  </Section>
)
