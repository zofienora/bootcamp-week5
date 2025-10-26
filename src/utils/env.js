const path = require('path');

module.exports = {
  development: {
    NODE_ENV: 'development',
    BUILD_DIR: path.join(__dirname, '../build')
  },
  production: {
    NODE_ENV: 'production',
    BUILD_DIR: path.join(__dirname, '../build')
  }
};
