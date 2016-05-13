import { getAbsolutePath } from 'roc';
import { join } from 'path';
import micromatch from 'micromatch';

export default ({ settings, previousValue: rocBuilder }) => (target, coverage) => () => {
    let {
        buildConfig,
        builder,
        info
    } = rocBuilder;

    buildConfig.devtool = 'inline-source-map';

    const entry = settings.test.entry ?
        getAbsolutePath(settings.test.entry) :
        './utils/entry.js';

    buildConfig.entry[info.outputName] = require.resolve(entry);

    if (coverage) {
        buildConfig.babel = {
            ...buildConfig.babel,
            env: {
                test: {
                    plugins: [ [
                        require.resolve('babel-plugin-__coverage__'),
                        {
                            only: settings.test.node.src.path + '/**/*.js'
                        }
                    ] ]
                }
            }
        };
    }

    buildConfig.resolve.fallback.push(join(__dirname, '..', '..', 'node_modules'));

    buildConfig.plugins.push(
        new builder.DefinePlugin({
            __PATH_TESTS__: JSON.stringify(join(process.cwd(), settings.test.node.tests.path)),
            __PATTERN_TESTS__: getRegexp(settings.test.node.tests.pattern),
            __PATH_SRC__: JSON.stringify(join(process.cwd(), settings.test.node.src.path)),
            __PATTERN_SRC__: getRegexp(settings.test.node.src.pattern)
        })
    );

    return {
        buildConfig,
        builder,
        info
    };
};

function getRegexp(regexp) {
    if (regexp instanceof RegExp) {
        return regexp;
    }

    return micromatch.makeRe('./' + regexp);
}
