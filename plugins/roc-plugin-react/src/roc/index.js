import path from 'path';

export default {
    dependencies: {
        exports: {
            // TODO
            // This is currently here to manage a "problem" when working with locally linked packages
            // This will give a warning the the projects that use this plugin
            // We want to change core to support this in a better way in the future.
            // One way could be to no give warnings if the version is undefined/false
            // Another could be to let Roc be smart about this and automatically solve the
            // peerDependecy problems that exists in Node and that we here go around
            // Another useful thing is to get the context.directory here directly instead of needing
            // to use process.cwd()
            react: {
                version: 'IGNORE THE WARNING THAT YOU SEE',
                resolve: ({ request }) => require.resolve(path.join(process.cwd(), 'node_modules', request)),
            },
            'react-dom': {
                version: 'IGNORE THE WARNING THAT YOU SEE',
                resolve: ({ request }) => require.resolve(path.join(process.cwd(), 'node_modules', request)),
            },
        },
        requires: {
            react: '^15.5.4 || ^16.0.0',
            'react-dom': '^15.5.4 || ^16.0.0',
        },
    },
};
