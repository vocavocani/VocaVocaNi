var path = require('path');
var webpack = require('webpack');

var config = {
    entry: "./client/router.react.jsx",

    output: {
        path: path.join(__dirname, "build"),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015", "stage-0"]
                }
            },
            {
                test:  /\.css?$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};

module.exports = config;