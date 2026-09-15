import { ImageFrame } from '../components/ImageFrame'
import { PageIntro } from '../components/PageIntro'
import { demoImages } from '../content/images'

export function AboutPage() {
  return <main id="main-content">
    <PageIntro eyebrow="About Bless Day Spa" title="Twenty-plus years of time set aside for care."><p>In the movement of Addis Ababa, Bless Day Spa has created a place to step out of the day for a while—welcoming both women and men in Wollo Sefer.</p></PageIntro>
    <section className="about-feature"><ImageFrame src={demoImages.interior} demo alt="Demonstration spa location photography" /><div><p className="eyebrow">A full-service spa</p><h2>Care that meets you where you are.</h2><p>Bless Day Spa brings massage, Moroccan bath, steam and sauna, hair salon care, facials, and wellness therapies together in one calm setting. The focus is simple: give every guest room to relax, reset, and leave feeling restored.</p></div></section>
    <section className="about-story"><div><p className="eyebrow">In Addis Ababa since the beginning</p><h2>Built around the value of feeling looked after.</h2></div><div><p>For more than two decades, Bless Day Spa has served the city with treatments shaped around individual needs. The setting is intentionally calm, the service attentive, and the experience unhurried.</p><p>Whether the visit is for a massage, facial, Moroccan bath, or simply time to recharge, the spa is designed as a welcome pause from the pace outside.</p></div></section>
    <section className="about-facts" aria-label="Business information"><div><span>Established</span><p>20+ years serving<br />Addis Ababa</p></div><div><span>Location</span><p>3, 632 Wollo Sefer<br />Addis Ababa, Ethiopia</p></div><div><span>Hours listed</span><p>Daily<br />9:30 AM–8:00 PM</p></div></section>
    <section className="about-closing"><p>Come for the care. Stay for the quiet.</p><a className="button button--light" href="#/contact?book=1">Plan your visit <span aria-hidden="true">↘</span></a></section>
  </main>
}
