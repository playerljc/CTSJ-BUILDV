const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base');
const common = require('./webpack.common.js');
const commandArgs = require('../commandArgs');
const runtimePath = commandArgs.toCommandArgs(process.argv[6]).get('runtimepath');

// --runtimepath
// --customconfig

let webpackConfig = merge(common.config, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
});

webpackConfig = webpackBase({
  webpackConfig,
  runtimePath,
});

// 得到最终的配置
module.exports = webpackConfig;
