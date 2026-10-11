import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Prisma } from '@prisma/client'
import { prisma } from '../../_lib/prisma'
import { assertSameOrigin, requireAdmin } from '../../_lib/auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = await requireAdmin(req, res)
  if (!session) return
  if (!assertSameOrigin(req, res)) return

  const id = req.query.id
  if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid id.' })

  if (req.method === 'PATCH') {
    const body = (req.body ?? {}) as Record<string, unknown>
    const data: Prisma.MenuItemUpdateInput = {}
    if (typeof body.name === 'string') data.name = body.name.trim()
    if (body.priceEtb === null) data.priceEtb = null
    else if (typeof body.priceEtb === 'number') {
      if (body.priceEtb < 0) return res.status(400).json({ error: 'Price must be a positive number.' })
      data.priceEtb = body.priceEtb
    }
    if (typeof body.duration === 'string') data.duration = body.duration.trim() || null
    if (body.duration === null) data.duration = null
    if (typeof body.note === 'string') data.note = body.note.trim() || null
    if (body.note === null) data.note = null
    if (typeof body.sortOrder === 'number') data.sortOrder = body.sortOrder
    if (typeof body.isActive === 'boolean') data.isActive = body.isActive

    try {
      const item = await prisma.menuItem.update({ where: { id }, data })
      return res.status(200).json({ item })
    } catch {
      return res.status(404).json({ error: 'Item not found.' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.menuItem.delete({ where: { id } })
      return res.status(200).json({ ok: true })
    } catch {
      return res.status(404).json({ error: 'Item not found.' })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
