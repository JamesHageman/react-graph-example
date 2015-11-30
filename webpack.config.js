var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './main',
    './index.html'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'eval',
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    root: path.join(__dirname, 'src')
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  }
};
