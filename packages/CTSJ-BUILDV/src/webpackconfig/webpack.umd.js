const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base');
const common = require('./webpack.umdcommon.js');
const commandArgs = require('../commandArgs');

const runtimePath = commandArgs.toCommandArgs(process.argv[6]).get('runtimepath');

// --runtimepath
// --customconfig

// webpack的配置
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
