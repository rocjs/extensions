import {
    isString,
    isPath,
    isArray,
    required,
    notEmpty,
} from 'roc/validators';

export default {
    settings: {
        dev: {
            __meta: {
                description: 'Development settings.',
            },
            debug: {
                description: 'Filter for debug messages that should be shown during development, see ' +
                    'https://npmjs.com/package/debug.',
                validator: notEmpty(isString),
            },
        },
        build: {
            __meta: {
                description: 'Build settings.',
            },
            targets: {
                description: 'For what targets the code should be built for.',
                validator: required(notEmpty(isArray(isString))),
            },
            input: {
                description: 'The entry point for the build.',
                validator: required(notEmpty(isPath)),
            },
            output: {
                description: 'The output directory for the build.',
                validator: required(notEmpty(isPath)),
            },
        },
    },
};
