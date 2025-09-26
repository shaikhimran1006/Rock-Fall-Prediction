const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();

// Check if build directory exists, if not create it
const buildPath = path.join(__dirname, 'build');
if (!fs.existsSync(buildPath)) {
  console.log('🔨 Build directory not found, creating production build...');
  
  exec('npx react-scripts build', { env: { ...process.env, CI: 'false' } }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Build failed:', error);
      process.exit(1);
    }
    console.log('✅ Build completed successfully!');
    startServer();
  });
} else {
  console.log('✅ Build directory found, starting server...');
  startServer();
}

function startServer() {
  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, 'build')));

  // Handle client-side routing - send all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });

  const port = process.env.PORT || 10000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Frontend server running on port ${port}`);
    console.log(`🌍 Available at: http://localhost:${port}`);
    console.log(`🌐 API URL: ${process.env.REACT_APP_API_URL || 'Not set'}`);
  });
}