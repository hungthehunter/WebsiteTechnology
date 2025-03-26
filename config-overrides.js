const webpack = require('webpack');

module.exports = function override(config, env) {
  // Set up fallbacks for Node.js core modules
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    zlib: require.resolve('browserify-zlib'),
    fs: false, // browserify-fs có thể gây lỗi, nên tắt nếu không cần
    process: false, // Không cần process/browser nữa
    buffer: require.resolve('buffer'),
    net: false, // Không thể dùng net trong trình duyệt
    path: require.resolve('path-browserify'),
    querystring: require.resolve('querystring-es3'),
    async_hooks: false, // Không hỗ trợ trong trình duyệt
  };

  // Add ProvidePlugin to provide global variables
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
