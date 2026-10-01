import { useRef, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, type SpringOptions } from 'motion/react'

// Adapted from React Bits' TiltedCard (reactbits.dev) — a 3D pointer-tilt
// with a cursor-following caption. Rewritten to fill its container at
// 100%/auto (aspect-ratio driven, matching this project's ImageFrame
// pattern) instead of the original's fixed containerWidth/imageWidth pixel
// props, and gated behind @media (hover: hover) in CSS rather than the
// original's always-visible "not optimized for mobile" text warning.
type TiltedCardProps = {
  imageSrc: string
  altText: string
  captionText?: string
  className?: string
  scaleOnHover?: number
  rotateAmplitude?: number
}

const springValues: SpringOptions = { damping: 30, stiffness: 100, mass: 2 }

export const TiltedCard = ({ imageSrc, altText, captionText = '', className = '', scaleOnHover = 1.04, rotateAmplitude = 10 }: TiltedCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [lastY, setLastY] = useState(0)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)
  const scale = useSpring(1, springValues)
  const captionOpacity = useSpring(0)
  const captionRotate = useSpring(0, { stiffness: 350, damping: 30, mass: 1 })

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const rect = el.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude)
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude)
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
    captionRotate.set(-(offsetY - lastY) * 0.6)
    setLastY(offsetY)
  }

  const onMouseEnter = () => {
    scale.set(scaleOnHover)
    captionOpacity.set(1)
  }

  const onMouseLeave = () => {
    scale.set(1)
    captionOpacity.set(0)
    rotateX.set(0)
    rotateY.set(0)
    captionRotate.set(0)
  }

  return (
    <div
      ref={ref}
      className={`tilted-card ${className}`.trim()}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div className="tilted-card__inner" style={{ rotateX, rotateY, scale }}>
        <img src={imageSrc} alt={altText} className="tilted-card__img" />
      </motion.div>
      {captionText && (
        <motion.div className="tilted-card__caption" style={{ x, y, opacity: captionOpacity, rotate: captionRotate }}>
          {captionText}
        </motion.div>
      )}
    </div>
  )
}
