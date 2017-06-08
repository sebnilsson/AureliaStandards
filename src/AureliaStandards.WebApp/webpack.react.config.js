const path = require('path');

const webpack = require("webpack");

const srcDir = path.resolve(__dirname, './src/react/');
const sharedDir = path.resolve(__dirname, './src/shared/');
const distDir = path.resolve(__dirname, './wwwroot/dist/');

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
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react"
        })
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};