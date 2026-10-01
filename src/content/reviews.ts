// Verified excerpts only — sourced from the public Tripadvisor listing.
// See docs/research.md. Do not add reviews that are not independently
// sourced. The listing itself blocks automated fetching, so these entries
// (including the two added after the initial research pass) were copied
// verbatim, with reviewer name/date, directly from the live page by the site
// maintainer rather than fetched by a tool.

export type Review = { quote: string; attribution: string; sourceUrl: string }

export const reviews: Review[] = [
  {
    quote: 'High quality services, and the level of professionalism.',
    attribution: 'davidevil · Tripadvisor guest review, April 2025',
    sourceUrl: 'https://www.tripadvisor.com/Attraction_Review-g293791-d8062300-Reviews-Bless_Day_Spa-Addis_Ababa.html',
  },
  {
    quote: 'The Bless Day Spa is a lovely tranquil getaway with professional staff who offer great services.',
    attribution: 'Senait H., Dallas, Texas · Tripadvisor guest review, June 2018',
    sourceUrl: 'https://www.tripadvisor.com/Attraction_Review-g293791-d8062300-Reviews-Bless_Day_Spa-Addis_Ababa.html',
  },
  {
    quote: 'Amazing place, friendly staff, excellent management and relaxing atmosphere.',
    attribution: 'Hiwot T., Arlington, Virginia · Tripadvisor guest review, July 2017',
    sourceUrl: 'https://www.tripadvisor.com/Attraction_Review-g293791-d8062300-Reviews-Bless_Day_Spa-Addis_Ababa.html',
  },
  {
    quote: 'The price was reasonable and the treatment was AMAZING.',
    attribution: 'Tripadvisor guest review · October 2015',
    sourceUrl: 'https://www.tripadvisor.com/Attraction_Review-g293791-d8062300-Reviews-Bless_Day_Spa-Addis_Ababa.html',
  },
]
