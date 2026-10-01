import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Adapted from React Bits' RotatingText (reactbits.dev) — cycles through a
// list of real strings with a vertical slide. Simplified from the
// original's per-character stagger/imperative-ref API to a whole-word
// slide, since the source list here is short real category names rather
// than long phrases that benefit from per-letter stagger.
type RotatingTextProps = {
  texts: string[]
  className?: string
  interval?: number
}

export const RotatingText = ({ texts, className = '', interval = 2200 }: RotatingTextProps) => {
  const [index, setIndex] = useState(0)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % texts.length), interval)
    return () => window.clearInterval(timer)
  }, [texts.length, interval, reduceMotion])

  return (
    <span className={`rotating-text ${className}`.trim()}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="rotating-text__item"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
