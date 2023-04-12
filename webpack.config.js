const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

module.exports = {
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:6].js',
        chunkFilename: '[name].[chunkhash:6].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ts|.tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: false
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]--[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({ overrideBrowserslist: ['last 2 versions'] }),
                                    require('postcss-discard-comments')({ removeAll: true })
                                ]
                            }
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            { test: /\.json(\?.*)?$/, loader: 'json-loader', type: 'javascript/auto' },
            { test: /\.woff(\?.*)?$/, type: 'asset/resource' },
            { test: /\.woff2(\?.*)?$/, type: 'asset/resource' },
            { test: /\.svg(\?.*)?$/, type: 'asset' },
            { test: /\.png(\?.*)?$/, type: 'asset' },
            { test: /\.jpg(\?.*)?$/, type: 'asset' },
            { test: /\.gif(\?.*)?$/, type: 'asset' }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    plugins: [
        new HTMLWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash:6].css' })
    ],
    devServer: {
        port: 3000,
        open: true,
        hot: IS_DEV
    },
    devtool: IS_PROD ? false : 'eval'
};