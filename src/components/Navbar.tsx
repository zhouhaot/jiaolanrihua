import { Menu, Button, Space, Input, Badge, Avatar } from 'tdesign-react'
import { CartIcon, UserIcon, SearchIcon } from 'tdesign-icons-react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const Navbar = () => {
  const { totalItems } = useCart()
  const menuItems = [
    { content: '首页', value: 'home' },
    { content: '护肤', value: 'skincare' },
    { content: '彩妆', value: 'makeup' },
    { content: '香水', value: 'perfume' },
    { content: '个人护理', value: 'personalcare' },
    { content: '男士系列', value: 'men' },
    { content: '关于我们', value: 'about' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-purple-700 no-underline hover:text-purple-800">
              娇兰日化
            </Link>
            <Menu
              theme="light"
              defaultValue="home"
              items={menuItems}
              className="border-0"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="搜索产品..."
              prefixIcon={<SearchIcon />}
              className="w-64"
            />
            <Space>
              <Button variant="text" icon={<UserIcon />}>
                我的账户
              </Button>
              <Badge count={totalItems} dot={false}>
                <Link to="/cart">
                  <Button variant="text" icon={<CartIcon />}>
                    购物车
                  </Button>
                </Link>
              </Badge>
              <Avatar shape="circle">用户</Avatar>
            </Space>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar