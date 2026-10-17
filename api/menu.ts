// Public menu data, read by src/hooks/useMenu.ts. Shaped exactly like the
// MenuCategory/MenuItem types in src/content/menu.ts (the "image"/"alt"/
// "price" field names, not the DB's "imageUrl"/"altText"/"priceEtb") so the
// client can treat a DB row and the static fallback identically. Falls back
// to that same static content on any DB error — before the database is
// provisioned, or if Neon has an outage — so the public site never breaks.
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { prisma } from './_lib/prisma.js'
import { menuCategories as staticMenuCategories } from '../src/content/menu.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const categories = await prisma.menuCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: { items: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } } },
    })

    if (categories.length === 0) {
      // Nothing seeded yet (DB connected but migrate/seed not run) — same
      // fallback as a DB error, so a half-finished setup doesn't blank the
      // public site.
      throw new Error('No categories in the database yet.')
    }

    const payload = categories.map((category) => ({
      slug: category.slug,
      title: category.title,
      tagline: category.tagline,
      image: category.imageUrl,
      alt: category.altText,
      items: category.items.map((item) => ({
        name: item.name,
        price: item.priceEtb != null ? `${item.priceEtb} ETB` : undefined,
        duration: item.duration ?? undefined,
        note: item.note ?? undefined,
      })),
    }))

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    res.status(200).json({ categories: payload, source: 'database' })
  } catch {
    res.setHeader('Cache-Control', 'public, s-maxage=10')
    res.status(200).json({ categories: staticMenuCategories, source: 'fallback' })
  }
}
