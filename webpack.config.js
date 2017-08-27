const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app/app.js',
        contact: './src/app/contact.js'
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'sass-loader'],
                //     publicPath: '/dist'
                // })
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8484,
        stats: 'errors-only',
        open: true,
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
            filename: 'styles.css',
            disable: true,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin()
    ]
}
