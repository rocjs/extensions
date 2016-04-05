import createBuilder from '../builder';
import watcher from '../watcher/client';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

const name = require('../../package.json').name;

export default {
    config,
    meta,
    name,
    packages: [
        require.resolve('roc-package-webpack-dev'),
        require.resolve('roc-package-webpack-web')
    ],
    actions: {
        webpack: {
            hook: 'build-webpack',
            description: 'Adds configuration need for web builds for Webpack.',
            action: () => createBuilder
        },
        target: {
            description: 'Adds __web__ as a valid Webpack target.',
            extension: 'roc-package-webpack-dev',
            hook: 'get-webpack-targets',
            action: () => ({ previousValue }) => () => () => previousValue.concat('web')
        },
        watcher: {
            extension: 'roc-package-webpack-dev',
            hook: 'create-watchers',
            description: 'Adds a web watcher using Webpack Dev Server.',
            action: () => ({ previousValue }) => () => () => ({
                ...previousValue,
                web: watcher
            })
        }
    }
};
