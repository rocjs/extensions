import {
    isString,
    isObject,
    isBoolean
} from 'roc/validators';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

import test from '../actions/test';
import builder from '../actions/builder';

import resolvePath from '../helpers/resolve-path';

import { name, version } from './util';

export default {
    name,
    version,
    dependencies: {
        'roc-package-webpack-node': '^1.0.0-alpha'
    },
    plugins: [require.resolve('roc-abstract-plugin-test')],

    config,
    meta,
    actions: {
        mocha: {
            hook: 'run-test-command',
            description: 'Adds support for running tests with nyc using Webpack.',
            action: () => test
        },
        mochaWebpack: {
            extension: 'roc-plugin-test-mocha-webpack',
            hook: 'build-webpack',
            description: 'Adds Webpack configuration specific for tests.',
            action: () => builder
        },
        resolver: {
            extension: 'roc-plugin-start',
            hook: 'get-resolve-paths',
            action: () => () => () => () => resolvePath
        }
    },
    hooks: {
        'build-webpack': {
            description: 'Used to create the final Webpack configuration object for tests.',
            initialValue: {},
            returns: isObject(),
            arguments: [{
                name: 'target',
                validation: isString,
                description: 'The target for which the Webpack configuration should be build for.'
            }, {
                name: 'coverage',
                validation: isBoolean,
                description: 'If the code should be prepared for coverage generation.'
            }]
        }
    }
};
