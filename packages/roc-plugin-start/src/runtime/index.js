import buildNodePath from '../helpers/build-node-path';

export default () => ({ verbose }) => () => () => {
    // Init NODE_PATH if not set
    if (!process.env.NODE_PATH) {
        process.env.NODE_PATH = '';
    }

    process.env.NODE_PATH += buildNodePath(verbose);

    // Re-init Nodes module package with the new Node Path from above
    /* eslint-disable no-underscore-dangle */
    require('module').Module._initPaths();
    /* eslint-enable */

    // Get source map support
    require('source-map-support').install();
};
