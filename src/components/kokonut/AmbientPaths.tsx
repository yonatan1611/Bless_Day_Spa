import { useMemo } from 'react'
import { motion } from 'motion/react'

// Adapted from Kokonut UI's background-paths (kokonutui.com) — soft curved
// lines drifting behind a section. Pared down from the original's 37 paths
// in a vivid purple/pink/blue gradient (built for a dark SaaS hero) to ~10
// paths in the site's own clay/sand palette, and gated behind
// prefers-reduced-motion, which the original doesn't check.
type Point = { x: number; y: number }

const generatePath = (index: number, amplitude: number): string => {
  const phase = index * 0.3
  const segments = 8
  const points: Point[] = []
  for (let i = 0; i <= segments; i++) {
    const progress = i / segments
    const eased = 1 - (1 - progress) ** 2
    const baseX = 2400 + (-2400 - 2400) * eased
    const baseY = 400 + (-400 + index * 20 - 400) * eased
    const wave = Math.sin(progress * Math.PI * 3 + phase) * amplitude * (1 - eased * 0.3)
    points.push({ x: baseX, y: baseY + wave })
  }
  return points
    .map((point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`
      const prev = points[i - 1]
      const cp1x = prev.x + (point.x - prev.x) * 0.4
      const cp2x = prev.x + (point.x - prev.x) * 0.6
      return `C ${cp1x} ${prev.y}, ${cp2x} ${point.y}, ${point.x} ${point.y}`
    })
    .join(' ')
}

export const AmbientPaths = ({ className = '' }: { className?: string }) => {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const paths = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: `ambient-path-${i}`,
        d: generatePath(i, 60 + i * 4),
        opacity: 0.1 + i * 0.02,
        width: 2 + i * 0.3,
      })),
    [],
  )

  return (
    <div className={`ambient-paths ${className}`.trim()} aria-hidden="true">
      <svg viewBox="-2400 -400 4800 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="ambient-paths-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="var(--color-clay)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="url(#ambient-paths-gradient)"
            strokeWidth={path.width}
            strokeLinecap="round"
            style={{ opacity: path.opacity }}
            initial={{ y: 0 }}
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
