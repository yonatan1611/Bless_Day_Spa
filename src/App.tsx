import { useEffect, useState } from 'react'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { ReviewsPage } from './pages/ReviewsPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import { ServicesPage } from './pages/ServicesPage'

function route() { return window.location.hash.slice(1) || '/' }

export function App() {
  const [path, setPath] = useState(route)
  useEffect(() => { const update = () => setPath(route()); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update) }, [])
  useEffect(() => {
    const section = new URLSearchParams(path.split('?')[1]).get('section')
    requestAnimationFrame(() => section ? document.getElementById(section)?.scrollIntoView() : window.scrollTo(0, 0))
    document.title = 'Bless Day Spa — Addis Ababa'
  }, [path])
  const pathname = path.split('?')[0]
  let page = <HomePage />
  if (pathname === '/services') page = <ServicesPage />
  else if (pathname.startsWith('/services/')) page = <ServiceDetailPage slug={pathname.split('/')[2]} />
  else if (pathname === '/about') page = <AboutPage />
  else if (pathname === '/gallery') page = <GalleryPage />
  else if (pathname === '/reviews') page = <ReviewsPage />
  else if (pathname === '/contact') page = <ContactPage />
  return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader />{page}<SiteFooter /></div>
}
