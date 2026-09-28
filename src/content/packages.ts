import { packageImages } from './images'

// Mirrors the `Package` model in prisma/schema.prisma (name, description,
// priceEtb) plus the image/alt this static content needs to render a card.
// Names, descriptions, and prices are sourced directly from Bless Day Spa's
// own package flyers (official marketing material supplied by the business),
// not third-party research. The flyer photos themselves were low-resolution
// internet stock images, so the card images use sharper royalty-free stock
// photography instead (Unsplash License, downloaded into the project rather
// than hot-linked) — hence the generic alt text rather than a claim to show
// this specific spa.
export type Package = {
  slug: string
  name: string
  description: string
  price: string
  image: string
  alt: string
}

export const packages: Package[] = [
  {
    slug: 'manicure-pedicure',
    name: 'Luxurious Manicure & Pedicure',
    description: 'A full manicure and pedicure together in one visit.',
    price: '220 ETB',
    image: packageImages.manicurePedicure,
    alt: 'Manicured hands resting on pedicured feet',
  },
  {
    slug: 'shellac-manicure-hair',
    name: 'Shellac Manicure with Hair Wash & Style',
    description: 'A long-lasting shellac manicure paired with a hair wash and style.',
    price: '300 ETB',
    image: packageImages.shellacManicure,
    alt: 'A glossy shellac manicure finish',
  },
]
