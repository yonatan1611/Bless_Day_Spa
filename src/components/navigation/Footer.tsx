import { Link } from 'react-router-dom'
import { PageContainer } from '../layout/Primitives'
import { business } from '../../content/business'

const links = [
  { label: 'Treatments', to: '/treatments' },
  { label: 'Packages', to: '/packages' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
]

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <PageContainer>
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/images/brand/bless-mark.png" alt="" aria-hidden="true" className="footer__brand-mark" />
            <span className="display-md">{business.name}</span>
            <p className="body-sm footer__muted">{business.servesDescription}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            {links.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </nav>

          <div className="footer__visit">
            <p className="eyebrow">Visit</p>
            <p className="body-sm footer__address">
              {business.areaDescription}
              <br />
              {business.landmark}
              <br />
              {business.city}
            </p>
            <p className="body-sm footer__muted">{business.hours.label}</p>
            <a className="text-link" href={business.messengerUrl} target="_blank" rel="noreferrer">
              Message on Facebook
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="body-sm footer__muted">© {year} {business.name}. {business.city}.</p>
        </div>
      </PageContainer>
    </footer>
  )
}
