import {
    isPath,
    isRegExp,
    isString,
    oneOf,
    notEmpty,
} from 'roc/validators';

export default {
    settings: {
        build: {
            mode: {
                override: 'roc-package-webpack-dev',
                validator: /^dev|dist|test$/i,
            },
        },
        test: {
            web: {
                __meta: {
                    description: 'Settings related to testing for the browser.',
                },
                entry: {
                    description: 'The entry point that Webpack should be using for the tests, will not be needed ' +
                        'to be changed in most situations.',
                    validator: notEmpty(isPath),
                },
                tests: {
                    path: {
                        description: 'The base path to start resolving tests from, should not be the root of the ' +
                            'project.',
                        validator: notEmpty(isPath),
                    },
                    pattern: {
                        description: 'Should be either a glob pattern for which the test files are located or a ' +
                            'RegExp. Will be used if no custom entry point is defined. Will be used to get correct ' +
                            'code coverage.',
                        validator: notEmpty(oneOf(isRegExp, isString)),
                    },
                },
                src: {
                    path: {
                        description: 'The base path to start resolving src files from, should not be the root of ' +
                        'the project.',
                        validator: notEmpty(isPath),
                    },
                    pattern: {
                        description: 'Should be either a glob pattern for which the src files are located or a ' +
                            'RegExp. Will be used if no custom entry point is defined. Will be used to get correct ' +
                            'code coverage.',
                        validator: notEmpty(oneOf(isRegExp, isString)),
                    },
                },
            },
        },
    },
};
