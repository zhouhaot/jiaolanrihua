@echo off
echo 正在构建项目...
set NODE_DIR=%~dp0nodejs
set PATH=%NODE_DIR%;%PATH%

echo 清理旧的构建文件...
if exist dist rmdir /s /q dist

echo 开始构建...
call npm run build

if exist dist (
    echo 构建成功！dist 目录已创建。
    echo.
    echo 现在可以部署到 EdgeOne Pages 获取线上域名。
) else (
    echo 构建失败，请检查错误信息。
)

pause
