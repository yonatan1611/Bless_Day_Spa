import { Hero } from '../components/sections/Hero'
import { TrustStrip } from '../components/sections/TrustStrip'
import { BrandStatement } from '../components/sections/BrandStatement'
import { TreatmentExplorer } from '../components/sections/TreatmentExplorer'
import { SignatureExperiences } from '../components/sections/SignatureExperiences'
import { BlessExperience } from '../components/sections/BlessExperience'
import { BookingCta } from '../components/sections/BookingCta'
import { Testimonials } from '../components/sections/Testimonials'
import { AtmosphereGallery } from '../components/sections/AtmosphereGallery'
import { VisitSection } from '../components/sections/VisitSection'
import { FinalCta } from '../components/sections/FinalCta'
import { usePageTitle } from '../hooks/usePageTitle'

export const HomePage = () => {
  usePageTitle('Addis Ababa')

  return (
    <main id="main-content">
      <Hero />
      <TrustStrip />
      <BrandStatement />
      <TreatmentExplorer />
      <SignatureExperiences />
      <BlessExperience />
      <BookingCta />
      <Testimonials />
      <AtmosphereGallery />
      <VisitSection />
      <FinalCta />
    </main>
  )
}
