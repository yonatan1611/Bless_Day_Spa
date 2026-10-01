import { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, type ReactElement, type ReactNode, type RefObject } from 'react'
import { gsap } from 'gsap'

// Adapted from React Bits' CardSwap (reactbits.dev) — a 3D stack that
// auto-cycles: the front card drops away and the rest promote forward,
// looping continuously. Used for the Reviews page's testimonial stack
// instead of the homepage's crossfade, so the two pages feel distinct.
export const SwapCard = forwardRef<HTMLDivElement, { className?: string; children: ReactNode }>(
  ({ className, children }, ref) => <div ref={ref} className={`swap-card ${className ?? ''}`.trim()}>{children}</div>,
)
SwapCard.displayName = 'SwapCard'

type Slot = { x: number; y: number; z: number; zIndex: number }
const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({ x: i * distX, y: -i * distY, z: -i * distX * 1.5, zIndex: total - i })
const placeNow = (el: HTMLElement, slot: Slot) =>
  gsap.set(el, { x: slot.x, y: slot.y, z: slot.z, xPercent: -50, yPercent: -50, transformOrigin: 'center center', zIndex: slot.zIndex, force3D: true })

type CardSwapProps = { width?: number | string; height?: number | string; delay?: number; pauseOnHover?: boolean; children: ReactNode }

export const CardSwap = ({ width = 420, height = 320, delay = 4200, pauseOnHover = true, children }: CardSwapProps) => {
  const childArr = useMemo(() => Children.toArray(children) as ReactElement[], [children])
  const refs = useMemo<RefObject<HTMLDivElement | null>[]>(() => childArr.map(() => ({ current: null })), [childArr.length])
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i))
  const container = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cardDistance = 46
    const verticalDistance = 56
    const total = refs.length
    refs.forEach((r, i) => r.current && placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total)))

    const swap = () => {
      if (order.current.length < 2) return
      const [front, ...rest] = order.current
      const elFront = refs[front].current
      if (!elFront) return
      const tl = gsap.timeline()
      tl.to(elFront, { y: '+=440', duration: 1.6, ease: 'power2.inOut' })
      rest.forEach((idx, i) => {
        const el = refs[idx].current
        if (!el) return
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
        tl.set(el, { zIndex: slot.zIndex }, '<')
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: 1.6, ease: 'power2.inOut' }, `<+=${i * 0.1}`)
      })
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length)
      tl.set(elFront, { zIndex: backSlot.zIndex })
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: 1.2, ease: 'power2.inOut' }, '<')
      tl.call(() => { order.current = [...rest, front] })
    }

    intervalRef.current = window.setInterval(swap, delay)
    if (pauseOnHover) {
      const node = container.current
      const pause = () => window.clearInterval(intervalRef.current)
      const resume = () => { intervalRef.current = window.setInterval(swap, delay) }
      node?.addEventListener('mouseenter', pause)
      node?.addEventListener('mouseleave', resume)
      return () => {
        node?.removeEventListener('mouseenter', pause)
        node?.removeEventListener('mouseleave', resume)
        window.clearInterval(intervalRef.current)
      }
    }
    return () => window.clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, pauseOnHover, refs.length])

  const rendered = childArr.map((child, i) =>
    isValidElement(child) ? cloneElement(child as ReactElement<{ style?: React.CSSProperties }>, { key: i, ref: refs[i], style: { width, height } } as never) : child,
  )

  return <div ref={container} className="card-swap" style={{ width, height }}>{rendered}</div>
}
