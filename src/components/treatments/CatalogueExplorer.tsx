import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Button } from '../ui/Button'
import { services } from '../../content/services'
import { treatmentImages } from '../../content/images'

const imageByService: Record<string, string> = {
  massage: treatmentImages.massage,
  'moroccan-bath': treatmentImages.moroccanBath,
  'steam-sauna': treatmentImages.steamSauna,
  'hair-salon': treatmentImages.hairSalon,
}

// A full-bleed image switcher: the background crossfades to match whichever
// treatment is selected, with the list and the description layered over it.
// Deliberately a different composition from the homepage's side-by-side
// tab panel — this one is meant to feel like stepping into the catalogue.
export const CatalogueExplorer = () => {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const baseId = useId()
  const service = services[active]

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
    <div className="catalogue">
      <div className="catalogue__frame">
        {services.map((item, index) => (
          <img
            key={item.slug}
            src={imageByService[item.slug]}
            alt=""
            aria-hidden="true"
            className={`catalogue__image ${index === active ? 'is-active' : ''}`}
          />
        ))}
        <div className="catalogue__scrim" aria-hidden="true" />

        <nav
          className="catalogue__nav"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Treatment categories"
          onKeyDown={onKeyDown}
        >
          {services.map((item, index) => (
            <button
              key={item.slug}
              ref={(el) => { tabRefs.current[index] = el }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={index === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={index === active ? 0 : -1}
              className={`catalogue__nav-item ${index === active ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              {item.title}
            </button>
          ))}
        </nav>

        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} className="catalogue__info">
          <p className="eyebrow catalogue__eyebrow">Treatment</p>
          <h2 className="catalogue__title">{service.title}</h2>
          <p className="body catalogue__description">{service.description}</p>
          <div className="catalogue__actions">
            <Button to={`/treatments/${service.slug}`} variant="secondary" arrow="up-right">View treatment</Button>
            <Button to={`/book?service=${service.slug}`} variant="primary" arrow="down-right">Book now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
