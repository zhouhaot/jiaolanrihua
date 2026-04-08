import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout, ConfigProvider } from 'tdesign-react'
import { CartProvider } from './contexts/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import ActivityMonitor from './components/ActivityMonitor'

// 管理员页面组件
const AdminPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">管理员控制台</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <ActivityMonitor />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">系统状态</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">后端服务器</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">运行中</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">数据库连接</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">已连接</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">实时通信</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">已启用</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">在线用户</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">3 人</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">快速操作</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
              查看所有用户活动
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
              导出活动日志
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
              管理用户会话
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
              系统设置
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ConfigProvider globalConfig={{}}>
      <CartProvider>
        <Router>
          <Layout className="min-h-screen flex flex-col">
            <Navbar />
            <Layout.Content className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </Layout.Content>
            <Footer />
          </Layout>
        </Router>
      </CartProvider>
    </ConfigProvider>
  )
}

export default App