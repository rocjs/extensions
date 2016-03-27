import { execute, getAbsolutePath } from 'roc';
import { getValueFromPotentialObject } from 'roc-package-base-dev';

import meta from '../config/roc.config.meta.js';

import isSomeTargetValid from './some-valid-target';
import { invokeHook } from '../roc/util';

async function devWithBabel(target, settings) {
    if (meta.settings.validations.build.targets([target]) !== true) {
        return;
    }

    const presets = invokeHook('babel-load-presets', target);
    const plugins = invokeHook('babel-load-plugins', target);

    const babel = require.resolve('babel-cli/bin/babel');
    const src = getAbsolutePath(getValueFromPotentialObject(settings.build.input, target));
    const out = getAbsolutePath(getValueFromPotentialObject(settings.build.output, target));

    /* eslint-disable no-console */
    console.log(`Starting in watch mode for ${target.toUpperCase()}`);
    /* eslint-enable */

    await execute(`${babel} ${src} --out-dir ${out} --presets=${presets.join(',')} ` +
        `--plugins=${plugins.join(',')} --source-maps --copy-files --watch`);
}

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
        return () => targets.forEach((target) => devWithBabel(target, settings));
    }
};
