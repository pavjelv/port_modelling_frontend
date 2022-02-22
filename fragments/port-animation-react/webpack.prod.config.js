const {commonConfig} = require("./webpack.config");
const {merge} = require('webpack-merge');

const mode = "production";

module.exports = merge(commonConfig({mode}), {
  mode,
});
