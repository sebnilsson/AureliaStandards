const path = require('path');
const ProvidePlugin = require('webpack');
const { AureliaPlugin } = require("aurelia-webpack-plugin");
const TsConfigPathsPlugin = require('awesome-typescript-loader');

const outDir = path.resolve(__dirname, '../wwwwroot/dist');
const srcDir = path.resolve(__dirname); //path.resolve(__dirname, 'src');
const nodeModulesDir = path.resolve(__dirname, '../node_modules');
const baseUrl = '/';

console.log(`__dirname: '${__dirname}'`);
console.log(`outDir: '${outDir}'`);
console.log(`srcDir: '${srcDir}'`);

module.exports = {
    entry: { main: "aurelia-bootstrapper", app: './app.ts' },

    output: {
        path: path.join(__dirname, "wwwroot", "dist"),
        filename: "app.js",
        publicPath: "/dist/"
    },

    //resolve: {
    //    extensions: [".ts"]
    //},

    module: {
        rules: [
            //{ test: /\.html$/i, loaders: "html-loader" },
            { test: /\.ts$/i, loaders: "awesome-typescript-loader", exclude: /node_modules/ }
        ]
    },

    plugins: [
        //new TsConfigPathsPlugin(),
        //new AureliaPlugin()
    ]
};
