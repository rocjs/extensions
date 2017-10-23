import { invokeHook } from '../roc/util';

/**
 * Starts the project in development mode.
 */
export default function dev({
    context: { config },
    arguments: { managed },
}) {
    let { targets } = managed;

    if (!targets) {
        targets = config.settings.build.targets;
    }

    invokeHook('run-dev-command', targets);
}
