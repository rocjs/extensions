export default {
    settings: {
        build: {
            targets: ['es5', 'es6'],
            input: 'src',
            output: {
                es5: 'lib/es5',
                es6: 'lib/es6',
            },
        },
    },
};
