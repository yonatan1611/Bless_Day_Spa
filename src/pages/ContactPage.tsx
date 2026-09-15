import { PageIntro } from '../components/PageIntro'

export function ContactPage() {
  return <main id="main-content">
    <PageIntro eyebrow="Visit & contact" title="Find a little time for yourself."><p>Bless Day Spa is in Wollo Sefer, just off Ethio-China Road in Addis Ababa.</p></PageIntro>
    <section className="contact-layout">
      <div className="contact-route"><p className="eyebrow">Appointments</p><h2>Message the spa directly.</h2><p>Ask about current treatment availability and a convenient appointment time.</p><a className="button" href="https://m.me/blessdayspa" target="_blank" rel="noreferrer">Message on Facebook <span aria-hidden="true">↗</span></a><p className="contact-route__fine-print">Opens the public Bless Day Spa Messenger contact.</p></div>
      <div className="contact-details"><div><span>Location</span><p>Wollo Sefer, just off Ethio-China Road<br />Near Meskel Flower roundabout<br />Addis Ababa, Ethiopia</p></div><div><span>Hours listed</span><p>Daily, 9:30 AM–8:00 PM</p><small>Please confirm availability before visiting.</small></div><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Bless%20Day%20Spa%2C%20Addis%20Ababa" target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a></div>
    </section>
  </main>
}
