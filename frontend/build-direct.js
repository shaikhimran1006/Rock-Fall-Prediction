const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting React build process...');

// Set environment variables
process.env.CI = 'false';
process.env.GENERATE_SOURCEMAP = 'false';

try {
  // Try to run the build with node directly
  console.log('Attempting to run react-scripts build...');
  
  // Try different approaches
  const approaches = [
    // Direct node execution
    'node ./node_modules/react-scripts/bin/react-scripts.js build',
    // NPX approach
    'npx react-scripts build',
    // Direct execution
    './node_modules/.bin/react-scripts build'
  ];
  
  let buildSuccess = false;
  
  for (let approach of approaches) {
    try {
      console.log(`\nTrying: ${approach}`);
      
      // Execute the command
      const result = execSync(approach, {
        stdio: 'inherit',
        cwd: __dirname,
        env: {
          ...process.env,
          CI: 'false',
          GENERATE_SOURCEMAP: 'false',
          NODE_OPTIONS: '--max-old-space-size=4096'
        }
      });
      
      console.log('✅ Build completed successfully!');
      buildSuccess = true;
      break;
      
    } catch (error) {
      console.log(`❌ Approach "${approach}" failed:`, error.message);
      continue;
    }
  }
  
  if (!buildSuccess) {
    throw new Error('All build approaches failed');
  }
  
  // Verify build folder exists
  const buildPath = path.join(__dirname, 'build');
  if (!fs.existsSync(buildPath)) {
    throw new Error('Build folder was not created');
  }
  
  console.log('✅ Build process completed successfully!');
  console.log('Build folder created at:', buildPath);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}