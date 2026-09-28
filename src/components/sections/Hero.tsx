import { useEffect, useRef } from 'react'
import { ImageFrame } from '../ui/ImageFrame'
import { Button } from '../ui/Button'
import { business } from '../../content/business'
import { homepageImages } from '../../content/images'

// A gentle, GPU-only parallax: the background image drifts slower than the
// page scrolls, only while the hero is on screen. Skipped entirely under
// prefers-reduced-motion, and driven by requestAnimationFrame so it never
// fights the browser's own scroll handling.
const useHeroParallax = () => {
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = mediaRef.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const update = () => {
      ticking = false
      const rect = node.parentElement?.getBoundingClientRect()
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return
      node.style.transform = `translate3d(0, ${rect.top * 0.15}px, 0)`
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return mediaRef
}

export const Hero = () => {
  const mediaRef = useHeroParallax()

  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero__spine" aria-hidden="true">Addis Ababa · Wollo Sefer</p>

      <div className="hero__media" ref={mediaRef}>
        <ImageFrame
          variant="hero"
          src={homepageImages.hero}
          demo
          priority
          alt="Demonstration spa interior — warm-lit wood sauna"
          className="hero__image"
        />
      </div>

      <div className="hero__copy">
        <p className="eyebrow hero__eyebrow">{business.areaDescription} · {business.city}</p>
        <h1 id="hero-title" className="hero__title">
          Make room
          <br />
          for a <em>blessed</em> day.
        </h1>
        <p className="body-lg hero__intro">{business.servesDescription}</p>
        <div className="hero__actions">
          <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
          <Button to="/treatments" variant="secondary" arrow="down-right">Explore Treatments</Button>
        </div>
      </div>

      <a href="#brand-intro-title" className="hero__scroll-cue" aria-label="Scroll to learn more">
        <span className="hero__scroll-cue-line" aria-hidden="true" />
      </a>
    </section>
  )
}
