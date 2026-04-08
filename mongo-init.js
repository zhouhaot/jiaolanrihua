// MongoDB初始化脚本
db = db.getSiblingDB('jiaolan_rihua');

// 创建管理员用户
db.createUser({
  user: 'jiaolan_admin',
  pwd: 'admin_password_123',
  roles: [
    { role: 'readWrite', db: 'jiaolan_rihua' },
    { role: 'dbAdmin', db: 'jiaolan_rihua' }
  ]
});

// 创建集合和索引
db.createCollection('users');
db.createCollection('products');
db.createCollection('carts');
db.createCollection('orders');
db.createCollection('activities');

// 创建索引
db.activities.createIndex({ timestamp: -1 });
db.activities.createIndex({ userId: 1 });
db.carts.createIndex({ userId: 1 });
db.orders.createIndex({ userId: 1 });
db.orders.createIndex({ createdAt: -1 });
db.products.createIndex({ category: 1 });
db.products.createIndex({ price: 1 });

print('✅ MongoDB初始化完成');
print('📊 数据库: jiaolan_rihua');
print('👤 管理员用户: jiaolan_admin');