import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'text'

type CommonProps = {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
  /** Show a directional arrow after the label, matching the site's link convention. */
  arrow?: 'down-right' | 'up-right' | 'none'
}

type AsInternalLink = CommonProps & { to: LinkProps['to']; href?: never } & Omit<LinkProps, 'to' | 'className'>
type AsExternalLink = CommonProps & { href: string; to?: never } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'>
type AsButton = CommonProps & { to?: never; href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

type ButtonProps = AsInternalLink | AsExternalLink | AsButton

const arrowGlyph = { 'down-right': '↘', 'up-right': '↗', none: '' }

export const Button = ({ variant = 'primary', className = '', arrow = 'none', children, ...props }: ButtonProps) => {
  const classes = `button button--${variant} ${className}`.trim()
  const glyph = arrow !== 'none' && <span className="button__arrow" aria-hidden="true">{arrowGlyph[arrow]}</span>

  if ('to' in props && props.to !== undefined) {
    const { to, ...rest } = props as Omit<AsInternalLink, keyof CommonProps>
    return (
      <Link to={to} className={classes} {...rest}>
        {children}{glyph}
      </Link>
    )
  }

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as Omit<AsExternalLink, keyof CommonProps>
    const isExternal = href.startsWith('http')
    return (
      <a href={href} className={classes} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined} {...rest}>
        {children}{glyph}
      </a>
    )
  }

  const rest = props as Omit<AsButton, keyof CommonProps>
  return (
    <button type="button" className={classes} {...rest}>
      {children}{glyph}
    </button>
  )
}
