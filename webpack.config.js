'use strict';

const path = require('path');
const webpack = require('webpack');
const postcss = require('postcss');
const postcssCalc = require('postcss-calc');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const isHot = process.argv.indexOf('--hot') !== -1;
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
  entry: {
    app: 'src/app.js',
  },
  output: {
    path: 'build',
    publicPath: !isHot ? '/build/' : 'http://localhost:8080/build/',
    filename: '[name].bundle.js',
  },
	plugins,
  resolve: {
    root: path.resolve(__dirname),
		extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'node_modules'
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint',
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
					plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]__[local]__[hash:base64:5]!postcss'
      },
      {
        test: /\.html$/,
        loader: 'dom!html',
      },
			{
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
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
