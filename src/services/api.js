import axios from 'axios';

// API 基础配置
const API_BASE_URL = 'http://localhost:3000/api';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 用户活动服务
export const activityService = {
  // 记录用户活动
  logActivity: async (userId, activityType, details = {}) => {
    try {
      const response = await api.post('/activity', {
        userId,
        activityType,
        details
      });
      return response.data;
    } catch (error) {
      console.error('记录活动失败:', error);
      return { success: false, error: error.message };
    }
  },

  // 获取所有用户活动
  getActivities: async (limit = 50) => {
    try {
      const response = await api.get(`/activities?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('获取活动失败:', error);
      return { success: false, error: error.message };
    }
  }
};

// 购物车服务
export const cartService = {
  // 同步购物车到服务器
  syncCart: async (userId, cart) => {
    try {
      const response = await api.post('/cart/sync', {
        userId,
        cart
      });
      return response.data;
    } catch (error) {
      console.error('同步购物车失败:', error);
      return { success: false, error: error.message };
    }
  },

  // 获取用户购物车
  getCart: async (userId) => {
    try {
      const response = await api.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      console.error('获取购物车失败:', error);
      return { success: false, error: error.message };
    }
  },

  // 清空购物车
  clearCart: async (userId) => {
    try {
      const response = await api.post('/cart/sync', {
        userId,
        cart: { items: [] }
      });
      return response.data;
    } catch (error) {
      console.error('清空购物车失败:', error);
      return { success: false, error: error.message };
    }
  }
};

// 健康检查
export const healthService = {
  check: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('健康检查失败:', error);
      return { status: 'error', error: error.message };
    }
  }
};

export default api;