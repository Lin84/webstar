'use strict';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const cssConfig = require('./css.config');

/**
 * Plugins:
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ModuleConcatenationPlugin = webpack.optimize.ModuleConcatenationPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const NamedModulesPlugin = webpack.NamedModulesPlugin;

/**
 * define the config either for production mode or development mode
 */
const isProd = process.env.NODE_ENV === 'production'; // @return {boolean}
const cssSetup = isProd ? cssConfig.prod : cssConfig.dev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        vendor: [
            bootstrapConfig
        ],
        main: './src/scripts/main.js'
    },

    output: {
        path: path.resolve(__dirname + './../dist'),
        filename: 'scripts/[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssSetup
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(woff2?)$/,
                use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /\.(njk|nunjucks|nunj)$/,
                use: [
                    {
                        loader: 'nunjucks-html-loader',
                        options: {
                            'searchPaths': [
                                'src/templates',
                                'src/templates/partials'
                            ],
                        },
                    },
                ],
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 8484,
        stats: 'errors-only',
        hot: true
    },

    plugins: [
        /**
         * the set up of 2 plugins below help to set the custom loading scripts order in the HTML:
         */
        // order in array does matters 0 - commons, 1 - vendor:
        new CommonsChunkPlugin({
            names: ['common', 'vendor'],
            minChunks: 2
        }),

        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'html-loader?interpolate!nunjucks-html-loader!' + path.resolve('./src', 'templates/index.nunj'),
             // order in array here doesn't matters:
            chunks: [
                'vendor',
                'main'
            ]
        }),

        new ExtractTextPlugin({
            filename: './styles/[name].css',
            disable: !isProd,
            allChunks: true
        }),

        /**
         * To enable hot module reloading globally
         * currently does not work with browser sync
         */
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),

        /**
         * to remove unused styles or css classes
         */
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),

        /**
         * to enable scope hoisting
         */
        new ModuleConcatenationPlugin(),

        new BrowserSyncPlugin(
            // BrowserSync options
            {
                host: 'localhost',
                port: 3000,
                // proxy the Webpack Dev Server endpoint
                // (which should be serving on http://localhost:1111/)
                // through BrowserSync
                proxy: 'http://localhost:8484/'
            },
            // plugin options
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                reload: true
            }
        ),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ]
}
