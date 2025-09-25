#!/bin/bash
# Frontend startup script

echo "🚀 Starting Rockfall Prediction Dashboard"
echo "========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

# Navigate to frontend directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Start the React application
echo "🌐 Starting React development server on http://localhost:3000"
echo "   The backend should be running on http://localhost:5000"
echo "   Use Ctrl+C to stop the server"
echo ""

# Set environment variables
export REACT_APP_API_URL=http://localhost:5000

# Run the application
npm start