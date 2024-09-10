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
    fs: require.resolve('browserify-fs'),
    process: require.resolve('process/browser'),
    buffer: require.resolve('buffer'),
    net: require.resolve('net'),
    path: require.resolve('path-browserify'),
    querystring: require.resolve('querystring-es3'),
    // Add fallback for async_hooks if needed
    async_hooks: false, // Set to false to ignore `async_hooks`
  };

  // Add ProvidePlugin to provide global variables
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    // Optionally, add IgnorePlugin if async_hooks is not needed
    new webpack.IgnorePlugin({
      resourceRegExp: /async_hooks/,
    }),
  ]);

  return config;
};
