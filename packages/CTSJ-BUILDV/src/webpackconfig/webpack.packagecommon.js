const path = require('path');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const commandArgs = require('../commandArgs');
const Util = require('../util');

const env = commandArgs.toCommandArgs(process.argv[6]);
const runtimePath = env.get('runtimepath');
const packageName = env.get('packagename');

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      // {
      //   useBuiltIns: 'usage',
      //   corejs: { version: 3, proposals: true },
      // },
      {
        useBuiltIns: 'entry',
        corejs: { version: 3, proposals: true },
      },
    ],
    '@babel/preset-react',
    '@vue/babel-preset-jsx',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
  cacheDirectory: true,
};

// const APP_PATH = path.resolve(runtimePath, 'src'); // 项目src目录

module.exports = {
  /**
   * 入口
   */
  entry: {
    // 判断入口文件是.js,.jsx,.tsx
    index: Util.getEntryIndex(runtimePath),
  },
  /**
   * 出口
   */
  output: {
    filename: `${packageName}.js`,
    path: path.resolve(runtimePath, 'lib'),
    publicPath: '/',
    // library: `${packageName}`,
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    clean: true,
  },
  mode: 'production',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.join(runtimePath, 'tsconfig.json'),
      },
    }),
    new WebpackBar({ reporters: ['profile'], profile: true }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                whitespace: 'condense',
              },
            },
          },
        ],
      },
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.m?tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
              appendTsSuffixTo: ['\\.vue$'],
              configFile: path.join(runtimePath, 'tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.ejs/,
        use: [
          {
            loader: 'ejs-loader',
            options: {
              variable: 'data',
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: ['raw-loader'],
      },
    ],
  },
  resolve: {
    modules: [/* path.join(runtimePath, 'node_modules'), */ 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.css', '.less', '.sass', '.json'], // 后缀名自动补全
  },
};
