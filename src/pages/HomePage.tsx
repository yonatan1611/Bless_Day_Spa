import { ImageFrame } from '../components/ImageFrame'
import { demoImages } from '../content/images'

const services = ['Massage', 'Moroccan bath', 'Steam & sauna', 'Hair salon']

export function HomePage() {
  return (
    <div id="top">
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow">Wollo Sefer · Addis Ababa</p>
            <h1 id="hero-title">Make room for a <em>blessed</em> day.</h1>
            <p className="hero__intro">A full-service day spa for women and men, in the heart of Wollo Sefer.</p>
            <div className="hero__actions">
              <a className="button button--light" href="#/contact?book=1">Request an appointment <span aria-hidden="true">↘</span></a>
              <a className="text-link" href="#/?section=visit">Find us <span aria-hidden="true">↘</span></a>
            </div>
          </div>
          <ImageFrame className="hero__image" src={demoImages.hero} demo alt="Demonstration spa interior photography" caption="Wollo Sefer · Addis Ababa" />
        </section>

        <section className="introduction content-grid" aria-labelledby="introduction-title">
          <p className="eyebrow">Bless Day Spa</p>
          <div>
            <h2 id="introduction-title">A pause in the city, made practical.</h2>
            <p className="introduction__body">Set just off Ethio-China Road, Bless Day Spa brings together the rituals of a Moroccan bath with massage, steam and sauna, and salon care—so your time can be spent in one calm place.</p>
          </div>
        </section>

        <section className="services" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">At the spa</p>
            <h2 id="services-title">Choose the time you need.</h2>
            <p>Four ways to spend a little longer with yourself.</p>
          </div>
          <ul className="service-list">
            {services.map((service, index) => (
              <li key={service}><span>0{index + 1}</span>{service}</li>
            ))}
          </ul>
          <div className="services__foot">
            <p>Treatment details and appointment availability are confirmed directly with the spa.</p>
            <a className="text-link text-link--light" href="#/contact?book=1">Ask about an appointment <span aria-hidden="true">↘</span></a>
          </div>
        </section>

        <section className="space" id="space" aria-labelledby="space-title">
          <div className="space__images" aria-label="Bless Day Spa imagery area">
            <ImageFrame className="space__image space__image--large" src={demoImages.interior} demo alt="Demonstration treatment-space photography" />
            <ImageFrame className="space__image space__image--small" src={demoImages.detail} demo alt="Demonstration spa detail photography" />
          </div>
          <div className="space__copy">
            <p className="eyebrow">The setting</p>
            <h2 id="space-title">Quietly looked after.</h2>
            <p>Recent guests describe Bless Day Spa as tranquil, clean, and professional. The atmosphere is part of the reason to make the visit—not an afterthought.</p>
            <p className="space__source">Based on guest reviews on Tripadvisor, including a review published April 2025.</p>
          </div>
        </section>

        <section className="visit" id="visit" aria-labelledby="visit-title">
          <div>
            <p className="eyebrow">Visit Bless Day Spa</p>
            <h2 id="visit-title">In Wollo Sefer, just off Ethio-China Road.</h2>
          </div>
          <div className="visit__detail">
            <p>Near the Meskel Flower roundabout<br />Addis Ababa, Ethiopia</p>
            <a className="button" href="https://www.google.com/maps/search/?api=1&query=Bless%20Day%20Spa%2C%20Addis%20Ababa" target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>
            <p className="visit__hours"><span>Listing hours</span>Daily, 9:30 AM–8:00 PM</p>
            <p className="visit__fine-print">Hours shown in public business listings. Please confirm availability before visiting.</p>
          </div>
        </section>

        <section className="booking" id="booking" aria-labelledby="booking-title">
          <p className="eyebrow">Appointments</p>
          <h2 id="booking-title">Ready when you are.</h2>
          <p>Send the spa a message to ask about an available time and treatment.</p>
          <a className="button button--light" href="https://m.me/blessdayspa" target="_blank" rel="noreferrer">Message Bless Day Spa <span aria-hidden="true">↗</span></a>
          <p className="booking__fine-print">This opens the business’s public Facebook Messenger contact.</p>
        </section>
      </main>
    </div>
  )
}
