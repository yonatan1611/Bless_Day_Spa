import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

// Adapted from React Bits' PillNav (reactbits.dev) — each link is a pill
// with a circle that grows from the bottom on hover, swapping the label for
// a contrast-color copy as it rises past it. Scoped down from the original:
// dropped its own mobile hamburger/popover (this site keeps its existing
// fullscreen mobile takeover in Header.tsx) and its logo-spin/initial-load
// GSAP timelines, keeping the hover-circle mechanic that's the component's
// actual signature move. Colors come in as props instead of being
// hardcoded, so this same component serves every page's nav.
export type PillNavItem = { label: string; to: string }

type PillNavProps = {
  items: PillNavItem[]
  activePath: string
  baseColor: string
  pillTextColor: string
  hoverTextColor: string
  ease?: string
}

export const PillNav = ({ items, activePath, baseColor, pillTextColor, hoverTextColor, ease = 'power3.out' }: PillNavProps) => {
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([])
  const timelines = useRef<Array<gsap.core.Timeline | null>>([])
  const activeTweens = useRef<Array<gsap.core.Tween | null>>([])

  const isActive = (to: string) => (to === '/' ? activePath === '/' : activePath.startsWith(to))

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        const pill = circle?.parentElement
        if (!circle || !pill) return

        const { width: w, height: h } = pill.getBoundingClientRect()
        const radius = (w * w / 4 + h * h) / (2 * h)
        const diameter = Math.ceil(2 * radius) + 2
        const delta = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (w * w) / 4))) + 1

        circle.style.width = `${diameter}px`
        circle.style.height = `${diameter}px`
        circle.style.bottom = `-${delta}px`
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${diameter - delta}px` })

        const label = pill.querySelector<HTMLElement>('.pill-nav__label')
        const labelHover = pill.querySelector<HTMLElement>('.pill-nav__label-hover')
        if (label) gsap.set(label, { y: 0 })
        if (labelHover) gsap.set(labelHover, { y: h + 12, opacity: 0 })

        timelines.current[index]?.kill()
        const tl = gsap.timeline({ paused: true })
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0)
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0)
        if (labelHover) tl.to(labelHover, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0)
        timelines.current[index] = tl

        if (isActive(items[index].to)) tl.progress(1)
      })
    }

    layout()
    window.addEventListener('resize', layout)
    return () => window.removeEventListener('resize', layout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, activePath, ease])

  const onEnter = (index: number) => {
    if (isActive(items[index].to)) return
    const tl = timelines.current[index]
    if (!tl) return
    activeTweens.current[index]?.kill()
    activeTweens.current[index] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' })
  }

  const onLeave = (index: number) => {
    if (isActive(items[index].to)) return
    const tl = timelines.current[index]
    if (!tl) return
    activeTweens.current[index]?.kill()
    activeTweens.current[index] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' })
  }

  const cssVars = {
    ['--pill-nav-base' as string]: baseColor,
    ['--pill-nav-text' as string]: pillTextColor,
    ['--pill-nav-hover-text' as string]: hoverTextColor,
  }

  return (
    <ul className="pill-nav" style={cssVars} role="menubar">
      {items.map((item, index) => (
        <li key={item.to} role="none">
          <Link
            role="menuitem"
            to={item.to}
            className={`pill-nav__pill${isActive(item.to) ? ' is-active' : ''}`}
            onMouseEnter={() => onEnter(index)}
            onMouseLeave={() => onLeave(index)}
          >
            <span className="pill-nav__circle" aria-hidden="true" ref={(el) => { circleRefs.current[index] = el }} />
            <span className="pill-nav__label-stack">
              <span className="pill-nav__label">{item.label}</span>
              <span className="pill-nav__label-hover" aria-hidden="true">{item.label}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
