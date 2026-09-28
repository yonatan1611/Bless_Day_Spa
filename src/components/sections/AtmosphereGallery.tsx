import { useState } from 'react'
import { PageContainer, Section } from '../layout/Primitives'
import { SectionHeading } from '../layout/SectionHeading'
import { ImageFrame } from '../ui/ImageFrame'
import { Lightbox } from '../ui/Lightbox'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { homepageImages } from '../../content/images'

const shots = [
  { src: homepageImages.galleryLarge, alt: 'A relaxation room at Bless Day Spa', className: 'atmosphere-gallery__large' },
  { src: homepageImages.galleryLeaf, alt: 'A floral detail at Bless Day Spa' },
  { src: homepageImages.galleryWater, alt: 'Rose petals arranged on a treatment bed at Bless Day Spa' },
]

export const AtmosphereGallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section aria-labelledby="atmosphere-title">
      <PageContainer>
        <Reveal>
          <SectionHeading eyebrow="The setting" title="Quietly looked after." id="atmosphere-title">
            <p className="body-lg">Select an image for a closer look.</p>
          </SectionHeading>
        </Reveal>

        <Reveal delay={120} className="atmosphere-gallery">
          {shots.map((shot, index) => (
            <button
              key={shot.alt}
              type="button"
              className={`atmosphere-gallery__item ${shot.className ?? ''}`}
              onClick={() => setOpenIndex(index)}
            >
              <ImageFrame variant={index === 0 ? 'editorial' : 'gallery'} aspectRatio={index === 0 ? 'landscape' : undefined} src={shot.src} alt={shot.alt} />
            </button>
          ))}
        </Reveal>

        <Button to="/gallery" variant="text" arrow="down-right">View gallery</Button>
      </PageContainer>

      {openIndex !== null && (
        <Lightbox
          images={shots}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </Section>
  )
}
