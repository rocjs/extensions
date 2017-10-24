export default {
    config: {
        settings: {
            dev: {
                hotMiddleware: {
                    reload: false,
                },
            },
        },
    },
    actions: [{
        hook: 'babel-config',
        description: 'Adds the needed Babel configuration to be able to build and develop React code.',
        action: ({ context: { config } }) => (target) => (babelConfig) => {
            babelConfig.presets.push(require.resolve('babel-preset-react'));

            if (target === 'web' && config.settings.build.mode === 'dev') {
                babelConfig.plugins.push([
                    require.resolve('babel-plugin-react-transform'), {
                        transforms: [
                            {
                                transform: require.resolve('react-transform-hmr'),
                                imports: ['react'],
                                locals: ['module'],
                            },
                            {
                                transform: require.resolve('react-transform-catch-errors'),
                                imports: ['react', require.resolve('redbox-react')],
                            },
                        ],
                    },
                ]);
            }

            return babelConfig;
        },
    }],
};
