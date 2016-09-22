import { isString, isArray } from 'roc/validators';
import { lazyFunctionRequire } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

const lazyRequire = lazyFunctionRequire(require);

const defaultSettings = {
    settings: ['build'],
    arguments: {
        targets: {
            validator: isArray(/^es5$|^es6$/),
        },
    },
    override: 'roc-abstract-package-base-dev',
};

export default {
    description: `
        Package providing module support.

        Will build code using Babel for either ES5 or ES6.`,
    config,
    meta,
    packages: [
        require.resolve('roc-abstract-package-base-dev'),
    ],
    commands: {
        development: {
            build: {
                ...defaultSettings,
            },
            dev: {
                ...defaultSettings,
            },
        },
    },
    actions: [{
        extension: 'roc-package-module-dev',
        hook: 'babel-load-presets',
        description: 'Will add either babel-preset-es2015 (for es5) or babel-preset-es2015-webpack (for es6).',
        action: ({ previousValue }) => (target) => () => (
            target === 'es5' ?
                previousValue.concat(require.resolve('babel-preset-es2015')) :
                previousValue.concat(require.resolve('babel-preset-es2015-webpack'))
        ),
    }, {
        hook: 'run-build-command',
        action: lazyRequire('../actions/build'),
    }, {
        hook: 'run-dev-command',
        action: lazyRequire('../actions/dev'),
    }],
    hooks: {
        'after-clean': {
            description: 'Expected to return a presets to add to the array of presets to use.',
            initialValue: [],
            returns: isArray(isString),
            arguments: {
                target: {
                    validator: isString,
                    description: 'The target, will by default be either es5 or es6.',
                },
            },
        },
        'babel-load-presets': {
            description: 'Expected to return a presets to add to the array of presets to use.',
            initialValue: [],
            returns: isArray(isString),
            arguments: {
                target: {
                    validator: isString,
                    description: 'The target, will by default be either es5 or es6.',
                },
            },
        },

        'babel-load-plugins': {
            description: 'Expected to return a concatenated array with the final presets to use.',
            initialValue: [],
            returns: isArray(isString),
            arguments: {
                target: {
                    validator: isString,
                    description: 'The target, will by default be either es5 or es6.',
                },
            },
        },
    },
};
