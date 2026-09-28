import { useEffect, useRef } from 'react'

type LightboxImage = { src: string; alt: string }

type LightboxProps = {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export const Lightbox = ({ images, index, onClose, onNavigate }: LightboxProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.classList.add('lightbox-open')

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'ArrowRight') onNavigate((index + 1) % images.length)
      else if (event.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
      else if (event.key === 'Tab') {
        const focusable = containerRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('lightbox-open')
    }
  }, [index, images.length, onClose, onNavigate])

  const image = images[index]

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.alt} ref={containerRef}>
      <div className="lightbox__backdrop" aria-hidden="true" onClick={onClose} />

      <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose}>
        <span className="sr-only">Close</span>
        <span aria-hidden="true">✕</span>
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => onNavigate((index - 1 + images.length) % images.length)}
          >
            <span className="sr-only">Previous image</span>
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => onNavigate((index + 1) % images.length)}
          >
            <span className="sr-only">Next image</span>
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}

      <figure className="lightbox__figure">
        <img src={image.src} alt={image.alt} />
        <figcaption className="body-sm">{index + 1} / {images.length}</figcaption>
      </figure>
    </div>
  )
}
