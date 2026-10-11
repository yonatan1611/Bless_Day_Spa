import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

type SlideOverProps = {
  open: boolean
  onClose: () => void
  title: string
  side?: 'left' | 'right'
  children: ReactNode
  footer?: ReactNode
}

// Portaled so it escapes the content column's layout (operate.md: overlays
// must not get clipped by an ancestor). Right side for forms, left side for
// the mobile nav drawer.
export const SlideOver = ({ open, onClose, title, side = 'right', children, footer }: SlideOverProps) => {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <>
      <div className="adm-overlay adm-fade-enter" onClick={onClose} aria-hidden="true" />
      <div
        className={`adm-slideover adm-slideover--${side} ${side === 'right' ? 'adm-slide-enter-right' : 'adm-slide-enter-left'}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="adm-slideover__header">
          <h2>{title}</h2>
          <button type="button" className="adm-btn adm-btn--icon adm-btn--ghost" onClick={onClose} aria-label="Close">
            <X strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        <div className="adm-slideover__body">{children}</div>
        {footer && <div className="adm-slideover__footer">{footer}</div>}
      </div>
    </>,
    document.body,
  )
}
