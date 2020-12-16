/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

/**@type {import('webpack').Configuration}*/
module.exports = {
  target: 'node',

  entry: './src/extension.ts',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'output'),
    libraryTarget: "commonjs2",
  },

  devtool: isDev && 'source-map',

  externals: [
    "vscode",
    "commonjs",
    "bufferutil",
    "utf-8-validate",
  ],

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [{
      test: /\.(js|ts)$/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
      ].filter(Boolean),
      exclude: /node_modules/,
    },]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(), // run TSC on a separate thread
  ],

};
