import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { UserActivity } from './models/UserActivity.js';
import { Cart } from './models/Cart.js';

// 加载环境变量
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
});

// 中间件
app.use(cors());
app.use(express.json());

// MongoDB 连接
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'jiaolan_rihua';
let db;

// 数据模型
const collections = {
  USERS: 'users',
  PRODUCTS: 'products',
  CARTS: 'carts',
  ORDERS: 'orders',
  ACTIVITIES: 'activities' // 用户活动记录
};

// 内存存储（当MongoDB不可用时）
const memoryStorage = {
  activities: [],
  carts: []
};

// 连接到 MongoDB
async function connectToMongo() {
  try {
    const client = await MongoClient.connect(mongoUrl);
    db = client.db(dbName);
    console.log('✅ 已连接到 MongoDB');
    
    // 创建索引
    await db.collection(collections.ACTIVITIES).createIndex({ timestamp: -1 });
    await db.collection(collections.CARTS).createIndex({ userId: 1 });
    
    return db;
  } catch (error) {
    console.error('⚠️ MongoDB 连接失败，使用内存存储:', error.message);
    db = null; // 标记为使用内存存储
    return null;
  }
}

// 用户活动记录
async function logUserActivity(userId, activityType, details, ipAddress = '0.0.0.0', userAgent = '', sessionId = '') {
  try {
    const activity = new UserActivity({
      userId,
      activityType,
      details,
      ipAddress,
      userAgent,
      sessionId
    });
    
    if (db) {
      await db.collection(collections.ACTIVITIES).insertOne(activity.toJSON());
    } else {
      // 使用内存存储
      memoryStorage.activities.push(activity.toJSON());
      // 保持最多1000条记录
      if (memoryStorage.activities.length > 1000) {
        memoryStorage.activities.shift();
      }
    }
    
    // 广播活动给所有连接的客户端
    io.emit('user_activity', activity.toJSON());
    
    return activity.toJSON();
  } catch (error) {
    console.error('记录用户活动失败:', error);
  }
}

// 实时同步购物车
async function syncCart(userId, cartData, sessionId = '') {
  try {
    // 使用Cart模型处理数据
    const cart = new Cart({
      userId,
      items: cartData.items || [],
      sessionId
    });
    
    if (db) {
      await db.collection(collections.CARTS).updateOne(
        { userId },
        { $set: cart.toJSON() },
        { upsert: true }
      );
    } else {
      // 使用内存存储
      const index = memoryStorage.carts.findIndex(c => c.userId === userId);
      if (index >= 0) {
        memoryStorage.carts[index] = cart.toJSON();
      } else {
        memoryStorage.carts.push(cart.toJSON());
      }
    }
    
    // 广播购物车更新
    io.emit('cart_updated', { userId, cart: cart.toJSON() });
    
    return { success: true, cart: cart.toJSON() };
  } catch (error) {
    console.error('同步购物车失败:', error);
    return { success: false, error: error.message };
  }
}

// 获取用户活动历史
async function getUserActivities(limit = 50) {
  try {
    if (db) {
      const activities = await db.collection(collections.ACTIVITIES)
        .find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();
      return activities;
    } else {
      // 从内存存储获取
      return memoryStorage.activities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, limit);
    }
  } catch (error) {
    console.error('获取用户活动失败:', error);
    return [];
  }
}

// API 路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/activities', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const activities = await getUserActivities(limit);
    res.json({ success: true, activities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/activity', async (req, res) => {
  try {
    const { userId, activityType, details } = req.body;
    
    if (!userId || !activityType) {
      return res.status(400).json({ success: false, error: '缺少必要参数' });
    }
    
    const activity = await logUserActivity(userId, activityType, details);
    res.json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/cart/sync', async (req, res) => {
  try {
    const { userId, cart } = req.body;
    
    if (!userId || !cart) {
      return res.status(400).json({ success: false, error: '缺少必要参数' });
    }
    
    const result = await syncCart(userId, cart);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    let cartData = null;
    
    if (db) {
      cartData = await db.collection(collections.CARTS).findOne({ userId });
    } else {
      // 从内存存储查找
      cartData = memoryStorage.carts.find(c => c.userId === userId);
    }
    
    if (!cartData) {
      // 返回一个空的购物车
      const emptyCart = new Cart({ userId, items: [] });
      return res.json({ success: true, cart: emptyCart.toJSON() });
    }
    
    // 使用Cart模型包装数据
    const cart = new Cart(cartData);
    res.json({ success: true, cart: cart.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Socket.IO 连接处理
io.on('connection', (socket) => {
  console.log('🔌 新客户端连接:', socket.id);
  
  // 用户加入房间（按用户ID）
  socket.on('join_user', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`用户 ${userId} 加入房间`);
  });
  
  // 用户活动
  socket.on('user_activity', async (data) => {
    const { userId, activityType, details } = data;
    await logUserActivity(userId, activityType, details);
  });
  
  // 购物车更新
  socket.on('cart_update', async (data) => {
    const { userId, cart } = data;
    await syncCart(userId, cart);
  });
  
  // 断开连接
  socket.on('disconnect', () => {
    console.log('🔌 客户端断开连接:', socket.id);
  });
});

// 启动服务器
async function startServer() {
  const PORT = process.env.PORT || 3000;
  
  // 先启动服务器，再连接数据库
  httpServer.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    console.log(`📡 WebSocket 服务器已启动`);
    
    // 异步连接MongoDB，不阻塞启动
    connectToMongo().then(() => {
      console.log(`🗄️  MongoDB: ${mongoUrl}/${dbName}`);
    }).catch(error => {
      console.log(`⚠️  使用内存存储: ${error.message}`);
    });
  });
}

startServer().catch(console.error);