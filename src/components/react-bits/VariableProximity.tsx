import { useEffect, useRef } from 'react'

// Adapted from React Bits' VariableProximity (reactbits.dev) — letters near
// the cursor shift along a variable-font axis, falling off with distance.
// Simplified to interpolate the 'opsz' (optical size) axis specifically:
// this project's Newsreader is requested from Google Fonts as a continuous
// range on opsz (see index.html) but discrete static cuts on wght, so opsz
// is the axis actually guaranteed to animate smoothly in every browser.
type VariableProximityProps = {
  label: string
  className?: string
  radius?: number
  fromOpsz?: number
  toOpsz?: number
}

export const VariableProximity = ({ label, className = '', radius = 80, fromOpsz = 6, toOpsz = 72 }: VariableProximityProps) => {
  const spanRef = useRef<HTMLSpanElement>(null)
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame: number
    const mouse = { x: -9999, y: -9999 }
    const onMove = (event: MouseEvent) => { mouse.x = event.clientX; mouse.y = event.clientY }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      letterRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const distance = Math.hypot(mouse.x - cx, mouse.y - cy)
        const falloff = Math.min(Math.max(1 - distance / radius, 0), 1)
        const value = fromOpsz + (toOpsz - fromOpsz) * falloff
        el.style.fontVariationSettings = `'opsz' ${value}`
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(frame) }
  }, [radius, fromOpsz, toOpsz])

  let letterIndex = 0
  return (
    <span ref={spanRef} className={`variable-proximity ${className}`.trim()}>
      {label.split(' ').map((word, wordIndex, words) => (
        <span key={wordIndex} className="variable-proximity__word">
          {word.split('').map((letter) => {
            const index = letterIndex++
            return (
              <span key={index} ref={(el) => { letterRefs.current[index] = el }} className="variable-proximity__letter">
                {letter}
              </span>
            )
          })}
          {wordIndex < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
