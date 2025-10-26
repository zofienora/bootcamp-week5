const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../webpack.config.js');
const compiler = webpack(config);

const app = express();
const PORT = 3000;

// Use webpack dev middleware
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  writeToDisk: true
}));

// Use webpack hot middleware
app.use(webpackHotMiddleware(compiler));

// Serve static files from build directory
app.use(express.static(path.join(__dirname, '../build')));

app.listen(PORT, () => {
  console.log(`Development server running on http://localhost:${PORT}`);
  console.log('Webpack is watching for changes...');
});
