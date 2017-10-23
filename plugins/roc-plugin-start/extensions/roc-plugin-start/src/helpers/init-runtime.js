import log from 'roc/log/default/small';

import { invokeHook } from '../roc/util';

export default function initRuntime(verbose, silent = false) {
    // Init additional runtimes
    invokeHook('register-runtime', verbose);

    if (!silent) {
        log.info('Roc runtime has been initialized.');
    }
}
