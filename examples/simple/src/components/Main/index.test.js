import React from 'react';
import renderer from 'react-test-renderer';

import Main from './index';

test('Main', () => {
    const component = renderer.create(
        <Main />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
