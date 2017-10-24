export default {
    settings: {
        build: {
            assets: {
                images: {
                    urlLoader: {
                        filetypes: ['png', 'svg'],
                        options: {
                            __raw: {},
                            limit: 10000,
                        },
                    },
                    fileLoader: {
                        filetypes: ['jpg'],
                        options: {
                            __raw: {},
                            name: '[hash].[ext]',
                        },
                    },
                },
            },
        },
    },
};
