// Homepage editorial image collection — localized under public/images/homepage/
// so the homepage never depends on a remote host. All images are real Bless
// Day Spa photography, cropped from the business's current interior photos
// (source-photos/business-photos) — the owner's own lighting-corrected
// edits of the October 2026 photo shoot, just cropped/resized here, not
// re-graded. hero is a twin-bed treatment room with warm wall sconces and a
// wood-paneled door, shown close to full-frame (not pre-cropped tight) so
// object-fit: cover doesn't zoom in on wide viewports — the rooms shown in
// the previous photo set (an orange-curtained triple-bed lounge) were
// renovated and no longer exist, so this set replaces them with the
// business's newest photography. hairSalon and nailCare images were removed
// along with those discontinued services — see docs/research.md. brandSign
// is intentionally untouched by that refresh — see the note below.
export const homepageImages = {
  hero: '/images/homepage/lounge.jpg',
  brandStory: '/images/homepage/brand-story.jpg',
  // The gold-and-black "BLESS DAY SPA" wall sign, supplied directly by the
  // business (source-photos/business-photos/Luxury BLESS Day Spa Sign.png).
  // Used as the darkened backdrop behind the Brand Statement section. Left
  // as-is during the October 2026 photo refresh at the owner's request.
  brandSign: '/images/homepage/brand-sign.jpg',
  // massage/moroccanBath/steamSauna are cropped portrait (~4:5), not
  // landscape: every component that displays them (TreatmentExplorer's
  // panel, BlessExperience, TreatmentMenu) sizes its image box as a tall
  // portrait, so a landscape source was getting cover-cropped down to a
  // fraction of its width — badly over-zoomed. Keep these portrait.
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
// public/images/treatments/. landingHero/massage/moroccanBath/steamSauna/
// detailTexture are real Bless Day Spa photography (a different crop/angle
// from the homepage set so /treatments keeps its own visual personality).
// landingHero is cropped from source-photos/business-photos/bless12.jpg (the
// twin-bed attic room with the stained-glass window) at the owner's request
// — their favorite shot from the October 2026 refresh. The media box is a
// 4:5 portrait (.treatments-hero__media in global.css), which only has room
// for the window and the near bed — the far bed falls outside this crop.
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
// hallway is the real Bless Day Spa entrance (front door, stone pillar, and
// garden). curtain and towels are real material/detail crops from the
// current treatment rooms (a treatment-room curtain, rolled towels with rose
// petals). woodGrain is a flooring detail kept from the previous photo set —
// it wasn't swapped because none of the new photography gives a clean,
// well-lit floor texture to replace it with, and the flooring itself hasn't
// changed.
export const aboutImages = {
  curtain: '/images/about/curtain.jpg',
  towels: '/images/about/towels.jpg',
  woodGrain: '/images/about/wood-grain.jpg',
  hallway: '/images/about/hallway.jpg',
} as const

// Gallery image collection — localized under public/images/gallery/.
// A deliberately varied set of textures, materials, and quiet details for
// an editorial masonry, distinct from every other page's collection.
// All images are real Bless Day Spa photography: skincare and towel are a
// deep tissue massage detail and a hot stone massage close-up (stock,
// unchanged); fabric is a twin-bed treatment room; sandstone is pale
// terrazzo tile in the steam/wet room; corridor is the marble staircase;
// rose-detail is a pair of treatment beds with roses and rolled towels;
// salon-corner is a chandelier-and-sofa lounge nook (captioned neutrally on
// the Gallery page since hair salon services have since been discontinued —
// see docs/research.md).
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
// cropped from Bless Day Spa's current treatment-room photography — see the
// sourcing note in content/menu.ts. facials is the same licensed stock photo
// as homepageImages/treatmentImages above: the flyer photo formerly used for
// facials was actually an organic-sugaring (hair & beauty) photo, not a
// facial, so it was retired rather than left mislabeled. hairAndBeauty and
// nailCare were removed along with those discontinued services — see
// docs/research.md.
export const menuImages = {
  massage: '/images/brand/massage.jpg',
  facials: '/images/brand/facials.jpg',
} as const

// Single supporting image for the Reviews page — the reception desk and
// entrance (real Bless Day Spa photography, source-photos/business-photos/
// bless15.jpg). The wall-mounted "BLESS DAY SPA" leaf mark came out of the
// owner's AI photo edit visibly malformed (asymmetric, wrong blade count),
// so it's digitally replaced here with the real mark from brand/bless-mark
// .png, re-tinted and shadowed to match the sign's lighting, rather than
// left broken or the whole photo discarded.
export const reviewsImage = '/images/reviews/nook.jpg'

// Service slugs whose homepageImages/treatmentImages entries are a stand-in
// rather than a photo of that specific treatment — components read this to
// decide whether to show the "demo" disclosure and placeholder-style alt
// text for a given service image. Empty — facials uses properly licensed
// stock photography that actually depicts the treatment (see the sourcing
// notes above).
export const demoServiceSlugs = new Set<string>([])
