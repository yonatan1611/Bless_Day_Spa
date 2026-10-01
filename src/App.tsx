import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { Header } from './components/navigation/Header'
import { Footer } from './components/navigation/Footer'
import { ScrollRestoration } from './components/ScrollRestoration'
import { PageTransition } from './components/ui/PageTransition'
import { MobileBookBar } from './components/ui/MobileBookBar'
import { AboutPage } from './pages/AboutPage'
import { BookPage } from './pages/BookPage'
import { ContactPage } from './pages/ContactPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PackagesPage } from './pages/PackagesPage'
import { ReviewsPage } from './pages/ReviewsPage'
import { TreatmentDetailPage } from './pages/TreatmentDetailPage'
import { TreatmentsPage } from './pages/TreatmentsPage'

export const App = () => {
  const location = useLocation()

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollRestoration />
      <Header />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/treatments" element={<TreatmentsPage />} />
            <Route path="/treatments/:slug" element={<TreatmentDetailPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <MobileBookBar />
    </div>
  )
}
