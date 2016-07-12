import { isBoolean, isInteger, required } from 'roc/validators';

export const config = {
    settings: {
        dev: {
            browsersync: {
                options: {
                    __raw: {},
                    open: true,
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
                        description: 'If Browsersync should open when the server is ready.',
                        validator: required(isBoolean),
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
