'use strict';

const path = require('path');
const webpack = require('webpack');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    compress: true,
    inline: true,
    hot: true,
    historyApiFallback: true
  }
};

module.exports = config;
