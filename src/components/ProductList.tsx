import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import { products, Product } from '../data/products'
import { useCart } from '../contexts/CartContext'

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [maxPrice, setMaxPrice] = useState(600)
  const [searchParams] = useSearchParams()
  const { addItem } = useCart()

  const keyword = (searchParams.get('q') || '').trim().toLowerCase()
  const categories = useMemo(() => ['all', ...new Set(products.map((item) => item.category))], [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchStock = onlyInStock ? product.stock > 0 : true
      const matchPrice = product.price <= maxPrice

      const searchable = `${product.name} ${product.description} ${product.category} ${product.tags.join(' ')}`.toLowerCase()
      const matchKeyword = keyword ? searchable.includes(keyword) : true

      return matchCategory && matchStock && matchPrice && matchKeyword
    })
  }, [keyword, maxPrice, onlyInStock, selectedCategory])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
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
  }, [filteredProducts, sortBy])

  const pageSize = 8
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize))
  const page = Math.min(currentPage, totalPages)
  const paginatedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize)

  const handleAddToCart = (product: Product) => addItem(product, 1)

  return (
    <div className="space-y-6">
      <div className="card-modern space-y-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-600">{sortedProducts.length} results</p>
            {keyword && <p className="text-xs text-slate-500">keyword: {keyword}</p>}
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => {
                setOnlyInStock(e.target.checked)
                setCurrentPage(1)
              }}
            />
            In stock only
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <select
            className="select-modern"
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value)
              setCurrentPage(1)
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All categories' : category}
              </option>
            ))}
          </select>

          <select className="select-modern" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="default">Default sort</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
            <option value="rating">Top rated</option>
          </select>

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-medium text-slate-500">Max price: ¥{maxPrice}</label>
            <input
              type="range"
              min={100}
              max={600}
              step={10}
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="card-modern p-10 text-center">
          <p className="text-lg font-semibold text-slate-800">No matching products</p>
          <p className="mt-2 text-sm text-slate-500">Try another keyword, category, or price range.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" id="new">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          className="btn-modern btn-secondary px-4 py-2 text-sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          style={page === 1 ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
        >
          Prev
        </button>
        <span className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          className="btn-modern btn-secondary px-4 py-2 text-sm"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          style={page === totalPages ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProductList