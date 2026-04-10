import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const HomePage = lazy(() => import('./pages/HomePage'))
const CartPage = lazy(() => import('./components/CartPage'))
const CheckoutPage = lazy(() => import('./components/CheckoutPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

const RouteFallback = () => (
  <div className="container-app py-12" aria-live="polite" aria-busy="true">
    <div className="card-modern animate-pulse p-6">
      <div className="h-4 w-28 rounded bg-slate-200" />
      <div className="mt-4 h-8 w-2/5 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="h-24 rounded-xl bg-slate-200" />
        <div className="h-24 rounded-xl bg-slate-200" />
        <div className="h-24 rounded-xl bg-slate-200" />
      </div>
    </div>
  </div>
)

function App() {
  return (
    <CartProvider>
      <Router>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="min-h-screen">
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App