#!/bin/bash
# Build script for Render deployment

echo "Starting frontend build..."

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Build the React app
npm run build

echo "Build completed successfully!"