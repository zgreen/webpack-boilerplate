'use strict';

const path = require('path');
const webpack = require('webpack');
const isProduction = process.argv.indexOf('-p') !== -1;
const plugins = [];
if (isProduction) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	)
}

module.exports = {
	externals: [require('webpack-node-externals')()],
	target: 'node',
  entry: {
    app: 'src/index.js',
  },
  output: {
    filename: 'index.js',
		libraryTarget: 'umd'
  },
	plugins,
  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: [
      'node_modules'
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint!flow-bin',
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
