// Temporary editorial image set for layout demonstration only.
// Replace every URL with approved Bless Day Spa photography before launch.
const unsplash = (id: string, width: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`

export const demoImages = {
  hero: unsplash('photo-1540555700478-4be289fbecef', 1800),
  massage: unsplash('photo-1544161515-4ab6ce6db874', 1400),
  bath: unsplash('photo-1600334089648-b0d9d3028eb2', 1400),
  steam: unsplash('photo-1506126613408-eca07ce6fb8c', 1400),
  salon: unsplash('photo-1522337360788-8b13dee7a37e', 1400),
  detail: unsplash('photo-1519823551278-64ac92734fb1', 1200),
  interior: unsplash('photo-1600334089648-b0d9d3028eb2', 1600),
} as const
