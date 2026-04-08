import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.userId = null;
    this.eventCallbacks = new Map();
  }

  // 连接到Socket.io服务器
  connect() {
    if (this.socket && this.isConnected) {
      console.log('Socket已连接');
      return;
    }

    // 创建Socket连接
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    // 连接成功
    this.socket.on('connect', () => {
      console.log('🔌 Socket连接成功');
      this.isConnected = true;
      
      // 如果已设置用户ID，自动加入用户房间
      if (this.userId) {
        this.joinUserRoom(this.userId);
      }
      
      this.emitEvent('connect', {});
    });

    // 连接断开
    this.socket.on('disconnect', (reason) => {
      console.log('🔌 Socket断开连接:', reason);
      this.isConnected = false;
      this.emitEvent('disconnect', { reason });
    });

    // 用户活动事件
    this.socket.on('user_activity', (activity) => {
      console.log('📊 收到用户活动:', activity);
      this.emitEvent('user_activity', activity);
    });

    // 购物车更新事件
    this.socket.on('cart_updated', (data) => {
      console.log('🛒 收到购物车更新:', data.userId);
      this.emitEvent('cart_updated', data);
    });

    // 连接错误
    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket连接错误:', error);
      this.emitEvent('connect_error', error);
    });
  }

  // 断开连接
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.userId = null;
      console.log('🔌 Socket已断开连接');
    }
  }

  // 设置当前用户ID
  setUserId(userId) {
    this.userId = userId;
    
    // 如果已连接，加入用户房间
    if (this.isConnected && userId) {
      this.joinUserRoom(userId);
    }
  }

  // 加入用户房间
  joinUserRoom(userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join_user', userId);
      console.log(`👤 用户 ${userId} 加入房间`);
    }
  }

  // 发送用户活动
  sendUserActivity(activityType, details = {}) {
    if (!this.userId) {
      console.warn('无法发送活动: 未设置用户ID');
      return;
    }

    if (this.socket && this.isConnected) {
      this.socket.emit('user_activity', {
        userId: this.userId,
        activityType,
        details
      });
      console.log('📤 发送用户活动:', activityType);
    } else {
      console.warn('无法发送活动: Socket未连接');
    }
  }

  // 发送购物车更新
  sendCartUpdate(cart) {
    if (!this.userId) {
      console.warn('无法更新购物车: 未设置用户ID');
      return;
    }

    if (this.socket && this.isConnected) {
      this.socket.emit('cart_update', {
        userId: this.userId,
        cart
      });
      console.log('📤 发送购物车更新');
    } else {
      console.warn('无法更新购物车: Socket未连接');
    }
  }

  // 事件监听
  on(event, callback) {
    if (!this.eventCallbacks.has(event)) {
      this.eventCallbacks.set(event, []);
    }
    this.eventCallbacks.get(event).push(callback);
    
    // 返回取消监听函数
    return () => {
      const callbacks = this.eventCallbacks.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  // 触发事件
  emitEvent(event, data) {
    const callbacks = this.eventCallbacks.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`事件回调错误 (${event}):`, error);
        }
      });
    }
  }

  // 获取连接状态
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      userId: this.userId,
      socketId: this.socket?.id
    };
  }
}

// 创建单例实例
const socketService = new SocketService();

export default socketService;