import { appendSettings } from 'roc';

import { invokeHook } from '../roc/util';
import nycRunner from '../nyc';

export default () => (targets, { grep, watch, coverage, runtime }) => {
    if (targets.find((target) => target === 'node')) {
        return () => {
            // By default set coverage to true in non-watch
            const cover = coverage === undefined ? !watch : coverage;

            appendSettings({ build: { mode: 'test' } });

            // Create Webpack configuration that is to be used in a node.
            const babelConfig = invokeHook('babel-config', 'node', cover);
            const webpackConfig = invokeHook('build-webpack', 'node', babelConfig);

            nycRunner({ grep, watch, coverage: cover, runtime, webpackConfig });
        };
    }

    return undefined;
};
