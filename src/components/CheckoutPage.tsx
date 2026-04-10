import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

type CheckoutForm = {
  name: string
  phone: string
  region: string
  address: string
  note: string
}

const initialForm: CheckoutForm = {
  name: '',
  phone: '',
  region: '',
  address: '',
  note: ''
}

const createOrderNo = () => {
  const now = new Date()
  const y = now.getFullYear().toString().slice(-2)
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 9000 + 1000)
  return `JL${y}${m}${d}${rand}`
}

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart()
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | 'bank'>('alipay')
  const [errorText, setErrorText] = useState('')
  const [orderNo, setOrderNo] = useState('')

  const canSubmit = useMemo(() => {
    return Boolean(form.name.trim() && form.phone.trim() && form.region && form.address.trim() && items.length > 0)
  }, [form, items.length])

  const handleChange = (key: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errorText) setErrorText('')
  }

  const handleSubmit = () => {
    if (!canSubmit) {
      setErrorText('Please complete shipping info before placing the order.')
      return
    }

    setOrderNo(createOrderNo())
    clearCart()
  }

  if (orderNo) {
    return (
      <section className="container-app py-16">
        <div className="card-modern mx-auto max-w-2xl p-10 text-center" aria-live="polite">
          <p className="pill mx-auto">Order Complete</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Payment successful</h1>
          <p className="mt-3 text-slate-600">Thank you for your purchase. Your order is now being processed.</p>

          <div className="mx-auto mt-8 max-w-md rounded-2xl bg-slate-50 p-5 text-left">
            <p className="text-sm text-slate-500">Order number</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{orderNo}</p>
            <p className="mt-4 text-sm text-slate-500">Estimated delivery</p>
            <p className="mt-1 font-semibold text-slate-900">Within 2-4 business days</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-modern btn-primary rounded-xl px-6 py-3 text-sm">
              Continue shopping
            </Link>
            <button
              type="button"
              className="btn-modern btn-secondary rounded-xl px-6 py-3 text-sm"
              onClick={() => {
                setOrderNo('')
                setForm(initialForm)
                setPaymentMethod('alipay')
              }}
            >
              Create another order
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container-app py-10 pb-24 md:pb-10">
      <div className="mb-6">
        <p className="pill">Checkout</p>
        <h1 className="section-title mt-2">Secure checkout</h1>
        <p className="section-subtitle mt-2">Fill in shipping details and confirm payment to complete your order.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-5">
          <article className="card-modern p-5">
            <h2 className="text-lg font-bold text-slate-900">Shipping info</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-600" htmlFor="shipping-name">
                <span>Full name</span>
                <input
                  id="shipping-name"
                  className="input-modern"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600" htmlFor="shipping-phone">
                <span>Phone</span>
                <input
                  id="shipping-phone"
                  className="input-modern"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  autoComplete="tel"
                />
              </label>
            </div>
            <div className="mt-4 grid gap-4">
              <label className="space-y-2 text-sm text-slate-600" htmlFor="shipping-region">
                <span>Region</span>
                <select id="shipping-region" className="select-modern" value={form.region} onChange={(e) => handleChange('region', e.target.value)}>
                  <option value="">Select region</option>
                  <option value="Beijing">Beijing</option>
                  <option value="Shanghai">Shanghai</option>
                  <option value="Guangzhou">Guangzhou</option>
                  <option value="Shenzhen">Shenzhen</option>
                  <option value="Hangzhou">Hangzhou</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-600" htmlFor="shipping-address">
                <span>Street address</span>
                <textarea
                  id="shipping-address"
                  className="input-modern min-h-[96px]"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Apartment, suite, street, district"
                  autoComplete="street-address"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600" htmlFor="shipping-note">
                <span>Order note (optional)</span>
                <textarea
                  id="shipping-note"
                  className="input-modern min-h-[84px]"
                  value={form.note}
                  onChange={(e) => handleChange('note', e.target.value)}
                  placeholder="Delivery note"
                />
              </label>
            </div>
          </article>

          <article className="card-modern p-5">
            <h2 className="text-lg font-bold text-slate-900">Payment method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Payment method">
              {[
                { key: 'alipay', label: 'Alipay' },
                { key: 'wechat', label: 'WeChat Pay' },
                { key: 'bank', label: 'Bank Card' }
              ].map((option) => {
                const active = paymentMethod === option.key
                return (
                  <button
                    key={option.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className="btn-modern rounded-xl border px-4 py-3 text-sm font-semibold"
                    style={
                      active
                        ? { borderColor: '#0f6fff', background: '#edf4ff', color: '#0f4ec2' }
                        : { borderColor: '#d7dceb', background: '#fff', color: '#334155' }
                    }
                    onClick={() => setPaymentMethod(option.key as 'alipay' | 'wechat' | 'bank')}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </article>
        </div>

        <aside className="card-modern h-fit p-5">
          <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
          <div className="mt-4 max-h-[280px] space-y-3 overflow-auto pr-1 text-sm">
            {items.length === 0 && <p className="text-slate-500">Your cart is empty.</p>}
            {items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">¥{item.price} × {item.quantity}</p>
                </div>
                <p className="font-semibold text-slate-900">¥{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>¥{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>¥0.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>¥{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {errorText && (
            <p className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600" role="alert" aria-live="assertive">
              {errorText}
            </p>
          )}

          <button
            type="button"
            className="btn-modern btn-primary mt-5 w-full rounded-xl px-4 py-3 text-sm"
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            style={!canSubmit ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
          >
            Place order
          </button>
          <Link to="/cart" className="btn-modern btn-secondary mt-2 block rounded-xl px-4 py-3 text-center text-sm">
            Back to cart
          </Link>
        </aside>
      </div>

      <div className="mobile-sticky-bar md:hidden" aria-label="Mobile place-order bar">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-300">Total</p>
            <p className="text-xl font-bold">¥{totalPrice.toFixed(2)}</p>
          </div>
          <button
            type="button"
            className="btn-modern btn-primary rounded-xl px-5 py-2.5 text-sm"
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={!canSubmit ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
          >
            Place order
          </button>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage