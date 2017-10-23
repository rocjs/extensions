import { join } from 'path';

import { getAbsolutePath } from 'roc';
import micromatch from 'micromatch';
import webpack from 'webpack';

function getRegexp(regexp) {
    if (regexp instanceof RegExp) {
        return regexp;
    }

    return micromatch.makeRe(`./${regexp}`);
}

export default ({ context: { config: { settings }, directory } }) => () => (webpackConfig) => {
    const newWebpackConfig = { ...webpackConfig };

    newWebpackConfig.devtool = 'inline-source-map';

    const entry = settings.test.entry ?
        getAbsolutePath(settings.test.entry) :
        './utils/entry';

    newWebpackConfig.entry[newWebpackConfig.rocMetaInfo.outputName] = require.resolve(entry);

    // Always include the entry point
    newWebpackConfig.externals.unshift({
        [require.resolve(entry)]: false,
    });

    newWebpackConfig.resolve.alias = {
        ...newWebpackConfig.resolve.alias,
        src: join(directory, settings.test.node.src.path),
    };

    newWebpackConfig.plugins.push(
        new webpack.DefinePlugin({
            __PATH_TESTS__: JSON.stringify(join(directory, settings.test.node.tests.path)),
            __PATTERN_TESTS__: getRegexp(settings.test.node.tests.pattern),
            __PATH_SRC__: JSON.stringify(join(directory, settings.test.node.src.path)),
            __PATTERN_SRC__: getRegexp(settings.test.node.src.pattern),
        })
    );

    return newWebpackConfig;
};
