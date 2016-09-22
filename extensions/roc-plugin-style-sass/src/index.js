import { isBoolean, required } from 'roc/validators';

const BOURBON_PATH = require('bourbon').includePaths;

// eslint-disable-next-line
export const roc = {
    required: {
        'roc-plugin-style-css': '^1.0.0-beta',
    },
    config: {
        settings: {
            build: {
                sass: {
                    useBourbon: true,
                },
            },
        },
    },
    meta: {
        settings: {
            build: {
                sass: {
                    useBourbon: {
                        description: 'If Bourbon should be made available to include easily with `@import "bourbon";`.',
                        validator: required(isBoolean),
                    },
                },
            },
        },
    },
    actions: [{
        extension: 'roc-plugin-style-css',
        hook: 'add-style',
        description: 'Adds Sass support to Webpack.',
        action: ({ context: { config: { settings } } }) => () => () => ({
            extensions: ['sass', 'scss'],
            loaders: `${require.resolve('sass-loader')}?${settings.build.sass.useBourbon ?
                `includePaths[]=${BOURBON_PATH}` : ''
            }`,
        }),
    }],
};
