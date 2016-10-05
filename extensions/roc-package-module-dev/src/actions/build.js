import prettyMs from 'pretty-ms';
import { getAbsolutePath, initLog } from 'roc';
import { getValueFromPotentialObject } from 'roc-abstract-package-base-dev';

import meta from '../config/roc.config.meta.js';
import { invokeHook } from '../roc/util';

import isSomeTargetValid from './helpers/isSomeTargetValid';
import babel from './helpers/babel';

const log = initLog();

const buildWithBabel = (target, settings) => {
    if (meta.settings.build.targets.validator([target]) === true) {
        const babelConfig = invokeHook('babel-config', target);

        const src = getAbsolutePath(getValueFromPotentialObject(settings.build.input, target));
        const out = getAbsolutePath(getValueFromPotentialObject(settings.build.output, target));

        /* eslint-disable no-console */
        log.small.info(`Building for ${target.toUpperCase()}`);
        /* eslint-enable */

        try {
            babel({
                src,
                out,
                sourceMaps: true,
                copyFiles: true,
            }, babelConfig);
        } catch (err) {
            // eslint-disable-next-line
            if (err._babel && err instanceof SyntaxError) {
                // Display codeFrame if it is an Babel Error
                err.message = `${err.message}\n${err.codeFrame}`;
            }
            log.small.error(`The ${target.toUpperCase()} build failed. ` +
                'All other potential builds will be canceled.', err);
        }

        log.small.success(`Completed ${target.toUpperCase()}\n`);
    }
};

/**
 * Builds source files based on the configuration using Babel.
 *
 * @param {Object} settings - Roc settings object.
 *
 * @returns {Function} - A correct Roc action.
 */
export default ({ context: { config: { settings } } }) => (targets) => {
    // If not at least on of the targets matches the valid ones it will ignore it. Makes it smarter when combining.
    if (isSomeTargetValid(targets)) {
        return () => () => new Promise((resolve) => {
            const startTime = process.hrtime();
            targets.forEach((target) => buildWithBabel(target, settings));
            const totalTime = process.hrtime(startTime);

            log.small.success('All module builds completed in ' +
                `${prettyMs((totalTime[0] * 1000) + (totalTime[1] / 1000000))}`);

            resolve();
        });
    }

    return undefined;
};
