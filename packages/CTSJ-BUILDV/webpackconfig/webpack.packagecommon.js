const path = require('path');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const Util = require('../util');

const runtimePath = process.argv[8];

const packageName = process.argv[10];

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
    library: `${packageName}`,
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
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
            query: {
              presets: [
                [
                  '@babel/preset-env',
                  // {
                  //   useBuiltIns: 'usage',
                  //   corejs: { version: 3, proposals: true },
                  // },
                  {
                    useBuiltIns: 'entry',
                  },
                ],
                '@babel/preset-react',
                '@vue/babel-preset-jsx',
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-function-bind',
                '@babel/plugin-proposal-class-properties',
                // "@vue/transform-vue-jsx",
              ],
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
            },
          },
        ],
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
        loader: ['ejs-loader?variable=data'],
      },
    ],
  },
  resolve: {
    modules: [/* path.join(runtimePath, 'node_modules'), */ 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.css', '.less', '.sass', '.json'], // 后缀名自动补全
  },
};
