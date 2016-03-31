import path from 'path';

import { fileExists } from 'roc';
import { getValueFromPotentialObject } from 'roc-package-base-dev';

import { invokeHook } from '../roc/util';

import initRuntime from '../helpers/init-runtime';

/**
 * Starts a Roc application.
 *
 * @param {object} rocCommandObject - A command object
 */
export default function start({ verbose, configObject: { settings }, parsedOptions }) {
    // Init the Roc runtime that will resolve dependencies and add source maps support
    initRuntime(verbose);

    const potentialTarget = invokeHook('get-potential-target');

    const artifact = parsedOptions.options.artifact ||
        settings.runtime.startBundle && path.join(process.cwd(), settings.runtime.startBundle) ||
        path.join(process.cwd(), getValueFromPotentialObject(settings.build.output, potentialTarget),
            `${settings.build.name}.js`);

    if (!fileExists(artifact)) {
        console.log(`Could not start the application since no file was found at ${artifact}.` +
            `Make sure you have built the application.`);
        /* eslint-disable no-process-exit */
        process.exit(1);
        /* eslint-enable */
    }

    console.log('Starting Roc application…');

    // Start the application
    require(artifact);
}
