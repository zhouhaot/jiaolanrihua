import { useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { products, Product } from '../data/products'
import { useCart } from '../contexts/CartContext'

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const { addItem } = useCart()

  const categories = useMemo(() => ['all', ...new Set(products.map((item) => item.category))], [])

  const sortedProducts = useMemo(() => {
    const filtered = products.filter((product) => selectedCategory === 'all' || product.category === selectedCategory)

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })
  }, [selectedCategory, sortBy])

  const pageSize = 8
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize))
  const page = Math.min(currentPage, totalPages)
  const paginatedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize)

  const handleAddToCart = (product: Product) => addItem(product, 1)

  return (
    <div className="space-y-6">
      <div className="card-modern flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-medium text-slate-600">共 {sortedProducts.length} 个结果</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            className="select-modern min-w-[160px]"
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value)
              setCurrentPage(1)
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? '全部分类' : category}
              </option>
            ))}
          </select>

          <select
            className="select-modern min-w-[180px]"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="default">综合排序</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
            <option value="rating">评分优先</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" id="new">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          className="btn-modern btn-secondary px-4 py-2 text-sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          style={page === 1 ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
        >
          上一页
        </button>
        <span className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
          第 {page} / {totalPages} 页
        </span>
        <button
          type="button"
          className="btn-modern btn-secondary px-4 py-2 text-sm"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          style={page === totalPages ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
        >
          下一页
        </button>
      </div>
    </div>
  )
}

export default ProductList