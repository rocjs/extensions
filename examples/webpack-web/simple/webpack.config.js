const webpack = require('webpack');

module.exports = {
    plugins: [new webpack.DefinePlugin({
        'HELLO': JSON.stringify('Hi')
    })]
};
