import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from './Button'
import { business } from '../../content/business'

// A persistent phone-only booking action, the highest-leverage "feels
// premium and converts" pattern this class of site almost always has.
// Appears once the visitor scrolls past the hero's own CTAs so it never
// competes with them, and hides on the Book page itself (redundant there).
export const MobileBookBar = () => {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === '/book') return null

  return (
    <div className={`mobile-book-bar ${visible ? 'is-visible' : ''}`}>
      <Button href={business.messengerUrl} variant="secondary" className="mobile-book-bar__message">
        Message
      </Button>
      <Button to="/book" variant="primary" arrow="down-right" className="mobile-book-bar__cta">
        Book Appointment
      </Button>
    </div>
  )
}
