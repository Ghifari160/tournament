const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "app.js",
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
        new CopyPlugin([
            { from: "./src", to: "./" }
        ])
    ]
};
