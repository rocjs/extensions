import { isArray, isString, isFunction, required, notEmpty } from 'roc/validators';
import { toArray, toString } from 'roc/converters';
import { lazyFunctionRequire } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

import { name } from './util';

const lazyRequire = lazyFunctionRequire(require);

/**
 * The roc object that other packages can base themselves on.
 */
export default {
    description: `
        Package forming an abstract foundation of the Roc ecosystem.

        The package serves as a base from which other \`dev\` packages within the ecosystem are to be constructed.
        It is therefore _never to be included_ as a direct dependency in app or component projects.`,
    config,
    meta,
    commands: {
        development: {
            __meta: {
                name: 'Project development',
                description: 'Commands for development purposes.',
            },
            build: {
                command: lazyRequire('../commands/build'),
                settings: ['build'],
                arguments: {
                    targets: {
                        validator: isArray(isString),
                        description: 'The targets the project should be built for, overrides the settings if provided.',
                        converter: toArray(toString),
                    },
                },
                description: 'Used to build the current project.',
            },
            clean: {
                command: lazyRequire('../commands/clean'),
                settings: ['build'],
                description: 'Cleans the current project.',
            },
            dev: {
                command: lazyRequire('../commands/dev'),
                settings: ['build'],
                arguments: {
                    targets: {
                        validator: isArray(isString),
                        description: 'The targets the project should be built for, overrides the settings if provided.',
                        converter: toArray(toString),
                    },
                },
                description: 'Used to start the current project in development mode.',
            },
        },
    },
    actions: [
        {
            extension: name,
            hook: 'before-clean',
            action: lazyRequire('../actions/beforeClean'),
            description: 'Runs before clean command is executed. Returns an array of paths that should be removed.',
        }, {
            extension: name,
            hook: 'after-clean',
            action: lazyRequire('../actions/afterClean'),
            description: 'Runs after clean command is executed. Logs that the action has been completed successfully.',
        },
    ],
    hooks: {
        'before-clean': {
            description: 'Hook point for adding code that runs before the clean command is invoked.',
            returns: required(isArray(isString)),
        },
        'after-clean': {
            description: 'Hook point for adding code that runs after the clean command is invoked.',
        },
        'run-build-command': {
            description: 'Use to add things that should react to the build command being called.',
            arguments: {
                targets: {
                    validator: required(notEmpty(isArray(isString))),
                    description: 'The targets to build for, will be based on settings ' +
                        'or a possible argument if defined.',
                },
            },
            hasCallback: true,
            returns: isFunction,
        },
        'run-dev-command': {
            description: 'Use to add things that should react to the dev command being called.',
            arguments: {
                targets: {
                    validator: required(notEmpty(isArray(isString))),
                    description: 'The targets use for dev, will be based on settings ' +
                        'or a possible argument if defined.',
                },
            },
        },
    },
};
