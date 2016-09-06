var path = require('path');
var webpack = require('webpack');
var wds = {
  hostname: process.env.HOSTNAME || "localhost",
  port: 8080
};

var publicPath = "http://" + wds.hostname + ":" + wds.port + "/dist";

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware',
        path.resolve(__dirname, 'master/src/client')
    ],
    devServer: {
        publicPath: publicPath,
        hot: true,
        inline: false,
        lazy: false,
        quiet: true,
        headers: {"Access-Control-Allow-Origin": "*"},
        stats: {colors: true},
        host: wds.hostname
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: publicPath,
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false}),
        new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loaders: ['react-hot']
        }, {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react'],
                compact: false
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            loader: 'url?prefix=font/&limit=10000'
        }]
    }
};
