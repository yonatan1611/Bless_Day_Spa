import { useEffect, useRef, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

// Adapted from React Bits' ChromaGrid (reactbits.dev) — a grid where a
// large spotlight follows the cursor across the whole grid (fading each
// card toward grayscale outside it) while each individual card also gets
// its own smaller cursor-tracked highlight. Adapted for real treatment
// data (title/subtitle/price/category) instead of the original's fake
// avatar/dev-profile demo content, and navigates via react-router instead
// of window.open.
export type ChromaItem = { image: string; title: string; subtitle: string; meta?: string; category?: string; to?: string }

type ChromaGridProps = { items: ChromaItem[]; className?: string; radius?: number }

export const ChromaGrid = ({ items, className = '', radius = 320 }: ChromaGridProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    el.style.setProperty('--x', `${width / 2}px`)
    el.style.setProperty('--y', `${height / 2}px`)
  }, [])

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    gsap.to(el, {
      '--x': `${event.clientX - rect.left}px`,
      '--y': `${event.clientY - rect.top}px`,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true,
    })
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
  }

  const onLeave = () => {
    gsap.to(fadeRef.current, { opacity: 1, duration: 0.6, overwrite: true })
  }

  const onCardMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`.trim()}
      style={{ '--r': `${radius}px` } as React.CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {items.map((item) => (
        <article
          key={item.title}
          className="chroma-card"
          onMouseMove={onCardMove}
          onClick={() => item.to && navigate(item.to)}
          style={{ cursor: item.to ? 'pointer' : 'default' }}
        >
          <div className="chroma-card__image">
            <img src={item.image} alt={item.title} loading="lazy" />
          </div>
          <footer className="chroma-card__footer">
            <h3 className="display-sm">{item.title}</h3>
            {item.category && <span className="chroma-card__category">{item.category}</span>}
            <p className="body-sm">{item.subtitle}</p>
            {item.meta && <span className="chroma-card__meta">{item.meta}</span>}
          </footer>
        </article>
      ))}
      <div ref={fadeRef} className="chroma-grid__fade" />
    </div>
  )
}
