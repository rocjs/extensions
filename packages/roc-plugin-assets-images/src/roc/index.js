import {
    isObject,
    isArrayOrSingle
} from 'roc/validators';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';
import { default as imageAction } from '../images';

import { name } from './util';

export default {
    name,
    config,
    meta,
    actions: {
        images: {
            hook: 'build-webpack',
            description: 'Adds images support.',
            action: imageAction
        }
    },
    hooks: {
        'add-image': {
            description: `
            Used for adding additional image loaders.

            Important that the _actions_ return an array with loaders or a single loader
            `,
            hasCallback: true,
            returns: isArrayOrSingle(isObject())
        }
    }
};
