/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-31 11:24:55
 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const PORT = 4000;

module.exports = merge(baseWebpackConfig, {
    devtool: 'eval-cheap-module-source-map',
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://0.0.0.0:${PORT}/`,
        path.resolve(__dirname, './src/index.js')
    ],
    optimization: {
        minimizer: [new TerserPlugin({ parallel: true })],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 20000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
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
                target:"http://192.168.10.34:8090"
            },
            "/exportPdf":{
                target:"http://192.168.10.34:8091"
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-report.html',
        }),
    ]
});
