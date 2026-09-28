import type { ElementType, ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  className?: string
  /** Narrower measure for text-heavy content instead of the full grid width. */
  narrow?: boolean
}

export const PageContainer = ({ children, className = '', narrow = false }: PageContainerProps) => (
  <div className={`container ${narrow ? 'container--narrow' : ''} ${className}`.trim()}>{children}</div>
)

type SectionProps = {
  children: ReactNode
  className?: string
  padding?: 'top' | 'bottom' | 'both' | 'none'
  id?: string
  as?: ElementType
  'aria-labelledby'?: string
  'aria-label'?: string
}

export const Section = ({
  children,
  className = '',
  padding = 'both',
  id,
  as: Tag = 'section',
  ...aria
}: SectionProps) => {
  const paddingClass = padding === 'none' ? '' : `section-padding--${padding}`
  return (
    <Tag id={id} className={`section ${paddingClass} ${className}`.trim()} {...aria}>
      {children}
    </Tag>
  )
}

type StackProps = {
  children: ReactNode
  className?: string
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const Stack = ({ children, className = '', gap = 'md', align = 'stretch' }: StackProps) => (
  <div className={`stack stack--${gap} stack--${align} ${className}`.trim()}>{children}</div>
)

type GridProps = {
  children: ReactNode
  className?: string
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

export const Grid = ({ children, className = '', columns = 2, gap = 'md' }: GridProps) => (
  <div className={`grid grid--${columns} grid-gap--${gap} ${className}`.trim()}>{children}</div>
)

export const Divider = ({ className = '' }: { className?: string }) => (
  <hr className={`divider ${className}`.trim()} />
)
