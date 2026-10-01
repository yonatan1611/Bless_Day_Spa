export type Service = {
  slug: 'massage' | 'moroccan-bath' | 'steam-sauna' | 'hair-salon' | 'facials' | 'nail-care'
  title: string
  description: string
  detail: string
  note: string
}

// Categories are drawn from the business listing. description/detail explain
// what each treatment generally is and what it's commonly used for — that's
// well-established, general knowledge about the treatment type, not a claim
// about this specific business. What stays unconfirmed (and belongs in
// `note` instead) is anything Bless Day Spa-specific: exact technique,
// session length, pricing, and availability.
export const services: Service[] = [
  {
    slug: 'massage',
    title: 'Massage',
    description: 'Hands-on bodywork that eases muscle tension, improves circulation, and helps you unwind — from a light Swedish glide to deep, targeted pressure.',
    detail: 'Massage uses pressure, kneading, and stretching to relax muscles, work out stiffness, and calm the nervous system. Styles range from a gentle, flowing Swedish massage for general relaxation to deep tissue and hot stone work aimed at tension held in the back, shoulders, and legs. It’s commonly used to relieve everyday stress, ease sore or overworked muscles, and improve flexibility and circulation.',
    note: 'The specific style, session length, and pricing for your visit are confirmed directly with the spa.',
  },
  {
    slug: 'moroccan-bath',
    title: 'Moroccan bath',
    description: 'A traditional hammam-style ritual of steam, deep exfoliation, and cleansing — a long-standing way to soften and refresh the skin.',
    detail: 'A Moroccan bath, or hammam, starts with warm steam that opens the pores, followed by a full-body scrub — often with a kessa glove — that sloughs away dead skin and leaves it noticeably softer. Black soap or a clay mask is sometimes worked in to deep-clean and nourish. It’s built around slowing down: a ritual for cleansing thoroughly and spending unhurried time away from the day.',
    note: 'What’s included and appointment availability are confirmed directly with the spa.',
  },
  {
    slug: 'steam-sauna',
    title: 'Steam & sauna',
    description: 'Private heat therapy that opens the pores, loosens muscles, and helps you unwind before or after a treatment.',
    detail: 'Steam and sauna use moist or dry heat to relax muscles, open pores, and encourage sweating — often used to de-stress, loosen up before a massage, or simply slow down. A steam room’s humid heat can also help clear the sinuses, while a sauna’s dry heat suits a longer, deeper sweat. Both are typically booked as short, private sessions.',
    note: 'Current access and timing are confirmed directly with the spa.',
  },
  {
    slug: 'hair-salon',
    title: 'Hair salon',
    description: 'Full salon care — cuts, styling, and organic hair treatments — alongside the spa’s other services.',
    detail: 'The hair salon covers everyday cuts and styling alongside treatments like organic avocado-oil and shea-butter conditioning, used to nourish and strengthen hair, plus waxing and sugaring for hair removal. It’s a way to pair a haircut or style with deeper hair and skin care in the same visit.',
    note: 'Current salon service details and availability are confirmed directly with the spa.',
  },
  {
    slug: 'facials',
    title: 'Facials',
    description: 'Skin-focused treatments that cleanse, exfoliate, and refresh — from a classic facial to diamond-tip microdermabrasion.',
    detail: 'A facial typically combines cleansing, exfoliation, and a mask or serum suited to the skin, used to clear impurities, smooth texture, and leave skin brighter. Microdermabrasion goes further, using a fine diamond-tip wand to gently buff away the outer layer of dead skin — which can soften fine lines and even out tone. Facials are generally chosen as a reset for tired or congested skin, or as regular upkeep.',
    note: 'Which facial suits your skin, and its length and pricing, are confirmed directly with the spa.',
  },
  {
    slug: 'nail-care',
    title: 'Nail care',
    description: 'Manicure and pedicure care for hands and feet, including a longer-lasting shellac finish.',
    detail: 'A manicure and pedicure shape and tidy the nails, care for the cuticles, and finish with polish. A shellac manicure adds a gel-based polish that’s cured under UV light, giving a glossier result that lasts longer than regular polish before it chips. It’s a quick way to keep hands and feet neat, on its own or paired with another treatment.',
    note: 'Current availability and pricing are confirmed directly with the spa.',
  },
]

export const getService = (slug: string | undefined) => services.find((service) => service.slug === slug)
