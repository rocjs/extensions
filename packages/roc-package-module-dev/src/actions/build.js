import chalk from 'chalk';
import prettyMs from 'pretty-ms';

import { execute, getAbsolutePath } from 'roc';
import { getValueFromPotentialObject } from 'roc-package-base-dev';

import meta from '../config/roc.config.meta.js';

import isSomeTargetValid from './some-valid-target';
import { invokeHook } from '../roc/util';

const buildWithBabel = (target, settings) => {
    if (meta.settings.validations.build.targets([target]) !== true) {
        return Promise.resolve();
    }

    return new Promise(async function(resolve) {
        const presets = invokeHook('babel-load-presets', target);
        const plugins = invokeHook('babel-load-plugins', target);

        const babel = require.resolve('babel-cli/bin/babel');
        const src = getAbsolutePath(getValueFromPotentialObject(settings.build.input, target));
        const out = getAbsolutePath(getValueFromPotentialObject(settings.build.output, target));

        /* eslint-disable no-console */
        console.log(`Building for ${target.toUpperCase()}`);
        /* eslint-enable */
        const startTime = process.hrtime();

        try {
            await execute(`${babel} ${src} --out-dir ${out} --presets=${presets.join(',')} ` +
                `--plugins=${plugins.join(',')} --source-maps --copy-files`);
        } catch (err) {
            /* eslint-disable no-console, no-process-exit */
            console.log(chalk.red(`The ${target.toUpperCase()} build failed. ` +
                `All other potential builds will be canceled.`));
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
};

/**
 * Builds source files based on the configuration using Babel.
 *
 * @param {Object} settings - Roc settings object.
 *
 * @returns {Function} - A correct Roc action.
 */
export default (settings) => (targets) => {
    // If not at least on of the targets matches the valid ones it will ignore it. Makes it smarter when combining.
    if (isSomeTargetValid(targets)) {
        return () => Promise.all(targets.map((target) => buildWithBabel(target, settings)));
    }
};
