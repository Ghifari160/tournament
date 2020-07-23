const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
    mode: isDevelopment ? "development" : "production",
    entry: "./js/index.js",
    output: {
        filename: "app.bundle.js",
        path: path.resolve(__dirname, "../../dist/common")
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /.scss$/,
                use: [
                    isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: "./assets", to: "assets" }
        ])
    ]
};
