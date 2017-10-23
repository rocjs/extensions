export default {
    settings: {
        test: {
            web: {
                entry: undefined,
                tests: {
                    pattern: '**/*.test.js',
                    path: 'tests',
                },
                src: {
                    path: 'src',
                    pattern: '**/*.js',
                },
            },
        },
    },
};
