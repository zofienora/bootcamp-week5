const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const config = require('../../webpack.config.js');

// Clean build directory
const buildDir = path.join(__dirname, '../../build');
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true });
}
fs.mkdirSync(buildDir, { recursive: true });

// Run webpack build
webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('Build failed:', err || stats.toJson().errors);
    process.exit(1);
  }
  
  // Copy manifest.json after webpack build
  const manifestSrc = path.join(__dirname, '../../manifest.json');
  const manifestDest = path.join(buildDir, 'manifest.json');
  console.log('Looking for manifest at:', manifestSrc);
  console.log('Manifest exists:', fs.existsSync(manifestSrc));
  if (fs.existsSync(manifestSrc)) {
    fs.copyFileSync(manifestSrc, manifestDest);
    console.log('Manifest.json copied to build directory');
  } else {
    console.error('Manifest.json not found at:', manifestSrc);
  }
  
  // Copy background script directly (unprocessed)
  const backgroundSrc = path.join(__dirname, '../pages/Background/index.js');
  const backgroundDest = path.join(buildDir, 'background.js');
  if (fs.existsSync(backgroundSrc)) {
    fs.copyFileSync(backgroundSrc, backgroundDest);
    console.log('Background script copied directly to build directory');
  } else {
    console.error('Background script not found at:', backgroundSrc);
  }
  
  console.log('Build completed successfully!');
  console.log('Extension files are in the build/ directory');
});
