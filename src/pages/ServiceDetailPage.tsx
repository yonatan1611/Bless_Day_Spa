import { ImageFrame } from '../components/ImageFrame'
import { getService, services } from '../content/services'
import { demoImages } from '../content/images'

export function ServiceDetailPage({ slug }: { slug?: string }) {
  const service = getService(slug)
  if (!service) return <main className="not-found" id="main-content"><p className="eyebrow">Not found</p><h1>This treatment page is not available.</h1><a className="button" href="#/services">View services</a></main>
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 2)
  const imageByService = { massage: demoImages.massage, 'moroccan-bath': demoImages.bath, 'steam-sauna': demoImages.steam, 'hair-salon': demoImages.salon } as const
  return <main id="main-content">
    <article className="service-detail">
      <div className="service-detail__top"><p className="eyebrow">Bless Day Spa · Services</p><h1>{service.title}</h1><p>{service.detail}</p><a className="button" href="#/contact?book=1">Ask about this service <span aria-hidden="true">↘</span></a></div>
      <ImageFrame className="service-detail__image" src={imageByService[service.slug]} demo alt={`Demonstration ${service.title.toLowerCase()} photography`} />
      <div className="service-detail__information"><span>Important information</span><p>{service.note}</p></div>
    </article>
    <section className="related-services" aria-labelledby="related-title"><p className="eyebrow">Explore more</p><h2 id="related-title">Other ways to spend your time.</h2><div>{related.map((item) => <a key={item.slug} href={`#/services/${item.slug}`}>{item.title} <span aria-hidden="true">↗</span></a>)}</div></section>
  </main>
}
