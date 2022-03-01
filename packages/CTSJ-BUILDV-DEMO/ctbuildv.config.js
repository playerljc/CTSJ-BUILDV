const path = require('path');
const modifyVars = require('./themes/default/vars');

module.exports = {
  getTheme() {
    return modifyVars;
  },
  getConfig({ webpackConfig, webpack, plugins }) {
    webpackConfig.resolve.modules = [path.join(__dirname, 'node_modules'), 'node_modules'];
  },
};
