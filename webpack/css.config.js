const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    dev: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader'
        }
    ],

    prod: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        /**
         * this publicPath cause problem with image loading in the production mode in css
         * the pathe of the image in the css /distimages/[image file]
         */
        publicPath: '/dist',

        use: ['css-loader', 'sass-loader']
    })
}
