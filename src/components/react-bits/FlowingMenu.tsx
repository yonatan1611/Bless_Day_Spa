import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

// Adapted from React Bits' FlowingMenu (reactbits.dev) — hovering a row
// slides a marquee strip (repeating label + image) in from whichever edge
// the cursor entered nearest. Adapted to use react-router's Link instead of
// a plain <a>, and real treatment photos instead of demo images.
export type FlowingMenuItem = { to: string; label: string; image: string }

export const FlowingMenu = ({ items }: { items: FlowingMenuItem[] }) => (
  <nav className="flowing-menu">
    {items.map((item, index) => (
      <FlowingMenuItemRow key={item.to} {...item} isFirst={index === 0} />
    ))}
  </nav>
)

const FlowingMenuItemRow = ({ to, label, image, isFirst }: FlowingMenuItem & { isFirst: boolean }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [repetitions, setRepetitions] = useState(4)

  useEffect(() => {
    const calc = () => {
      const part = innerRef.current?.querySelector<HTMLElement>('.flowing-menu__marquee-part')
      if (!part) return
      const needed = Math.ceil(window.innerWidth / part.offsetWidth) + 2
      setRepetitions(Math.max(4, needed))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [label])

  useEffect(() => {
    const part = innerRef.current?.querySelector<HTMLElement>('.flowing-menu__marquee-part')
    if (!part || !innerRef.current) return
    const tween = gsap.to(innerRef.current, { x: -part.offsetWidth, duration: 15, ease: 'none', repeat: -1 })
    return () => { tween.kill() }
  }, [repetitions])

  const findEdge = (x: number, y: number, w: number, h: number): 'top' | 'bottom' =>
    (x - w / 2) ** 2 + y ** 2 < (x - w / 2) ** 2 + (y - h) ** 2 ? 'top' : 'bottom'

  const onEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    const item = itemRef.current
    const marquee = marqueeRef.current
    const inner = innerRef.current
    if (!item || !marquee || !inner) return
    const rect = item.getBoundingClientRect()
    const edge = findEdge(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height)
    gsap
      .timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(inner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marquee, inner], { y: '0%' }, 0)
  }

  const onLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    const item = itemRef.current
    const marquee = marqueeRef.current
    const inner = innerRef.current
    if (!item || !marquee || !inner) return
    const rect = item.getBoundingClientRect()
    const edge = findEdge(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height)
    gsap
      .timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .to(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(inner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  return (
    <div className="flowing-menu__item" ref={itemRef} style={{ borderTop: isFirst ? 'none' : undefined }}>
      <Link className="flowing-menu__link" to={to} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {label}
      </Link>
      <div className="flowing-menu__marquee" ref={marqueeRef}>
        <div className="flowing-menu__marquee-inner-wrap">
          <div className="flowing-menu__marquee-inner" ref={innerRef}>
            {Array.from({ length: repetitions }).map((_, i) => (
              <div className="flowing-menu__marquee-part" key={i}>
                <span>{label}</span>
                <div className="flowing-menu__marquee-img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
