// eslint-disable-next-line
export const roc = {
    required: {
        'roc-plugin-style-css': '^1.0.0-beta.5',
    },
    actions: [{
        extension: 'roc-plugin-style-css',
        hook: 'add-style',
        description: 'Adds Less support to Webpack.',
        action: ({ context: { config: { settings } } }) => () => () => ({
            extensions: ['less'],
            loaders: require.resolve('less-loader') +
                settings.build.style.sourceMap ? '?sourceMap' : '',
        }),
    }],
};
