export type Service = {
  slug: 'massage' | 'moroccan-bath' | 'steam-sauna' | 'hair-salon' | 'facials' | 'nail-care'
  title: string
  description: string
  detail: string
  note: string
}

// Categories are drawn from the business listing. Treatment variations, durations,
// prices, and contraindications are intentionally not inferred.
export const services: Service[] = [
  { slug: 'massage', title: 'Massage', description: 'Massage is listed among the spa’s services.', detail: 'Ask the spa about the massage treatment and availability that best suits your visit.', note: 'Treatment type, length, and pricing are confirmed directly with the spa.' },
  { slug: 'moroccan-bath', title: 'Moroccan bath', description: 'A Moroccan bath is listed as part of the Bless Day Spa offering.', detail: 'A dedicated ritual for setting time aside in the middle of the city.', note: 'Please ask the spa directly about what is included and appointment availability.' },
  { slug: 'steam-sauna', title: 'Steam & sauna', description: 'Steam and sauna are listed among the facilities available at the spa.', detail: 'Plan your visit with the spa so they can advise on current access and timing.', note: 'Availability and any relevant guidance should be confirmed before visiting.' },
  { slug: 'hair-salon', title: 'Hair salon', description: 'Hair salon services are listed alongside the spa offering.', detail: 'Salon care is available within the same Wollo Sefer location.', note: 'Please contact the spa for current salon service details and availability.' },
  { slug: 'facials', title: 'Facials', description: 'Facials are listed among the spa’s services, from a classic clean-up to diamond microdermabrasion.', detail: 'Ask the spa which facial suits your skin and the time you have for your visit.', note: 'Treatment type, length, and pricing are confirmed directly with the spa.' },
  { slug: 'nail-care', title: 'Nail care', description: 'Manicure and pedicure services, including shellac finishes, are listed among the spa’s offering.', detail: 'A tidy finish for hands and feet, booked on its own or alongside another treatment.', note: 'Please ask the spa directly about current availability and pricing.' },
]

export const getService = (slug: string | undefined) => services.find((service) => service.slug === slug)
