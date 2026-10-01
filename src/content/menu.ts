import { homepageImages, menuImages } from './images'

export type MenuItem = {
  name: string
  price?: string
  note?: string
}

export type MenuCategory = {
  slug: string
  title: string
  tagline: string
  image: string
  alt: string
  /** No business photography of this category exists — the image is a neutral stand-in. */
  demo?: boolean
  items: MenuItem[]
}

// The service list and prices are sourced directly from Bless Day Spa's own
// treatment flyers (official marketing material supplied by the business),
// not third-party research; some prices vary slightly between flyers printed
// at different times, so this menu should be treated as a guide and
// confirmed when booking. All category images (see menuImages in
// content/images.ts) are now cropped from those same flyers/photos, with
// price and text overlays removed.
export const menuCategories: MenuCategory[] = [
  {
    slug: 'massage',
    title: 'Massage',
    tagline: 'Eight ways to work out tension, from a light Swedish glide to wood therapy.',
    image: menuImages.massage,
    alt: 'A hot stone massage treatment',
    items: [
      { name: 'Swedish massage' },
      { name: 'Deep tissue massage', price: '275 ETB' },
      { name: 'Hot stone massage', price: '325 ETB' },
      { name: 'Aromatherapy massage' },
      { name: 'Sports oil massage' },
      { name: 'Thai massage' },
      { name: 'Foot massage' },
      {
        name: 'Lymphatic massage (wood therapy)',
        note: 'Aids circulation and lymphatic drainage, helps break down cellulite, and improves skin tone and elasticity.',
      },
    ],
  },
  {
    slug: 'moroccan-bath',
    title: 'Moroccan bath',
    tagline: 'A traditional steam, scrub, and mask ritual in our tiled bath room.',
    image: homepageImages.moroccanBath,
    alt: 'The Moroccan bath room at Bless Day Spa',
    items: [{ name: 'Traditional Moroccan bath', price: '450 ETB' }],
  },
  {
    slug: 'steam-sauna',
    title: 'Steam & sauna',
    tagline: 'Private heat therapy to open the day or close it.',
    image: homepageImages.steamSauna,
    alt: 'The steam bath room at Bless Day Spa',
    items: [{ name: "Couple's steam bath", price: '350 ETB' }, { name: 'Sauna & steam' }],
  },
  {
    slug: 'facials',
    title: 'Facials',
    tagline: 'From a classic clean-up to diamond-tip microdermabrasion.',
    image: menuImages.facials,
    alt: 'A clay facial mask being applied at a spa',
    items: [
      { name: 'Classic facial' },
      { name: 'Anti-aging facial' },
      { name: 'Diamond microdermabrasion facial', price: '350 ETB' },
      { name: 'Light therapy & ultrasonic facial' },
    ],
  },
  {
    slug: 'hair-and-beauty',
    title: 'Hair & beauty',
    tagline: 'Full salon care, plus organic avocado-oil and shea-butter treatments.',
    image: menuImages.hairAndBeauty,
    alt: 'A client under a hood dryer during a hair treatment at Bless Day Spa',
    items: [
      { name: 'Full-service hair salon' },
      { name: 'Organic hair treatments' },
      { name: 'Avocado oil & shea butter hair treatment', price: '150 ETB' },
      { name: 'Organic sugaring (hair removal)' },
      { name: 'Waxing' },
    ],
  },
  {
    slug: 'nail-care',
    title: 'Nail care',
    tagline: 'Manicure, pedicure, and shellac finishes.',
    image: menuImages.nailCare,
    alt: 'A nail technician finishing a manicure',
    items: [
      { name: 'Manicure & pedicure', price: '220 ETB' },
      { name: 'Shellac manicure with hair wash & style', price: '300 ETB' },
    ],
  },
]
