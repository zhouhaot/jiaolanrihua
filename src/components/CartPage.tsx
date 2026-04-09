import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const CartPage = () => {
  const { items, totalPrice, totalItems, removeItem, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <section className="container-app py-16">
        <div className="card-modern mx-auto max-w-xl p-10 text-center">
          <p className="pill mx-auto">Cart</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">购物车还是空的</h1>
          <p className="mt-3 text-slate-600">先去挑选几件喜欢的商品，再回来结算吧。</p>
          <Link to="/" className="btn-modern btn-primary mt-8 inline-block rounded-xl px-6 py-3 text-sm">
            去逛逛
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="container-app py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="pill">购物清单</p>
          <h1 className="section-title mt-2">购物车（{totalItems} 件）</h1>
        </div>
        <button type="button" className="btn-modern btn-secondary px-4 py-2 text-sm" onClick={clearCart}>
          清空购物车
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.9fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="card-modern flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-bold text-slate-900">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">¥{item.price} / 件</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn-modern btn-secondary h-9 w-9"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="min-w-[2rem] text-center text-sm font-bold">{item.quantity}</span>
                <button
                  type="button"
                  className="btn-modern btn-secondary h-9 w-9"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900">¥{(item.price * item.quantity).toFixed(2)}</p>
                <button
                  type="button"
                  className="mt-2 text-sm font-semibold text-rose-500 hover:text-rose-600"
                  onClick={() => removeItem(item.id)}
                >
                  删除
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="card-modern h-fit p-5">
          <h2 className="text-lg font-bold text-slate-900">结算摘要</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>商品总数</span>
              <span>{totalItems} 件</span>
            </div>
            <div className="flex items-center justify-between">
              <span>商品金额</span>
              <span>¥{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>运费</span>
              <span>¥0.00</span>
            </div>
          </div>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">应付总额</span>
              <span className="text-2xl font-bold text-slate-900">¥{totalPrice.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-modern btn-primary mt-4 block rounded-xl px-4 py-3 text-center text-sm">
              去结算
            </Link>
            <Link to="/" className="btn-modern btn-secondary mt-2 block rounded-xl px-4 py-3 text-center text-sm">
              继续购物
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default CartPage