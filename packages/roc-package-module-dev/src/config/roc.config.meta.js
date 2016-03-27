import {
    isArray,
    isPath
} from 'roc/validators';

import {
    toArray
} from 'roc/converters';

const defaultSettings = {
    settings: ['build'],
    arguments: [{
        name: 'targets',
        validation: isArray(/^es5$|^es6$/),
        description: 'For what targets the project should be built for, overrides the settings if provided.',
        converter: toArray
    }]
};

const meta = {
    settings: {
        descriptions: {
            build: {
                output: {
                    es5: 'The output directory for the ES5 build.',
                    es6: 'The output directory for the ES6 build.'
                }
            }
        },
        validations: {
            build: {
                targets: isArray(/|^es5$|^es6$/i),
                output: {
                    es5: isPath,
                    es6: isPath
                }
            }
        }
    },
    commands: {
        build: {
            ...defaultSettings
        },
        dev: {
            ...defaultSettings
        }
    }
};

/**
 * Exports the `roc.config.meta.js`.
 *
 * @return {object} The `roc.config.meta.js`.
 */
export default meta;
