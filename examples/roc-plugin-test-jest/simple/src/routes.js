import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import App from './components/App';
import Main from './components/Main';

export default () => (
    <Route component={ App }>
        <IndexRoute component={ Main } />
    </Route>
);
