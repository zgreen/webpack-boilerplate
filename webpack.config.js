'use strict'

const path = require('path')
const webpack = require('webpack')
const postcss = require('postcss')
const postcssCalc = require('postcss-calc')
const postcssImport = require('postcss-import')
const postcssNested = require('postcss-nested')
const isProduction = process.argv.indexOf('-p') !== -1
const plugins = []
if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
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
      },
      {
        test: /\.html$/,
        use: ['dom-loader', 'html-loader']
      }
    ]
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint'
    //   }
    // ],
    // loaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'babel'
    //   },
    //   {
    //     test: /\.css$/,
    //     loader: 'style!css?modules&localIdentName=[name]__[local]__[hash:base64:5]!postcss'
    //   },
    //   {
    //     test: /\.html$/,
    //     loader: 'dom!html'
    //   }
    // ]
  }
}
