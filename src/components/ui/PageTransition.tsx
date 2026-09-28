import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

// Keying on pathname forces a remount on route change, which restarts the
// CSS fade-in below. No exit animation (that needs a library to sequence
// against the router) — a clean enter-fade is enough to soften the cut
// between pages. prefers-reduced-motion is handled globally in global.css.
export const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  )
}
