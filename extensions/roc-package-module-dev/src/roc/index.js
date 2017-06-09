import { isString, isArray, isObject } from 'roc/validators';
import { lazyFunctionRequire, generateDependencies } from 'roc';

import config from '../config/roc.config';
import meta from '../config/roc.config.meta';

const lazyRequire = lazyFunctionRequire(require);

const defaultSettings = {
    settings: ['build'],
    arguments: {
        targets: {
            validator: isArray(/^cjs$|^esm$/),
        },
    },
    override: 'roc-abstract-package-base-dev',
};

export default {
    description: `
        Package providing module support.

        Will build code using Babel for either CommonJS or ES Modules.`,
    config,
    meta,
    plugins: [
        require.resolve('roc-plugin-babel'),
    ],
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
    dependencies: {
        uses: generateDependencies(require('../../package.json'), [ // eslint-disable-line
            'babel-core',
            'babel-preset-latest',
        ]),
    },
    actions: [{
        hook: 'babel-config',
        extension: 'roc-package-module-dev',
        description: 'Adds babel-preset-latest with either modules enabled or not depending on the target',
        action: () => target => babelConfig => ({
            ...babelConfig,
            presets: target === 'cjs' ?
                [...babelConfig.presets, require.resolve('babel-preset-latest')] :
                [[require.resolve('babel-preset-latest'), { es2015: { modules: false } }], ...babelConfig.presets],
        }),
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
                    description: 'The target, will by default be either "cjs" or "esm".',
                },
            },
        },
        'babel-config': {
            description: 'Used to create a Babel configuration to be used.',
            initialValue: {},
            returns: isObject(),
            arguments: {
                target: {
                    validator: isString,
                    description: 'The target, will by default be either "cjs" or "esm".',
                },
            },
        },
    },
};
