import { Table, Button, Space, Typography, InputNumber, Tag, Divider } from 'tdesign-react'
import { DeleteIcon, CartIcon } from 'tdesign-icons-react'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { items, totalPrice, totalItems, removeItem, updateQuantity, clearCart } = useCart()

  const columns = [
    {
      title: '商品',
      colKey: 'product',
      width: '40%',
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-4">
          <img
            src={row.image}
            alt={row.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <Typography.Text strong>{row.name}</Typography.Text>
            <div className="text-gray-500 text-sm">{row.category}</div>
            <Tag size="small" variant="outline">
              {row.tags[0]}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: '单价',
      colKey: 'price',
      cell: ({ row }: any) => (
        <Typography.Text strong className="text-purple-700">
          ¥{row.price}
        </Typography.Text>
      ),
    },
    {
      title: '数量',
      colKey: 'quantity',
      cell: ({ row }: any) => (
        <InputNumber
          min={1}
          max={row.stock}
          value={row.quantity}
          onChange={(value) => updateQuantity(row.id, value as number)}
          className="w-24"
        />
      ),
    },
    {
      title: '小计',
      colKey: 'subtotal',
      cell: ({ row }: any) => (
        <Typography.Text strong>
          ¥{(row.price * row.quantity).toFixed(2)}
        </Typography.Text>
      ),
    },
    {
      title: '操作',
      colKey: 'actions',
      cell: ({ row }: any) => (
        <Button
          theme="danger"
          variant="text"
          icon={<DeleteIcon />}
          onClick={() => removeItem(row.id)}
        >
          删除
        </Button>
      ),
    },
  ]

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <CartIcon size="64px" className="text-gray-300 mx-auto mb-4" />
        <Typography.Title level="h3" className="mb-4">购物车空空如也</Typography.Title>
        <Typography.Text className="text-gray-600 mb-8">
          快去挑选心仪的商品吧！
        </Typography.Text>
        <Button theme="primary" size="large">
          <Link to="/">去逛逛</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography.Title level="h2" className="mb-6">购物车 ({totalItems}件商品)</Typography.Title>
      <Table
        data={items}
        columns={columns}
        rowKey="id"
        bordered
        stripe
      />
      <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <Button theme="default" variant="outline" onClick={clearCart}>
          清空购物车
        </Button>
        <div className="mt-4 md:mt-0 text-right space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-lg">
              <Typography.Text>商品总数:</Typography.Text>
              <Typography.Text strong>{totalItems} 件</Typography.Text>
            </div>
            <div className="flex justify-between text-lg">
              <Typography.Text>商品总价:</Typography.Text>
              <Typography.Text strong>¥{totalPrice.toFixed(2)}</Typography.Text>
            </div>
            <Divider />
            <div className="flex justify-between text-2xl">
              <Typography.Text strong>应付总额:</Typography.Text>
              <Typography.Title level="h3" className="text-purple-700">
                ¥{totalPrice.toFixed(2)}
              </Typography.Title>
            </div>
          </div>
          <Space>
            <Button theme="default" variant="outline" size="large">
              <Link to="/">继续购物</Link>
            </Button>
            <Button theme="primary" size="large">
              <Link to="/checkout">去结算</Link>
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default CartPage