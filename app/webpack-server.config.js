var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');

var root = path.join(__dirname);

var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/server/server.ts',
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    externals: nodeModules,
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,

        host: 'localhost', // Defaults to `localhost`
        proxy: {
            '^/test/*': {
                target: 'http://localhost:3000/api/',
                secure: false
            }
        }
    },
    // and separately, in your plugins section
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        })
    ]

};

