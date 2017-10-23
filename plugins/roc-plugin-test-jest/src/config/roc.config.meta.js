import {
    isBoolean,
    isPath,
    notEmpty,
    required,
} from 'roc/validators';

export default {
    settings: {
        test: {
            jest: {
                junit: {
                    enabled: {
                        description: 'If a JUnit report should be be created.',
                        validator: required(isBoolean),
                    },
                    path: {
                        description: 'Where the file should be written.',
                        validator: required(notEmpty(isPath)),
                    },
                },
            },
        },
    },
    jest: {
        description: 'Jest configuration.',
    },
};
