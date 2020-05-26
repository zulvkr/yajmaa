const path = require('path');

module.exports = {
  entry: './src/assets/js/index.js',
  output: {
    path: path.resolve('_site', '_includes','assets','js'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};