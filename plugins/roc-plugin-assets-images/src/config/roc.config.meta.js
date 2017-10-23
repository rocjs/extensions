import { isArray, isInteger, isString, notEmpty, required } from 'roc/validators';

export default {
    settings: {
        build: {
            assets: {
                images: {
                    __meta: {
                        description: 'Settings for image asset related things.',
                    },
                    urlLoader: {
                        __meta: {
                            description: 'Settings for https://github.com/webpack/url-loader',
                        },
                        filetypes: {
                            description: 'The filetypes that should be used together with url-loader.',
                            validator: required(notEmpty(isArray(isString))),
                        },
                        options: {
                            __meta: {
                                description: 'Options that will be used as query parameters.',
                            },
                            limit: {
                                description: 'The maximum size (in bytes) for base64 encoding an image.',
                                validator: required(isInteger),
                            },
                        },
                    },
                    fileLoader: {
                        __meta: {
                            description: 'Settings for https://github.com/webpack/file-loader',
                        },
                        filetypes: {
                            description: 'The filetypes that should be used together with file-loader.',
                            validator: required(notEmpty(isArray(isString))),
                        },
                        options: {
                            __meta: {
                                description: 'Options that will be used as query parameters.',
                            },
                            name: {
                                description: 'The name for the generated files.',
                                validator: required(notEmpty(isString)),
                            },
                        },
                    },
                },
            },
        },
    },
};
