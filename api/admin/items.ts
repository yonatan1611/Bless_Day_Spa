import type { VercelRequest, VercelResponse } from '@vercel/node'
import { prisma } from '../_lib/prisma.js'
import { assertSameOrigin, requireAdmin } from '../_lib/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const session = await requireAdmin(req, res)
  if (!session) return
  if (!assertSameOrigin(req, res)) return

  const { categoryId, name, priceEtb, duration, note } = (req.body ?? {}) as {
    categoryId?: string
    name?: string
    priceEtb?: number | null
    duration?: string | null
    note?: string | null
  }
  if (!categoryId || !name?.trim()) {
    return res.status(400).json({ error: 'Category and name are required.' })
  }
  if (priceEtb != null && (typeof priceEtb !== 'number' || priceEtb < 0)) {
    return res.status(400).json({ error: 'Price must be a positive number.' })
  }

  const category = await prisma.menuCategory.findUnique({ where: { id: categoryId } })
  if (!category) return res.status(404).json({ error: 'Category not found.' })

  const maxSort = await prisma.menuItem.aggregate({
    where: { categoryId },
    _max: { sortOrder: true },
  })

  const item = await prisma.menuItem.create({
    data: {
      categoryId,
      name: name.trim(),
      priceEtb: priceEtb ?? null,
      duration: duration?.trim() || null,
      note: note?.trim() || null,
      sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
    },
  })
  res.status(201).json({ item })
}
