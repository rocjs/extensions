import { join } from 'path';

import { getAbsolutePath, fileExists } from 'roc';
import webpack from 'webpack';
import ContextReplacementPlugin from 'webpack/lib/ContextReplacementPlugin';

export default ({
    context: { config: { settings: { build: buildSettings } } },
    previousValue: webpackConfig,
}) => (target) => () => {
    const newWebpackConfig = { ...webpackConfig };

    const WEB = (target === 'web');

    if (WEB) {
        newWebpackConfig.plugins.push(
            new webpack.IgnorePlugin(/^roc$/)
        );
    }

    if (buildSettings.routes) {
        const routes = getAbsolutePath(buildSettings.routes);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                REACT_ROUTER_ROUTES: JSON.stringify(routes),
            })
        );
    }

    const hasApollo = !!(buildSettings.apollo && fileExists(buildSettings.apollo));
    if (hasApollo) {
        const apolloOptions = getAbsolutePath(buildSettings.apollo);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                APOLLO: JSON.stringify(apolloOptions),
            })
        );
    }

    const hasReducers = !!(buildSettings.reducers && fileExists(buildSettings.reducers));
    if (hasReducers) {
        const reducers = getAbsolutePath(buildSettings.reducers);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                REDUX_REDUCERS: JSON.stringify(reducers),
            })
        );
    }

    const hasMiddlewares = !!(buildSettings.redux.middlewares && fileExists(buildSettings.redux.middlewares));
    if (hasMiddlewares) {
        const middlewares = getAbsolutePath(buildSettings.redux.middlewares);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                REDUX_MIDDLEWARES: JSON.stringify(middlewares),
            })
        );
    }

    const hasEnhancers = !!(buildSettings.redux.enhancers && fileExists(buildSettings.redux.enhancers));
    if (hasEnhancers) {
        const enhancers = getAbsolutePath(buildSettings.redux.enhancers);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                REDUX_ENHANCERS: JSON.stringify(enhancers),
            })
        );
    }

    const hasSagas = !!(buildSettings.redux.sagas && fileExists(buildSettings.redux.sagas));
    if (hasSagas) {
        const sagas = getAbsolutePath(buildSettings.redux.sagas);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                REDUX_SAGAS: JSON.stringify(sagas),
            })
        );
    }

    const hasClientLoading = !!(buildSettings.clientLoading && fileExists(buildSettings.clientLoading));
    if (hasClientLoading) {
        const clientLoading = getAbsolutePath(buildSettings.clientLoading);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                ROC_CLIENT_LOADING: JSON.stringify(clientLoading),
            })
        );
    }

    const hasTemplateValues = !!(buildSettings.templateValues && fileExists(buildSettings.templateValues));
    if (hasTemplateValues) {
        const templateValues = getAbsolutePath(buildSettings.templateValues);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                TEMPLATE_VALUES: JSON.stringify(templateValues),
            })
        );
    }

    const hasI18nLocales = !!(buildSettings.i18n.locales && buildSettings.i18n.locales.length);
    if (hasI18nLocales) {
        const locales = buildSettings.i18n.locales;

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                I18N_LOCALES: JSON.stringify(locales),
            }),
            new ContextReplacementPlugin(
                /intl[\/\\]locale-data[\/\\]jsonp$/,
                new RegExp(`^\.\/(${locales.join('|')})$`)
            )
        );
    }

    newWebpackConfig.plugins.push(
        new webpack.DefinePlugin({
            USE_DEFAULT_REDUX_REDUCERS: buildSettings.redux.useDefaultReducers,
            USE_DEFAULT_REDUX_MIDDLEWARES: buildSettings.redux.useDefaultMiddlewares,
            USE_DEFAULT_REACT_ROUTER_ROUTES: buildSettings.useDefaultRoutes,
            USE_I18N_POLYFILL: buildSettings.i18n.usePolyfill,
            USE_REACT_ROUTER_SCROLL_ASYNC: buildSettings.useReactRouterScrollAsync,

            HAS_APOLLO: hasApollo,
            HAS_REDUX_REDUCERS: hasReducers,
            HAS_REDUX_MIDDLEWARES: hasMiddlewares,
            HAS_REDUX_ENHANCERS: hasEnhancers,
            HAS_REDUX_SAGA: hasSagas,
            HAS_CLIENT_LOADING: hasClientLoading,
            HAS_TEMPLATE_VALUES: hasTemplateValues,
        })
    );

    newWebpackConfig.resolveLoader.modules.push(join(__dirname, '..', '..', 'node_modules'));

    return newWebpackConfig;
};
