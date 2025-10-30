@echo off
echo ========================================
echo Mobile Strategy Game Startup
echo ========================================
echo.

REM 既存のNode.jsプロセスを停止
echo Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul

REM Node.jsのパスを設定
set "PATH=%PATH%;C:\Program Files\nodejs"

REM プロジェクトディレクトリに移動
cd /d "%~dp0"

echo.
echo Starting server...
start "Mobile Strategy Game - Server" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting client...
start "Mobile Strategy Game - Client" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo Game started!
echo ========================================
echo.
echo Server: http://localhost:3000
echo Client: http://localhost:5173
echo.
echo Close the command windows to stop the game.
echo.
pause

