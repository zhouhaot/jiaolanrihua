import { useState } from 'react'
import { Row, Col, Select, Pagination, Space, Typography } from 'tdesign-react'
import ProductCard from './ProductCard'
import { products, Product } from '../data/products'
import { useCart } from '../contexts/CartContext'

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const { addItem } = useCart()

  const categories = ['all', '护肤', '彩妆', '香水', '个人护理', '男士系列']
  
  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const pageSize = 8
  const total = sortedProducts.length
  const startIndex = (currentPage - 1) * pageSize
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + pageSize)

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <Typography.Title level="h3" className="mb-4 md:mb-0">
          精选产品 ({total})
        </Typography.Title>
        <Space>
          <Select
            placeholder="按分类筛选"
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value as string)
              setCurrentPage(1)
            }}
            options={categories.map(cat => ({ label: cat === 'all' ? '全部' : cat, value: cat }))}
            className="w-40"
          />
          <Select
            placeholder="排序方式"
            value={sortBy}
            onChange={(value) => setSortBy(value as string)}
            options={[
              { label: '默认排序', value: 'default' },
              { label: '价格从低到高', value: 'price-asc' },
              { label: '价格从高到低', value: 'price-desc' },
              { label: '按评分排序', value: 'rating' },
            ]}
            className="w-40"
          />
        </Space>
      </div>
      <Row gutter={16}>
        {paginatedProducts.map((product) => (
          <Col key={product.id} xs={12} sm={8} md={6} lg={4} xl={3}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>
      {total > pageSize && (
        <div className="flex justify-center mt-8">
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={(pageInfo) => setCurrentPage(pageInfo.current)}
            showJumper
            showPageSize={false}
          />
        </div>
      )}
    </div>
  )
}

export default ProductList