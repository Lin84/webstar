'use strict';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');

/**
 * Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ModuleConcatenationPlugin = webpack.optimize.ModuleConcatenationPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const NamedModulesPlugin = webpack.NamedModulesPlugin;

/**
 * define the config either for production mode or development mode
 */
const isProd = process.env.NODE_ENV === 'production'; // @return {boolean}
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    /**
     * this publicPath cause problem with image loading in the production mode in css
     * the pathe of the image in the css /distimages/[image file]
     */
    publicPath: '/dist',

    use: ['css-loader', 'sass-loader']
});
const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        vendor: [
            bootstrapConfig
        ],
        main: './src/scrips/main.js'
    },

    output: {
        path: path.resolve(__dirname + './../dist'),
        filename: 'scrips/[name].bundle.js'
    },

    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: 'css-loader'
            //     })
            // },
            {
                test: /\.scss$/,
                use: cssConfig
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
                                'src/templates'
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
        port: 1111,
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
        new ModuleConcatenationPlugin()
    ]
}
