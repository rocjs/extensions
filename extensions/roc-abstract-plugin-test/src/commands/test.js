import { invokeHook } from '../roc/util';

export default function test({
    context: { config },
    arguments: { managed: managedArguments },
    options: { managed: managedOptions },
}) {
    // Enforce test
    process.env.NODE_ENV = 'test';

    let { targets } = managedArguments;

    if (!targets) {
        targets = config.settings.build.targets;
    }

    invokeHook('run-test-command', targets, managedOptions);
}
