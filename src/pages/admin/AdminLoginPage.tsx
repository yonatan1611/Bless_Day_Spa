import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminApi } from '../../lib/adminApi'
import { usePageTitle } from '../../hooks/usePageTitle'
import { TextField } from '../../components/admin/ui/FormField'
import '../../styles/admin.css'

export const AdminLoginPage = () => {
  usePageTitle('Admin login')
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await adminApi.login(email.trim(), password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="adm adm-auth">
      <div className="adm-auth__card">
        <div className="adm-auth__brand">
          <img src="/images/brand/bless-mark.png" alt="" aria-hidden="true" className="adm-brand__mark" />
          <div>
            <h1>Admin sign in</h1>
            <p className="adm-field__hint">Bless Day Spa</p>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <TextField
            label="Email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="adm-field__error" role="alert">{error}</p>}
          <button type="submit" className="adm-btn adm-btn--primary" disabled={submitting} style={{ width: '100%', marginTop: '0.25rem' }}>
            {submitting ? <span className="adm-spinner" aria-hidden="true" /> : null}
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
