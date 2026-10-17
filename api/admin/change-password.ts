import type { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs'
import { prisma } from '../_lib/prisma.js'
import { assertSameOrigin, requireAdmin } from '../_lib/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!assertSameOrigin(req, res)) return
  const session = await requireAdmin(req, res)
  if (!session) return

  const { currentPassword, newPassword } = (req.body ?? {}) as { currentPassword?: string; newPassword?: string }
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters.' })
  }

  const admin = await prisma.adminUser.findUnique({ where: { id: session.id } })
  if (!admin) return res.status(401).json({ error: 'Not authenticated.' })
  if (!(await bcrypt.compare(currentPassword, admin.passwordHash))) {
    return res.status(400).json({ error: 'Current password is incorrect.' })
  }

  const passwordHash = await bcrypt.hash(newPassword, 12)
  await prisma.adminUser.update({ where: { id: admin.id }, data: { passwordHash } })
  res.status(200).json({ ok: true })
}
