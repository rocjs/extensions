module.exports = {
    settings: {
        repo: {
            targets: ['cjs'],
            babelPresetEnv: {
                targets: {
                    node: '4.8',
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
