module.exports = {
  getConfig({ webpackConfig }) {
    webpackConfig.externals = {
      'ant-design-vue': 'antd',
      vue: {
        root: 'Vue',
        commonjs2: 'vue',
        commonjs: 'vue',
        amd: 'vue',
      },
      moment: {
        commonjs: 'moment',
        commonjs2: 'moment',
        amd: 'moment',
        root: 'Moment',
      },
    };
  },
};
