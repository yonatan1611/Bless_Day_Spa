import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { PageContainer, Section } from '../layout/Primitives'
import { SectionHeading } from '../layout/SectionHeading'
import { ImageFrame } from '../ui/ImageFrame'
import { Reveal } from '../ui/Reveal'
import { menuCategories } from '../../content/menu'

// The full price list, sourced from Bless Day Spa's own treatment flyers —
// see the sourcing note in content/menu.ts. An interactive tab explorer
// (mirroring TreatmentExplorer's pattern) rather than a long static list, so
// visitors can jump straight to the category they care about. Items with a
// note (currently just wood therapy) expand in place on click.
export const TreatmentMenu = () => {
  const [active, setActive] = useState(0)
  const [openNote, setOpenNote] = useState<string | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const baseId = useId()

  const focusTab = (index: number) => {
    const next = (index + menuCategories.length) % menuCategories.length
    setActive(next)
    setOpenNote(null)
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
      focusTab(menuCategories.length - 1)
    }
  }

  return (
    <Section id="menu" aria-labelledby="menu-title" className="treatment-menu">
      <PageContainer>
        <Reveal>
          <SectionHeading eyebrow="The full menu" title="Every treatment, at a glance." id="menu-title">
            <p className="body-lg">
              Prices are shown as listed by Bless Day Spa. Please confirm current rates when you book.
            </p>
          </SectionHeading>
        </Reveal>

        <Reveal delay={120} className="menu-explorer">
          <div
            className="menu-explorer__tabs"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Menu categories"
            onKeyDown={onKeyDown}
          >
            {menuCategories.map((item, index) => (
              <button
                key={item.slug}
                ref={(el) => { tabRefs.current[index] = el }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={index === active}
                aria-controls={`${baseId}-panel-${index}`}
                tabIndex={index === active ? 0 : -1}
                className={`menu-explorer__tab ${index === active ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => { setActive(index); setOpenNote(null) }}
              >
                <span className="menu-explorer__tab-name">{item.title}</span>
                <span className="menu-explorer__tab-count">{item.items.length} treatments</span>
              </button>
            ))}
          </div>

          <div className="menu-explorer__stage">
            {menuCategories.map((item, index) => (
              <div
                key={item.slug}
                role="tabpanel"
                id={`${baseId}-panel-${index}`}
                aria-labelledby={`${baseId}-tab-${index}`}
                className={`menu-explorer__panel ${index === active ? 'is-active' : ''}`}
                aria-hidden={index !== active}
                inert={index !== active}
              >
                <div className="menu-explorer__media">
                  <ImageFrame variant="service" src={item.image} alt={item.alt} />
                </div>

                <div className="menu-explorer__copy">
                  <p className="body menu-explorer__tagline">{item.tagline}</p>
                  <ul className="menu-list">
                    {item.items.map((menuItem) => {
                      const isOpen = openNote === menuItem.name
                      return (
                        <li key={menuItem.name} className="menu-list__item">
                          {menuItem.note ? (
                            <button
                              type="button"
                              className="menu-list__row menu-list__row--interactive"
                              onClick={() => setOpenNote(isOpen ? null : menuItem.name)}
                              aria-expanded={isOpen}
                            >
                              <span className="menu-list__name">{menuItem.name}</span>
                              {menuItem.price && <span className="menu-list__price">{menuItem.price}</span>}
                              <span className="menu-list__note-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                            </button>
                          ) : (
                            <div className="menu-list__row">
                              <span className="menu-list__name">{menuItem.name}</span>
                              {menuItem.price && <span className="menu-list__price">{menuItem.price}</span>}
                            </div>
                          )}
                          {menuItem.note && isOpen && <p className="menu-list__note">{menuItem.note}</p>}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </PageContainer>
    </Section>
  )
}
