const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'frontend');
const frontendNodeModules = path.join(frontendDir, 'node_modules');
const viteBin = path.join(frontendNodeModules, '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');

// Check if frontend node_modules or vite binary exists
if (!fs.existsSync(frontendNodeModules) || !fs.existsSync(viteBin)) {
  console.log('Frontend dependencies not found. Installing in frontend...');
  try {
    execSync('npm install', { cwd: frontendDir, stdio: 'inherit' });
  } catch (err) {
    console.error('npm install in frontend failed:', err.message);
  }
}

console.log('Running frontend build...');
execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
