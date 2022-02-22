const {commonConfig} = require("./webpack.config");
const {merge} = require('webpack-merge');
const path = require("path");

const mode = "development";
var sourcePath = path.join(__dirname, './src');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(commonConfig({mode}), {
  mode,
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: sourcePath,
    hot: false,
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-source-map'
});
