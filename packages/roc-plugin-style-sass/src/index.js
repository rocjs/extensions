import { isBoolean } from 'roc/validators';

export const roc = {
    name: require('../package.json').name,
    config: {
        settings: {
            build: {
                sass: {
                    useBourbon: true
                }
            }
        }
    },
    meta: {
        settings: {
            descriptions: {
                build: {
                    sass: {
                        useBourbon: 'If Bourbon should be made available to include easily with `@import "bourbon";`.'
                    }
                }
            },

            validations: {
                build: {
                    sass: {
                        useBourbon: isBoolean
                    }
                }
            }
        }
    },
    actions: {
        sass: {
            extension: 'roc-plugin-style-css',
            hook: 'add-style',
            description: 'Adds Sass support to Webpack.',
            action: () => ({ settings }) => () => () => ({
                extensions: ['sass', 'scss'],
                loaders: `${require.resolve('sass-loader')}?sourceMap${settings.build.sass.useBourbon ?
                    '&includePaths[]=' + require('bourbon').includePaths : ''
                }`
            })
        }
    }
};
