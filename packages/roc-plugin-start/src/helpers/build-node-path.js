import { invokeHook } from '../roc/util';

/**
 * Used on the server to find all dependencies.
 *
 * When creating a extension of this project this needs to be extended.
 *
 * @example
 * import path from 'path';
 * import { getNodeResolvePath } from 'roc-web';
 *
 * export default function(...resolvePaths) {
 *     return getResolvePath(path.join(__dirname, '..', 'node_modules'), ...resolvePaths);
 * }
 *
 * @returns {string} Path that can be used with `Module._initPaths()`.
 */
export default function buildNodePath(verbose = false) {
    const delimiter = process.platform === 'win32' ?
        ';' :
        ':';

    let paths = [];
    invokeHook('get-resolve-paths')((resolvePaths) => {
        paths = paths.concat(resolvePaths);
    });

    if (paths.length && verbose) {
        console.log('The following resolve paths have been added:\n', paths.join('\n'));
    }

    return paths.join(delimiter);
}
