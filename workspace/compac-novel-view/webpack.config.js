var path = require('path');
var webpack = require('webpack');

var paths = (function () {
    var rootPath = path.join(__dirname, './');
    return {
        root: rootPath,
        nodeModules: path.join(rootPath, './node_modules/'),
        src: path.join(rootPath, './src'),
        output: path.join(rootPath, './_build')
    };
})();

module.exports = {
    entry: {
        bundle: [
            path.join(paths.nodeModules, '/normalize.css/normalize.css'),
            path.join(paths.src, '/index.js')
        ]
    },
    output: {
        path: paths.output,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'es2016', 'react'],
                    plugins: ['transform-runtime', 'transform-class-properties']
                }
            },
            {
                test: /\.s?css$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: []
};
