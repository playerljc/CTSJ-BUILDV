#一个基于Webpack和less的vue打包工具
 - 可以对基于Vue和Less的宿主工程进行build和dev
 - 可以对除了Vue的npm package进行build
 - 可以对除了Vue的npm package进行umd

# 安装
```javascript
npm install @ctsj/buildv --save-dev
```

# 命令
- [startapp(使用devServer启动工程)](#startapp)
- [buildapp(打包工程)](#buildapp)
- [buildpackage(编译npm包)](#buildpackage)
- [buildumd(把npm包编译成umd)](#buildumd)

### startapp
development模式启动宿主工程
#### 参数：
- -c,--config <path>
##### 用户对webpack进行重定义的配置文件(ctbuildv.config.js)路径，默认是宿主工程中的ctbuildv.config.js文件
```javascript
ctbuildv startapp -c /opt/mydir/;
```
- -d,--define <path>
##### 其他的参数以,分割
```javascript
ctbuildv startapp --define skin=a,skin2=b
````

### buildapp
production模式启动宿主工程
#### 参数：
- -c,--config <path>
##### 用户对webpack进行重定义的配置文件(ctbuildv.config.js)路径，默认是宿主工程中的ctbuildv.config.js文件
```javascript
ctbuildv startapp -c /opt/mydir/;
```
- -d,--define <path>
##### 其他的参数以,分割
```javascript
ctbuildv startapp --define skin=a,skin2=b
````

### buildpackage
编译npm package
- -p,-srcpath <path>
##### 可以是相对路径和对路径，也可以不传
```javascript
// 如果不传-p则编译脚本运行路径下的src目录
ctbuildv buildpackage
```

```javascript
// 如果传递的是绝对路径则编译这个路径
ctbuildv buildpackage -p c:/x/xxx
```

```javascript
// 如果是相对路径编译脚本运行路径+相对路径
ctbuildv buildpackage -p a/b/c
```

### buildumd
将npm package编译成umd
- -c,-config <path>
##### 用户对webpack进行重定义的配置文件(ctbuildv.config.js)路径，默认是宿主工程中的ctbuildv.config.js文件

- -p,--packagename <name>
##### umd的packagename

- -d --define <path>
##### 自定义的其他参数使用，分割


## ctbuildv.config.js
此文件的作用是让用户对已经配置好的webpack配置进行重定义，内容如下：
```javascript
// 需要导出2个方法
// 1.getTheme，返回less的全局变量
// 2.getConfig参数有是一个对象，对象有4个属性
// webpack: 原始的webpack对象
// webpackConfig: 已经配置好的webpack配置对象
// plugins: 插件集合
// define: 自定义参数,
// 我们只需要对webpackConfig对象进行自定义即可
module.exports = {
  // less的modifyVars定义的变量在此函数中进行返回
  getTheme() {
    return modifyVars;
  },
  // webpack - 原生webpack对象
  // webpackConfig - 已经配置好的webpack配置
  // plugin - 配置好的webpack插件(具体请查看"缺省的插件列表")
  // define - 自定义参数
  getConfig({ webpack,webpackConfig,plugins,define }) {
    
  },
};

```

### webpackConfig的配置
```javascript
module.exports = {
  plugins: {
    HtmlWebpackPlugin,
    MiniCssExtractPlugin,
    CopyWebpackPlugin,
    HtmlWebpackIncludeAssetsPlugin,
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
      filename: isProd() ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
      chunkFilename: isProd() ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
      path: path.resolve(runtimePath, 'dist'),
      publicPath: '/',
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({
        title: '',
        filename: 'index.html',
        template: path.join(runtimePath, 'src', 'index.html'),
        hash: true, // 防止缓存
        minify: {
          removeAttributeQuotes: true, // 压缩 去掉引号
        },
        chunks: ['index'],
      }),
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: isDev() ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev() ? '[id].css' : '[id].[hash].css',
        ignoreOrder: false,
      }),
      new webpack.ProvidePlugin({
        _: 'lodash',
        $: 'jquery',
      }),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.join(runtimePath, 'tsconfig.json'),
        checkSyntacticErrors: true,
      }),
      new WebpackBar({ reporters: ['profile'], profile: true }),
    ],
    optimization: isDev()
      ? {}
      : {
          minimize: !isDev(), // true,
          minimizer: isDev()
            ? []
            : [
                new TerserPlugin({
                  sourceMap: !isProd(),
                }),
                new OptimizeCSSAssetsPlugin({}),
              ],
          runtimeChunk: 'single',
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
              },
            },
          },
        },
    module: {
      rules: [
        {
          test: /\.m?jsx?$/,
          exclude: /(node_modules|bower_components)/,
          include: [APP_PATH],
          use: devLoaders.concat([
            {
              loader: 'babel-loader',
              query: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                      corejs: { version: 3, proposals: true },
                    },
                  ],
                  '@babel/preset-react',
                ],
                plugins: [
                  '@babel/plugin-transform-runtime',
                  '@babel/plugin-syntax-dynamic-import',
                  '@babel/plugin-proposal-function-bind',
                  '@babel/plugin-proposal-class-properties',
                ],
                cacheDirectory: isProd(),
              },
            },
          ]),
        },
        {
          test: /\.m?tsx?$/,
          exclude: /(node_modules|bower_components)/,
          include: [APP_PATH],
          use: devLoaders.concat([
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                happyPackMode: true,
                configFile: path.join(runtimePath, 'tsconfig.json'),
              },
            },
          ]),
        },
        {
          test: /\.css$/,
          include: [
            APP_PATH,
            /highlight.js/,
            /photoswipe.css/,
            /default-skin.css/,
            /swiper.min.css/,
            /antd/,
            /antd-mobile/,
            /normalize.css/,
          ],
          use: [
            isDev()
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: isDev(),
                  },
                },
          ]
            .concat(devLoaders)
            .concat([
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: getPostCssConfigPath(runtimePath),
                  },
                },
              },
            ]),
        },
        {
          test: /\.less$/,
          include: [APP_PATH, /normalize.less/],
          use: [
            isDev()
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: isDev(),
                  },
                },
          ]
            .concat(devLoaders)
            .concat([
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: getPostCssConfigPath(runtimePath),
                  },
                },
              },
              {
                loader: 'less-loader',
                query: {
                  javascriptEnabled: true,
                },
              },
            ]),
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
        {
          test: /\.ya?ml$/,
          use: ['json-loader', 'yaml-loader'],
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.sass', '.json'], // 后缀名自动补全
    },
  },
};
````

### 缺省的插件列表
 - HtmlWebpackPlugin,
 - MiniCssExtractPlugin,
 - CopyWebpackPlugin,
 - HtmlWebpackIncludeAssetsPlugin,
 
### startapp，buildapp的缺省自定义参数
```javascript
ctbuildv startapp --define alias=@,analysis,evnVars,cssModules,static=assets,curResolveModule
```
 - alias=@ src的别名
 - analysis=true 是否启动分析
 - envVars=true 是否将env变量注入到process中
 - cssModules 是否启动cssModules
 - static=assets 静态目录名称默认是asstes
 - curResolveModule 加入第三方包的引入是否从宿主工程的node_modules中进行查找
