const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'source-map',

   // https://webpack.js.org/configuration/dev-server/
   devServer: {
      port: 8080,
      contentBase: path.join(__dirname, 'docs'),
      compress: true
   }
});
