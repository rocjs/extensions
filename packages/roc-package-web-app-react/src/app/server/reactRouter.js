import { getSettings } from 'roc';
import debug from 'debug';
import PrettyError from 'pretty-error';

import setupForRender from './setupForRender';
import { initRenderPage, reactRender } from './reactRenderer';

const pretty = new PrettyError();
const log = debug('roc:server');

export default function reactRouter({
    createRoutes,
    createStore,
    stats,
    dist,
    dev,
    hasTemplateValues,
    templateValues,
    rocPath,
    Header,
    reduxSagas,
    apolloServerOptions,
}) {
    const rocConfig = getSettings();

    if (!createRoutes) {
        throw new Error('createRoutes needs to be defined');
    }

    if (!stats) {
        throw new Error('stats needs to be defined');
    }

    const renderPage = initRenderPage(dist, dev, Header);

    return function* (next) {
        try {
            // If server side rendering is disabled we do everything on the client
            if (!rocConfig.runtime.ssr) {
                yield next;

                // If response already is managed we will not do anything
                if (this.body || this.status !== 404) {
                    return;
                }

                this.status = 200;
                this.body = renderPage();
            } else {
                const { store, history, url, apollo } = setupForRender(
                    createStore,
                    this.url,
                    rocPath,
                    this.request,
                    apolloServerOptions
                );

                // Give Koa middlewares a chance to interact with the reduxStore
                // This can be used to dynamically pass some data to the client.
                this.state.reduxStore = store;
                yield next;

                // If response already is managed we will not do anything
                if (this.body || this.status !== 404) {
                    return;
                }

                const {
                    body,
                    redirect,
                    status = 200,
                } = yield reactRender({
                    url,
                    history,
                    store,
                    createRoutes,
                    renderPage,
                    koaState: this.state,
                    request: this.request,
                    hasTemplateValues,
                    templateValues,
                    reduxSagas,
                    stats,
                    apollo,
                });

                if (redirect) {
                    if (rocConfig.runtime.redirectStatusCode) {
                        this.status = rocConfig.runtime.redirectStatusCode;
                    }
                    this.redirect(redirect);
                } else {
                    this.status = status;
                    this.body = body;
                }
            }
        } catch (error) {
            log('Render error', pretty.render(error));
            this.status = 500;
            this.body = renderPage({
                error,
                status: this.status,
                request: this.request,
                stats,
            });
        }
    };
}
