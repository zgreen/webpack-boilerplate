'use strict'

const path = require('path')
const webpack = require('webpack')
const isProduction = process.argv.indexOf('-p') !== -1
const plugins = []
if (!isProduction) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

const devServer = !isProduction ? {devServer: {hot: true}} : {}
const config = {
  devServer: {
    hot: true
  },
  entry: {
    app: 'src/app.js'
  },
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
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {loader: 'postcss-loader'}
        ]
      },
      {
        test: /\.html$/,
        use: ['dom-loader', 'html-loader']
      }
    ]
  }
}
module.exports = Object.assign({}, config, devServer)
