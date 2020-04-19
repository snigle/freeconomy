const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'index.bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({
        template: "src/index.html",
        favicon: "src/img/faviconpng.png",
        inject: true,
    })],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: 'ts-loader'
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },
        ]
    },
    devtool: 'inline-source-map',
};
