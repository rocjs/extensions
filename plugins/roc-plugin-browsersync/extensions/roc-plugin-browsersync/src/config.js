import { isBoolean, isInteger, isString, oneOf, required, notEmpty } from 'roc/validators';

export const config = {
    settings: {
        dev: {
            browsersync: {
                options: {
                    __raw: {},
                    open: true,
                    host: null,
                    port: 3030,
                },
                enabled: true,
            },
        },
    },
};

export const meta = {
    settings: {
        dev: {
            __meta: {
                override: 'roc-abstract-package-base-dev',
            },
            browsersync: {
                description: 'Settings for Browsersync.',
                enabled: {
                    description: 'If Browsersync should be enabled.',
                    validator: required(isBoolean),
                },
                options: {
                    open: {
                        description: 'Decide which URL to open automatically when Browsersync starts. ' +
                            'Defaults to "local" if none set. Can be true, local, external, ' +
                            'ui, ui-external, tunnel or false.',
                        validator: required(oneOf(/^(external|ui|ui-external|tunnel)$/, isBoolean)),
                    },
                    host: {
                        description: 'The host that Browsersync should use, will be automatic by default.',
                        validator: notEmpty(isString),
                    },
                    port: {
                        description: 'The port that Browsersync should start on, should be a range of at least 2.',
                        validator: required(isInteger),
                    },
                },
            },
        },
    },
};
