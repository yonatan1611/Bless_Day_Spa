// Lets `npm run dev` serve api/*.ts directly, without the Vercel CLI.
// Resolves a request path to its api/ file the same way Vercel's own file
// routing would (literal match first, [param].ts as a fallback for a
// dynamic segment), loads it through Vite's SSR pipeline (so the same
// TypeScript source Vercel deploys runs here unmodified), and adapts the
// plain Node request/response into the shape @vercel/node's handlers
// expect (req.query/cookies/body, res.status().json()). Also supports the
// Edge-runtime Request/Response signature by checking the module's
// exported `config.runtime`.
import { existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin, ViteDevServer } from 'vite'

const API_ROOT = path.resolve(import.meta.dirname, 'api')

type ResolvedApi = { file: string; params: Record<string, string> }

const resolveApiFile = (urlPath: string): ResolvedApi | null => {
  const segments = urlPath.split('/').filter(Boolean)
  if (segments.length === 0 || segments[0].startsWith('_')) return null

  let dir = API_ROOT
  const params: Record<string, string> = {}

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment.startsWith('_')) return null
    const isLast = i === segments.length - 1

    if (isLast) {
      const literalFile = path.join(dir, `${segment}.ts`)
      if (existsSync(literalFile)) return { file: literalFile, params }
      if (!existsSync(dir) || !statSync(dir).isDirectory()) return null
      const dynamic = readdirSync(dir).find((entry) => /^\[.+\]\.ts$/.test(entry))
      if (!dynamic) return null
      const paramName = dynamic.slice(1, dynamic.length - '].ts'.length)
      params[paramName] = segment
      return { file: path.join(dir, dynamic), params }
    }

    const nextDir = path.join(dir, segment)
    if (!existsSync(nextDir) || !statSync(nextDir).isDirectory()) return null
    dir = nextDir
  }
  return null
}

const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })

const parseCookies = (header?: string): Record<string, string> => {
  const out: Record<string, string> = {}
  if (!header) return out
  for (const part of header.split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    const key = part.slice(0, idx).trim()
    if (!key) continue
    out[key] = decodeURIComponent(part.slice(idx + 1).trim())
  }
  return out
}

type NodeHandler = (req: unknown, res: unknown) => unknown

const callNodeHandler = async (
  handler: NodeHandler,
  req: IncomingMessage,
  res: ServerResponse,
  params: Record<string, string>,
) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  const query: Record<string, string> = { ...params }
  url.searchParams.forEach((value, key) => { query[key] = value })

  let body: unknown
  if (req.method && req.method !== 'GET' && req.method !== 'HEAD') {
    const raw = await readBody(req)
    const contentType = req.headers['content-type'] ?? ''
    if (raw && contentType.includes('application/json')) {
      try { body = JSON.parse(raw) } catch { body = undefined }
    }
  }

  const vercelReq = Object.assign(req, { query, cookies: parseCookies(req.headers.cookie), body })
  const vercelRes = Object.assign(res, {
    status(code: number) {
      res.statusCode = code
      return vercelRes
    },
    json(payload: unknown) {
      if (!res.getHeader('Content-Type')) res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(payload))
      return vercelRes
    },
    send(payload: unknown) {
      res.end(payload as never)
      return vercelRes
    },
  })

  await handler(vercelReq, vercelRes)
}

const callEdgeHandler = async (
  handler: (request: Request) => Response | Promise<Response>,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') headers.set(key, value)
    else if (Array.isArray(value)) headers.set(key, value.join(', '))
  }
  const hasBody = req.method && req.method !== 'GET' && req.method !== 'HEAD'
  const request = new Request(url, { method: req.method, headers, body: hasBody ? await readBody(req) : undefined })

  const response = await handler(request)
  res.statusCode = response.status
  response.headers.forEach((value, key) => res.setHeader(key, value))
  res.end(await response.text())
}

export const devApiPlugin = (): Plugin => ({
  name: 'local-dev-api',
  apply: 'serve',
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith('/api/')) return next()
      const pathname = new URL(req.url, 'http://localhost').pathname.slice('/api'.length)
      const resolved = resolveApiFile(pathname)
      if (!resolved) return next()

      try {
        const mod = await server.ssrLoadModule(resolved.file)
        const handler = mod.default as NodeHandler | ((request: Request) => Response | Promise<Response>)
        if (!handler) throw new Error(`${resolved.file} has no default export.`)

        const isEdge = (mod as { config?: { runtime?: string } }).config?.runtime === 'edge'
        if (isEdge) {
          await callEdgeHandler(handler as (request: Request) => Response | Promise<Response>, req, res)
        } else {
          await callNodeHandler(handler as NodeHandler, req, res, resolved.params)
        }
      } catch (error) {
        server.ssrFixStacktrace(error as Error)
        console.error(`[local-dev-api] ${req.url}:`, error)
        if (!res.headersSent) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Internal server error (see terminal).' }))
        }
      }
    })
  },
})
