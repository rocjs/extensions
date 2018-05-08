import { isBoolean, required } from 'roc/validators';

const BOURBON_PATH = require('bourbon').includePaths;

// eslint-disable-next-line
export const roc = {
    required: {
        'roc-plugin-style-css': '^1.0.0-beta.5',
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
            loaders: [{
                loader: require.resolve('sass-loader'),
                options: {
                    includePaths: settings.build.sass.useBourbon ? [...BOURBON_PATH] : [],
                    sourceMap: !!settings.build.style.sourceMap,
                },
            }],
        }),
    }],
};
