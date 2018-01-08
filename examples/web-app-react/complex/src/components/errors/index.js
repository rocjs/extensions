import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorItem from './item';

export default class Errors extends Component {
    static defaultProps = {
        errors: []
    };

    static propTypes = {
        errors: PropTypes.array,
        resetErrors: PropTypes.func
    };

    render() {
        const errorList = this.props.errors.map((error, i) => (
            <ErrorItem key= { i } error={ JSON.stringify(error) }/>
        ));

        if (errorList.length > 0) {
            return (
                <div>
                    { errorList }
                    <button onClick={ this.props.resetErrors }>Reset Errors</button>
                </div>
            );
        }

        return false;
    }
}
