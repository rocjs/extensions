import config from 'config';
import debug from 'debug';
import nunjucks from 'nunjucks';
import serialize from 'serialize-javascript';
import PrettyError from 'pretty-error';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { triggerHooks, useRedial } from 'react-router-redial';
import { getAbsolutePath, getSettings } from 'roc';
import ServerStatus from 'react-server-status';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import { invokeHook } from '../../roc/util';

import myPath from './helpers/myPath';

const pretty = new PrettyError();
const log = debug('roc:react-render');

const rocConfig = getSettings();
const defaultTemplatePath = `${myPath}/views`;

const whiteListed = () => (
    rocConfig.runtime.configWhitelistProperty ?
        config[rocConfig.runtime.configWhitelistProperty] :
        undefined
);

const appConfig = whiteListed();

function setupTemplate(devMode) {
    let templatePaths = [].concat(
        // Combine paths from highest priority to lowest
        rocConfig.runtime.template.path || [],
        defaultTemplatePath
    ).map(path => getAbsolutePath(path));

    const baseTemplate = 'roc-package-web-app-react/main.njk';
    let parentTemplate = rocConfig.runtime.template.root ?
        rocConfig.runtime.template.name :
        baseTemplate;
    const inheritance = {};
    invokeHook('extend-template')(({ path = [], namespace, template }) => {
        templatePaths = templatePaths.concat(path);
        inheritance[namespace] = parentTemplate;
        parentTemplate = template;
    });

    const nunjucksEnv = nunjucks.configure(templatePaths, {
        watch: devMode,
    });

    const mainTemplate = rocConfig.runtime.template.root ?
        parentTemplate :
        rocConfig.runtime.template.name;

    // If we have root = true we will set parentTemplate to be baseTemplate
    // This will make it impossible to create a loop in the template system
    parentTemplate = rocConfig.runtime.template.root ?
        baseTemplate :
        parentTemplate;

    return {
        mainTemplate,
        nunjucksEnv,
        nunjucksContext: {
            baseTemplate,
            inheritance,
            parentTemplate,
        },
    };
}

export function initRenderPage(distMode, devMode, Header) {
    const {
        nunjucksEnv,
        nunjucksContext,
        mainTemplate,
    } = setupTemplate(devMode);

    return ({
        apolloState = {},
        content = '',
        customTemplateValues = {},
        error,
        head,
        redialProps = [],
        reduxState = {},
        request,
        status,
        stats,
    } = {}) => {
        const { dev, build, ...rest } = rocConfig; // eslint-disable-line
        const bundleName = stats.script[build.name][0];
        const styleName = (stats.css[build.name] || [])[0];

        const rocConfigClient = distMode ? rest : { ...rest, dev };

        // If we have no head we will generate it
        if (!head) {
            // Render to trigger React Helmet
            renderToStaticMarkup(<Header />);
            head = Helmet.rewind(); // eslint-disable-line
        }

        return nunjucksEnv.render(mainTemplate, {
            ...nunjucksContext,
            apolloState: serialize(apolloState),
            bundleName,
            content,
            custom: customTemplateValues,
            dist: distMode,
            error,
            fluxState: serialize(reduxState),
            head,
            redialProps: serialize(redialProps),
            request,
            serializedAppConfig: serialize(appConfig),
            serializedRocConfig: serialize(rocConfigClient),
            stats,
            status,
            styleName,
        });
    };
}

export function reactRender({
    url,
    history,
    store,
    createRoutes,
    renderPage,
    koaState,
    request,
    staticRender = false,
    hasTemplateValues,
    templateValues,
    reduxSagas,
    stats,
    apollo,
}) {
    return new Promise((resolve) => {
        let currentLocation;

        history.listen((location) => {
            currentLocation = location;
        });

        match({ history, routes: createRoutes(store), location: url },
            (error, redirect, renderProps) => {
                if (redirect) {
                    const base = redirect.basename || '';
                    const redirectUrl = `${base}${redirect.pathname}${redirect.search}`;
                    log(`Redirect request to ${redirectUrl} due to React Router`);

                    return resolve({
                        redirect: redirectUrl,
                    });
                } else if (error) {
                    log('Router error', pretty.render(error));
                    return resolve({
                        status: 500,
                        body: renderPage({ error, request, status: 500, stats }),
                    });
                } else if (!renderProps) {
                    log('No renderProps, most likely the path does not exist');
                    return resolve({
                        status: 404,
                        body: renderPage({ request, status: 404, stats }),
                    });
                }

                const locals = store ? {
                    dispatch: store.dispatch,
                    getState: store.getState,
                    history,
                } : {
                    history,
                };

                const hooks = rocConfig.runtime.fetch.server;

                let sagaPromise;
                if (reduxSagas) {
                    sagaPromise = store.runSaga(reduxSagas).done;
                }

                return triggerHooks({
                    renderProps,
                    hooks,
                    locals,
                }).then((result) => {
                    if (sagaPromise) {
                        store.dispatch(require('redux-saga').END); // eslint-disable-line
                        return sagaPromise.then(() => result);
                    }
                    return result;
                }).then(({ redialMap, redialProps }) => {
                    if (currentLocation) {
                        const currentUrl = `${currentLocation.pathname}${currentLocation.search}`;

                        if (currentUrl !== url) {
                            const base = currentLocation.basename || '';
                            const redirectUrl = `${base}${currentUrl}`;

                            log(`Redirect request to ${redirectUrl} due to history location modification`);
                            return resolve({
                                redirect: `${redirectUrl}`,
                            });
                        }
                    }

                    let component = applyRouterMiddleware(useRedial({ redialMap }))(renderProps);

                    if (apollo) {
                        const providerProps = { client: apollo, store };
                        component = <ApolloProvider {...providerProps}>{component}</ApolloProvider>;
                    } else if (store) {
                        component = <Provider store={store}>{component}</Provider>;
                    }

                    const apolloPromise = apollo
                        ? getDataFromTree(component)
                        : Promise.resolve();

                    return apolloPromise.then(() => {
                        const content = staticRender ? renderToStaticMarkup(component) : renderToString(component);
                        const head = Helmet.rewind();
                        const reduxState = store ? store.getState() : {};
                        const status = ServerStatus.rewind() || 200;

                        const customTemplateValues = invokeHook('get-template-values', {
                            koaState,
                            settings: rocConfig,
                            reduxState,
                            stats,
                        });

                        if (hasTemplateValues) {
                            // Provides settings, Redux state and Koa state
                            Object.assign(
                                customTemplateValues,
                                templateValues.default({
                                    koaState,
                                    settings: rocConfig,
                                    reduxState,
                                    stats,
                                }),
                            );
                        }

                        return resolve({
                            body: renderPage({
                                apolloState: apollo && !store ? apollo.store.getState() : {},
                                customTemplateValues,
                                content,
                                head,
                                redialProps,
                                reduxState,
                                stats,
                                request,
                                status,
                            }),
                            status,
                        });
                    }).catch((err) => {
                        if (err) {
                            log('Render error', pretty.render(err));
                        }
                        return resolve({
                            status: 500,
                            body: renderPage({
                                error: err,
                                request,
                                status: 500,
                                stats,
                                redialProps,
                                reduxState: store ? store.getState() : {},
                            }),
                        });
                    });
                }).catch((err) => {
                    if (err) {
                        log('General error', pretty.render(err));
                    }
                    const { status = 500 } = err || {};
                    return resolve({
                        status,
                        body: renderPage({
                            error: err,
                            request,
                            status,
                            stats,
                            reduxState: store ? store.getState() : {},
                        }),
                    });
                });
            });
    });
}
