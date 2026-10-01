import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Adapted from React Bits' ScrollFloat (reactbits.dev) — characters float
// up and settle as the heading scrolls into view, scrubbed to scroll
// position. Fixed two issues from the original: it split raw characters
// with no word grouping (letters could wrap mid-word), and it never killed
// its ScrollTrigger on unmount.
type ScrollFloatProps = {
  children: string
  className?: string
  tag?: 'h2' | 'h3' | 'p'
  id?: string
}

export const ScrollFloat = ({ children, className = '', tag = 'h2', id }: ScrollFloatProps) => {
  const ref = useRef<HTMLHeadingElement>(null)

  const words = useMemo(
    () =>
      children.split(' ').map((word, wordIndex) => (
        <span className="scroll-float__word" key={wordIndex}>
          {word.split('').map((char, charIndex) => (
            <span className="scroll-float__char" key={charIndex}>{char}</span>
          ))}
        </span>
      )),
    [children],
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const charEls = el.querySelectorAll('.scroll-float__char')
    const tween = gsap.fromTo(
      charEls,
      { opacity: 0, yPercent: 100, scaleY: 2, scaleX: 0.8, transformOrigin: '50% 0%' },
      {
        duration: 1,
        ease: 'back.out(1.8)',
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: 0.02,
        scrollTrigger: { trigger: el, start: 'top bottom-=10%', end: 'bottom center', scrub: true },
      },
    )

    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [children])

  const Tag = tag
  return <Tag id={id} ref={ref as never} className={`scroll-float ${className}`.trim()}>{words}</Tag>
}
