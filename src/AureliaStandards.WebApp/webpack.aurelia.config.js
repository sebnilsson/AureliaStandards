const path = require('path');
//const webpack = require('webpack');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader');

const srcDir = path.resolve(__dirname, './src/aurelia/');
const sharedDir = path.resolve(__dirname, './src/shared/');
const distDir = path.resolve(__dirname, './wwwroot/dist/');
const nodeModulesDir = path.resolve(__dirname, './node_modules');

//console.log(`__dirname: '${__dirname}'`);
//console.log(`srcDir: '${srcDir}'`);
//console.log(`distDir: '${distDir}'`);
//console.log(`nodeModulesDir: '${nodeModulesDir}'`);

module.exports = {
    entry: { 'aurelia-app': ['aurelia-bootstrapper'] },
    output: {
        path: distDir,
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
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
            //use: 'ts-loader?silent=true' },
            { test: /\.html$/i, use: 'html-loader' }
        ]
    },
    plugins: [
        //new AureliaPlugin({ aureliaApp: 'main' })
        new AureliaWebpackPlugin.AureliaPlugin({ 'aurelia-app': 'main' }),
        //new TsConfigPathsPlugin(path.resolve(__dirname, './tsconfig.json'))
    ]
};