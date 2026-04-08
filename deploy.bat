@echo off
chcp 65001 >nul
echo.
echo 🚀 开始部署娇兰日化购物平台...
echo.

REM 检查Docker是否安装
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker未安装，请先安装Docker
    echo 下载地址: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

REM 检查Docker Compose是否安装
where docker-compose >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker Compose未安装，请先安装Docker Compose
    pause
    exit /b 1
)

REM 创建必要的目录
echo 📁 创建目录结构...
if not exist ssl mkdir ssl
if not exist logs mkdir logs
if not exist data mkdir data

REM 检查SSL证书
if not exist "ssl\certificate.crt" (
    echo ⚠️  SSL证书未找到，将使用自签名证书（仅用于测试）
    echo    生产环境请替换为正式证书
)

REM 构建Docker镜像
echo 🏗️  构建Docker镜像...
call docker-compose build

REM 停止并移除旧容器
echo 🔄 清理旧容器...
call docker-compose down

REM 启动服务
echo 🚀 启动服务...
call docker-compose up -d

REM 等待服务启动
echo ⏳ 等待服务启动...
timeout /t 10 /nobreak >nul

REM 检查服务状态
echo 🔍 检查服务状态...
docker-compose ps | find "Up" >nul
if %errorlevel% equ 0 (
    echo ✅ 所有服务启动成功！
    echo.
    echo 📊 部署完成！
    echo ================================
    echo 🌐 前端应用: http://localhost:5173
    echo 🔧 后端API: http://localhost:3000
    echo 📡 WebSocket: ws://localhost:3000
    echo 🗄️  数据库: localhost:27017
    echo 👤 管理员界面: http://localhost:5173/admin
    echo.
    echo 📋 健康检查:
    echo   前端: curl http://localhost:5173
    echo   后端: curl http://localhost:3000/api/health
    echo.
    echo 🔧 管理命令:
    echo   查看日志: docker-compose logs -f
    echo   停止服务: docker-compose down
    echo   重启服务: docker-compose restart
    echo ================================
) else (
    echo ❌ 服务启动失败，请检查日志: docker-compose logs
    pause
    exit /b 1
)

REM 显示Docker容器状态
echo.
echo 🐳 Docker容器状态:
docker-compose ps

echo.
echo 🎉 部署完成！可以访问 http://localhost:5173 查看应用
echo.
pause