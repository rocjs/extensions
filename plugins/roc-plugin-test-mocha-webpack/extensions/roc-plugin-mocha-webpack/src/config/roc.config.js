export default {
    settings: {
        test: {
            node: {
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
