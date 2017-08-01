const config = require('../config/webpack.config.dev.js');
const path = require('path');

module.exports = {
  module: {
    rules: config.module.rules
  }
}