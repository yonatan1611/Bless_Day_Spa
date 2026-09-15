import { PageIntro } from '../components/PageIntro'

const reviews = [
  { quote: '“High quality services, and the level of professionalism.”', by: 'Tripadvisor guest review · April 2025' },
  { quote: '“Friendly, clean and professional.”', by: 'Tripadvisor guest review · June 2018' },
]

export function ReviewsPage() {
  return <main id="main-content">
    <PageIntro eyebrow="Guest notes" title="What visitors have shared."><p>These excerpts are from public Tripadvisor reviews and represent the experiences of individual guests.</p></PageIntro>
    <section className="reviews-list" aria-label="Guest reviews">{reviews.map((review) => <blockquote key={review.by}><p>{review.quote}</p><footer>{review.by}</footer></blockquote>)}</section>
    <section className="review-disclosure"><p>Reviews are not edited or presented as a promise of a particular result.</p><a className="text-link" href="https://www.tripadvisor.com/Attraction_Review-g293791-d8062300-Reviews-Bless_Day_Spa-Addis_Ababa.html" target="_blank" rel="noreferrer">Read on Tripadvisor <span aria-hidden="true">↗</span></a></section>
  </main>
}
