import type { VercelRequest, VercelResponse } from '@vercel/node'
import { prisma } from '../_lib/prisma'
import { requireAdmin } from '../_lib/auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const session = await requireAdmin(req, res)
  if (!session) return

  const admin = await prisma.adminUser.findUnique({ where: { id: session.id } })
  if (!admin) return res.status(401).json({ error: 'Not authenticated.' })
  res.status(200).json({ id: admin.id, email: admin.email, name: admin.name, role: admin.role })
}
