import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

// A real exit+enter (not just a CSS enter-fade) — a soft fade with a small
// upward drift, mirrored on exit so route changes feel continuous rather
// than a hard cut. Must be the direct AnimatePresence child keyed by route
// in App.tsx for the exit half to actually run (AnimatePresence detects an
// outgoing element by its key disappearing from its children).
export const PageTransition = ({ children }: { children: ReactNode }) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="page-transition"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
