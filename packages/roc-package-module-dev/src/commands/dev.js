import path from 'path';

import { execute, getAbsolutePath } from 'roc';
import { getValueFromPotentialObject } from 'roc-package-core-dev';

import { invokeHook } from '../util';

/**
 * Builds source files based on the configuration using Babel in watch mode.
 *
 * @param {Object} rocCommandObject - A command object.
 */
export default function dev({
    configObject,
    parsedArguments
}) {
    let { targets } = parsedArguments.arguments;

    if (!targets) {
        targets = configObject.settings.build.targets;
    }

    targets.forEach(async function(target) {
        const presets = invokeHook('babel-load-presets', target);
        const plugins = invokeHook('babel-load-plugins', target);

        const babel = require.resolve('babel-cli/bin/babel');
        const src = getAbsolutePath(getValueFromPotentialObject(configObject.settings.build.input, target));
        const out = getAbsolutePath(getValueFromPotentialObject(configObject.settings.build.output, target));

        /* eslint-disable no-console */
        console.log(`Starting in watch mode for ${target.toUpperCase()}`);
        /* eslint-enable */

        await execute(`${babel} ${src} --out-dir ${out} --presets=${presets.join(',')} ` +
            `--plugins=${plugins.join(',')} --source-maps --copy-files --watch`);
    });
}
