#!/bin/bash
# Backend startup script

echo "🚀 Starting Rockfall Prediction Backend"
echo "======================================"

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+"
    exit 1
fi

# Check if pip is installed
if ! command -v pip &> /dev/null; then
    echo "❌ Pip is not installed. Please install pip"
    exit 1
fi

# Navigate to backend directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Start the Flask application
echo "🌐 Starting Flask server on http://localhost:5000"
echo "   Use Ctrl+C to stop the server"
echo ""

# Set environment variables
export FLASK_APP=app.py
export FLASK_ENV=development
export FLASK_DEBUG=True

# Run the application
python app.py