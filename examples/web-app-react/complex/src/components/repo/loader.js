import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Repo extends Component {
    static propTypes = {
        endpoint: PropTypes.string
    };

    render() {
        const source = this.props.endpoint ? ` from ${this.props.endpoint}` : '';

        return (
            <div>
                { `Loading repos data${source}...` }
            </div>
        );
    }
}
