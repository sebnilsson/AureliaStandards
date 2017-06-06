const path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const srcDir = path.resolve(__dirname, './src/angular/');
const sharedDir = path.resolve(__dirname, './src/shared/');
const distDir = path.resolve(__dirname, './wwwroot/dist/');
const nodeModulesDir = path.resolve(__dirname, './node_modules');

//console.log(`__dirname: '${__dirname}'`);
//console.log(`srcDir: '${srcDir}'`);
//console.log(`distDir: '${distDir}'`);
//console.log(`nodeModulesDir: '${nodeModulesDir}'`);

module.exports = {
    entry: { 'angular-app': ['./src/angular/main.ts'] },
    output: {
        path: distDir,
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        //modules: [sharedDir, srcDir, 'node_modules']
        //modules: ['node_modules']
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