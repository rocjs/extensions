import { isInteger } from 'roc/validators';

export default {
    settings: {
        groups: {
            build: {
                assets: {
                    images: 'Settings for image asset related things.'
                }
            }
        },
        descriptions: {
            build: {
                assets: {
                    images: {
                        loadUrl: {
                            maxSize: 'The maximum size (in bytes) for base64 encoding an image.'
                        }
                    }
                }
            }
        },
        validations: {
            build: {
                assets: {
                    images: {
                        loadUrl: {
                            maxSize: isInteger
                        }
                    }
                }
            }
        }
    }
};

