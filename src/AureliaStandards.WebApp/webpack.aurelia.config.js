const path = require('path');

const aureliaWebpackPlugin = require('aurelia-webpack-plugin');

const srcDir = path.resolve(__dirname, './src/aurelia/');
const sharedDir = path.resolve(__dirname, './src/shared/');
const distDir = path.resolve(__dirname, './wwwroot/dist/');
const nodeModulesDir = path.resolve(__dirname, './node_modules');

module.exports = {
    entry: { 'aurelia-app': ['aurelia-bootstrapper'] },
    output: {
        path: distDir,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [sharedDir, srcDir, 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: 'awesome-typescript-loader',
                exclude: nodeModulesDir
            },
            { test: /\.html$/i, use: 'html-loader' }
        ]
    },
    plugins: [
        new aureliaWebpackPlugin.AureliaPlugin({ 'aurelia-app': 'main' })
    ]
};