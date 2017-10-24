module.exports = {
    settings: {
        repo: {
            targets: ['cjs'],
            babelPresetEnv: {
                targets: {
                    node: '6',
                },
            },
            mono: [
                // Examples are disabled for now
                //'examples/*',
                'packages',
                'plugins',
            ],
        },
    },
};
