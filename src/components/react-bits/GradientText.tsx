import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react'
import { useRef, type PropsWithChildren } from 'react'

// Adapted from React Bits' GradientText (reactbits.dev) — an animated
// gradient sweep across text. Default colors swapped for the site's warm
// clay/sage/ivory palette instead of the original's violet/pink defaults.
type GradientTextProps = PropsWithChildren<{
  className?: string
  colors?: string[]
  speed?: number
}>

export const GradientText = ({ children, className = '', colors = ['var(--color-clay)', 'var(--color-sage)', 'var(--color-clay)'], speed = 6 }: GradientTextProps) => {
  const progress = useMotionValue(0)
  const elapsed = useRef(0)
  const lastTime = useRef<number | null>(null)
  const duration = speed * 1000

  useAnimationFrame((time) => {
    if (lastTime.current === null) {
      lastTime.current = time
      return
    }
    elapsed.current += time - lastTime.current
    lastTime.current = time
    const cycle = elapsed.current % (duration * 2)
    progress.set(cycle < duration ? (cycle / duration) * 100 : 100 - ((cycle - duration) / duration) * 100)
  })

  const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`)
  const gradientColors = [...colors, colors[0]].join(', ')

  return (
    <motion.span
      className={`gradient-text ${className}`.trim()}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors})`,
        backgroundSize: '300% 100%',
        backgroundPosition,
      }}
    >
      {children}
    </motion.span>
  )
}
