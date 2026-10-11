// One-time seed: creates the first admin login and imports the current
// static menu (src/content/menu.ts) as the initial MenuCategory/MenuItem
// rows, so /admin starts out matching what's already live. Safe to re-run —
// skips the admin user if that email already exists, and skips the menu
// import entirely if any category already exists (the admin page is the
// source of truth after that point).
//
// Data below is a one-time transcription of src/content/menu.ts, not an
// import of it — this script runs outside Vite, and duplicating a few dozen
// lines here beats adding a TS-loader dependency just for seeding.
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const menuCategories = [
  {
    slug: 'moroccan-bath',
    title: 'Moroccan Bath',
    tagline: 'A traditional steam, scrub, and soak ritual, in five variations, with an optional light massage.',
    imageUrl: '/images/homepage/moroccan-bath.jpg',
    altText: 'The Moroccan bath room at Bless Day Spa',
    items: [
      { name: 'Normal Moroccan Bath', priceEtb: 2950 },
      { name: 'Normal Moroccan Bath + Light Massage', priceEtb: 3050 },
      { name: 'Honey Moroccan Bath', priceEtb: 3050 },
      { name: 'Honey Moroccan Bath + Light Massage', priceEtb: 3150 },
      { name: 'Chocolate Moroccan Bath', priceEtb: 3450 },
      { name: 'Chocolate Moroccan Bath + Light Massage', priceEtb: 3550 },
      { name: 'Milk & Honey Moroccan Bath', priceEtb: 3300 },
      { name: 'Milk & Honey Moroccan Bath + Light Massage', priceEtb: 3400 },
      { name: 'Special Coffee Moroccan Bath', priceEtb: 3500 },
      { name: 'Special Coffee Moroccan Bath + Light Massage', priceEtb: 3600 },
    ],
  },
  {
    slug: 'massage',
    title: 'Massage',
    tagline: 'Eight ways to work out tension, from a light Swedish glide to wood therapy.',
    imageUrl: '/images/brand/massage.jpg',
    altText: 'A hot stone massage treatment',
    items: [
      { name: 'Swedish Massage', priceEtb: 2000, duration: 'About 45-50 min' },
      { name: 'Oil Massage', priceEtb: 2000, duration: 'About 45-50 min' },
      { name: 'Deep Tissue Massage', priceEtb: 2050, duration: 'About 45-50 min' },
      { name: 'Hot Stone Massage', priceEtb: 2400, duration: 'About 1 h 15 min' },
      { name: 'Aromatherapy Massage', priceEtb: 2300, duration: 'About 45-50 min', note: 'With a choice of different aromas.' },
      { name: 'Reflexology (Foot Massage)', priceEtb: 1800, duration: 'About 35-40 min' },
      { name: 'Sports Oil Massage', priceEtb: 2100, duration: 'About 45-50 min' },
      {
        name: 'Maderotherapy (Wood Massage)',
        priceEtb: 3300,
        duration: 'About 1 h',
        note: 'Aids circulation and lymphatic drainage, helps break down cellulite, and improves skin tone and elasticity.',
      },
    ],
  },
  {
    slug: 'steam-sauna',
    title: 'Steam & Sauna',
    tagline: 'Private heat therapy to open the day or close it, alone or with a partner.',
    imageUrl: '/images/homepage/steam-sauna.jpg',
    altText: 'The steam bath room at Bless Day Spa',
    items: [
      { name: 'Steam Bath for One', priceEtb: 1800, duration: 'About 1 h 15 min' },
      { name: 'Sauna & Steam Bath for One', priceEtb: 2500, duration: 'About 1 h 30 min' },
      { name: 'Steam Bath for Couple', priceEtb: 2200, duration: 'About 1 h 30 min' },
      { name: 'Sauna & Steam Bath for Couple', priceEtb: 2500, duration: 'About 1 h 30 min' },
    ],
  },
  {
    slug: 'facials',
    title: 'Facials',
    tagline: 'Diamond-tip microdermabrasion to clear and refresh the skin.',
    imageUrl: '/images/brand/facials.jpg',
    altText: 'A clay facial mask being applied at a spa',
    items: [{ name: 'Microdermabrasion Facial', priceEtb: 2800, duration: 'About 40-50 min' }],
  },
  {
    slug: 'other',
    title: 'Other',
    tagline: 'A generator fee for treatments that need power kept on.',
    imageUrl: '/images/homepage/lounge.jpg',
    altText: 'Interior at Bless Day Spa',
    items: [{ name: 'Generator (per person, for two)', priceEtb: 800, duration: 'About 1 h 15 min' }],
  },
]

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    console.log('Skipping admin seed: set ADMIN_EMAIL and ADMIN_PASSWORD to create the first login.')
    return
  }
  const existing = await prisma.adminUser.findUnique({ where: { email } })
  if (existing) {
    console.log(`Admin user ${email} already exists, skipping.`)
    return
  }
  const passwordHash = await bcrypt.hash(password, 12)
  await prisma.adminUser.create({ data: { email, passwordHash, role: 'owner' } })
  console.log(`Created admin user ${email}. Log in at /admin/login, then change the password.`)
}

async function seedMenu() {
  const existingCount = await prisma.menuCategory.count()
  if (existingCount > 0) {
    console.log('Menu categories already exist, skipping menu import.')
    return
  }
  for (const [index, category] of menuCategories.entries()) {
    await prisma.menuCategory.create({
      data: {
        slug: category.slug,
        title: category.title,
        tagline: category.tagline,
        imageUrl: category.imageUrl,
        altText: category.altText,
        sortOrder: index,
        items: {
          create: category.items.map((item, itemIndex) => ({
            name: item.name,
            priceEtb: item.priceEtb ?? null,
            duration: item.duration ?? null,
            note: item.note ?? null,
            sortOrder: itemIndex,
          })),
        },
      },
    })
  }
  console.log(`Imported ${menuCategories.length} menu categories.`)
}

async function main() {
  await seedAdmin()
  await seedMenu()
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
