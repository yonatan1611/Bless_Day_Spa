import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Prisma } from '@prisma/client'
import { prisma } from '../../_lib/prisma.js'
import { assertSameOrigin, requireAdmin } from '../../_lib/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = await requireAdmin(req, res)
  if (!session) return
  if (!assertSameOrigin(req, res)) return

  const id = req.query.id
  if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid id.' })

  if (req.method === 'PATCH') {
    const body = (req.body ?? {}) as Record<string, unknown>
    const data: Prisma.MenuCategoryUpdateInput = {}
    if (typeof body.title === 'string') data.title = body.title.trim()
    if (typeof body.tagline === 'string') data.tagline = body.tagline.trim()
    if (typeof body.imageUrl === 'string') data.imageUrl = body.imageUrl.trim()
    if (typeof body.altText === 'string') data.altText = body.altText.trim()
    if (typeof body.sortOrder === 'number') data.sortOrder = body.sortOrder
    if (typeof body.isActive === 'boolean') data.isActive = body.isActive

    try {
      const category = await prisma.menuCategory.update({
        where: { id },
        data,
        include: { items: { orderBy: { sortOrder: 'asc' } } },
      })
      return res.status(200).json({ category })
    } catch {
      return res.status(404).json({ error: 'Category not found.' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.menuCategory.delete({ where: { id } })
      return res.status(200).json({ ok: true })
    } catch {
      return res.status(404).json({ error: 'Category not found.' })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
