import { SectionHeading } from '../components/layout/SectionHeading'
import { PageContainer, Section } from '../components/layout/Primitives'
import { ImageFrame } from '../components/ui/ImageFrame'
import { BlurText } from '../components/react-bits/BlurText'
import { CardSwap, SwapCard } from '../components/react-bits/CardSwap'
import { ScrollVelocity } from '../components/react-bits/ScrollVelocity'
import { GradientText } from '../components/react-bits/GradientText'
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

      <ScrollVelocity text="TRIPADVISOR GUEST REVIEWS · " className="reviews-marquee" />

      <Section padding="bottom">
        <PageContainer>
          <div className="reviews-spotlight">
            <div className="reviews-spotlight__media">
              <ImageFrame variant="editorial" aspectRatio="portrait" src={reviewsImage} alt="A lounge corner in the hair salon at Bless Day Spa" />
            </div>

            <div className="reviews-spotlight__content">
              <p className="eyebrow"><GradientText>Real reviews, cycling automatically</GradientText></p>
              <div className="reviews-spotlight__stage">
                <CardSwap width="100%" height={260} delay={5000}>
                  {reviews.map((review) => (
                    <SwapCard key={review.attribution} className="reviews-spotlight__card">
                      <blockquote className="reviews-spotlight__quote">
                        <p>&ldquo;{review.quote}&rdquo;</p>
                        <footer className="body-sm">{review.attribution}</footer>
                      </blockquote>
                    </SwapCard>
                  ))}
                </CardSwap>
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
