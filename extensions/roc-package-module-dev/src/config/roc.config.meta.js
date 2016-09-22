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
                validator: required(notEmpty(isArray(/^es5$|^es6$/i))),
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
                es5: {
                    description: 'The output directory for the ES5 build.',
                    validator: required(notEmpty(isPath)),
                },
                es6: {
                    description: 'The output directory for the ES6 build.',
                    validator: required(notEmpty(isPath)),
                },
            },
        },
    },
};
