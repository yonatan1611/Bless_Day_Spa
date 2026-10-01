import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'

// Adapted from React Bits' CardNav (reactbits.dev) — a bar that expands
// downward into a row of colored cards, each holding a group of links.
// Swapped the original's react-icons dependency for lucide-react (already
// used elsewhere on the site). Used in the Footer as an expandable
// "explore" trigger instead of a plain link list.
export type CardNavLink = { label: string; to: string; external?: boolean }
export type CardNavGroup = { label: string; bgColor: string; textColor: string; links: CardNavLink[] }

type CardNavProps = { items: CardNavGroup[]; triggerLabel?: string }

export const CardNav = ({ items, triggerLabel = 'Explore' }: CardNavProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const calculateHeight = () => {
    const content = navRef.current?.querySelector<HTMLElement>('.card-nav__content')
    if (!content) return 64
    return 64 + content.scrollHeight + 16
  }

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return
    gsap.set(nav, { height: 64, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 30, opacity: 0 })
    const tl = gsap.timeline({ paused: true })
    tl.to(nav, { height: calculateHeight, duration: 0.4, ease: 'power3.out' })
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, '-=0.15')
    tlRef.current = tl
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const toggle = () => {
    const tl = tlRef.current
    if (!tl) return
    if (!isExpanded) {
      setIsExpanded(true)
      tl.play(0)
    } else {
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  return (
    <div className="card-nav" ref={navRef}>
      <button type="button" className="card-nav__trigger" onClick={toggle} aria-expanded={isExpanded}>
        <span>{triggerLabel}</span>
        <span className={`card-nav__chevron ${isExpanded ? 'is-open' : ''}`} aria-hidden="true">↓</span>
      </button>

      <div className="card-nav__content" aria-hidden={!isExpanded}>
        {items.map((group, index) => (
          <div
            key={group.label}
            ref={(el) => { cardsRef.current[index] = el }}
            className="card-nav__card"
            style={{ backgroundColor: group.bgColor, color: group.textColor }}
          >
            <div className="card-nav__card-label">{group.label}</div>
            <div className="card-nav__card-links">
              {group.links.map((link) =>
                link.external ? (
                  <a key={link.label} className="card-nav__card-link" href={link.to} target="_blank" rel="noreferrer">
                    <ArrowUpRight className="card-nav__card-link-icon" aria-hidden="true" size={14} />
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} className="card-nav__card-link" to={link.to}>
                    <ArrowUpRight className="card-nav__card-link-icon" aria-hidden="true" size={14} />
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
