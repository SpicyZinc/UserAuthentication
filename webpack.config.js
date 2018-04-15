var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './dist/scripts-build');

module.exports = {
	devtool: 'source-map',
	entry: path.resolve(__dirname, './client/app.js'), // or call it index.js
	output: {
		filename: 'bundle.js',
		path: BUILD_DIR,
		publicPath: '/'
	},
	// devServer: {
	// 	contentBase: path.resolve(__dirname, '')
	// },
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
			{test: /(\.css)$/, loaders: ['style-loader', 'css-loader']}
		]
	}
}