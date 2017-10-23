import { getDevPort } from 'roc-package-webpack-dev';
import { getSettings } from 'roc';
import debug from 'debug';
import koa from 'koa';
import koaWebpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

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
                ...devSettings.devMiddleware,
            })
        );

        const hotMiddleware = webpackHotMiddleware(compiler);

        server.use(function* addHotMiddleware(next) {
            yield hotMiddleware.bind(null, this.req, this.res);
            yield next;
        });

        server.listen(devPort);
        debug('roc:dev:client')(`Dev server started on port ${devPort}`);

        return resolve(server);
    });
}
