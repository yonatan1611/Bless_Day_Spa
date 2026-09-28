import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  /** Renders the title as the page's single h1 instead of an h2. Use once per page. */
  level?: 1 | 2
  children?: ReactNode
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export const SectionHeading = ({
  eyebrow,
  title,
  level = 2,
  children,
  align = 'left',
  className = '',
  id,
}: SectionHeadingProps) => {
  const Heading = level === 1 ? 'h1' : 'h2'
  const headingClass = level === 1 ? 'display-lg' : 'display-md'
  return (
    <div className={`section-heading section-heading--${align} ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading id={id} className={headingClass}>{title}</Heading>
      {children && <div className="section-heading__body">{children}</div>}
    </div>
  )
}
