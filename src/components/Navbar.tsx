import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const navItems = [
  { label: '首页', to: '/' },
  { label: '热销', to: '/#hot' },
  { label: '新品', to: '/#new' },
  { label: '品牌故事', to: '/#story' }
]

const Navbar = () => {
  const { totalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="rounded-xl bg-[linear-gradient(120deg,#0f6fff,#59a0ff)] px-3 py-2 text-sm font-bold text-white">
              GL
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">娇兰日化</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.to}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/cart"
              className="relative rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:shadow-sm"
            >
              购物车
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-[#0f6fff] px-2 text-xs font-bold leading-5 text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <NavLink
              to="/checkout"
              className="btn-modern btn-primary px-4 py-2 text-sm"
            >
              立即结算
            </NavLink>
          </div>

          <button
            type="button"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="切换导航"
          >
            菜单
          </button>
        </div>

        {isOpen && (
          <div className="pb-4 md:hidden">
            <div className="card-modern flex flex-col gap-2 p-3">
              {navItems.map((item) => (
                <a key={item.label} href={item.to} className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  {item.label}
                </a>
              ))}
              <Link to="/cart" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                购物车（{totalItems}）
              </Link>
              <Link to="/checkout" className="btn-modern btn-primary mt-1 px-3 py-2 text-center text-sm">
                去结算
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar