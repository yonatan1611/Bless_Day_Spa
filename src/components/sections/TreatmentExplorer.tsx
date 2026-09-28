import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { PageContainer, Section } from '../layout/Primitives'
import { SectionHeading } from '../layout/SectionHeading'
import { ImageFrame } from '../ui/ImageFrame'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { services } from '../../content/services'
import { homepageImages, demoServiceSlugs } from '../../content/images'

const imageByService: Record<string, string> = {
  massage: homepageImages.massage,
  'moroccan-bath': homepageImages.moroccanBath,
  'steam-sauna': homepageImages.steamSauna,
  'hair-salon': homepageImages.hairSalon,
}

export const TreatmentExplorer = () => {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const baseId = useId()

  const focusTab = (index: number) => {
    const next = (index + services.length) % services.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      focusTab(active + 1)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      focusTab(active - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusTab(services.length - 1)
    }
  }

  return (
    <Section aria-labelledby="explorer-title" className="explorer-section">
      <PageContainer>
        <Reveal>
          <SectionHeading eyebrow="At the spa" title="Choose the time you need." id="explorer-title">
            <p className="body-lg">Four ways to spend a little longer with yourself. Select one to look closer.</p>
          </SectionHeading>
        </Reveal>

        <Reveal delay={120} className="explorer">
          <div
            className="explorer__list"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Treatments"
            onKeyDown={onKeyDown}
          >
            {services.map((service, index) => (
              <button
                key={service.slug}
                ref={(el) => { tabRefs.current[index] = el }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={index === active}
                aria-controls={`${baseId}-panel-${index}`}
                tabIndex={index === active ? 0 : -1}
                className={`explorer__tab ${index === active ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="explorer__tab-number" aria-hidden="true">0{index + 1}</span>
                <span className="explorer__tab-name">{service.title}</span>
              </button>
            ))}
          </div>

          <div className="explorer__stage">
            {services.map((service, index) => (
              <div
                key={service.slug}
                role="tabpanel"
                id={`${baseId}-panel-${index}`}
                aria-labelledby={`${baseId}-tab-${index}`}
                className={`explorer__panel ${index === active ? 'is-active' : ''}`}
                aria-hidden={index !== active}
                inert={index !== active}
              >
                <ImageFrame
                  variant="service"
                  src={imageByService[service.slug]}
                  demo={demoServiceSlugs.has(service.slug)}
                  alt={
                    demoServiceSlugs.has(service.slug)
                      ? `Demonstration ${service.title.toLowerCase()} photography`
                      : `${service.title} at Bless Day Spa`
                  }
                />
                <div className="explorer__copy">
                  <h3 className="display-md">{service.title}</h3>
                  <p className="body">{service.description}</p>
                  <p className="body-sm explorer__note">{service.note}</p>
                  <div className="explorer__actions">
                    <Button to={`/treatments/${service.slug}`} variant="secondary" arrow="up-right">View treatment</Button>
                    <Button to="/book" variant="primary" arrow="down-right">Book now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </PageContainer>
    </Section>
  )
}
