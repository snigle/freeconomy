/* eslint-disable */

const path = require('path');
const appDirectory = path.resolve(__dirname, '../');

module.exports = {
    entry: "./index.web.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // include: ["/node_modules/react-router-native/"],
                loader: "babel-loader",
                query: {
                    presets: ["env", "stage-0", "react"]
                }
            },
        ],
    },
    resolve: {
        alias: {
            "react-native": "react-native-web"
        }
    }
};
