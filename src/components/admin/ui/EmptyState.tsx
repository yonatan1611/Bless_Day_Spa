import type { ReactNode } from 'react'

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) => (
  <div className="adm-empty">
    {icon}
    <div>
      <p className="adm-empty__title">{title}</p>
      <p>{description}</p>
    </div>
    {action}
  </div>
)
