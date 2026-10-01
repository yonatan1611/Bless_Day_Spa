import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Adapted from React Bits' ScrollReveal (reactbits.dev) — words fade in and
// un-blur as the block scrolls through the viewport, scrubbed to scroll
// position rather than a fixed-duration animation. Fixed a bug from the
// original: it cleaned up with `ScrollTrigger.getAll().forEach(t => t.kill())`,
// which tears down every ScrollTrigger on the page (including other
// instances/consumers), not just this one — this version only kills the
// triggers it created.
type ScrollRevealProps = {
  children: string
  className?: string
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
}

export const ScrollReveal = ({ children, className = '', baseOpacity = 0.15, baseRotation = 3, blurStrength = 6 }: ScrollRevealProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null)

  const words = useMemo(
    () =>
      children.split(/(\s+)/).map((word, index) =>
        word.match(/^\s+$/) ? word : (
          <span className="scroll-reveal__word" key={index}>
            {word}
          </span>
        ),
      ),
    [children],
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const triggers: ScrollTrigger[] = []

    const rotationTween = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: true },
      },
    )
    if (rotationTween.scrollTrigger) triggers.push(rotationTween.scrollTrigger)

    const words = el.querySelectorAll<HTMLElement>('.scroll-reveal__word')

    const opacityTween = gsap.fromTo(
      words,
      { opacity: baseOpacity },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: { trigger: el, start: 'top bottom-=20%', end: 'bottom bottom', scrub: true },
      },
    )
    if (opacityTween.scrollTrigger) triggers.push(opacityTween.scrollTrigger)

    const blurTween = gsap.fromTo(
      words,
      { filter: `blur(${blurStrength}px)` },
      {
        ease: 'none',
        filter: 'blur(0px)',
        stagger: 0.05,
        scrollTrigger: { trigger: el, start: 'top bottom-=20%', end: 'bottom bottom', scrub: true },
      },
    )
    if (blurTween.scrollTrigger) triggers.push(blurTween.scrollTrigger)

    return () => triggers.forEach((trigger) => trigger.kill())
  }, [baseOpacity, baseRotation, blurStrength])

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${className}`.trim()}>
      {words}
    </h2>
  )
}
