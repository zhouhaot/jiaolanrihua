@echo off
echo 正在启动完整开发服务器...
set NODE_DIR=%~dp0nodejs
set PATH=%NODE_DIR%;%PATH%

echo 启动后端服务器（端口 3000）和前端开发服务器（端口 8080）...
npm run dev

pause