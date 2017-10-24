import isString from 'lodash/isString';

/**
 * Roc action that runs before the clean command runs.
 *
 * @property {object} settings - The settings from roc.
 */
export default function beforeClean({ context: { config: { settings } } }) {
    return () => () => (
        isString(settings.build.output) ?
            [settings.build.output] :
            Object.keys(settings.build.output)
                .map((prop) => settings.build.output[prop])
    );
}
