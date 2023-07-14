const StylelintPlugin = require('stylelint-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new StylelintPlugin({ extensions: ['scss'] }),
    new ESLintPlugin({ extensions: ['ts'] }),
  ]
});
