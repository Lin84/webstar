const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8484,
        stats: 'errors-only',
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Demo',
        // minify: {
        //     collapseWhitespace: true
        // },
        hash: true,
        template: './src/tpl/index.html'
        }),
        new HtmlWebpackPlugin({
        title: 'Contact Page',
        hash: true,
        filename: 'contact.html',
        template: './src/tpl/contact.html'
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: false,
            allChunks: true
        })
    ]
}
