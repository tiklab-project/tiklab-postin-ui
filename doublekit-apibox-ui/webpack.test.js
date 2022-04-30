


const { merge } = require('webpack-merge');
const path = require('path');
const os = require('os');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const baseWebpackConfig = require('./webpack.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: [
        path.resolve(__dirname, './src/index.js')
    ],
    devtool: 'source-map',

    plugins: [
        new UglifyJSPlugin({
            parallel: os.cpus().length,
            cache:true,
            sourceMap:true,
            uglifyOptions: {
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    // warnings: false,
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                },
                output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                }
            }
        }),
        new optimizeCss({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                safe: true,
                discardComments: {
                    removeAll: true
                }
            }
        }),

        new ProgressBarPlugin()
    ],
    optimization: {
        minimize: true,
        nodeEnv: process.env.NODE_ENV,
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests:5,
            automaticNameDelimiter: '--', // 分包打包生成文件的名称的连接符
            name:true,
            cacheGroups: { //  cacheGroups 缓存组，如：将某个特定的库打包
                /* 抽离node_modules下的第三方库 可视需要打开会生成两个文件  vender: node-module下的文件*/
                vendor: {
                    chunks:'all',
                    name:'vender',
                    test: (module, chunks) => {
                        if (/node_modules/.test(module.context)) {
                            return true
                        }
                    },
                    minChunks: 2,//  提取公共部分最少的文件数
                    priority: 10,
                    enforce: true
                },
                /* 提取共用部分，一下提取的部分会议commons 命名 */
                commons: {
                    name: 'commons',
                    test: function (module, chunks) {
                        if (
                            /src\/components\//.test(module.context) ||
                            /src\/util\//.test(module.context) ||
                            /react/.test(module.context) ||
                            /react-dom/.test(module.context) ||
                            /redux/.test(module.context)
                        ) {
                            return true
                        }
                    },
                    chunks: 'all',
                    minChunks: 2, //  提取公共部分最少的文件数
                    // minportal: 0 // 提取公共部分最小的大小
                    // enforce: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({  // 压缩js
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        // drop_debugger: true // 去除console.log 和debuger
                    },
                }
            })
        ]
    }
});
