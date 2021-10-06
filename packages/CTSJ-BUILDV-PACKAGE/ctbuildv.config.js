module.exports = {
  getConfig({ webpackConfig }) {
    webpackConfig.externals = {
      vue: 'commonjs2 vue',
      'ant-design-vue': 'commonjs2 ant-design-vue',
      classnames: 'commonjs2 classnames',
      'omit.js': 'commonjs omit.js',
      'vue-fragment': 'commonjs2 vue-fragment',
      'load-awesome': 'commonjs2 load-awesome',
      moment: 'commonjs2 moment',
      swiper: 'commonjs2 swiper',
      iscroll: 'commonjs2 iscroll',
      uuid: 'commonjs2 uuid',
    };
  },
};
