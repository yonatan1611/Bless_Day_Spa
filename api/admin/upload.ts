// Server-proxied upload rather than Vercel Blob's direct-to-client token
// flow: the admin page downscales the image client-side first (see
// src/lib/adminApi.ts), so it's always well under Vercel's 4.5MB function
// body limit, and a plain JSON body + put() avoids the extra moving parts
// of the client-upload handshake for what's a small, infrequent admin
// action.
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put } from '@vercel/blob'
import { assertSameOrigin, requireAdmin } from '../_lib/auth.js'

const MAX_BYTES = 4 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!assertSameOrigin(req, res)) return
  const session = await requireAdmin(req, res)
  if (!session) return

  const { filename, contentType, dataBase64 } = (req.body ?? {}) as {
    filename?: string
    contentType?: string
    dataBase64?: string
  }
  if (!filename || !contentType || !dataBase64) {
    return res.status(400).json({ error: 'Missing file data.' })
  }
  if (!ALLOWED_TYPES.has(contentType)) {
    return res.status(400).json({ error: 'Only JPEG, PNG, or WebP images are allowed.' })
  }

  const buffer = Buffer.from(dataBase64, 'base64')
  if (buffer.byteLength > MAX_BYTES) {
    return res.status(400).json({ error: 'Image is too large (max 4 MB).' })
  }

  const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, '-')
  try {
    const blob = await put(`menu/${Date.now()}-${safeName}`, buffer, {
      access: 'public',
      contentType,
      addRandomSuffix: true,
    })
    res.status(200).json({ url: blob.url })
  } catch {
    res.status(500).json({ error: 'Image storage is not configured yet.' })
  }
}
