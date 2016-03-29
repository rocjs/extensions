/**
* Roc
*
* This need to be exported for something to be considered a valid Roc package or plugin.
* There is also a requirement on that a `name` is defined and at least one more thing.
*/
export const roc = {
    name: require('../package.json').name,
    packages: [
        require.resolve('roc-package-base')
    ]
};
