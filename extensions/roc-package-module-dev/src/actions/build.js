import prettyMs from 'pretty-ms';
import { execute, getAbsolutePath, initLog } from 'roc';
import { getValueFromPotentialObject } from 'roc-abstract-package-base-dev';

import meta from '../config/roc.config.meta.js';
import { invokeHook } from '../roc/util';

import isSomeTargetValid from './some-valid-target';

const log = initLog();

const buildWithBabel = (target, settings) => {
    if (meta.settings.build.targets.validator([target]) !== true) {
        return Promise.resolve();
    }

    return new Promise(async function build(resolve) {
        const presets = invokeHook('babel-load-presets', target);
        const plugins = invokeHook('babel-load-plugins', target);

        const babel = require.resolve('babel-cli/bin/babel');
        const src = getAbsolutePath(getValueFromPotentialObject(settings.build.input, target));
        const out = getAbsolutePath(getValueFromPotentialObject(settings.build.output, target));

        /* eslint-disable no-console */
        log.small.info(`Building for ${target.toUpperCase()}`);
        /* eslint-enable */
        const startTime = process.hrtime();

        try {
            await execute(`${babel} ${src} --out-dir ${out} --presets=${presets.join(',')} ` +
                `--plugins=${plugins.join(',')} --source-maps --copy-files`);
        } catch (err) {
            log.small.error(`The ${target.toUpperCase()} build failed. ` +
                'All other potential builds will be canceled.', err);
        }

        const totalTime = process.hrtime(startTime);

        log.small.done(`Completed ${target.toUpperCase()} in ` +
            `${prettyMs((totalTime[0] * 1000) + (totalTime[1] / 1000000))}`);
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
export default ({ config: { settings } }) => (targets) => {
    // If not at least on of the targets matches the valid ones it will ignore it. Makes it smarter when combining.
    if (isSomeTargetValid(targets)) {
        return () => () => Promise.all(targets.map((target) => buildWithBabel(target, settings)));
    }

    return Promise.resolve();
};
