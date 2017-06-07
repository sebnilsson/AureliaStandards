const path = require('path');

const TsConfigPathsPlugin = require('awesome-typescript-loader');
const { CheckerPlugin } = require("awesome-typescript-loader");
const webpack = require("webpack");

const srcDir = path.resolve(__dirname, './src/react/');
const sharedDir = path.resolve(__dirname, './src/shared/');
const distDir = path.resolve(__dirname, './wwwroot/dist/');
const nodeModulesDir = path.resolve(__dirname, './node_modules');

//console.log(`__dirname: '${__dirname}'`);
//console.log(`srcDir: '${srcDir}'`);
//console.log(`distDir: '${distDir}'`);
//console.log(`nodeModulesDir: '${nodeModulesDir}'`);

module.exports = {
    entry: { 'react-app': ['./src/react/main.tsx'] },
    output: {
        path: distDir,
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        modules: [sharedDir, srcDir, 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                loader: 'awesome-typescript-loader',
                //include: srcDir,
                exclude: /node_modules/
            },
            //{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        //new CheckerPlugin(),
        //new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            "React": "react"
        }),
        //new TsConfigPathsPlugin(path.resolve(__dirname, './tsconfig.json'))
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};