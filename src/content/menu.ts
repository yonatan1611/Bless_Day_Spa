import { homepageImages, menuImages } from './images.js'

export type MenuItem = {
  name: string
  price?: string
  duration?: string
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

// This menu was sent directly by the Bless Day Spa owners (October 2026),
// replacing the earlier flyer-sourced price list — see the "Update: current
// menu supplied directly by the owners" entry in docs/research.md for the
// full provenance note. It is the current, authoritative list: hair salon
// services and packages, both part of the earlier flyer-sourced content, have
// been discontinued and are not included here. Item names, durations, and
// prices are reproduced exactly as given; durations have only been
// reformatted for clarity (e.g. "1,15 M" / "1.15 h" to "About 1 h 15 min"),
// never estimated or invented.
export const menuCategories: MenuCategory[] = [
  {
    slug: 'moroccan-bath',
    title: 'Moroccan Bath',
    tagline: 'A traditional steam, scrub, and soak ritual, in five variations, with an optional light massage.',
    image: homepageImages.moroccanBath,
    alt: 'The Moroccan bath room at Bless Day Spa',
    items: [
      { name: 'Normal Moroccan Bath', price: '2950 ETB' },
      { name: 'Normal Moroccan Bath + Light Massage', price: '3050 ETB' },
      { name: 'Honey Moroccan Bath', price: '3050 ETB' },
      { name: 'Honey Moroccan Bath + Light Massage', price: '3150 ETB' },
      { name: 'Chocolate Moroccan Bath', price: '3450 ETB' },
      { name: 'Chocolate Moroccan Bath + Light Massage', price: '3550 ETB' },
      { name: 'Milk & Honey Moroccan Bath', price: '3300 ETB' },
      { name: 'Milk & Honey Moroccan Bath + Light Massage', price: '3400 ETB' },
      { name: 'Special Coffee Moroccan Bath', price: '3500 ETB' },
      { name: 'Special Coffee Moroccan Bath + Light Massage', price: '3600 ETB' },
    ],
  },
  {
    slug: 'massage',
    title: 'Massage',
    tagline: 'Eight ways to work out tension, from a light Swedish glide to wood therapy.',
    image: menuImages.massage,
    alt: 'A hot stone massage treatment',
    items: [
      { name: 'Swedish Massage', price: '2000 ETB', duration: 'About 45-50 min' },
      { name: 'Oil Massage', price: '2000 ETB', duration: 'About 45-50 min' },
      { name: 'Deep Tissue Massage', price: '2050 ETB', duration: 'About 45-50 min' },
      { name: 'Hot Stone Massage', price: '2400 ETB', duration: 'About 1 h 15 min' },
      { name: 'Aromatherapy Massage', price: '2300 ETB', duration: 'About 45-50 min', note: 'With a choice of different aromas.' },
      { name: 'Reflexology (Foot Massage)', price: '1800 ETB', duration: 'About 35-40 min' },
      { name: 'Sports Oil Massage', price: '2100 ETB', duration: 'About 45-50 min' },
      {
        name: 'Maderotherapy (Wood Massage)',
        price: '3300 ETB',
        duration: 'About 1 h',
        note: 'Aids circulation and lymphatic drainage, helps break down cellulite, and improves skin tone and elasticity.',
      },
    ],
  },
  {
    slug: 'steam-sauna',
    title: 'Steam & Sauna',
    tagline: 'Private heat therapy to open the day or close it, alone or with a partner.',
    image: homepageImages.steamSauna,
    alt: 'The steam bath room at Bless Day Spa',
    items: [
      { name: 'Steam Bath for One', price: '1800 ETB', duration: 'About 1 h 15 min' },
      { name: 'Sauna & Steam Bath for One', price: '2500 ETB', duration: 'About 1 h 30 min' },
      { name: 'Steam Bath for Couple', price: '2200 ETB', duration: 'About 1 h 30 min' },
      { name: 'Sauna & Steam Bath for Couple', price: '2500 ETB', duration: 'About 1 h 30 min' },
    ],
  },
  {
    slug: 'facials',
    title: 'Facials',
    tagline: 'Diamond-tip microdermabrasion to clear and refresh the skin.',
    image: menuImages.facials,
    alt: 'A clay facial mask being applied at a spa',
    items: [{ name: 'Microdermabrasion Facial', price: '2800 ETB', duration: 'About 40-50 min' }],
  },
]
