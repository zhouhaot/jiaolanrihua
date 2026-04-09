import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'

const AdminPage = () => {
  return (
    <div className="container-app py-16">
      <div className="card-modern p-8">
        <p className="pill mb-4">Admin Preview</p>
        <h1 className="section-title mb-2">管理后台即将升级</h1>
        <p className="section-subtitle">
          下一阶段将补齐管理员看板，包括实时用户活动、转化漏斗、商品热度和订单洞察。
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">今日活跃用户</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">1,284</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">结算转化率</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">7.9%</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">加购率</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">28.4%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App