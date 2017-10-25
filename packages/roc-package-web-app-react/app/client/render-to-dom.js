import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';

import { rocConfig } from '../shared/universal-config';

function renderSync({ renderProps, createComponent, routerRenderFn }, node) {
    const finalComponent = createComponent(
        <Router
            {...renderProps}
            render={routerRenderFn}
        />
    );

    // If we have enabled SSR and we are on React 16
    if (rocConfig.runtime.ssr && ReactDOM.hydrate) {
        ReactDOM.hydrate(finalComponent, node);
    } else {
        ReactDOM.render(finalComponent, node);
    }
}

export default function renderAsync({ history, routes, ...rest }, node) {
    match({ history, routes }, (error, redirectLocation, renderProps) => {
        renderSync({
            ...rest,
            renderProps,
        }, node);
    });
}
