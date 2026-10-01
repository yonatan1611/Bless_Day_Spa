import { useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'motion/react'

// Adapted from React Bits' ScrollVelocity (reactbits.dev) — a marquee whose
// speed and direction respond to actual scroll velocity, not a fixed CSS
// animation (that's what TrustStrip already does elsewhere on the site —
// this is the genuinely different, scroll-reactive version).
type ScrollVelocityProps = {
  text: string
  className?: string
  baseVelocity?: number
}

export const ScrollVelocity = ({ text, className = '', baseVelocity = 3 }: ScrollVelocityProps) => {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const baseX = useMotionValue(0)
  const directionRef = useRef(1)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return
    let moveBy = directionRef.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) directionRef.current = -1
    else if (velocityFactor.get() > 0) directionRef.current = 1
    moveBy += directionRef.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  const x = useTransform(baseX, (v) => `${((v % -25) + 25) % -25}%`)

  return (
    <div className={`scroll-velocity ${className}`.trim()}>
      <motion.div className="scroll-velocity__track" style={{ x }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="scroll-velocity__item">{text}</span>
        ))}
      </motion.div>
    </div>
  )
}
