import type { VercelRequest, VercelResponse } from '@vercel/node'
import { clearSessionCookie } from '../_lib/auth.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  res.setHeader('Set-Cookie', clearSessionCookie())
  res.status(200).json({ ok: true })
}
