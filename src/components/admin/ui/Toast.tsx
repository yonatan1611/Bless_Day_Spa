import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'

type Toast = { id: number; tone: 'success' | 'error'; message: string }
type ToastContextValue = { show: (tone: Toast['tone'], message: string) => void }

const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return {
    success: (message: string) => ctx.show('success', message),
    error: (message: string) => ctx.show('error', message),
  }
}

const TOAST_LIFETIME_MS = 4000

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)

  const show = useCallback((tone: Toast['tone'], message: string) => {
    const id = nextId.current++
    setToasts((current) => [...current, { id, tone, message }])
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, TOAST_LIFETIME_MS)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="adm-toasts" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`adm-toast adm-toast-enter ${toast.tone === 'error' ? 'adm-toast--error' : ''}`} role="status">
            {toast.tone === 'success' ? <CheckCircle2 strokeWidth={2} aria-hidden="true" /> : <AlertCircle strokeWidth={2} aria-hidden="true" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
