export const roc = {
    name: require('../package.json').name,
    packages: [
        require.resolve('roc-package-webpack')
    ],
    plugins: [
        require.resolve('roc-plugin-start')
    ]
};
