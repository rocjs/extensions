import path from 'path';

import { getSettings } from 'roc';
import webpack from 'webpack';

export default ({ previousValue: webpackConfig }) => (target) => {
    if (target === 'node') {
        return () => {
            const newWebpackConfig = { ...webpackConfig };
            const buildSettings = getSettings('build');
            const DEV = (buildSettings.mode === 'dev');

            /**
            * Entry
            */
            newWebpackConfig.entry = {
                [newWebpackConfig.rocMetaInfo.outputName]: [
                    newWebpackConfig.rocMetaInfo.entry,
                ],
            };

            /**
            * Target
            */
            newWebpackConfig.target = 'node';

            newWebpackConfig.externals = [
                function externals(context, request, callback) {
                    // Webpack loaders that might be a part of the path, manage this
                    const resourcePath = request.split('!').pop();

                    // If a roc module include it if app is the next on the path
                    // Will include for example "roc-package-web-app/app" & "roc-package-web-app-react/app/server"
                    // but not "roc-package-web-app/lib" & "roc-package-web-app"
                    const regexp = /roc-[^\/]+\/(?:app$|app\/)|roc-[^\\]+\\(?:app$|app\\)/;
                    if (regexp.test(resourcePath)) {
                        // Include it
                        return callback();
                    }

                    // Important that we have # in the RegExp to not include dependencies that
                    // should be managed outside Roc, the bailout character
                    if (!path.isAbsolute(resourcePath) && /^[#@a-zA-Z\-0-9]{1}.*$/.test(resourcePath)) {
                        // External
                        return callback(null, true);
                    }

                    // We either have a relative or absolute path here
                    // Make external if the path contains node_modules
                    if (/node_modules/.test(resourcePath)) {
                        // External
                        return callback(null, true);
                    }

                    // Everything else should be included
                    return callback();
                },
            ];

            /**
            * Output
            */
            newWebpackConfig.output.libraryTarget = 'commonjs2';

            /**
            * Plugins
            */
            newWebpackConfig.plugins.push(
                new webpack.DefinePlugin({
                    __WEB__: false,
                    __NODE__: true,
                })
            );

            if (DEV) {
                newWebpackConfig.plugins.push(
                    new webpack.NoErrorsPlugin()
                );
            }

            return newWebpackConfig;
        };
    }

    return undefined;
};
