import { isString, isPath, isBoolean } from 'roc/validators';
import { lazyFunctionRequire } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

import { name } from './util';

const lazyRequire = lazyFunctionRequire(require);

export default {
    config,
    meta,
    actions: [{
        extension: name,
        hook: 'register-runtime',
        description: 'Adds the base runtime. Will resolve node paths and enable source map support.',
        action: lazyRequire('../runtime'),
    }],
    hooks: {
        'get-potential-target': {
            description: 'Use to define for what target that it should try to find a resource for too start with.',
            initialValue: 'node',
            returns: isString,
        },
        'register-runtime': {
            description: 'Can be used to modify the runtime before an application starts.',
            arguments: [{
                name: 'verbose',
                validator: isBoolean,
            }],
        },
    },
    commands: {
        start: {
            command: lazyRequire('../commands/start'),
            settings: ['runtime'],
            description: 'Starts the current project.',
            arguments: [{
                name: 'artifact',
                validator: isPath,
                description: 'Path to an artifact to start.',
            }],
        },
    },
};
