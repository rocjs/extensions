import { getAbsolutePath } from 'roc';
import { getValueFromPotentialObject } from 'roc-abstract-package-base-dev';

import meta from '../config/roc.config.meta';
import { invokeHook } from '../roc/util';

import isSomeTargetValid from './helpers/isSomeTargetValid';
import babel from './helpers/babel';

function devWithBabel(target, settings) {
    if (meta.settings.build.targets.validator([target]) !== true) {
        return;
    }

    const babelConfig = invokeHook('babel-config', target);

    const src = getAbsolutePath(getValueFromPotentialObject(settings.build.input, target));
    const out = getAbsolutePath(getValueFromPotentialObject(settings.build.output, target));

    /* eslint-disable no-console */
    console.log(`Starting in watch mode for ${target.toUpperCase()}`);
    /* eslint-enable */

    babel({
        src,
        out,
        sourceMaps: true,
        copyFiles: true,
        watch: true,
    }, babelConfig);
}

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
        return () => targets.forEach(target => devWithBabel(target, settings));
    }

    return undefined;
};
