const merge = require('webpack-merge');
const webpackBase = require('./webpack.base');
const common = require('./webpack.packagecommon.js');

const runtimePath = process.argv[10];

// webpack的配置
let webpackConfig = merge(common, {});

webpackConfig = webpackBase({
  webpackConfig,
  runtimePath,
});

// 得到最终的配置
module.exports = webpackConfig;
