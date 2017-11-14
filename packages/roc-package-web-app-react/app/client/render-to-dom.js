/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';

function renderSync({ renderProps, createComponent, routerRenderFn }, node) {
    const finalComponent = createComponent(
        <Router
            {...renderProps}
            render={routerRenderFn}
        />
    );

    ReactDOM.render(finalComponent, node);
}

export default function render(ssr, { history, routes, createComponent, routerRenderFn }, node) {
    if (!ssr) {
        renderSync({
            renderProps: {
                history,
                routes,
            },
            createComponent,
            routerRenderFn,
        }, node);
    } else {
        match({ history, routes }, (error, redirectLocation, renderProps) => {
            renderSync({
                renderProps,
                createComponent,
                routerRenderFn,
            }, node);
        });
    }
}
