import type { VercelRequest, VercelResponse } from '@vercel/node'
import { prisma } from '../_lib/prisma'
import { assertSameOrigin, requireAdmin } from '../_lib/auth'

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = await requireAdmin(req, res)
  if (!session) return

  if (req.method === 'GET') {
    const categories = await prisma.menuCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { items: { orderBy: { sortOrder: 'asc' } } },
    })
    return res.status(200).json({ categories })
  }

  if (req.method === 'POST') {
    if (!assertSameOrigin(req, res)) return
    const { title, tagline, imageUrl, altText, slug } = (req.body ?? {}) as Record<string, string | undefined>
    if (!title?.trim() || !tagline?.trim() || !imageUrl?.trim()) {
      return res.status(400).json({ error: 'Title, tagline, and photo are required.' })
    }
    const finalSlug = slugify(slug || title)
    if (!finalSlug) return res.status(400).json({ error: 'Could not derive a URL slug from that title.' })

    const existing = await prisma.menuCategory.findUnique({ where: { slug: finalSlug } })
    if (existing) return res.status(409).json({ error: 'A category with that name already exists.' })

    const maxSort = await prisma.menuCategory.aggregate({ _max: { sortOrder: true } })
    const category = await prisma.menuCategory.create({
      data: {
        slug: finalSlug,
        title: title.trim(),
        tagline: tagline.trim(),
        imageUrl: imageUrl.trim(),
        altText: altText?.trim() || title.trim(),
        sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
      },
      include: { items: true },
    })
    return res.status(201).json({ category })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
