import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { devApiPlugin } from './vite-dev-api.ts'

export default defineConfig(({ mode }) => {
  // api/*.ts (loaded directly by devApiPlugin, not bundled) reads these via
  // process.env, same as it would in a real Vercel Function — Vite only
  // auto-loads .env.local into import.meta.env for client code, so the dev
  // server's own process needs it explicitly.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
  }
})
