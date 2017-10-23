import { isString, isObject, isBoolean, isArray, isPath } from 'roc/validators';
import { generateDependencies, lazyFunctionRequire } from 'roc';

import config from '../config/roc.config';
import meta from '../config/roc.config.meta';

import { packageJSON } from './util';

const lazyRequire = lazyFunctionRequire(require);

const jestOptions = require('jest-cli/build/cli/args').options;

Object.keys(jestOptions)
    .forEach((key) => {
        if (jestOptions[key].type === 'boolean') {
            jestOptions[key].validator = isBoolean;
        } else if (jestOptions[key].type === 'string') {
            jestOptions[key].validator = isString;
        } else if (jestOptions[key].type === 'array') {
            jestOptions[key].validator = isArray(isPath);
        }
        // Remove aliases that are used by Roc to avoid collisions
        if (['b', 'c', 'd', 'h', 'V', 'v'].indexOf(jestOptions[key].alias) > -1) {
            jestOptions[key].alias = undefined;
        }
    });

export default {
    required: {
        roc: '^1.0.0-rc.18',
        'roc-package-webpack-dev': '^1.0.0-beta.7',
    },
    config,
    meta,
    commands: {
        development: {
            test: {
                override: ['roc-abstract-plugin-test'],
                options: jestOptions,
            },
        },
    },
    dependencies: {
        uses: generateDependencies(packageJSON, [
            'jest',
        ]),
        exports: generateDependencies(packageJSON, [
            'react-test-renderer',
        ]),
    },
    actions: [{
        hook: 'run-test-command',
        description: 'Adds support for running tests with Jest.',
        action: lazyRequire('../actions/test'),
    }],
    hooks: {
        'babel-config': {
            description: 'Used to create a Babel configuration to be used with Jest.',
            initialValue: {},
            returns: isObject(),
            arguments: {
                target: {
                    validator: isString,
                    description: 'The target that is used.',
                },
            },
        },
        'build-webpack': {
            description: 'Used to create a Babel configuration to be used with Jest.',
            initialValue: {},
            returns: isObject(),
            arguments: {
                target: {
                    validator: isString,
                    description: 'The target that is used.',
                },
                babelConfig: {
                    validator: isObject(),
                    description: 'The target that is used.',
                },
            },
        },
    },
    plugins: [
        require.resolve('roc-abstract-plugin-test'),
    ],
};
