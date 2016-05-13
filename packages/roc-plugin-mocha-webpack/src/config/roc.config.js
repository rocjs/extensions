export default {
    settings: {
        test: {
            node: {
                entry: '',
                tests: {
                    pattern: '**/*.test.js',
                    path: 'tests'
                },
                src: {
                    path: 'src',
                    pattern: '**/*.js'
                }
            }
        }
    }
};
