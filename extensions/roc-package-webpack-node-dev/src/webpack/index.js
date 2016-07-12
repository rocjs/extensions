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
                    const regexp = /roc-[^\/]+\/([^\/]+)/;
                    const match = regexp.exec(request);

                    // If a roc module include it if app is the next on the path
                    // Will include for example "roc-package-web-app/app" & "roc-package-web-app-react/app/server"
                    // but not "roc-package-web-app/lib" & "roc-package-web-app"
                    if (match && match[1] === 'app') {
                        return callback();
                    }

                    // If a normal node_module mark it as external and manage
                    // Webpack loaders that might be a part of the path
                    const resourcePath = request.split('!').pop();
                    if (/^[a-zA-Z\-0-9]{1}.*$/.test(resourcePath)) {
                        return callback(null, true);
                    }

                    // Everything else should be included, that will be relative and absolute paths
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
