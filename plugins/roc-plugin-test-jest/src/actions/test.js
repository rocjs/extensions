import { getAbsolutePath } from 'roc';
import jest from 'jest';

import { invokeHook } from '../roc/util';

export default ({ context }) => (targets, managedOptions, extraArgs = []) => {
    if (targets.find((target) => target === 'web' || target === 'node')) {
        return () => {
            process.env.ROC_INITAL_ARGV = JSON.stringify(process.argv);
            let argv = [...extraArgs];

            // TODO - Make it not depend on Webpack but work in any project
            const webpackConfig = invokeHook('build-webpack', 'node', {});
            const globals = webpackConfig.plugins.reduce((definitions, plugin) => {
                if (plugin.definitions) {
                    return {
                        ...definitions,
                        ...plugin.definitions,
                    };
                }

                return definitions;
            }, {});

            // TODO - Make this smarter and give more out of the box
            let jestConfig = {
                moduleFileExtensions: webpackConfig.resolve.extensions.map((extn) => extn.replace('.', '')),
                testPathIgnorePatterns: ['<rootDir>/(lib|build|docs|node_modules)/'],
                // TODO - Handle this better
                // Currently it will always use node as testEnvironment if not explicitly defined
                // to be web
                testEnvironment: targets[0] === 'web' && targets.length === 1 ? 'jsdom' : 'node',
                transform: {
                    '^.+\\.js$': require.resolve('./utils/babel-jest-transformer.js'),
                },
                // TODO - Support webpackConfig.resolve.alias
                resolver: require.resolve('./utils/roc-resolver.js'),
                globals,
            };
            if (context.config.settings.test.jest.junit.enabled === true) {
                jestConfig = {
                    ...jestConfig,
                    testResultsProcessor: require.resolve('jest-junit'),
                };
                process.env.JEST_JUNIT_OUTPUT = getAbsolutePath(
                    context.config.settings.test.jest.junit.path,
                    context.directory
                );
                process.env.JEST_USE_PATH_FOR_SUITE_NAME = true;
            }

            /**
            // TODO - Add an action

            The priority when Roc loads Jest configuration.
            1. "jest" inside roc.config.js
            2. "jest" inside package.json
            */
            if (context.config.jest) {
                jestConfig = {
                    ...jestConfig,
                    ...context.config.jest,
                };
            } else if (context.packageJSON.jest) {
                jestConfig = {
                    ...jestConfig,
                    ...context.packageJSON.jest,
                };
            }

            argv.push('--config', JSON.stringify(jestConfig));
            argv = argv.concat(Object.keys(managedOptions)
                .map((key) => managedOptions[key] !== undefined && `--${key}=${managedOptions[key]}`))
                .filter(Boolean);

            jest.run(argv);
        };
    }

    return undefined;
};
