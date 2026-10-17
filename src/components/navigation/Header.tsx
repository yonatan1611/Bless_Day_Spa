import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'

const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

// Three separate floating glass clusters (brand mark, nav, actions) instead
// of one continuous bar, always the same translucent-plaster treatment so
// it reads over both the dark hero photo and every light page background.
// The actions CTA links to the Contact page (which lays out every contact
// option — WhatsApp, Messenger, phone) rather than jumping straight to
// WhatsApp itself, so it doesn't duplicate the WhatsAppButton fab.
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

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

  return (
    <header className="floating-header">
      <Link to="/" className="floating-header__brand" aria-label="Bless Day Spa home">
        <img src="/images/brand/bless-mark.png" alt="" aria-hidden="true" />
        <span className="floating-header__wordmark">Bless Day Spa</span>
      </Link>

      <nav className="floating-header__nav" aria-label="Main navigation">
        <ul className="site-nav">
          {navigation.map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
            return (
              <li key={item.to}>
                <Link to={item.to} className={`site-nav__link ${isActive ? 'is-active' : ''}`}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="floating-header__actions">
        <Button to="/contact" variant="primary" className="floating-header__cta">Get in Touch</Button>
        <button
          ref={toggleRef}
          type="button"
          className="floating-header__toggle"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            className="floating-header__mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              className="floating-header__mobile-nav"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.to}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link to={item.to} className="floating-header__mobile-link">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} initial="hidden" animate="show" transition={{ delay: 0.4 }}>
              <Button to="/contact" variant="primary" className="floating-header__mobile-cta">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
