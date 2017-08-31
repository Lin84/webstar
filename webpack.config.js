const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config')

const isProd = process.env.NODE_ENV === 'production'; // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    /*
        this publicPath cause problem with image loading in the production mode in css:
        the pathe of the image in the css: /distimages/[image file]
    */
    // publicPath: '/dist',
    use: ['css-loader', 'sass-loader']
});

const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        app: './src/app/app.js',
        contact: './src/app/contact.js',
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    // 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/',
                    // 'file-loader?name=[name].[ext]&outputPath=images/',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(woff2?|svg)$/,
                use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                use: 'imports-loader?jQuery=jquery'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8484,
        stats: 'errors-only',
        // open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Home page',
        // minify: {
        //     collapseWhitespace: true
        // },
        hash: true,
        excludeChunks: ['contact'],
        template: './src/tpl/index.html'
        }),
        new HtmlWebpackPlugin({
        title: 'Contact Page',
        hash: true,
        filename: 'contact.html',
        chunks: ['contact'],
        template: './src/tpl/contact.pug'
        }),
        new ExtractTextPlugin({
            filename: '/css/[name].css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin()
    ]
}
