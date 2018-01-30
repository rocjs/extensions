import koaError from 'koa-error';
import koaHelmet from 'koa-helmet';
import koaEtag from 'koa-etag';
import koaCompress from 'koa-compress';
import koaFavicon from 'koa-favicon';
import koaLogger from 'koa-logger';

import accesslog from './middlewares/accesslog';

/**
 * Returns the middlewares to be used.
 *
 * @param {object} settings - Runtime settings
 * @returns {array} A array with middlewares to use.
 */
export default function middlewares(config, { dev, dist }) {
    const middlewaresList = [];

    if (dev) {
        middlewaresList.push(koaError());
    }

    // Security headers
    middlewaresList.push(koaHelmet());

    middlewaresList.push(koaEtag());

    // We only enable gzip in dist
    if (dist) {
        middlewaresList.push(koaCompress());
    }

    const favicon = config.favicon;
    if (favicon) {
        middlewaresList.push(koaFavicon(favicon));
    }

    if (dist) {
        middlewaresList.push(accesslog());
    } else {
        middlewaresList.push(koaLogger());
    }

    return middlewaresList;
}
