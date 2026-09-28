import { useState } from 'react'
import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { ImageFrame } from '../components/ui/ImageFrame'
import { reviews } from '../content/reviews'
import { reviewsImage } from '../content/images'
import { usePageTitle } from '../hooks/usePageTitle'

export const ReviewsPage = () => {
  usePageTitle('Reviews')
  const [index, setIndex] = useState(0)
  const review = reviews[index]
  const go = (next: number) => setIndex((next + reviews.length) % reviews.length)

  return (
    <main id="main-content">
      <Section padding="top" className="page-intro">
        <PageContainer narrow>
          <SectionHeading level={1} eyebrow="Guest notes" title="What visitors have shared.">
            <p className="body-lg">
              These excerpts are from public Tripadvisor reviews and represent the experiences
              of individual guests.
            </p>
          </SectionHeading>
        </PageContainer>
      </Section>

      <Section padding="bottom">
        <PageContainer>
          <div className="reviews-spotlight">
            <div className="reviews-spotlight__media">
              <ImageFrame variant="editorial" aspectRatio="portrait" src={reviewsImage} demo alt="Demonstration interior detail photography" />
            </div>

            <div className="reviews-spotlight__content">
              <blockquote className="reviews-spotlight__quote">
                <p>&ldquo;{review.quote}&rdquo;</p>
                <footer className="body-sm">{review.attribution}</footer>
              </blockquote>

              {reviews.length > 1 && (
                <div className="testimonial-slider__controls reviews-spotlight__controls">
                  <button type="button" className="testimonial-slider__arrow" onClick={() => go(index - 1)} aria-label="Previous review">
                    ←
                  </button>
                  <div className="testimonial-slider__dots">
                    {reviews.map((r, i) => (
                      <button
                        key={r.attribution}
                        type="button"
                        className={`testimonial-slider__dot ${i === index ? 'is-active' : ''}`}
                        aria-current={i === index}
                        aria-label={`Show review ${i + 1}`}
                        onClick={() => setIndex(i)}
                      />
                    ))}
                  </div>
                  <button type="button" className="testimonial-slider__arrow" onClick={() => go(index + 1)} aria-label="Next review">
                    →
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="review-disclosure">
            <p className="body-sm">Reviews are not edited or presented as a promise of a particular result.</p>
            <a className="text-link" href={reviews[0]?.sourceUrl} target="_blank" rel="noreferrer">
              Read on Tripadvisor
            </a>
          </div>
        </PageContainer>
      </Section>
    </main>
  )
}
