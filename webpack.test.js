
const { merge } = require('webpack-merge');
const path = require('path');
const os = require('os');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseWebpackConfig = require('./webpack.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: [
        path.resolve(__dirname, './src/index.js')
    ],

    plugins: [
        new BundleAnalyzerPlugin({defaultSizes: 'parsed'}),
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
            minSize: 50, // 默认值，超过30K才独立分包
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '--',
            name: true,
            cacheGroups: {
                moment: {
                    name: "chunk-moment",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                jsBeautify: {
                    name: "chunk-js-beautify",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]js-beautify[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                tiklabEamUI: {
                    name: "chunk-tiklab-eam-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-eam-ui[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                tiklabPrivilegeUI: {
                    name: "chunk-tiklab-privilege-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-privilege-ui[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                tiklabIntegrationUI: {
                    name: "chunk-tiklab-integration-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-integration-ui[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                tiklabLicenceUI: {
                    name: "chunk-tiklab-licence-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-licence-ui[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                tiklabMessageUI: {
                    name: "chunk-tiklab-message-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-message-ui[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                tiklabUserUI: {
                    name: "chunk-tiklab-user-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-user-ui[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                antdUI: {
                    name: 'chunk-antd-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                mockjs: {
                    name: "chunk-mockjs",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]mockjs[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                monacoEditor: {
                    name: "chunk-monaco-editor",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                reactMonacoEditor: {
                    name: "chunk-react-monaco-editor",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]react-monaco-editor[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                commons: {
                    name: 'commons',
                    test: function (module, chunks) {
                        if (
                            /react/.test(module.context) ||
                            /react-dom/.test(module.context)
                        ) {
                            return true
                        }
                    },
                    chunks: 'all',
                    minChunks: 2,
                    priority: 1, //该配置项是设置处理的优先级，数值越大越优先处理
                },
            }
        },
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),

        ]
    }
});
