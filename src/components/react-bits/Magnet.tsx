import { useEffect, useRef, useState, type PropsWithChildren } from 'react'

// Adapted from React Bits' Magnet (reactbits.dev) — content pulls toward
// the cursor within a padded radius around the element, easing back out
// once the cursor leaves. Replaces this project's earlier hand-rolled
// magnetic-button hook in Button.tsx with the real component.
type MagnetProps = PropsWithChildren<{ className?: string; padding?: number; strength?: number }>

export const Magnet = ({ children, className = '', padding = 60, strength = 3 }: MagnetProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (event: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const cx = left + width / 2
      const cy = top + height / 2
      const distX = Math.abs(cx - event.clientX)
      const distY = Math.abs(cy - event.clientY)
      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setActive(true)
        setPos({ x: (event.clientX - cx) / strength, y: (event.clientY - cy) / strength })
      } else {
        setActive(false)
        setPos({ x: 0, y: 0 })
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [padding, strength])

  return (
    <div ref={ref} className={`magnet ${className}`.trim()}>
      <div
        className="magnet__inner"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: active ? 'transform 0.3s ease-out' : 'transform 0.5s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  )
}
