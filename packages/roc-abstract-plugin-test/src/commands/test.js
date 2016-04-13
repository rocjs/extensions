import { invokeHook } from '../roc/util';

export default function test({
    configObject,
    parsedArguments,
    parsedOptions
}) {
    // Enforce test
    process.env.NODE_ENV = 'test';

    let { targets } = parsedArguments.arguments;

    if (!targets) {
        targets = configObject.settings.build.targets;
    }

    invokeHook('run-test-command', targets, parsedOptions);
}
