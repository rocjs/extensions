import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RepoError extends Component {
    static propTypes = {
        error: PropTypes.string
    };

    render() {
        return (
            <div>
                <h4>Error loading repos data.</h4>
                { this.props.error }
            </div>
        );
    }
}
