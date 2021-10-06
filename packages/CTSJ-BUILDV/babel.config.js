const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: { version: 3, proposals: true },
    },
  ],
  '@babel/preset-react',
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
];

module.exports = { presets, plugins };
