import { useRef, type PropsWithChildren, type MouseEvent } from 'react'

// Adapted from React Bits' SpotlightCard (reactbits.dev) — a cursor-tracked
// radial glow written as CSS vars rather than React state, so the glow moves
// every pointer frame without a re-render. Recolored for the warm palette at
// each call site via `spotlightColor` instead of the original's default white.
type SpotlightCardProps = PropsWithChildren<{
  className?: string
  spotlightColor?: string
}>

export const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(169, 124, 99, 0.16)' }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    el.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div ref={ref} onMouseMove={onMouseMove} className={`spotlight-card ${className}`.trim()}>
      {children}
    </div>
  )
}
