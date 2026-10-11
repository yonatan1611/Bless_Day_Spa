import { useEffect, useRef } from 'react'

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  busy?: boolean
  onConfirm: () => void
  onCancel: () => void
}

// Real <dialog> (top layer, never clipped by an ancestor) replacing
// window.confirm — matches the browser's own focus-trap and Esc-to-close.
export const ConfirmDialog = ({ open, title, description, confirmLabel = 'Delete', busy, onConfirm, onCancel }: ConfirmDialogProps) => {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog ref={ref} className="adm-dialog" onCancel={onCancel} onClose={onCancel}>
      <div className="adm-dialog__body">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="adm-dialog__footer">
        <button type="button" className="adm-btn" onClick={onCancel} disabled={busy}>Cancel</button>
        <button type="button" className="adm-btn adm-btn--danger" onClick={onConfirm} disabled={busy}>
          {busy ? <span className="adm-spinner" aria-hidden="true" /> : null}
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}
