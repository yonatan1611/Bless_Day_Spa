import { useState } from 'react'
import { MenuButton } from './MenuButton'
import { Wordmark } from './Wordmark'

const navigation = [
  { label: 'Services', href: '#/services' },
  { label: 'About', href: '#/about' },
  { label: 'Gallery', href: '#/gallery' },
  { label: 'Visit', href: '#/contact' },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <header className="site-header">
      <Wordmark />
      <MenuButton expanded={isOpen} onClick={() => setIsOpen((current) => !current)} />
      <nav id="main-navigation" className={isOpen ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={close}>{item.label}</a>)}
        <a className="nav__cta" href="#/contact?book=1" onClick={close}>Book an appointment</a>
      </nav>
    </header>
  )
}
