import { useRef, useState, type ComponentProps } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '../ui/Button'

// Adapted from Kokonut UI's particle-button (kokonutui.com) — a burst of
// small particles fires from the button on click. The original wraps
// shadcn/ui's <Button>; this wraps this project's own polymorphic <Button>
// (src/components/ui/Button.tsx) instead, since the site has no shadcn
// scaffold. Used once, on the closing CTA, so it stays a signature moment
// rather than the default button treatment.
const SuccessParticles = ({ rect }: { rect: DOMRect }) => {
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  return (
    <AnimatePresence>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="particle-button__particle"
          style={{ left: centerX, top: centerY }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0],
            x: (i % 2 ? 1 : -1) * (Math.random() * 60 + 24),
            y: -(Math.random() * 60 + 24),
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
        />
      ))}
    </AnimatePresence>
  )
}

export const ParticleButton = ({ children, ...props }: ComponentProps<typeof Button>) => {
  const [rect, setRect] = useState<DOMRect | null>(null)
  const ref = useRef<HTMLElement>(null)

  const onClick = () => {
    if (ref.current) setRect(ref.current.getBoundingClientRect())
    window.setTimeout(() => setRect(null), 900)
  }

  return (
    <>
      {rect && <SuccessParticles rect={rect} />}
      <span ref={ref as never} onClick={onClick} className="particle-button">
        <Button {...props}>{children}</Button>
      </span>
    </>
  )
}
