import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { adminApi, type AdminUser } from '../../lib/adminApi'
import '../../styles/admin.css'

// Client-side gate for /admin routes — UX only. The actual security
// boundary is requireAdmin() on every server mutation (api/_lib/auth.ts);
// this just avoids flashing the dashboard before we know the session cookie
// is valid, and redirects to /admin/login when it isn't.
type Status = { state: 'checking' } | { state: 'authed'; admin: AdminUser } | { state: 'anonymous' }

export const RequireAdmin = ({ children }: { children: (admin: AdminUser) => ReactNode }) => {
  const [status, setStatus] = useState<Status>({ state: 'checking' })

  useEffect(() => {
    let cancelled = false
    adminApi
      .me()
      .then((admin) => {
        if (!cancelled) setStatus({ state: 'authed', admin })
      })
      .catch(() => {
        if (!cancelled) setStatus({ state: 'anonymous' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (status.state === 'checking') {
    return (
      <div className="adm adm-loading-screen" role="status">
        <span className="adm-spinner" aria-hidden="true" style={{ marginRight: '0.5rem' }} />
        Checking session…
      </div>
    )
  }
  if (status.state === 'anonymous') {
    return <Navigate to="/admin/login" replace />
  }
  return <>{children(status.admin)}</>
}
