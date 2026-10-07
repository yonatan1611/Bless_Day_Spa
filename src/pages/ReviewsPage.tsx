import { SectionHeading } from '../components/layout/SectionHeading'
import { PageContainer, Section } from '../components/layout/Primitives'
import { ImageFrame } from '../components/ui/ImageFrame'
import { BlurText } from '../components/react-bits/BlurText'
import { Carousel } from '../components/react-bits/Carousel'
import { ScrollVelocity } from '../components/react-bits/ScrollVelocity'
import { reviews } from '../content/reviews'
import { reviewsImage } from '../content/images'
import { usePageTitle } from '../hooks/usePageTitle'

export const ReviewsPage = () => {
  usePageTitle('Reviews')

  return (
    <main id="main-content">
      <Section padding="top" className="page-intro">
        <PageContainer narrow>
          <SectionHeading level={1} eyebrow="Guest notes" title="What visitors have shared.">
            <BlurText
              text="These excerpts are from public Tripadvisor reviews and represent the experiences of individual guests."
              className="body-lg"
            />
          </SectionHeading>
        </PageContainer>
      </Section>

      <ScrollVelocity text="Tripadvisor guest reviews · " className="reviews-marquee" />

      <Section padding="bottom">
        <PageContainer>
          <div className="reviews-spotlight">
            <div className="reviews-spotlight__media">
              <ImageFrame variant="editorial" aspectRatio="portrait" src={reviewsImage} alt="A lounge corner at Bless Day Spa" />
            </div>

            <div className="reviews-spotlight__content">
              <div className="reviews-spotlight__stage">
                <Carousel
                  ariaLabel="Guest reviews"
                  autoplayDelay={5000}
                  items={reviews.map((review) => (
                    <blockquote key={review.attribution} className="reviews-spotlight__quote">
                      <p>&ldquo;{review.quote}&rdquo;</p>
                      <footer className="body-sm">{review.attribution}</footer>
                    </blockquote>
                  ))}
                />
              </div>
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
