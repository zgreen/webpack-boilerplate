'use strict';

var path = require('path');
var webpack = require('webpack');
var postcss = require('postcss');
var postcssCalc = require('postcss-calc');
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');
var isHot = process.argv.indexOf('--hot') !== -1;

module.exports = {
  entry: {
    app: 'src/app.js',
  },
  eslint: {
    configFile: '.eslintrc',
  },
  output: {
    path: 'build',
    publicPath: !isHot ? '/build/' : 'http://localhost:8080/build/',
    filename: '[name].bundle.js',
  },
  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: [
      'node_modules'
    ]
  },
  module: {
    preloaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint',
      }
    ],
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]__[local]__[hash:base64:5]!postcss'
      },
      {
        test: /\.html$/,
        loader: 'dom!html',
      }
    ]
  },
  postcss: function(webpack) {
    return [
      postcssImport({addDependencyTo: webpack}),
      postcssNested,
      postcssCalc,
    ]
  }
};
