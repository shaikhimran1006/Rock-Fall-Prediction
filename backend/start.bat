@echo off
REM Backend startup script for Windows

echo 🚀 Starting Rockfall Prediction Backend
echo ======================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+
    pause
    exit /b 1
)

REM Navigate to backend directory
cd /d "%~dp0"

REM Install dependencies
echo 📦 Installing Python dependencies...
pip install -r requirements.txt

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Start the Flask application
echo 🌐 Starting Flask server on http://localhost:5000
echo    Use Ctrl+C to stop the server
echo.

REM Set environment variables
set FLASK_APP=app.py
set FLASK_ENV=development
set FLASK_DEBUG=True

REM Run the application
python app.py

pause