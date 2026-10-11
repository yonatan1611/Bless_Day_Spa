// Admin session handling, shared by every api/admin/*.ts route. A signed
// JWT in an HttpOnly cookie — no server-side session table, so there's
// nothing to clean up, at the cost of not being able to revoke a session
// before it expires (12h, short enough that this is an acceptable trade for
// a single-business admin tool).
import { jwtVerify, SignJWT } from 'jose'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const COOKIE_NAME = 'admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 12

const getSecret = () => {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET is not configured.')
  return new TextEncoder().encode(secret)
}

// Secure cookies require https — true on every real Vercel deployment
// (VERCEL_ENV is always "development"/"preview"/"production" there), but
// VERCEL_ENV is unset entirely under plain `npm run dev` (no Vercel CLI),
// which serves over http. Only add Secure when we know we're on Vercel.
const isLocal = () => process.env.VERCEL_ENV !== 'preview' && process.env.VERCEL_ENV !== 'production'

export type AdminSession = { id: string; email: string; role: string }

export const createSessionCookie = async (admin: AdminSession): Promise<string> => {
  const token = await new SignJWT({ email: admin.email, role: admin.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(admin.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret())
  const secure = isLocal() ? '' : '; Secure'
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}${secure}`
}

export const clearSessionCookie = (): string => {
  const secure = isLocal() ? '' : '; Secure'
  return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`
}

export const verifySession = async (req: VercelRequest): Promise<AdminSession | null> => {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (typeof payload.sub !== 'string' || typeof payload.email !== 'string' || typeof payload.role !== 'string') {
      return null
    }
    return { id: payload.sub, email: payload.email, role: payload.role }
  } catch {
    return null
  }
}

// Call first in every protected handler. Writes the 401 itself and returns
// null so the caller can just `if (!session) return`.
export const requireAdmin = async (req: VercelRequest, res: VercelResponse): Promise<AdminSession | null> => {
  const session = await verifySession(req)
  if (!session) {
    res.status(401).json({ error: 'Not authenticated.' })
    return null
  }
  return session
}

// Minimal CSRF guard for cookie-authenticated mutations: a same-site fetch
// POST/PATCH/DELETE always carries an Origin header matching our own host;
// a form submitted from another site either omits it or carries a foreign
// one. Call only for mutating methods — GETs legitimately omit Origin.
export const assertSameOrigin = (req: VercelRequest, res: VercelResponse): boolean => {
  const origin = req.headers.origin
  const host = req.headers.host
  if (!origin || !host) {
    res.status(403).json({ error: 'Invalid origin.' })
    return false
  }
  try {
    if (new URL(origin).host === host) return true
  } catch {
    // fall through to the 403 below
  }
  res.status(403).json({ error: 'Invalid origin.' })
  return false
}
