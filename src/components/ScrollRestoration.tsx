import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to top on route change, or to an in-page anchor when the URL includes a hash. */
export const ScrollRestoration = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = hash.slice(1)
    const immediate = document.getElementById(id)
    if (immediate) {
      immediate.scrollIntoView()
      return
    }

    // The route change triggers an AnimatePresence exit/enter transition
    // (see PageTransition), so the target page — and its anchor — may not
    // exist in the DOM yet. Poll briefly rather than giving up immediately.
    // Once found, jump instantly (not the global smooth scroll-behavior):
    // the page is still mid-entrance-animation at this point, and an
    // animated scroll racing a layout that's still settling can end up
    // stalled or landing short, which is exactly what smooth did here.
    let cancelled = false
    let attempts = 0
    const maxAttempts = 20
    const poll = () => {
      if (cancelled) return
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
        return
      }
      attempts += 1
      if (attempts < maxAttempts) {
        window.setTimeout(poll, 50)
      } else {
        window.scrollTo(0, 0)
      }
    }
    const timer = window.setTimeout(poll, 50)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}
