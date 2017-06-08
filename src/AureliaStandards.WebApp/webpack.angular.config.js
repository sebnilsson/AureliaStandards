const path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const distDir = path.resolve(__dirname, './wwwroot/dist/');

module.exports = {
    entry: { 'angular-app': ['./src/angular/main.ts'] },
    output: {
        path: distDir,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader?keepUrl=true'
                ],
            },
            { test: /\.html$/i, use: 'html-loader' }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            [
                `${distDir}angular-app.js`,
                `${distDir}templates`
            ]
        ),
        new CopyWebpackPlugin([
            { from: './src/angular/*.html', to: 'templates/', flatten: true }
        ])
    ]
};