import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { motion, type Transition } from 'motion/react'

// Adapted from React Bits' BlurText (reactbits.dev) — each word resolves
// from a soft blur into focus as it scrolls into view. Ported from Framer
// Motion keyframe arrays (unchanged, since `motion` was already in the
// project) with an added prefers-reduced-motion bypass, which the original
// component doesn't handle.
type BlurTextProps = {
  text: string
  className?: string
  delay?: number
  direction?: 'top' | 'bottom'
  threshold?: number
  tag?: 'p' | 'span'
}

const buildKeyframes = (from: Record<string, string | number>, steps: Array<Record<string, string | number>>) => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))])
  const keyframes: Record<string, Array<string | number>> = {}
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])]
  })
  return keyframes
}

export const BlurText = ({ text, className = '', delay = 80, direction = 'bottom', threshold = 0.2, tag = 'p' }: BlurTextProps) => {
  const words = text.split(' ')
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  const from = useMemo(
    () => (direction === 'top' ? { filter: 'blur(12px)', opacity: 0, y: -24 } : { filter: 'blur(12px)', opacity: 0, y: 24 }),
    [direction],
  )
  const to = useMemo(
    () => [
      { filter: 'blur(4px)', opacity: 0.6, y: direction === 'top' ? 4 : -4 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  )

  const stepDuration = 0.4
  const totalDuration = stepDuration * to.length
  const times = Array.from({ length: to.length + 1 }, (_, i) => i / to.length)

  const Tag = tag
  return (
    <Tag ref={ref as never} className={className} style={{ display: tag === 'span' ? 'inline-flex' : 'flex', flexWrap: 'wrap' } as CSSProperties}>
      {words.map((word, index) => {
        const keyframes = buildKeyframes(from, to)
        const transition: Transition = { duration: totalDuration, times, delay: (index * delay) / 1000 }
        return (
          <motion.span
            key={index}
            initial={from}
            animate={inView ? keyframes : from}
            transition={transition}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </motion.span>
        )
      })}
    </Tag>
  )
}
