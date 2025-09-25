@echo off
REM Frontend startup script for Windows

echo 🚀 Starting Rockfall Prediction Dashboard
echo =========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+
    pause
    exit /b 1
)

REM Navigate to frontend directory
cd /d "%~dp0"

REM Install dependencies
echo 📦 Installing Node.js dependencies...
npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Start the React application
echo 🌐 Starting React development server on http://localhost:3000
echo    The backend should be running on http://localhost:5000
echo    Use Ctrl+C to stop the server
echo.

REM Set environment variables
set REACT_APP_API_URL=http://localhost:5000

REM Run the application
npm start

pause