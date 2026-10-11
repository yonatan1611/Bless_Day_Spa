type BadgeTone = 'neutral' | 'success' | 'warning'

export const Badge = ({ tone = 'neutral', children }: { tone?: BadgeTone; children: React.ReactNode }) => (
  <span className={`adm-badge adm-badge--${tone}`}>
    <span className="adm-badge__dot" aria-hidden="true" />
    {children}
  </span>
)
