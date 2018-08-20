module.exports = {
    entry: [
        './src/index.js'
    ],
    module: {
        loaders: [{
            test: /\.js$/, // Transform all JavaScript files
            exclude: /node_modules/, // Except those under node_modules directory
            loader: 'babel-loader' // Transform using Bable
        }]
    },
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './build'
    }
};