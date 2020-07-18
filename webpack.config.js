const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
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
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("node-sass")
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/public/app.html",
            filename: "public/app.html",
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
