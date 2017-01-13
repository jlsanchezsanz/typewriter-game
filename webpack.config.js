var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  context: __dirname,
  entry: './js/main.js',
  output: { path: __dirname + 'js/', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};