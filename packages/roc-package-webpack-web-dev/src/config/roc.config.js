const config = {
    settings: {
        dev: {
            port: 3001,
            devMiddleware: {
                noInfo: true,
                quiet: false
            },
            hotMiddleware: {
                overlay: true,
                reload: true,
                noInfo: false,
                quiet: false
            }
        },

        build: {
            resources: [],
            targets: ['web']
        }
    }
};

/**
 * Exports the default `roc.config.js`.
 *
 * @return {object} The default `roc.config.js`.
 */
export default config;
