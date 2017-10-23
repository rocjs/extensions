import {
    isArray,
    isBoolean,
    isInteger,
    isPath,
    oneOf,
    required,
} from 'roc/validators';

export default {
    settings: {
        build: {
            resources: {
                description: 'An array of files to include into the build process.',
                validator: required(isArray(isPath)),
            },
            targets: {
                override: 'roc-abstract-package-base-dev',
                validator: required(isArray(/^web$/i)),
            },
        },
        dev: {
            devMiddleware: {
                __meta: {
                    description: 'Settings for webpack-dev-middleware. ' +
                        'https://github.com/webpack/webpack-dev-middleware',
                },
                noInfo: {
                    description: 'If no info should be sent to the console.',
                    validator: isBoolean,
                },
                quiet: {
                    description: 'If nothing should be sent to the console.',
                    validator: isBoolean,
                },
                poll: {
                    description: 'If polling should be enabled.',
                    validator: oneOf(isBoolean, isInteger),
                },
                aggregateTimeout: {
                    description: 'Fire aggregated events at interval.',
                    validator: isInteger,
                },
            },
            hotMiddleware: {
                __meta: {
                    description: 'Settings for webpack-hot-middleware. ' +
                        'https://github.com/glenjamin/webpack-hot-middleware',
                },
                reload: {
                    description: 'If the browser should be reloaded if it fails to hot update the code.',
                    validator: isBoolean,
                },
                overlay: {
                    description: 'If a overlay should be shown when an error has occurred.',
                    validator: isBoolean,
                },
                noInfo: {
                    description: 'If no info should be sent to the console.',
                    validator: isBoolean,
                },
                quiet: {
                    description: 'If nothing should be sent to the console.',
                    validator: isBoolean,
                },
            },
        },
    },
};
