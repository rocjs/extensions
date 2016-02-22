import { isString, isArray } from 'roc/validators';

import config from './config/roc.config.js';
import meta from './config/roc.config.meta.js';

import { name } from './util';

export default {
    config,
    meta,
    name,
    packages: [
        require.resolve('roc-package-core-dev'),
        require.resolve('roc-package-module')
    ],
    actions: {
        babelPresets: {
            extension: 'roc-package-module-dev',
            hook: 'babel-load-presets',
            description: 'Will add either babel-preset-es2015 (for es5) or babel-preset-es2015-webpack (for es6).',
            action: () => ({ previousValue }) => (target) => {
                return target === 'es5' ?
                    previousValue.concat(require.resolve('babel-preset-es2015')) :
                    previousValue.concat(require.resolve('babel-preset-es2015-webpack'));
            }
        }
    },
    hooks: {
        'babel-load-presets': {
            description: 'Expected to return a presets to add to the array of presets to use.',
            initialValue: [],
            returns: isArray(isString),
            arguments: [{
                name: 'target',
                validation: isString,
                description: 'The target, will by default be either es5 or es6.'
            }]
        },

        'babel-load-plugins': {
            description: 'Expected to return a concatenated array with the final presets to use.',
            initialValue: [],
            returns: isArray(isString),
            arguments: [{
                name: 'target',
                validation: isString,
                description: 'The target, will by default be either es5 or es6.'
            }]
        }
    }
};
