import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'

gsap.registerPlugin(GSAPSplitText)

// Adapted from React Bits' SplitText (reactbits.dev) — splits text into
// chars via GSAP's (now free, bundled) SplitText plugin and staggers them
// in. Simplified from the original: dropped @gsap/react's useGSAP and
// ScrollTrigger (this runs once on mount for above-the-fold headlines, not
// scroll-linked), and added a prefers-reduced-motion bypass the original
// doesn't have.
type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  tag?: 'h1' | 'h2' | 'span'
}

export const SplitText = ({ text, className = '', delay = 30, tag = 'span' }: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const split = new GSAPSplitText(el, { type: 'words, chars', wordsClass: 'split-word', charsClass: 'split-char' })
    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: delay / 1000 },
    )

    return () => split.revert()
  }, [text, delay])

  const Tag = tag
  return (
    <Tag ref={ref as never} className={`split-text ${className}`.trim()}>
      {text}
    </Tag>
  )
}
