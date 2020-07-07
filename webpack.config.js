const path = require('path');
const HWP = require('html-webpack-plugin');
const ETWP = require('extract-text-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

const htmlPlugin = new HWP({
  template: './public/index.html',
  filename: './index.html',
});

const cssPlugin = new ETWP('style.css');

module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~/': './src',
    },
    plugins: [new TsConfigPathsPlugin()],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.(css|sass)$/,
        loader: ETWP.extract('css-loader!sass-loader', 'style-loader'),
      },
      {
        test: /\.(svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/icons',
        },
      },
      {
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [htmlPlugin, cssPlugin],
};
