module.exports = {
  getConfig({ webpackConfig }) {
    webpackConfig.externals = {
      'ant-design-vue': 'commonjs2 ant-design-vue',
      moment: "commonjs2 moment",
      vue: 'commonjs2 vue'
      // vue: {
      //   root: 'Vue',
      //   commonjs2: 'vue',
      //   commonjs: 'vue',
      //   amd: 'vue',
      // },
      // moment: {
      //   commonjs: 'moment',
      //   commonjs2: 'moment',
      //   amd: 'moment',
      //   root: 'Moment',
      // },
    };
  },
};
