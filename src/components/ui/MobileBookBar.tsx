import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from './Button'
import { business } from '../../content/business'

// A persistent phone-only booking action, the highest-leverage "feels
// premium and converts" pattern this class of site almost always has.
// Appears once the visitor scrolls past the hero's own CTAs so it never
// competes with them, and hides on the Book page itself (redundant there).
// Driven by an IntersectionObserver watching a sentinel fixed 360px down
// the document, not a raw scroll listener, so visibility doesn't trigger a
// React re-render on every scroll frame.
export const MobileBookBar = () => {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  if (pathname === '/book') return null

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="mobile-book-bar__sentinel" />
      <div className={`mobile-book-bar ${visible ? 'is-visible' : ''}`}>
        <Button href={business.messengerUrl} variant="secondary" className="mobile-book-bar__message">
          Message
        </Button>
        <Button to="/book" variant="primary" arrow="down-right" className="mobile-book-bar__cta">
          Book Appointment
        </Button>
      </div>
    </>
  )
}
