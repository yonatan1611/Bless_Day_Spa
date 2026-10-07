import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, animate, type PanInfo } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Adapted from React Bits' Carousel (reactbits.dev) — a single bounded
// track that slides between full-width panes, rather than CardSwap's 3D
// stack of absolutely-positioned cards (which it replaces everywhere on
// this site: CardSwap's cards either escaped their container upward,
// overlapping the heading above, or had to be rendered tiny to avoid it —
// see the Reviews page and TreatmentDetailPage's "Explore more" section).
// Supports drag/swipe, arrow buttons, dot indicators, and optional
// autoplay — content-agnostic, so the same component serves a text quote
// here and a photo + title card there.
type CarouselProps = {
  items: ReactNode[]
  autoplayDelay?: number
  pauseOnHover?: boolean
  className?: string
  ariaLabel?: string
}

const SPRING = { type: 'spring', stiffness: 300, damping: 34 } as const

export const Carousel = ({ items, autoplayDelay, pauseOnHover = true, className = '', ariaLabel = 'Carousel' }: CarouselProps) => {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const x = useMotionValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setWidth(el.getBoundingClientRect().width)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const controls = animate(x, -index * width, SPRING)
    return () => controls.stop()
  }, [index, width, x])

  useEffect(() => {
    if (!autoplayDelay || items.length < 2) return
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      setIndex((current) => (current + 1) % items.length)
    }, autoplayDelay)
    return () => window.clearInterval(id)
  }, [autoplayDelay, items.length])

  const goTo = (next: number) => setIndex(((next % items.length) + items.length) % items.length)

  const onDragEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const threshold = width * 0.2
    if (info.offset.x < -threshold || info.velocity.x < -400) goTo(index + 1)
    else if (info.offset.x > threshold || info.velocity.x > 400) goTo(index - 1)
    else animate(x, -index * width, SPRING)
  }

  return (
    <div
      className={`carousel ${className}`.trim()}
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => { pausedRef.current = pauseOnHover }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <motion.div
        className="carousel__track"
        style={{ x }}
        drag={items.length > 1 ? 'x' : false}
        dragConstraints={{ left: -(items.length - 1) * width, right: 0 }}
        dragElastic={0.12}
        onDragEnd={onDragEnd}
      >
        {items.map((item, i) => (
          <div className="carousel__slide" key={i} style={{ width }} aria-hidden={i !== index}>
            {item}
          </div>
        ))}
      </motion.div>

      {items.length > 1 && (
        <>
          <button type="button" className="carousel__arrow carousel__arrow--prev" onClick={() => goTo(index - 1)} aria-label="Previous slide">
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
          <button type="button" className="carousel__arrow carousel__arrow--next" onClick={() => goTo(index + 1)} aria-label="Next slide">
            <ChevronRight aria-hidden="true" size={18} />
          </button>
          <div className="carousel__dots">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel__dot ${i === index ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
