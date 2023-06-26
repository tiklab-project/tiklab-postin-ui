/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-31 11:24:55
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base');

const PORT = 3000;

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    mode:'development',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://127.0.0.1:${PORT}/`,
        path.resolve(__dirname, './src/index.js')
    ],
    optimization:{
        namedModules: true,
        namedChunks: true,
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            name: false,
            chunks: 'all',
            minChunks: 1,
            cacheGroups: {
                default: false,
                vendors: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    test: /node_modules/
                },
                styles: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    test: /\.(css|less|scss|stylus)$/,
                    enforce: true,
                    priority: 50
                }
            }
        }
    },

    devServer: {
        contentBase: path.join(__dirname, 'plugins'), //开发服务运行时的文件根目录
        port:PORT,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '0.0.0.0',
        hotOnly:true,
        disableHostCheck: true,
        proxy:{
            "/request":{
                target:"http://192.168.10.3:8082"
            },
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
