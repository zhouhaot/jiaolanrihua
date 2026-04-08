#!/bin/bash

# 娇兰日化购物平台部署脚本
# 适用于腾讯云Lighthouse服务器

set -e  # 遇到错误时退出

echo "🚀 开始部署娇兰日化购物平台..."

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

# 创建必要的目录
echo "📁 创建目录结构..."
mkdir -p ssl
mkdir -p logs
mkdir -p data

# 检查SSL证书
if [ ! -f "ssl/certificate.crt" ] || [ ! -f "ssl/private.key" ]; then
    echo "⚠️  SSL证书未找到，将使用自签名证书（仅用于测试）"
    echo "   生产环境请替换为正式证书"
    # 这里可以添加生成自签名证书的代码
fi

# 构建Docker镜像
echo "🏗️  构建Docker镜像..."
docker-compose build

# 停止并移除旧容器
echo "🔄 清理旧容器..."
docker-compose down || true

# 启动服务
echo "🚀 启动服务..."
docker-compose up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
if docker-compose ps | grep -q "Up"; then
    echo "✅ 所有服务启动成功！"
    
    # 显示服务信息
    echo ""
    echo "📊 部署完成！"
    echo "================================"
    echo "🌐 前端应用: http://localhost:5173"
    echo "🔧 后端API: http://localhost:3000"
    echo "📡 WebSocket: ws://localhost:3000"
    echo "🗄️  数据库: localhost:27017"
    echo "👤 管理员界面: http://localhost:5173/admin"
    echo ""
    echo "📋 健康检查:"
    echo "  前端: curl http://localhost:5173"
    echo "  后端: curl http://localhost:3000/api/health"
    echo ""
    echo "🔧 管理命令:"
    echo "  查看日志: docker-compose logs -f"
    echo "  停止服务: docker-compose down"
    echo "  重启服务: docker-compose restart"
    echo "================================"
else
    echo "❌ 服务启动失败，请检查日志: docker-compose logs"
    exit 1
fi

# 显示Docker容器状态
echo ""
echo "🐳 Docker容器状态:"
docker-compose ps

echo ""
echo "🎉 部署完成！可以访问 http://localhost:5173 查看应用"