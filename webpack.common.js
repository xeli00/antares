const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const buildPath = path.resolve(__dirname, 'docs');

module.exports = {
   entry: {
      index: './src/index.js'
   },
   output: {
      filename: '[name].js',
      path: buildPath
   },

   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
               presets: ['@babel/preset-env']
            }
         },
         {
            test: /\.s[ac]ss$/i,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader'
            ]
         }
      ]
   },

   plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin({
         cleanOnceBeforeBuildPatterns: ['**/*', '!CNAME']
      }),

      new HtmlWebpackPlugin({
         template: './src/index.html',
         inject: true,
         chunks: ['index'],
         filename: 'index.html'
      }),

      new MiniCssExtractPlugin({
         filename: '[name].css'
      })
   ]
};
