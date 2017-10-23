import cleanPromise from '../helpers/cleanPromise';
import { invokeHook } from '../roc/util';

/**
 * Cleans the build files.
 */
export default function clean({ context: { directory } }) {
    /*
    * Using hooks here more for documentation purposes than for actual functionality.
    * Will consider to revert back to not using hooks here, we should only use them when we need to.
    */
    Promise.all(invokeHook('before-clean').map((path) => cleanPromise(path, directory)))
        .then(invokeHook('after-clean'));
}
