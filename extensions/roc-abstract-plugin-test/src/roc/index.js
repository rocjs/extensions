import { createInfoObject, isArray, isObject, isString, notEmpty, required } from 'roc/validators';
import { toArray } from 'roc/converters';

import test from '../commands/test';

// Take a validator that enforces that something is required and reverses it
const doNotRequire = (validator) => (input, info) => {
    if (info) {
        return {
            ...validator(null, true),
            required: false,
        };
    }
    if (input === undefined || input === null) {
        return true;
    }

    return validator(input);
};

export default {
    hooks: {
        'run-test-command': {
            description: 'Use to add things that should react to the build command being called.',
            arguments: {
                targets: {
                    validator: required(notEmpty(isArray(isString))),
                },
                managedOptions: {
                    validator: required(isObject()),
                },
            },
        },
    },
    commands: {
        development: {
            test: {
                command: test,
                description: 'Runs tests on the current project.',
                settings: true,
                arguments: {
                    targets: {
                        description: 'The targets the project should be tested for, ' +
                            'overrides the settings if provided',
                        converter: toArray(),
                    },
                },
            },
        },
    },
    postInit: ({ context: { meta: { settings } } }) => {
        // If we do not have any metaSettings we will use a fallback
        // This is to get good documentation generation
        const targets =
            settings && settings.build && settings.build && settings.build.targets ?
                doNotRequire(settings.build.targets.validator) :
                () => createInfoObject('Context based');
        return {
            roc: {
                commands: {
                    development: {
                        test: {
                            arguments: {
                                targets: {
                                    validator: targets,
                                },
                            },
                        },
                    },
                },
            },
        };
    },
};
