import {
    isArray,
    isPath,
    oneOf,
    required,
} from 'roc/validators';

export default {
    settings: {
        dev: {
            watch: {
                description: 'Files/folders that should trigger a restart of the server.',
                validator: required(oneOf(isPath, isArray(isPath))),
            },
            build: {
                targets: {
                    override: 'roc-package-webpack-dev',
                    validator: required(isArray(/^node$/i)),
                },
            },
        },
    },
};
