import { useRef, useState, type TouchEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PageContainer, Section } from '../layout/Primitives'
import { SectionHeading } from '../layout/SectionHeading'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { reviews } from '../../content/reviews'

export const Testimonials = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStartX = useRef<number | null>(null)

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1)
    setIndex((next + reviews.length) % reviews.length)
  }

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
  }
  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 48) go(index + (delta < 0 ? 1 : -1))
    touchStartX.current = null
  }

  const review = reviews[index]

  return (
    <Section className="section--surface testimonials" aria-labelledby="testimonials-title">
      <PageContainer narrow>
        <Reveal>
          <SectionHeading eyebrow="Guest notes" title="What visitors have shared." id="testimonials-title">
            <p className="body-lg">Public Tripadvisor reviews, in guests&rsquo; own words.</p>
          </SectionHeading>
        </Reveal>

        <Reveal delay={120} className="testimonial-slider">
          <div
            className="testimonial-slider__viewport"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="region"
            aria-roledescription="carousel"
            aria-label="Guest reviews"
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.blockquote
                key={review.attribution}
                className="testimonial-slider__slide testimonial-slider__slide--spotlight"
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="display-md">&ldquo;{review.quote}&rdquo;</p>
                <footer className="body-sm">{review.attribution}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {reviews.length > 1 && (
            <div className="testimonial-slider__controls">
              <button type="button" className="testimonial-slider__arrow" onClick={() => go(index - 1)} aria-label="Previous review">
                ←
              </button>
              <div className="testimonial-slider__dots">
                {reviews.map((review, i) => (
                  <button
                    key={review.attribution}
                    type="button"
                    className={`testimonial-slider__dot ${i === index ? 'is-active' : ''}`}
                    aria-current={i === index}
                    aria-label={`Show review ${i + 1}`}
                    onClick={() => go(i)}
                  />
                ))}
              </div>
              <button type="button" className="testimonial-slider__arrow" onClick={() => go(index + 1)} aria-label="Next review">
                →
              </button>
            </div>
          )}
        </Reveal>

        <Button to="/reviews" variant="text" arrow="down-right">Read more reviews</Button>
      </PageContainer>
    </Section>
  )
}
