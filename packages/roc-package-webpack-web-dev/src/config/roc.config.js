export default {
    settings: {
        dev: {
            devMiddleware: {
                __raw: {},
                noInfo: true,
                quiet: false,
                poll: false,
                aggregateTimeout: undefined,
            },
            hotMiddleware: {
                __raw: {},
                overlay: true,
                reload: true,
                noInfo: false,
                quiet: false,
            },
        },

        build: {
            resources: [],
            targets: ['web'],
        },
    },
};
