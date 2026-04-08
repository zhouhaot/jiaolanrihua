@echo off
echo 正在设置 Node.js 环境...
set NODE_DIR=%~dp0nodejs
set PATH=%NODE_DIR%;%PATH%

echo 设置 npm 镜像为淘宝镜像...
npm config set registry https://registry.npmmirror.com

echo 开始安装依赖（可能需要几分钟）...
npm install --no-audit --no-fund

if %ERRORLEVEL% EQU 0 (
    echo 依赖安装成功！
    pause
) else (
    echo 依赖安装失败，请检查网络或手动安装。
    pause
)