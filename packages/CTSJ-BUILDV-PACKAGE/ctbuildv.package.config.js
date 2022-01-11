module.exports = {
  getConfig(config) {
    config.presets[0][1].modules = false;
    // config.presets.push('@vue/babel-preset-jsx');
  },
};
