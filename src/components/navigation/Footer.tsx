import { PageContainer } from '../layout/Primitives'
import { business } from '../../content/business'

const linkColumns = [
  {
    heading: 'Explore',
    links: [
      { label: 'Treatments', to: '/treatments' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Reviews', to: '/reviews' },
      { label: 'About', to: '/about' },
    ],
  },
  {
    heading: 'Visit',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Open in Google Maps', to: business.mapUrl, external: true },
      { label: 'Book Appointment', to: '/book' },
    ],
  },
  {
    heading: 'Reach us',
    links: [
      { label: `Call ${business.phoneDisplay}`, to: `tel:${business.phone}`, external: true },
      { label: 'Message on Facebook', to: business.messengerUrl, external: true },
      { label: 'Instagram', to: business.instagramUrl, external: true },
      { label: 'TikTok', to: business.tiktokUrl, external: true },
    ],
  },
]

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <PageContainer>
        <div className="footer__statement">
          <p className="eyebrow">Visit us</p>
          <h2 className="footer__headline">{business.name}</h2>
        </div>

        <div className="footer__nav">
          {linkColumns.map((column) => (
            <div key={column.heading} className="footer__nav-column">
              <p className="footer__nav-heading">{column.heading}</p>
              <ul className="footer__nav-list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.to} target={link.to.startsWith('http') ? '_blank' : undefined} rel={link.to.startsWith('http') ? 'noreferrer' : undefined}>
                        {link.label}
                      </a>
                    ) : (
                      <a href={link.to}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__visit">
          <div>
            <p className="body-sm footer__address">
              {business.areaDescription}
              <br />
              {business.landmark}
              <br />
              {business.city}
            </p>
            <p className="body-sm footer__muted">{business.hours.label}</p>
            <a className="body-sm footer__address" href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
          </div>
          <a href="/" aria-label="Bless Day Spa home" className="footer__brand-mark-link">
            <img src="/images/brand/bless-mark.png" alt="" aria-hidden="true" className="footer__brand-mark" />
          </a>
        </div>

        <div className="footer__bottom">
          <p className="body-sm footer__muted">&copy; {year} {business.name}. {business.city}.</p>
        </div>
      </PageContainer>
    </footer>
  )
}
