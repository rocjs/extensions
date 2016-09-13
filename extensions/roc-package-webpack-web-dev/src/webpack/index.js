import path from 'path';

import { getDevPath } from 'roc-package-webpack-dev';
import { getSettings, getAbsolutePath } from 'roc';
import qs from 'qs';
import webpack from 'webpack';

export default ({ previousValue: webpackConfig }) => (target) => {
    if (target === 'web') {
        return () => {
            const newWebpackConfig = { ...webpackConfig };
            const buildSettings = getSettings('build');

            const DEV = (buildSettings.mode === 'dev');
            const DIST = (buildSettings.mode === 'dist');

            /**
            * Entry
            */
            if (DEV) {
                const { hotMiddleware } = getSettings('dev');

                newWebpackConfig.entry = {
                    [newWebpackConfig.rocMetaInfo.outputName]: [
                        `webpack-hot-middleware/client?path=${getDevPath()}` +
                            `__webpack_hmr&${qs.stringify(hotMiddleware)}`,
                        newWebpackConfig.rocMetaInfo.entry,
                    ],
                };
            }

            const makeAllPathsAbsolute = (input) => input.map((elem) => getAbsolutePath(elem));

            const resources = makeAllPathsAbsolute(buildSettings.resources);
            newWebpackConfig.entry[newWebpackConfig.rocMetaInfo.outputName] =
                [].concat(resources, newWebpackConfig.entry[newWebpackConfig.rocMetaInfo.outputName]);

            /**
            * Devtool
            */
            if (DEV) {
                newWebpackConfig.devtool = 'cheap-module-inline-source-map';
            }

            /**
            * Output
            */
            if (DIST) {
                newWebpackConfig.output.filename = '[name].[hash].roc.js';
                newWebpackConfig.output.chunkFilename = '[name].[hash].roc.js';
            }

            /**
            * Resolve
            */
            if (DEV) {
                // To make sure the client can resolve webpack-hot-middleware correctly
                newWebpackConfig.resolve.fallback.push(path.join(__dirname, '..', '..', 'node_modules'));
            }

            newWebpackConfig.resolveLoader.root.push(
                path.join(__dirname, '..', '..', 'node_modules')
            );

            /**
            * Plugins
            */
            newWebpackConfig.plugins.push(
                new webpack.DefinePlugin({
                    __WEB__: true,
                    __NODE__: false,
                })
            );

            if (DEV) {
                newWebpackConfig.plugins.push(
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NoErrorsPlugin()
                );
            }

            if (DIST) {
                newWebpackConfig.plugins.push(
                    new webpack.optimize.UglifyJsPlugin({
                        /* eslint-disable */
                        compress: {
                            warnings: false,
                            screw_ie8: true,
                            drop_debugger: true
                        },
                        managle: {
                            screw_ie8: true,
                        },
                        output: {
                            comments: false,
                            screw_ie8: true,
                        }
                        /* eslint-enable */
                    })
                );
            }

            return newWebpackConfig;
        };
    }

    return undefined;
};
