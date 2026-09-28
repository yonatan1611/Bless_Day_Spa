import { useState } from 'react'
import { PageContainer, Section } from '../components/layout/Primitives'
import { SectionHeading } from '../components/layout/SectionHeading'
import { ImageFrame } from '../components/ui/ImageFrame'
import { Lightbox } from '../components/ui/Lightbox'
import { Reveal } from '../components/ui/Reveal'
import { galleryImages } from '../content/images'
import { usePageTitle } from '../hooks/usePageTitle'

// `aspect` reserves the image's own space before it loads, so the masonry
// doesn't reflow as each photo comes in. `large` gives the exhibition a
// clear focal point instead of every tile carrying equal weight.
const shots = [
  { src: galleryImages.stoneTexture, alt: 'Demonstration stone texture detail', caption: 'Natural stone', aspect: '4 / 7', large: true, demo: true },
  { src: galleryImages.skincare, alt: 'Deep tissue massage at Bless Day Spa', caption: 'Deep tissue massage', aspect: '10 / 9', demo: false },
  { src: galleryImages.fabric, alt: 'A floor-mattress treatment room at Bless Day Spa', caption: 'A treatment room', aspect: '4 / 3', demo: false },
  { src: galleryImages.chair, alt: 'Demonstration seating detail', caption: 'A quiet corner', aspect: '3 / 2', demo: true },
  { src: galleryImages.sandstone, alt: 'Demonstration sandstone texture', caption: 'Sandstone detail', aspect: '2 / 3', demo: true },
  { src: galleryImages.clothHook, alt: 'Demonstration linen on a hook', caption: 'Linen, ready', aspect: '2 / 3', demo: true },
  { src: galleryImages.towel, alt: 'Hot stone massage at Bless Day Spa', caption: 'Hot stone massage', aspect: '3 / 4', demo: false },
]

export const GalleryPage = () => {
  usePageTitle('Gallery')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main id="main-content">
      <Section padding="top" className="page-intro">
        <PageContainer narrow>
          <SectionHeading level={1} eyebrow="Gallery" title="A closer look at the atmosphere.">
            <p className="body-lg">
              Real Bless Day Spa photography, alongside placeholder images that show the intended
              visual pace until they're replaced. Select any image for a closer look.
            </p>
          </SectionHeading>
        </PageContainer>
      </Section>

      <Section padding="bottom">
        <PageContainer>
          <Reveal className="masonry">
            {shots.map((shot, index) => (
              <button
                key={shot.alt}
                type="button"
                className={`masonry__item ${shot.large ? 'masonry__item--large' : ''}`}
                style={{ aspectRatio: shot.aspect }}
                onClick={() => setOpenIndex(index)}
              >
                <ImageFrame variant="gallery" aspectRatio="auto" className="masonry__frame" src={shot.src} demo={shot.demo} alt={shot.alt} />
                <span className="masonry__caption">{shot.caption}</span>
              </button>
            ))}
          </Reveal>
        </PageContainer>
      </Section>

      {openIndex !== null && (
        <Lightbox images={shots} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      )}
    </main>
  )
}
