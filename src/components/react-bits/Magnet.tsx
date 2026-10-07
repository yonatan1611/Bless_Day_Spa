import { useEffect, useRef, type PropsWithChildren } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Adapted from React Bits' Magnet (reactbits.dev) — content pulls toward
// the cursor within a padded radius around the element, easing back out
// once the cursor leaves. Driven entirely by Motion values (no useState),
// so cursor tracking never re-renders the React tree.
type MagnetProps = PropsWithChildren<{ className?: string; padding?: number; strength?: number }>

export const Magnet = ({ children, className = '', padding = 60, strength = 3 }: MagnetProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.2 })
  const y = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.2 })

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
        rawX.set((event.clientX - cx) / strength)
        rawY.set((event.clientY - cy) / strength)
      } else {
        rawX.set(0)
        rawY.set(0)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [padding, strength, rawX, rawY])

  return (
    <div ref={ref} className={`magnet ${className}`.trim()}>
      <motion.div className="magnet__inner" style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  )
}
