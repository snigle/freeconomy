const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env = {}) => {
    return {
        mode: env.prod ? 'production' : 'development',
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'www'),
            filename: '[name].[contenthash].js',
        },
        optimization: {
            runtimeChunk: 'single',
            moduleIds: 'hashed',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
                favicon: "src/img/faviconpng.png",
                inject: true,
            }),
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
            new BrotliPlugin({
                asset: '[path].br[query]',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        resolve: {
            extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
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
        devtool: env.prod? "": 'inline-source-map',
    }
};
