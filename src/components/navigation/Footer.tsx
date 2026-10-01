import { PageContainer } from '../layout/Primitives'
import { CardNav, type CardNavGroup } from '../react-bits/CardNav'
import { Magnet } from '../react-bits/Magnet'
import { GradientText } from '../react-bits/GradientText'
import { business } from '../../content/business'

// A complete rebuild, not a restyle: the old footer's plain link column is
// replaced by an expandable CardNav (React Bits) trigger, and the closing
// line gets an animated gradient instead of static type.
const navGroups: CardNavGroup[] = [
  {
    label: 'Explore',
    bgColor: 'var(--color-sage)',
    textColor: 'var(--color-ivory)',
    links: [
      { label: 'Treatments', to: '/treatments' },
      { label: 'Packages', to: '/packages' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Reviews', to: '/reviews' },
    ],
  },
  {
    label: 'Visit',
    bgColor: 'var(--color-clay)',
    textColor: 'var(--color-ivory)',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Open in Google Maps', to: business.mapUrl, external: true },
    ],
  },
  {
    label: 'Connect',
    bgColor: 'var(--color-charcoal)',
    textColor: 'var(--color-ivory)',
    links: [
      { label: 'Book Appointment', to: '/book' },
      { label: 'Message on Facebook', to: business.messengerUrl, external: true },
    ],
  },
]

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <PageContainer>
        <div className="footer__statement">
          <p className="eyebrow">{business.name}</p>
          <h2 className="footer__headline">
            <GradientText colors={['var(--color-ivory)', 'var(--color-clay)', 'var(--color-ivory)']}>
              Make room for a blessed day.
            </GradientText>
          </h2>
        </div>

        <div className="footer__nav">
          <CardNav items={navGroups} triggerLabel="Explore the site" />
        </div>

        <div className="footer__visit">
          <div>
            <p className="eyebrow">Visit</p>
            <p className="body-sm footer__address">
              {business.areaDescription}
              <br />
              {business.landmark}
              <br />
              {business.city}
            </p>
            <p className="body-sm footer__muted">{business.hours.label}</p>
          </div>
          <Magnet padding={40}>
            <a className="footer__brand-mark-link" href="/" aria-label="Bless Day Spa home">
              <img src="/images/brand/bless-mark.png" alt="" aria-hidden="true" className="footer__brand-mark" />
            </a>
          </Magnet>
        </div>

        <div className="footer__bottom">
          <p className="body-sm footer__muted">© {year} {business.name}. {business.city}.</p>
        </div>
      </PageContainer>
    </footer>
  )
}
