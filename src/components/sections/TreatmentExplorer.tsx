import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PageContainer, Section } from '../layout/Primitives'
import { SectionHeading } from '../layout/SectionHeading'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { TiltedCard } from '../react-bits/TiltedCard'
import { services } from '../../content/services'
import { homepageImages, demoServiceSlugs } from '../../content/images'
import { menuCategories } from '../../content/menu'
import { onSpotlightPointerMove } from '../../lib/spotlight'

const imageByService: Record<string, string> = {
  massage: homepageImages.massage,
  'moroccan-bath': homepageImages.moroccanBath,
  'steam-sauna': homepageImages.steamSauna,
  'hair-salon': homepageImages.hairSalon,
  facials: homepageImages.facials,
  'nail-care': homepageImages.nailCare,
}

// The explorer's broad categories map onto the real, flyer-sourced
// menu categories in content/menu.ts so we can surface an honest "from"
// price here — never a fabricated one.
const menuSlugByService: Record<string, string> = {
  massage: 'massage',
  'moroccan-bath': 'moroccan-bath',
  'steam-sauna': 'steam-sauna',
  'hair-salon': 'hair-and-beauty',
  facials: 'facials',
  'nail-care': 'nail-care',
}

const startingPriceByService: Record<string, string | undefined> = Object.fromEntries(
  Object.entries(menuSlugByService).map(([serviceSlug, menuSlug]) => {
    const category = menuCategories.find((c) => c.slug === menuSlug)
    const priced = category?.items.find((item) => item.price)
    return [serviceSlug, priced?.price]
  }),
)

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
            <p className="body-lg">Six ways to spend a little longer with yourself. Select one to look closer.</p>
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
                onMouseMove={onSpotlightPointerMove}
              >
                <span className="explorer__tab-spotlight" aria-hidden="true" />
                <span className="explorer__tab-number" aria-hidden="true">0{index + 1}</span>
                <span className="explorer__tab-name">{service.title}</span>
                {startingPriceByService[service.slug] && (
                  <span className="explorer__tab-price">from {startingPriceByService[service.slug]}</span>
                )}
              </button>
            ))}
          </div>

          <div className="explorer__stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={services[active].slug}
                role="tabpanel"
                id={`${baseId}-panel-${active}`}
                aria-labelledby={`${baseId}-tab-${active}`}
                className="explorer__panel"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="explorer__panel-media">
                  <TiltedCard
                    imageSrc={imageByService[services[active].slug]}
                    altText={
                      demoServiceSlugs.has(services[active].slug)
                        ? `Demonstration ${services[active].title.toLowerCase()} photography`
                        : `${services[active].title} at Bless Day Spa`
                    }
                    captionText={services[active].title}
                  />
                </div>
                <div className="explorer__copy">
                  <h3 className="display-md">{services[active].title}</h3>
                  <p className="body">{services[active].description}</p>
                  <p className="body-sm explorer__note">{services[active].note}</p>
                  <div className="explorer__actions">
                    <Button to={`/treatments/${services[active].slug}`} variant="secondary" arrow="up-right">View treatment</Button>
                    <Button to="/book" variant="primary" arrow="down-right">Book now</Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </PageContainer>
    </Section>
  )
}
