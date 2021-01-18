const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const buildPath = path.resolve(__dirname, 'docs');

module.exports = {
   entry: {
      main: './src/main.js',
      home: './src/home.js'
   },
   output: {
      publicPath: '',
      filename: '[name].js',
      path: buildPath
   },

   module: {
      rules: [
         {
            test: /\.hbs$/,
            loader: 'handlebars-loader',
            options: {
               inlineRequires: '/assets/'
            }
         },
         {
            test: /\.(html)$/,
            use: {
               loader: 'html-loader'
            }
         },
         {
            test: /\.(png|svg|jpg|gif|ico)$/,
            include: [
               path.resolve(__dirname, 'src/assets')
            ],
            loader: 'file-loader',
            options: {
               name: 'img/[name].[ext]',
               esModule: false
            }
         },
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
         template: './src/pages/index.hbs',
         inject: true,
         chunks: ['main', 'home'],
         filename: 'index.html'
      })
   ]
};
