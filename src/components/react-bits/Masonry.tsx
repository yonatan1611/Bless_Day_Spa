import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { gsap } from 'gsap'

// Adapted from React Bits' Masonry (reactbits.dev) — a justified-column
// grid where item positions are computed in JS (not CSS columns, which is
// what this site used before) and animated into place with GSAP, including
// a reflow animation when the column count changes on resize. Adapted:
// items open a caller-supplied `onSelect` (this site's own lightbox)
// instead of the original's `window.open(item.url)`, and each tile renders
// arbitrary `overlay` content (this site's cursor-follow "View" label +
// caption) instead of the original's flat color-shift overlay.
const useColumns = () => {
  const queries = ['(min-width:1200px)', '(min-width:800px)', '(min-width:520px)']
  const values = [4, 3, 2]
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? 1
  const [columns, setColumns] = useState(get)
  useEffect(() => {
    const handler = () => setColumns(get)
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler))
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler))
  }, [])
  return columns
}

const useMeasureWidth = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(node)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

export type MasonryItem = { id: string; img: string; alt: string; aspect: number; overlay?: ReactNode }
type GridItem = MasonryItem & { x: number; y: number; w: number; h: number }

type MasonryProps = { items: MasonryItem[]; onSelect: (index: number) => void }

export const Masonry = ({ items, onSelect }: MasonryProps) => {
  const columns = useColumns()
  const [containerRef, width] = useMeasureWidth()
  const hasMounted = useRef(false)

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return []
    const colHeights = new Array(columns).fill(0)
    const columnWidth = width / columns
    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights))
      const x = columnWidth * col
      const h = columnWidth / item.aspect
      const y = colHeights[col]
      colHeights[col] += h
      return { ...item, x, y, w: columnWidth, h }
    })
  }, [columns, items, width])

  const containerHeight = useMemo(() => {
    if (!grid.length) return 0
    return Math.max(...grid.map((item) => item.y + item.h))
  }, [grid])

  useLayoutEffect(() => {
    if (!grid.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      grid.forEach((item) => gsap.set(`[data-masonry-id="${item.id}"]`, { x: item.x, y: item.y, width: item.w, height: item.h, opacity: 1 }))
      hasMounted.current = true
      return
    }

    grid.forEach((item, index) => {
      const selector = `[data-masonry-id="${item.id}"]`
      const target = { x: item.x, y: item.y, width: item.w, height: item.h }
      if (!hasMounted.current) {
        gsap.fromTo(
          selector,
          { opacity: 0, y: item.y + 60, x: item.x, width: item.w, height: item.h },
          { opacity: 1, ...target, duration: 0.7, ease: 'power3.out', delay: index * 0.04 },
        )
      } else {
        gsap.to(selector, { ...target, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
      }
    })
    hasMounted.current = true
  }, [grid])

  const onMouseEnter = (event: MouseEvent<HTMLDivElement>, id: string) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    gsap.to(`[data-masonry-id="${id}"] .masonry-item__img`, { scale: 1.04, duration: 0.4, ease: 'power2.out' })
    void event
  }
  const onMouseLeave = (id: string) => {
    gsap.to(`[data-masonry-id="${id}"] .masonry-item__img`, { scale: 1, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <div ref={containerRef} className="masonry-grid" style={{ height: containerHeight }}>
      {grid.map((item, index) => (
        <div
          key={item.id}
          data-masonry-id={item.id}
          className="masonry-item"
          onClick={() => onSelect(index)}
          onMouseEnter={(event) => onMouseEnter(event, item.id)}
          onMouseLeave={() => onMouseLeave(item.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => { if (event.key === 'Enter') onSelect(index) }}
        >
          <img src={item.img} alt={item.alt} className="masonry-item__img" loading="lazy" />
          {item.overlay}
        </div>
      ))}
    </div>
  )
}
