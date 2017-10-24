import { lazyFunctionRequire } from 'roc';

import { config, meta } from './config';

const lazyRequire = lazyFunctionRequire(require);

export default {
    config,
    meta,
    actions: [{
        action: lazyRequire('./browsersync'),
        description: 'Adds a Browsersync instance.',
        hook: 'server-started',
    }],
};
