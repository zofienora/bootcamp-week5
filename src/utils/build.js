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

// Copy manifest.json
const manifestSrc = path.join(__dirname, '../../manifest.json');
const manifestDest = path.join(buildDir, 'manifest.json');
if (fs.existsSync(manifestSrc)) {
  fs.copyFileSync(manifestSrc, manifestDest);
  console.log('Manifest.json copied to build directory');
} else {
  console.error('Manifest.json not found at:', manifestSrc);
}

// Run webpack build
webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('Build failed:', err || stats.toJson().errors);
    process.exit(1);
  }
  
  console.log('Build completed successfully!');
  console.log('Extension files are in the build/ directory');
});
