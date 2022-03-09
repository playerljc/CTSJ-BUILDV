/**
 * 是否使用包含运行时编译器的 Vue 构建版本
 * @param webpackConfig
 * @param runtimePath
 * @param val
 */
module.exports = function ({ webpackConfig, val }) {
  if (!webpackConfig.resolve.alias) {
    webpackConfig.resolve.alias = {};
  }

  if (!val || val === 'true') {
    webpackConfig.resolve.alias['vue$'] = 'vue/dist/vue.esm-bundler.js';
  }
};
