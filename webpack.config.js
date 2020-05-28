const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'index.bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            favicon: "src/img/faviconpng.png",
            inject: true,
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        extensions: ['.ts','.js', '.jsx', '.tsx','.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
    },
    module: {
        rules: [
            { test: /\.vue$/, loader: "vue-loader" },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.sa|css$/,
                exclude: [/node_modules/],
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader',
            //     { loader: 'css-loader', options: { importLoaders: 1 } }]
            // },
            {
                test: /\.(gif|jpe?g|png|svg|woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        esModule: false,
                    }
                }
            },
        ]
    },
    devtool: 'inline-source-map',
};
