import { useEffect, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'motion/react'

// Adapted from React Bits' Stack (reactbits.dev) — a draggable card stack;
// flick the top card away (or tap, on touch) and it cycles to the back.
// Used for Gallery's "quick browse" strip, distinct from the full Masonry
// archive below it.
const DragCard = ({ children, onSendToBack, disableDrag }: { children: ReactNode; onSendToBack: () => void; disableDrag: boolean }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [40, -40])
  const rotateY = useTransform(x, [-100, 100], [-40, 40])

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 140 || Math.abs(info.offset.y) > 140) onSendToBack()
    else { x.set(0); y.set(0) }
  }

  if (disableDrag) return <div className="stack__card-rotate">{children}</div>

  return (
    <motion.div
      className="stack__card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={onDragEnd}
    >
      {children}
    </motion.div>
  )
}

type StackItem = { id: string; content: ReactNode }
type StackProps = { items: StackItem[]; className?: string }

export const Stack = ({ items, className = '' }: StackProps) => {
  const [stack, setStack] = useState(items)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => setIsTouch(window.matchMedia('(hover: none)').matches), [])
  useEffect(() => setStack(items), [items])

  const sendToBack = (id: string) => {
    setStack((prev) => {
      const next = [...prev]
      const index = next.findIndex((c) => c.id === id)
      const [card] = next.splice(index, 1)
      next.unshift(card)
      return next
    })
  }

  return (
    <div className={`stack ${className}`.trim()}>
      {stack.map((card, index) => (
        <DragCard key={card.id} onSendToBack={() => sendToBack(card.id)} disableDrag={isTouch}>
          <motion.div
            className="stack__card"
            onClick={() => isTouch && sendToBack(card.id)}
            animate={{ rotateZ: (stack.length - index - 1) * 3, scale: 1 + index * 0.05 - stack.length * 0.05 }}
            initial={false}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {card.content}
          </motion.div>
        </DragCard>
      ))}
    </div>
  )
}
