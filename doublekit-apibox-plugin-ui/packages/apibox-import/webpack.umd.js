const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { version, name, description } = require("./package.json");
const distDir = path.join(process.cwd(), "dist");
const glob = require('glob')

const envData = require(`../../env/env-${process.env.API_ENV}`);

// 多页面打包的方法
const setMAP = () => {
    const entry = {};
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
    });

    return {
        entry,
    };
};

// 多页面打包的方法
const getPluginConfig = () => {
    const config = []
    const entryFiles = glob.sync(path.join(__dirname, './src/config.json'));
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/config\.json/);
        const pageName = match && match[1];
        config.push(
            new CopyPlugin({
                patterns: [
                        { from: entryFile, to: __dirname+"/dist/" }
                    ]
                }
            )
        )
    });

    return {
        config,
    };
};
const { config } = getPluginConfig();
const { entry } = setMAP();

module.exports = {
    mode: "production",
    entry: entry,
    output: {
        path: distDir,
        filename: (pathData) => {
            return `${pathData.chunk.name}/[name].js`
        },
        // 采用通用模块定义
        libraryTarget: "umd",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                            // modules: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                    }
                ]
            }
        ]
    },
    resolve: {
        enforceExtension: false,
        extensions: [".js", ".jsx", ".json", ".less", ".css"]

    },
    externals: {
        'react': 'react',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [distDir]
        }),
        new MiniCssExtractPlugin({
            filename: (pathData) => {
                return `${pathData.chunk.name}/[name].css`
            },
        }),

        new webpack.DefinePlugin( envData),

        new webpack.BannerPlugin(` \n ${name} v${version} \n ${description} ${fs.readFileSync(path.join(process.cwd(), "LICENSE"))}`)
    ].concat(config),
    //压缩js
    optimization: {
        minimizer: [
            new TerserPlugin({ cache: true, parallel: true, sourceMap: true }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)/g, //注意不要写成 /\.css$/g
                cssProcessor: require("cssnano"),
                cssProcessorOptions: {
                    //生成.css.map 文件
                    map: true,
                    discardComments: { removeAll: true },
                    safe: true,
                },
                canPrint: true
            })
        ]
    }
}
