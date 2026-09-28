import { Hero } from '../components/sections/Hero'
import { TrustStrip } from '../components/sections/TrustStrip'
import { BrandIntro } from '../components/sections/BrandIntro'
import { TreatmentExplorer } from '../components/sections/TreatmentExplorer'
import { SignatureExperience } from '../components/sections/SignatureExperience'
import { PackagesTeaser } from '../components/sections/PackagesTeaser'
import { AtmosphereGallery } from '../components/sections/AtmosphereGallery'
import { WhyBlessDaySpa } from '../components/sections/WhyBlessDaySpa'
import { Testimonials } from '../components/sections/Testimonials'
import { BookingCta } from '../components/sections/BookingCta'
import { VisitSection } from '../components/sections/VisitSection'
import { usePageTitle } from '../hooks/usePageTitle'

export const HomePage = () => {
  usePageTitle('Addis Ababa')

  return (
    <main id="main-content">
      <Hero />
      <TrustStrip />
      <BrandIntro />
      <TreatmentExplorer />
      <SignatureExperience />
      <PackagesTeaser />
      <AtmosphereGallery />
      <WhyBlessDaySpa />
      <Testimonials />
      <BookingCta />
      <VisitSection />
    </main>
  )
}
