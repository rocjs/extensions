import {
    isPath,
    notEmpty,
} from 'roc/validators';

export default {
    settings: {
        runtime: {
            startBundle: {
                description: 'Relative path to a bundle to start when calling "start", is not needed in most cases.',
                validator: notEmpty(isPath),
            },
        },
    },
};
