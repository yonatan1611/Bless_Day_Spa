import { PageIntro } from '../components/PageIntro'
import { services } from '../content/services'

export function ServicesPage() {
  return <>
    <PageIntro eyebrow="Treatments" title="Time, set aside with care."><p>Bless Day Spa lists massage, Moroccan bath, steam & sauna, and hair salon services. Details are confirmed directly with the spa.</p></PageIntro>
    <main className="service-index" id="main-content">
      <ol>
        {services.map((service, index) => <li key={service.slug}>
          <a href={`#/services/${service.slug}`}><span>0{index + 1}</span><div><h2>{service.title}</h2><p>{service.description}</p></div><b aria-hidden="true">↘</b></a>
        </li>)}
      </ol>
      <aside className="information-note"><p className="eyebrow">Before your visit</p><p>There are no published treatment prices or durations in the verified sources. Message the spa to discuss what you need.</p><a className="text-link" href="#/contact?book=1">Request an appointment <span aria-hidden="true">↘</span></a></aside>
    </main>
  </>
}
