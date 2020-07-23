const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
    mode: isDevelopment ? "development" : "production",
    entry: {
        public: "./src/public/js/index.js",
        admin: "./src/admin/js/index.js"
    },
    output: {
        filename: "[name]/app.bundle.js",
        path: path.resolve(__dirname, "dist")
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
        new MiniCssExtractPlugin({
            filename: "[name]/app.css",
            chunkFilename: "[id]/app.css"
        }),
        new HtmlWebPackPlugin({
            template: "./src/public/app.html",
            filename: "public/app.html",
            inject: "head",
            scriptLoading: "defer",
            chunks: [ "public" ]
        }),
        // new HtmlWebPackPlugin({
        //     template: "./src/admin/index.html",
        //     filename: "admin/index.html",
        //     chunks: [ "admin" ]
        // }),
        new CopyPlugin([
            { from: "src/common/assets", to: "common/assets" }
        ])
    ]
};
