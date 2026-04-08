# 娇兰日化购物平台 - 云端同步部署指南

## 📋 项目概述

这是一个使用 React + TDesign + Node.js + Socket.IO + MongoDB 构建的现代化日化购物平台，支持多用户实时数据同步。

## 🏗️ 系统架构

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   前端应用      │────▶│  后端API服务器  │────▶│   MongoDB数据库 │
│  (React +      │     │ (Node.js +      │     │   (存储用户数据)│
│   TDesign)     │◀────│   Express +     │◀────│                 │
│                │     │   Socket.IO)    │     └─────────────────┘
└─────────────────┘     └─────────────────┘
         │                       │
         └───────────────────────┘
              WebSocket实时通信
```

## 🚀 快速开始

### 前置要求

1. **Node.js 18+** 和 **npm**
2. **Docker** 和 **Docker Compose**
3. **MongoDB** (可选，Docker中已包含)

### 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（前端 + 后端）
npm run dev

# 3. 访问应用
# 前端: http://localhost:5173
# 后端API: http://localhost:3000
# 管理员界面: http://localhost:5173/admin
```

### 使用Docker部署

```bash
# 1. 构建并启动所有服务
./deploy.sh      # Linux/Mac
deploy.bat       # Windows

# 2. 访问应用
# 前端: http://localhost:5173
# 后端API: http://localhost:3000
```

## 🌐 生产环境部署（Lighthouse服务器）

### 步骤1: 准备服务器

1. 登录腾讯云Lighthouse控制台
2. 确保服务器已安装 Docker 和 Docker Compose
3. 配置安全组，开放以下端口：
   - 80 (HTTP)
   - 443 (HTTPS)
   - 3000 (API服务器)
   - 5173 (开发服务器，可选)

### 步骤2: 上传项目文件

```bash
# 使用SCP上传文件到服务器
scp -r ./* user@your-server-ip:/opt/jiaolan-rihua/
```

### 步骤3: 在服务器上部署

```bash
# 1. 进入项目目录
cd /opt/jiaolan-rihua

# 2. 运行部署脚本
chmod +x deploy.sh
./deploy.sh

# 3. 配置域名和SSL证书（生产环境必需）
# 将SSL证书文件放到 ssl/ 目录下
# 证书文件: certificate.crt 和 private.key
```

### 步骤4: 配置反向代理（推荐）

生产环境建议使用 Nginx 作为反向代理：

```nginx
# nginx.conf 配置示例
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /app/ssl/certificate.crt;
    ssl_certificate_key /app/ssl/private.key;
    
    location / {
        proxy_pass http://app:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /api/ {
        proxy_pass http://app:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /socket.io/ {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## 📊 核心功能

### 1. 实时用户活动同步
- 所有用户活动实时记录到数据库
- 其他用户可以查看实时活动流
- 支持多种活动类型：浏览商品、添加购物车、下单等

### 2. 多用户购物车同步
- 购物车状态实时保存到云端
- 支持多设备同步
- 购物车更新实时广播给其他用户

### 3. 管理员监控界面
- 实时查看所有用户活动
- 系统状态监控
- 在线用户统计

## 🔧 API接口

### 健康检查
```
GET /api/health
```

### 用户活动
```
GET  /api/activities?limit=50     # 获取活动列表
POST /api/activity                # 记录活动
```

### 购物车
```
GET  /api/cart/:userId           # 获取用户购物车
POST /api/cart/sync              # 同步购物车
```

## 🗄️ 数据库结构

### collections.ACTIVITIES 用户活动记录
- userId: 用户标识
- activityType: 活动类型
- details: 活动详情
- timestamp: 时间戳
- ipAddress: IP地址

### collections.CARTS 购物车
- userId: 用户标识
- items: 商品列表
- createdAt: 创建时间
- updatedAt: 更新时间
- isShared: 是否共享
- sharedWith: 共享用户列表

## 🔐 安全配置

### 环境变量
```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://admin:password@mongodb:27017
CLIENT_URL=https://your-domain.com
```

### SSL证书
- 生产环境必须使用有效的SSL证书
- 将证书文件放入 `ssl/` 目录
- 支持 Let's Encrypt 证书

## 📈 监控和维护

### 查看日志
```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f app
docker-compose logs -f mongodb
```

### 备份数据库
```bash
# 备份MongoDB数据
docker exec jiaolan-mongodb mongodump --out /backup/

# 恢复数据
docker exec jiaolan-mongodb mongorestore /backup/
```

### 更新应用
```bash
# 1. 拉取最新代码
git pull

# 2. 重新构建和部署
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🚨 故障排除

### 常见问题

1. **端口冲突**
   ```bash
   # 检查端口占用
   netstat -tuln | grep :3000
   
   # 修改docker-compose.yml中的端口映射
   ```

2. **MongoDB连接失败**
   ```bash
   # 检查MongoDB服务状态
   docker-compose logs mongodb
   
   # 检查网络连接
   docker network ls
   docker network inspect jiaolan_default
   ```

3. **前端无法连接后端**
   ```bash
   # 检查环境变量
   echo $CLIENT_URL
   
   # 检查CORS配置
   # 修改server/index.js中的cors配置
   ```

### 获取帮助

1. 查看详细的错误日志
2. 检查端口和网络配置
3. 确认依赖版本兼容性
4. 参考项目文档和示例

## 📞 技术支持

- 项目文档: [查看文档](#)
- 问题反馈: [创建Issue](#)
- 技术支持: contact@jiaolan-rihua.com

---

**© 2025 娇兰日化购物平台 | 实时云端同步系统**