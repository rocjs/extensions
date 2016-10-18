import {
    isArray,
    isPath,
    required,
    notEmpty,
} from 'roc/validators';

export default {
    settings: {
        build: {
            __meta: {
                override: 'roc-abstract-package-base-dev',
            },
            targets: {
                validator: required(notEmpty(isArray(/^cjs$|^esm$/i))),
                override: 'roc-abstract-package-base-dev',
            },
            input: {
                description: 'The directory to build from.',
                validator: required(notEmpty(isPath)),
                override: 'roc-abstract-package-base-dev',
            },
            output: {
                __meta: {
                    override: 'roc-abstract-package-base-dev',
                },
                cjs: {
                    description: 'The output directory for the CommonJS build.',
                    validator: required(notEmpty(isPath)),
                },
                esm: {
                    description: 'The output directory for the ES Modules build.',
                    validator: required(notEmpty(isPath)),
                },
            },
        },
    },
};
