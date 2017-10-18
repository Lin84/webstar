'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),
    webpack = require('webpack'),
    bootstrapEntryPoints = require('./webpack.bootstrap.config'),
    glob = require('glob'),
    PurifyCSSPlugin = require('purifycss-webpack'),
    isProd = process.env.NODE_ENV === 'production', // true or false
    cssDev = ['style-loader', 'css-loader', 'sass-loader'],
    cssProd = ExtractTextPlugin.extract({
        fallback: 'style-loader',

        /**
         * this publicPath cause problem with image loading in the production mode in css:
         * the pathe of the image in the css: /distimages/[image file]
         */
        publicPath: '/dist',

        use: ['css-loader', 'sass-loader']
    });

/**
 * define the config either for production mode or development mode:
 */
const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        bootstrap: bootstrapConfig,
        main: './src/scrips/main.js'
    },
    output: {
        path: path.resolve(__dirname + './../dist'),
        filename: 'scrips/[name].bundle.js'
        // publicPath: '/dist/scrips'
    },
    module: {
        rules: [
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
                    // 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=./../',
                    // 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=[path]',
                    // 'file-loader?name=[name].[ext]&outputPath=images/',
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
        compress: true,
        port: 1111,
        stats: 'errors-only',
        // open: true,
        hot: true
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'Home page',
        //     // minify: {
        //     //     collapseWhitespace: true
        //     // },
        //     hash: true,
        //     excludeChunks: ['contact'],
        //     template: './src/templates/index.html'
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Contact Page',
        //     hash: true,
        //     filename: 'contact.html',
        //     chunks: ['contact'],
        //     template: './src/templates/contact.pug'
        // }),

        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'html-loader?interpolate!nunjucks-html-loader!' + path.resolve('./src', 'templates/index.nunj'),
        }),

        new ExtractTextPlugin({
            filename: './styles/[name].css',
            disable: !isProd,
            allChunks: true
        }),

        /**
         * enable hot module reloading globally:
         */
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        /**
         * Give paths to parse for rules. These should be absolute:
         * for now it now working properly with the plugin "ExtractTextPlugin":
         */
        // new PurifyCSSPlugin({
        //     paths: glob.sync(path.join(__dirname, 'src/*.html'))
        // })

        /**
         * to enable scope hoisting:
         */
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}
