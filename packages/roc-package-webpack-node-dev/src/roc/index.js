import builder from '../builder';
import watcher from '../watcher/server';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

import { name } from './util';

export default {
    name,
    config,
    meta,
    packages: [
        require.resolve('roc-package-webpack-dev'),
        require.resolve('roc-package-webpack-node')
    ],
    actions: {
        webpack: {
            description: 'Adds configuration needed for building for Node.',
            hook: 'build-webpack',
            action: builder
        },
        target: {
            description: 'Adds __node__ as a valid Webpack target.',
            extension: 'roc-package-webpack-dev',
            hook: 'get-webpack-targets',
            action: () => ({ previousValue }) => () => () => previousValue.concat('node')
        },
        watcher: {
            description: 'Adds a watcher for automatic reload on change.',
            extension: 'roc-package-webpack-dev',
            hook: 'create-watchers',
            action: () => ({ previousValue }) => () => () => ({
                ...previousValue,
                node: watcher
            })
        }
    },
    hooks: {
        'dev-process-created': {
            description: 'Used to react to when the development server has started.',
            arguments: [{
                name: 'serverProcess',
                description: 'The created server process.'
            }]
        }
    }
};
