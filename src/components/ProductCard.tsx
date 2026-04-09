import { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <article className="card-modern group overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-slate-700">
              {tag}
            </span>
          ))}
        </div>
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-[#0f6fff] px-2 py-1 text-xs font-bold text-white">
            省 {discount}%
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{product.category}</p>
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="min-h-[44px] text-sm text-slate-600">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-slate-900">¥{product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-slate-400 line-through">¥{product.originalPrice}</p>
            )}
          </div>
          <p className="text-xs text-slate-500">库存 {product.stock}</p>
        </div>

        <button
          type="button"
          className="btn-modern btn-primary w-full rounded-xl px-4 py-2.5 text-sm"
          disabled={product.stock <= 0}
          onClick={() => onAddToCart(product)}
          style={product.stock <= 0 ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
        >
          {product.stock <= 0 ? '暂时售罄' : '加入购物车'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard