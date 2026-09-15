import { PageIntro } from '../components/PageIntro'
import { ImageFrame } from '../components/ImageFrame'
import { demoImages } from '../content/images'

export function GalleryPage() {
  return <main id="main-content">
    <PageIntro eyebrow="Gallery" title="A closer look at the atmosphere."><p>This demonstration gallery is designed to show the intended visual pace. Every image will be replaced with approved Bless Day Spa photography before launch.</p></PageIntro>
    <section className="gallery-grid" aria-label="Demonstration spa gallery">
      <ImageFrame src={demoImages.hero} demo alt="Demonstration spa interior" /><ImageFrame src={demoImages.massage} demo alt="Demonstration massage ritual" /><ImageFrame src={demoImages.bath} demo alt="Demonstration bathing ritual" /><ImageFrame src={demoImages.detail} demo alt="Demonstration spa detail" /><ImageFrame src={demoImages.salon} demo alt="Demonstration salon detail" />
    </section>
  </main>
}
