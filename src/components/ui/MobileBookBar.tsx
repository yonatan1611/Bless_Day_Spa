import { useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { business } from '../../content/business'

// A persistent phone-only contact action, the highest-leverage "feels
// premium and converts" pattern this class of site almost always has.
// Appears once the visitor scrolls past the hero's own CTAs so it never
// competes with them. Driven by an IntersectionObserver watching a
// sentinel fixed 360px down the document, not a raw scroll listener, so
// visibility doesn't trigger a React re-render on every scroll frame.
export const MobileBookBar = () => {
  const [visible, setVisible] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="mobile-book-bar__sentinel" />
      <div className={`mobile-book-bar ${visible ? 'is-visible' : ''}`}>
        <Button href={`tel:${business.phone}`} variant="secondary" className="mobile-book-bar__message">
          Call
        </Button>
        <Button href={business.whatsappUrl} variant="primary" arrow="down-right" className="mobile-book-bar__cta">
          Message on WhatsApp
        </Button>
      </div>
    </>
  )
}
