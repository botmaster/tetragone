const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
        overlay: {
            warnings: true,
            errors: true
        },
        stats: "errors-only"
    }
});
