import { lazy, Suspense } from 'react'
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
import { ReviewsPage } from './pages/ReviewsPage'
import { TreatmentDetailPage } from './pages/TreatmentDetailPage'
import { TreatmentsPage } from './pages/TreatmentsPage'

// Code-split and without the public site's chrome (Header/Footer/
// MobileBookBar) — an internal tool, not a page a visitor should land on.
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })))
const AdminOverviewPage = lazy(() =>
  import('./pages/admin/AdminOverviewPage').then((m) => ({ default: m.AdminOverviewPage })),
)
const AdminMenuPage = lazy(() =>
  import('./pages/admin/AdminMenuPage').then((m) => ({ default: m.AdminMenuPage })),
)
const RequireAdmin = lazy(() =>
  import('./components/admin/RequireAdmin').then((m) => ({ default: m.RequireAdmin })),
)

const AdminApp = () => (
  <Suspense fallback={<div className="adm adm-loading-screen">Loading…</div>}>
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={<RequireAdmin>{(admin) => <AdminOverviewPage admin={admin} />}</RequireAdmin>}
      />
      <Route
        path="/admin/menu"
        element={<RequireAdmin>{(admin) => <AdminMenuPage admin={admin} />}</RequireAdmin>}
      />
      <Route path="/admin/*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
)

const PublicApp = ({ location }: { location: ReturnType<typeof useLocation> }) => (
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

export const App = () => {
  const location = useLocation()

  if (location.pathname.startsWith('/admin')) {
    return <AdminApp />
  }
  return <PublicApp location={location} />
}
