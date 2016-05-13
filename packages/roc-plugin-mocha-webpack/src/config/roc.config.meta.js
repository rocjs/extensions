import {
    isPath,
    isRegExp,
    isString,
    isBoolean,
    oneOf
} from 'roc/validators';

import {
    toBoolean
} from 'roc/converters';

export default {
    settings: {
        groups: {
            test: {
                node: 'Settings related to testing for Node.'
            }
        },
        descriptions: {
            test: {
                node: {
                    entry: 'The entry point that Webpack should be using for the tests, will not be needed to be ' +
                        'changed in most situations.',
                    tests: {
                        path: 'The base path to start resolving tests from, should not be the root of the project.',
                        pattern: 'Should be either a glob pattern for which the test files are located or a RegExp. ' +
                            'Will be used if no custom entry point is defined. Will be used to get correct code ' +
                            'coverage.'
                    },
                    src: {
                        path: 'The base path to start resolving src files from, should not be the root of the project.',
                        pattern: 'Should be either a glob pattern for which the src files are located or a RegExp. ' +
                            'Will be used if no custom entry point is defined. Will be used to get correct code ' +
                            'coverage.'
                    }
                }
            }
        },
        validations: {
            build: {
                mode: /^dev|dist|test$/i
            },
            test: {
                node: {
                    entry: isPath,
                    tests: {
                        path: isPath,
                        pattern: oneOf(isRegExp, isString)
                    },
                    src: {
                        path: isPath,
                        pattern: oneOf(isRegExp, isString)
                    }
                }
            }
        }
    },
    commands: {
        test: {
            options: [{
                name: 'grep',
                shortname: 'g',
                description: 'Will only run tests that match the given pattern. Will be compiled to a RegExp by Mocha.',
                validation: isString
            }, {
                name: 'watch',
                shortname: 'w',
                description: 'If the tests should run in watch mode.',
                default: false,
                validation: isBoolean
            }, {
                name: 'coverage',
                description: 'If coverage reports should be generated for the code.',
                default: true,
                validation: isBoolean,
                converter: toBoolean
            }]
        }
    }
};
