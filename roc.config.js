module.exports = {
    settings: {
        repo: {
            babelPresetEnv: {
                targets: {
                    node: '8',
                },
            },
            mono: [
                // Examples are disabled for now
                //'examples/*',
                'packages',
                'plugins',
            ],
            release: {
                includeBody: true,
                changelogTypes: true,
            },
        },
    },
};
