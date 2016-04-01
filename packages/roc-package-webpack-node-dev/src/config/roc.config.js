const config = {
    settings: {
        dev: {
            watch: [
                'roc.config.js'
            ]
        },

        build: {
            targets: ['node']
        }
    }
};

/**
 * Exports the default `roc.config.js`.
 *
 * @return {object} The default `roc.config.js`.
 */
export default config;
