'use strict'

const path = require('path')
const webpack = require('webpack')
const isProduction = process.argv.indexOf('--hot') === -1
const plugins = []
if (!isProduction) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

const config = {
  entry: {
    app: ['src/index.js']
  },
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/build/',
    filename: '[name].bundle.js'
  },
  plugins,
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  }
}
module.exports = config
