import { join } from 'path';

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
    newWebpackConfig.entry = {};
    newWebpackConfig.output = {};

    newWebpackConfig.resolve.alias = {
        ...newWebpackConfig.resolve.alias,
        src: join(directory, settings.test.web.src.path),
    };

    newWebpackConfig.plugins.push(
        new webpack.DefinePlugin({
            __PATH_TESTS__: JSON.stringify(join(directory, settings.test.web.tests.path)),
            __PATTERN_TESTS__: getRegexp(settings.test.web.tests.pattern),
            __PATH_SRC__: JSON.stringify(join(directory, settings.test.web.src.path)),
            __PATTERN_SRC__: getRegexp(settings.test.web.src.pattern),
        })
    );

    return newWebpackConfig;
};
