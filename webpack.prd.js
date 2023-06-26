
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
            minSize: 300,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '--',
            name:false,
            cacheGroups: {

                tiklabPrivilegeUI: {
                    name: 'chunk-tiklab-privilege-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]tiklab-privilege-ui[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true
                },
                tiklabPluginUI: {
                    name: 'chunk-tiklab-plugin-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]tiklab-plugin-ui[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true
                },
                tiklabCoreUI: {
                    name: 'chunk-tiklab-core-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]tiklab-core-ui[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true
                },
                tiklabMessageUI: {
                    name: 'tiklab-message-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]tiklab-message-ui[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true
                },
                tiklabEamUI: {
                    name: 'chunk-tiklab-eam-cloud-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]tiklab-eam-cloud-ui[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true
                },
                tiklabIntegrationUI: {
                    name: "chunk-tiklab-integration-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-integration-ui[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true
                },
                tiklabLicenceUI: {
                    name: "chunk-tiklab-licence-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-licence-ui[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true
                },


                mobx: {
                    name: 'chunk-mobx',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]mobx[\\/]/,
                    priority: 20,
                    reuseExistingChunk: true
                },
                mobxReact: {
                    name: 'chunk-mobx-react',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]mobx-react[\\/]/,
                    priority: 20,
                    reuseExistingChunk: true
                },
                rcomponent: {
                    name: "rcomponent",
                    chunks: "all",
                    test: /rc-[a-zA-Z]/,
                    priority: 35,
                    reuseExistingChunk: true
                },
                // antIcon: {
                //     name: 'ant-icon',
                //     chunks: 'all',
                //     test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
                //     priority: 5,
                //     reuseExistingChunk: true
                // },
                antdUI: {
                    name: 'antd-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    priority: 35,
                    reuseExistingChunk: true
                },
                moment: {
                    name: 'chunk-moment',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    priority: 35,
                    reuseExistingChunk: true
                },
                zrender:{
                    name: "chunk-zrender",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]zrender[\\/]/,
                    priority: 30,
                    reuseExistingChunk: true
                },



                mockjs: {
                    name: "chunk-mockjs",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]mockjs[\\/]/,
                    priority: 8,
                    reuseExistingChunk: true
                },
                monacoEditor: {
                    name: "chunk-monaco-editor",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
                    priority: 8,
                    reuseExistingChunk: true
                },
                codemirror: {
                    name: 'chunk-codemirror-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]codemirror[\\/]/,
                    priority: 8,
                    reuseExistingChunk: true
                },
                jsBeautify: {
                    name: "chunk-js-beautify",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]js-beautify[\\/]/,
                    priority: 8,
                    reuseExistingChunk: true
                },
                reactMonacoEditor: {
                    name: "chunk-react-monaco-editor",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]react-monaco-editor[\\/]/,
                    priority: 8,
                    reuseExistingChunk: true
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
            })
        ]
    },
});
