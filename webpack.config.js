var path = require('path');

module.exports = {
  entry: './frontend/book.jsx',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  
  module: {
    rules: [
      {
          test: /\.css$/,
          include: /(node_modules)/,
          loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              '@babel/env',
              '@babel/react'
            ]
          }
        }
      }
    ]
  }, 
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  devtool: 'source-map'
};