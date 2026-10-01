import { useRef, type PropsWithChildren, type MouseEvent } from 'react'

// Inspired by React Bits' MagicBento (reactbits.dev) — its full component is
// ~700 lines built for a SaaS feature grid (particles, click-ripples, a
// shared global spotlight overlay, hardcoded "Analytics/Dashboard/Security"
// demo copy). Porting all of that here would fight the brief's own warning
// against a SaaS-dashboard feel. This keeps MagicBento's actual signature
// moves — a mouse-tracked border glow plus a few pixels of magnetic pull
// toward the cursor — as a small, re-themed primitive sized for this site's
// two real tiles instead of six fabricated ones.
type BentoCardProps = PropsWithChildren<{
  className?: string
  glowColor?: string
}>

const MAGNETISM_STRENGTH = 0.05

export const BentoCard = ({ children, className = '', glowColor = '169, 124, 99' }: BentoCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    el.style.setProperty('--bento-x', `${x}px`)
    el.style.setProperty('--bento-y', `${y}px`)
    el.style.setProperty('--bento-glow', glowColor)

    const offsetX = (x - rect.width / 2) * MAGNETISM_STRENGTH
    const offsetY = (y - rect.height / 2) * MAGNETISM_STRENGTH
    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div ref={ref} className={`bento-card ${className}`.trim()} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <span className="bento-card__glow" aria-hidden="true" />
      <div className="bento-card__content">{children}</div>
    </div>
  )
}
