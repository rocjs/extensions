import { lazyFunctionRequire } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

const lazyRequire = lazyFunctionRequire(require);

export default {
    config,
    meta,
    packages: [
        require.resolve('roc-package-webpack-dev'),
        require.resolve('roc-package-webpack-web'),
    ],
    actions: [{
        hook: 'build-webpack',
        description: 'Adds configuration need for web builds for Webpack.',
        action: lazyRequire('../webpack'),
    }, {
        description: 'Adds __web__ as a valid Webpack target.',
        extension: 'roc-package-webpack-dev',
        hook: 'get-webpack-targets',
        action: ({ previousValue }) => () => () => previousValue.concat('web'),
    }, {
        extension: 'roc-package-webpack-dev',
        hook: 'create-watchers',
        description: 'Adds a web watcher using Webpack Dev Server.',
        action: ({ previousValue }) => () => () => ({
            ...previousValue,
            web: lazyRequire('../watcher/client'),
        }),
    }],
};
