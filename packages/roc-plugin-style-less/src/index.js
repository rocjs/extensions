export const roc = {
    name: require('../package.json').name,
    actions: {
        less: {
            extension: 'roc-plugin-style-css',
            hook: 'add-style',
            description: 'Adds Less support to Webpack.',
            action: () => () => () => () => ({
                extensions: ['less'],
                loaders: `${require.resolve('less-loader')}?sourceMap`
            })
        }
    }
};
