import { useCallback, useEffect, useRef, type MouseEvent, type PropsWithChildren } from 'react'

// Adapted from React Bits' ClickSpark (reactbits.dev) — a canvas-drawn
// burst of small lines radiating from the click point. Wraps any clickable
// element for tactile feedback; used site-wide on primary CTAs (lighter
// touch than Kokonut's particle-button, which is reserved for the one-off
// closing CTA).
type ClickSparkProps = PropsWithChildren<{ className?: string; sparkColor?: string }>

// A literal color, not a var() reference — canvas strokeStyle can't resolve
// nested custom properties, so this mirrors --color-clay's actual value.
export const ClickSpark = ({ children, className = '', sparkColor = '#A97C63' }: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparks = useRef<Array<{ x: number; y: number; angle: number; start: number }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const ctx = canvas.getContext('2d')
    let frame: number
    const duration = 400

    const draw = (now: number) => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparks.current = sparks.current.filter((spark) => {
        const elapsed = now - spark.start
        if (elapsed >= duration) return false
        const progress = elapsed / duration
        const eased = progress * (2 - progress)
        const distance = eased * 16
        const length = 8 * (1 - eased)
        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + length) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + length) * Math.sin(spark.angle)
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        return true
      })
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    return () => { ro.disconnect(); cancelAnimationFrame(frame) }
  }, [sparkColor])

  const onClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const now = performance.now()
    sparks.current.push(...Array.from({ length: 8 }, (_, i) => ({ x, y, angle: (2 * Math.PI * i) / 8, start: now })))
  }, [])

  return (
    <div className={`click-spark ${className}`.trim()} onClick={onClick}>
      <canvas ref={canvasRef} className="click-spark__canvas" />
      {children}
    </div>
  )
}
