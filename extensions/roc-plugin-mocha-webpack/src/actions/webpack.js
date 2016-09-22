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

export default ({ context: { config: { settings } }, previousValue: webpackConfig }) => (target, coverage) => () => {
    const newWebpackConfig = { ...webpackConfig };

    newWebpackConfig.devtool = 'inline-source-map';

    const entry = settings.test.entry ?
        getAbsolutePath(settings.test.entry) :
        './utils/entry';

    newWebpackConfig.entry[newWebpackConfig.rocMetaInfo.outputName] = require.resolve(entry);

    if (coverage) {
        newWebpackConfig.babel = {
            ...newWebpackConfig.babel,
            env: {
                test: {
                    plugins: [[
                        require.resolve('babel-plugin-__coverage__'),
                        {
                            only: `${settings.test.node.src.path}/**/*.js`,
                        },
                    ]],
                },
            },
        };
    }

    newWebpackConfig.resolve.fallback.push(join(__dirname, '..', '..', 'node_modules'));

    newWebpackConfig.plugins.push(
        new webpack.DefinePlugin({
            __PATH_TESTS__: JSON.stringify(join(process.cwd(), settings.test.node.tests.path)),
            __PATTERN_TESTS__: getRegexp(settings.test.node.tests.pattern),
            __PATH_SRC__: JSON.stringify(join(process.cwd(), settings.test.node.src.path)),
            __PATTERN_SRC__: getRegexp(settings.test.node.src.pattern),
        })
    );

    return newWebpackConfig;
};
