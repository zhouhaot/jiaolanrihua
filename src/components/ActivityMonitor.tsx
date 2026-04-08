import React, { useState, useEffect } from 'react'
import { Card, List, Avatar, Tag, Space, Typography, Button, Badge } from 'tdesign-react'
import { ActivityIcon, UserIcon, CartIcon, ViewListIcon } from 'tdesign-icons-react'
import socketService from '../services/socket'
import { activityService } from '../services/api'

interface Activity {
  _id?: string
  userId: string
  activityType: string
  details: any
  timestamp: string | Date
  ipAddress?: string
  userAgent?: string
  sessionId?: string
}

const ActivityMonitor = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [showRealtime, setShowRealtime] = useState<boolean>(true)

  // 加载历史活动
  const loadActivities = async () => {
    setIsLoading(true)
    try {
      const result = await activityService.getActivities(20)
      if (result.success) {
        setActivities(result.activities)
      }
    } catch (error) {
      console.error('加载活动失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 初始化Socket监听
  useEffect(() => {
    // 加载初始数据
    loadActivities()

    // 连接状态监听
    const updateConnectionStatus = () => {
      setIsConnected(socketService.getConnectionStatus().isConnected)
    }

    // 监听Socket连接状态
    const connectUnsubscribe = socketService.on('connect', updateConnectionStatus)
    const disconnectUnsubscribe = socketService.on('disconnect', updateConnectionStatus)

    // 监听实时活动
    const activityUnsubscribe = socketService.on('user_activity', (activity) => {
      if (showRealtime) {
        setActivities(prev => [activity, ...prev.slice(0, 19)])
      }
    })

    // 初始连接状态
    updateConnectionStatus()

    // 清理函数
    return () => {
      connectUnsubscribe()
      disconnectUnsubscribe()
      activityUnsubscribe()
    }
  }, [showRealtime])

  // 获取活动图标
  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'view_product':
        return <ViewListIcon />
      case 'add_to_cart':
        return <CartIcon />
      case 'remove_from_cart':
        return <CartIcon />
      case 'update_cart_quantity':
        return <CartIcon />
      case 'checkout_start':
      case 'checkout_complete':
        return <ActivityIcon />
      case 'login':
      case 'logout':
        return <UserIcon />
      default:
        return <ActivityIcon />
    }
  }

  // 获取活动类型标签
  const getActivityTypeLabel = (activityType: string) => {
    const labels: Record<string, string> = {
      'view_product': '查看商品',
      'add_to_cart': '加入购物车',
      'remove_from_cart': '移除购物车',
      'update_cart_quantity': '更新数量',
      'checkout_start': '开始结账',
      'checkout_complete': '完成订单',
      'login': '登录',
      'logout': '退出',
      'search': '搜索',
      'filter_products': '筛选',
      'sort_products': '排序',
      'view_cart': '查看购物车',
      'view_profile': '查看资料',
      'update_profile': '更新资料',
      'clear_cart': '清空购物车'
    }
    return labels[activityType] || activityType
  }

  // 获取活动类型颜色
  const getActivityTypeColor = (activityType: string) => {
    const colors: Record<string, string> = {
      'view_product': 'primary',
      'add_to_cart': 'success',
      'remove_from_cart': 'danger',
      'update_cart_quantity': 'warning',
      'checkout_start': 'primary',
      'checkout_complete': 'success',
      'login': 'primary',
      'logout': 'default'
    }
    return colors[activityType] || 'default'
  }

  // 格式化时间
  const formatTime = (timestamp: string | Date) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return '刚刚'
    if (diffMins < 60) return `${diffMins}分钟前`
    if (diffHours < 24) return `${diffHours}小时前`
    if (diffDays < 7) return `${diffDays}天前`
    
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 获取活动详情描述
  const getActivityDescription = (activity: Activity) => {
    const { activityType, details } = activity
    
    switch (activityType) {
      case 'view_product':
        return `查看了商品 "${details.productName || '未知商品'}"`
      case 'add_to_cart':
        return `添加了 ${details.quantity || 1} 件 "${details.productName || '未知商品'}" 到购物车`
      case 'remove_from_cart':
        return `从购物车移除了 "${details.productName || '未知商品'}"`
      case 'update_cart_quantity':
        return `将 "${details.productName || '未知商品'}" 数量从 ${details.oldQuantity} 更新为 ${details.newQuantity}`
      case 'checkout_start':
        return '开始结账流程'
      case 'checkout_complete':
        return `完成订单，总金额: ¥${details.totalAmount || '0'}`
      case 'login':
        return details.previousUserId ? 
          `从用户 ${details.previousUserId} 切换到当前用户` : 
          '登录系统'
      case 'logout':
        return '退出系统'
      case 'search':
        return `搜索了 "${details.query || ''}"`
      case 'clear_cart':
        return '清空了购物车'
      default:
        return '进行了操作'
    }
  }

  return (
    <Card
      title={
        <Space align="center">
          <ActivityIcon />
          <Typography.Title level="h4">实时活动监控</Typography.Title>
          <Badge
            count={activities.length}
            maxCount={99}
            dot={false}
            shape="circle"
          />
          <Tag
            variant="light"
            theme={isConnected ? 'success' : 'danger'}
          >
            {isConnected ? '已连接' : '未连接'}
          </Tag>
        </Space>
      }
      bordered
      actions={
        <Space>
          <Button
            variant="outline"
            size="small"
            onClick={loadActivities}
            loading={isLoading}
          >
            刷新
          </Button>
          <Button
            variant={showRealtime ? 'base' : 'outline'}
            size="small"
            onClick={() => setShowRealtime(!showRealtime)}
          >
            {showRealtime ? '实时: 开' : '实时: 关'}
          </Button>
          <Button
            variant="outline"
            size="small"
            onClick={() => setActivities([])}
          >
            清空
          </Button>
        </Space>
      }
      style={{ marginBottom: '20px' }}
    >
      <List
        split
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      >
        {activities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            暂无活动记录
          </div>
        ) : (
          activities.map((activity, index) => (
            <List.Item key={activity._id || index}>
              <Space align="start" style={{ width: '100%' }}>
                <Avatar
                  icon={getActivityIcon(activity.activityType)}
                  style={{ background: `var(--td-brand-color-${getActivityTypeColor(activity.activityType)})` }}
                />
                <div style={{ flex: 1 }}>
                  <Space align="center">
                    <Typography.Text strong>
                      {activity.userId}
                    </Typography.Text>
                    <Tag
                      size="small"
                      variant="light"
                      theme={getActivityTypeColor(activity.activityType)}
                    >
                      {getActivityTypeLabel(activity.activityType)}
                    </Tag>
                    <Typography.Text theme="secondary" size="small">
                      {formatTime(activity.timestamp)}
                    </Typography.Text>
                  </Space>
                  <Typography.Paragraph style={{ marginTop: '4px', marginBottom: 0 }}>
                    {getActivityDescription(activity)}
                  </Typography.Paragraph>
                  {activity.details && Object.keys(activity.details).length > 0 && (
                    <Typography.Text theme="secondary" size="small">
                      {JSON.stringify(activity.details)}
                    </Typography.Text>
                  )}
                </div>
              </Space>
            </List.Item>
          ))
        )}
      </List>

      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
        <Space align="center">
          <Typography.Text theme="secondary" size="small">
            当前在线用户:
          </Typography.Text>
          <Tag theme="primary">用户A</Tag>
          <Tag theme="primary">用户B</Tag>
          <Tag theme="primary">用户C</Tag>
          <Typography.Text theme="secondary" size="small">
            等 3 人
          </Typography.Text>
        </Space>
      </div>
    </Card>
  )
}

export default ActivityMonitor