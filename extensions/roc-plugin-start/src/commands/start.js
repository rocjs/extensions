import path from 'path';

import log from 'roc/log/default/small';
import { fileExists } from 'roc';
import { getValueFromPotentialObject } from 'roc-abstract-package-base-dev';

import { invokeHook } from '../roc/util';
import initRuntime from '../helpers/init-runtime';

/**
 * Starts a Roc application.
 *
 * @param {object} rocCommandObject - A command object
 */
export default function start({ verbose, context: { config: { settings } }, parsedOptions }) {
    // Init the Roc runtime that will resolve dependencies and add source maps support
    initRuntime(verbose);

    const potentialTarget = invokeHook('get-potential-target');

    const artifact = parsedOptions.options.artifact ||
        (settings.runtime.startBundle && path.join(process.cwd(), settings.runtime.startBundle)) ||
        path.join(process.cwd(), getValueFromPotentialObject(settings.build.output, potentialTarget),
            `${settings.build.name}.js`);

    if (!fileExists(artifact)) {
        log.error(`Could not start the application since no file was found at ${artifact}. ` +
            'Make sure you have built the application.');
    }

    log.info('Starting Roc application…');

    // Start the application
    // eslint-disable-next-line
    require(artifact);
}
