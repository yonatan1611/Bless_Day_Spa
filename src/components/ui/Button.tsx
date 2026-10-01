import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { Magnet } from '../react-bits/Magnet'

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

  let element: ReactNode
  if ('to' in props && props.to !== undefined) {
    const { to, ...rest } = props as Omit<AsInternalLink, keyof CommonProps>
    element = <Link to={to} className={classes} {...rest}>{children}{glyph}</Link>
  } else if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as Omit<AsExternalLink, keyof CommonProps>
    const isExternal = href.startsWith('http')
    element = (
      <a href={href} className={classes} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined} {...rest}>
        {children}{glyph}
      </a>
    )
  } else {
    const rest = props as Omit<AsButton, keyof CommonProps>
    element = <button type="button" className={classes} {...rest}>{children}{glyph}</button>
  }

  // Magnetic pull (React Bits' Magnet, see react-bits/Magnet.tsx) reserved
  // for primary CTAs, so it stays a signature moment rather than a default.
  return variant === 'primary' ? <Magnet className="button-magnet">{element}</Magnet> : element
}
