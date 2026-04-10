import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const CartPage = () => {
  const { items, totalPrice, totalItems, removeItem, updateQuantity, clearCart } = useCart()
  const [promo, setPromo] = useState('')

  const discount = useMemo(() => (promo.trim().toUpperCase() === 'NEW10' ? totalPrice * 0.1 : 0), [promo, totalPrice])
  const finalPrice = Math.max(0, totalPrice - discount)

  if (items.length === 0) {
    return (
      <section className="container-app py-16">
        <div className="card-modern mx-auto max-w-xl p-10 text-center">
          <p className="pill mx-auto">Cart</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Your cart is empty</h1>
          <p className="mt-3 text-slate-600">Browse products and add your favorites to continue.</p>
          <Link to="/" className="btn-modern btn-primary mt-8 inline-block rounded-xl px-6 py-3 text-sm">
            Start shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="container-app py-10 pb-24 md:pb-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="pill">Shopping cart</p>
          <h1 className="section-title mt-2">Cart ({totalItems} items)</h1>
        </div>
        <button type="button" className="btn-modern btn-secondary px-4 py-2 text-sm" onClick={clearCart}>
          Clear cart
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
                <p className="mt-2 text-sm font-semibold text-slate-700">¥{item.price} / item</p>
              </div>
              <div className="flex items-center gap-2" aria-label={`Quantity controls for ${item.name}`}>
                <button type="button" className="btn-modern btn-secondary h-9 w-9" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`}>
                  -
                </button>
                <span className="min-w-[2rem] text-center text-sm font-bold" aria-live="polite">{item.quantity}</span>
                <button type="button" className="btn-modern btn-secondary h-9 w-9" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity of ${item.name}`}>
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900">¥{(item.price * item.quantity).toFixed(2)}</p>
                <button type="button" className="mt-2 text-sm font-semibold text-rose-500 hover:text-rose-600" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="card-modern h-fit p-5">
          <h2 className="text-lg font-bold text-slate-900">Checkout summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>¥{totalPrice.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-500" htmlFor="promo-code">Promo code (try NEW10)</label>
              <input
                id="promo-code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Enter code"
                className="input-modern"
              />
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between text-emerald-600">
                <span>Discount</span>
                <span>-¥{discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>¥0.00</span>
            </div>
          </div>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total</span>
              <span className="text-2xl font-bold text-slate-900">¥{finalPrice.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-modern btn-primary mt-4 block rounded-xl px-4 py-3 text-center text-sm">
              Go checkout
            </Link>
            <Link to="/" className="btn-modern btn-secondary mt-2 block rounded-xl px-4 py-3 text-center text-sm">
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>

      <div className="mobile-sticky-bar md:hidden" aria-label="Mobile checkout bar">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-300">Total</p>
            <p className="text-xl font-bold">¥{finalPrice.toFixed(2)}</p>
          </div>
          <Link to="/checkout" className="btn-modern btn-primary rounded-xl px-5 py-2.5 text-sm">
            Checkout
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CartPage