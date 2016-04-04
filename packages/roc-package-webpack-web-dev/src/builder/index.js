import path from 'path';
import qs from 'qs';

import { getSettings, getAbsolutePath } from 'roc';
import { getDevPath, addTrailingSlash } from '../helpers';

export default ({ previousValue: rocBuilder }) => (target) => {
    if (target === 'web') {
        return () => {
            let {
                buildConfig,
                builder,
                info
            } = rocBuilder;

            const buildSettings = getSettings('build');
            const DEV = (buildSettings.mode === 'dev');
            const DIST = (buildSettings.mode === 'dist');

            /**
            * Output
            */
            buildConfig.output = {
                ...buildConfig.output,
                publicPath: DIST ? addTrailingSlash(buildSettings.path) : getDevPath()
            };

            /**
            * Entry
            */
            if (DEV) {
                const { hotMiddleware } = getSettings('dev');

                buildConfig.entry = {
                    [info.outputName]: [
                        `webpack-hot-middleware/client?path=${getDevPath()}` +
                            `__webpack_hmr&${qs.stringify(hotMiddleware)}`,
                        info.entry
                    ]
                };
            }

            const makeAllPathsAbsolute = (input) => input.map((elem) => getAbsolutePath(elem));

            const resources = makeAllPathsAbsolute(buildSettings.resources);
            buildConfig.entry[info.outputName] = buildConfig.entry[info.outputName].concat(resources);

            /**
            * Devtool
            */
            if (DEV) {
                buildConfig.devtool = 'cheap-module-inline-source-map';
            }

            /**
            * Output
            */
            if (DIST) {
                buildConfig.output.filename = '[name].[hash].roc.js';
                buildConfig.output.chunkFilename = '[name].[hash].roc.js';
            }

            /**
            * Resolve
            */
            if (DEV) {
                // To make sure the client can resolve webpack-hot-middleware correctly
                buildConfig.resolve.fallback.push(path.join(__dirname, '..', '..', 'node_modules'));
            }

            buildConfig.resolveLoader.root.push(
                path.join(__dirname, '..', '..', 'node_modules')
            );

            /**
            * Plugins
            */
            buildConfig.plugins.push(
                new builder.DefinePlugin({
                    __CLIENT__: true
                })
            );

            if (DEV) {
                buildConfig.plugins.push(
                    new builder.optimize.OccurenceOrderPlugin(),
                    new builder.HotModuleReplacementPlugin(),
                    new builder.NoErrorsPlugin()
                );
            }

            if (DIST) {
                buildConfig.plugins.push(
                    new builder.optimize.UglifyJsPlugin({
                        /* eslint-disable */
                        compress: {
                            warnings: false,
                            screw_ie8: true,
                            drop_debugger: true
                        }
                        /* eslint-enable */
                    })
                );
            }

            return {
                buildConfig,
                builder,
                info
            };
        };
    }
};
