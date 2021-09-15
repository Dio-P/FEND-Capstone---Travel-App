const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
/*import path from'path';
import webpack from'webpack';
import HtmlWebPackPlugin from'html-webpack-plugin';*/


module.exports = {
    entry: './src/client/index.js',
    module: {
        rules: [
                {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
                ],
            },
        ]
    },
    output: {
        libraryTarget: 'var',
        library: 'Client',
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
     },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        })
    ]
}