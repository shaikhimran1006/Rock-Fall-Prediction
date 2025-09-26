#!/bin/bash

echo "🚀 Starting React deployment process..."

# Set environment variables
export CI=false
export NODE_ENV=production

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the React app
echo "🔨 Building React app..."
./node_modules/.bin/react-scripts build

echo "✅ Build completed successfully!"
echo "📁 Build directory contents:"
ls -la build/ || echo "Build directory not found!"

echo "🌍 Starting production server..."
exec node server.js