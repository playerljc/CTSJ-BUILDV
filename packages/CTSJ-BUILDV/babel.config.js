// 配置文件路径
const configPath = process.env.configPath;

const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: { version: 3, proposals: true },
    },
  ],
  '@vue/babel-preset-jsx',
];

const plugins = [
  '@babel/plugin-transform-runtime',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-function-bind',
  '@babel/plugin-proposal-optional-chaining',
  // "@vue/transform-vue-jsx",
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: false }],
  // "transform-vue-jsx",
  // [
  //   "import",
  //   {
  //     libraryName: "antd-mobile",
  //     style: 'css'
  //   }/*, {
  //   libraryName: "antd",
  //   style: true
  // }*/],
];

const config = { presets, plugins };

if (configPath) {
  try {
    const customBabelConfig = require(configPath);

    if (customBabelConfig && customBabelConfig.getConfig) {
      customBabelConfig.getConfig(config);
    }
  } catch (e) {}
}

module.exports = config;
