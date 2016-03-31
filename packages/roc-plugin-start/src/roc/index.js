import { isString, isArrayOrSingle } from 'roc/validators';

import defaultRuntime from '../runtime';
import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';
import { name } from './util';

export default {
    name,
    config,
    meta,
    actions: {
        runtime: {
            extension: name,
            hook: 'register-runtime',
            description: 'Adds the base runtime. Will resolve node paths and enable source map support.',
            action: defaultRuntime
        }
    },
    hooks: {
        'get-potential-target': {
            description: 'Use to define for what target that it should try to find a resource for to start with.',
            initialValue: 'node',
            returns: isString
        },
        'register-runtime': {
            description: 'Can be used to modify the runtime before an application starts.'
        },
        'get-resolve-paths': {
            description: 'Use to add paths that should be resolved before starting an application.',
            hasCallback: true,
            returns: isArrayOrSingle(isString)
        }
    }
};
