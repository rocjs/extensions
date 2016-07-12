import { lazyFunctionRequire } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

const lazyRequire = lazyFunctionRequire(require);

export default {
    config,
    meta,
    packages: [
        require.resolve('roc-package-webpack-dev'),
        require.resolve('roc-package-webpack-node'),
    ],
    actions: [{
        description: 'Adds configuration needed for building for Node.',
        hook: 'build-webpack',
        action: lazyRequire('../webpack'),
    }, {
        description: 'Adds __node__ as a valid Webpack target.',
        extension: 'roc-package-webpack-dev',
        hook: 'get-webpack-targets',
        action: ({ previousValue }) => () => () => previousValue.concat('node'),
    }, {
        description: 'Adds a watcher for automatic reload on change.',
        extension: 'roc-package-webpack-dev',
        hook: 'create-watchers',
        action: ({ previousValue }) => () => () => ({
            ...previousValue,
            node: lazyRequire('../watcher/server'),
        }),
    }],
    hooks: {
        'dev-process-created': {
            description: 'Used to react to when the development server has started.',
            arguments: [{
                name: 'serverProcess',
                description: 'The created server process.',
            }],
        },
    },
};
