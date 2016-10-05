export default {
    settings: {
        build: {
            targets: ['cjs', 'esm'],
            input: 'src',
            output: {
                cjs: 'lib/cjs',
                esm: 'lib/esm',
            },
        },
    },

    babel: undefined,
};
