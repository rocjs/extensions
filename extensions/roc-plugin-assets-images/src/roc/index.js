import { lazyFunctionRequire } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

const lazyRequire = lazyFunctionRequire(require);

export default {
    config,
    meta,
    actions: [{
        hook: 'build-webpack',
        description: 'Adds image support. Also makes `url-loader` and `file-loader` available in the module scope.',
        action: lazyRequire('../images'),
    }],
};
