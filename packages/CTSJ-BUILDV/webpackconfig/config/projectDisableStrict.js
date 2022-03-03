const { isDev } = require('../../util');

/**
 * 禁用use strict
 * @param webpackConfig
 */
module.exports = function ({ webpackConfig }) {
  const useIndex = isDev() ? 0 : 1;

  webpackConfig.module.rules[1].use[useIndex].query.plugins.push([
    '@babel/plugin-transform-modules-commonjs',
    { strictMode: false },
  ]);

  webpackConfig.module.rules[2].use[useIndex].query.plugins.push([
    '@babel/plugin-transform-modules-commonjs',
    { strictMode: false },
  ]);
};
