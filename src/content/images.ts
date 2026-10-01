// Homepage editorial image collection — localized under public/images/homepage/
// so the homepage never depends on a remote host. All images are real Bless
// Day Spa photography, cropped from the business's own treatment-flyer and
// interior photos (source-photos/business-photos) with price/text overlays
// removed, graded to match the site's warm, moody editorial tone. hero is the
// sunlit triple-bed treatment lounge, rose petals resting on the linens.
export const homepageImages = {
  hero: '/images/homepage/lounge.jpg',
  brandStory: '/images/homepage/brand-story.jpg',
  massage: '/images/homepage/massage.jpg',
  moroccanBath: '/images/homepage/moroccan-bath.jpg',
  steamSauna: '/images/homepage/steam-sauna.jpg',
  hairSalon: '/images/homepage/hair-salon.jpg',
  // facials and nailCare have no business photography (see the treatmentImages
  // note below) — these are licensed stock photography instead (Unsplash
  // License, downloaded into the project), the same approach already used
  // for packageImages.
  facials: '/images/homepage/facials.jpg',
  nailCare: '/images/homepage/nail-care.jpg',
  galleryLarge: '/images/homepage/gallery-large.jpg',
  galleryLeaf: '/images/homepage/gallery-leaf.jpg',
  galleryWater: '/images/homepage/gallery-water.jpg',
} as const

// Treatments-experience image collection — localized under
// public/images/treatments/. massage/moroccanBath/steamSauna/hairSalon/
// landingHero/detailTexture are real Bless Day Spa photography (a different
// crop/angle from the homepage set so /treatments keeps its own visual
// personality). facials and nailCare have no business photography — see the
// sourcing note on homepageImages.facials/nailCare above; these reuse the
// same downloaded stock photo rather than a second crop, since only one
// source photo exists for each.
export const treatmentImages = {
  landingHero: '/images/treatments/landing-hero.jpg',
  massage: '/images/treatments/massage.jpg',
  moroccanBath: '/images/treatments/moroccan-bath.jpg',
  steamSauna: '/images/treatments/steam-sauna.jpg',
  hairSalon: '/images/treatments/hair-salon.jpg',
  facials: '/images/treatments/facials.jpg',
  nailCare: '/images/treatments/nail-care.jpg',
  detailTexture: '/images/treatments/detail-texture.jpg',
} as const

// About-page image collection — localized under public/images/about/.
// hallway is the real Bless Day Spa building exterior/entrance in Wollo
// Sefer. curtain, towels, and woodGrain are real material/texture detail
// crops from the treatment rooms (curtain fabric, rolled towels with rose
// petals, herringbone parquet floor).
export const aboutImages = {
  curtain: '/images/about/curtain.jpg',
  towels: '/images/about/towels.jpg',
  woodGrain: '/images/about/wood-grain.jpg',
  hallway: '/images/about/hallway.jpg',
} as const

// Gallery image collection — localized under public/images/gallery/.
// A deliberately varied set of textures, materials, and quiet details for
// an editorial masonry, distinct from every other page's collection.
// All images are real Bless Day Spa photography: skincare, fabric, and towel
// are a deep tissue massage detail, a floor-mattress treatment room, and a
// hot stone massage close-up; sandstone is the tan-tile Moroccan bath room;
// corridor is the column between the two treatment lounges; rose-detail is
// the row of treatment beds with roses and rolled towels; salon-corner is
// the hair salon's chandelier-and-sofa nook.
export const galleryImages = {
  corridor: '/images/gallery/corridor.jpg',
  skincare: '/images/gallery/skincare.jpg',
  fabric: '/images/gallery/fabric.jpg',
  salonCorner: '/images/gallery/salon-corner.jpg',
  sandstone: '/images/gallery/sandstone.jpg',
  roseDetail: '/images/gallery/rose-detail.jpg',
  towel: '/images/gallery/towel.jpg',
} as const

// Menu category images — localized under public/images/brand/. massage and
// hairAndBeauty are cropped from Bless Day Spa's own treatment-flyer
// photography (price/text overlays removed) — see the sourcing note in
// content/menu.ts. facials and nailCare are the same licensed stock photos
// as homepageImages/treatmentImages above: the flyer photo formerly used for
// facials was actually the organic-sugaring photo (a hair-and-beauty item),
// not a facial, so it was retired rather than left mislabeled; nailCare's
// flyer photo is retired too, in favor of a photo the spa didn't supply.
export const menuImages = {
  massage: '/images/brand/massage.jpg',
  hairAndBeauty: '/images/brand/hair-and-beauty.jpg',
  facials: '/images/brand/facials.jpg',
  nailCare: '/images/brand/nail-care.jpg',
} as const

// Package card images — localized under public/images/packages/. Royalty-free
// stock photography (Unsplash License, downloaded into the project rather
// than hot-linked) — the business's own package flyers used low-resolution
// internet stock photos, so these are sharper replacements rather than crops
// of those flyers. See the sourcing note in content/packages.ts.
export const packageImages = {
  manicurePedicure: '/images/packages/manicure-pedicure.jpg',
  shellacManicure: '/images/packages/shellac-manicure.jpg',
} as const

// Single supporting image for the Reviews page — a corner of the hair salon
// lounge (real Bless Day Spa photography).
export const reviewsImage = '/images/reviews/nook.jpg'

// Service slugs whose homepageImages/treatmentImages entries are a stand-in
// rather than a photo of that specific treatment — components read this to
// decide whether to show the "demo" disclosure and placeholder-style alt
// text for a given service image. Empty — facials and nailCare now use
// properly licensed stock photography that actually depicts the treatment
// (see the sourcing notes above), the same standard already applied to
// packageImages.
export const demoServiceSlugs = new Set<string>([])
