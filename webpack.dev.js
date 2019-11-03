const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const config = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        host: "0.0.0.0",
        contentBase: "./dist",
        hot: true,
        overlay: {
            warnings: true,
            errors: true
        },
        // stats: "errors-only",
        open: false
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    }
});

// console.log(config);

module.exports = config;
