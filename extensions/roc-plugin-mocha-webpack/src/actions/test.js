import { appendSettings } from 'roc';

import { invokeHook } from '../roc/util';
import nycRunner from '../nyc';

export default () => (targets, { options: { grep, watch, coverage } }) => {
    if (targets.find((target) => target === 'node')) {
        return () => {
            appendSettings({ build: { mode: 'test' } });
            // Create Webpack configuration that is to be used in a node.
            const webpackConfig = invokeHook('build-webpack', 'node', coverage);

            nycRunner({ grep, watch, coverage, webpackConfig });
        };
    }

    return undefined;
};
