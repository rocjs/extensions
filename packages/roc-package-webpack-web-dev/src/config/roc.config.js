const config = {
    settings: {
        dev: {
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
