module.exports = {
    settings: {
        runtime: {
            port: 8080,
            serve: ['files', 'build/client'],
            favicon: 'files/roc.png'
        },
        build: {
            input: {
                web: 'src/client/index.js',
                node: 'server.js'
            }
        },
        test: {
            node: {
                src: {
                    pattern: 'server/**/*.js'
                },
                tests: {
                    pattern: 'server/**/*.js'
                }
            }
        }
    }
};
