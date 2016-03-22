import { isBoolean, isInteger } from 'roc/validators';

export const config = {
    settings: {
        dev: {
            browsersync: {
                enabled: true,
                open: true,
                port: 3030
            }
        }
    }
};

export const meta = {
    settings: {
        groups: {
            dev: {
                browsersync: 'Settings for Browsersync.'
            }
        },
        descriptions: {
            dev: {
                browsersync: {
                    enabled: 'If Browsersync should be enabled.',
                    open: 'If Browsersync should open when the server is ready.',
                    port: 'The port that Browsersync should start on, should be a range of at least 2'
                }
            }
        },

        validations: {
            dev: {
                browsersync: {
                    enabled: isBoolean,
                    open: isBoolean,
                    port: isInteger
                }
            }
        }
    }
};
