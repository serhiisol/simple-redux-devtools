module.exports = function override(config) {
  return {
    ...config,
    optimization: {
      minimize: false,
    }
  };
}
