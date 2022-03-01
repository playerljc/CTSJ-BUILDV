const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const commandArgs = require('../commandArgs');
const Util = require('../util');
const { getPostCssConfigPath, isDev } = require('../util');

const customArgs = commandArgs.toCommandArgs(process.argv[6]);

const runtimePath = customArgs.get('runtimepath');

const packagename = customArgs.get('packagename');

const APP_PATH = path.resolve(runtimePath, 'src'); // 项目src目录

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
  ],
  plugins: [
    '@vue/babel-plugin-jsx',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
  cacheDirectory: true,
};

module.exports = {
  plugins: {
    HtmlWebpackPlugin,
    MiniCssExtractPlugin,
    VueLoaderPlugin,
  },
  config: {
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
      filename: `${packagename}.bundle.js`,
      // chunkFilename:`${packagename}.bundle.js`,
      path: path.resolve(runtimePath, 'umd'),
      publicPath: '/',
      library: `${packagename}`,
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      // 请确保引入这个插件！
      new HtmlWebpackPlugin({
        title: '',
        filename: 'index.html',
        template: path.join(runtimePath, 'index.html'),
        hash: true, // 防止缓存
        minify: {
          removeAttributeQuotes: true,
        },
        chunks: ['index'],
      }),
      // new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: `${packagename}.min.css`,
        // chunkFilename: `${packagename}.min.css`,
        ignoreOrder: false,
      }),
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
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      // runtimeChunk: 'single',
      // splitChunks: {
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendors',
      //       chunks: 'all',
      //     },
      //   },
      // },
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
          // include: [APP_PATH],
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
          // include: [APP_PATH],
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
          test: /\.css$/,
          include: [APP_PATH, /highlight.js/, /photoswipe.css/, /default-skin.css/],
          use: [
            isDev() ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: getPostCssConfigPath(runtimePath),
                },
              },
            },
          ],
        },
        {
          test: /\.less$/,
          include: [APP_PATH, /normalize.less/],
          use: [
            isDev() ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: getPostCssConfigPath(runtimePath),
                },
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
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
          use: 'raw-loader',
        },
      ],
    },
    resolve: {
      modules: [/* path.join(runtimePath, 'node_modules'), */ 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.css', '.less', '.sass', '.json'], // 后缀名自动补全
    },
  },
};
