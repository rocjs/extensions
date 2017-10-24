import { isString, isObject, isBoolean } from 'roc/validators';
import { generateDependencies, lazyFunctionRequire } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

import { name, packageJSON } from './util';

const lazyRequire = lazyFunctionRequire(require);

export default {
    required: {
        'roc-package-webpack-web-dev': '^1.0.0-beta',
    },
    plugins: [
        require.resolve('roc-abstract-plugin-test'),
    ],
    dependencies: {
        exports: generateDependencies(packageJSON, ['expect']),
    },
    config,
    meta,
    actions: [{
        hook: 'run-test-command',
        description: 'Adds support for running tests with Karma using Webpack.',
        action: lazyRequire('../actions/test'),
    }, {
        extension: name,
        hook: 'build-webpack',
        description: 'Adds Webpack configuration specific for tests. Will provide an alias for the src directory, ' +
            'meaning that it is possible to use "src/" as a root for the resolving.',
        action: lazyRequire('../actions/webpack'),
    }, {
        hook: 'babel-config',
        action: lazyRequire('../actions/babel'),
    }, {
        hook: 'build-karma-config',
        description: 'Builds the default Karma configuration',
        action: lazyRequire('../karma'),
    }],
    hooks: {
        'build-webpack': {
            description: 'Used to create the final Webpack configuration object for tests.',
            initialValue: {},
            returns: isObject(),
            arguments: {
                target: {
                    validator: isString,
                    description: 'The target for which the Webpack configuration should be build for.',
                },
                babelConfig: {
                    validator: isObject(),
                    description: 'The Babel configuration that should be used for the Webpack build.',
                },
            },
        },
        'babel-config': {
            description: 'Used to create a Babel configuration to be used in the Webpack build for test.',
            initialValue: {},
            returns: isObject(),
            arguments: {
                target: {
                    validator: isString,
                    description: 'The target that is used.',
                },
                coverage: {
                    validator: isBoolean,
                    description: 'If the code should be prepared for coverage generation.',
                },
            },
        },
        'build-karma-config': {
            description: 'Used to create the final Karma configuration for tests.',
            initialValue: {},
            returns: isObject(),
            arguments: {
                grep: {
                    validator: isString,
                    description: 'RegExp that will be compiled by Mocha and limit what tests that should run.',
                },
                watch: {
                    validator: isBoolean,
                    description: 'If watch mode should be enabled.',
                },
                coverage: {
                    validator: isBoolean,
                    default: true,
                    description: 'If coverage should be generated.',
                },
                webpackConfig: {
                    validator: isObject(),
                    description: 'Webpack configuration to use.',
                },
            },
        },
    },
    commands: {
        development: {
            test: {
                override: 'roc-abstract-plugin-test',
                options: {
                    grep: {
                        alias: 'g',
                        description: 'Will only run tests that match the given pattern. Will be compiled to a RegExp.',
                        validator: isString,
                    },
                    watch: {
                        alias: 'w',
                        description: 'If the tests should run in watch mode.',
                        default: false,
                        validator: isBoolean,
                    },
                    coverage: {
                        description: 'If coverage reports should be generated for the code.',
                        default: true,
                        validator: isBoolean,
                    },
                },
            },
        },
    },
};
