import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '../data/products'
import { MessagePlugin } from 'tdesign-react'
import socketService from '../services/socket'
import { cartService, activityService } from '../services/api'

interface CartItem extends Product {
  quantity: number
  addedAt?: Date
  updatedAt?: Date
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  userId: string
  isLoading: boolean
  isSyncing: boolean
  setUserId: (userId: string) => void
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  syncCartToServer: () => Promise<void>
  loadCartFromServer: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
  defaultUserId?: string
}

export const CartProvider = ({ children, defaultUserId = 'user_' + Date.now() }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [userId, setUserIdState] = useState<string>(defaultUserId)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSyncing, setIsSyncing] = useState<boolean>(false)

  // 设置用户ID
  const setUserId = (newUserId: string) => {
    setUserIdState(newUserId)
    socketService.setUserId(newUserId)
    
    // 记录用户切换活动
    activityService.logActivity(newUserId, 'login', { previousUserId: userId })
      .catch(console.error)
  }

  // 初始化Socket连接
  useEffect(() => {
    try {
      // 连接Socket
      socketService.connect()
      socketService.setUserId(userId)

      // 监听购物车更新事件
      const unsubscribe = socketService.on('cart_updated', (data) => {
        if (data.userId !== userId) {
          console.log('🔄 收到其他用户购物车更新:', data.userId)
          MessagePlugin.info(`用户 ${data.userId} 更新了购物车`)
        }
      })

      // 监听用户活动事件
      const activityUnsubscribe = socketService.on('user_activity', (activity) => {
        console.log('📊 实时用户活动:', activity)
        if (activity.userId !== userId) {
          MessagePlugin.info(`用户 ${activity.userId} ${getActivityDescription(activity.activityType)}`)
        }
      })

      // 加载用户购物车
      loadCartFromServer()

      // 清理函数
      return () => {
        unsubscribe()
        activityUnsubscribe()
      }
    } catch (error) {
      console.error('初始化Socket连接失败:', error)
    }
  }, [userId])

  // 获取活动描述
  const getActivityDescription = (activityType: string): string => {
    const descriptions: Record<string, string> = {
      'view_product': '查看了商品',
      'add_to_cart': '添加了商品到购物车',
      'remove_from_cart': '移除了购物车商品',
      'update_cart_quantity': '更新了购物车数量',
      'checkout_start': '开始结账',
      'checkout_complete': '完成订单',
      'login': '登录了系统',
      'logout': '退出了系统',
      'search': '搜索了商品',
      'filter_products': '筛选了商品',
      'sort_products': '排序了商品',
      'view_cart': '查看了购物车',
      'view_profile': '查看了个人资料',
      'update_profile': '更新了个人资料'
    }
    return descriptions[activityType] || '进行了操作'
  }

  // 从服务器加载购物车
  const loadCartFromServer = async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      const result = await cartService.getCart(userId)
      if (result.success && result.cart?.items) {
        setItems(result.cart.items)
        console.log('🔄 从服务器加载购物车成功')
      }
    } catch (error) {
      console.error('加载购物车失败:', error)
      MessagePlugin.error('加载购物车失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 同步购物车到服务器
  const syncCartToServer = async () => {
    if (!userId) return

    setIsSyncing(true)
    try {
      const cartData = {
        items,
        totalItems,
        totalPrice
      }

      // 发送到服务器
      const result = await cartService.syncCart(userId, cartData)
      
      // 通过Socket广播更新
      socketService.sendCartUpdate(cartData)

      if (result.success) {
        console.log('✅ 购物车同步成功')
      } else {
        console.error('购物车同步失败:', result.error)
        MessagePlugin.error('购物车同步失败')
      }
    } catch (error) {
      console.error('同步购物车失败:', error)
      MessagePlugin.error('同步购物车失败')
    } finally {
      setIsSyncing(false)
    }
  }

  // 添加商品到购物车
  const addItem = (product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      let newItems: CartItem[]

      if (existingItem) {
        newItems = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, updatedAt: new Date() }
            : item
        )
      } else {
        newItems = [...prev, { 
          ...product, 
          quantity, 
          addedAt: new Date(),
          updatedAt: new Date()
        }]
        MessagePlugin.success(`已添加 ${product.name} 到购物车`)
      }

      // 记录用户活动
      activityService.logActivity(userId, 'add_to_cart', {
        productId: product.id,
        productName: product.name,
        quantity
      }).catch(console.error)

      // 发送Socket活动
      socketService.sendUserActivity('add_to_cart', {
        productId: product.id,
        productName: product.name,
        quantity
      })

      // 自动同步到服务器
      setTimeout(() => syncCartToServer(), 100)

      return newItems
    })
  }

  // 从购物车移除商品
  const removeItem = (productId: number) => {
    setItems(prev => {
      const itemToRemove = prev.find(item => item.id === productId)
      const newItems = prev.filter(item => item.id !== productId)

      // 记录用户活动
      if (itemToRemove) {
        activityService.logActivity(userId, 'remove_from_cart', {
          productId: itemToRemove.id,
          productName: itemToRemove.name
        }).catch(console.error)

        socketService.sendUserActivity('remove_from_cart', {
          productId: itemToRemove.id,
          productName: itemToRemove.name
        })
      }

      MessagePlugin.success('已从购物车移除商品')
      
      // 自动同步到服务器
      setTimeout(() => syncCartToServer(), 100)

      return newItems
    })
  }

  // 更新商品数量
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setItems(prev => {
      const itemToUpdate = prev.find(item => item.id === productId)
      const newItems = prev.map(item =>
        item.id === productId ? { ...item, quantity, updatedAt: new Date() } : item
      )

      // 记录用户活动
      if (itemToUpdate) {
        activityService.logActivity(userId, 'update_cart_quantity', {
          productId: itemToUpdate.id,
          productName: itemToUpdate.name,
          oldQuantity: itemToUpdate.quantity,
          newQuantity: quantity
        }).catch(console.error)

        socketService.sendUserActivity('update_cart_quantity', {
          productId: itemToUpdate.id,
          productName: itemToUpdate.name,
          oldQuantity: itemToUpdate.quantity,
          newQuantity: quantity
        })
      }

      // 自动同步到服务器
      setTimeout(() => syncCartToServer(), 100)

      return newItems
    })
  }

  // 清空购物车
  const clearCart = () => {
    setItems([])
    MessagePlugin.success('已清空购物车')

    // 记录用户活动
    activityService.logActivity(userId, 'clear_cart', {})
      .catch(console.error)

    socketService.sendUserActivity('clear_cart', {})

    // 同步到服务器
    cartService.clearCart(userId)
      .then(() => socketService.sendCartUpdate({ items: [] }))
      .catch(console.error)
  }

  // 计算总数和总价
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        userId,
        isLoading,
        isSyncing,
        setUserId,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        syncCartToServer,
        loadCartFromServer
      }}
    >
      {children}
    </CartContext.Provider>
  )
}