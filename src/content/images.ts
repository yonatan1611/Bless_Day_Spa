// Homepage editorial image collection — localized under public/images/homepage/
// so the homepage never depends on a remote host. massage, moroccanBath,
// steamSauna, hairSalon, galleryLarge, galleryLeaf, and galleryWater are real
// Bless Day Spa photography (graded to match the site's warm, moody editorial
// tone); the rest are still placeholder/demo photography (not licensed Bless
// Day Spa imagery) — see demoServiceSlugs below for which service slugs
// still need real photos. Source for the remaining placeholders: royalty-free
// Unsplash photography, downloaded into the project rather than hot-linked.
export const homepageImages = {
  hero: '/images/homepage/hero.jpg',
  brandStory: '/images/homepage/brand-story.jpg',
  massage: '/images/homepage/massage.jpg',
  moroccanBath: '/images/homepage/moroccan-bath.jpg',
  steamSauna: '/images/homepage/steam-sauna.jpg',
  hairSalon: '/images/homepage/hair-salon.jpg',
  galleryLarge: '/images/homepage/gallery-large.jpg',
  galleryLeaf: '/images/homepage/gallery-leaf.jpg',
  galleryWater: '/images/homepage/gallery-water.jpg',
} as const

// Treatments-experience image collection — localized under
// public/images/treatments/. landingHero, massage, moroccanBath, steamSauna,
// and hairSalon are real Bless Day Spa photography (a different crop/angle
// from the homepage set so /treatments keeps its own visual personality).
// detailTexture is still placeholder photography — see demoServiceSlugs.
export const treatmentImages = {
  landingHero: '/images/treatments/landing-hero.jpg',
  massage: '/images/treatments/massage.jpg',
  moroccanBath: '/images/treatments/moroccan-bath.jpg',
  steamSauna: '/images/treatments/steam-sauna.jpg',
  hairSalon: '/images/treatments/hair-salon.jpg',
  detailTexture: '/images/treatments/detail-texture.jpg',
} as const

// About-page image collection — localized under public/images/about/.
// hallway is the real Bless Day Spa building exterior/entrance in Wollo
// Sefer. curtain, towels, and woodGrain are still placeholder architecture
// and material detail — this page is about atmosphere, not a specific
// service.
export const aboutImages = {
  curtain: '/images/about/curtain.jpg',
  towels: '/images/about/towels.jpg',
  woodGrain: '/images/about/wood-grain.jpg',
  hallway: '/images/about/hallway.jpg',
} as const

// Gallery image collection — localized under public/images/gallery/.
// A deliberately varied set of textures, materials, and quiet details for
// an editorial masonry, distinct from every other page's collection.
// skincare, fabric, and towel are real Bless Day Spa photography (a deep
// tissue massage detail, a floor-mattress treatment room, and a hot stone
// massage close-up); stoneTexture, chair, sandstone, and clothHook are still
// placeholder photography.
export const galleryImages = {
  stoneTexture: '/images/gallery/stone-texture.jpg',
  skincare: '/images/gallery/skincare.jpg',
  fabric: '/images/gallery/fabric.jpg',
  chair: '/images/gallery/chair.jpg',
  sandstone: '/images/gallery/sandstone.jpg',
  clothHook: '/images/gallery/cloth-hook.jpg',
  towel: '/images/gallery/towel.jpg',
} as const

// Menu category images — localized under public/images/brand/. Royalty-free
// stock photography (Unsplash License, downloaded into the project rather
// than hot-linked), graded to match the site's editorial tone. Used where no
// sharp, text-free Bless Day Spa photo of that room/treatment exists yet —
// see the sourcing note in content/menu.ts.
export const menuImages = {
  massage: '/images/brand/massage.jpg',
  hairAndBeauty: '/images/brand/hair-and-beauty.jpg',
  facials: '/images/brand/facials.jpg',
  nailCare: '/images/brand/nail-care.jpg',
} as const

// Real Bless Day Spa photography for the Packages page's introduction — a
// private treatment room with a lit lattice divider and rose petals.
export const packagesImage = '/images/packages/lounge.jpg'

// Package card images — localized under public/images/packages/. Royalty-free
// stock photography (Unsplash License, downloaded into the project rather
// than hot-linked) — the business's own package flyers used low-resolution
// internet stock photos, so these are sharper replacements rather than crops
// of those flyers. See the sourcing note in content/packages.ts.
export const packageImages = {
  manicurePedicure: '/images/packages/manicure-pedicure.jpg',
  shellacManicure: '/images/packages/shellac-manicure.jpg',
} as const

// Single supporting image for the Reviews page.
export const reviewsImage = '/images/reviews/nook.jpg'

// Service slugs whose homepageImages/treatmentImages entries are still
// placeholder photography. Empty now that all four service categories
// (massage, moroccan-bath, steam-sauna, hair-salon) use real Bless Day Spa
// photos — components read this to decide whether to show the "demo"
// disclosure and placeholder-style alt text for a given service image.
export const demoServiceSlugs = new Set<string>([])
