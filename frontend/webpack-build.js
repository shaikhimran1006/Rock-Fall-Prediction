const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Alternative React build using webpack...');

// Set environment variables
process.env.CI = 'false';
process.env.NODE_ENV = 'production';

// Try to run webpack directly
const webpackPath = path.join(__dirname, 'node_modules', '.bin', 'webpack');

console.log('🔨 Building with webpack...');

const buildProcess = spawn('npx', ['webpack', '--config', 'node_modules/react-scripts/config/webpack.config.js'], {
  stdio: 'inherit',
  env: process.env,
  cwd: __dirname
});

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Webpack build completed successfully!');
    process.exit(0);
  } else {
    console.error('❌ Webpack build failed with code:', code);
    process.exit(code);
  }
});

buildProcess.on('error', (error) => {
  console.error('❌ Webpack build process error:', error);
  process.exit(1);
});