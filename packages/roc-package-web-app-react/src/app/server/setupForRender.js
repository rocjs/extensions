/* global ROC_PATH */

import { createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ApolloClient, createHttpLink } from 'apollo-client-preset';

import { getSettings } from 'roc';

export default function setupForRender(createStore, url, rocPath, request, apolloServerOptions) {
    const basename = rocPath === '/' ? '' : rocPath;

    const completeUrl = basename + url;
    const memoryHistory = createMemoryHistory({
        entries: [completeUrl],
        basename,
    });
    let apollo;
    const extraMiddlewares = [];
    const extraReducers = {};

    if (apolloServerOptions) {
        const apolloOptions = apolloServerOptions({
            settings: getSettings(),
            createHttpLink,
            request,
        });

        apollo = new ApolloClient({
            ssrMode: true,
            ...apolloOptions,
        });

        extraMiddlewares.push(apollo.middleware());
        extraReducers.apollo = apollo.reducer();
    }
    const store = createStore
        ? createStore(memoryHistory, undefined, extraReducers, extraMiddlewares)
        : null;
    const history = store
        ? syncHistoryWithStore(memoryHistory, store)
        : memoryHistory;

    return {
        store,
        history,
        url,
        apollo,
    };
}
