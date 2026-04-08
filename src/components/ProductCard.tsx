import { Card, Button, Space, Tag, Rate, Typography } from 'tdesign-react'
import { CartIcon, HeartIcon } from 'tdesign-icons-react'
import { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  return (
    <Card
      className="h-full hover:shadow-lg transition-shadow duration-300"
      bordered
      header={
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 left-2">
            <Space>
              {product.tags.map((tag) => (
                <Tag key={tag} theme="warning" size="small">
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
          <Button
            shape="circle"
            variant="outline"
            className="absolute top-2 right-2 bg-white/80"
            icon={<HeartIcon />}
          />
        </div>
      }
      footer={
        <Space className="w-full">
          <Button
            block
            theme="primary"
            icon={<CartIcon />}
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? '已售罄' : '加入购物车'}
          </Button>
        </Space>
      }
    >
      <div className="space-y-2">
        <Typography.Title level="h4" className="text-lg font-semibold truncate">
          {product.name}
        </Typography.Title>
        <Typography.Text className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </Typography.Text>
        <div className="flex items-center justify-between">
          <Rate allowHalf value={product.rating} disabled />
          <Typography.Text theme="secondary" className="text-sm">
            库存: {product.stock}
          </Typography.Text>
        </div>
        <div className="flex items-center space-x-2">
          <Typography.Title level="h3" className="text-purple-700">
            ¥{product.price}
          </Typography.Title>
          {hasDiscount && (
            <Typography.Text delete theme="secondary">
              ¥{product.originalPrice}
            </Typography.Text>
          )}
          {hasDiscount && (
            <Tag theme="danger" size="small">
              -{Math.round((1 - product.price / product.originalPrice!) * 100)}%
            </Tag>
          )}
        </div>
        <Tag size="small" variant="outline">
          {product.category}
        </Tag>
      </div>
    </Card>
  )
}

export default ProductCard