// Homepage editorial image collection — localized under public/images/homepage/
// so the homepage never depends on a remote host. All images are real Bless
// Day Spa photography, cropped from the business's own treatment-flyer and
// interior photos (source-photos/business-photos) with price/text overlays
// removed, graded to match the site's warm, moody editorial tone. hero is the
// sunlit triple-bed treatment lounge, rose petals resting on the linens.
// hairSalon and nailCare images were removed along with those discontinued
// services — see docs/research.md.
export const homepageImages = {
  hero: '/images/homepage/lounge.jpg',
  brandStory: '/images/homepage/brand-story.jpg',
  // The gold-and-black "BLESS DAY SPA" wall sign, supplied directly by the
  // business (source-photos/business-photos/Luxury BLESS Day Spa Sign.png).
  // Used as the darkened backdrop behind the Brand Statement section.
  brandSign: '/images/homepage/brand-sign.jpg',
  massage: '/images/homepage/massage.jpg',
  moroccanBath: '/images/homepage/moroccan-bath.jpg',
  steamSauna: '/images/homepage/steam-sauna.jpg',
  // facials has no business photography — licensed stock photography instead
  // (Unsplash License, downloaded into the project).
  facials: '/images/homepage/facials.jpg',
  galleryLarge: '/images/homepage/gallery-large.jpg',
  galleryLeaf: '/images/homepage/gallery-leaf.jpg',
  galleryWater: '/images/homepage/gallery-water.jpg',
} as const

// Treatments-experience image collection — localized under
// public/images/treatments/. massage/moroccanBath/steamSauna/landingHero/
// detailTexture are real Bless Day Spa photography (a different crop/angle
// from the homepage set so /treatments keeps its own visual personality).
// facials has no business photography — see the sourcing note on
// homepageImages.facials above; it reuses the same downloaded stock photo
// rather than a second crop. hairSalon and nailCare were removed along with
// those discontinued services — see docs/research.md.
export const treatmentImages = {
  landingHero: '/images/treatments/landing-hero.jpg',
  massage: '/images/treatments/massage.jpg',
  moroccanBath: '/images/treatments/moroccan-bath.jpg',
  steamSauna: '/images/treatments/steam-sauna.jpg',
  facials: '/images/treatments/facials.jpg',
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
// a chandelier-and-sofa lounge nook (captioned neutrally on the Gallery page
// since hair salon services have since been discontinued — see
// docs/research.md).
export const galleryImages = {
  corridor: '/images/gallery/corridor.jpg',
  skincare: '/images/gallery/skincare.jpg',
  fabric: '/images/gallery/fabric.jpg',
  salonCorner: '/images/gallery/salon-corner.jpg',
  sandstone: '/images/gallery/sandstone.jpg',
  roseDetail: '/images/gallery/rose-detail.jpg',
  towel: '/images/gallery/towel.jpg',
} as const

// Menu category images — localized under public/images/brand/. massage is
// cropped from Bless Day Spa's own treatment-flyer photography (price/text
// overlays removed) — see the sourcing note in content/menu.ts. facials is
// the same licensed stock photo as homepageImages/treatmentImages above: the
// flyer photo formerly used for facials was actually an organic-sugaring
// (hair & beauty) photo, not a facial, so it was retired rather than left
// mislabeled. hairAndBeauty and nailCare were removed along with those
// discontinued services — see docs/research.md.
export const menuImages = {
  massage: '/images/brand/massage.jpg',
  facials: '/images/brand/facials.jpg',
} as const

// Single supporting image for the Reviews page — a lounge corner (real
// Bless Day Spa photography).
export const reviewsImage = '/images/reviews/nook.jpg'

// Service slugs whose homepageImages/treatmentImages entries are a stand-in
// rather than a photo of that specific treatment — components read this to
// decide whether to show the "demo" disclosure and placeholder-style alt
// text for a given service image. Empty — facials uses properly licensed
// stock photography that actually depicts the treatment (see the sourcing
// notes above).
export const demoServiceSlugs = new Set<string>([])
