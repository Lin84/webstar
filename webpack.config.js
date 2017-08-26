var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Demo',
        // minify: {
        //     collapseWhitespace: true
        // },
        hash: true,
        template: './src/tpl/index.html'
        })
    ]
}
