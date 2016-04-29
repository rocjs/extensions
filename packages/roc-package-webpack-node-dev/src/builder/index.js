import { getSettings } from 'roc';

export default () => ({ previousValue: rocBuilder }) => (target) => {
    if (target === 'node') {
        return () => {
            let {
                buildConfig,
                builder,
                info
            } = rocBuilder;

            const buildSettings = getSettings('build');
            const DEV = (buildSettings.mode === 'dev');

            /**
            * Entry
            */
            buildConfig.entry = {
                [info.outputName]: [
                    info.entry
                ]
            };

            /**
            * Target
            */
            buildConfig.target = 'node';

            buildConfig.externals = [
                function(context, request, callback) {
                    const regexp = /roc-[^\/]+\/([^\/]+)/;
                    const match = regexp.exec(request);

                    // If a roc module include it if app is the next on the path
                    // Will include for example "roc-web/app" & "roc-web-react/app/server"
                    // but not "roc-web/lib" & "roc-web"
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
                    callback();
                }
            ];

            /**
            * Output
            */
            buildConfig.output.libraryTarget = 'commonjs2';

            /**
            * Plugins
            */
            buildConfig.plugins.push(
                new builder.DefinePlugin({
                    __WEB__: false,
                    __NODE__: true
                })
            );

            if (DEV) {
                buildConfig.plugins.push(
                    new builder.NoErrorsPlugin()
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
