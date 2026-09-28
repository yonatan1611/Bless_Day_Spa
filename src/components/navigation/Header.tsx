import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { PageContainer } from '../layout/Primitives'

const navigation = [
  { label: 'Treatments', to: '/treatments' },
  { label: 'Packages', to: '/packages' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

const SCROLL_THRESHOLD = 72

// Routes whose top section is full-bleed hero imagery — the header sits
// transparent over these until the visitor scrolls, then turns solid.
const heroRoutes = new Set(['/'])

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const overHero = heroRoutes.has(location.pathname)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen)
    return () => document.body.classList.remove('nav-open')
  }, [isOpen])

  const transparent = overHero && !isScrolled && !isOpen

  return (
    <header
      className={`header ${transparent ? 'header--transparent' : 'header--solid'} ${isScrolled ? 'header--scrolled' : ''}`}
    >
      <PageContainer className="header__row">
        <Link to="/" className="header__brand" aria-label="Bless Day Spa home">
          <img src="/images/brand/bless-mark.png" alt="" aria-hidden="true" className="header__brand-mark" />
          <span className="header__brand-name">Bless Day Spa</span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <Button to="/book" variant="primary" className="header__cta">Book Appointment</Button>
          <button
            ref={toggleRef}
            type="button"
            className="header__menu-toggle"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            <span className={`header__menu-icon ${isOpen ? 'header__menu-icon--open' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </PageContainer>

      <div id="mobile-navigation" className={`header__mobile ${isOpen ? 'header__mobile--open' : ''}`} aria-hidden={!isOpen}>
        <nav className="header__mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to} className="header__mobile-link" tabIndex={isOpen ? 0 : -1}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button to="/book" variant="primary" className="header__mobile-cta" tabIndex={isOpen ? 0 : -1}>
          Book Appointment
        </Button>
      </div>
    </header>
  )
}
