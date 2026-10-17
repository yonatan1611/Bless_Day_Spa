import type { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs'
import { prisma } from '../_lib/prisma.js'
import { assertSameOrigin, createSessionCookie } from '../_lib/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!assertSameOrigin(req, res)) return

  const { email, password } = (req.body ?? {}) as { email?: string; password?: string }
  if (!email?.trim() || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  let admin
  try {
    admin = await prisma.adminUser.findUnique({ where: { email: email.trim().toLowerCase() } })
  } catch {
    return res.status(500).json({ error: 'The database is not configured yet.' })
  }
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const cookie = await createSessionCookie({ id: admin.id, email: admin.email, role: admin.role })
  res.setHeader('Set-Cookie', cookie)
  res.status(200).json({ id: admin.id, email: admin.email, name: admin.name, role: admin.role })
}
