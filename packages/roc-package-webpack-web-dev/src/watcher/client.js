import debug from 'debug';
import koa from 'koa';
import koaWebpackDevMiddleware from 'koa-webpack-dev-middleware';
import { getSettings } from 'roc';

import { getDevPort } from 'roc-package-webpack-dev';

/**
 * Client watcher.
 *
 * @param {object} compiler - Webpack compiler instance.
 * @returns {Promise} Resolves after it has completed.
 */
export default function client(compiler) {
    const devSettings = getSettings('dev');
    debug.enable(devSettings.debug);

    return new Promise((resolve, reject) => {
        if (!compiler) {
            return reject(new Error('A compiler instance must be passed in order to watch client!'));
        }
        const devPort = getDevPort();

        const server = koa();

        server.use(
            koaWebpackDevMiddleware(compiler, {
                // Let the publicPath be / since we want it to be based on the root of the dev server
                publicPath: '/',
                noInfo: devSettings.devMiddleware.noInfo,
                quiet: devSettings.devMiddleware.quiet
            })
        );

        const hotMiddleware = require('webpack-hot-middleware')(compiler);
        server.use(function* (next) {
            yield hotMiddleware.bind(null, this.req, this.res);
            yield next;
        });

        server.listen(devPort);
        debug('roc:dev:client')(`Dev server started on port ${devPort}`);

        resolve(server);
    });
}
