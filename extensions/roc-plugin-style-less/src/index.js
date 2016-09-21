// eslint-disable-next-line
export const roc = {
    actions: [{
        extension: 'roc-plugin-style-css',
        hook: 'add-style',
        description: 'Adds Less support to Webpack.',
        action: () => () => () => ({
            extensions: ['less'],
            loaders: require.resolve('less-loader'),
        }),
    }],
};
