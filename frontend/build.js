const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting custom React build process...');

// Set environment variables
process.env.CI = 'false';
process.env.NODE_ENV = 'production';

// Use the actual react-scripts JavaScript file
const reactScriptsJS = path.join(__dirname, 'node_modules', 'react-scripts', 'scripts', 'build.js');

console.log('🔨 Building React app...');
console.log(`Using react-scripts build script at: ${reactScriptsJS}`);

// Spawn the build process using Node.js directly on the build.js file
const buildProcess = spawn('node', [reactScriptsJS], {
  stdio: 'inherit',
  env: process.env
});

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Build completed successfully!');
    process.exit(0);
  } else {
    console.error('❌ Build failed with code:', code);
    process.exit(code);
  }
});

buildProcess.on('error', (error) => {
  console.error('❌ Build process error:', error);
  process.exit(1);
});