const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting custom React build process...');

// Set environment variables
process.env.CI = 'false';
process.env.NODE_ENV = 'production';

// Path to react-scripts
const reactScriptsPath = path.join(__dirname, 'node_modules', '.bin', 'react-scripts');

console.log('🔨 Building React app...');
console.log(`Using react-scripts at: ${reactScriptsPath}`);

// Spawn the build process
const buildProcess = spawn('node', [reactScriptsPath, 'build'], {
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