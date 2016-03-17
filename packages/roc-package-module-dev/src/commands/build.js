import path from 'path';
import chalk from 'chalk';
import prettyMs from 'pretty-ms';

import { execute, getAbsolutePath } from 'roc';
import { getValueFromPotentialObject } from 'roc-package-core-dev';

import { invokeHook } from '../util';

/**
 * Builds source files based on the configuration using Babel.
 *
 * @param {Object} rocCommandObject - A command object.
 *
 * @returns {Promise} - Promise that is resolved when build is completed.
 */
export default function build({
    configObject,
    parsedArguments
}) {
    let { targets } = parsedArguments.arguments;

    if (!targets) {
        targets = configObject.settings.build.targets;
    }

    return Promise.all(targets.map((target) => {
        return new Promise(async function(resolve) {
            const presets = invokeHook('babel-load-presets', target);
            const plugins = invokeHook('babel-load-plugins', target);

            const babel = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'babel');
            const src = getAbsolutePath(getValueFromPotentialObject(configObject.settings.build.input, target));
            const out = getAbsolutePath(getValueFromPotentialObject(configObject.settings.build.output, target));

            /* eslint-disable no-console */
            console.log(`Building for ${target.toUpperCase()}`);
            /* eslint-enable */
            const startTime = process.hrtime();

            try {
                await execute(`${babel} ${src} --out-dir ${out} --presets=${presets.join(',')} ` +
                    `--plugins=${plugins.join(',')} --source-maps --copy-files`);
            } catch (err) {
                console.log(chalk.red(`The ${target.toUpperCase()} build failed. ` +
                    `All other potential builds will be canceled.`));
                /* eslint-disable no-process-exit */
                process.exit(err);
                /* eslint-enable */
            }

            const totalTime = process.hrtime(startTime);

            /* eslint-disable no-console */
            console.log(chalk.green(`Completed ${target.toUpperCase()} in ` +
                `${prettyMs(totalTime[0] * 1000 + totalTime[1] / 1000000)}`));
            /* eslint-enable */
            resolve();
        });
    }));
}
