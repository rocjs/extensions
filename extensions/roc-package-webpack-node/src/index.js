// eslint-disable-next-line
export const roc = {
    description: 'Package providing Node support through Webpack.',
    packages: [
        require.resolve('roc-package-webpack'),
    ],
    plugins: [
        require.resolve('roc-plugin-start'),
    ],
};
