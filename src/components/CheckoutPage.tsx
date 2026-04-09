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

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart()
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | 'bank'>('alipay')

  const canSubmit = useMemo(() => {
    return Boolean(form.name.trim() && form.phone.trim() && form.region && form.address.trim() && items.length > 0)
  }, [form, items.length])

  const handleChange = (key: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    if (!canSubmit) {
      alert('请完整填写收货信息后再提交订单。')
      return
    }

    alert('订单提交成功，我们将尽快为你安排发货。')
    clearCart()
    setForm(initialForm)
    setPaymentMethod('alipay')
  }

  return (
    <section className="container-app py-10">
      <div className="mb-6">
        <p className="pill">Checkout</p>
        <h1 className="section-title mt-2">订单结算</h1>
        <p className="section-subtitle mt-2">填写收货信息并选择支付方式，确认后即可完成下单。</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-5">
          <article className="card-modern p-5">
            <h2 className="text-lg font-bold text-slate-900">收货信息</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-600">
                <span>收货人</span>
                <input className="input-modern" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="请输入收货人姓名" />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>联系电话</span>
                <input className="input-modern" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="请输入手机号码" />
              </label>
            </div>
            <div className="mt-4 grid gap-4">
              <label className="space-y-2 text-sm text-slate-600">
                <span>所在地区</span>
                <select className="select-modern" value={form.region} onChange={(e) => handleChange('region', e.target.value)}>
                  <option value="">请选择地区</option>
                  <option value="北京">北京市</option>
                  <option value="上海">上海市</option>
                  <option value="广州">广州市</option>
                  <option value="深圳">深圳市</option>
                  <option value="杭州">杭州市</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>详细地址</span>
                <textarea
                  className="input-modern min-h-[96px]"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="请输入街道、门牌号等详细地址"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>订单备注（可选）</span>
                <textarea
                  className="input-modern min-h-[84px]"
                  value={form.note}
                  onChange={(e) => handleChange('note', e.target.value)}
                  placeholder="例如：请在工作日白天配送"
                />
              </label>
            </div>
          </article>

          <article className="card-modern p-5">
            <h2 className="text-lg font-bold text-slate-900">支付方式</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { key: 'alipay', label: '支付宝' },
                { key: 'wechat', label: '微信支付' },
                { key: 'bank', label: '银行卡' }
              ].map((option) => {
                const active = paymentMethod === option.key
                return (
                  <button
                    key={option.key}
                    type="button"
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
          <h2 className="text-lg font-bold text-slate-900">订单摘要</h2>
          <div className="mt-4 max-h-[280px] space-y-3 overflow-auto pr-1 text-sm">
            {items.length === 0 && <p className="text-slate-500">购物车为空，请先添加商品。</p>}
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
              <span>商品金额</span>
              <span>¥{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>运费</span>
              <span>¥0.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-slate-900">
              <span>应付总额</span>
              <span>¥{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-modern btn-primary mt-5 w-full rounded-xl px-4 py-3 text-sm"
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={!canSubmit ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
          >
            提交订单
          </button>
          <Link to="/cart" className="btn-modern btn-secondary mt-2 block rounded-xl px-4 py-3 text-center text-sm">
            返回购物车
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default CheckoutPage