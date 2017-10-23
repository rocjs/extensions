export default ({ context: { config: { settings }, directory } }) => (
    grep,
    watch,
    coverage,
    webpackConfig
) => () => {
    const entry = settings.test.web.entry || require.resolve('./utils/entry.js');

    const karmaConfig = {
        plugins: [
            require.resolve('karma-webpack'),
            require.resolve('karma-mocha'),
            require.resolve('karma-spec-reporter'),
            require.resolve('karma-sourcemap-loader'),
            require.resolve('karma-phantomjs-launcher'),
        ],

        browsers: ['PhantomJS'],

        phantomjsLauncher: {
            // Have PhantomJS exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true,
        },

        singleRun: !watch,

        frameworks: ['mocha'],

        files: [entry],

        preprocessors: {
            [entry]: ['webpack', 'sourcemap'],
        },

        reporters: [
            'spec',
        ],

        client: {
            mocha: {
                grep,
            },
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: settings.dev.devMiddleware.noInfo,
            quiet: settings.dev.devMiddleware.quiet,
        },

        // Set the basePath to be where the command is running from, normally this is resolved to this file location
        basePath: directory,
    };

    if (coverage) {
        karmaConfig.plugins.push(require.resolve('karma-coverage'));
        karmaConfig.reporters.push('coverage');
        karmaConfig.coverageReporter = {
            dir: 'coverage/karma',
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'cobertura', subdir: 'cobertura' },
                { type: 'text-summary', subdir: 'summary', file: 'report.txt' },
                { type: 'text-summary' },
            ],
        };
    }

    return karmaConfig;
};
