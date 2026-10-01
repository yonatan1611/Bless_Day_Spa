import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ImageFrame } from '../ui/ImageFrame'
import { Button } from '../ui/Button'
import { SplitText } from '../react-bits/SplitText'
import { RotatingText } from '../react-bits/RotatingText'
import { business } from '../../content/business'
import { homepageImages } from '../../content/images'
import { services } from '../../content/services'

const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

// A gentle, GPU-only parallax plus the hero photo's slow Ken Burns zoom,
// driven from one requestAnimationFrame loop and written as a single
// transform on .hero__media. Both effects used to be split — JS parallax on
// this div, a separate CSS @keyframes zoom on the <img> inside it — and that
// split left Chrome's compositor stuck rendering the img's flat background
// color instead of the photo on first paint (a real Chromium bug with
// independently-animated nested transform layers). Driving both from the
// same transform on the same element avoids the nested-layer situation
// entirely. Skipped under prefers-reduced-motion.
const HERO_ZOOM_PERIOD_MS = 24_000
const HERO_ZOOM_MIN = 1
const HERO_ZOOM_MAX = 1.06

const useHeroMotion = () => {
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = mediaRef.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame: number
    const start = performance.now()
    const render = (now: number) => {
      const rect = node.parentElement?.getBoundingClientRect()
      const offsetY = rect ? rect.top * 0.15 : 0

      // ease-in-out triangle wave, alternating 0 -> 1 -> 0 over one period
      const t = ((now - start) % HERO_ZOOM_PERIOD_MS) / HERO_ZOOM_PERIOD_MS
      const triangle = t < 0.5 ? t * 2 : 2 - t * 2
      const eased = triangle * triangle * (3 - 2 * triangle)
      const scale = HERO_ZOOM_MIN + (HERO_ZOOM_MAX - HERO_ZOOM_MIN) * eased

      node.style.transform = `translate3d(0, ${offsetY}px, 0) scale(${scale})`
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frame)
  }, [])

  return mediaRef
}

export const Hero = () => {
  const mediaRef = useHeroMotion()
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero__spine" aria-hidden="true">Addis Ababa · Wollo Sefer</p>

      <motion.div
        className="hero__media"
        ref={mediaRef}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <ImageFrame
          variant="hero"
          src={homepageImages.hero}
          priority
          alt="A sunlit treatment lounge at Bless Day Spa, with roses resting on the beds"
          className="hero__image"
          objectPosition="center 55%"
        />
      </motion.div>

      <motion.div
        className="hero__copy"
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        variants={heroStagger}
      >
        <motion.p className="eyebrow hero__eyebrow" variants={heroItem}>
          {business.areaDescription} · {business.city}
        </motion.p>
        <h1 id="hero-title" className="hero__title">
          <SplitText text="Make room" tag="span" className="hero__title-line" delay={22} />
          <br />
          <motion.span className="hero__title-line" variants={heroItem}>
            for a <em>blessed</em> day.
          </motion.span>
        </h1>
        <motion.p className="body-lg hero__intro" variants={heroItem}>
          {business.servesDescription}
        </motion.p>
        <motion.p className="hero__rotating" variants={heroItem}>
          Today, make time for <RotatingText texts={services.map((s) => s.title)} className="hero__rotating-text" />
        </motion.p>
        <motion.div className="hero__actions" variants={heroItem}>
          <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
          <Button to="/treatments" variant="secondary" arrow="down-right">Explore Treatments</Button>
        </motion.div>
      </motion.div>

      <a href="#brand-statement-title" className="hero__scroll-cue" aria-label="Scroll to learn more">
        <span className="hero__scroll-cue-line" aria-hidden="true" />
      </a>
    </section>
  )
}
