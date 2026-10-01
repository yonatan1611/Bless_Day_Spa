import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

// Adapted from React Bits' TrueFocus (reactbits.dev) — words blur in and
// out of focus in sequence, with a camera-style corner bracket tracking the
// sharp word. Recolored from the original's green default to the site's
// clay accent.
type TrueFocusProps = {
  sentence: string
  className?: string
  blurAmount?: number
  animationDuration?: number
  pauseBetween?: number
}

type Rect = { x: number; y: number; width: number; height: number }

export const TrueFocus = ({ sentence, className = '', blurAmount = 6, animationDuration = 0.5, pauseBetween = 1.4 }: TrueFocusProps) => {
  const words = sentence.split(' ')
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([])
  const [rect, setRect] = useState<Rect>({ x: 0, y: 0, width: 0, height: 0 })
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) return
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length)
    }, (animationDuration + pauseBetween) * 1000)
    return () => window.clearInterval(interval)
  }, [words.length, animationDuration, pauseBetween, reduceMotion])

  useEffect(() => {
    const word = wordRefs.current[activeIndex]
    const container = containerRef.current
    if (!word || !container) return
    const parentRect = container.getBoundingClientRect()
    const activeRect = word.getBoundingClientRect()
    setRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    })
  }, [activeIndex])

  return (
    <div className={`true-focus ${className}`.trim()} ref={containerRef}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => { wordRefs.current[index] = el }}
          className="true-focus__word"
          style={{ filter: reduceMotion || index === activeIndex ? 'blur(0px)' : `blur(${blurAmount}px)` }}
        >
          {word}
        </span>
      ))}
      {!reduceMotion && (
        <motion.div
          className="true-focus__frame"
          animate={{ x: rect.x, y: rect.y, width: rect.width, height: rect.height, opacity: 1 }}
          transition={{ duration: animationDuration }}
        >
          <span className="true-focus__corner true-focus__corner--tl" />
          <span className="true-focus__corner true-focus__corner--tr" />
          <span className="true-focus__corner true-focus__corner--bl" />
          <span className="true-focus__corner true-focus__corner--br" />
        </motion.div>
      )}
    </div>
  )
}
