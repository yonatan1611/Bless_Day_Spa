import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ListTree, Menu as MenuIcon, ChevronDown, KeyRound, LogOut } from 'lucide-react'
import '../../styles/admin.css'
import { adminApi, type AdminUser } from '../../lib/adminApi'
import { SlideOver } from './ui/SlideOver'
import { TextField } from './ui/FormField'
import { ToastProvider, useToast } from './ui/Toast'

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/menu', label: 'Menu', icon: ListTree, end: false },
]

const initials = (email: string) => email.slice(0, 2).toUpperCase()

const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
  <nav className="adm-nav">
    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        onClick={onNavigate}
        className={({ isActive }) => `adm-nav__item ${isActive ? 'is-active' : ''}`}
      >
        <item.icon strokeWidth={2} aria-hidden="true" />
        {item.label}
      </NavLink>
    ))}
  </nav>
)

const Brand = () => (
  <div className="adm-brand">
    <img src="/images/brand/bless-mark.png" alt="" aria-hidden="true" className="adm-brand__mark" />
    <span>
      <span className="adm-brand__name" style={{ display: 'block' }}>Bless Day Spa</span>
      <span className="adm-brand__sub">Admin</span>
    </span>
  </div>
)

const ChangePasswordPanel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const toast = useToast()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await adminApi.changePassword(currentPassword, newPassword)
      toast.success('Password updated.')
      setCurrentPassword('')
      setNewPassword('')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not change the password.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <SlideOver
      open={open}
      onClose={onClose}
      title="Change password"
      footer={
        <>
          <button type="button" className="adm-btn" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" form="change-password-form" className="adm-btn adm-btn--primary" disabled={saving}>
            {saving ? <span className="adm-spinner" aria-hidden="true" /> : null}
            Save password
          </button>
        </>
      }
    >
      <form id="change-password-form" className="adm-form-grid" onSubmit={submit}>
        <TextField
          label="Current password"
          type="password"
          required
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          label="New password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          hint="At least 8 characters."
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {error && <p className="adm-field__error">{error}</p>}
      </form>
    </SlideOver>
  )
}

const AccountMenu = ({ admin }: { admin: AdminUser }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const logout = async () => {
    await adminApi.logout().catch(() => {})
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className={`adm-account ${open ? 'is-open' : ''}`} ref={ref}>
      <button type="button" onClick={() => setOpen((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-expanded={open}>
        <span className="adm-account__avatar">{initials(admin.email)}</span>
        <span className="adm-account__email">{admin.email}</span>
        <ChevronDown strokeWidth={2} size={14} aria-hidden="true" />
      </button>
      {open && (
        <div className="adm-account__menu" role="menu">
          <button type="button" className="adm-account__menu-item" role="menuitem" onClick={() => { setOpen(false); setPasswordOpen(true) }}>
            <KeyRound strokeWidth={2} size={14} style={{ marginRight: '0.5rem', verticalAlign: '-2px' }} aria-hidden="true" />
            Change password
          </button>
          <div className="adm-account__menu-divider" />
          <button type="button" className="adm-account__menu-item adm-account__menu-item--danger" role="menuitem" onClick={logout}>
            <LogOut strokeWidth={2} size={14} style={{ marginRight: '0.5rem', verticalAlign: '-2px' }} aria-hidden="true" />
            Log out
          </button>
        </div>
      )}
      <ChangePasswordPanel open={passwordOpen} onClose={() => setPasswordOpen(false)} />
    </div>
  )
}

type AdminLayoutProps = { admin: AdminUser; title: string; children: ReactNode }

const AdminLayoutInner = ({ admin, title, children }: AdminLayoutProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="adm">
      <div className="adm-shell">
        <aside className="adm-sidebar">
          <Brand />
          <NavList />
        </aside>

        <div className="adm-main">
          <header className="adm-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button type="button" className="adm-btn adm-btn--icon adm-btn--ghost adm-topbar__menu-btn" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
                <MenuIcon strokeWidth={2} aria-hidden="true" />
              </button>
              <h1 className="adm-topbar__title">{title}</h1>
            </div>
            <AccountMenu admin={admin} />
          </header>
          <main className="adm-content">{children}</main>
        </div>
      </div>

      <SlideOver open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} title="Menu" side="left">
        <NavList onNavigate={() => setMobileNavOpen(false)} />
      </SlideOver>
    </div>
  )
}

export const AdminLayout = (props: AdminLayoutProps) => (
  <ToastProvider>
    <AdminLayoutInner {...props} />
  </ToastProvider>
)
