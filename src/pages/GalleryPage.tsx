import { useState, type MouseEvent } from 'react'
import { PageContainer, Section } from '../components/layout/Primitives'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Lightbox } from '../components/ui/Lightbox'
import { Masonry, type MasonryItem } from '../components/react-bits/Masonry'
import { Stack } from '../components/react-bits/Stack'
import { ScrollFloat } from '../components/react-bits/ScrollFloat'
import { GradientText } from '../components/react-bits/GradientText'
import { ClickSpark } from '../components/react-bits/ClickSpark'
import { ChromaGrid, type ChromaItem } from '../components/react-bits/ChromaGrid'
import { galleryImages, treatmentImages } from '../content/images'
import { services } from '../content/services'
import { business } from '../content/business'
import { usePageTitle } from '../hooks/usePageTitle'

const roomImages: Record<string, string> = {
  massage: treatmentImages.massage,
  'moroccan-bath': treatmentImages.moroccanBath,
  'steam-sauna': treatmentImages.steamSauna,
  'hair-salon': treatmentImages.hairSalon,
  facials: treatmentImages.facials,
  'nail-care': treatmentImages.nailCare,
}

const rooms: ChromaItem[] = services.map((service) => ({
  image: roomImages[service.slug],
  title: service.title,
  subtitle: service.description,
  category: 'Treatment',
  to: `/treatments/${service.slug}`,
}))

// Follows the cursor with a "View" pill (desktop only, see the
// @media (hover: hover) gate on .masonry-item__view-label in global.css).
const onItemMove = (event: MouseEvent<HTMLDivElement>) => {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--cursor-x', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--cursor-y', `${event.clientY - rect.top}px`)
}

// aspect is width/height (not a CSS "w / h" string) — React Bits' Masonry
// (src/components/react-bits/Masonry.tsx) computes each tile's height from
// this before any image has loaded, so the grid never reflows as photos
// come in.
const shots = [
  { src: galleryImages.corridor, alt: 'A sunlit column between two treatment lounges at Bless Day Spa', caption: 'Between the lounges', aspect: 5 / 4, featured: false },
  { src: galleryImages.skincare, alt: 'Deep tissue massage at Bless Day Spa', caption: 'Deep tissue massage', aspect: 10 / 9, featured: true },
  { src: galleryImages.fabric, alt: 'A floor-mattress treatment room at Bless Day Spa', caption: 'A treatment room', aspect: 4 / 3, featured: true },
  { src: galleryImages.salonCorner, alt: 'The chandelier and sofa nook in the hair salon at Bless Day Spa', caption: 'The hair salon', aspect: 5 / 8, featured: false },
  { src: galleryImages.sandstone, alt: 'Sandstone-toned tile in the Moroccan bath room at Bless Day Spa', caption: 'The Moroccan bath room', aspect: 2 / 3, featured: false },
  { src: galleryImages.roseDetail, alt: 'Roses and rolled towels on a row of treatment beds at Bless Day Spa', caption: 'A quiet detail', aspect: 21 / 10, featured: false },
  { src: galleryImages.towel, alt: 'Hot stone massage at Bless Day Spa', caption: 'Hot stone massage', aspect: 3 / 4, featured: true },
]

// Three photos, for a quick drag-to-browse stack up top — before the full
// archive below.
const realShots = shots.filter((shot) => shot.featured)

export const GalleryPage = () => {
  usePageTitle('Gallery')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items: MasonryItem[] = shots.map((shot, index) => ({
    id: String(index),
    img: shot.src,
    alt: shot.alt,
    aspect: shot.aspect,
    overlay: (
      <div className="masonry-item__overlay" onMouseMove={onItemMove}>
        <span className="masonry-item__caption">{shot.caption}</span>
        <span className="masonry-item__view-label" aria-hidden="true">View</span>
      </div>
    ),
  }))

  return (
    <main id="main-content">
      <Section padding="top" className="page-intro">
        <PageContainer narrow>
          <p className="eyebrow"><GradientText>Gallery</GradientText></p>
          <ScrollFloat tag="h2" className="display-lg">A closer look at the atmosphere.</ScrollFloat>
          <p className="body-lg">
            Real Bless Day Spa photography — textures, treatment rooms, and quiet details.
            Select any image for a closer look.
          </p>
        </PageContainer>
      </Section>

      <Section aria-label="A quick browse" className="gallery-stack-section">
        <PageContainer narrow className="gallery-stack-section__row">
          <div className="gallery-stack-section__stage">
            <Stack
              items={realShots.map((shot, index) => ({
                id: String(index),
                content: <img src={shot.src} alt={shot.alt} className="stack__card-image" />,
              }))}
            />
          </div>
          <div className="gallery-stack-section__copy">
            <p className="eyebrow">Real moments</p>
            <p className="body-lg">Drag a photo away to see the next one — three real corners of {business.name}.</p>
          </div>
        </PageContainer>
      </Section>

      <Section padding="bottom">
        <PageContainer>
          <Masonry items={items} onSelect={setOpenIndex} />
        </PageContainer>
      </Section>

      <Section aria-labelledby="gallery-rooms-title">
        <PageContainer>
          <Reveal>
            <p className="eyebrow">Explore by room</p>
            <h2 id="gallery-rooms-title" className="display-md">See where each treatment happens.</h2>
          </Reveal>
          <Reveal delay={120}>
            <ChromaGrid items={rooms} className="gallery-rooms" />
          </Reveal>
        </PageContainer>
      </Section>

      <Section className="section--inverse gallery-cta" aria-labelledby="gallery-cta-title">
        <PageContainer narrow>
          <p className="eyebrow">Seen enough?</p>
          <h2 id="gallery-cta-title" className="display-lg">Come see it in person.</h2>
          <ClickSpark>
            <Button to="/book" variant="primary" arrow="down-right">Book Appointment</Button>
          </ClickSpark>
        </PageContainer>
      </Section>

      {openIndex !== null && (
        <Lightbox images={shots} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      )}
    </main>
  )
}
